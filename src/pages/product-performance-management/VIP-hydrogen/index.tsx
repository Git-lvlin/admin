import { useState, useRef } from "react"
import ProTable from '@ant-design/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { vipStoreHydrogenPm } from "@/services/product-performance-management/VIP-hydrogen"
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
      title: '总下单店铺数量',
      dataIndex: 'totalShopNum',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '总销售数量',
      dataIndex: 'totalSkuNum',
      render: _ => `${_ ? _ : 0}台`
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

const VIPHydrogen: FC = () => {
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
      initialValue: ['2022-9-24 00:00:00', moment(+new Date()).format("YYYY-MM-DD HH:mm:ss")],
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
      title: '订单状态',
      dataIndex: 'orderStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      valueEnum: {
        '1': '已完成（已过售后期）',
        '2': '售后中',
        '3': '已退款',
        '4': '所有已完成'
      },
      hideInTable: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'storeMemberPhone',
      align: 'center',
      hideInSearch: true
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
      title: '推荐人店铺地址',
      dataIndex: 'storeAddress',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '氢原子市代',
      dataIndex: 'cityProxy',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '市办事处',
      dataIndex: 'cityAgencyName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '间推人手机号',
      dataIndex: 'interPushMemberPhone',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <PageContainer className={styles.desc}>
      <div className={styles.title}>2022年9月24日至今 VIP店主购买氢原子交易业绩明细</div>
      <ProTable
        rowKey='orderSn'
        columns={columns}
        params={{orderStatus: '4'}}
        request={vipStoreHydrogenPm}
        postData={(v:any)=>{
          setData(v[0].total)
          return (v[0].res)
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={form}
        headerTitle={<Aggregate data={data}/>}
        options={false}
        search={{
          labelWidth: 140,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type="vipStoreHydrogenPm"
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default VIPHydrogen
