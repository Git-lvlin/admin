import TimeSelect from '@/components/time-select'
import { useState, useRef, useEffect } from 'react'
import ProTable from '@/components/pro-table'
import moment from 'moment'

import type { ProColumns, ActionType } from "@ant-design/pro-table"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import type { FormInstance } from 'antd'
import { Descriptions } from 'antd'
import { LeaseTableProps,DescriptionsProps } from "./data"

import { hostingLease } from "@/services/hydrogen-atom-trusteeship/performance-commission-enquiry"
import AddressCascader from '@/components/address-cascader'
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

export default () => {
  const actRef = useRef<ActionType>()
  const formRef = useRef<FormInstance>()
  const [detailList,setDetailList]=useState<DescriptionsProps>()
  const [visit, setVisit] = useState<boolean>(false)
  const getFieldValue = () => {
    const { payTime,area=[], ...rest } = formRef.current?.getFieldsValue()
    return {
      payTimeStart: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      payTimeEnd: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      regionId: area[2]?.value,
      ...rest
    }
  }
  const columns: ProColumns<LeaseTableProps>[] = [
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
      dataIndex: 'subOrderSn',
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
      renderFormItem: () => <TimeSelect />,
      hideInTable: true,
      order: 7
    },
    {
      title: '订单金额',
      dataIndex: 'leasePeriodAmount',
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
      order: 1
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
      order: 4
    },
    {
      title: '设备ID',
      dataIndex: 'imei',
      align: 'center',
      fieldProps: {
        placeholder:'请输入设备ID'
      },
      order: 6
    },
    {
      title: '套餐类型',
      dataIndex: 'leaseTitle',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '套餐类型',
      dataIndex: 'leasePackageId',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        1001: '三个月套餐',
        1002: '六个月套餐',
        1003: '十二个月套餐',
        999: '自定义套餐'
      },
      order: 3
    },
    {
      title: '租期天数',
      dataIndex: 'leaseDay',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <>
      <ProTable<LeaseTableProps>
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
        request={hostingLease}
        options={false}
        actionRef={actRef}
        formRef={formRef}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
            change={(e)=> {setVisit(e)}}
            key="export" 
            type="store-export-hostinbglease-paypage"
            conditions={()=>{return getFieldValue()}}
            />,
            <ExportHistory 
              key="export-history" 
              show={visit}
              setShow={setVisit}
              type="store-export-hostinbglease-paypage"
            />
          ]
        }}
        className={styles.escrow_purchase_transaction}
        tableExtraRender={(_, data) => (
          <Descriptions labelStyle={{fontWeight:'bold'}} style={{background:'#fff',marginBottom:'20px'}} column={3} bordered>
            <Descriptions.Item  label="总业绩金额">{amountTransform(detailList?.paidRental,'/')} 元</Descriptions.Item>
            <Descriptions.Item  label="总下单店铺数量">{detailList?.memberIdCount} 家</Descriptions.Item>
            <Descriptions.Item  label="总套餐销售笔数">{detailList?.leaseCount} 笔</Descriptions.Item>
          </Descriptions>
        )}
      />
    </>
  )
}
