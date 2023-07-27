export type adsConfigProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  type?: string
  callback: () => void
  adName?: string
  code?: string
  data?: any
}