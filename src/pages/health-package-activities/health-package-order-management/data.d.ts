export type DetailProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
}

export type DataProps = {
  orderId: string
  memberPhone: string
  consignee: string
  packageTitle: string
  payAmount: number
  phone: string
  createTime: string
  payTypeStr: number
  fulladdress: string
  payStatusStr: number
  payTime: string
  buyNum: number
  orderItems: []
  cardItems: []
}

export type ServiceProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: ListDataProps[]
}

export type ListDataProps = {
  cardNo: string
  cardNum: number
}