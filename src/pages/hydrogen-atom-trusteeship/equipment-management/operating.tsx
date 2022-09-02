import { useState, useRef } from "react"
import ProTable from '@ant-design/pro-table'
import { Dropdown, Button, Menu, Tooltip, Space } from "antd"
import { EllipsisOutlined, ExclamationCircleOutlined } from "@ant-design/icons"

import type { FC } from "react"
import type { FormInstance } from "antd"
import type { ProColumns, ActionType } from "@ant-design/pro-table"
import { OperatingProps } from "./data"

import { ingOperateList } from "@/services/hydrogen-atom-trusteeship/equipment-management"
import BlockUp from "./block-up"
import DevicesDetail from "../components/devices-detail"
import Modification from "./modification"
import OptionImei from "./option-imei"
import StopOperation from "./stop-operation"
import TerminateManaged from "./terminate-managed"
import Export from "@/components/export"
import CaptureExpendsEntrance from "./capture-expends-entrance"
import Divide from "./divide"

const Operating: FC = () => {
  const [blockUpVisible, setBlockUpVisible] = useState<boolean>(false)
  const [devicesDetailVisible, setDevicesDetailVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [orderId, setOrderId] = useState<string>()
  const [imei, setImei] = useState<string>()
  const [useTime, setUseTime] = useState<string>()
  const [modificationVisible, setModificationVisible] = useState<boolean>(false)
  const [changeImei, setChangeImei] = useState<boolean>(false)
  const [data, setData] = useState<OperatingProps>()
  const [stopOperationVisivle, setStopOperationVisivle] = useState<boolean>(false)
  const [terminateManagedVisible, setTerminateManagedVisible] = useState<boolean>(false)
  const [user, setUser] = useState<string>()
  const [captureExpendsEntranceVisible, setCaptureExpendsEntranceVisible] = useState<boolean>(false)
  const [divideVisible, setDivideVisible] = useState<boolean>(false)

  const actRef = useRef<ActionType>()
  const form = useRef<FormInstance>()

  const menu = (e: OperatingProps) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={()=>{ 
            setDivideVisible(true)
            setData(e)
          }}
        >
          分成
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={()=>{
            setDevicesDetailVisible(true)
            setOrderId(e.orderId)
            setImei(e.imei)
            setType(10)
          }}
        >
          操作日志
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={()=> {
            setChangeImei(true)
            setData(e)
          }}
        >
          修改ID
        </Menu.Item>
        <Menu.Item
          key="4"
          onClick={()=> {
            setModificationVisible(true)
            setOrderId(e.orderId)
            setUseTime(e.useTime)
          }}
        >
          修改使用时长
        </Menu.Item>
        <Menu.Item
          key="5"
          onClick={()=> {
            setStopOperationVisivle(true)
            setData(e)
          }}
          disabled={(e?.examType === 3)}
        >
          <Space size={5}>
            停止运营
            {
              (e?.stopOperateType === 'operate' && e.examType === 3) &&
              <Tooltip title={e.examReason}>
                <ExclamationCircleOutlined />
              </Tooltip>
            }
          </Space>
        </Menu.Item>
        <Menu.Item
          key="6"
          onClick={()=> {
            setTerminateManagedVisible(true)
            setData(e)
          }}
          disabled={e?.examType === 3}
        >
          <Space size={5}>
            终止托管
            {
              (e?.stopOperateType === 'operateHosting' && e.examType === 3) &&
              <Tooltip title={e.examReason}>
                <ExclamationCircleOutlined />
              </Tooltip>
            }
          </Space>
        </Menu.Item>
        <Menu.Item
          key="7"
          onClick={()=> {
            setDevicesDetailVisible(true)
            setType(11)
            setOrderId(e.orderId)
            setImei(e.imei)
            setUser(e.storePhone)
          }}
        >
          缴租明细
        </Menu.Item>
        {
          (e.isShowLeaseBtn === 1 && !e.leaseTimeTip)&&
          <Menu.Item
            key="8"
            onClick={()=> {
              setCaptureExpendsEntranceVisible(true)
              setData(e)
            }}
          >
            开启缴费入口
          </Menu.Item>
        }
        {
          e.leaseTimeTip &&
          <Menu.Item key="9">
            {e.leaseTimeTip}
          </Menu.Item>
        }
      </Menu>
    )
  }

  const columns: ProColumns<OperatingProps>[] = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      hideInTable: true
    },
    {
      title: '机器ID',
      dataIndex: 'imei',
      align: 'center'
    },
    {
      title: '运营商手机',
      dataIndex: 'storePhone',
      align: 'center'
    },
    {
      title: '投资人手机',
      dataIndex: 'hostingMemberPhone',
      align: 'center'
    },
    {
      title: '运营商店铺编号',
      dataIndex: 'storeHouseNumber',
      align: 'center'
    },
    {
      title: '租期状态',
      dataIndex: 'leaseStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1:'免租期',
        2:'租期中',
        3:'已逾期'
      }
    },
    {
      title: '缴租时间',
      dataIndex: 'deadlineDay',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => (
        <div dangerouslySetInnerHTML={{__html: r.deadlineDay}}/>
      )
    },
    {
      title: '最近启动时间',
      dataIndex: 'lastStartUpTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '使用状态',
      dataIndex: 'useStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '使用状态',
      dataIndex: 'useStatus',
      valueType: 'select',
      valueEnum: {
        2: "正常",
        3: "已停用"
      },
      hideInTable: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Dropdown.Button
          overlay={() => menu(r)}
          buttonsRender={()=> [
            ( 
              r?.useStatus !== 2&&
              <Button
                onClick={()=>{ 
                  setType(2)
                  setBlockUpVisible(true)
                  setOrderId(r.orderId)
                }}
              >
                启用
              </Button> ||
              r?.useStatus === 2&&
              <Button 
                onClick={()=>{ 
                  setType(1)
                  setBlockUpVisible(true)
                  setOrderId(r.orderId)
                }}
              >
                停用
              </Button>
            ),
            <Button icon={<EllipsisOutlined />}/>
          ]}
        />
      )
    }
  ]

  return (
    <>
      <ProTable<OperatingProps>
        rowKey='id'
        columns={columns}
        params={{}}
        request={ingOperateList}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        actionRef={actRef}
        formRef={form}
        options={false}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export 
              type='healthyDeviceIngOperate' 
              conditions={{...form.current?.getFieldsValue()}}
              key='export'
            />
          ]
        }}
      />
      {
        blockUpVisible &&
        <BlockUp
          visible={blockUpVisible}
          setVisible={setBlockUpVisible}
          type={type}
          orderId={orderId}
          callback={()=> actRef.current?.reload()}
        />
      }
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
        modificationVisible &&
        <Modification
          visible={modificationVisible}
          setVisible={setModificationVisible}
          orderId={orderId}
          useTime={useTime}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        changeImei&&
        <OptionImei
          visible={changeImei}
          setVisible={setChangeImei}
          data={data}
          callback={()=>{actRef.current?.reload()}}
        />
      }
      {
        stopOperationVisivle &&
        <StopOperation
          visible={stopOperationVisivle}
          setVisible={setStopOperationVisivle}
          data={data}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        terminateManagedVisible &&
        <TerminateManaged
          visible={terminateManagedVisible}
          setVisible={setTerminateManagedVisible}
          callback={()=>actRef.current?.reload()}
          data={data}
        />
      }
      {
        captureExpendsEntranceVisible &&
        <CaptureExpendsEntrance
          visible={captureExpendsEntranceVisible}
          setVisible={setCaptureExpendsEntranceVisible}
          data={data}
          callback={()=>actRef.current?.reload()}
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

export default Operating
