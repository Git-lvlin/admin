import { useState, useRef, useEffect } from "react"
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { wholesalePm } from "@/services/product-performance-management/new-intensive-performance"
import { amountTransform } from '@/utils/utils'
import Export from '@/components/export'
import ProCard from '@ant-design/pro-card';
import { Descriptions } from 'antd'

type detailListProps = {
  storeNums: number
  orderNums: number
  payAmount: number
  serviceNums: number
  deviceNum: number
}

type propsType = {
  orderType: string
}

const NewIntensivePerformance = (props:propsType) => {
  const { orderType } = props
  const form = useRef<FormInstance>()
  const [detailList,setDetailList]=useState<detailListProps>()
  const [data,setData]=useState({})

  useEffect(() => {
    // healthPkgOrderPmStats(time).then(res=>{
    //   if(res.code==0){
    //     setDetailList(res.data[0])
    //   }
    // })
  }, [data])

  const getFieldsValue = () => {
    const {payTime, area, ...rest} = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area && area?.[0]?.value,
      cityId: area && area?.[1]?.value,
      regionId: area && area?.[2]?.value,
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '下单人手机',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入用户手机'
      }
    },
    {
      title: '下单人手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateRange',
      hideInTable: true,
      fieldProps: {
        placeholder: ['开始时间','结束时间']
      }
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatusDesc',
      align: 'center',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      valueEnum: {
        '2': '待发货',
        '3': '待收货',
        '5': '已完成（已确认收到货）'
      },
      hideInTable: true,
      hideInSearch: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '数量',
      dataIndex: 'storeMemberPhone',
      align: 'center',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '下单人店铺编号',
      dataIndex: 'storeHomeNumber',
      align: 'center',
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance',
      hideInSearch: true
    },
    {
      title: '下单人店铺所在区域',
      dataIndex: 'storeArea',
      align: 'center',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '下单人店铺地址',
      dataIndex: 'storeAddress',
      align: 'center',
      width: '10%',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '所属人收益',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/'),
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
    {
      title: '平台分成总额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/'),
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
    {
      title: '所属人店铺编号',
      dataIndex: 'storeHomeNumber',
      align: 'center',
      hideInTable: orderType != 'finger_doctor_activation_fee_performance',
      hideInSearch: true
    },
    {
      title: '所属人店铺所在区域',
      dataIndex: 'storeArea',
      align: 'center',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
    {
      title: '所属人店铺地址',
      dataIndex: 'storeAddress',
      align: 'center',
      width: '10%',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
    {
      title: '市办事处',
      dataIndex: 'cityAgencyName',
      align: 'center',
      fieldProps: {
        placeholder: '请输入市办事处名称'
      },
      hideInSearch: orderType != 'finger_doctor_activation_fee_performance',
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
  ]

  return (
      <ProTable
        rowKey='id'
        columns={columns}
        params={{
          orderType
        }}
        request={wholesalePm}
        tableExtraRender={() => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff',margin:'0 30px'}} column={5} layout="horizontal" bordered>
            <Descriptions.Item  label="总业绩金额"><strong>{amountTransform(detailList?.orderNums, '/')} 元</strong></Descriptions.Item>
            <Descriptions.Item  label="总下单店铺数量"><strong>{detailList?.orderNums} 家</strong></Descriptions.Item>
            {orderType == 'finger_doctor_purchase_trading_performance'&&
            <>
              <Descriptions.Item  label="总销售订单数"><strong>{detailList?.payAmount} 单</strong></Descriptions.Item>
              <Descriptions.Item  label="销量数量"><strong>{detailList?.deviceNum} 台</strong></Descriptions.Item>
            </>
            }
           
            {orderType == 'finger_doctor_activation_fee_performance'&&
            <Descriptions.Item  label="总启动次数"><strong>{detailList?.deviceNum} 款</strong></Descriptions.Item>
            }
          </Descriptions>
        )}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          labelWidth: 140,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='wholesalePm'
              conditions={getFieldsValue}
            />
          ]
        }}
        onSubmit={(val: any)=>{
          setData(val)
        }}
        onReset={()=>{
          setData({})
        }}
      />
  )
}

const FingerDoctorPerformance: FC = () => {
  const [activeKey, setActiveKey] = useState<string>('finger_doctor_purchase_trading_performance')
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
      <ProCard.TabPane key="finger_doctor_purchase_trading_performance" tab="手指医生购买交易业绩">
        {
          activeKey == 'finger_doctor_purchase_trading_performance' && <NewIntensivePerformance orderType={activeKey}/>
        }
      </ProCard.TabPane>
      <ProCard.TabPane key="finger_doctor_activation_fee_performance" tab="手指医生启动费业绩">
        {
          activeKey == 'finger_doctor_activation_fee_performance' && <NewIntensivePerformance orderType={activeKey}/>
        }
      </ProCard.TabPane>
    </ProCard>
  </PageContainer>
  )
}

export default FingerDoctorPerformance

