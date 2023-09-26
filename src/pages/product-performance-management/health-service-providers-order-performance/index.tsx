import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns, ActionType } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import Export from '@/components/export'
import { providerPm } from '@/services/product-performance-management/health-service-providers-order-performance'
import AddressCascader from '@/components/address-cascader'
import type { FormInstance } from 'antd'

const HealthStorePartnerOrderPerformance: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()
  const [visit, setVisit] = useState(false)

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
      title: '大健康省代名称',
      dataIndex: 'hyProvinceAgent',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '服务商编号',
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
      title: '订单号',
      dataIndex: 'subOrderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务区域',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '业绩金额(元)',
      dataIndex: 'payAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同签订时间',
      dataIndex: 'contractSignTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务区域',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '签订时间',
      dataIndex: 'dateRange',
      hideInTable: true,
      renderFormItem: () => <TimeSelect />
    },
    {
      title: '合同ID',
      dataIndex: 'contractId',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.contractUrl) {
          return <a href={r.contractUrl} target='_blank' referrerPolicy='no-referrer'>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
  ]
  const getFieldValue = () => {
    const { dateRange, area, ...rest } = form.current?.getFieldsValue()
    return {
      contractStartTime: dateRange && moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      contractEndTime: dateRange && moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area[0]?.value,
      cityId: area[1]?.value,
      areaId: area[2]?.value,
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
        request={providerPm}
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom)=> [
            ...dom.reverse(),
            <Export
             key='export'
             type='providerPm'
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