export type DetailProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  sn?: string
  dataSource?: {
    houseNumber: string
    memberPhone: string
    orderNums: string
    storeNo: string
  }
}

export type DataProps = {
  packageName: string
  payAmount: number
  createTime: string
  orderSn: string
  cardNum: string
  memberPhone: string
}
