export type DetailProps = {
  id?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  totalAmount: number
}

export type DataProps = {
  payAmount: number
  createTime: string
  memberPhone: string
  orderSn: string
  quantity: string
}