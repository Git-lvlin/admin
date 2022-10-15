import { useState, useRef } from "react"
import ProTable from '@ant-design/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { storeLifePm } from "@/services/product-performance-management/brand-authorization-fee"
import { amountTransform } from '@/utils/utils'
import AddressCascader from "@/components/address-cascader"
import styles from "../styles.less"
import Export from '@/components/export'

const Aggregate: FC<any> = ({data}) => {
  
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
      title: '有推荐人店铺数',
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
  const [data, setData] = useState()
  const form = useRef<FormInstance>()

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
      title: '推荐人店铺编号',
      dataIndex: 'storeHomeNumber',
      align: 'center'
    },
    {
      title: '推荐人店铺所在区域',
      dataIndex: 'storeArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人的店铺省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader />
    },
    {
      title: '下单店主店铺所在区域',
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
        '2': '未签写'
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
        rowKey='orderSn'
        columns={columns}
        params={{contractStatus: '4'}}
        request={storeLifePm}
        postData={(v:any)=>{
          setData(v[0].total)
          return (v[0].res)
        }}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        headerTitle={<Aggregate data={data}/>}
        options={false}
        search={{
          labelWidth: 140,
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
