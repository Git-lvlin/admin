import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Space } from 'antd'
import { ModalForm, ProFormText } from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { history } from 'umi'

import styles from './styles.less'
import { amountTransform } from '@/utils/utils'
import { platforms, platformWithdraw } from '@/services/financial-management/yeahgo-virtual-account-management'

const WithdrawalModal = ({ val, change, update }) => {
  console.log(val);
  const withdrawal = (v) => {
    const money = amountTransform(v.amount, '*')
    platformWithdraw({
      amount: money
    }).then(res=> {
      if(res?.success){
        update(change + 1)
        message.success('提现成功')
      }
    })
  }
  return (
    <ModalForm
      title="提现"
      layout='horizontal'
      width={500}
      trigger={
        <Button>提现</Button>
      }
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async (values) => {
        await withdrawal(values)
        return true
      }}
    >
      <Space align="baseline">
        <ProFormText
          label="提现金额"
          name="amount"
          rules={[{required: true }]}
          width="md"
        />
        <span>元</span>
      </Space>
      <ProFormText
        name="realName"
        label="提现账户名"
        initialValue={val?.realname}
        readonly
      />
      <ProFormText
        name="cardNo"
        initialValue={val?.cardNo}
        label="提现账号"
        readonly
      />
      <ProFormText
        name="bankName"
        label="所属银行"
        initialValue={val?.bankName}
        readonly
      />
      <ProFormText
        name="mobile"
        label="银行预留手机号"
        initialValue={val?.mobile}
        readonly
      />
    </ModalForm>
  )
}

const YeahgoVirtualAccountManagement = () => {
  const [account, setAccount] = useState({})
  const [loading, setLoading] = useState(false)
  const [change, setChange] = useState(1)

  useEffect(()=>{
    setLoading(true)
    platforms().then(res=> {
      if(res.success) {
        setAccount(res?.data)
      }
    }).finally(()=>{
      setLoading(false)
    })
  }, [])

  const skipToDetail = ({accountType, accountId}) => {
    history.push(`/financial-management/money-management/yeahgo-virtual-account-management/transaction-details?accountType=${accountType}&accountId=${accountId}`)
  }

  return (
    <PageContainer title={false}>
      <ProCard 
        gutter={[24, 24]}
        wrap
        loading={loading}
      >
        <ProCard 
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          bordered
          title='汇能银行账户'
        >
          <div className={styles.bindCard}>
            <div>账户名称： <span>{account?.bindCard?.realname}</span></div>
            <div>账户号码： <span>{account?.bindCard?.cardNo}</span></div>
            <div>开户银行： <span>{account?.bindCard?.bankBranchName}</span></div>
          </div>
        </ProCard>
        <ProCard 
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          bordered
          title='汇能虚拟户'
        >
          <div className={styles.withdrawal}>
            {
              account?.bindCard?.cardNo && 
              <WithdrawalModal
                val={account?.bindCard}
                update={setChange}
                change={change}
              />
            }
          </div>
          <div className={styles.platform}>
            <div>账户号码： </div>
            <div><span className={styles.sn}>{account?.platform?.sn}</span></div>
            <div className={styles.balance}>
              <div>
                余额： <span>{`${amountTransform(account?.platform?.balance, '/')}元`}</span>
              </div>
              <Button 
                type='default'
                onClick={()=>{
                  skipToDetail({accountId:account?.platform?.accountId, accountType:account?.platform?.accountType})
                }}
              >
                交易明细
              </Button>
            </div>
          </div>
        </ProCard>
        <ProCard 
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} 
          bordered
          title='交易费账户（聚创）'
        >
          <div className={styles.platformFee}>
            <div>账户号码： </div>
            <div><span className={styles.sn}>{account?.platformFee?.sn}</span></div>
            <div className={styles.balance}>
              <div>
                余额： <span>{`${amountTransform(account?.platformFee?.balance, '/')}元`}</span>
              </div>
              <Button
                type='default'
                onClick={()=>{
                  skipToDetail({accountId:account?.platformFee?.accountId, accountType:account?.platformFee?.accountType})
                }}
              >
                交易明细
              </Button>
            </div>
          </div>
        </ProCard>
        <ProCard 
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          bordered
          title='薪宝虚拟户'
        >
          <div className={styles.platformXinbao}>
            <div>账户号码: </div>
            <div><span className={styles.sn}>{account?.platformXinbao?.sn}</span></div>
            <div className={styles.balance}>
              <div>
                余额： <span>{`${amountTransform(account?.platformXinbao?.balance, '/')}元`}</span>
              </div>
              <Button
                type='default'
                onClick={()=>{
                  skipToDetail({accountId:account?.platformXinbao?.accountId, accountType:account?.platformXinbao?.accountType})
                }}
              >
                交易明细
              </Button>
            </div>
          </div>
        </ProCard>
      </ProCard>
    </PageContainer>
  )
}

export default YeahgoVirtualAccountManagement
