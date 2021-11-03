import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'

import ProTable from '@ant-design/pro-table'
import { Space, Radio } from 'antd'
import moment from 'moment'

import Yuan from '../components/Yuan'
import LineChart from './line-chart'
import RegionalOrderAnalysis from './regional-order-analysis'
import styles from './styles.less'

const OrderAnalysis = () => {
  const dateNow = moment(+new Date()).format('YYYY-MM-DD')
  const [value, setValue] = useState(1)

  const date = (day) => {
    if(day === 0) {
      return dateNow
    } else {
      return moment().subtract(day, 'days').calendar().replaceAll('/', '-')
    }
  }

  const onChange = e => {
    setValue(e.target.value)
  }



  const data = [
    {
      month: "Jan",
      city: "Tokyo",
      temperature: 7
    },
    {
      month: "Jan",
      city: "London",
      temperature: 3.9
    },
    {
      month: "Feb",
      city: "Tokyo",
      temperature: 6.9
    },
    {
      month: "Feb",
      city: "London",
      temperature: 4.2
    },
    {
      month: "Mar",
      city: "Tokyo",
      temperature: 9.5
    },
    {
      month: "Mar",
      city: "London",
      temperature: 5.7
    },
    {
      month: "Apr",
      city: "Tokyo",
      temperature: 14.5
    },
    {
      month: "Apr",
      city: "London",
      temperature: 8.5
    },
    {
      month: "May",
      city: "Tokyo",
      temperature: 18.4
    },
    {
      month: "May",
      city: "London",
      temperature: 11.9
    },
    {
      month: "Jun",
      city: "Tokyo",
      temperature: 21.5
    },
    {
      month: "Jun",
      city: "London",
      temperature: 15.2
    },
    {
      month: "Jul",
      city: "Tokyo",
      temperature: 25.2
    },
    {
      month: "Jul",
      city: "London",
      temperature: 17
    },
    {
      month: "Aug",
      city: "Tokyo",
      temperature: 26.5
    },
    {
      month: "Aug",
      city: "London",
      temperature: 16.6
    },
    {
      month: "Sep",
      city: "Tokyo",
      temperature: 23.3
    },
    {
      month: "Sep",
      city: "London",
      temperature: 14.2
    },
    {
      month: "Oct",
      city: "Tokyo",
      temperature: 18.3
    },
    {
      month: "Oct",
      city: "London",
      temperature: 10.3
    },
    {
      month: "Nov",
      city: "Tokyo",
      temperature: 13.9
    },
    {
      month: "Nov",
      city: "London",
      temperature: 6.6
    },
    {
      month: "Dec",
      city: "Tokyo",
      temperature: 9.6
    },
    {
      month: "Dec",
      city: "London",
      temperature: 4.8
    }
  ]
  
  const scale = {
    temperature: { min: 0 },
    city: {
      formatter: v => {
        return {
          London: '伦敦',
          Tokyo: '东京'
        }[v]
      }
    }
  }

  const SelectDate = () => {
    const [dateSelect, setDateSelect] = useState(date(0))
    const handleChange = (v)=> {
      switch(v.target.value) {
        case 0: 
          setDateSelect(date(0))
        break
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
            defaultValue={0}
            buttonStyle="solid"
            onChange= {
              (e) => {
                handleChange(e)
              }
            }
          >
            <Radio.Button value={0}>今日</Radio.Button>
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

  const columns = [
    {
      title: '订单类型',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '支付订单数',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '总交易额',
      dataIndex: '',
      align: 'center'
    },
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=""
        columns={columns}
        bordered
        search={false}
        toolbar={{
          title: '订单趋势分析',
          settings: false,
          subTitle: <SelectDate />
        }}
        tableRender={(_, dom) => (
          <>
            { dom }
            {
              <Space className={styles.summary} size={80}>
                <span>支付订单数：<Yuan>233333</Yuan></span>
                <span>总交易额：<Yuan>666666666</Yuan></span>
              </Space>
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
