import { useState, useRef, useEffect } from 'react'
import ProTable from '@/components/pro-table'
import moment from 'moment'

import type { ProColumns, ActionType } from "@ant-design/pro-table"
import type { FC } from "react"
import type { FormInstance } from 'antd'
import { Descriptions } from 'antd'
import { TransactionProps,DescriptionsProps } from "./data"

import { reportPage, reportStatistics } from "@/services/hydrogen-atom-trusteeship/performance-commission-enquiry"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import AddressCascader from '@/components/address-cascader'
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

const StayPut: FC = () => {
  const actRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [visit, setVisit] = useState<boolean>(false)
  const [time,setTime]=useState({})
  const getFieldValue = () => {
    const { payTime,area, ...rest } = formRef.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      districtId: area[2]?.value,
      ...rest
    }
  }

  useEffect(() => {
    console.log('time',time)
    reportStatistics({status:1,...time}).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  }, [time])

  const columns: ProColumns<TransactionProps>[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'buyerPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入用户手机'
      },
      order: 1
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
      render: (_, r) => r?.payTime&&moment(parseInt(r?.payTime)).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
      order: 2
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: '已完成（已过售后期）',
        2: '售后中',
        3: '已售后',
        4: '所有已完成'
      },
      hideInTable: true,
      initialValue:'1',
      order: 3
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        1: '已完成（已过售后期）',
        2: '售后中',
        3: '已售后',
        4: '所有已完成'
      },
      align: 'center'
    },
    {
      title: '推荐人手机号',
      dataIndex: 'inviterPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人店铺编号',
      dataIndex: 'storeNo',
      align: 'center',
      fieldProps: {
        placeholder:'请输入社区店编号'
      },
      hideInTable: true,
      order: 4
    },
    {
      title: '推荐人店铺编号',
      dataIndex: 'inviterStoreNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人店铺所在区域',
      dataIndex: 'inviterAreaInfo',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '推荐人的店铺省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect placeholder="请选择" />),
      order: 5
    },
    {
      title: '推荐人店铺地址',
      dataIndex: 'inviterAddress',
      align: 'center',
      hideInSearch: true,
      render: (_,record) =>{
        return <span>{record?.inviterAreaInfo}{record?.inviterAddress}</span>
      }
    },
    {
      title: '省代名称',
      dataIndex: 'provinceAgent',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '市代名称',
      dataIndex: 'cityAgent',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营中心',
      dataIndex: 'operationCenter',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <>
      <ProTable<TransactionProps>
        rowKey='orderSn'
        columns={columns}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        onSubmit={(val)=>{
          setTime(val)
        }}
        request={reportPage}
        options={false}
        actionRef={actRef}
        formRef={formRef}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            // <Export
            //   change={(e)=> {setVisit(e)}}
            //   key="export" 
            //   type="store-export-membershopoperator-paypage"
            //   conditions={()=>{return getFieldValue()}}
            // />,
            // <ExportHistory 
            //   key="export-history" 
            //   show={visit}
            //   setShow={setVisit}
            //   type="store-export-membershopoperator-paypage"
            // />
          ]
        }}
        className={styles.escrow_purchase_transaction}
        tableExtraRender={(_, data) => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff',marginBottom:'20px'}} column={3} bordered>
            <Descriptions.Item  label="总业绩金额">{amountTransform(detailList?.totalAmount,'/')} 元</Descriptions.Item>
            <Descriptions.Item  label="总下单店铺数量">{detailList?.totalStoreNum} 家</Descriptions.Item>
            <Descriptions.Item  label="总销售数量">{detailList?.totalSalesVolume} 台</Descriptions.Item>
          </Descriptions>
        )}
      />
    </>
  )
}

export default StayPut
