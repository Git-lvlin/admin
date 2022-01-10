import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Descriptions,Space} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { statInfo,inviteRankList,floorRankList } from '@/services/activity-management/spring-festival-build-building-activity';
import { history, connect } from 'umi';
// import AuditModel from '../blind-box-employ-detail/audit-detail-model'
import Detail from '@/pages/order-management/normal-order/detail';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import UploadingList from './uploading-list'
import moment from 'moment'
const { TabPane } = Tabs



const InviteRegister=() => {
    const ref=useRef()
    const [detailList,setDetailList]=useState()
    const [listVisible, setListVisible] = useState(false);
    const [orderId,setOrderId]=useState()
    const [visit, setVisit] = useState(false)
    const columns= [
      {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '用户名',
        dataIndex: 'nickname',
        valueType: 'text',
      },
      {
        title: '用户手机号',
        dataIndex: 'phone',
        valueType: 'text',
      },
      {
        title: '活动时间',
        key: 'dateTimeRange',
        dataIndex: 'startTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '活动时间',
        dataIndex: 'startTime',
        valueType: 'text',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>{moment(data.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        }
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '邀请用户注册数',
        dataIndex: 'inviteNums',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '邀请用户注册且游戏数',
        dataIndex: 'inviteGameNum',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '邀请总排名',
        dataIndex: 'rank',
        valueType: 'text',
        hideInSearch:true,
      },
      {
        title: '盖楼层数',
        dataIndex: 'floor',
        valueType: 'text',
        hideInSearch:true,
      }
    ];
    const postData=(data)=>{
      setDetailList(data)
      return data
    }
    const getFieldValue = (searchConfig) => {
      const {dateTimeRange,...rest}=searchConfig.form.getFieldsValue()
      return {
        startTime:dateTimeRange&&dateTimeRange[0],
        endTime:dateTimeRange&&dateTimeRange[1],
        ...rest,
      }
    }
    return (
      <>
        <ProTable
          actionRef={ref}
          rowKey="id"
          options={false}
          request={inviteRankList}
          postData={postData}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
                key='export'
                change={(e) => { setVisit(e) }}
                type={'build-floor-invite-list-export'}
                conditions={getFieldValue(searchConfig)}
              />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type={'build-floor-invite-list-export'}/>,
              <Button key='add' type="primary" onClick={()=>setListVisible(true)}>添加邀请用户排名</Button>
            ],
          }}
          columns={columns}
        />
         {listVisible&&<UploadingList 
            visible={listVisible} 
            setVisible={setListVisible}  
            />
          }
        </>
    );
  };



  const BuildBuilding=() => {
    const ref=useRef()
    const [detailList,setDetailList]=useState()
    const [detailVisible, setDetailVisible] = useState(false);
    const [orderId,setOrderId]=useState()
    const [visit, setVisit] = useState(false)
    const columns= [
      {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '用户名',
        dataIndex: 'nickname',
        valueType: 'text',
      },
      {
        title: '用户手机号',
        dataIndex: 'phone',
        valueType: 'text',
      },
      {
        title: '活动时间',
        key: 'dateTimeRange',
        dataIndex: 'startTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '活动时间',
        dataIndex: 'startTime',
        valueType: 'text',
        hideInSearch:true,
        render:(_,data)=>{
          return <p>{moment(data.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        }
      },
      {
        title: '活动名称',
        dataIndex: 'name',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '盖楼层数',
        dataIndex: 'floor',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '盖楼总排名',
        dataIndex: 'rank',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '邀请用户注册数',
        dataIndex: 'inviteNums',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '邀请用户注册且游戏',
        dataIndex: 'inviteGameNum',
        valueType: 'text',
        hideInSearch: true,
      }
    ];
    const postData=(data)=>{
      setDetailList(data)
      return data
    }
    const getFieldValue = (searchConfig) => {
      const {dateTimeRange,...rest}=searchConfig.form.getFieldsValue()
      return {
        startTime:dateTimeRange&&dateTimeRange[0],
        endTime:dateTimeRange&&dateTimeRange[1],
        ...rest,
      }
    }
    return (
      <>
        <ProTable
          actionRef={ref}
          rowKey="id"
          options={false}
          request={floorRankList}
          postData={postData}
          search={{
            defaultCollapsed: false,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
               ...dom.reverse(),
               <Export
                key='export'
                change={(e) => { setVisit(e) }}
                type={'build-floor-rank-list-export'}
                conditions={getFieldValue(searchConfig)}
              />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type={'build-floor-rank-list-export'}/>
            ],
          }}
          columns={columns}
        />
        {
          detailVisible && <Detail
          id={orderId}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
        }
        </>
    );
  };




  export default (props) =>{
    const [seleType,setSeleType]=useState(1)
    const [detailList,setDetailList]=useState()
    useEffect(()=>{
        statInfo({}).then(res=>{
            console.log('res',res)
            setDetailList(res.data)
        })
    },[])
    return (
        <PageContainer>
        <div style={{backgroundColor:'#fff',marginBottom:'20px'}}>
            <Descriptions labelStyle={{fontWeight:'bold'}} column={10} layout="vertical" bordered>
                <Descriptions.Item  label="参与总人数">{detailList?.participationNums}  </Descriptions.Item>
                <Descriptions.Item  label="盖楼次数">{detailList?.buildHouseNums}  </Descriptions.Item>
                <Descriptions.Item  label="抽奖次数">{detailList?.drawNums}  </Descriptions.Item>
                <Descriptions.Item  label="已获奖人数">{detailList?.drawPrizeUsers}  </Descriptions.Item>
                <Descriptions.Item  label="已获奖次数">{detailList?.drawPrizeNums}  </Descriptions.Item>
                <Descriptions.Item  label="获奖总金额">{detailList?.totalPrizeAmount}  </Descriptions.Item>
                <Descriptions.Item  label="提现人数">{detailList?.withdrawUsers}  </Descriptions.Item>
                <Descriptions.Item  label="提现次数">{detailList?.withdrawNums}  </Descriptions.Item>
                <Descriptions.Item  label="注册人数">{detailList?.registerUsers}  </Descriptions.Item>
                <Descriptions.Item  label="注册且游戏人数">{detailList?.downloadUsers}  </Descriptions.Item>
            </Descriptions>
         </div>
          <Tabs
            centered
            defaultActiveKey="1"
            style={{backgroundColor:"#fff",padding:'25px'}}
            onChange={(val)=>{
              setSeleType(val)
            }}
          >
            <TabPane tab="邀请注册排名" key="1">
              {
                seleType==1&&<InviteRegister/>
              }
            </TabPane>
            <TabPane tab="盖楼排名" key="2">
              {
                seleType==2&&<BuildBuilding/>
              }
            </TabPane>
          </Tabs>
        </PageContainer>
    )
  }