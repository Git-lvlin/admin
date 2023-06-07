import TimeSelect from '@/components/time-select'
import { useRef, useState } from 'react'
import ProTable from '@/components/pro-table'
import moment from "moment"
import { Space } from "antd"

import type { ProColumns } from "@ant-design/pro-table"
import type { FC } from 'react'
import type { FormInstance } from "antd"

import { stopHostingList } from "@/services/hydrogen-atom-trusteeship/equipment-management"
import Export from "@/components/export"
import DevicesDetail from "../components/devices-detail"
import Divide from "./divide"

const StopHosting: FC = () => {
  const [divideVisible, setDivideVisible] = useState<boolean>(false)
  const [devicesDetailVisible, setDevicesDetailVisible] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<string>()
  const [imei, setImei] = useState<string>()
  const [type, setType] = useState<number>(0)
  const [user, setUser] = useState<string>()
  const [data, setData] = useState()

  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '托管购买订单号',
      dataIndex: 'hostingOrderId',
      align: 'center'
    },
    {
      title: '设备ID',
      dataIndex: 'imei',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '投资人手机号',
      dataIndex: 'hostingMemberPhone',
      align: 'center'
    },
    {
      title: '投资人店铺编号',
      dataIndex: 'hostingHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '托管购买下单支付时间',
      dataIndex: 'hostingPayTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '托管购买下单支付时间',
      dataIndex: 'hostingPayTime',
      renderFormItem: () => <TimeSelect showTime={false}/>,
      hideInTable: true
    },
    {
      title: '终止托管时间',
      dataIndex: 'stopHostingTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '终止托管时间',
      dataIndex: 'stopHostingTime',
      renderFormItem: () => <TimeSelect showTime={false}/>,
      hideInTable: true
    },
    {
      title: '终止操作人',
      dataIndex: 'name',
      align: 'center',
      render: (_, r)=> `${r.operateLog.name}`,
      hideInSearch: true
    },
    {
      title: '请求终止方',
      dataIndex: 'type',
      align: 'center',
      render: (_, r)=> `${r.operateLog.type}`,
      hideInSearch: true
    },
    {
      title: '终止原因',
      dataIndex: 'reason',
      align: 'center',
      render: (_, r)=> `${r.operateLog.reason}`,
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      width: '220px',
      align: 'center',
      render: (_, r) => (
        <Space size={10} style={{width: 220, flexWrap: 'wrap'}}>
          <a 
            onClick={()=>{
              setDivideVisible(true)
              setData(r)
            }}
          >
            分成明细
          </a>
          <a 
            onClick={()=>{
              setDevicesDetailVisible(true)
              setType(11)
              setOrderId(r.orderId)
              setImei(r.imei)
              setUser(r.storePhone)
            }}
          >
            缴租明细
          </a>
          <a 
            onClick={()=>{
              setDevicesDetailVisible(true)
              setOrderId(r.orderId)
              setImei(r.imei)
              setType(10)
            }}
          >
            操作日志
          </a>
        </Space>
      )
    }
  ]

  const getFieldsValue = () => {
    const {hostingPayTime, stopHostingTime, ...rest} = form.current?.getFieldsValue()
    return {
      stopHostingStartTime: stopHostingTime && moment(stopHostingTime?.[0]).unix(),
      stopHostingEndTime: stopHostingTime && moment(stopHostingTime?.[1]).unix(),
      hostingPayStartTime: hostingPayTime && moment(hostingPayTime?.[0]).unix(),
      hostingPayEndTime: hostingPayTime && moment(hostingPayTime?.[1]).unix(),
      ...rest
    }
  }

  return (
    <>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        request={stopHostingList}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          labelWidth: 150,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export 
              type='healthyDeviceStopHosting' 
              conditions={getFieldsValue}
              key='export'
            />
          ]
        }}
      />
      {
        devicesDetailVisible &&
        <DevicesDetail
          visible={devicesDetailVisible}
          setVisible={setDevicesDetailVisible}
          type={type}
          storeNo={orderId}
          showTitle
          imei={imei}
          user={user}
        />
      }
      {
        divideVisible &&
        <Divide
          visible={divideVisible}
          setVisible={setDivideVisible}
          data={data}
        />
      }
    </>
  )
}

export default StopHosting
