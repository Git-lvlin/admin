export type DetailProps = {
  id?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
}

export type DataProps = {
  amount: number
  payTime: string
  buyerMobile: string
  orderNo: string
  shopMemberAccount: string
}