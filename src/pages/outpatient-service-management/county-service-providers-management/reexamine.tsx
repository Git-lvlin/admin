import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import AddressCascader from '@/components/address-cascader'
import { providerAuditSecond } from '@/services/outpatient-service-management/county-service-providers-management'
import Export from '@/components/export'
import Detail from './detail'
import ReexamineModal from './reexamine-modal'

const Reexamine:React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [moadlvisible, setMoadlvisible] = useState(false)
  const [id, setId] = useState<string>()
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const getFieldsValue = () => {
    const { serviceArea, signTime, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      signStartTime: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: serviceArea && serviceArea?.[0].value,
      cityId: serviceArea && serviceArea?.[1].value,
      areaId: serviceArea && serviceArea?.[2].value,
    }
  }

  const columns: ProColumns[] = [
    {
      title: '服务商编号',
      dataIndex: 'houseNumber',
      align: 'center'
    },
    {
      title: '下单手机号码',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人姓名',
      dataIndex: 'consignee',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人手机号',
      dataIndex: 'consigneePhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务区域',
      dataIndex: 'serviceArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务区域',
      dataIndex: 'serviceArea',
      renderFormItem: () => <AddressCascader changeOnSelect/>,
      hideInTable: true
    },
    {
      title: '尾款凭证张数(张)',
      dataIndex: 'voucherNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=> {setVisible(true); setId(r.subOrderSn)}}>{_}</a>
    },
    {
      title: '已交金额(元)',
      dataIndex: 'offlineAmountDesc',
      align: 'center', 
      hideInSearch: true
    },
    {
      title: '交合同费(元)',
      dataIndex: 'contractFeeDesc',
      align: 'center', 
      hideInSearch: true
    },
    {
      title: '交定金金额(元)',
      dataIndex: 'payAmountDesc',
      align: 'center', 
      hideInSearch: true
    },
    {
      title: '合同签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签约时间',
      dataIndex: 'signTime',
      renderFormItem: ()=> <TimeSelect />,
      hideInTable: true
    },
    {
      title: '合同ID',
      dataIndex: 'contractId',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.contractUrl) {
          return <a href={r.contractUrl} target='_blank' referrerPolicy='no-referrer'>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '合同状态',
      dataIndex: 'contractStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签约订单号',
      dataIndex: 'contractOrderSn',
      align: 'center',
    },
    {
      title: '推荐人手机号',
      dataIndex: 'directUserPhone',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => <a onClick={()=> {setMoadlvisible(true); setId(r)}}>复审</a>
    }
  ]

  return (
    <>
      <ProTable
        columns={columns}
        options={false}
        params={{}}
        formRef={form}
        actionRef={actRef}
        request={providerAuditSecond}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='providerAuditSecond'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible &&
        <Detail 
          visible={visible}
          setVisible={setVisible}
          id={id}
        />
      }
      {
        moadlvisible &&
        <ReexamineModal
          visible={moadlvisible}
          setVisible={setMoadlvisible}
          callback={()=> actRef.current?.reload()}
          meta={id}
        />
      }
    </>
  )
}

export default Reexamine