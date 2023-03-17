export type goodsProps = {
  id?: string
  title?: {
    phone: string
    id: string
    packageName: string
    pushTime: string
  }
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  visible: boolean
}

export type NotificationConfigProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
}

export type dataProps = {
  title: string
  content: string
  time: string
}