import { useState } from "react"
import ProTable from '@ant-design/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'

import PageContainer from '@/components/PageContainer'
import { wholesalePm } from "@/services/product-performance-management/new-intensive-performance"
import { amountTransform } from '@/utils/utils'
import AddressCascader from "@/components/address-cascader"
import styles from "./styles.less"

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
      render: _ => `${_&&_}家`
    },
    {
      title: '总销售sku数',
      dataIndex: 'totalSkuNum',
      render: _ => `${_&&_}款`
    },
    {
      title: '商品销量',
      dataIndex: 'saleNum',
      render: _ => `${_&&_}件`
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

const NewIntensivePerformance: FC = () => {
  const [data, setData] = useState()

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
        2: '待发货',
        3: '待收货',
        5: '已完成（已确认收到货）'
      },
      hideInTable: true
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      align: 'center'
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center'
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
      title: '市办事处',
      dataIndex: 'cityAgencyName',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <PageContainer className={styles.desc}>
      <ProTable
        rowKey='orderSn'
        columns={columns}
        params={{}}
        request={wholesalePm}
        postData={(v:any)=>{
          setData(v[0].total)
          return (v[0].res)
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        headerTitle={<Aggregate data={data}/>}
        options={false}
        search={{
          labelWidth: 140,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse()
          ]
        }}
      />
    </PageContainer>
  )
}

export default NewIntensivePerformance
