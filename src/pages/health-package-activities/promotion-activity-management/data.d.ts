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
  memberId: string
}

export type ImageDetailProps = {
  visible: boolean
  handleCancel: React.Dispatch<React.SetStateAction<boolean>>
  storeNo?: string
  callback: () => void
}

export type SaveCardProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: DataProps
  callback: () => void
}

export type GiftCardProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  data?: DataProps
}

export type PopSubmitProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: {
    ownerMobile: string
  }
  back: () => void
}