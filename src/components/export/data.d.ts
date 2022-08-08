declare type TooltipPlacement = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'

export type ExprotProps = {
  type: string
  change?: React.Dispatch<React.SetStateAction<boolean>>
  conditions?: object | [ () => void ]
  text?: string
  slot?: JSX.Element
  slotHistory?: (v: React.DOMAttributes)=> React.ReactChild
  fileName?: string
  placement?: TooltipPlacement
}

export type ExportHistoryProps = {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  type: string,
  slot?: (v: React.DOMAttributes)=> React.ReactChild
  placement?: TooltipPlacement
}

export type ExprotStateProps = {
  state: number
  desc: string
}

export type DataProps = {
  code: string
  createId: string
  createName: string
  createTime: string
  exceptionDes: string
  exportConfigId: string
  exportType: number
  fileType: number
  fileUrl: string
  id: number
  process: number
  state: number
}
