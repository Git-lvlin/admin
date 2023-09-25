import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import ProTable from '@/components/pro-table'
import ProCard from "@ant-design/pro-card"
import { hyCityAgentStoreGoodsAdm,hyCityAgentStoreGoodsAdmSt } from "@/services/hydrogen-atom-generation/health-supply-order-performance"
import { amountTransform } from '@/utils/utils'
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import StoreInformation from './store-information'
import { PageContainer } from "@ant-design/pro-layout"
import type { DescriptionsProps, TableProps, DevicesProps } from "./data"
import { Descriptions } from 'antd';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import moment from "moment"
import styles from './styles.less'


const GenerationManagement =(props:DevicesProps) => {
    const { activeKey } = props
    const [visible, setVisible] = useState<boolean>(false)
    const [storeVisible, setStoreVisible] = useState<boolean>(false)
    const [msgDetail, setMsgDetail] = useState<TableProps>()
    const [detailList,setDetailList]=useState<DescriptionsProps>()
    const [time,setTime]=useState<TableProps>()
    const [visit, setVisit] = useState<boolean>(false)
    const [type, setType] = useState<number>(0)
    const form = useRef<ActionType>()
  
    useEffect(() => {
      const params={
        agencyId:time?.agencyId,
        agentName:time?.agentName,
        startTime:time?.dateRange&&time?.dateRange[0],
        endTime:time?.dateRange&&time?.dateRange[1],
      }
      hyCityAgentStoreGoodsAdmSt(params).then(res=>{
        if(res.code==0){
          setDetailList(res.data?.[0])
        }
      })
  
    }, [time])

    const getFieldValue = (searchConfig: any) => {
      const { dateRange, ...rest } = searchConfig.form.getFieldsValue()
      const params = {
        ...rest,
        startTime:dateRange&&moment(dateRange[0]).format('YYYY-MM-DD'),
        endTime:dateRange&&moment(dateRange[1]).format('YYYY-MM-DD'),
      }
      return params
    }
  
    const tableColumns: ProColumns[] = [
      {
        title: 'ID',
        dataIndex: 'agencyId',
        align: 'center',
        hideInSearch: true
      },
      {
        title: '氢原子市代名称',
        dataIndex: 'name',
        align: 'center',
        order: 4,
        fieldProps:{
          placeholder:'请输入氢原子市代名称'
        },
      },
      {
        title: '交易时间',
        dataIndex: 'dateRange',
        renderFormItem: () => <TimeSelect/>,
        hideInTable: true
      },
      {
        title: '大健康供应链系统订单业绩',
        dataIndex: 'payAmount',
        align: 'center',
        render: (_,data)=>{
          if(parseFloat(_)){
            return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{amountTransform(_,'/').toFixed(2)}</a>
          }else{
            return '0.00'
          }
        },
        hideInSearch: true,
      },
      {
        title: '大健康供应链系统订单提成',
        dataIndex: 'commission',
        align: 'center',
        render: (_,data)=>{
          if(parseFloat(_)){
            return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(2)}}>{amountTransform(_,'/').toFixed(2)}</a>
          }else{
            return '0.00'
          }
  
        },
        hideInSearch: true
      },
      {
        title: '业绩范围',
        dataIndex: 'scope',
        align: 'center',
        hideInSearch: true
      },
      {
        title: '大健康供应链系统订单提成 - 扣通道费后',
        dataIndex: 'trueCommission',
        align: 'center',
        hideInSearch: true,
        render: (_,data)=>{
          return amountTransform(_,'/').toFixed(2)
  
        },
      }
    ]
  
    return (
      <>
        <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
          <Descriptions.Item  label="氢原子市代总数量">{detailList?.agencyNum}  </Descriptions.Item>
          <Descriptions.Item  label="大健康供应链系统订单业绩">{amountTransform(detailList?.payAmount,'/').toFixed(2)}  </Descriptions.Item>
          <Descriptions.Item  label="大健康供应链系统订单提成">{amountTransform(detailList?.commission,'/').toFixed(2)}  </Descriptions.Item>
          <Descriptions.Item  label="大健康供应链系统订单提成 - 扣通道费后">{amountTransform(detailList?.trueCommission,'/').toFixed(2)}  </Descriptions.Item>
        </Descriptions>
        <ProTable
          rowKey="agencyId"
          headerTitle='列表'
          columns={tableColumns}
          request={hyCityAgentStoreGoodsAdm}
          columnEmptyText={false}
          actionRef={form}
          onSubmit={(val:TableProps) => {
            setTime({
              agencyId:val.agencyId,
              agentName:val.agentName,
              dateRange:val.dateRange,

            })
          } }
          onReset={() => {
            setTime(undefined)
          } }
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
          options={false}
          search={{
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Export
                key='export'
                change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) } }
                type={'hyCityAgentStoreGoodsAdm'}
                conditions={() => { return getFieldValue(searchConfig) } } />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type='hyCityAgentStoreGoodsAdm' />,
            ],
          }}
          className={styles.health_supply_order_performance}        
          />
        {
          storeVisible&&
          <StoreInformation
            visible={storeVisible}
            setVisible={setStoreVisible}
            msgDetail={msgDetail}
            onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
            type={type}
          />
        }
      </>
    )
  }

export default ()=>{
  const [activeKey, setActiveKey] = useState<string>('2')
  return (
      <PageContainer title={false}>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        {/* <ProCard.TabPane key="1" tab="全国业绩">
          {
            activeKey=='1'&&<GenerationManagement activeKey={activeKey}/>
          }
        </ProCard.TabPane> */}
        <ProCard.TabPane key="2" tab="本地业绩">
          {
            activeKey=='2'&&<GenerationManagement activeKey={activeKey}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}
