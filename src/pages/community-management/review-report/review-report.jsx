import React, {useRef,useState} from 'react';
import ProTable from '@/components/pro-table';
import { adminReportList } from '@/services/community-management/report-admin-report-list';
import { reportHandle } from '@/services/community-management/report-handle';
import { history } from 'umi';
import { Tabs } from 'antd';
import HandleModel from '@/components/HandleModel'
const { TabPane } = Tabs;

export default props => {
  const actionRef = useRef();
  const [arrId,setArrId]=useState([])
  const [seleType,setSeleType]=useState(0)
  function callback(key) {
    setSeleType(key)
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
        ellipsis:true
    },
    {
        title: '被举报次数',
        dataIndex: 'count',
        valueType: 'text',
        render:(text, record, _, action)=>[
          <a key='count' onClick={()=>history.push('/community-management/report-detail-list?id='+record.sourceId)}>{record.count}</a>
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
        title: '状态',
        dataIndex: 'delete',
        valueType: 'select',
        valueEnum: {
            0: '正常',
            1: '已删除',
        },
        hideInSearch: true
    },
    {
      title: '操作',
      render: (text, record, _, action) => [
        <HandleModel 
          record={record} 
          status={1}  
          label={'忽略'}  
          text={'确认要处理所选评论为忽略吗？'} 
          InterFace={reportHandle} 
          title={'操作确认'}
          boxref={actionRef}
          key='lose'
        />,
        <HandleModel 
          record={record} 
          status={2}   
          label={'屏蔽'}  
          text={'确认要处理所选评论为屏蔽吗？'} 
          InterFace={reportHandle} 
          title={'操作确认'}
          boxref={actionRef}
          key='shield'
        />,
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
        ellipsis:true
    },
    {
        title: '被举报次数',
        dataIndex: 'count',
        valueType: 'text',
        render:(text, record, _, action)=>[
          <a key='count' onClick={()=>history.push('/community-management/report-detail-list?id='+record.sourceId)}>{record.count}</a>
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
        dataIndex: 'handlerUserName',
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
    setArrId(res.selectedRowKeys)
}
  return (
    <Tabs onChange={callback} type="card">
      <TabPane tab="未处理" key="0">
        {
          seleType==0&&
          <ProTable
            rowKey="key"
            options={false}          
            params={{
              status:'0',
              type:'2'
            }}
            request={adminReportList}
            actionRef={actionRef}
            toolBarRender={false}
            search={{
              defaultCollapsed: true,
              labelWidth: 100,
              optionRender: (searchConfig, formProps, dom) => [
                ...dom.reverse(),
                <HandleModel  
                  status={1}  
                  label={'忽略'}
                  arrId={arrId}  
                  text={'确认要处理所选评论为忽略吗？'} 
                  InterFace={reportHandle} 
                  title={'操作确认'}
                  boxref={actionRef}
                  key='lose'
                />,
                <HandleModel  
                  status={2}   
                  label={'屏蔽'}
                  arrId={arrId}  
                  text={'确认要处理所选评论为屏蔽吗？'} 
                  InterFace={reportHandle} 
                  boxref={actionRef}
                  title={'操作确认'}
                  key='shield'
                />,
              ],
          }}
            columns={columns}
            rowSelection={{}}
            tableAlertOptionRender={onIpute}
          />
        }
      </TabPane>
      <TabPane tab="已处理" key="3">
        {
          seleType==3&&
          <ProTable
            rowKey="key"
            options={false}
            params={{
              type:'2',
            }}
            request={adminReportList}
            actionRef={actionRef}
            search={{
                defaultCollapsed: true,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                    ...dom.reverse(),
                ],
            }}
            columns={columns2}
          />
        }
       
      </TabPane>
    </Tabs>
  );
};
