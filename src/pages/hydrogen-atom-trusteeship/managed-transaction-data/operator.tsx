import { useState } from 'react'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import { MemberShopOperatorPage } from '@/services/hydrogen-atom-trusteeship/managed-transaction-data'
import { amountTransform } from "@/utils/utils"
import DevicesDetail from "../components/devices-detail"


const Operator = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [storeNo, setStoreNo] = useState<string>()
  const [deviceNum, setDeviceNum] = useState<number>()
  const [user, setUser] = useState<string>()
  const [amount, setAmount] = useState<number>()

  const columns: ProColumns[] = [
    {
      dataIndex: 'keyword',
      fieldProps: {
        placeholder: '请输入手机号或店铺编号'
      },
      hideInTable: true
    },
    {
      dataIndex: 'memberId',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '姓名',
      dataIndex: 'realname',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '可运营资质数',
      dataIndex: 'availableTotal',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '被扣资质数',
      dataIndex: 'deviceDeduction',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '剩余资质数',
      dataIndex: 'deviceCount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '社区店名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '待运营设备数',
      dataIndex: 'pendingNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.pendingNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setStoreNo(r.memberId)
                setType(1)
                setDeviceNum(r.pendingNum)
                setUser(r.memberPhone)
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
      dataIndex: 'ingNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.ingNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setStoreNo(r.memberId)
                setType(2)
                setDeviceNum(r.ingNum)
                setUser(r.memberPhone)
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
      title: '停止运营设备数',
      dataIndex: 'stopNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.stopNum > 0) {
          return (
            <a 
              onClick={()=> {
                setVisible(true)
                setStoreNo(r.memberId)
                setType(3)
                setDeviceNum(r.stopNum)
                setUser(r.memberPhone)
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
      title: '运营服务费金额',
      dataIndex: 'deviceTotalPay',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.deviceTotalPay > 0) {
          return (
            <a
              onClick={()=>{
                setVisible(true)
                setStoreNo(r.memberId)
                setDeviceNum(r.availableTotal)
                setType(4)
                setUser(r.memberPhone)
                setAmount(r.deviceTotalPay)
              }}
            >
              {amountTransform(_, '/')}元
            </a>
          )
        } else {
          return <span>{amountTransform(_, '/')}元</span>
        }
      }
    }
  ]

  return (
    <>
      <ProTable
        rowKey='memberId'
        columns={columns}
        options={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          labelWidth: 80,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse()
          ]
        }}
        params={{}}
        request={MemberShopOperatorPage}
      />
      {
        visible &&
        <DevicesDetail
          visible={visible}
          setVisible={setVisible}
          type={type}
          storeNo={storeNo}
          deviceNum={deviceNum}
          user={user}
          amount={amount}
        />
      }
    </>
  )
}

export default Operator
