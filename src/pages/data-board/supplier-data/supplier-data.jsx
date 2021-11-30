import React, { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { history } from 'umi'
import moment from 'moment'
import { Space, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { supplierData } from '@/services/data-board/supplier-data'
import Yuan from '../components/Yuan'
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

const SupplierData = () => {
  const [amount, setAmount] = useState(0)
  const form = useRef()
  const [visit, setVisit] = useState(false)

  const getFieldValue = () => {
    const { time, ...rest } = form.current.getFieldsValue()
    return {
      startTime: time?.[0]?.format('YYYY-MM-DD'),
      endTime: time?.[1]?.format('YYYY-MM-DD'),
      ...rest
    }
  }

  const skipToDeatil = (e, id, name) => {
    const { time } = form?.current?.getFieldsValue?.()
    const startTime = time&&moment(time?.[0]).format('YYYY-MM-DD')
    const endTime = time&&moment(time?.[1]).format('YYYY-MM-DD')
    const date = time?`&startTime=${startTime}&endTime=${endTime}`: ''
    history.push(`/data-board/supplier-data/detail?type=${e}&id=${id}&storeName=${name}${date}`)
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
      title: ()=>(
        <Space>
          <span>商品总数</span>
          <Tooltip title="已通过审核的sku商品总数（含上架和下架的）">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'spuNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=>skipToDeatil('amount', r?.supplierId, r.supplierName)}>{_}</a>
    },
    {
      title: ()=>(
        <Space>
          <span>出售中商品数</span>
          <Tooltip title="已通过审核的sku商品总数（只含上架状态的）">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
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
      render: (_, r) => <a onClick={()=>skipToDeatil('second', r?.supplierId, r.supplierName)}>{amountTransform(Number(_), '/').toFixed(2)}</a>
    },{
      title: '集约销售总额（元）',
      dataIndex: 'wholesaleAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=>skipToDeatil('intensive', r?.supplierId, r.supplierName)}>{amountTransform(Number(_), '/').toFixed(2)}</a>
    },
    {
      title: '总销售额(元)',
      dataIndex: 'totalAmount',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(Number(_), '/').toFixed(2)
    },
    {
      title: ()=>(
        <Space>
          <span>总货款(元)</span>
          <Tooltip title="含盲盒和红包补贴的金额，扣除手续费">
            <QuestionCircleOutlined/>
          </Tooltip>
        </Space>
      ),
      dataIndex: 'totalPayment',
      align: 'center',
      hideInSearch: true,
      render: (_) => amountTransform(Number(_), '/').toFixed(2)
    }
  ]
  
  return (
    <PageContainer title={false}>
      <div className={styles.timeSearch}>
        <Space size={20}>
          <h3>供应商销售排名</h3>
          <SelectDate
            setDateSelect={setRangePickerValue}
            selectDate={selectDate}
            rangePickerValue={rangePickerValue}
            handleRangePickerChange={handleRangePickerChange}
          />
        </Space>
      </div>
      <div className={styles.radioArea}>
        <Radio.Group 
          onChange={onChange}
          value={value}
          size="large"
        >
          <Radio value={1}>秒约销售额</Radio>
          <Radio value={2}>集约销售额</Radio>
        </Radio.Group>
        <BarChart data={data}/>
      </div>
      <ProTable
        rowKey="supplierId"
        formRef={form}
        request={supplierData}
        params={{}}
        columns={columns}
        postData={(v) => {
          setAmount(v.total)
          return v.records
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, formProps, dom)=> [
            ...dom.reverse(),
            <Export
              change={(e)=> {setVisit(e)}}
              key="export" 
              type="supplier-data-statistics-export"
              conditions={getFieldValue}
            />,
            <ExportHistory
              key="export-history" 
              show={visit} setShow={setVisit}
              type="supplier-data-statistics-export"
            />
          ]
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
