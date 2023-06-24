type DetailProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  enventType?: string
}

type TableProps = {
  event: string
  name: string
  setPointPosition: string
}

export { DetailProps, TableProps}