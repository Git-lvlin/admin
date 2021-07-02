import React, { useState,useEffect } from 'react';
import { adminCircleList } from '@/services/community-management/circle-admin-circle-list';
import { releaseDynamic } from '@/services/community-management/dynamic-release-dynamic';
import { listSystemVirtualMember } from '@/services/community-management/memberinfo-list-system-virtual-member';
import ProForm, { ProFormTextArea,ProFormSelect} from '@ant-design/pro-form';
import { history } from 'umi';
import { message, Form,Button } from 'antd';
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
          releaseDynamic(values).then(res=>{
            if(res.code==0){
              message.success('发布成功');
              history.push('/community-management/content-management')
            }
          })
        }}
        submitter={{
          render: (props, doms) => {
            console.log(props);
            return [
              <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                保存
              </Button>,
              <Button type="default" onClick={()=>history.push('/community-management/content-management')}>
                返回
              </Button>,
              
            ];
          }
        }}
        style={{ width: '1000px', margin: '0 auto' }}
      >
         <ProFormSelect
            name="userId"
            label="会员昵称"
            options={virtual}
            placeholder="请选择会员昵称"
            rules={[{ required: true, message: '请选择会员昵称' }]}
        />
         <ProFormSelect
            name="circleId"
            label="发布圈子"
            options = {onselect}
            placeholder="请选择发布圈子"
            rules={[{ required: true, message: '请选择发布圈子' }]}
        />
        <ProFormTextArea
            width="md"
            name="content"
            label="分享想法"
            placeholder="用户可编辑500个字。"
            rules={[
              { required: true, message: '请输入分享想法' },
              { validator:(rule,value,callback)=>{
                return new Promise(async (resolve, reject) => {
                if(value&&value.length>500){
                  await reject('最多500个字')
                }else {
                  await resolve()
              }
              })
              }}
            ]}
        />
        <Form.Item label="上传照片" name="images" tooltip="尺寸任意。支持图片类型：png、jpg、gif，大小不超过1M">
         <Upload code={204} multiple maxCount={1} accept="image/*" size={1024}/>
         </Form.Item>
      </ProForm>
  );
};
