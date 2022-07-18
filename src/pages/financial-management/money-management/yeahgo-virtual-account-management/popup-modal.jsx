import React, { useState, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProCard from '@ant-design/pro-card'
import { ModalForm, ProFormText, ProFormCaptcha, ProFormRadio, ProFormSelect } from '@ant-design/pro-form'
import { Button, message } from 'antd'

import { findAllBanks, bind, unbind } from '@/services/financial-management/yeahgo-virtual-account-management'
import styles from './styles.less'

const { Group } = ProFormRadio

const PopUnbind = ()=> {
  return(
    <div>确定需要解绑吗？</div>
  )
}

const PopBind = ({data, bankList})=> {
  return(
    <>
      <ProFormText
        name="cardName"
        initialValue={data?.operation?.accountName}
        label="商家主体名称"
        width="md"
        readonly
      />
      <p className={styles.txt}>对公账户的绑定仅支持此商家主体名下银行账户，对私账户的绑定仅支持此商家主体法人代表名下的银行账户</p>
      <Group
        name="bankAcctType"
        label="账户性质"
        rules={[
          {
            required: true,
            message: '请选择账户性质'
          }
        ]}
         options={[
           {
             label: '公司户',
             value: 'business',
           },
           {
             label: '个人户',
             value: 'person',
           }
         ]}
      />
      <ProFormText
        width="md"
        name="realname"
        label="账户名称"
        rules={[
          {
            required: true,
            message: '请输入账户名称',
          }
        ]}
        placeholder="请输入账户名称"
      />
      <ProFormSelect
        width="md"
        label="开户银行"
        name="bankName"
        options={bankList?.map(item => (
          {label: item.bankName, value: item.bankCode}
        ))}
        rules={[
          {
            required: true,
            message: '请选择开户银行',
          }
        ]}
      />
      <ProFormText
        width="md"
        name="cardNo"
        label="账户号码"
        rules={[
          {
            required: true,
            message: '请输入账户号码',
          }
        ]}
        placeholder="请输入账户号码"
      />
    </>
  )
}

const PopModal = ({val, change, num})=> {
  const [bankList, setBankList] = useState([])

  useEffect(()=> {
    findAllBanks().then(res=> {
      setBankList(res?.data)
    })
    return ()=> {
      setBankList([])
    }
  },[])
  const btnContent = ()=> {
    if(val?.operation?.bindCard?.cardNo) {
      return '解绑'
    } else {
      return '帐户绑定'
    }
  }

  const btnText = ()=> {
    if(val?.operation?.bindCard?.cardNo) {
      return '解绑'
    } else {
      return '用户绑定'
    }
  }

  const submitCode = (v)=> {
    return new Promise((resolve, reject) => {
      if(val?.operation?.bindCard.cardNo) {
        unbind({
          id: val?.operation?.bindCard?.id,
          accountType: val?.operation?.bindCard?.accountType,
          accountId: val?.operation?.bindCard?.accountId
        }).then(res=> {
          if(res?.success) {
            change(num + 1)
            message.success('提交成功')
            resolve()
          } else {
            reject()
          }
        })
      } else {
        const bankObj = bankList.filter(item=> item.bankCode === v.bankName)[0]
        bind({
          ...v,
          bankCode: bankObj.bankCode,
          bankName: bankObj.bankName
        }).then(res=> {
          if(res?.success) {
            change(num + 1)
            message.success('提交成功')
            resolve()
          } else {
            reject()
          }
        })
      }
    })
  }
  return (
    <ModalForm
      title={btnContent()}
      layout='horizontal'
      width={val?.operation?.bindCard?.cardNo ? 300 : 650}
      trigger={
        <Button type="default">{btnText()}</Button>
      }
      modalProps={{
        destroyOnClose: true,
        centered: true
      }}
      onFinish={async (values) => {
        await submitCode(values)
        return true
      }}
    >
      {
        val?.operation?.bindCard?.cardNo ? 
        <PopUnbind data={val}/>: 
        <PopBind data={val} bankList={bankList}/>
      }
    </ModalForm>
  )
}

export default PopModal