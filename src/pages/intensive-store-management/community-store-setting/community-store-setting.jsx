import React, { useState, useRef,useEffect } from 'react';
import { Input, Form, message,Button,InputNumber,Spin,Space,Switch} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { getMemberShopDeliveryCoverage,setMemberShopDeliveryCoverage } from '@/services/intensive-store-management/community-store-setting';
import ProForm, { ProFormSwitch } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './style.less'
import './style.less'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

 

export default (props) =>{
  const [form] = Form.useForm();
  const [kmNum,setKmNum]=useState()
  // const [coverage,setCoverage]=useState()
  
  useEffect(() => {
    getMemberShopDeliveryCoverage({}).then(res=>{
      console.log('res',res)
      form.setFieldsValue({
        defaultDeliveryCoverage:res.data?.settingValues?.defaultDeliveryCoverage/1000,
        outOffForbidden:res.data?.settingValues?.outOffForbidden===1?true:false,
        switch:res.data?.settingValues?.switch==='off'?true:false
      })
      // setCoverage(res.data?.settingValues?.defaultDeliveryCoverage/1000)
    })
  }, [])
  const onsubmit=values=>{
     console.log('values',values)

  }
 
  return (
    <PageContainer>
      <ProForm
        form={form}
        onFinish={async (values)=>{
            await  onsubmit(values);
          return true;
         } }
         {...formItemLayout} 
        submitter={false}
        className={styles.community_store}
      >
        <ProForm.Group>
          <span>默认社区店配送范围</span>
          {/* <Button className={styles.add_subtract} onClick={()=>setKmNum(6)}>-</Button> */}
            {/* <Form.Item style={{margin:0}} name="defaultDeliveryCoverage"> */}
              <InputNumber 
                min={0.2} 
                max={10}
                addonBefore="+" 
                addonAfter="$"
                controls={true}
                onChange={(val)=>{
                  setMemberShopDeliveryCoverage({defaultDeliveryCoverage:val*1000}).then(res=>{
                    if(res.code==0){
                      console.log('res',res)
                    }
                  })
                }}
              />
            {/* </Form.Item> */}
            {/* <Button className={styles.add_subtract} onClick={()=>setKmNum(8)}>+</Button> */}
          <span>公里</span>
        </ProForm.Group>
        <p className={styles.hint}>店主可手动修改自己店铺的配送范围，没有修改的店主默认用此处设置的配送范围</p>
        <ProForm.Group>
          <span>超出配送范围禁止用户下单</span>
          <ProFormSwitch name="outOffForbidden"/>
        </ProForm.Group>
        <ProForm.Group>
          <span>功能是否启用</span>
          <ProFormSwitch name="switch"/>
        </ProForm.Group>
       </ProForm>
    </PageContainer>
  )
}
