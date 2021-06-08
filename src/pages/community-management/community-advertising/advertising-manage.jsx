import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adminReportDetailList } from '@/services/community-management/report-admin-report-detail-list';
import  ProForm,{ ModalForm,ProFormSelect,ProFormRadio,ProFormText} from '@ant-design/pro-form';
import { Button, Tabs } from 'antd';

export default props => {
let id = props.location.query.id
const [visible, setVisible] = useState(false);
const actionRef = useRef();
const Termination=()=>{
  setVisible(true)
}
const columns= [
  {
      title: 'ID',
      dataIndex: 'userId',
  },
  {
      title: '广告位名称',
      dataIndex: 'userName',
      valueType: 'text',
  },
  {
      title: '状态',
      dataIndex: 'type',
      valueType: 'text',
  },
  {
      title:'操作',
      valueType:'text',
      render:()=>[
        <ModalForm
            title="编辑广告位"
            key="model2"
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<Button onClick={Termination}>编辑</Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                console.log('values',values);
                setVisible(false)
                message.success('提交成功');
                return true;
            }}
        >
         <ProFormText
            width="md"
            name="name"
            label="广告位名称"
            tooltip="最长为 24 位"
            placeholder="请输入名称"
        />
         <ProFormRadio.Group
            name="hot"
            label="广告位状态"
            options={[
                {
                  label: '启用',
                  value: 1
                },
                {
                  label: '关闭',
                  value: 2
                }
            ]}
        />
        </ModalForm>
      ]
  }
];
  return (
      <PageContainer>
          <ProTable
            rowKey="userId"
            options={false}
            params={{
              page:0,
              size:5,
              sourceId:id,
              status:1,
            }}
            // request={adminReportDetailList}
            actionRef={actionRef}
            search={false}
            toolBarRender={false}
            columns={columns}
          />
    </PageContainer>
  );
};
