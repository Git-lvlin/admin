export type categoryDataProps = {
  level: number
  label: string
  value: number
  id: number
  pid: number
}

export type cascaderProps = {
  value: number[]
  setValue: React.Dispatch<React.SetStateAction<number[]>>
  pId?: number
}