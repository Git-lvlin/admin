import React, { useState, useEffect } from 'react'
import ProDescriptions from '@ant-design/pro-descriptions'
import { PageContainer } from '@/components/PageContainer'
import { useParams, history } from 'umi'
import {
  Button,
  message,
  Space
} from 'antd'
import {
  ModalForm,
  ProFormSelect,
  ProFormTextArea,
  ProFormText
} from '@ant-design/pro-form'
import { LoadingOutlined } from "@ant-design/icons"

import {
  withdrawPageDetail,
  audit,
  payment
} from "@/services/financial-management/transaction-detail-management"
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

const PopModal = ({sn, callback, types}) => {
  const [type,setType] = useState('online')

  const typeEnum = {
    'online': '线上转帐',
    'offline': '线下转账'
  }

  const submit = async (val) => {
    return new Promise((resolve, reject) => {
      payment({ ...val, sn }).then(res => {
        if (res.code === 0) {
          callback()
          setType('online')
          message.success('提交成功')
          resolve()
        } else {
          reject()
        }
      })
    })
  }
  return (
    <ModalForm
      layout='inline'
      title='执行'
      width={500}
      trigger={<Button>执行</Button>}
      modalProps={{
        destroyOnClose: true,
        onCancel: ()=>{
          setType('online')
        }
      }}
      onFinish={async (values) => {
        await submit(values)
        return true
      }}
    >
      <div className={styles.opinion}>
        <ProFormSelect
          width='md'
          name="paymentType"
          label="提现类型"
          rules={[{required: true, message: '请选择提现类型'}]}
          fieldProps={{
            onChange:(e)=> {
              setType(e)
            }
          }}
          valueEnum={ typeEnum }
        />
      </div>
      {
        type==='offline'&&
        <ProFormText 
          label="付款凭证"
          width="md"
          name='voucher'
          rules={[{required: true, message: '请输入付款凭证'}]}
        />
      }
    </ModalForm>
  )
}

const PopModalForm = ({sn, callback}) => {
  const [choosed, setChoosed] = useState('1')

  const choose =(value)=> {
    setChoosed(value)
  }
  
  const check = (val) => {
    return new Promise((resolve, reject) => {
      audit({ ...val, sn }).then(res => {
        if (res.code === 0) {
          callback()
          message.success('提交成功')
          resolve()
        } else {
          reject()
        }
      })
    })
  }
  return (
    <ModalForm
      layout='inline'
      title='审核'
      width={600}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setChoosed('1')
      }}
      trigger={<Button>审核</Button>}
      onFinish={async (values) => {
        await check(values)
        return true
      }}
    >
      <div className={styles.opinion}>
        <ProFormSelect
          width='md'
          name="isSuccess"
          label="选择"
          rules={[{ required: true, message: '请选择' }]}
          fieldProps={{
            onChange: (v)=> choose(v)
          }}
          valueEnum={{
            0: '审核不通过',
            1: '审核通过'
          }}
        />
      </div>
      {
        choosed === '0' &&
        <ProFormTextArea
          name='reason'
          label='备注'
          width='lg'
          rules={[{ required: true, message: '请输入备注' }]}
          fieldProps={{
            showCount: true,
            maxLength: 30
          }}
        />
      }
    </ModalForm>
  )
}

