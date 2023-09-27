import { useState, useRef, useEffect } from 'react'
import type { FC } from "react"
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { ipoAwardProviderDirectMember, ipoAwardProviderDirectMemberSt, ipoAwardStoreDirectMember, ipoAwardStoreDirectMemberSt } from '@/services/product-performance-management/health-ipo-bonus-receiving-statistics'
import Export from '@/components/export'
import ProDescriptions from '@ant-design/pro-descriptions'
import { amountTransform } from '@/utils/utils'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import RangeNumberInput from '@/components/range-number-input'
import StatisticalDetail from './statistical-detail'

const CountyShopIpoStatistics= (props:{ activeKey:string }) => {
  const { activeKey } = props
  const [visible, setVisible] = useState(false)
  const form = useRef<FormInstance>()
  const [searchConfig, setSearchConfig] = useState<FormInstance>()
  const [msgDetail, setMsgDetail] = useState<string>()

  const getFieldsValue = () => {
    const { amount, months, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      months: months&&moment(months).format('YYYY-MM'),
      min: amount && amountTransform(amount?.min,'*'),
      max: amount && amountTransform(amount?.max,'*'),
    }
  }

  const Aggregate: FC<{form?: FormInstance}> = ({form}) => {
  const [data, setData] = useState()
  
  const getData = async () => {
    const api=activeKey=='1'?ipoAwardProviderDirectMemberSt:ipoAwardStoreDirectMemberSt
    await api({
      ...form,
      months: form?.months&&moment(form?.months).format('YYYY-MM')
    }).then(res => {
      setData(res.data?.[0])
    })
  }
  
  useEffect(()=> {
    getData()
  }, [form])

  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总领取人数',
      dataIndex: 'userNums',
      render: (_) => _
    },
    {
      title: activeKey=='1'?'总累计领取次数':'总累计领取月数',
      dataIndex: 'awardNums',
      render: _ => _
    },
    {
      title: '总领取IPO奖金(元)',
      dataIndex: 'amount',
      render: _ => `${amountTransform(_, '/').toFixed(2)}`
    },
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={{ xl: 3, xxl: 5 }}
      bordered
      dataSource={data}
    />
  )
}

  const columns: ProColumns[] = [
    {
      title: '排名',
      dataIndex: 'rank',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '销售人用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '销售人手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '领取人手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInTable: true
    },
    {
      title: '领取人用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInTable: true
    },
    {
      title: '所属月份',
      dataIndex: 'months',
      align: 'center',
      hideInTable: true,
      hideInSearch: activeKey=='1',
      valueType: 'dateMonth'
    },
    {
      title: '累计IPO奖金额',
      dataIndex: 'amount',
      align: 'center',
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
      hideInTable: true
    },
    {
      title: '领取次数',
      dataIndex: 'awardNums',
      align: 'center',
      hideInSearch: true,
      hideInTable: activeKey=='2'
    },
    {
      title: '领取月数(个月)',
      dataIndex: 'awardNums',
      align: 'center',
      hideInSearch: true,
      hideInTable: activeKey=='1'
    },
    {
      title: '累计IPO奖金额(元)',
      dataIndex: 'amountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '明细',
      align: 'center',
      hideInSearch: true,
      render: (_,data) => {
        return <a onClick={()=>{ setVisible(true); setMsgDetail(data) }}>查看明细</a>
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
        request={activeKey=='1'?ipoAwardProviderDirectMember:ipoAwardStoreDirectMember}
        tableExtraRender={()=><Aggregate form={searchConfig}/>}
        onSubmit={()=>{
          setSearchConfig(form.current?.getFieldsValue())
        }}
        onReset={()=> {
          setSearchConfig(undefined)
        }}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type={activeKey=='1'?'ipoAwardProviderDirectMember':'ipoAwardStoreDirectMember'}
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {visible&&<StatisticalDetail
        visible={visible}
        setVisible={setVisible}
        callback={()=>{  }}
        msgDetail={msgDetail}
        activeKey={activeKey}
      />}
    </>
  )
}

export default CountyShopIpoStatistics