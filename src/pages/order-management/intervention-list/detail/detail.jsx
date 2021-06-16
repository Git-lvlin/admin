import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Spin, Empty, Button } from 'antd'
import { useParams, history } from 'umi'

import { interventionListDetail, findReturnRecord} from '@/services/order-management/intervention-list'
import InterventionDetailStatus from './intervention-detail-status'
import PlatformDecision from './platform-decision'
import BuyerProof from './buyer-proof'
import SellerProof from './seller-proof'
import ReturnGoods from './return-goods'
import ReturnSingle from './return-single'
import NegotiationHistory from './negotiation-history'

import styles from './styles.less';

const interventioListDetail = () => {
  const { id } = useParams()
  const [detail, setDetail] = useState([])
  const [DTO, setDTO] = useState([])
  const [consultationRecord, setConsultationRecord] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    interventionListDetail({id}).then(res=> {
      setDetail(res?.data)
      setDTO(res?.data.orderReturnApplyDTO)
    }).finally(()=> {
      setLoading(false)
    })
    return ()=>{
      setDetail([])
      setDTO([])
    }
  }, [])
  useEffect(()=>{
    if(DTO != ![]) {
      findReturnRecord({id: DTO?.id}).then(res=> {
        if(res?.success) {
          setConsultationRecord(res?.data)
        }
      })
    }
    return undefined
  }, [DTO])
  const handleBack = () => {
    history.goBack(-1);
  }
  return(
    <PageContainer title={false}>
      <Spin spinning={loading}>
        <InterventionDetailStatus 
          orderId={detail?.orderSn}
          stage={detail?.stage}
          id={id}
          status={detail?.status}
        />
        {
          detail?.status&&
          <PlatformDecision
            platformOpinion={detail?.platformOpinion}
            data={detail}
            platformEvidenceImg={detail?.platformEvidenceImg}
          />
        }
        <BuyerProof 
          platformOpinion={detail?.userEvidence}
          data={DTO}
          userEvidenceImg={detail?.userEvidenceImg}
        />
        <SellerProof 
           platformOpinion={detail?.storeEvidence}
           data={DTO}
           storeEvidenceImg={detail?.storeEvidenceImg}
        />
        <ReturnGoods data={DTO}/>
        <ReturnSingle
          data={DTO}
          status={detail?.stage}
        />
        {/* TODO:协商历史 */}
        { <div className={styles.negotiation}>协商历史</div> }
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

export default interventioListDetail;