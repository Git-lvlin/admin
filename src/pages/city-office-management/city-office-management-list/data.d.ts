export type DescriptionsProps = {
  totalNum: string;
  vipStoreNum: string;
  commonStoreNum: number;
  allDeviceNum: number;
  hostingDeviceNum: number;
  operateNum: string;
  hostingUserNum: string;
  operateUserNum: string;
  salesDeviceNum: number;
}

export type TableProps = {
  manager: string;
  name: string;
  managerPhone: string;
  vipStoreNums: number;
  hostingDeviceNum: number;
  userName: string;
  accountId: number;
  agencyId: number;
  commonStoreNums: number;
  allDeviceNum: number;
  operateDeviceNum: string;
  hosingUserNum: string;
  operateUserNum: string;
}

export type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};