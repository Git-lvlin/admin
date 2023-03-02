export type DetailDrawerProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  state?: string
}

export type DataProps = {
  orderSn?: string
  memberPhone?: string
  consignee?: string
  packageTitle?: string
  totalAmount?: number
  phone?: string
  createTime?: string
  remark?: string
  fulladdress?: string
  payStatusStr?: string
  payTime?: string
  buyNum?: number
  orderItems: []
  cardItems: []
}