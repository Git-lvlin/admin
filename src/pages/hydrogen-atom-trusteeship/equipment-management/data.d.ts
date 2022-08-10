export type LaunchEquipmentProps= {
  title?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback?: Promise<void>
}

export type ListProps = {
  store: string
  phone: string
  address: string
  id: number
}