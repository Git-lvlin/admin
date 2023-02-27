import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'
import { Button } from 'antd'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import Export from '@/components/export'
import Import from '@/components/ImportFile/import'
import ImportHistory from '@/components/ImportFile/import-history'
import AddRecord from './add-record'
import { admGetList } from '@/services/love-feedback-activities/registration-record-love-feedback'
import { amountTransform } from '@/utils/utils'

const FoundationDonationRecords =  () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [importVisit, setImportVisit] = useState<boolean>(false)
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType >()
  const user = window.localStorage.getItem('nickname') as string

  const url = 'https://pro-yeahgo.oss-cn-shenzhen.aliyuncs.com/file/donate_record_import.xlsx'

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
      dataIndex: 'phone',
      align: 'center',
      fieldProps: {
        placeholder: '请输入手机号'
      },
      hideInTable: true
    },
    {
      title: '附言手机号',
      dataIndex: 'phone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '付款人姓名',
      dataIndex: 'userName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易金额',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/').toFixed(2)
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
      title: '电子回单编号',
      dataIndex: 'replySlipNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '附言',
      dataIndex: 'attachment',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '录入时间',
      dataIndex: 'createTimeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '录入操作人',
      dataIndex: 'operateName',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'status',
      align: 'center',
      fieldProps: {
        placeholder: '请选择领取状态'
      },
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        0: '待领取',
        1: '已领取',
        2: '已过期'
      }
    },
    {
      title: '领取状态',
      dataIndex: 'statusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '到账状态',
      dataIndex: 'isArrivalDesc',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <>
      <ProTable
        rowKey='id'
        columns={columns}
        request={admGetList}
        params={{}}
        bordered
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }} 
        actionRef={actRef}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom) => {
            return [
              ...dom.reverse(),
              <Export
                key='export'
                type="donateRecord"
                conditions={{...form.current?.getFieldsValue()}}
              />,
              <Import
                key='import'
                change={(e: boolean) => { setImportVisit(e) }}
                code="donate_record_import"
                show={true}
                url={url}
                operatorName={user}
              />,
              <ImportHistory 
                key='importHistory'
                show={importVisit} 
                setShow={setImportVisit} 
                type="donate_record_import" 
              />,
              <Button 
                type='primary' 
                key='add'
                onClick={()=> {setVisible(true)}}
              >
                新增记录
              </Button>,
            ]
          }
        }}
      />
      {
        visible&&
        <AddRecord
          visible={visible}
          setVisible={setVisible}
          callback={()=> actRef.current?.reload()}
        />
      }
    </>
  )
}

export default FoundationDonationRecords
