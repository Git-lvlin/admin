import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { history } from 'umi'
import moment from 'moment'

import { supplierData } from '@/services/data-board/supplier-data'
import Yuan from '../components/Yuan'
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

const SupplierData = () => {
  const [amount, setAmount] = useState(0)
  const form = useRef()

  const skipToDeatil = (e, id, name) => {
    const { time } = form?.current?.getFieldsValue?.()
    const startTime = time&&moment(time?.[0]).format('YYYY-MM-DD')
    const endTime = time&&moment(time?.[1]).format('YYYY-MM-DD')
    history.push(`/data-board/supplier-data/detail?type=${e}&id=${id}&storeName=${name}&startTime=${startTime}&endTime=${endTime}`)
  }

  const columns = [
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      align: 'center'
    },
    {
      title: '供应商名称',
      dataIndex: 'supplierName',
      align: 'center',
      width: '18%'
    },
    {
      title: '统计时间范围',
      dataIndex: 'time',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '商品总数',
      dataIndex: 'spuNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=>skipToDeatil('amount', r?.supplierId, r.supplierName)}>{_}</a>
    },
    {
      title: '出售中商品数',
      dataIndex: 'spuSale',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=>skipToDeatil('sales', r?.supplierId, r.supplierName)}>{_}</a>
    },
    {
      title: '秒约销售总额(元)',
      dataIndex: 'secondAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=>skipToDeatil('second', r?.supplierId, r.supplierName)}>{amountTransform(Number(_), '/')}</a>
    },{
      title: '集约销售总额（元）',
      dataIndex: 'wholesaleAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=>skipToDeatil('intensive', r?.supplierId, r.supplierName)}>{amountTransform(Number(_), '/')}</a>
    },
    {
      title: '总销售额(元)',
      dataIndex: 'totalAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(Number(_), '/')
    },
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="supplierId"
        formRef={form}
        request={supplierData}
        params={{}}
        columns={columns}
        postData={v => {
          setAmount(v?.length)
          return v
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          labelWidth: 120
        }}
        toolbar={{
          settings: false
        }}
        tableRender={(_, dom) => (
          <>
            { dom }
            {
              <div className={styles.summary}>
                <span>商家总数：<Yuan>{amount}</Yuan></span>
              </div>
            }
          </>
        )}
      />
    </PageContainer>
  )
}

export default SupplierData
