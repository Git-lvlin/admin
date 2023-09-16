import { useState, useRef, useEffect } from 'react'
import type { FC } from "react"
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { providerList } from '@/services/outpatient-service-management/county-service-providers-management'
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
  const [msgId, setMsgId] = useState<string>()

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

  const Aggregate: FC<{form?: FormInstance}> = ({form}) => {
  const [data, setData] = useState()
  
  const getData = async () => {
    // await aedCoursesSum({
    //   ...form
    // }).then(res => {
    //   setData(res.data)
    // })
  }
  
  useEffect(()=> {
    getData()
  }, [form])

  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总领取人数',
      dataIndex: 'totalAmount',
      render: (_) => _
    },
    {
      title: activeKey=='1'?'总累计领取次数':'总累计领取月数',
      dataIndex: activeKey=='1'?'totalUsers':'',
      render: _ => _
    },
    {
      title: '总领取IPO奖金(元)',
      dataIndex: 'totalOrder',
      render: _ => `${amountTransform(_, '/').toFixed(2)}`
    },
  ]

  return (
    <ProDescriptions
      columns={columns}
      labelStyle={{width: '10%'}}
      column={{ xl: 3, xxl: 5 }}
      bordered
      dataSource={data}
    />
  )
}

  const columns: ProColumns[] = [
    {
      title: '排名',
      dataIndex: 'sort',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '销售人用户ID',
      dataIndex: 'userId',
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
      dataIndex: 'userId',
      align: 'center',
      hideInTable: true
    },
    {
      title: '所属月份',
      dataIndex: 'month',
      align: 'center',
      hideInTable: true,
      hideInSearch: activeKey=='1',
      valueType: 'dateTime'
    },
    {
      title: '累计IPO奖金额',
      dataIndex: 'memberId',
      align: 'center',
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
      hideInTable: true
    },
    {
      title: '领取次数',
      dataIndex: 'claimsNumber',
      align: 'center',
      hideInSearch: true,
      hideInTable: activeKey=='2'
    },
    {
      title: '领取月数(个月)',
      dataIndex: 'claimsNumber',
      align: 'center',
      hideInSearch: true,
      hideInTable: activeKey=='1'
    },
    {
      title: '累计IPO奖金额(元)',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '明细',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true,
      render: (_,data) => {
        return <a onClick={()=>{ setVisible(true); setMsgId(data.id) }}>查看明细</a>
      }
    }
  ]

  return (
    <>
      <ProTable
        headerTitle={<Aggregate form={searchConfig}/>}
        columns={columns}
        options={false}
        params={{}}
        formRef={form}
        request={providerList}
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
              type='providerList'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {visible&&<StatisticalDetail
        visible={visible}
        setVisible={setVisible}
        callback={()=>{  }}
        msgId={msgId}
        activeKey={activeKey}
      />}
    </>
  )
}

export default CountyShopIpoStatistics