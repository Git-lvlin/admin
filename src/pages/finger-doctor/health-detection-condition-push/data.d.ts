export type goodsProps = {
  id?: string
  title?: {
    phone: string
    id: string
    packageName: string
    pushTime: string
    reportUrl: string
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

export type submitModalProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  api: any
  data: any
  callback: ()=> void
}