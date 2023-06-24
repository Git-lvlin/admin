export type editProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: {
    memberMobile: string
    orderId: string
    name: string
    certificateUrl: string
    gender: number
    clothSize: string
  }
  callback: () => void
}
