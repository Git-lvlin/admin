import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { adminList } from '@/services/community-management/dynamic-admin-list';
import { auditDynamic } from '@/services/community-management/dynamic-audit-dynamic';
import { checkAuditDynamicSwitch,updateAuditDynamicSwitch } from '@/services/community-management/dynamic-audit-switch';
import AuditModel from './audit-model'
import { history,connect } from 'umi';
import { Space,Switch } from 'antd';
import './style.less'
const { TabPane } = Tabs


const message = (type, module,dispatch) => {
  const ref=useRef()
  const [visible, setVisible] = useState(false);
  const [arrId,setArrId]=useState([])
  const [check,setCheck]=useState()
  const columns= [
    {
      title: '帖子ID',
      dataIndex: 'dynamicId',
      valueType: 'text',
      hideInTable:true
    },
    {
      title: '帖子ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch:true,
      render:(text, record, _, action)=>[
        <a onClick={()=>history.push('/community-management/content-management/dynamic-get-dynamic-detail?id='+record.id)}>{record.id}</a>
    ],
    },
    {
      title: '用户',
      dataIndex: 'userName',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'text',
      hideInSearch:true,
      ellipsis:true
    },
    {
      title: '图片',
      dataIndex: 'images',
      valueType: 'image',
      hideInSearch:true,
      render:(_,data)=>{
        return <Image src={data.images[0]} alt="" width='50px' height='50px' />
      }
    },
    {
      title: '发布时间',
      key: 'dateRange',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '状态',
      dataIndex: 'state',
      hideInSearch: true,
      valueEnum: {
        0:'未审核',
        1:'已审核',
        2:'审核拒绝'
    },
    },
    {
      title: '审核时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable:type==0?true:false
    },
    {
      title: '审核人员',
      dataIndex: 'reviewer',
      valueType: 'text',
      hideInSearch: true,
      hideInTable:type==0?true:false
    },
    {
      title: '操作',
      key: 'option',
      valueType: 'option',
      render: (_, data) => [
          <AuditModel 
            record={data}
            type={type} 
            state={1}  
            label={'通过'}  
            text={'确认要通过该帖子的发布吗？'} 
            InterFace={auditDynamic} 
            title={'审核确认'}
            boxref={ref}
          />,
          <AuditModel 
            record={data}
            type={type} 
            state={2}  
            label={'拒绝'}  
            text={'确认要拒绝该帖子的通过吗？'} 
            InterFace={auditDynamic} 
            title={'审核确认'}
            boxref={ref}
          />,
      ],
      hideInTable:type==0?false:true
    },
    
  ];
 const onIpute=(res)=>{
      setArrId(res.selectedRowKeys)
  }
 useEffect(()=>{
  if(type==0){
    checkAuditDynamicSwitch({}).then(res=>{
      setCheck(res.data)
    })
  }
 },[]) 
 const auditSwitch=(off)=>{
  setCheck(off)
   updateAuditDynamicSwitch({}).then(res=>{
   })
 }
  return (
      <ProTable
        actionRef={ref}
        rowKey="id"
        options={false}
        params={{
          auditStatus:type,
          status:type==0?4:0
        }}
        request={adminList}
        rowSelection={type==0?true:false}
        tableAlertOptionRender={onIpute}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
           <> 
             {
               type==0?
               <Form.Item
                label="审核功能开关"
                className='switchTop'
              >
                <Switch  checked={check} onChange={(bol)=>{auditSwitch(bol) }}/>
              </Form.Item>
              :null
             }
           </>,
             ...dom.reverse(),
          ],
        }}
        toolBarRender={()=>[
          <Space>
          <AuditModel 
            state={1}  
            label={'全部通过'}  
            text={'确认要通过该帖子的发布吗？'} 
            InterFace={auditDynamic} 
            title={'审核确认'}
            type={type}
            arrId={arrId}
            boxref={ref}
          />
          <AuditModel 
            type={type} 
            state={2}  
            label={'全部拒绝'}  
            text={'确认要拒绝该帖子的通过吗？'} 
            InterFace={auditDynamic} 
            title={'审核确认'}
            arrId={arrId}
            boxref={ref}
          />
          </Space>
        ]}
        columns={columns}
      />
  );
};

export default (props) =>{
  const [visible, setVisible] = useState(false);
  return (
    <PageContainer>
      <Tabs
        centered
        defaultActiveKey="1"
        style={{
          background: '#fff',
          padding: 25
        }}
      >
        <TabPane tab="待审核" key="1">
          {message(0, 1)}
        </TabPane>
        <TabPane tab="审核通过" key="2">
          {message(1, 2)}
        </TabPane>
        <TabPane tab="审核拒绝" key="3">
          { message(2, 3) }
        </TabPane>
      </Tabs>
    </PageContainer>
  )
}
