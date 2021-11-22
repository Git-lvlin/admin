import React from 'react'
import moment from 'moment'
import { Space, Radio } from 'antd'

import styles from './style.less'

const dateNow = moment(+new Date()).format('YYYY-MM-DD')
const date = (day) => moment().subtract(day, 'days').calendar().replaceAll('/', '-')

const SelectDate = ({
  dateSelect,
  setDateSelect
}) => {
  const handleChange = (v)=> {
    switch(v.target.value) {
      case 7:
        setDateSelect(date(7))
      break
      case 15: 
        setDateSelect(date(15))
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
          <Radio.Button value={15}>近15天</Radio.Button>
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

export default SelectDate
