import { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { getActiveConfigList} from '@/services/intensive-activity-management/penny-activity';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment'
import type { ProColumns,ActionType } from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import AddApply from './add-apply'


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
        title: '申请编号',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '关联集约采购单号',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
        render:(_,data)=>{
          return <a onClick={()=>{}}>{_}</a>
        }
      },
      {
        title: '集约活动编号',
        dataIndex: 'id',
        valueType: 'text',
      },
      {
        title: '集约采购单号',
        dataIndex: 'id',
        valueType: 'text',
        hideInTable:true
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
        hideInSearch: true,
      },
      {
        title: '采购数量',
        dataIndex: 'id',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '缺货数量',
        dataIndex: 'name',
        valueType: 'text',
        hideInSearch: true,
      },
      {
        title: '申请时间',
        dataIndex: 'startTime',
        valueType: 'dateTimeRange',
        hideInTable: true,
      },
      {
        title: '申请时间',
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
            <Space key='detail'>
              {
               storeType=='submitted'||storeType=='acknowledged'?<a onClick={()=>{setDetailVisible(true);setPennyId(record.id)}}>查看详情</a>:null
             }
            </Space>,
            <Space key='apply'>
             {
               storeType=='submitted'&&<a  onClick={()=>{setDetailVisible(true);setPennyId(record.id)}}>撤销申请</a>
             }
            </Space>,
            <Space key="option">
              {
                storeType=='undone'&&<>
                  <a key='apply' onClick={()=>{setDetailVisible(true);setPennyId(record.id)}}>编辑</a>
                  <a key='apply' onClick={()=>{setDetailVisible(true);setPennyId(record.id)}}>删除</a>
                </>
              }
            </Space>,

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
          headerTitle="数据列表"
          request={getActiveConfigList}
          postData={postData}
          search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
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
      const [activeKey, setActiveKey] = useState('submitted')
      const [visible, setVisible] = useState<boolean>(false)
      return (
        <PageContainer title=" ">
        <div style={{background:'#fff',padding:'20px'}}>
          <Button onClick={()=>{setVisible(true)}} key="button" type="primary">新建申请</Button>
        </div>
        <ProCard
          tabs={{
            type: 'card',
            activeKey,
            onChange: setActiveKey
          }}
        >
          <ProCard.TabPane key="submitted" tab="已提交">
            {
              activeKey == 'submitted' && <PurchaseList storeType={activeKey} />
            }
          </ProCard.TabPane>
          <ProCard.TabPane key="acknowledged" tab="已确认">
            {
              activeKey == 'acknowledged' && <PurchaseList storeType={activeKey} />
            }
          </ProCard.TabPane>
          <ProCard.TabPane key="undone" tab="已撤销">
            {
              activeKey == 'undone' && <PurchaseList storeType={activeKey} />
            }
          </ProCard.TabPane>
        </ProCard>
        {visible&& <AddApply
          visible={visible}
          setVisible={setVisible}
          callback={() => {  }}
          onClose={() => {  }}
        />}
      </PageContainer>
      )
  } 
