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
}