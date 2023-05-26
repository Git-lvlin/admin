import { useState, useRef } from 'react'
import ProTable from '@/components/pro-table'

import type { FormInstance } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'

import { MemberShopOperatorPage } from '@/services/hydrogen-atom-trusteeship/managed-transaction-data'
import { amountTransform, getPageQuery } from "@/utils/utils"
import DevicesDetail from "../components/devices-detail"
import Export from "@/components/export"
import RangeInput from "../components/range-input"

const Operator = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [type, setType] = useState<number>(0)
  const [storeNo, setStoreNo] = useState<string>()
  const [deviceNum, setDeviceNum] = useState<number>()
  const [user, setUser] = useState<string>()
  const [normal, setNormal] = useState<string>()
  const [deductible, setDeductible] = useState<string>()
  const [amount, setAmount] = useState<number>()
  const form = useRef<FormInstance>()

  const paramsData = getPageQuery()

  const getFieldsValue = () =>{
    const { contractTotalNums, ...rest } = form.current?.getFieldsValue()
    return {
      contractNumStart: contractTotalNums && contractTotalNums?.min,
      contractNumEnd: contractTotalNums && contractTotalNums?.max,
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      dataIndex: 'memberId',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
      initialValue: paramsData.searchVal ?? paramsData.searchVal
    },
    {
      title: '姓名',
      dataIndex: 'realname',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营商姓名',
      dataIndex: 'realname',
      align: 'center',
      hideInTable: true
    },
    {
      title: '合同状态',
      dataIndex: 'contractStatusStr',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营合同签订状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        'contractsignedall': '全部签订',
        'contractpartofsign': '部分签订',
        'contractunsigned': '没有签订'
      },
      hideInTable: true
    },
    {
      title: '合同数量',
      dataIndex: 'contractCount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => (
        <>
          <div>共 {_} 份</div>
          <div>
            已签
            {
              r.contractCountSigned > 0 ?
              <a href={`/setting/contract-management`} onClick={()=> {window.localStorage.setItem('managed', JSON.stringify({"type": 4, "memberPhone": r.memberPhone}))}}>{r.contractCountSigned}</a>:
              <span>{r.contractCountSigned}</span>
            }
            份+待签{r.contractCountAwaiting}份
          </div>
        </>
      )
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
      align: 'center'
    },
    {
      title: '缴费合同数',
      dataIndex: 'contractTotalNums',
      align: 'center',
      renderFormItem: ()=> <RangeInput />,
      hideInTable: true
    },
    {
      title: '社区店名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '运营商店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInTable: true
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
                setStoreNo(r.storeNo)
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
                setStoreNo(r.storeNo)
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
                setStoreNo(r.storeNo)
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
      title: '服务费金额',
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
                setType(4)
                setUser(r.memberPhone)
                setAmount(r.deviceTotalPay)
                setNormal(r.availableTotal)
                setDeductible(r.deviceDeduction)
              }}
            >
              {amountTransform(_, '/')}元
            </a>
          )
        } else {
          return <span>{amountTransform(_, '/')}元</span>
        }
      }
    },
    { 
      title: '托管管理费金额',
      dataIndex: 'paidRental',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.paidRental > 0) {
          return (
            <a
              onClick={()=>{
                setVisible(true)
                setStoreNo(r.memberId)
                setDeviceNum(r.availableTotal)
                setType(12)
                setUser(r.memberPhone)
                setAmount(r.paidRental)
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
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='store-export-membershopoperator'
              conditions={getFieldsValue}
            />
          ]
        }}
        params={{}}
        request={MemberShopOperatorPage}
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
        visible &&
        <DevicesDetail
          visible={visible}
          setVisible={setVisible}
          type={type}
          storeNo={storeNo}
          deviceNum={deviceNum}
          user={user}
          amount={amount}
          normal={normal}
          deductible={deductible}
        />
      }
    </>
  )
}

export default Operator
