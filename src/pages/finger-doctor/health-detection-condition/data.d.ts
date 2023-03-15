export type ListProps = {
  id: number
  spuId: string
  goodsName: string
  isMultiSpec: boolean
  goodsSaleMinPriceDisplay: string
  goodsSaleMaxPriceDisplay: string
  goods: string
}

export type symptomListProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback?: (v: any)=> {}
}