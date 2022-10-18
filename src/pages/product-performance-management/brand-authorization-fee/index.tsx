import { useState, useRef, useEffect } from "react"
import ProTable from '@ant-design/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { storeLifePm, storeLifePmStats } from "@/services/product-performance-management/brand-authorization-fee"
import { amountTransform, numFormat } from '@/utils/utils'
import AddressCascader from "@/components/address-cascader"
import styles from "../styles.less"
import Export from '@/components/export'

const Aggregate: FC<any> = ({form}) => {
  const [data, setData] = useState()

  console.log(form);
  

  const getData = async () => {
    const contractStatus= form?.contractStatus ? form?.contractStatus : '4'
    await storeLifePmStats({
      ...form,
      contractStatus
    }).then(res => {
      setData(res.data)
    })
  }
  
  useEffect(()=> {
    getData()
  }, [form])

  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总业绩金额',
      dataIndex: 'payAmount',
      render: (_) => `${amountTransform(_, '/')}元`
    },
    {
      title: '总下单店主数量',
      dataIndex: 'buyUserNum',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '有推荐人VIP店数',
      dataIndex: 'refererStoreNum',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '合同签订状况(已签/未签)',
      dataIndex: 'signedNum',
      render: (_, r) => `${_ ? _ : 0} / ${r.unsignedNum ? r.unsignedNum : 0}`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={4}
      bordered
      dataSource={data}
    />
  )
}

const BrandAuthorizationFee: FC = () => {
  const form = useRef<FormInstance>()
  const [searchConfig, setSearchConfig] = useState()

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
      title: '下单人手机号码',
      dataIndex: 'memberPhone',
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
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '推荐人手机号',
      dataIndex: 'storeMemberPhone',
      align: 'center'
    },
    {
      title: '推荐人VIP店铺编号',
      dataIndex: 'storeHomeNumber',
      align: 'center'
    },
    {
      title: '推荐人VIP店铺所在区域',
      dataIndex: 'storeArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人VIP店所属省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader />
    },
    {
      title: '下单店主VIP店铺所在区域',
      dataIndex: 'buyerStoreArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同签订状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        '1': '已签写',
        '3': '未签写',
      },
      hideInTable: true
    },
    {
      title: '合同签订状态',
      dataIndex: 'contractStatusDesc',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <PageContainer className={styles.desc}>
      <ProTable
        rowKey='id'
        columns={columns}
        request={storeLifePm}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        onSubmit={()=>{
          setSearchConfig(form.current?.getFieldsValue())
        }}
        onReset={()=> {
          setSearchConfig(undefined)
        }}
        headerTitle={<Aggregate form={searchConfig}/>}
        options={false}
        search={{
          labelWidth: 160,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='storeLifePm'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default BrandAuthorizationFee
