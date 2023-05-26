import { useState, useEffect } from 'react'
import { Button, Drawer } from 'antd'
import ProTable from '@/components/pro-table'
import ProCard from '@ant-design/pro-card'

import type { FC } from 'react'
import type { DetailDrawerProps, DataProps } from './data'
import type { ProColumns } from "@ant-design/pro-table"

import styles from './styles.less'
import { giftPackageOrderDetail } from '@/services/health-package-activities/health-package-order-management'
import { amountTransform } from '@/utils/utils'
import NormalOrderDetail from '@/pages/order-management/normal-order/detail'

const DetailDrawer: FC<DetailDrawerProps> = ({ setVisible, visible, id, state }) => {
  const [data, setData] = useState<DataProps>()
  const [normalOrderVisible, setNormalOrderVisible] = useState<boolean>(false)
  const [orderId, setOrderId] = useState<string>()

  useEffect(()=> {
    giftPackageOrderDetail({
      orderType: 33,
      orderId: id
    }).then(res => {
      setData(res.data)
    })
  }, [])

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center', 
    },
    {
      title: '明细单号',
      dataIndex: 'orderSn',
      align: 'center', 
      render: (_, r) => r.orderId ? <a onClick={()=>{setNormalOrderVisible(true); setOrderId(r.orderId)}}>{_}</a> : '-'
    },
    {
      title: '产品类型',
      dataIndex: 'subType',
      align: 'center'
    },
    {
      title: '产品名称',
      dataIndex: 'goodsName',
      align: 'center',
      width: '20%'
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
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center'
    }
  ]


  return (
    <Drawer
      placement="right"
      width={1200}
      onClose={() => setVisible(false)}
      visible={visible}
      footer={
        <div className={styles.footer}>
          <Button 
            type='primary'
            onClick={() => setVisible(false)}
          >
            返回
          </Button>
        </div>
      }
    >
      <ProCard
        title="基本信息"
        bordered
        headerBordered
        gutter={[8, 8]}
        wrap
        className={styles.card}
      >
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>订单号：</span>
          {data?.orderSn}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>领取人手机：</span>
          {data?.memberPhone}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>收货人姓名：</span>
          {data?.consignee}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>礼包名称：</span>
          {data?.packageTitle}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>礼包价值：</span>
          {amountTransform(data?.totalAmount, '/')}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>收货人联系方式：</span>
          {data?.phone}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>领取时间：</span>
          {data?.createTime}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>备注：</span>
          {data?.remark}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>收货地址：</span>
          {data?.fulladdress}
        </ProCard>
        <ProCard colSpan={{ xs: 16, sm: 8, md: 8, lg: 8, xl: 8 }}>
          <span className={styles.cardLabel}>基金资金到账状态：</span>
          {state}
        </ProCard>
      </ProCard>
      <ProCard
        title="明细信息"
        bordered
        className={styles.baseInfo}
      >
        <ProTable
          rowKey='goodsName'
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
          id={orderId}
          visible={normalOrderVisible}
          setVisible={setNormalOrderVisible}
        />
      }
    </Drawer>
  )
}

export default DetailDrawer
