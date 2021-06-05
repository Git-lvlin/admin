import React, { useState, useRef,useEffect } from 'react';
import { adminCircleList } from '@/services/community-management/circle-admincirclelist';
import { releaseDynamic } from '@/services/community-management/dynamic-releasedynamic';
import { listSystemVirtualMember } from '@/services/community-management/memberInfo-listSystemVirtualMember';
import ProForm, { ProFormSwitch,ProFormTextArea,ProFormSelect} from '@ant-design/pro-form';
import { history } from 'umi';
import { message, Form } from 'antd';
import Upload from '@/components/upload';

export default props => {
  const [onselect,setOnselect]=useState([])
  const [virtual,setVirtual]=useState([])
  //会员昵称下拉接口调用
  useEffect(()=>{
    adminCircleList({}).then(res=>{
          setOnselect(res.data.map(ele=>(
              {label:ele.name,value:ele.id}
          )))
      })
    listSystemVirtualMember({}).then(res=>{
      console.log('res',res)
        setVirtual(res.data.map(ele=>(
            {label:ele.nickName,value:ele.id}
        )))
    })
      console.log('onselect',onselect)
  },[])
  return (
    <ProForm
        onFinish={async (values) => {
          console.log(values);
          values.images=[values.images]
          releaseDynamic(values)
          message.success('提交成功');
        }}
        style={{ width: '1000px', margin: '0 auto' }}
      >
         <ProFormSelect
            name="userId"
            label="会员昵称"
            options={virtual}
            placeholder="Please select a country"
            rules={[{ required: true, message: 'Please select your country!' }]}
        />
         <ProFormSelect
            name="circleId"
            label="发布圈子"
            options = {onselect}
            placeholder="Please select a country"
            rules={[{ required: true, message: 'Please select your country!' }]}
        />
        <ProFormTextArea
            width="md"
            name="content"
            label="分享想法"
            placeholder="用户可编辑500个字。"
        />
        <Form.Item label="上传照片" name="images">
         <Upload multiple maxCount={1} accept="image/*" dimension="1:1" size={375} />
         </Form.Item>
      </ProForm>
  );
};
