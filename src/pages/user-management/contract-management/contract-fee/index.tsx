import { useState, useEffect, useRef } from 'react'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import Export from '@/components/export'
import { orderContractPage, dictSub } from "@/services/setting/contract-management"
import styles from '../styles.less'
import Detail from '../../user-list/detail'

const ContractFee:React.FC = () => {
  const [type, setType] = useState<any[]>([])
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState('')
  const form = useRef<FormInstance>()

  useEffect(()=> {
    dictSub({ type: 'commonContractConfig' }).then(res => {
      if(res.code === 0) {
        setType(res.data)
      }
    })
  }, [])

  const getFieldsValue = () => {
    const { signTime, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      contractType: 'commonContractConfig',
      signTimeStart: signTime && moment(signTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      signTimeEnd: signTime && moment(signTime[1]).format('YYYY-MM-DD HH:mm:ss'),
    }
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同业务',
      dataIndex: 'businessTypeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同业务',
      dataIndex: 'businessType',
      valueType: 'select',
      fieldProps: {
        options: type
      },
      hideInTable: true
    },
    {
      title: '合同编号',
      dataIndex: 'contractNo',
      align: 'center'
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机号',
      dataIndex: 'phoneNumber',
      align: 'center',
      render: (_, r) => {
        if(r.phoneNumber) {
          return <a onClick={()=> {setVisible(true); setId(r.buyerId)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '下单用户ID',
      dataIndex: 'buyerId',
      align: 'center',
      render: (_, r) => {
        if(r.buyerId) {
          return <a onClick={()=> {setVisible(true); setId(r.buyerId)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订时间',
      dataIndex: 'signTime',
      hideInTable: true,
      renderFormItem: () => <TimeSelect />
    },
    {
      title: '签订状态',
      dataIndex: 'contractStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订人姓名',
      dataIndex: 'personName',
      align: 'center'
    },
    {
      title: '签订人身份证号',
      dataIndex: 'idCard',
      align: 'center'
    },
    {
      title: '法大大合同ID',
      dataIndex: 'contractId',
      align: 'center',
      render: (_, r)=> {
        if(r.contractUrl) {
          return <a href={r.contractUrl} target='_blank' rel='noopener'>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    }
  ]

  return (
    <>
      <ProTable
        columns={columns}
        params={{contractType: 'commonContractConfig'}}
        formRef={form}
        request={orderContractPage}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='orderContractPageCommon'
              conditions={getFieldsValue}
            />
          ]
        }}
        options={false}
        className={styles.desc}
      />
      {
        visible &&
        <Detail
          visible={visible}
          setVisible={setVisible}
          id={id}
        />
      }
    </>
  )
}

export default ContractFee