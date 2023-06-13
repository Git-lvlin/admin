export type DetailProps = {
  id?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  totalAmount: number
}

export type DataProps = {
  payAmount: number
  payTime: string
  memberPhone: string
  orderNo: string
  homeNumber: string
  skuId: number
  doorNumber: string
  goodsName: string
  commissionDesc: string
  createTime: string
}