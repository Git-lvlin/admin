export type DetailProps = {
  id?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  totalAmount?: number
  type: number
}

export type DataProps = {
  payAmount: number
  payTime: string
  memberPhone: string
  orderSn: string
  homeNumber: string
  goodsName: string
  skuId: number
  commissionDesc: string
  createTime: string
  orderNo: string
  doorNumber: string
  quantity: string
}