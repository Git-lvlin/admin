import React, { useState, useRef,useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { adminReportList } from '@/services/community-management/report-admin-report-list';
import { reportHandle } from '@/services/community-management/report-handle';
import { history } from 'umi';
import InvitationDetail from './invitation-detail'
import  ProForm,{ ModalForm,ProFormSelect} from '@ant-design/pro-form';
import { Button } from 'antd';
import { Tabs } from 'antd';
import HandleModel from '@/components/HandleModel'
const { TabPane } = Tabs;

export default props => {
  const actionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [byid, setByid] = useState();
  const [byid4, setByid4] = useState();
  const [arrId,setArrId]=useState([])
  function callback(key) {
    console.log(key);
  }
  const Termination=(record)=>{
    console.log('byid',record)
    setByid(record.sourceId)
    setVisible(true)
  }
  const Termination4=(record)=>{
    setByid4(record.sourceId)
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
          submitter={{
            render: (props, defaultDoms) => {
                return [
                 <Button onClick={()=>setVisible(false)}>返回</Button>
                ];
            },
            }}
          trigger={<Button onClick={()=>Termination(record)}>预览</Button>}
            >
            <InvitationDetail id={byid}/>
        </ModalForm>,
        <HandleModel 
          record={record} 
          status={1}  
          label={'忽略'}  
          text={'确认要处理所选评论为忽略吗？'} 
          InterFace={reportHandle} 
          title={'操作确认'}
        />,
        <HandleModel 
          record={record} 
          status={2}   
          label={'屏蔽'}  
          text={'确认要处理所选评论为屏蔽吗？'} 
          InterFace={reportHandle} 
          title={'操作确认'}
        />,
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
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: {
            1: '忽略',
            2: '屏蔽',
        },
        hideInTable:true
    },
    {
        title: '处理结果',
        dataIndex: 'handlerResult',
        valueType: 'text',
        valueEnum: {
            1: '忽略',
            2: '屏蔽',
        },
        hideInSearch:true
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
      render: (_,record) => [
        <ModalForm
          title="操作确认"
          key="1"
          onVisibleChange={setVisible4}
          visible={visible4}
          trigger={<Button onClick={()=>Termination4(record)}>预览</Button>}
          submitter={{
            render: (props, defaultDoms) => {
                return [
                 <Button onClick={()=>setVisible4(false)}>返回</Button>
                ];
            },
            }}
            >
            <InvitationDetail id={byid4}/>
        </ModalForm>
      ],
      hideInSearch: true,
  }
  ];
  const onIpute=(res)=>{
      setArrId(res.selectedRowKeys)
  }
  return (
    <Tabs onChange={callback} type="card">
      <TabPane tab="未处理" key="1">
        <ProTable
          rowKey="sourceId"
          options={false}
          params={{
            page:1,
            size:5,
            status:0,
            type:1
          }}
          request={adminReportList}
          actionRef={actionRef}
          toolBarRender={false}
          search={{
            optionRender: ({ searchText, resetText },{ form }) => [
              <HandleModel  
                status={1}
                arrId={arrId}  
                label={'忽略'}  
                text={'确认要处理所选评论为忽略吗？'} 
                InterFace={reportHandle} 
                title={'操作确认'}
              />,
              <HandleModel  
                status={2}
                arrId={arrId}   
                label={'屏蔽'}  
                text={'确认要处理所选评论为屏蔽吗？'} 
                InterFace={reportHandle} 
                title={'操作确认'}
              />
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
              page:1,
              size:5,
              type:'1',
              status:3
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
