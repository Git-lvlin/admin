import React, { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import AddressCascader from '@/components/address-cascader'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { amountTransform } from '@/utils/utils'
import { serviceFee } from '@/services/data-board/community-store-data'
import styles from './styles.less'
import Yuan from '../components/Yuan'

const ServiceCharge = () => {
  const [visit, setVisit] = useState(false)
  const [totalPay, setTotalPay] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [total, setTotal] = useState(0)

  const form = useRef()

  const getFieldValue = () => {
    const {area, payTime, ...rest} = form?.current?.getFieldsValue()
    return {
      provinceId: area?.[0] && area?.[0]?.value,
      cityId: area?.[1] && area?.[1]?.value,
      regionId: area?.[2] && area?.[2]?.value,
      payStart: payTime?.[0],
      payEnd: payTime?.[1],
      ...rest
    }
  }

  const columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    }, 
    {
      title: '社区店名称',
      dataIndex: 'storeName',
      width: '20%',
      align: 'center'
    },
    {
      title: '店铺地址',
      dataIndex: 'fullAddress',
      align: 'center',
      width: '20%',
      hideInSearch: true
    },
    {
      title: '缴费金额',
      dataIndex: 'serviceFee',
      align: 'center',
      render: (_)=> amountTransform(_, '/'),
      hideInSearch: true
    },
    {
      title: '地区范围',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '缴费时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '缴费时间',
      dataIndex: 'payTime',
      valueType: 'dateRange',
      align: 'center',
      hideInTable: true
    },
    {
      title: '缴费有效期',
      dataIndex: 'expireTime',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <ProTable
      rowKey='id'
      columns={columns}
      params={{}}
      formRef={form}
      request={serviceFee}
      pagination={{
        total,
        pageSize: 10
      }}
      toolbar={{
        settings: false
      }}
      postData={(v)=> {
        setTotalPay(v?.allServiceFee)
        setTotalAmount(v?.allTotal)
        setTotal(v?.total)
        return v?.records
      }}
      headerTitle="服务费统计"
      search={{
        labelWidth: 120,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
          <Export
            change={(e)=> {setVisit(e)}}
            key="export" 
            type="membershop-servicefee-export"
            conditions={getFieldValue}
          />,
          <ExportHistory 
            key="export-history" 
            show={visit}
            setShow={setVisit}
            type="membershop-servicefee-export"
          />
        ]
      }}
      tableRender={(_, dom) => (
        <>
          { dom }
          {
            totalPay !==0  &&
            <div className={styles.summary}>
            <span>缴费总数（个）：<Yuan>{totalAmount}</Yuan></span>
            <span>缴费总金额（元）：<Yuan>{amountTransform(totalPay, '/')}</Yuan></span>
          </div>
          }
        </>
      )}
    />
  )
}

export default ServiceCharge
