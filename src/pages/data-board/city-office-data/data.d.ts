import type { Moment } from 'moment'
import type { RangeValue } from "antd"

export type BarChartDataPorps = {
  userCityName: string
  valueData: string
}

export type DataProps = {
  data: BarChartDataPorps[]
  type: string
}

export type CardTitleProps = {
  rangePickerValue: Moment<RangeValue>
  handleRangePickerChange: (value: any) => void
}

export type DataOverviewProps = {
  accountNum?: number
  accountLoginNum?: number
  totalAmount?: string
  orderNum?: number
  totalCommission?: string
  accountUnloginNum?: number
}

export type PieChartProps = {
  data?: any
}