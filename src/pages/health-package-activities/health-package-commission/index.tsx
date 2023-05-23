import { useRef } from 'react'
import ProTable from '@/components/pro-table'
import { DatePicker } from 'antd'
import moment from 'moment'

import type {ProColumns} from '@ant-design/pro-table'
import type { FC } from 'react'
import type { FormInstance } from 'antd'

import PageContainer from '@/components/PageContainer'
import { cardRecomCommission } from '@/services/health-package-activities/health-package-commission'
import { amountTransform } from '@/utils/utils'
import Export from '@/components/export'

const HealthPackageCommission: FC = () => {
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const {time, ...rest} = form.current?.getFieldsValue()
    return {
      startTime: time && moment(time).startOf('month').format('YYYY-MM-DD'),
      endTime: time && moment(time).endOf('month').format('YYYY-MM-DD'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '交易月度查询',
      dataIndex: 'time',
      hideInTable: true,
      renderFormItem: () =>  <DatePicker picker="month"/>
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '用户手机',
      dataIndex: 'phoneNumber',
      hideInTable: true
    },
    {
      title: '佣金类型',
      dataIndex: 'commissionTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '佣金类型',
      dataIndex: 'commissionType',
      valueType: 'select',
      valueEnum: {
        1: '销售佣金',
        2: '管理佣金'
      },
      hideInTable: true
    },
    {
      title: '订单总额',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '佣金金额',
      dataIndex: 'commission',
      align: 'center',
      render: (_) => amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '套餐名称',
      dataIndex: 'pkgName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '套餐名称',
      dataIndex: 'pkgId',
      valueType: 'select',
      valueEnum: {
        2001: '健康体验礼包',
        2002: '健康礼包一',
        2003: '健康礼包二',
        2004: '健康礼包三',
        2005: '健康礼包四', 
        2006: '健康礼包五',
      },
      hideInTable: true
    },
    {
      title: '套餐单号',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        params={{}}
        request={cardRecomCommission}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
              type='cardRecomCommission'
              key='export'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default HealthPackageCommission
