import { Form } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProList from '@ant-design/pro-list';
// import { queryLogPage, queryById } from "@/services/user-management/hydrogen-atom-user-management"
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
    // queryById({id:msgDetail?.id}).then(res=>{
    //   if(res?.code === 0){
    //     setDuraMax(res.data)
    //   }
    // })
  },[])
  return (
    <DrawerForm
      title={` 店铺 ${msgDetail?.memberPhone}深2-012  绑定套餐订单明细`}
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
      <p style={{ padding:'10px 10px',background:"#B6B6B6",color:'#fff' }}>店主：{duraMax?.freeTimes}   绑定套餐订单数： {duraMax?.usedTimes}单</p>
      <ProList
        search={false}
        rowKey="name"
        // request={queryLogPage}
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
              return <p>200{_}次</p>
            }
          },
          actions:{
            render:(text, row)=>(
            <div>
              <p style={{float:'right',color:'#262626'}}>订单金额：{row?.imei}</p><br/>
              <p style={{color:'#999999',float:'right'}}>订单号：{row?.memberPhone} <br/>下单人：{row?.shopMemberAccount}</p>
            </div> 
            )
          }
        }}
      />
    </DrawerForm >
  );
};