const Detail = () => {
  const [data, setData] = useState({})
  const {id} = useParams()

  const getData = async () => {
    await withdrawPageDetail({
      id
    }).then(res=> {
      setData(res.data)
    })
  }

  useEffect(()=> {
    getData()
  }, [id])

  const SwitchStatus = ({ type }) => {
    const { status, sn } = type
    switch (status) {
      case 'auditing':
        return <PopModalForm sn={sn} callback={()=> getData()}/>
      case 'waitPay':
        return <PopModal sn={sn} callback={()=> getData()} types={data.withdrawType}/>
      case 'arrived':
        return '已到账'
      case 'unPass':  
        return '审核不通过'
      case 'paid':
        return '已打款'
      case 'failure':
        return <Space size={10}>提现失败 <PopModal sn={sn} callback={()=> getData()} types={data.withdrawType}/></Space>
      default:
        return '状态错误'
    }
  }
  const back = () => { window.history.back(); setTimeout(() => { window.location.reload(); }, 200) }
  const skipToDetail = (e) => {
    history.push(`/financial-management/transaction-detail-management/withdrawal-audit-management/details?amountType=available&accountType=${e.accountType}&accountId=${e.accountId}`)
  }
  const jumpToDetail = (e) => {
    history.push(`/financial-management/transaction-detail-management/withdrawal-audit-management/details?amountType=commissionAvailable&accountType=${e.accountType}&accountId=${e.accountId}`)
  }
  const columns = [
    {
      title: '提现会员信息',
      dataIndex: 'userInfo',
      render: (_, records) => (
        <div>
          {records?.accountId}
          <span>（手机：{records?.registMobile || '-'}）</span>
        </div>
      )
    },
    {
      title: '提现时间',
      dataIndex: 'createTime'
    },
    {
      title: '提现虚拟账户',
      dataIndex: 'accountSn'
    },
    {
      title: '可提现金额（提现前）',
      dataIndex: 'balanceAvailable',
      render: (_, records) => (
        <>
          <div className={styles.amount}>
            <div className={styles.available}>
              <div>货款：￥{amountTransform(records.beforeBalanceAvailable, '/')}</div>
              <div>提成：￥{amountTransform(records.beforeCommissionAvailable, '/')}</div>
              <div>总计：￥{amountTransform(records.beforeTotalAvailable, '/')}</div>
            </div>
            <Space direction="vertical" size={5}>
              <Button onClick={()=>skipToDetail(records)}>货款明细</Button>
              <Button onClick={()=>jumpToDetail(records)}>提成明细</Button>
            </Space>
          </div>
          
        </>
      )
    },
    {
      title: '银行账户名称',
      dataIndex: 'realName'
    },
    {
      title: '所属银行',
      dataIndex: 'bankName'
    },
    {
      title: '银行账户',
      dataIndex: 'withdrawAccount'
    },
    {
      title: '账户类型',
      dataIndex: 'bankAcctType',
      valueEnum: {
        'business': '公司户',
        'person': '个人户'
      }
    },
    {
      title: '本次提现金额',
      dataIndex: 'amount',
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '提现类型',
      dataIndex: 'withdrawType',
      valueEnum: {
        'goodsAmount': '货款提现',
        'commission': '收益提现',
        'youfuCommission': '收益提现'
      }
    },
    {
      title: '提现手续费',
      dataIndex: 'fee',
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '实际提现到账',
      dataIndex: 'realAmount',
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '薪宝手续费',
      dataIndex: 'realFee',
      render: (_, records) => (
        <>
          <div>{amountTransform(_, '/').toFixed(2)}</div>
          <div>差额：{`￥${amountTransform(records?.feeDifference, '/').toFixed(2)}`}</div>
        </>
      )
    },
    {
      title: '提现状态',
      dataIndex: 'status',
      render: (_, records) => <SwitchStatus type={records} />
    },
    {
      title: '审核日志',
      dataIndex: 'log',
      render: (_, records) => (
        <>
          <div>审核时间：{records?.auditTime}（{records?.auditUserName}）</div>
          <div>执行时间：{records?.paymentTime}</div>
          <div>执行结果通知时间：{records?.notifyTime}</div>
        </>
      )
    },
    {
      title: '提现单号',
      dataIndex: 'sn'
    },
    {
      title: '资金流水号',
      dataIndex: 'voucher'
    },
    {
      title: '备注',
      dataIndex: 'memo'
    }
  ]
  return (
    <PageContainer title={false}>
      <ProDescriptions
        column={2}
        columns={columns}
        style={{
          background: '#fff',
          padding: 20
        }}
        bordered
        dataSource={data}
      />
      <div style={{ background: '#fff', padding: 20 }}>
        <Button type='primary' onClick={() => {back()}}>返回</Button>
      </div>
    </PageContainer>
  )
}

export default Detail
