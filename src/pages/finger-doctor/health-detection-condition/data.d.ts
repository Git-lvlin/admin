import type { FormInstance } from 'antd'

declare const ListTypes: ["single", "multiple"]
declare type ListType = typeof ListTypes[number]

export type dataProps = {
  name: string
  id: number
}

export type ListProps = {
  id: number
  spuId: string
  goodsName: string
  isMultiSpec: boolean
  goodsSaleMinPriceDisplay: string
  goodsSaleMaxPriceDisplay: string
  solution: dataProps[]
  solutionId: dataProps[]
  goods: ListProps[]
  list: ListProps[]
  name: string
}

export type symptomListProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: (v: data[])=> void
  gender: string
  skuData: dataProps[]
}

export type singleSchemeProps = {
  formRef: React.MutableRefObject<FormInstance<any> | undefined>
  fieldsName: (string | number)[] | string
  type: ListType
  idx?: number
  listType?: number
}

export type giftListProps = {
  label: string
  value: number
}

export type multipleSchemesProps = {
  formRef: React.MutableRefObject<FormInstance<any> | undefined>
  gender: string
  type: number
  name: (string | number)[] | string
  giftData: giftListProps[]
}

export type schemeNameProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
}