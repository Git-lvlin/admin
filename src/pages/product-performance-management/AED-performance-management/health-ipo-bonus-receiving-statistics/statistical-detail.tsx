import { useEffect, useRef, useState } from 'react'
import ProForm, { 
  DrawerForm,
} from "@ant-design/pro-form"

import type { FC } from 'react'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { ipoAwardProviderDirectMemberDetail, ipoAwardStoreDirectMemberDetail } from '@/services/product-performance-management/health-ipo-bonus-receiving-statistics'
import RangeNumberInput from '@/components/range-number-input'
import type { ProColumns } from '@ant-design/pro-table'
import Export from '@/components/export'
import { amountTransform } from "@/utils/utils";

type editProps = {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    msgDetail?: string;
    callback: () => void,
    activeKey: string;
  }

const Edit: FC<editProps> = ({visible, setVisible, msgDetail, callback, activeKey}) => {
  const [imgVisible, setImgVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { amount, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      min: amount && amountTransform(amount?.min,'*'),
      max: amount && amountTransform(amount?.max,'*'),
    }
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '领取时间',
      dataIndex: 'receiveTime',
      align: 'center',
      hideInSearch: true,
      hideInTable: activeKey=='2'
    },
    {
      title: '所属月份',
      dataIndex: 'months',
      align: 'center',
      hideInTable: true,
      hideInSearch: activeKey=='1',
      valueType: 'dateTime'
    },
    {
      title: '所属月份',
      dataIndex: 'months',
      align: 'center',
      hideInSearch: true,
      hideInTable: activeKey=='1',
    },
    {
      title: 'IPO奖金额(元)',
      dataIndex: 'amountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖金额',
      dataIndex: 'amount',
      align: 'center',
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
      hideInTable: true
    },
  ]

  return (
    <DrawerForm
      title='首页/产品业绩管理/AED业绩管理/大健康IPO额外奖领取统计/大健康IPO额外奖领取统计明细'
      visible={visible}
      onVisibleChange={setVisible}
      layout='horizontal'
      width={1000}
      labelCol={{span: 6}}
      formRef={form}
      submitter={{
        render: (props, defaultDoms) => {
            return [];
        },
        }}
    >
    <ProTable
      rowKey='id'
      headerTitle={`领取人用户ID：${msgDetail?.memberId}    领取人手机号码：${msgDetail?.memberPhone}    领取IPO奖明细`}
      columns={columns}
      options={false}
      params={{
        memberId: msgDetail?.memberId
      }}
      formRef={form}
      request={activeKey=='1'?ipoAwardProviderDirectMemberDetail:ipoAwardStoreDirectMemberDetail}
      search={{
      //   labelWidth: 120,
        optionRender: (search, props, dom) => [
          ...dom.reverse(),
          <Export
            key='1'
            type='providerList'
            conditions={getFieldsValue}
          />
        ]
      }}
    />
    </DrawerForm>
  )
}

export default Edit
