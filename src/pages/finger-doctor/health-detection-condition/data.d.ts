import type { FormInstance } from 'antd'

declare const ListTypes: ["single", "multiple"]
declare type ListType = typeof ListTypes[number]

export type data = {
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
  solution: data[]
  solutionId: data[]
  goods: ListProps[]
  list: ListProps[]
  name: string
}

export type symptomListProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: (v: data[])=> void
  gender: string
  skuData: data[]
}

export type singleSchemeProps = {
  formRef: React.MutableRefObject<FormInstance<any> | undefined>
  fieldsName: (string | number)[] | string
  type: ListType
  idx?: number
}