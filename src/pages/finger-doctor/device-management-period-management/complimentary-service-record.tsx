import TimeSelect from '@/components/time-select'
import React from 'react';
import { Button, Divider, Image } from 'antd';
import { deviceDoctorPage } from "@/services/finger-doctor/device-management-period-management"
import ProTable from '@/components/pro-table'
import type { DetailProps } from './data'
import { DrawerForm } from '@ant-design/pro-form';
import type { ProColumns }  from "@ant-design/pro-table"

const columns: ProColumns[] = [
  {
    title: '',
    dataIndex: 'memberPhone',
    valueType: 'text',
    align: 'center',
    hideInTable: true,
    fieldProps: {
      placeholder: '请输入获取用户手机号',
    }
  },
  {
    title: '',
    dataIndex: 'dateTimeRange',
    renderFormItem: () => <TimeSelect />,
    align: 'center',
    hideInTable: true,
    fieldProps: {
      style: {
        width: 400 
      }
    }
  },
  {
    title: '序号',
    dataIndex: 'id',
    valueType: 'text',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '获赠人手机',
    dataIndex: 'memberPhone',
    valueType: 'text',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '获赠次数',
    dataIndex: 'freeTimes',
    valueType: 'text',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '获赠次数有效截止日',
    dataIndex: 'effectiveDate',
    valueType: 'text',
    align: 'center',
    hideInSearch: true
  },
  {
    title: '可调整凭证',
    dataIndex: 'givenVoucher',
    valueType: 'text',
    render: (text) => (
      text&&typeof text==='string'
        ? <Image src={text} width={50} height={50} />
        : ''
    ),
    align: 'center',
    hideInSearch: true
  },
  {
    title: '操作人',
    dataIndex: 'operater',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInSearch: true
  }
];

const HistoricalManagement: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, datailMsg, onClose } = props;
  return (
    <DrawerForm
      title="赠送启用服务记录"
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
        request={deviceDoctorPage}
        pagination={{
        showQuickJumper: true,
        pageSize: 10
        }}
        params={{
          imei:datailMsg?.imei
        }}
        style={{ width: '100%' }}
        search={{
            defaultCollapsed: true,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse()
            ],
          }}
      />
    </DrawerForm>
  )
}

export default HistoricalManagement;
