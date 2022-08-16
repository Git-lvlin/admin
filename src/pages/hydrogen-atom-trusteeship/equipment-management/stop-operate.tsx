import { useState, useRef } from "react"
import ProTable from '@ant-design/pro-table'
import { Space } from "antd"

import type { FC } from "react"
import type { ProColumns, ActionType } from "@ant-design/pro-table"

import { stopOperateList } from "@/services/hydrogen-atom-trusteeship/equipment-management"
import LaunchEquipment from "./launch-equipment"
import TerminateManaged from "./terminate-managed"

const StopOperate: FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<string>()
  const [data, setData] = useState()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '运营订单号',
      dataIndex: 'orderId',
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
      title: '原店铺编号',
      dataIndex: 'storeHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '激活时间',
      dataIndex: 'activationTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '激活时间',
      dataIndex: 'activationTime',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '停止运营时间',
      dataIndex: 'stopOperateTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '停止运营时间',
      dataIndex: 'stopOperateTime',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '停止操作人',
      dataIndex: 'name',
      align: 'center',
      render: (_, r)=> `${r.operateLog.name}`,
      hideInSearch: true
    },
    {
      title: '停止类型',
      dataIndex: 'type',
      align: 'center',
      render: (_, r)=> `${r.operateLog.type}`,
      hideInSearch: true
    },
    {
      title: '停止原因',
      dataIndex: 'reason',
      align: 'center',
      render: (_, r)=> `${r.operateLog.reason}`,
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Space size={10}>
          <a 
            onClick={()=>{
              setVisible(true)
              setOrderId(r?.orderId)
            }}
          >
            重新投放
          </a>
          <a 
            onClick={()=>{
              setShow(true)
              setData(r)
            }}
          >
            终止托管
          </a>
        </Space>
      )
    }
  ]
  return (
    <>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        request={stopOperateList}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        actionRef={actRef}
        options={false}
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
          type={3}
        />
      }
      {
        show&&
        <TerminateManaged
          visible={show}
          setVisible={setShow}
          callback={()=>actRef.current?.reload()}
          title='终止托管设备'
          type={2}
          data={data}
        />
      }
    </>
  )
}

export default StopOperate
