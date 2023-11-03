import { useRef } from 'react'
import moment from 'moment'

import type { ProColumns, ActionType } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import Export from '@/components/export'
import { providerGoodsPm } from '@/services/product-performance-management/health-supply-system-order-performance'
import AddressCascader from '@/components/address-cascader'
import type { FormInstance } from 'antd'

const HealthStorePartnerOrderPerformance: React.FC = () => {
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
    {
      title: '推荐人手机号',
      dataIndex: 'directPhone',
      align: 'center'
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '大健康省代',
      dataIndex: 'hyProvinceAgent',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '汇智能通省代',
      dataIndex: 'provinceAgent',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '汇智能通市代',
      dataIndex: 'cityAgent',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '汇鸿鑫科技',
      dataIndex: 'hhxAward',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '区县服务商',
      dataIndex: 'healthyProvider',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '氢原子市代',
      dataIndex: 'hyCityAgent',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '合作公司',
      dataIndex: 'subcompany',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '非合作公司',
      dataIndex: 'unsubcompany',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '合作商编号',
      dataIndex: 'houseNumber',
      align: 'center'
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '下单用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '门店合作商所在地',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品skuID',
      dataIndex: 'skuId',
      align: 'center',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
    },
    {
      title: '合作商所在地',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '订单号',
      dataIndex: 'subOrderSn',
      align: 'center',
    },
    {
      title: '订单金额(元)',
      dataIndex: 'payAmountDesc',
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
      title: '订单状态',
      dataIndex: 'statusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'dateRange',
      hideInTable: true,
      renderFormItem: () => <TimeSelect />
    },
  ]
  const getFieldValue = () => {
    const { dateRange, area, ...rest } = form.current?.getFieldsValue()
    return {
      startTime: dateRange?.[0] && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: dateRange?.[1] && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area?.[0]&&area[0]?.value,
      cityId: area?.[1]&&area[1]?.value,
      areaId: area?.[2]&&area[2]?.value,
      ...rest,
    }
  }
  return (
    <PageContainer>
      <ProTable 
        rowKey='subOrderSn'
        columns={columns}
        params={{}}
        actionRef={actRef}
        request={providerGoodsPm}
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom)=> [
            ...dom.reverse(),
            <Export
             key='export'
             type='providerGoodsPm'
             conditions={getFieldValue}
            />
          ]
        }}
        options={false}
      />
    </PageContainer>
  )
}

export default HealthStorePartnerOrderPerformance