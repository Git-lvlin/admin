import { useState, useRef } from 'react'
import moment from 'moment'
import { Space } from 'antd'

import type { ActionType, ProColumns } from '@ant-design/pro-table'
import { FormInstance, Tooltip } from 'antd'

import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import AddressCascader from '@/components/address-cascader'
import { providerOrder } from '@/services/outpatient-service-management/county-service-providers-management'
import Export from '@/components/export'
import PaymentVoucher from './payment-voucher'
import TerminationRecruitment from './termination-recruitment'

const CountyServiceProvidersOrder:React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [recruitmentVisible, setRecruitmentVisible] = useState(false)
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
      areaId: serviceArea && serviceArea?.[2].value
    }
  }

  const columns: ProColumns[] = [
    {
      title: '签约时间',
      dataIndex: 'signTime',
      renderFormItem: ()=> <TimeSelect />,
      hideInTable: true
    },
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
      title: '下单用户ID',
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
      title: '交合同费(元)',  
      dataIndex: 'payAmountDesc',
      align: 'center', 
      hideInSearch: true
    },
    {
      title: '交定金金额(元)',
      dataIndex: 'offlineAmountDesc',
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
      title: '招募状态',
      dataIndex: 'statusDesc',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.reason) {
          return <Tooltip title={`拒绝原因：${r.reason}`} >{_}</Tooltip>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '招募状态',
      dataIndex: 'allStatus',
      valueType: 'select',
      valueEnum: {
        1: '待签合同',
        2: '待交定金',
        3: '待上传付尾款凭证',
        4: '审核拒绝',
        5: '终止招募',
        6: '已失效'
      },
      hideInTable: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => {
        if(r.status === 0 || r.status === 4) {
          return (
            <Space>
              <a onClick={()=> {setVisible(true); setId(r.subOrderSn)}}>上传尾款凭证</a>
              {
                r.thpId > 0 &&
                <a 
                  onClick={()=> {
                    setRecruitmentVisible(true)
                    setId(r)
                  }}
                >
                  终止招募
                </a>
              }
            </Space>
          )
        } else {
          return
        }
      }
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
        request={providerOrder}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='providerOrder'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible &&
        <PaymentVoucher 
          visible={visible}
          setVisible={setVisible}
          id={id}
          callback={()=> {actRef.current?.reload()}}
        />
      }
      {
        recruitmentVisible &&
        <TerminationRecruitment
          visible={recruitmentVisible}
          setVisible={setRecruitmentVisible}
          meta={id}
          callback={()=> {actRef.current?.reload()}}
        />
      }
    </>
  )
}

export default CountyServiceProvidersOrder