export type paymentInfoProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: dataProps
}

export type modifyRecordProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  data?: dataProps
}

export declare type dataProps = {
  buyerMobile: string
  orderSn: string
  payTime: string
  orderStatusDesc: string
  realName: string
  cardNo: string
  bankName: string
  bankBranchName: string
}