export type LaunchEquipmentProps= {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () =>void 
  orderId?: string
  type: number
}

export type ListProps = {
  store?: string
  realname: string
  memberPhone: string
  id: number
  fullAddress: string
  storeNo: string
  storeName: string
  shopMemberAccount: string
  provinceName: string
  cityName: string
  regionName: string
  address: string
  houseNumber: string
  statusStr: string
  statusCode: number
}

export interface StayPutProps {
  orderId: string
  hostingOrderId: string
  hostingMemberPhone: string
  hostingArea: string
  hostingHouseNumber: string
  hostingPayTime: number
  status: string
  statusVal: number
  reason: string
  storePhone: string
  storeArea: string
  storeName: string
  storeHouseNumber: string
  storeUserName: string
  storeAddress: string
  deadlineDay: string
}

export type DeliveryProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void 
  data?: StayPutProps
}

export type ModalFormProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  type: number
  orderId?: string
  callback: () => void
}

export type OptProps = {
  optContent: string
}

export type OperatingProps = {
  imei: string
  orderId: string
  storePhone: string;
  hostingMemberPhone: string
  storeHouseNumber: string
  useStatus: number
  useStatusDesc: string
  lastStartUpTime: string
  examType: number
  examReason: string
  useTime: string
  stopOperateType: string
  isShowLeaseBtn: number
  leaseStatus: number
  leaseDeadline: string
  deadlineDay: string
  hostingPayAmount: string
  payDeadline: string
  storeQualificationId: string
  packageName: string
  leaseTimeTip: string
}

export type ModificationProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  orderId?: string
  useTime?: string
  data?: OperatingProps
  callback: () => void
}

export type OptionImeiProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: OperatingProps
  callback: () => void
}

export type StopOperationProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
  data?: OperatingProps
}

export type StopOperationFormProps = {
  optType: number
  optContent: string
  examType: number
}

export type TerminateManagedProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () => void
  data?: OperatingProps
  title?: string
  type?: number
}

export type DivideProps ={
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  data?: OperatingProps
}

export type DealAmountProps = {
  data?: OperatingProps
  type: number
}

export type listDataProps = {
  orderId?: string
  agentDeviceId?: string
  hostingOrderId?: string
  storeName?: string
  storePhone?: string
  qualificationId?: string
  activationTime?: string
  stopOperateTime?: string
  hostingOrderSn?: string
}

export type InfoProps = {
  amountTips: string[]
  endTips: string
}