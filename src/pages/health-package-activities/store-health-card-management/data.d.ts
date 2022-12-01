export type DetailProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  sn?: string
  dataSource?: {
    cardNo: string
    ownerMobile: string
    remainingNum: string
    totalNum: string
  }
}

export type DataProps = {
  id: string
  useTime: number
  useOrderNo: string
  useDeviceNo: string
  cardNo: string
}
