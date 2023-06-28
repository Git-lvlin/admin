import { useState, useRef } from 'react'
import ProDescriptions from '@ant-design/pro-descriptions'

import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from 'antd'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import { statisticsUser, statisticsOrder } from '@/services/product-performance-management/early-order-service-statistics'
import Export from '@/components/export'
import styles from './styles.less'
import Detail from './detail'

const EarlyOrderServiceStatistics: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')

  const form = useRef<FormInstance>()

  const columns:ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center'
    },
    {
      title: '下单人手机号',
      dataIndex: 'buyerPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机号',
      dataIndex: 'phone',
      hideInTable: true
    },
    {
      title: '下单人用户ID',
      dataIndex: 'buyerId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人用户ID',
      dataIndex: 'memberId',
      hideInTable: true
    },
    {
      title: '订单数',
      dataIndex: 'countOrderId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '总服务数',
      dataIndex: 'countOrderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '待报名数',
      dataIndex: 'signUpPre',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '待采样数',
      dataIndex: 'signUp',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '检测中数',
      dataIndex: 'check',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '已完成数',
      dataIndex: 'done',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '退款中数',
      dataIndex: 'refund',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '已退款数',
      dataIndex: 'refunded',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <a onClick={()=> {setVisible(true); setId(r.buyerId)}}>查看</a>
      )
    },
  ]

  const proDescriptionsColumns:ProDescriptionsItemProps[] = [
    {
      title: '总下单用户数',
      dataIndex: 'countBuyerId'
    },
    {
      title: '总订单数',
      dataIndex: 'countOrderId'
    },
    {
      title: '总服务数',
      dataIndex: 'sumId'
    },
    {
      title: '待报名数',
      dataIndex: 'signUpPre'
    },
    {
      title: '待采样数',
      dataIndex: 'signUp'
    },
    {
      title: '总早筛用户数',
      dataIndex: 'countMemberId'
    },
    {
      title: '检测中数',
      dataIndex: 'check'
    },
    {
      title: '已完成数',
      dataIndex: 'done'
    },
    {
      title: '退款中数',
      dataIndex: 'refund'
    },
    {
      title: '已退款数',
      dataIndex: 'refunded'
    }
  ]

  return (
    <PageContainer className={styles.desc}>
      <ProDescriptions
        column={{xxl: 5, xl: 3}}
        columns={proDescriptionsColumns}
        request={statisticsOrder}
        bordered
        layout='vertical'
        style={{background: '#fff', padding: '20px'}}
      />
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        request={statisticsUser}
        options={false}
        formRef={form}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='aed-scr-user'
              conditions={form.current?.getFieldsValue()}
            />
          ]
        }}
      />
      {
        visible &&
        <Detail
          id={id}
          visible={visible}
          setVisible={setVisible}
        />
      }
    </PageContainer>
  )
}

export default EarlyOrderServiceStatistics