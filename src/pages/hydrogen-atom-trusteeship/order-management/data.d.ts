export type ExpressInfoProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: {
    orderId: string
    storePhone: string
    companyNo: string
    receiptTimeDesc: string
  }
}

export type ListProps = {
  time: string
  content: string
}