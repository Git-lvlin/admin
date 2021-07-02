import React, { useState, useEffect } from 'react'
import ProCard from '@ant-design/pro-card'
import { PageContainer } from '@ant-design/pro-layout'
import { useLocation, history } from 'umi'
import { Button } from 'antd'

import { detail } from '@/services/financial-management/supplier-fund-management'
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

const Details = () => {
  const { query } = useLocation()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    detail({...query}).then(res => {
      if(res?.success){
        setData(res?.data)
      }
    }).finally(()=> {
      setLoading(false)
    })
    return ()=>{
      setData({})
    }
  }, [])

  const card = () => {
    if(query.accountType==='supplier'){
      return '供应商银行账户'
    } else if(query.accountType==='store'){
      return '会员店银行账户'
    }else if(query.accountType==='agentStore'){
      return '代发店银行账户'
    }else{
      return ''
    }
  }
  // const rightCard = () => {
  //   if(query.accountType==='store'){
  //     return '会员店虚拟子账户'
  //   }else if(query.accountType==='agentStore'){
  //     return '消费者虚拟子账户'
  //   }else if(query.accountType==='supplier'){
  //     return ''
  //   }else {
  //     return ''
  //   }
  // }

  const skipToDetail = ({accountType, accountId}) => {
    history.push(`/financial-management/money-management/payment-details?accountType=${accountType}&accountId=${accountId}`)
  }

  return (
    <PageContainer title={false}>
      <ProCard
        gutter={[16, 16]} 
        bordered
        loading={loading}
      >
        <ProCard 
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          bordered
          style={{ height: 280 }}
          title={card()}
        >
           <div className={styles.bindCard}>
            <div>账户名称： <span>{data?.realname}</span></div>
            <div>账户号码： <span>{data?.cardNo}</span></div>
            <div>开户银行： <span>{data?.bankBranchName}</span></div>
          </div>
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          style={{ height: 280 }}
          bordered
          title={card()}
        >
           <div className={styles.platform}>
            <div>账户号码： </div>
            <div><span className={styles.sn}>{data?.sn}</span></div>
            <div className={styles.balance}>
              <div>
                总余额： <span>{`${amountTransform((parseInt(data?.balance)+parseInt(data?.commission)), '/')}元`}</span>
              </div>
              <Button 
                type='default'
                onClick={()=>{skipToDetail({accountType: data?.accountType, accountId: data?.accountId})}}
              >
                交易明细
              </Button>
            </div>
            {
              query.accountType==='supplier'&&
              <div className={styles.balance}>
                <div>
                  可提现余额： <span>{`${amountTransform(data?.balanceAvailable, '/')}元`}</span>
                </div>
                <div>
                  冻结余额： <span>{`${amountTransform(data?.balanceFreeze, '/')}元`}</span>
                </div>
              </div>
            }
            {
              query.accountType==='store'&&
              <>
                <div className={styles.balance}> 
                  <div>
                    货款可提现余额： <span>{`${amountTransform(data?.balanceAvailable, '/')}元`}</span>
                  </div>
                  <div>
                    冻结余额： <span>{`${amountTransform(data?.balanceFreeze, '/')}元`}</span>
                  </div>
                </div>
                <div className={styles.balance}> 
                  <div>
                    提成可提现余额： <span>{`${amountTransform(data?.commissionAvailable, '/')}元`}</span>
                  </div>
                  <div>
                    冻结余额： <span>{`${amountTransform(data?.commissionFreeze, '/')}元`}</span>
                  </div>
                </div>
              </>
            }
          </div>
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}

export default Details
