import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import ProTable from '@/components/pro-table'
import ProCard from "@ant-design/pro-card"
import { hpaHealthyGift,hpaHealthyGiftStats } from "@/services/great-health-province/health-package-order-performance"
import { amountTransform } from '@/utils/utils'
import type { CumulativeProps } from "./data"
import type { ProColumns, ActionType  } from "@ant-design/pro-table"
import StoreInformation from './store-information'
import CumulativePerformance from './cumulative-performance'
import { PageContainer } from "@ant-design/pro-layout"
import type { FormInstance } from "@ant-design/pro-form"
import type { DescriptionsProps, TableProps } from "./data"
import { Descriptions } from 'antd';


const GenerationManagement =(props) => {
    const { activeKey } = props
    const [visible, setVisible] = useState<boolean>(false)
    const [storeVisible, setStoreVisible] = useState<boolean>(false)
    const [msgDetail, setMsgDetail] = useState<string>()
    const [detailList,setDetailList]=useState<DescriptionsProps>()
    const [time,setTime]=useState()
    const form = useRef<FormInstance>()
  
    useEffect(() => {
      const params={
        agencyId:time?.agencyId,
        agentName:time?.agentName,
        startTime:time?.createTime&&time?.createTime[0],
        endTime:time?.createTime&&time?.createTime[1],
        scope:activeKey == 1?'hyProvinceAgentAllCommission':'hyProvinceAgentCommission'
      }
      hpaHealthyGiftStats(params).then(res=>{
        if(res.code==0){
          setDetailList(res.data[0])
        }
      })
  
    }, [time])
  
    const tableColumns: ProColumns<TableProps>[] = [
      {
        title: 'ID',
        dataIndex: 'agencyId',
        align: 'center',
        hideInSearch: true
      },
      {
        title: '大健康省代名称',
        dataIndex: 'name',
        align: 'center',
        order: 4,
        fieldProps:{
          placeholder:'请输入大健康省代名称'
        },
      },
      {
        title: '交易时间',
        dataIndex: 'dateRange',
        renderFormItem: () => <TimeSelect showTime={false}/>,
        hideInTable: true
      },
      {
        title: '健康礼包订单业绩',
        dataIndex: 'totalPayAmount',
        align: 'center',
        render: (_,data)=>{
          if(parseFloat(_)){
            return <a onClick={()=>{setVisible(true);setMsgDetail(data)}}>{amountTransform(_,'/').toFixed(2)}</a>
          }else{
            return '0.00'
          }
        },
        hideInSearch: true,
      },
      {
        title: '健康礼包订单提成',
        dataIndex: 'totalCommission',
        align: 'center',
        render: (_,data)=>{
          if(parseFloat(_)){
            return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data)}}>{amountTransform(_,'/').toFixed(2)}</a>
          }else{
            return '0.00'
          }
  
        },
        hideInSearch: true
      },
      {
        title: '业绩范围',
        dataIndex: 'scopeDesc',
        align: 'center',
        hideInSearch: true
      }
    ]
  
    return (
      <>
        <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff'}} column={9} layout="vertical" bordered>
          <Descriptions.Item  label="大健康省代数量">{detailList?.totalNum}  </Descriptions.Item>
          <Descriptions.Item  label="健康礼包订单业绩">{amountTransform(detailList?.totalPayAmount,'/').toFixed(2)}  </Descriptions.Item>
          <Descriptions.Item  label="健康礼包订单提成">{amountTransform(detailList?.totalCommission,'/').toFixed(2)}  </Descriptions.Item>
        </Descriptions>
        <ProTable<TableProps>
          rowKey="agencyId"
          headerTitle='列表'
          columns={tableColumns}
          request={hpaHealthyGift}
          columnEmptyText={false}
          actionRef={form}
          onSubmit={(val)=>{
            setTime(val)
          }}
          onReset={()=>{
            setTime({})
          }}
          params={{
            scope:activeKey == 1?'hyProvinceAgentAllCommission':'hyProvinceAgentCommission'
          }}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
          options={false}
          search={{
            labelWidth: 200,
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse()
            ],
          }}
        />
        {
          storeVisible&&
          <StoreInformation
            visible={storeVisible}
            setVisible={setStoreVisible}
            msgDetail={msgDetail}
            scope={activeKey == 1?'hyProvinceAgentAllCommission':'hyProvinceAgentCommission'}
            onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          />
        }
        {
          visible&&
          <CumulativePerformance
            visible={visible}
            setVisible={setVisible}
            msgDetail={msgDetail}
            scope={activeKey == 1?'hyProvinceAgentAllCommission':'hyProvinceAgentCommission'}
            onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          />
        }
      </>
    )
  }

export default ()=>{
  const [activeKey, setActiveKey] = useState<string>('1')
  return (
      <PageContainer title={false}>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="1" tab="全国业绩">
          {
            activeKey=='1'&&<GenerationManagement activeKey={activeKey}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="本地业绩">
          {
            activeKey=='2'&&<GenerationManagement activeKey={activeKey}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}
