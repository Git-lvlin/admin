import TimeSelect from '@/components/time-select'
import { useState, useRef } from "react"
import ProTable from '@/components/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { wholesalePm } from "@/services/product-performance-management/new-intensive-performance"
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
      title: '总销售sku数',
      dataIndex: 'totalSkuNum',
      render: _ => `${_ ? _ : 0}款`
    },
    {
      title: '商品销量',
      dataIndex: 'saleNum',
      render: _ => `${_ ? _ : 0}件`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={{xl: 2, xxl: 4}}
      bordered
      dataSource={data}
    />
  )
}

const NewIntensivePerformance: FC = () => {
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
      align: 'center',
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
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
      renderFormItem: () => <TimeSelect showTime={false}/>,
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
        '2': '待发货',
        '3': '待收货',
        '5': '已完成（已确认收到货）'
      },
      hideInTable: true
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'digit',
      hideInTable: true
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'digit',
      hideInTable: true
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '销售类型',
      dataIndex: 'commissionSaleType',
      valueType: 'select',
      valueEnum: {
        '1': '引流款',
        '2': '利润款',
        '0': '其他'
      },
      hideInTable: true
    },
    {
      title: '销售类型',
      dataIndex: 'commissionSaleType',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      width: '10%'
    },
    {
      title: '推荐人手机号',
      dataIndex: 'storeMemberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人用户ID',
      dataIndex: 'recomMemberId',
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
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '推荐人店铺地址',
      dataIndex: 'storeAddress',
      align: 'center',
      width: '10%',
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
        rowKey='id'
        columns={columns}
        params={{}}
        request={wholesalePm}
        postData={(v:any)=>{
          setData(v[0].total)
          return (v[0].res)
        }}
        scroll={{x: 'max-content'}}
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
              type='wholesalePm'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default NewIntensivePerformance
