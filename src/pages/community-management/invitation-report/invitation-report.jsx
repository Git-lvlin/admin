import React, { useState, useRef,useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { adminReportList } from '@/services/community-management/report-admin-report-list';
import { reportHandle } from '@/services/community-management/report-handle';
import { history } from 'umi';
import InvitationDetail from './invitation-detail'
import  ProForm,{ ModalForm,ProFormSelect} from '@ant-design/pro-form';
import { Button } from 'antd';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

export default props => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [byid, setByid] = useState();
  const [byid2, setByid2] = useState();
  const [byid3, setByid3] = useState();
  const [byid4, setByid4] = useState();
  function callback(key) {
    console.log(key);
  }
  const Termination=(record)=>{
    console.log('byid',record)
    setByid(record.sourceId)
    setVisible(true)
  }
  const Termination2=(record)=>{
    setByid2(record.sourceId)
    setVisible2(true)
  }
  const Termination3=(record)=>{
    setByid3(record.sourceId)
    setVisible3(true)
  }
  const Termination4=()=>{
    setByid4(record.id)
    setVisible4(true)
  }
  const columns = [
    {
        title: '内容ID',
        dataIndex: 'sourceId',
        hideInSearch:true
    },
    {
        title: '被举报次数',
        dataIndex: 'count',
        valueType: 'text',
        render:(text, record, _, action)=>[
          <a onClick={()=>history.push('/community-management/review-report/admin-report-detail-list?id='+record.sourceId)}>{record.count}</a>
        ],
        hideInSearch:true
    },
    {
        title: '所属会员ID',
        dataIndex: 'sourceUserId',
        valueType: 'text',
        hideInSearch:true
    },
    {
      title: '操作',
      render: (text, record, _, action) => [
        <ModalForm
          title="操作确认"
          key="1"
          onVisibleChange={setVisible}
          visible={visible}
          trigger={<Button onClick={()=>Termination(record)}>预览</Button>}
            >
            <InvitationDetail id={byid}/>
        </ModalForm>,
        <ModalForm
          title="操作确认"
          key="2"
          onVisibleChange={setVisible2}
          visible={visible2}
          trigger={<Button onClick={()=>Termination2(record)}>忽略</Button>}
          submitter={{
          render: (props, defaultDoms) => {
              return [
              ...defaultDoms
              ];
          },
          }}
          onFinish={async (values) => {
              console.log('values',values);
              reportHandle({sourceId:byid2,status:1})
              setVisible2(false)
              message.success('提交成功');
              return true;
          }}
            >
            <p>确认要处理所选评论为忽略吗？</p>
        </ModalForm>,
          <ModalForm
            title="操作确认"
            key="3"
            onVisibleChange={setVisible3}
            visible={visible3}
            trigger={<Button onClick={()=>Termination3(record)}>屏蔽</Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                console.log('values',values);
                reportHandle({sourceId:byid3,status:2})
                setVisible3(false)
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
        title: '内容ID',
        dataIndex: 'sourceUserId',
        valueType: 'text',
        hideInSearch: true,
    },
    {
        title: '被举报次数',
        dataIndex: 'count',
        valueType: 'text',
        hideInSearch: true,
        render:(text, record, _, action)=>[
          <a onClick={()=>history.push('/community-management/review-report/admin-report-detail-list?id='+record.sourceId)}>{record.count}</a>
        ]
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
    },
    {
      title: '操作',
      render: () => [
        <ModalForm
          title="操作确认"
          key="1"
          onVisibleChange={setVisible4}
          visible={visible4}
          trigger={<Button onClick={()=>Termination4(record)}>预览</Button>}
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
              setVisible4(false)
              message.success('提交成功');
              return true;
          }}
            >
            <p>预览</p>
        </ModalForm>
      ],
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
            type:1
          }}
          request={adminReportList}
          actionRef={actionRef}
          toolBarRender={false}
          search={{
            optionRender: (searchConfig, formProps, dom) => [
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
              status:3,
              type:'1'
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
