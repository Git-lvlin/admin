import { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { getActiveConfigList} from '@/services/intensive-activity-management/penny-activity';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment'
import type { ProColumns,ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
// import ActivityDetail from '../activity-detail'


type activityItem={
  id:number;
  name:string;
  startTime:number;
  endTime:number;
  shoperLimitAll:number;
  buyerLimit:number;
  joinShopType:number;
  joinBuyerType:number;
  goodsCount:number;
  actStatus:number;
  statusDisplay:string
}

interface propertys{
    storeType:string
}


const PurchaseList=(props:propertys)=> {
    const { storeType }=props
    const ref=useRef<ActionType>()
    const [visible, setVisible] = useState<boolean>(false);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [detailVisible,setDetailVisible]=useState<boolean>(false)
    const [dataVisible,setDatalVisible]=useState<boolean>(false)
    const [pennyId,setPennyId]=useState<number>()
    const [visit, setVisit] = useState<boolean>(false)
    const columns:ProColumns<activityItem>[]= [
      {
        title: '采购单号',
        dataIndex: 'id',
        valueType: 'text',
        hideInTable: true,
      },
      {
        title: '订单类型',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '集约活动编号',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '收货方',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '采购商品',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '库存单位',
        dataIndex: 'ggoid',
        valueType: 'text',
      },
      {
        title: '采购数量',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '采购总金额',
        dataIndex: 'name',
        valueType: 'text',
      },
      {
        title: '订单状态',
        dataIndex: 'shoperLimitAll',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '创建时间',
        dataIndex: 'startTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '创建时间',
        dataIndex: 'startTime',
        valueType: 'text',
        render:(_,data)=>{
          return <p>{moment(data.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(data.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
        },
        hideInSearch: true,
      },
      {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render:(text, record:any, _, action)=>[
            <a key='detail' onClick={()=>{setDetailVisible(true);setPennyId(record.id)}}>详情</a>,
        ],
      }, 
    ];
    const postData=(data: any[])=>{
      const arr=data.map((ele)=>({
        shoperLimitAll:ele.content?.shoperLimitAll,
        shoperLimitOnece:ele.content?.shoperLimitOnece,
        buyerLimit:ele.content?.buyerLimit,
        joinShopType:ele.content?.joinShopType,
        joinBuyerType:ele.content?.joinBuyerType,
        goodsCount:ele.content?.goodsCount,
        ...ele
      }))
      return arr
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
        <ProTable<activityItem>
          actionRef={ref}
          rowKey="id"
          options={false}
          params={{
            actCode:'wsCentActiveCode'
          }}
          request={getActiveConfigList}
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
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'build-floor-invite-list-export'}/>,
          ],
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
          rowSelection={{}}
          toolBarRender={() => [
          <Button key="button" type="primary">批量发货</Button>
          ]}
        />
        // {/* {detailVisible&& <ActivityDetail
        //   visible={detailVisible}
        //   setVisible={setDetailVisible}
        //   id={pennyId} 
        //   callback={() => { ref.current&&ref.current.reload(); setPennyId(NaN) }}
        //   onClose={() => { ref.current&&ref.current.reload(); setPennyId(NaN) }}
        // />} */}
    );
  };


  export default ()=>{
      const [activeKey, setActiveKey] = useState('stayShipments')
      return (
        <PageContainer>
        <ProCard
          tabs={{
            type: 'card',
            activeKey,
            onChange: setActiveKey
          }}
        >
          <ProCard.TabPane key="stayShipments" tab="待发货">
            {
              activeKey == 'stayShipments' && <PurchaseList storeType={activeKey} />
            }
          </ProCard.TabPane>
          <ProCard.TabPane key="stayReceiving" tab="待收货">
            {
              activeKey == 'stayReceiving' && <PurchaseList storeType={activeKey} />
            }
          </ProCard.TabPane>
          <ProCard.TabPane key="completed" tab="已完成">
            {
              activeKey == 'completed' && <PurchaseList storeType={activeKey} />
            }
          </ProCard.TabPane>
        </ProCard>
      </PageContainer>
      )
  } 
