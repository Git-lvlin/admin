import { useState, useRef } from 'react'
import ProTable from '@/components/pro-table'
import { PageContainer } from '@ant-design/pro-layout'
import moment from 'moment'
import { Space } from 'antd'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import Export from '@/components/export'
import { unfreezeDividePage } from '@/services/financial-management/unfrozen-list'
import { amountTransform } from '@/utils/utils'
import Model from './model-form'

const UnfrozenList: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [id, setId] = useState<string>()
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const TWO = moment(+new Date()).subtract(2, 'months').format('YYYY-MM-DD HH:mm:ss')
  const THREE = moment(+new Date()).subtract(3, 'months').format('YYYY-MM-DD HH:mm:ss')
  const SIX = moment(+new Date()).subtract(6, 'months').format('YYYY-MM-DD HH:mm:ss')

  const columns: ProColumns[] = [
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center'
    },
    {
      title: '下单手机号',
      dataIndex: 'buyerMobile',
      align: 'center'
    },
    {
      title: '未解冻超时时间',
      dataIndex: 'timeout',
      valueType: 'select',
      valueEnum: {
        [TWO]: '超过两个月未解冻',
        [THREE]: '超过三个月未解冻',
        [SIX]: '超过六个月未解冻',
      },
      hideInTable: true
    },
    {
      title: '订单金额',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
       render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '关联保证金订单号',
      dataIndex: 'orderNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属团长手机号',
      dataIndex: 'teamLeaderMobile',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司名称',
      dataIndex: 'subCompanyName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司类型',
      dataIndex: 'teamLeaderTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签合同状态',
      dataIndex: 'contractStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '学习状态 ',
      dataIndex: 'learnStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '线下培训状态',
      dataIndex: 'trainStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option', 
      align: 'center',
      render: (_, r) => (
        <Space size='small'>
          <a onClick={()=> {setVisible(true); setType(1); setId(r.orderSn)}}>解冻给各角色</a>
          <a onClick={()=> {setVisible(true); setType(2); setId(r.orderSn)}}>解冻到平台</a>
        </Space>
      )
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        columns={columns}
        options={false}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom)=> [
            ...dom.reverse(),
            <Export 
              key='export'
              type='exportTrainServerUnfreezeDivideList'
              conditions={{...form.current?.getFieldsValue()}}
            />
          ]
        }}
        formRef={form}
        actionRef={actRef}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        params={{}}
        request={unfreezeDividePage}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          preserveSelectedRowKeys: true,
          onChange: e => setSelectedKeys(e)
        }}
      />
      {
        visible &&
        <Model
          visible={visible}
          setVisible={setVisible}
          type={type}
          id={id}
          callback={()=> actRef.current?.reload()}
        />
      }
    </PageContainer>
  )
}

export default UnfrozenList