import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"

import { deviceTransList } from '@/services/hydrogen-atom-trusteeship/managed-transaction-data'
import { amountTransform } from '@/utils/utils'
import DevicesDetail from '../components/devices-detail'
import Export from "@/components/export"
import RangeInput from "../components/range-input"

const ManagedBuy: FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [storeNo, setStoreNo] = useState<string>()
  const [user, setUser] = useState<string>()
  const [deviceNum, setDeviceNum] = useState<number>()
  const [amount, setAmount] = useState<number>()
  const form = useRef<FormInstance>()

  const getFieldsValue = () =>{
    const { contractTotalNums, ...rest } = form.current?.getFieldsValue()
    return {
      contractStartNums: contractTotalNums && contractTotalNums?.min,
      contractEndNums: contractTotalNums && contractTotalNums?.max,
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      dataIndex: 'orderId',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '手机号码',
      dataIndex: 'hostingMemberPhone',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '投资方姓名',
      dataIndex: 'nickname',
      align: 'center',
      hideInTable: true
    },
    {
      title: '合同状态',
      dataIndex: 'contractStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '托管合同签订状态',
      dataIndex: 'contractStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '全部签订',
        2:' 部分签订',
        3: '没有签订'
      },
      hideInTable: true
    },
    {
      title: '合同数量',
      dataIndex: 'contractTotalNums',
      align: 'center',
      render: (_, r) => (
        <>
          <div>共 {_} 份</div>
          <div>
            已签
            {
              r.contractSignedNums > 0 ?
              <a href={`/setting/contract-management`} onClick={()=> {window.localStorage.setItem('managed', JSON.stringify({"type": 3, "memberPhone": r.hostingMemberPhone}))}}>{r.contractSignedNums}</a>:
              <span>{r.contractSignedNums}</span>
            }
            份+待签{r.contractPendSignNums}份
          </div>
        </>
      ),
      hideInSearch: true
    },
    {
      title: '设备合同数量',
      dataIndex: 'contractTotalNums',
      align: 'center',
      renderFormItem: ()=> <RangeInput />,
      hideInTable: true
    },
    {
      title: '是否为VIP店主',
      dataIndex: 'isShopVip',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '是',
        0: '否'
      },
      hideInSearch: true
    },
    {
      title: '店铺编号',
      dataIndex: 'houseNumber',
      align: 'center'
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '投资方店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInTable: true
    },
    {
      title: '托管购买设备数',
      dataIndex: 'totalDeviceNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.totalDeviceNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setType(5)
                setStoreNo(r.hostingMemberId)
                setUser(r.nickname)
                setDeviceNum(r.totalDeviceNum)
                setAmount(r.totalAmount)
              }}
            >
              {_}
            </a>
          )
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '待投放设备数',
      dataIndex: 'pendingHostingNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> {
        if(r.pendingHostingNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setType(6)
                setStoreNo(r.hostingMemberId)
                setUser(r.nickname)
                setDeviceNum(r.pendingHostingNum)
              }}
            >
              {_}
            </a>
          )
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '待运营设备数',
      dataIndex: 'pendingOperateNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> {
        if(r.pendingOperateNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setType(7)
                setStoreNo(r.hostingMemberId)
                setUser(r.nickname)
                setDeviceNum(r.pendingOperateNum)
              }}
            >
              {_}
            </a>
          )
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '运营中设备数',
      dataIndex: 'ingOperateNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> {
        if(r.ingOperateNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setType(8)
                setStoreNo(r.hostingMemberId)
                setUser(r.nickname)
                setDeviceNum(r.ingOperateNum)
              }}
            >
              {_}
            </a>
          )
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '终止托管设备数',
      dataIndex: 'stopHostingNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> {
        if(r.stopHostingNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setType(9)
                setStoreNo(r.hostingMemberId)
                setUser(r.nickname)
                setDeviceNum(r.stopHostingNum)
              }}
            >
              {_}
            </a>
          )
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '托管购买金额',
      dataIndex: 'totalAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.totalDeviceNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setType(5)
                setStoreNo(r.hostingMemberId)
                setUser(r.nickname)
                setDeviceNum(r.totalDeviceNum)
                setAmount(r.totalAmount)
              }}
            >
              {amountTransform(_, '/')}
            </a>
          )
        } else {
          return <span>{amountTransform(_, '/')}</span>
        }
      }
    }
  ]

  return (
    <>
      <ProTable
        rowKey='orderId'
        columns={columns}
        params={{}}
        request={deviceTransList}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={form}
        options={false}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export 
              key='exprot'
              type='healthyDeviceTransList'
              conditions={getFieldsValue}
            />
          ]
        }}
        tableRender={(_, dom)=> (
          <>
            { dom }
            <span style={{}}>
              对未提交开户资料运营商，请提醒运营商尽快提交<b>开户资料</b>，并尽快进行
              <a target='_blank' referrerPolicy='no-referrer' href="/intensive-store-management/store-review">店铺审核</a>
            </span>
          </>
        )}
      />
      {
        visible&&
        <DevicesDetail
          visible={visible}
          setVisible={setVisible}
          type={type}
          storeNo={storeNo}
          user={user}
          amount={amount}
          deviceNum={deviceNum}
        />
      }
    </>
  )
}

export default ManagedBuy
