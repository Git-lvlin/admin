import { useState, useEffect } from 'react'
import ProCard from '@ant-design/pro-card'
import { Drawer } from 'antd'
import ProTable from "@ant-design/pro-table"

import type { FC } from 'react'
import type { DetailProps, DataProps, ListDataProps } from './data'
import type { ProColumns } from "@ant-design/pro-table"

import styles from './styles.less'
import { giftPackageOrderDetail } from '@/services/health-package-activities/health-package-order-management'
import { amountTransform } from '@/utils/utils'
import NormalOrderDetail from '@/pages/order-management/normal-order/detail'
import ServiceDetail from './service-detail'

const Detail: FC<DetailProps> = ({visible, setVisible, id}) => {
  const [data, setData] = useState<DataProps>()
  const [listData, setListData] = useState<ListDataProps[]>()
  const [normalOrderVisible, setNormalOrderVisible] = useState<boolean>(false)
  const [serviceVisible, setServiceVisible] = useState<boolean>(false)

  useEffect(()=> {
    giftPackageOrderDetail({
      orderType: 32,
      orderId: id
    }).then(res => {
      setData(res.data)
    })
  }, [])

  const columns: ProColumns[] = [
    {
      title: '明细单号',
      dataIndex: 'orderId',
      align: 'center', 
      render: (_, r) => {
        if(r.subType === '健康服务') {
          return <a onClick={()=>{setServiceVisible(true); setListData(data?.cardItems)}}>查看服务号</a>
        } else {
          return r.orderId ? <a onClick={()=>{setNormalOrderVisible(true)}}>{_}</a> : '-'
        }
      }
    },
    {
      title: '产品类型',
      dataIndex: 'subType',
      align: 'center'
    },
    {
      title: '产品名称',
      dataIndex: 'goodsName',
      align: 'center'
    },
    {
      title: '产品数量/金额',
      dataIndex: 'buyNumStr',
      align: 'center',
    },
    {
      title: '产品skuID',
      dataIndex: 'skuId',
      align: 'center'
    },
    {
      title: '供应商ID/所属店铺编号',
      dataIndex: 'supplierId',
      align: 'center'
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      align: 'center'
    }
  ]

  return (
    <Drawer
      title='套餐订单详情'
      visible={visible}
      onClose={()=> setVisible(false)}
      width={1200}
    >
      <ProCard
        title="套餐订单基本信息"
        bordered 
        headerBordered
        gutter={[8, 8]}
        wrap
        className={styles.card}
      >
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>订单号：</span>
          {data?.orderId}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>下单人手机：</span>
          {data?.memberPhone}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>收货人姓名：</span>
          {data?.consignee}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>套餐名称：</span>
          {data?.packageTitle}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>下单支付金额：</span>
          {amountTransform(data?.payAmount, '/')}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>收货人联系方式：</span>
          {data?.phone}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>下单时间：</span>
          {data?.createTime}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>下单支付方式：</span>
          {data?.payTypeStr}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>收货地址：</span>
          {data?.fulladdress}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>订单状态：</span>
          {data?.payStatusStr}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>下单支付时间：</span>
          {data?.payTime}
        </ProCard>
        <ProCard colSpan={{ xs: 20, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>购买数量：</span>
          {data?.buyNum}
        </ProCard>
      </ProCard>
      <ProCard
        title="套餐订单基本信息"
        bordered
        className={styles.baseInfo}
      >
        <ProTable
          columns={columns}
          pagination={false}
          search={false}
          options={false}
          dataSource={data?.orderItems}
        />
      </ProCard>
      {
        normalOrderVisible &&
        <NormalOrderDetail
          id={id}
          visible={normalOrderVisible}
          setVisible={setNormalOrderVisible}
        />
      }
      {
        serviceVisible&&
        <ServiceDetail
          data={listData}
          visible={serviceVisible}
          setVisible={setServiceVisible}
        />
      }
    </Drawer>
  )
}

export default Detail
