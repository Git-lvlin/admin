export type DescriptionsProps = {
  payAmount: number;
  orderNum: number;
  commission: number;
  teamNum: number;
  subNum: number;
}

export type TableProps = {
  subId?: number;
  commission?: number;
  typeDesc?: string;
  payAmount?: number;
  manager?: string;
  managerPhone?: string;
  subName?: string;
  orderNum?: number;
  id?: number;
  type?: number;
  memberId?: string;
}

export type Refer = {
  subId: number;
  managerPhone: string;
  subName: string;
  type: number;
  memberId: string;
}