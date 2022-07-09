import React from 'react';
import { Drawer } from 'antd';
import ProTable from '@ant-design/pro-table';
import { deliveryLog } from '@/services/intensive-activity-management/intensive-activity-list';
import type { ProColumns } from '@ant-design/pro-table';

type GithubIssueItem = {
  period: string,
  createTime: string,
  orderCount: string,
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '期数',
    dataIndex: 'period',
  },
  {
    title: '推送时间',
    dataIndex: 'createTime',
  },
  {
    title: '推送采购单数',
    dataIndex: 'orderCount',
  },
];

type DeliveryLogProps = {
  setVisible: (v: boolean) => void,
  id: string,
}


const DeliveryLog: React.FC<DeliveryLogProps> = (props) => {
  const { setVisible, id } = props;

  return (
    <Drawer
      title="已推送采购单"
      width={800}
      placement="right"
      onClose={() => { setVisible(false) }}
      visible
    >
      <ProTable
        params={{
          wsId: id,
        }}
        options={false}
        search={false}
        request={deliveryLog}
        columns={columns}
      />
    </Drawer>
  )
}

export default DeliveryLog;
