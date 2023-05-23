import { useState, useEffect } from "react"
import ProTable from '@/components/pro-table'
import { Empty, Select, Space } from "antd"

import type { ProColumns } from '@ant-design/pro-table'
import type { FC } from "react"
import type { DealAmountProps, listDataProps } from "./data"

import { manageAndStartUp, getHistoryDeviceShop } from '@/services/hydrogen-atom-trusteeship/equipment-management'
import { amountTransform } from '@/utils/utils'

const { Option } = Select

const DealAmounts: FC<DealAmountProps> = ({data, type}) => {
  const [ listData, setListData ] = useState<listDataProps[]>([])
  const [ eventAnalys, setEventAnalys ] = useState<string>()
  const [ paramData, setParamData ] = useState<listDataProps>()
  const [ params, setParams ] = useState({})
  const [ paramsSource, setParamsSource ] = useState({})
  const [ amount, setAmount ] = useState<string>()

  useEffect(()=> {
    getHistoryDeviceShop({
      imei: data?.imei
    }).then(res => {
      setListData(res.data)
    })
  }, [data])

  useEffect(()=> { 
    setEventAnalys(listData?.[0]?.orderId)
  }, [listData])

  useEffect(()=> {
    const res = listData.filter(item => item.orderId === eventAnalys)
    res.forEach(item => {
      setParamData({
        orderId: item.orderId,
        agentDeviceId: item.agentDeviceId,
        hostingOrderSn: item.hostingOrderSn,
        qualificationId: item.qualificationId
      })
    })
  }, [eventAnalys])

  useEffect(()=> {  
    if(paramData) {
      const res = JSON.parse(JSON.stringify(paramData))   
      setParams({
        3: paramData && { ...res, type: 'managementFee' },
        4: paramData && { ...res, type: 'startUp' }
      })
    }
  }, [paramData])

  useEffect(()=> {
    if(params[type]) {
      setParamsSource(params[type])
    }
  }, [type, params])

  const options = listData.map(d => {
    const res = `${d.storeName}${d.storePhone}（${d.activationTime}-${d.stopOperateTime}）`
    return (
      <Option key={d.orderId} value={d.orderId}>{res}</Option>
    )
  })

  const title = {
    3: `运营商手机号：${data?.storePhone}`,
    4: (
      <Space direction='vertical' size={5}>
        <div>运营商手机号：{data?.storePhone}</div>
        <div>启动费累计金额：{amountTransform(amount, '/')}</div>
      </Space>
    ),
  }

  const optionsRender = {
    3: (
      <Select
        style={{width: 300}}
        value={eventAnalys}
        onChange={(v)=> {
          setEventAnalys(v)
        }}
      >
        { options }
      </Select>
    ),
    4: (
      <Select
        style={{width: 300}}
        value={eventAnalys}
        onChange={(v)=> {
          setEventAnalys(v)
        }}
      >
        { options }
      </Select>
    ),
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '提成对象',
      dataIndex: 'commissionUser',
      align: 'center'
    },
    {
      title: '提成账号',
      dataIndex: 'commissionAccount',
      align: 'center'
    },
    {
      title: '累计分成金额(元)',
      dataIndex: 'amount',
      align: 'center',
      render: (_) => amountTransform(_, '/')
    }
  ]

  return (
    <>
      {
        Object.keys(params).length !== 0 ?
        <ProTable
          rowKey='id'
          columns={columns}
          headerTitle={title[type]}
          params={paramsSource}
          request={manageAndStartUp}
          scroll={{y: 500}}
          search={false}
          options={false}
          pagination={false}
          postData={(v: any) => {
            setAmount(v.amount)
            return v.list
          }}
          toolBarRender={() => optionsRender[type]}
        />:
        <Empty/>
      }
    </>
  )
}

export default DealAmounts