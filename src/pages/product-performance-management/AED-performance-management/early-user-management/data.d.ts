export type registFormProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  phone?: string
  time?: string
  id?: string
}

export type cancelRegisterProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: any
  callback: () => void
}

export type refundRequestRemarksProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  callback: () => void
  type: boolean
  data?: any
}

export type noticeProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: any
  callback: ()=> void
}