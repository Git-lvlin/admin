import { useEffect, useState } from 'react';
import { Form,List } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import { userLists,accountCheckAccount } from "@/services/office-management/office-management-list"

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
  const { visible, setVisible, callback,msgDetail,onClose} = props;
  const [form] = Form.useForm();
  const [detailList,setDetailList]=useState()
  useEffect(()=>{
    accountCheckAccount({accountId:msgDetail?.accountId,userName:msgDetail?.userName}).then(res=>{
      if(res.code==0){
        setDetailList(res.data)
      }
    })

  },[])
  return (
    <DrawerForm
      title={`普通社区店（ID:${msgDetail?.agencyId}）`}
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
      onFinish={async (values) => {
        const params={
          memberId:values.memberId,
          withdrawAccount:values.withdrawAccount,
          withdrawRealname:values.withdrawRealname
        }
        bindingUpdate(params).then(res=>{
          if(res.code==0){
            setVisible(false)
            callback(true)
          }
        })
      }}
      {...formItemLayout}
    >
       {/* <List
        itemLayout="horizontal"
        // dataSource={detailList}
        renderItem={item => (
        <List.Item>
            <List.Item.Meta
            title={
                <> 
                <p>支付宝账号：{item?.withdrawAccount}</p>
                <p>支付宝真实姓名：{item?.withdrawRealname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>绑定时间：{moment(parseInt(item?.createTime)).format('YYYY-MM-DD HH:mm:ss')}</span></p>
                </>
            }
            />
        </List.Item>
        )}
       /> */}
    </DrawerForm >
  );
};