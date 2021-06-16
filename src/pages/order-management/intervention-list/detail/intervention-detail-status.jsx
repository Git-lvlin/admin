import React, { useRef } from 'react';
import styles from './styles.less';
import { Button, message, Space } from 'antd';
import ProForm, {
  ModalForm,
  ProFormTextArea
} from '@ant-design/pro-form';

import { interventionSentence } from '@/services/order-management/intervention-list';

import Upload from '@/components/upload';

const AfterState = ({ stage }) => {
  const status = () => {
    switch(stage){
      case 1:
        return '介入申请'
      case 2:
        return '介入退款'
      default:
        return '订单不存在'
    }
  }
  return (
    <div className={styles.detailTitle}>
      { status() }
    </div>
  )
}

const InterventionDetailStatus = props => {
  const { stage, orderId, id, status } = props
  const formRef = useRef()

  const Modal = props => {
    const { 
      title,
      btnType,
      winnerRole
     } = props
    return(
      <ModalForm
        layout="inline"
        title={title}
        width={600}
        formRef={formRef}
        trigger={
          <Button size="large" type={btnType}>{title}</Button>
        }
        modalProps={{
          onCancel: () => formRef.current?.resetFields()
        }}
        onFinish={(values)=>{
          let { platformEvidenceImg } = values
          platformEvidenceImg =  Array.isArray(platformEvidenceImg) ? platformEvidenceImg.join(',') : platformEvidenceImg
          interventionSentence({
            id: id,
            winnerRole: winnerRole,
            ...values,
            platformEvidenceImg
          }).then(res=>{
            if(res.success){
              message.success('提交成功')
              return true
            }
          })
          return true
        }}
      >
        <div className={styles.opinion}>
          <ProFormTextArea
            label="处理意见"
            name="platformOpinion"
            rules={[
              {
                required: true,
                message: '请输入处理意见'
              }
            ]}
            fieldProps={{
              showCount: true,
              maxLength: 200
            }}
          />
        </div>
        <ProForm.Item
          name="platformEvidenceImg"
          label="处理凭证"
        >
          <Upload multiple maxCount={3} accept="image/*" size={1 * 1024} />
        </ProForm.Item>
      </ModalForm>
    )
  }

  return (
    <div className={styles.interventionDetail}>
      <div>
        <div className={styles.detailTag}>
          售后单号
          <span>{orderId}</span>
        </div>
        <AfterState stage={stage} />
      </div>
      {
        !status &&
        <div className={styles.submitBtn}>
          <Space size='large'>
            <Modal title='买家败诉' btnType='default' winnerRole={2}/>
            <Modal title='买家胜诉' btnType='primary' winnerRole={1}/>
          </Space>
        </div>
      }
    </div>
  )
}

export default InterventionDetailStatus