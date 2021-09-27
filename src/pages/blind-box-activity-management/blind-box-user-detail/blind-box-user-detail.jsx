import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { adminList } from '@/services/community-management/dynamic-admin-list';
import { auditDynamic } from '@/services/community-management/dynamic-audit-dynamic';
import { checkAuditDynamicSwitch,updateAuditDynamicSwitch } from '@/services/community-management/dynamic-audit-switch';
import { history,connect } from 'umi';
import AuditModel from './audit-model'
const { TabPane } = Tabs


const GainDetail = (props) => {
  const ref=useRef()
  const columns= [
    {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
    },
    {
      title: '发放原因',
      dataIndex: 'userName',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '筛选',
      dataIndex: 'createTime',
      valueType: 'select',
      valueEnum: {
        0: '全部',
        1: '连续签到获得',
        2: '邀请好友获得',
        3: '订单消费获得'
      },
      hideInTable:true
    },
    {
      title: '发放时间',
      key: 'dateRange',
      dataIndex: 'createTime',
      valueType: 'dateRange',   
    },
    {
      title: '过期时间',
      key: 'dateRange',
      dataIndex: 'createTime',
      hideInSearch:true
    },
    {
      title: '发放次数',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '机会编号',
      dataIndex: 'createTime',
      valueType: 'text',
    },
    {
      title: '状态',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data)=>{
        return <>
                <p>已回收</p>
                <AuditModel
                  label={'回收'}
                  // InterFace={couponVerify}
                  id={id}
                  title={'填写回收原因'}
                  boxref={ref}
                />
              </>
        },
    },
  ];
//  useEffect(()=>{
//   if(type==0){
//     checkAuditDynamicSwitch({}).then(res=>{
//       setCheck(res.data)
//     })
//   }
//  },[]) 
//  const auditSwitch=(off)=>{
//   setCheck(off)
//    updateAuditDynamicSwitch({}).then(res=>{
//    })
//  }
  return (
      <ProTable
        actionRef={ref}
        rowKey="id"
        options={false}
        headerTitle="用户手机号;15899858985         用户名：深海鱿鱼丝         剩余开盒次数：55        已使用次数：45"
        // params={{
        //   auditStatus:type,
        //   status:type==0?4:0
        // }}
        // request={adminList}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
          ],
        }}
        columns={columns}
      />
  );
};
const EmployDetail = (props) => {
    const ref=useRef()
    const columns= [
      {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '筛选',
        dataIndex: 'createTime',
        valueType: 'select',
        valueEnum: {
          0: '全部',
          1: '开盲盒使用',
          2: '机会过期',
          3: '官方回收'
        },
        hideInTable:true
      },
      {
        title: '使用时间',
        key: 'dateRange',
        dataIndex: 'createTime',
        valueType: 'dateRange',   
      },
      {
        title: '使用次数',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch:true
      },
      {
        title: '使用类型',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true,
        render:(_,data)=>{
          return <>
                  <p>开盲盒</p>
                  <a href="">官方回收</a>
                 </>
        }
      },
      {
        title: '机会编号',
        dataIndex: 'createTime',
        valueType: 'text'
      },
      {
        title: '获得奖品',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          return  <div style={{display:'flex',alignItems:'center',justifyContent:'space-around'}}>
                      <Image src={{}} alt="" width='50px' height='50px' />
                      <div>
                        <h4>苹果手机128G</h4>
                        <span style={{color:'red',fontSize:'10px'}}>销售价¥5600.00</span>
                        <p>SKU 5656223</p>
                      </div>
                  </div>
        },
      },
      {
        title: '兑换详情',
        dataIndex: 'createTime',
        valueType: 'text',
        hideInSearch: true,
        render: (_, data)=>{
          return <>
            <p>已兑换</p>
            <p>订单号：</p>
            <a href="">202125686565565</a>
            <p>过期时间：2022/09/18 16:13</p>
          </>
        } 
    },
    ];
  //  useEffect(()=>{
  //   if(type==0){
  //     checkAuditDynamicSwitch({}).then(res=>{
  //       setCheck(res.data)
  //     })
  //   }
  //  },[]) 
  //  const auditSwitch=(off)=>{
  //   setCheck(off)
  //    updateAuditDynamicSwitch({}).then(res=>{
  //    })
  //  }
    return (
        <ProTable
          actionRef={ref}
          rowKey="id"
          options={false}
          // params={{
          //   auditStatus:type,
          //   status:type==0?4:0
          // }}
          // request={adminList}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
            ],
          }}
          columns={columns}
        />
    );
  };

export default (props) =>{
  const [seleType,setSeleType]=useState(0)
  return (
    <PageContainer>
      <Tabs
        centered
        defaultActiveKey="0"
        style={{
          background: '#fff',
          padding: 25
        }}
        onChange={(val)=>{
          setSeleType(val)
        }}
      >
        <TabPane tab="获取明细" key="0">
          <GainDetail/>
        </TabPane>
        <TabPane tab="使用明细" key="1">
         <EmployDetail/>
        </TabPane>
      </Tabs>
    </PageContainer>
  )
}
