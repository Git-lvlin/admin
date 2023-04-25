export type editProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id1?: string
  id2?: string
  callback: () => void
  type: string
}

export type modelFormProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  callback: () => void
  type: string
}

export type dataProps = {
  id: number
  gcId1Name: string
  gcId2Name: string
  words: string
  status: number
}