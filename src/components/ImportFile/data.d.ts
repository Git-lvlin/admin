export type importProps = {
  code: string
  operatorSource?: number
  url?: string
  title?: string
  operatorName?: string
}

export type historyProps = {
  code: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export type stateProps = {
  state: number
  desc: string
}

export type resultPorps = {
  state: number
  failNum: number
  href: string
  process: number
}

export type dataProps = {
  id: string
  state: number
  exceptionDes: string
  count: number
  processCount: number
  errorCount: number
  createTime: string
  errorFileUrl: string
  process: number
}