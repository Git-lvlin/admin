import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adminReportList } from '@/services/community-management/report-adminreportlist';
import { history } from 'umi';
import  ProForm,{ ModalForm,ProFormSelect} from '@ant-design/pro-form';
import { Button } from 'antd';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default props => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  function callback(key) {
    console.log(key);
  }
  const Termination=()=>{
    setVisible(true)
  }
  const Termination2=()=>{
    setVisible2(true)
  }
  const columns = [
    {
        title: '评论ID',
        dataIndex: 'sourceId',
        hideInSearch: true,
    },
    {
        title: '评论内容',
        dataIndex: 'content',
        valueType: 'text',
        hideInSearch: true,
    },
    {
        title: '被举报次数',
        dataIndex: 'count',
        valueType: 'text',
        render:(text, record, _, action)=>[
          <a onClick={()=>history.push('/community-management/review-report/admin-report-detaillist?id='+record.sourceId)}>{record.count}</a>
        ],
        hideInSearch: true,
    },
    {
        title: '所属会员ID',
        dataIndex: 'sourceUserId',
        valueType: 'text',
        hideInSearch: true,
    },
    {
      title: '操作',
      render: () => [
        <ModalForm
          title="操作确认"
          key="model2"
          onVisibleChange={setVisible}
          visible={visible}
          trigger={<Button onClick={Termination}>忽略</Button>}
          submitter={{
          render: (props, defaultDoms) => {
              return [
              ...defaultDoms
              ];
          },
          }}
          onFinish={async (values) => {
              console.log('values',values);
              // dynamicDelete({id:record.id})
              setVisible(false)
              message.success('提交成功');
              return true;
          }}
            >
            <p>确认要处理所选评论为忽略吗？</p>
        </ModalForm>,
          <ModalForm
            title="操作确认"
            key="model2"
            onVisibleChange={setVisible2}
            visible={visible2}
            trigger={<Button onClick={Termination2}>屏蔽</Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                console.log('values',values);
                // dynamicDelete({id:record.id})
                setVisible2(false)
                message.success('提交成功');
                return true;
            }}
            >
            <p>确认要处理所选评论为屏蔽吗？</p>
        </ModalForm>
      ],
      hideInSearch: true,
  }
];
const columns2 = [
  {
      title: '评论ID',
      dataIndex: 'sourceId',
      hideInSearch: true,
  },
  {
      title: '评论内容',
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch: true,
  },
  {
      title: '被举报次数',
      dataIndex: 'count',
      valueType: 'text',
      render:(text, record, _, action)=>[
        <a onClick={()=>history.push('/community-management/review-report/admin-report-detaillist?id='+record.sourceId)}>{record.count}</a>
      ],
      hideInSearch: true,
  },
  {
      title: '所属会员ID',
      dataIndex: 'sourceUserId',
      valueType: 'text',
      hideInSearch: true,
  },
  {
      title: '处理结果',
      dataIndex: 'handlerResult',
      valueType: 'select',
      valueEnum: {
          1: '忽略',
          2: '屏蔽',
      }
  },
  {
      title: '操作人',
      dataIndex: 'handlerUserId',
      valueType: 'text',
      hideInSearch: true,
  },
  {
      title: '操作时间',
      dataIndex: 'handlerTime',
      valueType: 'text',
      hideInSearch: true,
  }
];
  const onIpute=(res)=>{
  }
  return (
    <Tabs onChange={callback} type="card">
      <TabPane tab="未处理" key="1">
        <ProTable
          rowKey="sourceUserId"
          options={false}
          params={{
            page:0,
            size:1,
            status:0,
            type:2
          }}
          request={adminReportList}
          actionRef={actionRef}
          toolBarRender={false}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
              <Button>忽略</Button>,
              <Button>屏蔽</Button>
            ],
        }}
          columns={columns}
          rowSelection={{}}
          tableAlertOptionRender={onIpute}
        />
      </TabPane>
      <TabPane tab="已处理" key="2">
          <ProTable
            rowKey="sourceUserId"
            options={false}
            params={{
              page:0,
              size:5,
              status:0,
              type:1
            }}
            request={adminReportList}
            actionRef={actionRef}
            search={{
                defaultCollapsed: false,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                    ...dom.reverse(),
                ],
            }}
            columns={columns2}
          />
      </TabPane>
    </Tabs>
  );
};
