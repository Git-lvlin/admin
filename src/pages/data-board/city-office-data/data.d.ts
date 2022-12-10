export type BarChartDataPorps = {
  userCityName: string
  valueData: string
}

export type DataProps = {
  data: BarChartDataPorps[]
  type: string
}

export type CardTitleProps = {
  times: string[]
  setTimes: React.Dispatch<React.SetStateAction<string[]>>
}