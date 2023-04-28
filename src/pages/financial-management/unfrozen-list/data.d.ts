export type modelProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  type: number
  callback: () => void
  id?: string
}