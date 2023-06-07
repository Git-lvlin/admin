import { DatePicker } from 'antd'
import moment from 'moment'

import { DateProps } from './data'

const { RangePicker } = DatePicker

const SelectDate:React.FC<DateProps> = (props) => {
  const {
    showTime = {defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]},
    onChange = () => {},
    value
  } = props

  return (
    <RangePicker
      ranges={{
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
      }}
      format={ showTime ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD"}
      showTime={showTime}
      value={value}
      onChange={(e)=> {
        onChange(e)
      }}
      renderExtraFooter={()=> {
        if(showTime) {
          return (
            <a onClick={()=> onChange([moment(), moment()])}>此刻</a>
          )
        } else {
          return
        }
      }}
    />
  )
}

export default SelectDate