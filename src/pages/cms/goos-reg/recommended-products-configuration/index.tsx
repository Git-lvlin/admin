import { useState, useRef,useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import { Form, message, Button, Space,Spin} from 'antd';

import { getGoodsConfig, setGoodsConfig } from "@/services/cms/member/goos-reg"
import ProCard from "@ant-design/pro-card"
import ProForm, { ProFormRadio } from '@ant-design/pro-form'
import styles from './style.less'

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

const ChatRecommendedProductRestrictionSwitch = (props) => {
  const { activeKey } = props
  const [form] = Form.useForm()
  const ref=useRef()

  useEffect(() => {
    getGoodsConfig({ code:'chatTab' }).then(res=>{
      if(res.code==0){
        console.log('res',res)
        form.setFieldsValue({
          switch:`${res.data.switch}`
        })
      }
    })

  }, [])

  const onsubmit = (values) => {
    const params={
      code: 'chatTab',
      content: {
        switch: parseInt(values.switch)
      }
    }
    setGoodsConfig(params).then(res=>{
      if(res.code==0){
        message.success('保存成功')
      }
    })
  }

  return (
    <ProForm
     form={form}
     layout="horizontal"
     {...formItemLayout}
     formRef={ref}
     submitter={
      {
        render: (props, defaultDoms) => {
          return [
            <Space className={styles.submit}>
                <Button type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                  }}>
                  保存
                </Button>
            </Space>
          ];
        }
      }
    }
    onFinish={async (values) => {
        await onsubmit(values);
        return true;
    }}
    className={styles.recommended_products_configuration}
  >
    {
      activeKey=='1'&&<ProFormRadio.Group
        name="of"
        label='选择聊天可发送平台推荐商品的角色'
        layout="vertical"
        options={[
            {
                label:'所有用户，即不限制',
                value: '1',
            },
            {
                label: '仅限群聊内发送，且发送人限群主',
                value: '2',
            },
            {
                label: '群聊内仅限群主发送，单聊不限制发送',
                value: '3',
            },
        ]}
    />
    }

    {
      activeKey=='2'&&
      <ProFormRadio.Group
          name="switch"
          label='APP端用户聊天发送商品里的平台推荐商品'
          layout="vertical"
          options={[
              {
                  label:'固定显示',
                  value: '1',
              },
              {
                  label: '固定不显示',
                  value: '2',
              },
              {
                  label: '没有商品时不显示，有商品时显示',
                  value: '3',
              },
          ]}
      />
    }
  </ProForm >
  )
}


export default ()=>{
  const [activeKey, setActiveKey] = useState<string>('1')
  return (
    <PageContainer title={false}>
      <ProCard
          tabs={{
            type: 'card',
            activeKey,
            onChange: setActiveKey
          }}
        >
          <ProCard.TabPane key="1" tab="聊天推荐商品限制">
            {
              activeKey=='1'&&<ChatRecommendedProductRestrictionSwitch activeKey={activeKey} />
            }
          </ProCard.TabPane>
          <ProCard.TabPane key="2" tab="聊天推荐商品显示开关">
            {
              activeKey=='2'&&<ChatRecommendedProductRestrictionSwitch activeKey={activeKey}/>
            }
          </ProCard.TabPane>
    </ProCard>
  </PageContainer>
  )
}