import { useState, useRef, useEffect } from 'react'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from "@ant-design/pro-table"
import { Descriptions, FormInstance } from 'antd'
import { TableProps,DescriptionsProps } from "./data"

import { payPageForAdmin } from "@/services/hydrogen-atom-trusteeship/performance-commission-enquiry"
import AddressCascader from '@/components/address-cascader'
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

export default () => {
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const formRef = useRef<FormInstance>()
  const [visit, setVisit] = useState<boolean>(false)
  const getFieldValue = () => {
    const { payTime, ...rest } = formRef.current?.getFieldsValue()
    return {
      payTimeStart: payTime && moment(payTime?.[0]).unix(),
      payTimeEnd: payTime && moment(payTime?.[1]).unix(),
      ...rest
    }
  }
  const columns: ProColumns<TableProps>[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入用户手机'
      },
      order: 5
    },
    {
      title: '订单编号',
      dataIndex: 'payOrderSn',
      align: 'center',
      fieldProps: {
        placeholder: '请输入订单编号'
      },
      order: 2
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
      order: 6
    },
    {
      title: '订单金额（元）',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
     {
      title: '下单人店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
      fieldProps: {
        placeholder:'请输入社区店编号'
      },
      order: 4
    },
    {
      title: '下单人店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人店铺所属地区',
      dataIndex: 'area',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect placeholder="请选择" />),
      order: 1
    },
    {
      title: '交易资质数(个)',
      dataIndex: 'qualificationNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易资质数(个)',
      dataIndex: 'qualificationNum',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1: '1台',
        2: '2台',
        3: '3台',
      },
      order: 3
    },
  ]

  return (
      <ProTable<TableProps>
        rowKey='id'
        columns={columns}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        postData={(data)=>{
          setDetailList(data)
          return data?.records
        }}
        formRef={formRef}
        request={payPageForAdmin}
        options={false}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
             ...dom.reverse(),
             <Export
              change={(e)=> {setVisit(e)}}
              key="export" 
              type="store-export-membershopoperator-paypage"
              conditions={()=>{return getFieldValue()}}
            />,
            <ExportHistory 
              key="export-history" 
              show={visit}
              setShow={setVisit}
              type="store-export-membershopoperator-paypage"
            />
          ],
        }}
        className={styles.escrow_purchase_transaction}
        tableExtraRender={(_, data) => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff',marginBottom:'20px'}} column={3} bordered>
            <Descriptions.Item  label="总业绩金额">{amountTransform(detailList?.deviceTotalPay,'/')} 元</Descriptions.Item>
            <Descriptions.Item  label="总下单店铺数量">{detailList?.memberIdCount} 家</Descriptions.Item>
            <Descriptions.Item  label="总交易资质数量">{detailList?.deviceTotal} 个</Descriptions.Item>
          </Descriptions>
        )}
      />
  )
}
