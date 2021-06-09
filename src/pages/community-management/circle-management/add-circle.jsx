import React, { useEffect } from 'react';
import { circleInsert,circleDetail } from '@/services/community-management/circle-insert';
import { circleUpdateCircle } from '@/services/community-management/circle-update-circle';
import ProForm, { ProFormTextArea,ProFormText,ProFormRadio} from '@ant-design/pro-form';
import { history } from 'umi';
import { message, Form } from 'antd';
import Upload from '@/components/upload';

export default props => {
 let id = props.location.query.id
 const [form] = Form.useForm()
 useEffect(()=>{
   if(id){
    circleDetail({id}).then(res=>{
      form.setFieldsValue(res.data)
    })

   }
   return undefined
 })
  return (
    <ProForm
        onFinish={async (values) => {
          console.log(values);
          if(id){
            values.id=id
            circleUpdateCircle(values).then(res=>{
              if(res.code==0){
                history.push('/community-management/circle-management')
                message.success('提交成功');
              }
            })
          }else{
            circleInsert(values).then(res=>{
              if(res.code==0){
                history.push('/community-management/circle-management')
                message.success('提交成功');
              }
            })
          }
         
        }}
        form={form}
        params={{}}
        style={{ width: '1000px', margin: '0 auto' }}
      >
        <ProFormText
            width="md"
            name="name"
            label="圈子名称"
            tooltip="最长为 24 位"
            rules={[{ required: true, message: '请输入圈子名称' }]}
        />
        <ProFormTextArea
            width="md"
            name="describe"
            label="圈子描述"
            rules={[{ required: true, message: '请输入圈子描述' }]}
        />
        <Form.Item label="圈子ICON" name="logo" rules={[{ required: true, message: '请上传图片' }]} >
         <Upload multiple maxCount={1} accept="image/*" dimension="1:1" size={375} />
         </Form.Item>
        <ProFormRadio.Group
            name="hot"
            label="是否加为热门圈子"
            rules={[{ required: true, message: '请选择是否热门' }]}
            initialValue={false}
            options={[
                {
                label: '是',
                value: true
                },
                {
                label: '否',
                value: false
                },
            ]}
            />
      </ProForm>
  );
};
