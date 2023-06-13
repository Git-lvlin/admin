export type categoryDataProps = {
  level: number
  label: string
  value: number
  id: number
  pid: number
}

export type cascaderProps = {
  value?: number[]
  pId?: number
  maxLength: number
  onChange?: (value: T) => void
  [x: string]
}