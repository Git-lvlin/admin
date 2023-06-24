export type modelProps = {
  phone?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  callback: () => void
}