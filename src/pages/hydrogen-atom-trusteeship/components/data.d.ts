import React from "react"

export type RangeInputProps = {
  firstPlaceholder: string
  lastPlaceholder: string
}

export type DevicesProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  type: number
  showTitle?: boolean
  storeNo?: string
  user?: string
  deviceNum?: number
  amount?: number
  imei?: string
}

export type DataProps = {
  hostingMemberPhone: string
  optTitle: string
  orderId: string
  optAdminId: string
  reason: string
  optContent: string
  stopTime: string
  buyerPhone: string
  activationTime: string
  optDay: string
  qualificationAmount: number
  payType: number
  expireTime: string
  payTime: string
  payOrderNo: string
  hostingPayAmount: number
  imei: string
  createTime: number
  hostingOrderId: string
  statusDesc: string
  contractDesc: string
  afterSalesDesc: string
  storeHouseNumber: string
  storeName: string
  optTime: string
  storeAddress: string
  optName: string
  optItem: string
  optRole: string
  name: string
  val: string
  packageName: string
  leaseEnd: string
  payAmount: number
  payTime: string
  payTypeDesc: string
  payOrderSn: string
}
