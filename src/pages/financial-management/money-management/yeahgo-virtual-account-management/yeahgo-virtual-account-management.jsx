import React, { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@/components/PageContainer'
import { 
  Button, 
  Space, 
  message,
  Col,
  Row 
} from 'antd'
import { 
  ModalForm, 
  ProFormText, 
  ProFormDigit,
  ProFormTextArea 
} from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { history } from 'umi'
import {QRCodeCanvas} from 'qrcode.react'

import styles from './styles.less'
import { amountTransform } from '@/utils/utils'
import { 
  platforms, 
  platformWithdraw, 
  supplyChainWithdraw, 
  apply,
  rechargeApply,
  rechargeDetail 
} from '@/services/financial-management/yeahgo-virtual-account-management'
import Detail from './transaction-details'
import PopModal from './popup-modal'

const WithdrawalModal = ({ val, change, update, type }) => {
  const withdrawal = (v) => {
    const money = amountTransform(v.amount, '*')
    if(type === 'platform') {
      platformWithdraw({
        amount: money
      }).then(res => {
        if (res?.success) {
          update(change + 1)
          message.success('提现成功')
        }
      })
    } else if(type === 'supplyChain') {
      supplyChainWithdraw({
        amount: money
      }).then(res => {
        if (res?.success) {
          update(change + 1)
          message.success('提现成功')
        }
      })
    } else if(type === 'operation') {
      apply({
        amount: money
      }).then(res => {
        if (res?.success) {
          update(change + 1)
          message.success('提现成功')
        }
      })
    }
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
        <ProFormDigit
          label="提现金额"
          name="amount"
          rules={[{ required: true }]}
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
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [visable, setVisable] = useState(false)
  const [change, setChange] = useState(1)
  const [query, setQuery] = useState(null)
  const [payVisible, setPayVisible] = useState(false)
  const [qrCodeVisible, setQrCodeVisible] = useState(false)
  const [payInfo, setPayInfo] = useState()

  useEffect(() => {
    setLoading(true)
    platforms().then(res => {
      if (res.success) {
        setAccount(res?.data)
      }
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const skipToDetail = ({ accountType, accountId, amountType }) => {
    setQuery({accountType, accountId, amountType})
    setVisable(true)
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
                type="platform"
              />
            }
          </div>
          <div className={styles.platform}>
            <div>账户号码： </div>
            <div className={styles.balance}>
              <span className={styles.sn}>{account?.platform?.sn}</span>
              <Button onClick={()=>{ setPayVisible(true) }}>充值</Button>
            </div>
            <div className={styles.balance}>
              <div>
                <span>总余额：{`${amountTransform(account?.platform?.balance, '/')}元`}</span>
              </div>
              <Button
                type='default'
                onClick={() => {
                  skipToDetail({ accountId: account?.platform?.accountId, accountType: account?.platform?.accountType })
                }}
              >
                交易明细
              </Button>
            </div>
            <div className={styles.balanceBootom}>
              <Space size="middle">
                <span>可提现余额：{`${amountTransform(account?.platform?.balanceAvailable, '/')}元`}</span>
                <Button
                  type='default'
                  onClick={() => {
                    skipToDetail({ accountId: account?.platform?.accountId, accountType: account?.platform?.accountType, amountType: 'available'})
                  }}
                >
                  交易明细
                </Button>
              </Space>
              <Space size="middle">
                <span>冻结余额：{`${amountTransform(account?.platform?.balanceFreeze, '/')}元`}</span>
                <Button
                  type='default'
                  onClick={() => {
                    skipToDetail({ accountId: account?.platform?.accountId, accountType: account?.platform?.accountType, amountType: 'freeze'  })
                  }}
                >
                  交易明细
                </Button>
              </Space>
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
                onClick={() => {
                  skipToDetail({ accountId: account?.platformFee?.accountId, accountType: account?.platformFee?.accountType })
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
                onClick={() => {
                  skipToDetail({ accountId: account?.platformXinbao?.accountId, accountType: account?.platformXinbao?.accountType })
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
          title='平台运营中心0'
        >
          <div className={styles.operation}>
            <div>账户名称：{account?.operation?.bindCard?.realname}</div>
            <div className={styles.balance}>
              <Space size={40}>
                <span>账户号码：{account?.operation?.bindCard?.cardNo}</span>
                <span>开户行：{account?.operation?.bindCard?.bankName}</span>
              </Space>
              <div>
                <PopModal val={account} change={setChange} num={change} />
              </div>
            </div>
            <div className={styles.balance}>
              <div>总余额：{`${amountTransform(account?.operation?.balance, '/')}元`}</div>
              <Button
                 onClick={() => {
                  skipToDetail({ accountId: account?.operation?.accountId, accountType: account?.operation?.accountType})
                }}
              >
                交易明细
              </Button>
            </div>
            <div className={styles.balance}>
              <Space size='middle'>
                <div>可提现余额：{`${amountTransform(account?.operation?.balanceAvailable, '/')}元`}</div>
                <Button
                   onClick={() => {
                    skipToDetail({ accountId: account?.operation?.accountId, accountType: account?.operation?.accountType, amountType: 'available'})
                  }}
                >
                  交易明细
                </Button>
                {
                  account?.operation?.bindCard?.cardNo&&
                  <WithdrawalModal
                    val={account?.operation?.bindCard}
                    update={setChange}
                    change={change}
                    type="operation"
                  />
                }
              </Space>
              <Space size='middle'>
                <div>冻结余额：{`${amountTransform(account?.operation?.balanceFreeze, '/')}元`}</div>
                <Button
                   onClick={() => {
                    skipToDetail({ accountId: account?.operation?.accountId, accountType: account?.operation?.accountType, amountType: 'freeze'})
                  }}
                >
                  交易明细
                </Button>
              </Space>
            </div>
          </div>
        </ProCard>
        <ProCard
          colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }}
          bordered
          title='汇意虚拟户'
        >
          <div className={styles.withdrawal}>
            {
              account?.supplyChain?.bindCard?.cardNo &&
              <WithdrawalModal
                val={account?.supplyChain?.bindCard}
                update={setChange}
                change={change}
                type="supplyChain"
              />
            }
          </div>
          <div className={styles.platform}>
            <div>账户号码： </div>
            <div><span className={styles.sn}>{account?.supplyChain?.sn}</span></div>
            <div className={styles.balance}>
              <div>
                余额： <span>{`${amountTransform(account?.supplyChain?.balance, '/')}元`}</span>
              </div>
              <Button
                type='default'
                onClick={() => {
                  skipToDetail({ accountId: account?.supplyChain?.accountId, accountType: account?.supplyChain?.accountType })
                }}
              >
                交易明细
              </Button>
            </div>
            <div className={styles.balanceBootom}>
              <Space size="middle">
                <span>可提现余额：{`${amountTransform(account?.supplyChain?.balanceAvailable, '/')}元`}</span>
                <Button
                  type='default'
                  onClick={() => {
                    skipToDetail({ accountId: account?.supplyChain?.accountId, accountType: account?.supplyChain?.accountType, amountType: 'available'})
                  }}
                >
                  交易明细
                </Button>
              </Space>
              <Space size="middle">
                <span>冻结余额：{`${amountTransform(account?.supplyChain?.balanceFreeze, '/')}元`}</span>
                <Button
                  type='default'
                  onClick={() => {
                    skipToDetail({ accountId: account?.supplyChain?.accountId, accountType: account?.supplyChain?.accountType, amountType: 'freeze'})
                  }}
                >
                  交易明细
                </Button>
              </Space>
            </div>
          </div>
        </ProCard>
      </ProCard>
      {
        visable&&
        <Detail
          // id={selectItem}
          visible={visable}
          setVisible={setVisable}
          query={query}
        />
      }
      {
        payVisible&&
        <PayModal
          visible={payVisible}
          setVisible={setPayVisible}
          callback={()=>{setPayVisible(false); setQrCodeVisible(true)}}
          data={account}
          setPayInfo={setPayInfo}
        />
      }
      {
        qrCodeVisible&&
        <QrCodeModal
          visible={qrCodeVisible}
          setVisible={setQrCodeVisible}
          callback={()=>{setQrCodeVisible(false); message.success('充值成功')}}
          data={account}
          payInfo={payInfo}
          setChange={setChange}
          change={change}
        />
      }
    </PageContainer>
  )
}

const PayModal = ({visible, setVisible, callback, data, setPayInfo}) => {
  const [num, setNum] = useState()

  const submit = (value) => {
    return new Promise((resolve, reject) => {
      rechargeApply({
        ...value,
        amount: amountTransform(value.amount, '*')
      }).then(res => {
        if(res.code === 0) {
          setPayInfo(res?.data)
          callback()
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <ModalForm
      title="账户充值"
      visible={visible}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      width={500}
      submitter={{
        searchConfig: {
          submitText: '立即充值'
        },
        resetButtonProps: {
          style: {
            display: 'none'
          }
        }
      }}
      onFinish={async (values) => {
        await submit(values)
      }}
    >
      <ProFormText
        label='充值账户'
        name='accountSn'
        initialValue={data?.platform?.sn}
        readonly
      />
      <div style={{margin: '20px 0'}}>现有余额：￥{amountTransform(data?.platform?.balance, '/')}</div>
      <ProFormDigit
        label='充值金额'
        name='amount'
        rules={[{required: true}]}
        fieldProps={{
          addonAfter: '元',
          value: num,
          onChange: (v) => {
            const val = v.toFixed(2)
            setNum(val)
          }
        }}
      />
      <ProFormTextArea
        label='充值描述'
        name='description'
        rules={[{required: true}]}
      />
      <div style={{marginTop: 20}}>支付方式：支付宝</div>
    </ModalForm>
  )
}

const QrCodeModal = (props) => {
  const {visible, setVisible, callback, data, payInfo, setChange, change} = props
  const timer = useRef()

  console.log(payInfo?.order_no);

  useEffect(() => {
    timer.current = setInterval(()=>{
      getStatus()
    }, 3000)
    return ()=> {
      clearInterval(timer.current)
    }
  }, [visible])

  const getStatus = () => {
    return new Promise((resolve, reject) => {
      rechargeDetail({
        rechargeNo: payInfo?.orderNo
      }).then(res => {
        if(res.data.paymentStatus === 'success') {
          clearInterval(timer.current)
          setChange(change + 1)
          callback()
          resolve()
        } else {
          reject('')
        }
      })
    })
  }

  return (
    <ModalForm
      title='账户充值'
      visible={visible}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      width={500}
      submitter={{
        searchConfig: {
          submitText: '我已付款'
        },
        resetButtonProps: {
          style: {
            display: 'none'
          }
        }
      }}
      onFinish={async () => {
        message.error('请付款')
        await getStatus()
      }}
    >
      <div>充值账户：{data?.platform?.accountName}</div>
      <div style={{marginTop: 20}}>账户号码：{data?.platform?.sn}</div>
      <div style={{margin: '20px 0'}}>现有余额：￥{amountTransform(data?.platform?.balance, '/')}</div>
      <div style={{marginBottom: 20}}>支付方式：支付宝</div>
      <div>
        请使用支付宝扫码付款充值
        <QRCodeCanvas
          value={payInfo?.expend?.payInfo}
          size={128}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"Q"}
          includeMargin={false}
          imageSettings={{
            src: "https://pro-yeahgo-oss.yeahgo.com/publicMobile/files/zfb_logo.png",
            height: 30,
            width: 30,
            excavate: true,
          }}
        />
      </div>
    </ModalForm>
  )
}

export default YeahgoVirtualAccountManagement
