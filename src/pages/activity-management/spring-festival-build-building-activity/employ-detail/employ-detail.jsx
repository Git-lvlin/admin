import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ModalForm,ProFormRadio,ProFormSwitch} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { history,connect } from 'umi';
import { getBuildhouseIncomeDetail,getBuildhouseUseDetail } from '@/services/activity-management/spring-festival-build-building-activity';
import Detail from '@/pages/order-management/normal-order/detail';
const { TabPane } = Tabs


const UserDetail=(props) => {
  const { memberId }=props
  const ref=useRef()
  const [detailList,setDetailList]=useState()
  const columns= [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '发放原因',
      dataIndex: 'type',
      valueType: 'text',
      valueEnum: {
        1:'原始机会3次',
        2:'邀请好友注册', 
        3:'邀请好友注册且游戏'
      },
    },
    {
      title: '发放时间',
      key: 'dateTimeRange',
      dataIndex: 'usefulTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '发放时间',
      dataIndex: 'usefulTime',
      valueType: 'text',
      hideInSearch:true   
    },
    {
      title: '过期时间',
      dataIndex: 'outUsefulTime',
      hideInSearch:true
    },
    {
      title: '发放机会次数',
      dataIndex: 'num',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '机会编号',
      dataIndex: 'code',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data)=>{
        if(data.status==1){
          return  <AuditModel
                    label={'回收'}
                    InterFace={getBlindboxIncomeReclaim}
                    id={data.id}
                    title={'填写回收原因'}
                    boxref={ref}
                  />
        }else if(data.status==2){
          return <p>已使用</p>
        }else if(data.status==3){
          return <p>已回收</p>
        }else if(data.status==4){
          return <p>已过期</p>
        }
        },
    },
  ];
  const postData=(data)=>{
    setDetailList(data)
    return data.records
  }
  return (
    <>
      <ProTable
        actionRef={ref}
        rowKey="id"
        options={false}
        headerTitle={`用户手机号:${detailList?.memberMobile}         用户名：${detailList?.memberNicheng}         剩余盖楼次数：${detailList?.restNum}        已使用次数：${detailList?.useNum}`}
        params={{
          memberId:memberId
        }}
        postData={postData}
        request={getBuildhouseIncomeDetail}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
      />
    </>
  );
};

const EmployDetail=(props) => {
  const { memberId }=props
  const ref=useRef()
  const [detailList,setDetailList]=useState()
  const columns= [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '活动名称',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '使用原因',
      dataIndex: 'type',
      valueType: 'select',
      valueEnum: {
        0: '全部',
        5:'盖楼游戏',
        6:'机会过期', 
        7:'活动结束'
      },
      hideInTable:true
    },
    {
      title: '使用原因',
      dataIndex: 'type',
      valueType: 'text',
      hideInSearch:true,
      valueEnum: {
        5:'盖楼游戏',
        6:'机会过期', 
        7:'活动结束'
      },
    },
    {
      title: '使用时间',
      key: 'dateTimeRange',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
    },
    {
      title: '使用时间',
      dataIndex: 'createTime', 
      hideInSearch:true 
    },
    {
      title: '使用次数',
      dataIndex: 'num',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '机会编号',
      dataIndex: 'code',
      valueType: 'text'
    },
    {
      title: '盖楼楼层',
      dataIndex: 'floor',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '抽中奖品（元）',
      dataIndex: 'prizeDisplay',
      valueType: 'text',
      hideInSearch: true,
    }
  ];
  const postData=(data)=>{
    setDetailList(data)
    return data.records
  }
  return (
    <>
      <ProTable
        actionRef={ref}
        rowKey="id"
        headerTitle={`用户手机号:${detailList?.memberMobile}         用户名：${detailList?.memberNicheng}         剩余盖楼次数：${detailList?.restNum}        已使用次数：${detailList?.useNum}`}
        options={false}
        request={getBuildhouseUseDetail}
        postData={postData}
        params={{
          memberId:memberId
        }}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
      />
    </>
  );
};

export default (props) =>{
    let memberId = props.location.query.memberId
    const [seleType,setSeleType]=useState(1)
    return (
        <PageContainer title='查看用户明细'>
          <Tabs
            centered
            defaultActiveKey="1"
            style={{backgroundColor:"#fff",padding:'25px'}}
            onChange={(val)=>{
              setSeleType(val)
            }}
          >
            <TabPane tab="获取明细" key="1">
              {
                seleType==1&&<UserDetail memberId={memberId} />
              }
            </TabPane>
            <TabPane tab="使用明细" key="2">
              {
                seleType==2&&<EmployDetail memberId={memberId} />
              }
            </TabPane>
          </Tabs>
        </PageContainer>
    )
  }