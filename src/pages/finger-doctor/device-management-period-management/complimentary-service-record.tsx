import React, { useEffect } from 'react';
import { Button, Divider, Image } from 'antd';
import { getUser,userReport } from "@/services/finger-doctor/user-health-data-management"
import ProTable  from "@ant-design/pro-table"
import type { DetailProps, DataType } from './data'
import { DrawerForm } from '@ant-design/pro-form';
import type { ProColumns }  from "@ant-design/pro-table"

const columns: ProColumns[] = [
  {
    title: '',
    dataIndex: 'id',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInTable: true,
    fieldProps: {
      placeholder: '请输入获取用户手机号',
    }
  },
  {
    title: '',
    dataIndex: 'id',
    valueType: 'dateTimeRange',
    render: (_) => _,
    align: 'center',
    hideInTable: true
  },
  {
    title: '序号',
    dataIndex: 'id',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '获赠人手机',
    dataIndex: 'checkResult',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '获赠次数',
    dataIndex: 'checkVal',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '获赠次数有效截止日',
    dataIndex: 'checkTime',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '可调整凭证',
    dataIndex: 'reportUrl',
    valueType: 'text',
    render: (text) => (
      text
        ? `<Image src="${text}" width="50" height="50" />`
        : ''
    ),
    align: 'center',
    hideInSearch: true
  },
  {
    title: '操作人',
    dataIndex: 'reportUrl',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInSearch: true
  },
  {
    title: '操作时间',
    dataIndex: 'reportUrl',
    valueType: 'text',
    render: (_) => _,
    align: 'center',
    hideInSearch: true
  }
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
