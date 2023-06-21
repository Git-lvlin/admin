export type CategoryProps = {
  title?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
}

export type editProps = {
  id?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
}