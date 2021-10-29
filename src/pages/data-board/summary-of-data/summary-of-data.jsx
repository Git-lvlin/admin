import React, { useState} from 'react'
import { PageContainer } from '@ant-design/pro-layout'

import styles from './style.less'
import IndicatorsCard from './indicators-card'
import RealTime from './real-time'

const SummaryOfData = () => {
  const [title, setTitle] = useState("支付金额")
  const [dataSources, setDataSources] = useState({})
  // const { loading, data } = useRequest(fakeChartData)
  const [loading, setLoading] = useState(false)
  const [selectDate, setSelectDate] = useState()

  const getData = (e) => {
    setTitle(e)
  }

  const isActive = (val) => {
    if(!val) {
      return ''
    }
    if(selectDate) {
      return styles.currentDate
    }
    return ''
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
      temperature: 10
    },
    {
      month: "Mar",
      city: "London",
      temperature: 5.7
    },
  ]

  const scale = {
    temperature: { min: 0 },
    city: {
      formatter: v => {
        return {
          Tokyo: '今日',
          London: '昨日'
        }[v]
      }
    }
  }

  return (
    <PageContainer title={false}>
      <RealTime 
        data={data}
        scale={scale}
        title={title}
        getData={setTitle}
      />
      {/* <IndicatorsCard
        isActive={isActive}
        loading={loading}
        selectDate={setSelectDate}
      /> */}
    </PageContainer>
  )
}

export default SummaryOfData
