import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'

import ProTable from '@ant-design/pro-table'
import { Space, Radio, DatePicker, Tooltip } from 'antd'
import moment from 'moment'

import Yuan from '../components/Yuan'
import LineChart from './line-chart'
import RegionalOrderAnalysis from './regional-order-analysis'
import styles from './styles.less'
import { getTimeDistance } from '@/utils/utils'
import { orderAnalysis, orderStatistical } from '@/services/data-board/order-analysis'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker

const SelectDate = ({
  selectDate,
  rangePickerValue,
  handleRangePickerChange
}) => {
  
  const handleChange = (v)=> {
    switch(v.target.value) {
      case 7:
        selectDate('nearly-7-days')
      break
      case 30:
        selectDate('nearly-a-month')
      break
      case 90:
        selectDate('nearly-3-month')
      break
      case 180:
        selectDate('nearly-6-month')
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
          <Radio.Button value={180}>近6个月</Radio.Button>
        </Radio.Group>
        <RangePicker
          value={rangePickerValue}
          onChange={handleRangePickerChange}
          style={{
            width: 256,
          }}
          allowClear={false}
        />
      </Space>
    </div>
  )
}

const OrderAnalysis = () => {
  const [value, setValue] = useState(1)
  const [data, setData] = useState([])
  const [tableData, setTableData] = useState([])
  const [totalOrder, setTotalOrder] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('nearly-7-days'))

  const onChange = e => {
    setValue(e.target.value)
  }

  useEffect(() => {
    orderAnalysis({
      startTime: moment(rangePickerValue?.[0]).format("YYYY-MM-DD"), 
      endTime: moment(rangePickerValue?.[1]).format("YYYY-MM-DD")
    }).then(res => {
      if(res.success)  {
        setTableData(res.data)
        setTotalAmount(res?.data?.reduce((acc, curr) => (
          acc + Number(curr.totalPay)
        ), 0))
        setTotalOrder(res?.data?.reduce((acc, curr) => (
          acc + Number(curr.payOrdersNum)
        ), 0))
      }
    })
    return () => {
      setTotalOrder(0)
      setTotalAmount(0)
    }
  }, [rangePickerValue])

  useEffect(() => {
    orderStatistical({
      startTime: moment(rangePickerValue?.[0]).format("YYYY-MM-DD"), 
      endTime: moment(rangePickerValue?.[1]).format("YYYY-MM-DD"),
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
  }, [rangePickerValue, value])
  
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

  const selectDate = (type) => {
    setRangePickerValue(getTimeDistance(type))
  }

  const handleRangePickerChange = (value) => {
    setRangePickerValue(value)
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
      title: ()=>(
        <Space>
          <span>总订单数</span>
          <Tooltip title="包含未支付订单，不含售后订单">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'totalOrdersNum',
      align: 'center'
    },
    {
      title: '支付订单数',
      dataIndex: 'payOrdersNum',
      align: 'center'
    },
    {
      title:  ()=>(
        <Space>
          <span>交易总额</span>
          <Tooltip title="包含未支付订单，不含售后订单">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'totalAmount',
      align: 'center'
    },
    {
      title:  ()=>(
        <Space>
          <span>成交总额</span>
          <Tooltip title="不含未支付订单，只统计已支付的">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'totalPay',
      align: 'center'
    },
    {
      title:  ()=>(
        <Space>
          <span>下单总人数</span>
          <Tooltip title="含未支付订单">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'orderUserNum',
      align: 'center'
    },
    {
      title: '下单支付总人数',
      dataIndex: 'orderPayUserNum',
      align: 'center'
    },
    {
      title:  ()=>(
        <Space>
          <span>成交平均单价</span>
          <Tooltip title="成交总额/支付订单数">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'averagePrice',
      align: 'center'
    },
    {
      title: '退款笔数',
      dataIndex: 'refundNum',
      align: 'center'
    },
    {
      title: '退款总额',
      dataIndex: 'refundAmount',
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
          subTitle: (
            <SelectDate
              selectDate={selectDate}
              rangePickerValue={rangePickerValue}
              handleRangePickerChange={handleRangePickerChange}
            />
          )
        }}
        tableRender={(_, dom) => (
          <>
            { dom }
            <div className={styles.summary}>
              <span>支付订单数：<Yuan>{totalOrder}</Yuan></span>
              <span>成交总额：<Yuan>{totalAmount}</Yuan></span>
              <Tooltip title="4种订单类型的成交额总和">
                <QuestionCircleOutlined />
              </Tooltip>
            </div>
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
          <Radio value={2}>成交额</Radio>
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
