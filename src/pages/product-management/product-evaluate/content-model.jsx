import React, { useRef, useEffect, useState } from 'react';
import { message, Form,Space,Button,Modal,List,Image,Divider,Avatar} from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-form';
import { history } from 'umi'
import { findContent } from '@/services/product-management/product-evaluate';


export default (props) => {
  const { setVisible, visible,id } = props;
  const formRef = useRef();
  const ref = useRef();
  const [form] = Form.useForm()
  const [dataList,setDataList]=useState()

  const onsubmit = (values) => {
  };

  useEffect(() => {
    findContent({id:id}).then(res=>{
     if(res.code==0){
      setDataList(res.data)
     }
    })
  }, [])
  return (
    <DrawerForm
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      width={1000}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
              <Button type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确认
              </Button>

            ];
          }
        }
      }
      onFinish={async (values) => {
        await onsubmit(values);
      }}
    >
      <p>{dataList?.content}</p>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={dataList?.imgs}
        renderItem={item => (
          <List.Item>
            <Image src={item}/>
          </List.Item>
        )}
      />
      <Divider />
      <List
        header={<div>商家回复</div>}
        dataSource={dataList?.applyList}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={dataList?.storeImg} />}
              title={<p>{dataList?.storeName}</p>}
              description={item.replyTime}
            />
            <Space style={{marginLeft:'20px'}}>{item.replyContent}</Space>
          </List.Item>
        )}
      />
    </DrawerForm>
  );
};