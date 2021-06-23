import React from 'react'
import ProDescriptions from '@ant-design/pro-descriptions'
import { PageContainer } from '@ant-design/pro-layout'
import { useParams, history } from 'umi'
import { 
  Button,
  message, 
  Popconfirm,
  Space 
} from 'antd'
import {
  ModalForm,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-form'

import { 
  withdrawPageDetail, 
  audit,
  payment 
} from "@/services/financial-management/transaction-detail-management"
import './styles.less'
import styles from './styles.less'
import { amountTransform } from '@/utils/utils'

const PopModalForm = ({sn}) => {
  const check = (val) => {
    audit({...val,sn}).then(res=> {
      if(res?.success) {
        message.success('提交成功')
      }
    })
  }
  return(
    <ModalForm
      layout='inline'
      title='审核'
      width={600}
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
          valueEnum={{
            0: '审核不通过',
            1: '审核通过'
          }}
        />
      </div>
      <ProFormTextArea
        name='reason'
        label='备注'
        width='lg'
        rules={[{required: true, message: '请输入备注'}]}
        fieldProps={{
          showCount: true,
          maxLength: 30
        }}
      />
    </ModalForm>
  )
}
const PopModal = ({sn, paymentType}) => {
  return(
    <Popconfirm
      title="确定执行本次对公/对私提现吗?"
      onConfirm={()=>{
        payment({sn, paymentType}).then(res=> {
          if(res?.success) {
            message.success('提交成功')
          }
        })
      }}
      okText="确定"
      cancelText="取消"
    >
      <Button>执行</Button>
    </Popconfirm>
  )
}
const Detail = () => {
  const { id } = useParams()
  const back = ()=> {
    history.goBack()
  }
  const columns = [
    {
      title: '提现会员信息',
      dataIndex: 'userInfo',
      render: (_, records) => (
        <div>
          {records?.accountId}
          <span>（手机：{records?.registMobile}）</span>
        </div>
      )
    },
    {
      title: '提现时间',
      dataIndex: 'createTime'
    },
    {
      title: '提现虚拟账户',
      dataIndex: 'account_sn'
    },
    {
      title: '可提现余额',
      dataIndex: 'balanceAvailable'
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
      title: '提现类型',
      dataIndex: 'bankAcctType',
      valueEnum: {
        'business': '对公',
        'person': '对私'
      }
    },
    {
      title: '提现含手续费金额',
      dataIndex: 'amount',
      render: (_) => `￥${amountTransform(_, '/')}`
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
      render: (_, records)=>(
        <>
          <div>{_}</div>
          <div>差额：{records?.feeDifference}</div>
        </>
      )
    },
    {
      title: '提现状态',
      dataIndex: 'status',
      render: (_, records) => (
        <Space size='large'>
          <PopModalForm sn={records?.sn}/>
          <PopModal sn={records?.sn} paymentType={records?.paymentType}/>
        </Space>
      )
    },
    {
      title: '审核日志',
      dataIndex: 'log',
      render: (_, records)=>(
        <>
          <div>审核时间：{records?.auditTime}（{records?.auditUserId}）</div>
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
    }
  ]
  return (
    <PageContainer title={false}>
      <ProDescriptions
        column={2}
        columns={columns}
        style={{
          background:'#fff',
          padding: 20
        }}
        bordered
        params={{id}}
        request={withdrawPageDetail}
      />
      <div style={{background: '#fff', padding: 20}}>
        <Button type='primary' onClick={()=>{back()}}>返回</Button>
      </div>
    </PageContainer>
  )
}

export default Detail
