import React, {useRef,useState} from 'react';
import ProTable from '@ant-design/pro-table';
import { adminReportList } from '@/services/community-management/report-admin-report-list';
import { reportHandle } from '@/services/community-management/report-handle';
import { history } from 'umi';
import { Tabs } from 'antd';
import HandleModel from '@/components/HandleModel'
const { TabPane } = Tabs;

export default props => {
  const actionRef = useRef();
  const [arrId,setArrId]=useState([])
  function callback(key) {
    console.log(key);
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
          <a onClick={()=>history.push('/community-management/review-report/admin-report-detail-list?id='+record.sourceId)}>{record.count}</a>
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
      render: (text, record, _, action) => [
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
          <a onClick={()=>history.push('/community-management/review-report/admin-report-detail-list?id='+record.sourceId)}>{record.count}</a>
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
    console.log('resrows',res.selectedRows)
    let arr=[]
    res.selectedRows.map(ele=>{
      arr.push(ele.sourceId)
    })
    console.log('arr',arr)
    // let a=arr
    // setArrId(arr)
  }
  return (
    <Tabs onChange={callback} type="card">
      <TabPane tab="未处理" key="1">
        <ProTable
          rowKey="sourceId"
          options={false}
          params={{
            page:0,
            size:5,
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
              <HandleModel  
                status={1}  
                label={'忽略'}
                arrId={arrId}  
                text={'确认要处理所选评论为忽略吗？'} 
                InterFace={reportHandle} 
                title={'操作确认'}
              />,
              <HandleModel  
                status={2}   
                label={'屏蔽'}
                arrId={arrId}  
                text={'确认要处理所选评论为屏蔽吗？'} 
                InterFace={reportHandle} 
                title={'操作确认'}
              />,
            ],
        }}
          columns={columns}
          rowSelection={{}}
          tableAlertOptionRender={onIpute}
        />
      </TabPane>
      <TabPane tab="已处理" key="2">
          <ProTable
            rowKey="sourceId"
            options={false}
            params={{
              page:0,
              size:5,
              status:3,
              type:'2'
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
