import React, { useState, useRef,useEffect } from 'react';
import { findAdsensePositionById } from '@/services/community-management/adsense-position-byid';
import { saveAdsensePosition } from '@/services/community-management/adsense-position';
import  ProForm,{ DrawerForm,ProFormRadio,ProFormText} from '@ant-design/pro-form';
import { Button,Form, Tabs,message } from 'antd';

export default (props)=>{
    const {boxref,visible,setVisible,form,byid,title}=props
    useEffect(()=>{
      console.log('byid',byid)
        if(byid){
            findAdsensePositionById({id:byid}).then(res=>{
                form.setFieldsValue(res.data)
            })
            
        }
    },[byid])
    const submit = (values) => {
      console.log('asda',values);
            if(byid){
              values.id=byid
            }
            saveAdsensePosition(values).then(res=>{
              if(res.code==0){
                setVisible(false)
                boxref.current.reload()
                message.success('提交成功');
                return true;
              }
      })
    }
    return (
        <DrawerForm
            title={title}
            onVisibleChange={setVisible}
            visible={visible}
            onFinish={async (values) => {
              await submit(values);
              return true;
            }}
            form={form}
        >
          <ProFormText
              width="md"
              name="title"
              label="广告位名称"
              tooltip="最长为 24 位"
              placeholder="请输入名称"
              rules={[{ required: true, message: '请输入广告位名称' }]}
          />
          <ProFormRadio.Group
              name="status"
              label="广告位状态"
              options={[
                  {
                    label: '未启用',
                    value: '0'
                  },
                  {
                    label: '已启用',
                    value: '1'
                  }
              ]}
              rules={[{ required: true, message: '请选择广告位状态' }]}

          />
    </DrawerForm>
    )
}