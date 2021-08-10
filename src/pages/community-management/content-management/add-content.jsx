import React, { useState,useEffect } from 'react';
import { miniCircleList } from '@/services/community-management/circle-admin-circle-list';
import { releaseDynamic } from '@/services/community-management/dynamic-release-dynamic';
import { listSystemVirtualMember } from '@/services/community-management/memberinfo-list-system-virtual-member';
import ProForm, { ProFormTextArea,ProFormSelect} from '@ant-design/pro-form';
import { history } from 'umi';
import { message, Form,Button } from 'antd';
import SelectProductModal from '@/components/select-product-modal'
import ProTable from '@ant-design/pro-table';
import {commonSpuList}  from '@/services/coupon-construction/coupon-common-spu-list';
import Upload from '@/components/upload';

export default props => {
  const [onselect,setOnselect]=useState([])
  const [virtual,setVirtual]=useState([])
  const [visible, setVisible] = useState(false);
  const [goods,setGoods]=useState()
  const [editLinkData,setEditLinkData]=useState()
  //会员昵称下拉接口调用
  useEffect(()=>{
    miniCircleList({}).then(res=>{
          setOnselect(res.data.map(ele=>(
              {label:ele.name,value:ele.id}
          )))
      })
    listSystemVirtualMember({}).then(res=>{
        setVirtual(res.data.map(ele=>(
            {label:ele.nickName,value:ele.id}
        )))
    })
  },[])
  const Termination=()=>{
    setVisible(true)
  }
  const columns=[
    {
      title: '商品图片',
      dataIndex: 'imageUrl',
      valueType: 'image',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
    },
    {
      title: '操作',
      render:(_, data)=>[
        <a onClick={()=>deleGoods()}>删除</a>
      ],
      ellipsis:true
    },
  ]
  const deleGoods=()=>{
    setGoods([])
   }
  return (
    <Form
        onFinish={async (values) => {
          releaseDynamic(values).then(res=>{
            if(res.code==0){
              message.success('发布成功');
              history.push('/community-management/content-management')
            }
          })
        }}
        submitter={{
          render: (props, doms) => {
            return [
              <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                保存
              </Button>,
              <Button type="default" onClick={()=>history.goBack()}>
                返回
              </Button>,
              
            ];
          }
        }}
        style={{ width: '1000px', margin: '0 auto' }}
      >
         <ProFormSelect
            width="md"
            name="userId"
            label="会员昵称"
            options={virtual}
            placeholder="请选择会员昵称"
            rules={[{ required: true, message: '请选择会员昵称' }]}
        />
         <ProFormSelect
            width="md"
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
        <Form.Item label="上传照片" name="images">
         <Upload code={204} multiple maxCount={100} accept="image/*"/>
        </Form.Item>
        <Form.Item  label="添加商品">
          <Button type="primary" onClick={Termination} style={{margin:'0 0 20px 20px'}}>
            选择商品
          </Button>
          <SelectProductModal 
            title={'添加商品'}  
            visible={visible} 
            setVisible={setVisible} 
            callback={(v) => {
              if (v.length>=2) {
                message.error('只能选择一个商品');
                return
              }
              setGoods(v)
              }}
              hideAll={true}
          />
          <ProTable
            rowKey="id"
            search={false}
            toolBarRender={false}
            columns={columns}
            dataSource={goods||editLinkData}
            style={{display:visible?'none':'block'}}
          />
        </Form.Item>
      </Form>
  );
};
