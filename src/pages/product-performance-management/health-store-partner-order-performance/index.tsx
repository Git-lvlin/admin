import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns, ActionType } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import Export from '@/components/export'
import { shopPartnerPage } from '@/services/outpatient-service-management/store-partners-management'
import AddressCascader from '@/components/address-cascader'
import type { FormInstance } from 'antd'
import ExportHistory from '@/pages/export-excel/export-history'

const HealthStorePartnerOrderPerformance: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()
  const [visit, setVisit] = useState(false)

  const columns: ProColumns[] = [
    {
      title: '推荐人手机号',
      dataIndex: 'memberPhone',
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
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '汇智能通省代',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '汇智能通市代',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '宾购市代',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '汇鸿鑫科技',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '区县服务商',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '合作商编号',
      dataIndex: 'houseFullName',
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
      title: '所在地',
      dataIndex: 'area',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '缴费金额(元)',
      dataIndex: 'payAmountYuan',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所在地',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '签订时间',
      dataIndex: 'signTime',
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
    const { tPlatformGain, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
    }
  }
  return (
    <PageContainer>
      <ProTable 
        rowKey='id'
        columns={columns}
        params={{}}
        actionRef={actRef}
        request={shopPartnerPage}
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom)=> [
            ...dom.reverse(),
            <Export
             key='export'
             type='hpaAedTrainOrderSdm'
             conditions={getFieldValue}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type={'bind-box-give-detail-export'}/>
          ]
        }}
        options={false}
      />
    </PageContainer>
  )
}

export default HealthStorePartnerOrderPerformance