export type ExprotProps = {
  type: number
  change: React.Dispatch<React.SetStateAction<boolean>>
  conditions: object | [ ()=> void ]
  text: string
}