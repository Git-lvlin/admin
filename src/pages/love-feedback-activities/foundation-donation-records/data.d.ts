export type FormProps = {
  tradeTime?: string
  phone?: string
  userName?: string
  packageId?: string
  payNum?: number
  payAccount?: string
  replySlipNo?: string
  attachment?: string
  attachment?: string
}

export type AddRecordProps = { 
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
 }

export type dataProps = {
  salePrice: number
  packageId: string
}