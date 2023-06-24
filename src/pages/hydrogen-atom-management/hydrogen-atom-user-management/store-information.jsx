import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProList from '@ant-design/pro-list';
import { queryLogPage, queryById } from "@/services/user-management/hydrogen-atom-user-management"
import { useEffect, useState } from 'react';

const formItemLayout = {
    labelCol: { span: 4 },
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

export default (props) => {
  const { visible, setVisible,msgDetail,onClose,type} = props;
  const [form] = Form.useForm();
  const [duraMax,setDuraMax]= useState()
  useEffect(()=>{
    queryById({id:msgDetail?.id}).then(res=>{
      if(res?.code === 0){
        setDuraMax(res.data)
      }
    })
  },[])
  return (
    <DrawerForm
      title={`${msgDetail?.memberPhone} 免费使用氢原子记录`}
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render:()=>{
            return []
        }
      }}
      onFinish={()=>{
        return false
      }}
      {...formItemLayout}
    >
      <p style={{ padding:'10px 10px',background:"#B6B6B6",color:'#fff' }}>免费使用次数：{duraMax?.freeTimes}次  已使用 {duraMax?.usedTimes}次</p>
      <ProList
        search={false}
        rowKey="name"
        request={queryLogPage}
        params={{
          freeUseId:msgDetail?.id,
        }}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
        }}
        split={true}
        metas={{
          title: {
            dataIndex: 'createTime',
          },
          description: {
            dataIndex: 'timeSum',
            render:(_)=>{
              return <p>使用时长：{_}分钟</p>
            }
          },
          actions:{
            render:(text, row)=>(
            <div>
              <p style={{float:'right',color:'#262626'}}>设备ID：{row?.imei}</p><br/>
              <p style={{color:'#999999',float:'right'}}>设备所属店主：{row?.memberPhone} <br/>店铺编号：{row?.shopMemberAccount}</p>
            </div> 
            )
          }
        }}
      />
    </DrawerForm >
  );
};