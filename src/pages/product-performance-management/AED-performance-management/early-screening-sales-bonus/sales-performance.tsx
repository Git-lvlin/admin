import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import Export from '@/components/export'
import { ipoList } from '@/services/product-performance-management/early-screening-sales-bonus'
import ExamOrder from './exam-order'

const SalesPerformance: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState()
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { months, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      months: months && moment(months).format("YYYY-MM")
    }
  }

  const columns:ProColumns[] = [
    {
      title: '所属月份',
      dataIndex: 'months',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属月份',
      dataIndex: 'months',
      valueType: 'dateMonth',
      hideInTable: true
    },
    {
      title: '销售人用户ID',
      dataIndex: 'memberId',
      align: 'center'
    },
    {
      title: '销售人手机号码',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '支付单数',
      dataIndex: 'orderNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.orderNum && r.orderNum > 0) {
          return <a onClick={()=> {setVisible(true); setData(r)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '完成单数',
      dataIndex: 'finishNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.finishNum && r.finishNum > 0) {
          return <a onClick={()=> {setVisible(true); setData(r)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '下单人数',
      dataIndex: 'directNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司ID',
      dataIndex: 'subId',
      align: 'center'
    },
    {
      title: '所属子公司名称',
      dataIndex: 'subName',
      align: 'center'
    }
  ]

  return (
    <>
      <ProTable
        columns={columns}
        request={ipoList}
        params={{}}
        options={false}
        formRef={form}
        bordered
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export 
              type='ipoListAdm'
              key='1'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible &&
        <ExamOrder
          visible={visible}
          setVisible={setVisible}
          dataSource={data}
          type='sales'
        />
      }
    </>
  )
}

export default SalesPerformance