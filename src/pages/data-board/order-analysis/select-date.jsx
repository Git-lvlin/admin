import { useState, useEffect } from "react"
import { DatePicker, Space, Select } from 'antd'
import moment from 'moment'

import styles from './styles.less'

const { RangePicker } = DatePicker
const { Option } = Select

const SelectDate = (props) => {
  const {
    rangePickerValue,
    setRangePickerValue, 
    dateValue, 
    setDateValue,
    status, 
    setStatus
  } = props

  const [flag, setFlag] = useState(false)
  const [checked, setChecked] = useState(1)

  useEffect(()=> {
    if(dateValue === 1 && rangePickerValue?.[1].diff(rangePickerValue?.[0], 'days') >= 7) {
      setStatus('error')
    } else {
      setStatus()
    }
  }, [rangePickerValue, dateValue])

  const dateSelect = {
    1: {
      '今日': [moment().startOf('day'), moment()],
      '昨日': [moment().startOf('day').subtract(1, 'days'), moment().endOf('day').subtract(1, 'days')],
      '本周': [moment().startOf('week'), moment().endOf('week')],
      '上周': [moment().startOf('week').subtract(7, 'days'), moment().endOf('week').subtract(7, 'days')],
      '本月': [moment().startOf('month'), moment().endOf('month')],
      '上月': [moment().startOf('month').subtract(1, 'months'), moment().endOf('month').subtract(1, 'months')],
      '本年': [moment().startOf('year'), moment().endOf('year')],
      '去年': [moment().startOf('year').subtract(1, 'years'), moment().endOf('year').subtract(1, 'years')],
      '过去7天': [moment().startOf('day').subtract(7, 'days'), moment().endOf('day').subtract(1, 'days')],
      '过去14天': [moment().startOf('day').subtract(14, 'days'), moment().endOf('day').subtract(1, 'days')],
      '过去30天': [moment().startOf('day').subtract(30, 'days'), moment().endOf('day').subtract(1, 'days')],
      '过去60天': [moment().startOf('day').subtract(60, 'days'), moment().endOf('day').subtract(1, 'days')],
      '过去90天': [moment().startOf('day').subtract(90, 'days'), moment().endOf('day').subtract(1, 'days')],
      '过去180天': [moment().startOf('day').subtract(180, 'days'), moment().endOf('day').subtract(1, 'days')]
    },
    2: {
      '今日': [moment().startOf('day'), moment()],
      '昨日': [moment().startOf('day').subtract(1, 'days'), moment().endOf('day').subtract(1, 'days')],
      '本周': [moment().startOf('week'), moment().endOf('week')],
      '上周': [moment().startOf('week').subtract(7, 'days'), moment().endOf('week').subtract(7, 'days')],
      '过去7天': [moment().startOf('day').subtract(7, 'days'), moment().endOf('day').subtract(1, 'days')]
    }
  }

  function onChange (_, dateStrings) {
    if(moment(dateStrings?.[1]).diff(dateStrings?.[0], 'days') >= 7) {
      setFlag(true)
    } else {
      setFlag(false)
    }
    setRangePickerValue(_)
  }

  function handleChange(value) {
    if(value === 2) {
      setChecked(1)
    } else {
      setChecked(2)
    }
    setDateValue(value)
  }

  function disabledDate (current) {
    if(dateValue === 1) {
      return current && (current.diff(rangePickerValue?.[0], 'days') >= 7 || current > moment().endOf('day'))
    }
  }

  return (
    <div className={styles.selectDate}>
      <Space size='small'>
        <Select value={dateValue} onChange={handleChange}>
          <Option value={2} >按天</Option>
          <Option value={1} disabled={flag}>按小时</Option>
        </Select>
        <RangePicker
          ranges={dateSelect[checked]}
          format="YYYY-MM-DD HH:mm:ss"
          onCalendarChange={onChange}
          status={status}
          clearIcon={false}
          showTime
          disabledDate={disabledDate}
          defaultValue={rangePickerValue}
        />
      </Space>
    </div>
  )
}

export default SelectDate