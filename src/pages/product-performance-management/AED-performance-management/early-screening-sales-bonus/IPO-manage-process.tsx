import { useState, useRef } from 'react'
import { Button } from 'antd'
import moment from 'moment'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { ipoManagerList } from '@/services/product-performance-management/early-screening-sales-bonus'
import Process from './process'
import Export from '@/components/export'
import ExamOrder from './exam-order'

const IPOManageProcess: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>()
  const [processVisible, setProcessVisible] = useState(false)
  const [examOrderVisible, setExamOrderVisible] = useState(false)
  const [id, setId] = useState<React.Key[] | undefined>(undefined)
  const [title, setTitle] = useState<string>()
  const [phone, setPhone] = useState()
  const [type, setType] = useState<string>()
  const [data, setData] = useState()
  const acf = useRef<ActionType>()
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { months, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      months: months && moment(months).format("YYYY-MM")
    }
  }

  const columns: ProColumns[] = [
    {
      title: '本页',
      align: 'left',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'processDesc',
      align: 'center',
      hideInSearch: true
    },
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
          return <a onClick={()=> {setExamOrderVisible(true); setData(r)}}>{_}</a>
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
          return <a onClick={()=> {setExamOrderVisible(true); setData(r)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '完成人数',
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
    },
    {
      title: 'IPO奖金额',
      dataIndex: 'amountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <a 
          onClick={()=> {
            setProcessVisible(true)
            setId([r.id])
            setTitle(`审核${r.months}${r.subName}的销售人额外奖申请 `)
            setPhone(r.memberPhone)
            setType('one')
          }}
        >
          审核
        </a>
      )
    },
  ]

  return (
    <>
      <ProTable
        rowKey='id'
        columns={columns}
        request={ipoManagerList}
        params={{process: 16}}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export 
              type='ipoManagerAuditAdm'
              key='1'
              conditions={getFieldsValue}
            />
          ]
        }}
        actionRef={acf}
        formRef={form}
        options={false}
        toolBarRender={()=> [
          <Button 
            type='primary'
            key='1'
            onClick={()=> {
              setProcessVisible(true)
              setId(selectedRowKeys?.length as number > 0 ? selectedRowKeys: undefined)
              setTitle('审核销售人额外奖申请')
              setType('all')
            }}
          >
            {selectedRowKeys?.length as number > 0 ? '审核已勾选额外奖励' : '审核全部额外奖励'}
          </Button>
        ]}
        scroll={{x: 'max-content'}}
        rowSelection={{
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: _ => {
            setSelectedRowKeys(_)
          }
        }}
      />
      {
        processVisible &&
        <Process
          visible={processVisible}
          setVisible={setProcessVisible}
          type='audit'
          types={type}
          callback={()=> acf.current?.reload()}
          id={id}
          title={title}
          phone={phone}
        />
      }
      {
        examOrderVisible &&
        <ExamOrder
          visible={examOrderVisible}
          setVisible={setExamOrderVisible}
          dataSource={data}
        />
      }
    </>
  )
}

export default IPOManageProcess