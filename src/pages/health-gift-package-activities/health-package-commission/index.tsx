import { useRef, useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { DatePicker } from 'antd'

import type {ProColumns} from '@ant-design/pro-table'
import type { FC } from 'react'
import type { FormInstance } from 'antd'
import moment from 'moment'

import PageContainer from '@/components/PageContainer'
import { queryPage } from '@/services/health-gift-package-activities/health-package-commission'
import Export from '@/components/export'
import Detail from './detail'

const HealthPackageCommission: FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [memberId, setMemberId] = useState<string>()
  const [name, setName] = useState<string>()
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const {tradeMonth, ...rest} = form.current?.getFieldsValue()
    return {
      tradeMonth: tradeMonth && moment(tradeMonth).format('YYYY-MM'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '交易月度查询',
      dataIndex: 'tradeMonth',
      hideInTable: true,
      renderFormItem: () =>  <DatePicker picker="month"/>
    },
    {
      title: '手机号',
      dataIndex: 'phoneNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '用户手机',
      dataIndex: 'phoneNumber',
      hideInTable: true
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      order: -1,
    },
    {
      title: '店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐礼包订单总额',
      dataIndex: 'totalAmountDesc',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=> { setVisible(true); setMemberId(r.memberId); setName(r.phoneNumber) }}>{_}</a>
    },
    {
      title: '推荐礼包订单总提成',
      dataIndex: 'totalCommissionDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '直推用户数',
      dataIndex: 'directCount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '直推礼包总单金额',
      dataIndex: 'directTotalAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '直推礼包总提成金额',
      dataIndex: 'directTotalCommissionDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '间推用户数',
      dataIndex: 'indirectCount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '间推礼包总单金额',
      dataIndex: 'indirectTotalAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '间推礼包总提成金额',
      dataIndex: 'indirectTotalCommissionDesc',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey='memberId'
        columns={columns}
        params={{}}
        request={queryPage}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        scroll={{x:'max-content'}}
        options={false}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
              type='exportHealthyGiftCommissionList'
              key='export'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible &&
        <Detail
          id={memberId}
          visible={visible}
          setVisible={setVisible}
          title={name}
        />
      }
    </PageContainer>
  )
}

export default HealthPackageCommission
