import React, { useEffect } from 'react';
import { Button, Divider } from 'antd';
import { getUser,userReport } from "@/services/finger-doctor/user-health-data-management"
import ProTable  from "@ant-design/pro-table"
import type { DetailProps, DataType } from './data'
import { DrawerForm } from '@ant-design/pro-form';
import type { ProColumns }  from "@ant-design/pro-table"

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
    dataIndex: 'checkResult',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '缴费单号',
    dataIndex: 'checkVal',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '当前管理期类型',
    dataIndex: 'checkTime',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '支付方式',
    dataIndex: 'reportUrl',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '缴费时间',
    dataIndex: 'reportUrl',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '支付金额（元）',
    dataIndex: 'reportUrl',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
  {
    title: '缴费管理期时段',
    dataIndex: 'reportUrl',
    valueType: 'text',
    render: (_) => _,
    align: 'center'
  },
];

const HistoricalManagement: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, datailMsg, onClose } = props;

  useEffect(() => {
    (getUser({
      imei:datailMsg?.imei
    }) as Promise<{ data: DataType, code: number }>).then(res => {
      if (res.code === 0) {
        
      }
    }).finally(() => {
      
    })
  }, [datailMsg])

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
        rowKey='checkVal'
        columns={columns}
        options={false}
        request={userReport}
        pagination={{
        showQuickJumper: true,
        pageSize: 10
        }}
        params={{
          iemi:datailMsg?.imei
        }}
        style={{ width: '100%' }}
        search={false}
      />
    </DrawerForm>
  )
}

export default HistoricalManagement;
