import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Spin, Button, Empty } from 'antd'
import { useParams, history } from 'umi'

import { refundOrderDetail, findReturnRecord } from '@/services/order-management/intensive-after-sale-orders'
import OrderDetailStatus from './order-detail-status'
import BasicInformation from './basic-information'
import ReturnGoods from './return-goods'
import ReturnInformation from './return-information'
import NegotiationHistory from './negotiation-history'
import styles from './styles.less'

const Detail = () => {
  const {id} = useParams()
  const [orderDetail, setOrderDetail] = useState([])
  const [consultationRecord, setConsultationRecord] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    refundOrderDetail({refundId: id}).then(res => {
      setOrderDetail(res?.data)
    }).finally(()=>{
      setLoading(false)
    })
    findReturnRecord({refundId: id}).then(res=> {
      setConsultationRecord(res.data)
    })
    return ()=> {
      setOrderDetail([])
      setConsultationRecord([])
    }
  }, [id])
  const handleBack = () => { window.history.back(); setTimeout(() => { window.location.reload(); }, 200) }
  return (
    <PageContainer title={false}>
       <Spin spinning={loading}>
        <OrderDetailStatus 
          orderSn={orderDetail?.refundId}
          status={orderDetail?.status}
          platformInvolved={orderDetail?.isPlatIntervention}
        />
        <BasicInformation data={orderDetail}/>
        <ReturnGoods data={orderDetail}/>
        <ReturnInformation
          data={orderDetail}
          status={orderDetail?.returnType}
          type={orderDetail?.status}
        />
        <div className={styles.negotiation}>协商历史</div>
        {
          consultationRecord?.length === 0 ? 
          <Empty className={styles.empty}/>:
          <NegotiationHistory data={consultationRecord}/>
        }
        <div className={styles.btn}>
          <Button
            type='primary'
            size='large'
            onClick={handleBack}
          >
            返回
          </Button>
        </div>
       </Spin>
    </PageContainer>
  )
}
export default Detail