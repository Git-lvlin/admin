export type TableProps = {
  id: string;
  name: string;
  phone: string;
  type: number;
  pactNo: string;
  pactUrl: string;
  signTime: number;
  thirdContractId: string;
  signStatus: number;
  downUrl: string;
  checkUrl: string;
  createTime: number;
  payAmount: number;
  payTypeDesc: string;
  orderNo: string;
  operateName: string;
  operateTime: number;
  payStatus: number;
  supplierId: number;
  contractUrl: string;
}

export type AddContractProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: ()=> void
  data?: ModalFormProps
}

export type SupplierListProps = {
  supplierId: number
  companyName: string
  phone: string
}

export interface SupplierSelectProps extends SupplierListProps {
  label: React.ReactNode
  value?: string | number | null
}

export type ModalFormProps = {
  type: number
  signStatus: number
  supplierId: number
  name: string
  phone: string
  pactUrl: string
  pactNo: string
  signTime: number
  id: number
  operateName: string
  createTime: number
}

export type MiniQrProps = {
  imgUrl?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  fileUrl?: string
  storeName?: string
}

export type OperationLogProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
}

export type OptLogTableProps = {
  id: number
  contractId: string
  optRole: string
  optName: string
  optItem: number
  optContent: string
  createTime: number
  optItemDesc: string
}

export type EditContractProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  data?: ModalFormProps
  callback: ()=> void
}
