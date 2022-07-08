import { DatePicker } from 'antd'

import type { FC } from "react"
import type { SelectDateProps } from "../data"

const { RangePicker } = DatePicker

const SelectDate: FC<SelectDateProps> = (props) => {
  const {
    setRangePickerValue
  } = props

  return (
    <RangePicker
      format="YYYY-MM-DD"
      onChange={(e)=>setRangePickerValue(e)}
      allowClear={false}
    />
  )
}

export default SelectDate