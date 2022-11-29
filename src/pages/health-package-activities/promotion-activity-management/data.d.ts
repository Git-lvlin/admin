export type DetailProps = {
  visible: boolean
  handleCancel: () => void
  storeNo?: string
}

export type DataProps = {
  storeHouseNumber: string
  storeName: string
  address: string
  realName: string
  memberPhone: string
  img: [string]
}

export type ImageDetailProps = {
  visible: boolean
  handleCancel: React.Dispatch<React.SetStateAction<boolean>>
  storeNo?: string
  callback: () => void
}