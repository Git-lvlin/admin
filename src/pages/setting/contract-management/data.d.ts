export type TableProps = {
  id: number;
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
  supplierId: string;
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
  signTime: string
}

export type MiniQrProps = {
  imgUrl?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  fileUrl?: string
}