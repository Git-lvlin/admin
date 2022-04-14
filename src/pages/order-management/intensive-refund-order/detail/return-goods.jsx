import React, { useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { amountTransform } from '@/utils/utils'
import { Image } from 'antd'

import styles from './styles.less'
import NormalOrderDetail from '@/pages/order-management/normal-order/detail'
import ShopkeeperOrderDetail from '@/pages/order-management/intensive-order/shopkeeper-order/detail'

const ReturnGoods = ({data}) => {
  const [normalOrderVisible, setNormalOrderVisible] = useState(false)
  const [shopkeeperOrderVisible, setShopkeeperOrderVisible] = useState(false)
  const [id, setId] = useState()

  const dataSource = Array.isArray(data) ? [] : [data]


  const skipToOrderDetail = (type, id) => {
    switch(type){
      case 1:
      case 2:
      case 3:
      case 4:
      case 11:
        setId(id)
        setNormalOrderVisible(true)
      break
      case 15:
      case 16:
        setId(id)
        setShopkeeperOrderVisible(true)
      break
      default:
        return ''
    }
  }

  const columns = [
    { 
      title: '店主订单号',
      dataIndex: 'returnNum',
      align: 'center' 
    },
    {
      title: '商品信息',
      dataIndex: 'goodsInfo',
      align: 'center',
      width: 450,
      render: (_, records) => (
        <div className={styles.goodsInfo}>
          <Image
            width={80}
            height={80}
            src={records?.goodsImageUrl}
          />
          <div className={styles.goodsContent}>
            <div>{records?.goodsName}</div>
            <div className={styles.skuName}>{records?.skuName}</div>
          </div>
        </div>
      )
    },
    {
      title: '集约价',
      dataIndex: 'skuSalePrice',
      align: 'center',
      render: (_) => `¥${amountTransform(Number(_), '/').toFixed(2)}`
    },
    { 
      title: '单位',
      dataIndex: 'unit',
      align: 'center' 
    },
    { 
      title: '退款数量',
      dataIndex: 'returnNum',
      align: 'center' 
    },
    {
      title: '退款金额',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_) => `¥${amountTransform(Number(_), '/').toFixed(2)}`
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatusStr',
      align: 'center',
      render: (_, records) => (
        <>
          <div>{_}</div>
          <a onClick={()=>skipToOrderDetail(records?.orderType, records?.subOrderId)}>查看订单详情</a>
        </>
      )
    }
  ]

  return (
    <>
      <ProTable
        rowKey="orderItemId"
        pagination={false}
        columns={columns}
        bordered
        options={false}
        headerTitle="订单商品"
        search={false}
        dataSource={dataSource}
      />
      {
        normalOrderVisible &&
        <NormalOrderDetail
          id={id}
          visible={normalOrderVisible}
          setVisible={setNormalOrderVisible}
        />
      }
      {
        shopkeeperOrderVisible &&
        <ShopkeeperOrderDetail
          id={id}
          visible={shopkeeperOrderVisible}
          setVisible={setShopkeeperOrderVisible}
        />
      }
    </>
  )
}

export default ReturnGoods
