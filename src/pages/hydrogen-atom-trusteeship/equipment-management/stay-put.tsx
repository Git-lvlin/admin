import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import type { ProColumns, ActionType } from "@ant-design/pro-table"

import LaunchEquipment from "./launch-equipment"
import { waitPutList } from "@/services/hydrogen-atom-trusteeship/equipment-management"

const StayPut = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [title, setTitle] = useState<string>()

  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
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
      hideInSearch: true
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
      render: ()=> (
        <>
          <a onClick={()=> {setVisible(true); setTitle('指定社区店收货')}}>手工投放</a>
        </>
      )
    }
  ]

  return (
    <>
      <ProTable
        rowKey='hostingOrderId'
        columns={columns}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        // request={waitPutList}
        options={false}
        actionRef={actRef}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
        dataSource={[{hostingOrderId: 1}]}
      />
      {
        visible&&
        <LaunchEquipment
          visible={visible}
          setVisible={setVisible}
          title={title}
          callback={actRef.current?.reload()}
        />
      }
    </>
  )
}

export default StayPut
