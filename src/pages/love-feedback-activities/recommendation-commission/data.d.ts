export type DetailProps = {
  id?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  totalAmount: number
}

export type DataProps = {
  buyerId: number;
  buyerMobile: string;
  orderNo: string;
  payTime: string;
  packageName: string;
  amount: number;
  commission: number;
}