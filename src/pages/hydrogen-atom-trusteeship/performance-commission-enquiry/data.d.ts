export type LaunchEquipmentProps= {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  callback: () =>void 
  orderId?: string
  type: number
}

export type TransactionProps = {
  buyerPhone: string;
  cityAgent: string;
  inviterAddress: string;
  inviterAreaInfo: string;
  inviterPhone: string;
  inviterStoreNo: string;
  operationCenter: string;
  orderSn: string;
  payAmount: number;
  payTime: number;
  provinceAgent: string;
  status: number;
}

export interface TableProps {
  id: number;
  memberPhone: string;
  memberId: string;
  payOrderSn: string;
  payTime: string;
  payType: string;
  payAmount: number;
  shopMemberAccount: string;
  storeName: string;
  area: string;
  qualificationNum: number;
}

export interface LeaseTableProps {
  id: number;
  memberPhone: string;
  memberId: string;
  payOrderSn: string;
  payTime: string;
  payType: number;
  leasePeriodAmount: number;
  shopMemberAccount: string;
  storeName: string;
  area: string;
  leaseDay: number;
  subOrderSn: string;
  leaseTitle: string;
  imei: string;
}

export type DescriptionsProps = {
  deviceTotalPay: number;
  memberIdCount: number;
  deviceTotal: number;
  paidRental: number;
  leaseCount: number;
  totalAmount: number;
  totalStoreNum: number;
  totalSalesVolume: number;
}