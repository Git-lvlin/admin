import { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import Export from '@/components/export'
import { arrivalGetList } from '@/services/love-feedback-activities/registration-record-love-feedback'
import Import from '@/components/ImportFile/import'
import ImportHistory from '@/components/ImportFile/import-history'

const FundReceiptRecord = () => {
  const [importVisit, setImportVisit] = useState<boolean>(false)
  
  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'tradeTimeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '附言手机号',
      dataIndex: 'phone', 
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'phone', 
      align: 'center',
      fieldProps: {
        placeholder: '请输入手机号'
      },
      hideInTable: true
    },
    {
      title: '付款人户名',
      dataIndex: 'userName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易金额',
      dataIndex: 'amountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '数量',
      dataIndex: 'payNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '付款人账号',
      dataIndex: 'payAccount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '到账导入操作人',
      dataIndex: 'operateName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '到账导入时间',
      dataIndex: 'createTimeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '到账状态',
      dataIndex: 'isArrivalDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'isArrival',
      align: 'center',
      fieldProps: {
        placeholder: '请选择到账状态'
      },
      valueType: 'select',
      valueEnum: {
        0: '未到账',
        1: '已到账'
      },
      hideInTable: true
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        options={false}
        request={arrivalGetList}
        params={{}}
        bordered
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              type='donateArrivalRecord'
              conditions={{}}
              key='export'
              text='导出记录'
            />,
            <Import
              key='import'
              code='donate_arrival_record_import'
              change={(e: boolean) => { setImportVisit(e) }}
              show={importVisit}
              title='导入已核实专项基金到账记录'
            />,
            <ImportHistory
              key='importHistory'
              type='donate_arrival_record_import'
              show={importVisit} 
              setShow={setImportVisit}
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default FundReceiptRecord
