export type DescriptionsProps = {
  agencyTotalNum: string;
  agencyLoginNum: string;
  vipStoreNum: string;
  commonStoreNum: number;
  rentMachineNum: number;
  sellMachineNum: number;
}

export type TableProps = {
  manager: string;
  name: string;
  managerPhone: string;
  agencyId: number;
  userName: string;
  accountId: number;
  vipStoreNums: number;
  commonStoreNums: number;
  rentMachineNum: number;
  sellMachineNum: number;
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