import { Drawer } from 'antd'
import { useState } from 'react'

import type { ProColumns } from '@ant-design/pro-table'
import type { logProps } from './data'

import ProTable from '@/components/pro-table'
import { rewardDetail } from '@/services/product-performance-management/early-screening-sales-bonus'
import NormalOrderDetail from '@/pages/order-management/normal-order/detail'

const RewardDetails: React.FC<logProps> = ({visible, setVisible, data}) => {
  const [normalOrderVisible, setNormalOrderVisible] = useState(false)
  const [id, setId] = useState()

  const columns: ProColumns[] = [
    {
      title: '订单号',
      dataIndex: 'subOrderSn',
      align: 'center',
      render: (_, r) => {
        if(r?.subOrderSn) {
          return <a onClick={()=> {setNormalOrderVisible(true); setId(r.orderId)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '产品类型',
      dataIndex: 'goodsType',
      align: 'center'
    },
    {
      title: '产品名称',
      dataIndex: 'goodsName',
      align: 'center'
    },
    {
      title: '产品数量/金额',
      dataIndex: 'rewardNum',
      align: 'center'
    },
    {
      title: '产品skuID',
      dataIndex: 'skuId',
      align: 'center'
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'orderStatus',
      align: 'center'
    },
    {
      title: '电子合同ID',
      dataIndex: 'contractId',
      align: 'center',
      render: (_, r) => {
        if(r?.contractId) {
          return <a href={r?.contractId} target='_blank' referrerPolicy='no-referrer'>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '签订人姓名',
      dataIndex: 'realName',
      align: 'center'
    },
    {
      title: '签订人身份证号',
      dataIndex: 'idCard',
      align: 'center'
    }
  ]

  return (
    <Drawer
      width={1200}
      visible={visible}
      onClose={()=> {setVisible(false)}}
      title={`销售人用户ID：${data?.memberId} 销售人手机号码：${data?.memberPhone} 所属月份：${data?.months}`}
    >
      <ProTable
        rowKey='id'
        columns={columns}
        params={{ipoId: data?.id}}
        request={rewardDetail}
        search={false}
        options={false}
        bordered
        paginationProps={false}
        headerTitle='明细信息'
      />
      {
        normalOrderVisible &&
        <NormalOrderDetail
          id={id}
          visible={normalOrderVisible}
          setVisible={setNormalOrderVisible}
        />
      }
    </Drawer>
  )
}

export default RewardDetails