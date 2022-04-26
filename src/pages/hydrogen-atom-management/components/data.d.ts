export type PropsDevices = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  type: number
  memberId?: string
  memberPhone?: string
  showTitle?: boolean
}

export type PropsData = {
  id: string
  orderAmount: number
  imei: string
  createTime: number
  orderSn: string
  leaseTerm: string
  payTime: string
  payTypeStr: string
  deviceUseTime: string
  deviceImei: string
  payType: string
  payAmount: string
  amount: number,
  orderNo: string
  commissionType: number
  bindPhone: string
  opType: number
  createRole: string
}

export type PropsStatistics = {
  orderCount: string
  totalOrderAmount: string
  totalAmount: string
  dateDoc: string
  sumAmount: number
  totalDriverCount: number

}



