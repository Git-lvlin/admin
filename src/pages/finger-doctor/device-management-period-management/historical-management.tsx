import React from 'react';
import { Button, Divider } from 'antd';
import { manageOrderList } from "@/services/finger-doctor/device-management-period-management"
import ProTable from '@/components/pro-table'
import type { DetailProps } from './data'
import { DrawerForm } from '@ant-design/pro-form';
import type { ProColumns }  from "@ant-design/pro-table"
import { amountTransform } from '@/utils/utils';

const columns: ProColumns[] = [
  {
    title: '序号',
    dataIndex: 'id',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '缴费时设备状态',
    dataIndex: 'memberDeviceStatus',
    valueType: 'select',
    valueEnum: {
      0: '待绑定',
      2: '正常',
      3: '停用'
    },
    align: 'center'
  },
  {
    title: '缴费单号',
    dataIndex: 'orderSn',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '当前管理期类型',
    dataIndex: 'manageType',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '支付方式',
    dataIndex: 'payType',
    valueType: 'select',
    valueEnum: {
      0: '模拟支付'
    },
    align: 'center'
  },
  {
    title: '缴费时间',
    dataIndex: 'payTime',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '支付金额（元）',
    dataIndex: 'payAmount',
    valueType: 'text',
    render: (_) => {
      if(typeof _ === 'string' && /^\d+$/.test(_)){
        return amountTransform(_,'/').toFixed(2)
      }else{
        return '-'
      }
    },
    align: 'center'
  },
  {
    title: '缴费管理期时段',
    dataIndex: 'startTime',
    valueType: 'text',
    render: (_,data) => {
      return `${data?.startTime}——${data?.endTime}`
    },
    align: 'center'
  },
];

const HistoricalManagement: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, datailMsg, onClose } = props;

  return (
    <DrawerForm
      title="历史缴纳管理费记录"
      width={1200}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
          setVisible(false);
        }
      }}
      visible={visible}
      submitter={{
        render: (props, defaultDoms) => {
            return [
                <Button type='primary' onClick={()=> { setVisible(false); onClose() }}>返回</Button>
            ];
        },
        }}
    >
    <p style={{ marginBottom: -10, color:'#8D8D8D' }}>用户手机号：{datailMsg?.memberPhone}  &nbsp; 设备编号：{datailMsg?.imei}    &nbsp; 当前剩余管理期{datailMsg?.remainManageDayStr}天</p>
      <Divider />
      <ProTable
        rowKey='id'
        columns={columns}
        options={false}
        request={manageOrderList}
        pagination={{
        showQuickJumper: true,
        pageSize: 10
        }}
        params={{
          memberDeviceId:datailMsg?.id
        }}
        style={{ width: '100%' }}
        search={false}
      />
    </DrawerForm>
  )
}

export default HistoricalManagement;
