import React, { useState, useRef,useEffect } from 'react';
import { findAdsensePositionById } from '@/services/community-management/adsense-position-byid';
import { saveAdsensePosition } from '@/services/community-management/adsense-position';
import  ProForm,{ ModalForm,ProFormRadio,ProFormText} from '@ant-design/pro-form';
import { Button,Form, Tabs,message } from 'antd';

export default (props)=>{
    const {boxref,visible,setVisible,form,byid,record}=props
    useEffect(()=>{
        if(byid){
            findAdsensePositionById({id:record&&record.id}).then(res=>{
                form.setFieldsValue(res.data)
            })
        }
    },[])
    return (
        <ModalForm
            title="编辑广告位"
            key="model2"
            onVisibleChange={setVisible}
            visible={visible}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
        >
        <ProForm  
          form={form}
          // submitter={false}
          onFinish={async (values) => {
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
        }}
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
        </ProForm>
    </ModalForm>
    )
}