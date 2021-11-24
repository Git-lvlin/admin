import React, { useRef, useEffect, useState } from 'react';
import { message, Form,Space,Button,Modal,List,Image,Divider} from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormTextArea
} from '@ant-design/pro-form';
import { history } from 'umi'


export default (props) => {
  const { setVisible, visible } = props;
  const formRef = useRef();
  const ref = useRef();
  const [form] = Form.useForm()

  const onsubmit = (values) => {
  };

  useEffect(() => {

  }, [])
  const data = [
    'Fender公司(还没有一个比较官方的中文名字，但大多数音乐人都习惯称其为“芬达”或“芬德”）于1946年建立，全称FenderMusical Instruments Corporation，在过去的50年中，Fender已经成为了美国的标志之一，Fender对现代音乐音色...',
    'Fender公司(还没有一个比较官方的中文名字，但大多数音乐人都习惯称其为“芬达”或“芬德”）于1946年建立，全称FenderMusical Instruments Corporation，在过去的50年中，Fender已经成为了美国的标志之一，Fender对现代音乐音色...',
    'Fender公司(还没有一个比较官方的中文名字，但大多数音乐人都习惯称其为“芬达”或“芬德”）于1946年建立，全称FenderMusical Instruments Corporation，在过去的50年中，Fender已经成为了美国的标志之一，Fender对现代音乐音色...',
    'Fender公司(还没有一个比较官方的中文名字，但大多数音乐人都习惯称其为“芬达”或“芬德”）于1946年建立，全称FenderMusical Instruments Corporation，在过去的50年中，Fender已经成为了美国的标志之一，Fender对现代音乐音色...',
    'Fender公司(还没有一个比较官方的中文名字，但大多数音乐人都习惯称其为“芬达”或“芬德”）于1946年建立，全称FenderMusical Instruments Corporation，在过去的50年中，Fender已经成为了美国的标志之一，Fender对现代音乐音色...',
  ]
  const data2 = [
    'https://images.pexels.com/photos/9737563/pexels-photo-9737563.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/9737563/pexels-photo-9737563.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/9737563/pexels-photo-9737563.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/9737563/pexels-photo-9737563.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/9737563/pexels-photo-9737563.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  ]
  
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
      <List
        // bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            {item}
          </List.Item>
        )}
      />
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
        dataSource={data2}
        renderItem={item => (
          <List.Item>
            <Image src={item}/>
          </List.Item>
        )}
      />
      <Divider />
      <ProFormTextArea
        name="remark"
        label="回复"
        placeholder="如您需要对此评价进行回复，请在此输入您要回复的内容。"
      />
    </DrawerForm>
  );
};