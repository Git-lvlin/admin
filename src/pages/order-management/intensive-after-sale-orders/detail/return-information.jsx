import React, { useEffect, useState } from 'react'
import ProDescriptions from '@ant-design/pro-descriptions'
import { Button, Timeline, Empty } from 'antd'
import{ ModalForm } from '@ant-design/pro-form'
import moment from 'moment'

import { amountTransform } from '@/utils/utils'
import { expressInfo } from '@/services/order-management/after-sales-order'

import styles from './styles.less'
import './styles.less'

const { Item } = Timeline

const showLastStatus = lastStatus => {
  if(lastStatus){
    return lastStatus?.map((item)=>(
      <Item key={item.time}>
        <span className={styles.time}>{item.time}</span>
        {item.content}
      </Item>
    ))
  } else {
    return <Empty className={styles.empty}/>
  }
}

const ReturnInformation = props => {
  const { 
    data,
    status,
    type
  } = props
  const [express, setExpress] = useState({})
  const isHide = ()=> {
    return (type === 1 && status !== 1) ? true : false
  }
  useEffect(() => {
    data?.expressNo &&
      expressInfo({
        shippingCode: data?.expressNo,
        expressType: data?.expressType,
        mobile: data?.business?.receiptPhone,
        deliveryTime: data?.expressTime
      }).then(res => {
        setExpress(res.data)
      })
    return ()=>{
      setExpress([])
    }
  }, [data])

  const columns = [
    {
      title: '商品退回方式',
      dataIndex: 'returnType',
      valueType: 'select',
      valueEnum: {
        1: '无需退回',
        2: '快递寄送'
      },
    },
    {
      title: '售后类型',
      dataIndex: 'returnType',
      valueEnum: {
        1: '退款',
        2: '退款退货'
      },
    },
    {
      title: '买家收货地址', 
      dataIndex: 'receiveAddress',
      render: (_, records) => records.buyer?.receiptAddress
    },
    {
      title: '买家昵称',
      dataIndex: 'buyerNickname',
      render: (_, records) => records.buyer?.storeName
    },
    {
      title: '买家手机号',
      dataIndex: 'buyerPhone',
      render: (_, records) => records.buyer?.storePhone
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      valueType: 'dataTime',
      render: (_) => moment(_).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '订单编号',
      dataIndex: 'orderId'
    },
    {
      title: '退款总金额',
      dataIndex: 'refundTotalAmount',
      render:(_) =>`¥${amountTransform(_, '/').toFixed(2)}`
    },
    {
      title: '退货物流信息',
      dataIndex: 'returnGoodsInfo',
      hideInDescriptions: isHide(),
      render: () => {
        return(
          <div style={{display: 'flex', alignItems:'center'}}>
            <div>
              <div style={{marginBottom: 10}}>
                快递公司：
                <span style={{marginRight: 20}}>
                  {express?.expressName}
                </span>
              </div>
              <div>运单编号：
                <span style={{marginRight: 20}}>
                  {express?.shippingCode}
                </span>
              </div>
            </div>
            <ModalForm
              title='快递消息'
              width={700}
              modalProps={{
                closable: true,
                destroyOnClose: true
              }}
              trigger={
                <Button size="large" type="default">查看快递详情</Button>
              }
              onFinish={()=> true}
            >
              <Timeline className={styles.timelineWarp}>
                {showLastStatus(express?.deliveryList)}
              </Timeline>
            </ModalForm>
          </div>
        )
      }
    },
    {
      title: '商家收件人名称',
      dataIndex: 'receiveMan',
      hideInDescriptions: isHide(),
      render: (_, records) => records?.business?.receiptUsername
    },
    {
      title: '商家收货手机号',
      dataIndex: 'receivePhone',
      hideInDescriptions: isHide(),
      render: (_, records) => records.business?.receiptPhone
    },
    {
      title: '商家收货地址',
      dataIndex: 'receiveAddress',
      hideInDescriptions: isHide(),
      render: (_, records) => records.business?.receiptAddress
    }
  ]
  return (
    <ProDescriptions
      rowKey='refundTotalAmount'
      className={styles.description}
      dataSource={data}
      layout='horizontal'
      bordered
      title='退货单信息'
      column={1}
      columns={columns}
    />
  )
}

export default ReturnInformation
