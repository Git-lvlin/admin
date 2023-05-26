import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { commissionPage, commissionSum, buyDoctorPage, buyDoctorSum } from "@/services/product-performance-management/finger-doctor-performance"
import { amountTransform } from '@/utils/utils'
import Export from '@/components/export'
import ProCard from '@ant-design/pro-card';
import { Descriptions } from 'antd'

type detailListProps = {
  totalAmount: number
  totalStores: number
  totalBootTimes: number
  serviceNums: number
  deviceNum: number
  totalOrder: number
  totalCount: number
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
    const api=orderType == 'finger_doctor_purchase_trading_performance'? buyDoctorSum:commissionSum
    api(data).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })
  }, [data])

  const getFieldsValue = () => {
    const {payTime,...rest} = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '下单人手机',
      dataIndex: 'buyerMobile',
      align: 'center',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入用户手机'
      }
    },
    {
      title: '下单人手机号码',
      dataIndex: 'buyerMobile',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '用户ID',
      dataIndex: 'buyerId',
      align: 'center'
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
      hideInSearch: true,
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
      fieldProps: {
        placeholder: ['开始时间','结束时间'],
        style: {
          width: 330
        }
      }
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        2: '待发货',
        3: '待收货',
        5: '已完成（已确认收到货）'
      },
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      valueEnum: {
        2: '待发货',
        3: '待收货',
        5: '已完成（已确认收到货）'
      },
      hideInTable: true,
      hideInSearch: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '数量',
      dataIndex: 'purchaseCount',
      align: 'center',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '下单人店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance',
      hideInSearch: true
    },
    {
      title: '下单人店铺所在区域',
      dataIndex: 'area',
      align: 'center',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '下单人店铺地址',
      dataIndex: 'address',
      align: 'center',
      width: '10%',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_purchase_trading_performance'
    },
    {
      title: '所属人收益',
      dataIndex: 'storeAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/').toFixed(2),
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
    {
      title: '平台分成总额',
      dataIndex: 'platformAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/').toFixed(2),
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
    {
      title: '所属人店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
      hideInTable: orderType != 'finger_doctor_activation_fee_performance',
      hideInSearch: true
    },
    {
      title: '所属人店铺所在区域',
      dataIndex: 'area',
      align: 'center',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
    {
      title: '所属人店铺地址',
      dataIndex: 'address',
      align: 'center',
      width: '10%',
      hideInSearch: true,
      hideInTable: orderType != 'finger_doctor_activation_fee_performance'
    },
    {
      title: '市办事处',
      dataIndex: 'cityOfficeName',
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
        rowKey='orderSn'
        columns={columns}
        request={orderType == 'finger_doctor_purchase_trading_performance'?buyDoctorPage:commissionPage}
        tableExtraRender={() => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff',margin:'0 30px'}} column={5} layout="horizontal" bordered>
            <Descriptions.Item  label="总业绩金额"><strong>{amountTransform(detailList?.totalAmount, '/')} 元</strong></Descriptions.Item>
            <Descriptions.Item  label="总下单店铺数量"><strong>{detailList?.totalStores} 家</strong></Descriptions.Item>
            {orderType == 'finger_doctor_purchase_trading_performance'&&
            <>
              <Descriptions.Item  label="总销售订单数"><strong>{detailList?.totalOrder} 单</strong></Descriptions.Item>
              <Descriptions.Item  label="销量数量"><strong>{detailList?.totalCount} 台</strong></Descriptions.Item>
            </>
            }
           
            {orderType == 'finger_doctor_activation_fee_performance'&&
            <Descriptions.Item  label="总启动次数"><strong>{detailList?.totalBootTimes} 次</strong></Descriptions.Item>
            }
          </Descriptions>
        )}
        formRef={form}
        scroll={{x: 'max-content'}}
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
              type={orderType == 'finger_doctor_purchase_trading_performance'?'exportBuyDoctorCommissionList':'exportDoctorBootCommissionList'}
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

