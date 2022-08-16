import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import type { ProColumns, ActionType } from "@ant-design/pro-table"
import type { FC } from "react"
import { StayPutProps } from "./data"

import LaunchEquipment from "./launch-equipment"
import Delivery from "./delivery"
import { waitPutList } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const StayPut: FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<string>()
  const [data, setData] = useState<StayPutProps>()
  const [type, setType] = useState<number>(0)

  const actRef = useRef<ActionType>()

  const columns: ProColumns<StayPutProps>[] = [
    {
      title: '订单号',
      dataIndex: 'hostingOrderId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机',
      dataIndex: 'hostingMemberPhone',
      align: 'center'
    },
    {
      title: '下单店区域',
      dataIndex: 'hostingArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺编号',
      dataIndex: 'hostingHouseNumber',
      align: 'center'
    },
    {
      title: '支付时间',
      dataIndex: 'hostingPayTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => moment(r?.hostingPayTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '支付时间',
      dataIndex: 'hostingPayTime',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '自动投放状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        1: '失败',
        2: '成功'
      },
      hideInTable: true
    },
    {
      title: '自动投放状态',
      dataIndex: 'status',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '自动投放失败原因',
      dataIndex: 'reason',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '被投放店主手机号',
      dataIndex: 'storePhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '被投放店铺编号',
      dataIndex: 'hostingHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '被投放店铺区域',
      dataIndex: 'storeArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r)=> {
        if(r.status === "失败") {
          return (
            <a onClick={()=> {
                setVisible(true)
                setOrderId(r.orderId)
                setType(1)
              }}
            >
              手工投放
            </a>
          )
        } else {
          return (
            <>
              <div>
                <a onClick={()=> {
                    setShow(true)
                    setData(r)
                  }}
                >
                  确认投放
                </a>
              </div>
              <div>
                <a onClick={()=> {
                    setVisible(true)
                    setOrderId(r.orderId)
                    setType(2)
                  }}
                >
                  重新投放
                </a>
              </div>
            </>
          )
        }
      }
    }
  ]

  return (
    <>
      <ProTable<StayPutProps>
        rowKey='hostingOrderId'
        columns={columns}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        request={waitPutList}
        options={false}
        actionRef={actRef}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
      />
      {
        visible&&
        <LaunchEquipment
          visible={visible}
          setVisible={setVisible}
          callback={() => actRef.current?.reload()}
          orderId={orderId}
          type={type}
        />
      }
      {
        show&&
        <Delivery
          visible={show}
          setVisible={setShow}
          callback={() => actRef.current?.reload()}
          data={data}
        />
      }
    </>
  )
}

export default StayPut
