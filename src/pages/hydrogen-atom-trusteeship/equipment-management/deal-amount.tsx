import { useState, useEffect } from "react"
import ProTable from '@ant-design/pro-table'
import { Empty, Select, Spin } from "antd"

import type { ProColumns } from '@ant-design/pro-table'
import type { FC } from "react"
import type { DealAmountProps, listDataProps } from "./data"

import { tranAndService, manageAndStartUp, getHistoryDeviceShop } from '@/services/hydrogen-atom-trusteeship/equipment-management'
import { amountTransform } from '@/utils/utils'

const { Option } = Select

const DealAmount: FC<DealAmountProps> = ({data, type}) => {
  const [ listData, setListData ] = useState<listDataProps[]>([])
  const [ eventAnalys, setEventAnalys ] = useState<string>()
  const [ paramData, setParamData ] = useState<listDataProps>()
  const [ params, setParams ] = useState({})
  const [ flag, setFlag ] = useState<boolean>(false)
  const [ paramsSource, setParamsSource ] = useState({})

  useEffect(()=> {
    setFlag(true)
    getHistoryDeviceShop({
      imei: data?.imei
    }).then(res => {
      setListData(res.data)
    }).finally(()=> {
      setFlag(flag)
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
        1: { orderId: data?.orderId, type: 'hostingOrder' },
        2: { orderId: data?.orderId, type: 'serviceFee' },
        3: { ...res, type: 'managementFee' },
        4: { ...res, type: 'startUp' }
      })
    }
  }, [paramData])

  useEffect(()=> {
    if(params[type]) {
      setParamsSource(params[type])
    }
  }, [type, params])

  const options = listData.map(d => <Option key={d.orderId} value={d.orderId}>{d.storeName}{d.storePhone}（{d.activationTime}-{d.stopOperateTime}）</Option>)
  
  const api = {
    1: tranAndService,
    2: tranAndService,
    3: manageAndStartUp,
    4: manageAndStartUp
  }

  const title = {
    1: `投资人手机号：${data?.hostingMemberPhone}`,
    2: `运营商手机号：${data?.storePhone}`,
    3: `运营商手机号：${data?.storePhone}`,
    4: (
      <>
        <div>运营商手机号：{data?.storePhone}</div>
        <div>启动费累计金额：{data?.storePhone}</div>
      </>
    ),
  }

  const optionsRender = {
    1: <span>托管购买订单金额：{amountTransform(data?.hostingPayAmount, '/')}元</span>,
    2: <span>缴纳托管资质培训服务费：{amountTransform(data?.hostingPayAmount, '/')}元</span>,
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
    <Spin spinning={flag}>
      {
        Object.keys(params).length !== 0 ?
        <ProTable
          rowKey='id'
          columns={columns}
          headerTitle={title[type]}
          params={paramsSource}
          request={api[type]}
          scroll={{y: 500}}
          search={false}
          options={false}
          pagination={false}
          toolBarRender={() => optionsRender[type]}
        />:
        <Empty/>
      }
    </Spin>
  )
}

export default DealAmount