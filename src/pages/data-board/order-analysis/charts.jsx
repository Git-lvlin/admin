import { useState, useEffect } from 'react'
import { Space, Empty, Select, Tabs } from "antd"
import { LineChartOutlined, PieChartOutlined } from "@ant-design/icons"

import { orderStatistical } from "@/services/data-board/order-analysis"
import LineChart from "./line-chart"
import PieChart from "./pie-chart"
import styles from "./styles.less"

const { Option } = Select
const { TabPane } = Tabs

const Charts = ({time, dateValue}) => {
  const [data, setData] = useState([])
  const [type, setType] = useState(1)
  const [unit, setUnit] = useState('单位：元')

  useEffect(()=> {
    if(dateValue !== 2 && time?.[1].diff(time?.[0], 'days') >= 7) {
      return false
    } else {
      orderStatistical({
        startTime: time?.[0].format("YYYY-MM-DD"), 
        endTime: time?.[1].format("YYYY-MM-DD"),
        type: dateValue,
        index: type
      }).then(res => {
        if(res.success) {
          setData(res.data.map(item => ({
            ...item,
            value: parseFloat(item.value)
          })))
        }
      })
    }
    return () => {
      setData([])
    }
  }, [time, dateValue, type])

  const onChange = (v) => {
    setType(v)
    switch(v) {
      case 1:
        setUnit('单位：元')
      break
      case 2:
        setUnit('单位：元')
      break
      case 3:
        setUnit('单位：单')
      break
      case 4:
        setUnit('单位：单')
      break
      case 5:
        setUnit('单位：人')
      break
      case 6:
        setUnit('单位：人')
      break
    }
  }

  return (
    <div className={styles.chartArea}>
      <Tabs
        type="card"
        renderTabBar={(props, DefaultTabBar)=> (
          <Space size='small'>
            <div>趋势图指标</div>
            <Select value={type} onChange={onChange}>
              <Option value={1}>总交易额</Option>
              <Option value={2}>总成交额</Option>
              <Option value={3}>总订单数</Option>
              <Option value={4}>已支付订单数</Option>
              <Option value={5}>下单总人数</Option>
              <Option value={6}>下单且支付总人数</Option>
            </Select>
            <DefaultTabBar {...props} className={styles.tabBar}/>
            <div>统计时间：{time?.[0].format("YYYY-MM-DD")} 至 {time?.[1].format("YYYY-MM-DD")}</div>
          </Space>
        )}
      >
        <TabPane tab={<LineChartOutlined />} key="1">
         {data?.[0] ? <LineChart data={data} type={dateValue} unit={unit}/> : <Empty/>}
        </TabPane>
        <TabPane tab={<PieChartOutlined />} key="2">
          {data?.[0] ? <PieChart data={data}/> : <Empty/>}
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Charts
