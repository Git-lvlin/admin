import { useState, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from "@ant-design/pro-table"
import { Button, Dropdown, Menu } from "antd"
import { EllipsisOutlined } from "@ant-design/icons"

import type { ProColumns, ActionType } from "@ant-design/pro-table"
import type { EquipmentItem } from "./data"

import { findDevicePage } from '@/services/hydrogen-atom-management/equipment-management'
import { amountTransform } from '@/utils/utils'
import BlockUp from "./block-up"
import DivideDetail from "./divide-detail"
import DevicesDetail from "../components/devices-detail"

export default function EquipmentManagement() {
  const [blockUpVisible, setBlockUpVisible] = useState<boolean>(false)
  const [showDivide, setShowDivide] = useState<boolean>(false)
  const [imei, setImei] = useState<string>()
  const [id, setId] = useState<string>()
  const [type, setType] = useState<number>(0)
  const [user, setUser] = useState<string>()
  const [devicesVisible, setDevicesVisible] = useState<boolean>(false)
  const [memberId, setMemberId] = useState<string>()
  const [memberPhone, setMemberPhone] = useState<string>()
  const [showTitle, setShowTitle] = useState<boolean>()
  const actRef = useRef<ActionType>()

  const menu = (data: EquipmentItem) => {
    
    return (
      <Menu>
        {
          data?.occupationMode === 1&&
          <Menu.Item key="1">
            {
              data?.contractUrl?
              <a href={data?.contractUrl} target='blank'>合同</a>:
              '未签合同'
            }
          </Menu.Item>
        }
        <Menu.Item
          key="2"
          onClick={()=>{ 
            setShowDivide(true)
            setId(data?.id)
            setImei(data?.imei)
            setUser(data?.memberPhone)
            setType(data?.occupationMode)
          }}
        >
            分成
          </Menu.Item>
        <Menu.Item
          key="3"
          onClick={()=>{
            setDevicesVisible(true)
            setType(6)
            setMemberId(data?.imei)
            setShowTitle(true)
          }}
        >
          操作日志
        </Menu.Item>
        {
          data?.status === 3&&
          <Menu.Item
            key="4"
            onClick={()=> {
              setBlockUpVisible(true)
              setImei(data?.imei)
              setType(3)
              setUser(data?.memberPhone)
            }}
          >
            解绑
          </Menu.Item>
        }
        {
          data?.status === 0 &&
          <Menu.Item key="5" disabled>绑定</Menu.Item>
        }
      </Menu>
    )
  }

  const columns: ProColumns<EquipmentItem>[] = [
    {
      title: 'id',
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
      title: '绑定状态',
      dataIndex: 'bindStatus',
      valueType: 'select',
      valueEnum: {
        0: '解绑',
        1: '绑定'
      }
    },
    {
      title: '交易类型',
      dataIndex: 'occupationMode',
      valueType: 'select',
      valueEnum: {
        1: '租赁',
        2: '购买'
      },
      align: 'center'
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '交易时间',
      dataIndex: 'createTime',
      align: 'center',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '租约到期时间',
      dataIndex: 'leaseDeadline',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单状态',
      dataIndex: 'occupationMode',
      align: 'center',
      render: (_, r) => {
        if(r?.occupationMode === 1) {
          return (
            <>
              <div>已缴押金</div>
              <div>（{amountTransform(r.orderAmount, '/').toFixed(2)}）</div>
            </>
          )
        } else if(r?.occupationMode === 2){
          return (
            <>
              <div>已购买付款</div>
              <div>（{amountTransform(r.orderAmount, '/').toFixed(2)}）</div>
            </>
          )
        } else {
          return '-'
        }
      },
      hideInSearch: true
    },
    {
      title: '租约状态',
      dataIndex: 'leaseStatus',
      valueType: 'select',
      valueEnum: {
        0: ' ',
        1: '免租期',
        2: '租期中',
        3: '已逾期'
      },
      align: 'center'
    },
    {
      title: '累计缴租',
      dataIndex: 'leaseAmountSum',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> {
        if(r.leaseAmountSum > 0) {
          return (
            <a onClick={
              ()=> {
                setDevicesVisible(true)
                setType(3)
                setMemberId(r?.id)
                setMemberPhone(r?.memberPhone)
                setShowTitle(true)
              }
            }>
              {amountTransform(_, '/')}
            </a>
          )
        } else {
          return amountTransform(_, '/')
        }
      }
    },
    {
      title: '累计启用(次)',
      dataIndex: 'startSum',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> {
        if(r?.startSum > 0) {
          return (
            <a onClick={
              ()=> {
                setDevicesVisible(true)
                setType(4)
                setMemberId(r?.imei)
                setMemberPhone(r?.memberPhone)
                setShowTitle(true)
              }
            }>
              {_}
            </a>
          )
        } else {
          return _
        }
      }
    },
    {
      title: '用户手机',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '使用状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: '待绑定',
        1: '待激活',
        2: '正常',
        3: '停用'
      },
      align: 'center'
    },
    {
      title: '店铺ID',
      dataIndex: 'storeNo',
      align: 'center'
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
              r?.status !== 2&&
              <Button
                onClick={()=>{ 
                  setBlockUpVisible(true);
                  setImei(r?.imei) 
                  setType(2)
                  setMemberPhone(r?.memberPhone)
                }}
                disabled={r?.status === 0 || r?.status === 1}
              >
                启用
              </Button> ||
              r?.status === 2&&
              <Button 
                onClick={()=>{ 
                  setBlockUpVisible(true) 
                  setImei(r?.imei) 
                  setType(1)
                  setMemberPhone(r?.memberPhone)
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
    <PageContainer title={false}>
      <ProTable<EquipmentItem>
        rowKey='imei'
        columns={columns}
        request={findDevicePage}
        actionRef={actRef}
        options={false}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
      />
      {
        blockUpVisible&&
        <BlockUp
          visible={blockUpVisible}
          setVisible={setBlockUpVisible}
          id={imei}
          type={type}
          refs={actRef}
          user={user}
          phone={memberPhone}
        />
      }
      {
        showDivide&&
        <DivideDetail
          visible={showDivide}
          setVisible={setShowDivide}
          id={id}
          imei={imei}
          user={user}
          type={type}
        />
      }
      {
        devicesVisible&&
        <DevicesDetail
          visible={devicesVisible}
          setVisible={setDevicesVisible}
          type={type}
          memberId={memberId}
          memberPhone={memberPhone}
          showTitle={showTitle}
        />
      }
    </PageContainer>
  )
}
