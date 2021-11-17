import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'

import ProTable from '@ant-design/pro-table'
import { Space, Radio } from 'antd'
import moment from 'moment'

import Yuan from '../components/Yuan'
import LineChart from './line-chart'
import RegionalOrderAnalysis from './regional-order-analysis'
import styles from './styles.less'
import { orderAnalysis, orderStatistical } from '@/services/data-board/order-analysis'

const dateNow = moment(+new Date()).format('YYYY-MM-DD')
const date = (day) => {
  if(day === 0) {
    return dateNow
  } else {
    return moment().subtract(day, 'days').calendar().replaceAll('/', '-')
  }
}

const SelectDate = ({
  dateSelect,
  setDateSelect
}) => {
  
  const handleChange = (v)=> {
    switch(v.target.value) {
      case 7:
        setDateSelect(date(7))
      break
      case 30:
        setDateSelect(date(30))
      break
      case 90:
        setDateSelect(date(90))
      break
    }
  }
  return (
    <div className={styles.selectDate}>
      <Space size={20}>
        <Radio.Group
          defaultValue={7}
          buttonStyle="solid"
          onChange= {
            (e) => {
              handleChange(e)
            }
          }
        >
          <Radio.Button value={7}>近7天</Radio.Button>
          <Radio.Button value={30}>近30天</Radio.Button>
          <Radio.Button value={90}>近3个月</Radio.Button>
        </Radio.Group>
        <div className={styles.date}>
          查询时间：{dateSelect} 至 {dateNow}
        </div>
      </Space>
    </div>
  )
}

const OrderAnalysis = () => {
  const [value, setValue] = useState(1)
  const [data, setData] = useState([])
  const [tableData, setTableData] = useState([])
  const [dateSelect, setDateSelect] = useState(date(7))
  const [totalOrder, setTotalOrder] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const onChange = e => {
    setValue(e.target.value)
  }

  useEffect(() => {
    orderAnalysis({
      startTime: dateSelect, 
      endTime: dateNow
    }).then(res => {
      if(res.success)  {
        setTableData(res.data)
        setTotalAmount(res?.data?.reduce((acc, curr) => (
          acc + Number(curr.totalSales)
        ), 0))
        setTotalOrder(res?.data?.reduce((acc, curr) => (
          acc + Number(curr.payCount)
        ), 0))
      }
    })
    return () => {
      setTotalOrder(0)
      setTotalAmount(0)
    }
  }, [dateSelect])

  useEffect(() => {
    orderStatistical({
      startTime: dateSelect, 
      endTime: dateNow,
      type: value
    }).then(res=> {
      const arr = res?.data?.map(item=> {
        if(item) {
          return {reportName: item?.reportName, dateTime: item?.dateTime, value: Number(item?.value)}
        } else {
          return false
        }
      })
      setData(arr)
    })
    return () => {
      setData([])
    }
  }, [dateSelect, value])
  
  const scale = {
    value: { min: 0 },
    reportName: {
      formatter: v => {
        return {
          1688: '1688订单',
          C端集约订单: 'C端集约订单',
          秒约订单: '秒约订单',
          B端集约订单: 'B端集约订单'
        }[v]
      }
    }
  }

  const columns = [
    {
      title: '订单类型',
      dataIndex: 'orderType',
      valueType: 'select',
      valueEnum: {
        2:'秒约订单',
        11: '1688订单',
        15: 'C端集约订单',
        99: 'B端集约订单'
      },
      align: 'center'
    },
    {
      title: '支付订单数',
      dataIndex: 'payCount',
      align: 'center'
    },
    {
      title: '总交易额',
      dataIndex: 'totalSales',
      align: 'center'
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="orderType"
        columns={columns}
        dataSource={tableData}
        bordered
        search={false}
        toolbar={{
          title: '订单趋势分析',
          settings: false,
          subTitle: <SelectDate setDateSelect={setDateSelect} dateSelect={dateSelect}/>
        }}
        tableRender={(_, dom) => (
          <>
            { dom }
            {
              <div className={styles.summary}>
                <span>支付订单数：<Yuan>{totalOrder}</Yuan></span>
                <span>总交易额：<Yuan>{totalAmount}</Yuan></span>
              </div>
            }
          </>
        )}
      />
      <div className={styles.radioArea}>
        <Radio.Group 
          onChange={onChange}
          value={value}
          size="large"
        >
          <Radio value={1}>订单数</Radio>
          <Radio value={2}>交易额</Radio>
        </Radio.Group>
        <LineChart 
          data={data}
          scale={scale}
        />
      </div>
      <RegionalOrderAnalysis />
    </PageContainer>
  )
}

export default OrderAnalysis
