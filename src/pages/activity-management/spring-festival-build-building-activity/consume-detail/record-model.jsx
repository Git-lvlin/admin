import React, { useEffect } from 'react';
import { Form,Button,List } from 'antd';
import ProForm, {
  ModalForm
} from '@ant-design/pro-form';
import { AgentShopDelete,accountDetail } from '@/services/daifa-store-management/list'
import styles from './style.less'
import { InfoCircleOutlined,QuestionCircleOutlined} from '@ant-design/icons';
import { useState } from 'react';
import { amountTransform } from '@/utils/utils'

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
  const { visible, setVisible, callback,storeNoId,onClose} = props;
  const [amount,setAmount]=useState()
  useEffect(()=>{
    accountDetail({accountType:'agentStore',accountId:storeNoId?.data?.storeNo}).then(res=>{
      setAmount(amountTransform(res.data?.commission, '*'))
    })
  },[])
  return (
    <ModalForm
      title='提现记录：'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
          onClose();
        }
      }}
      className={styles.cancel_model}
      submitter={{
        render: (props, defaultDoms) => {
          return [
                <Button  key="cancel" onClick={() =>setVisible(false)}>
                 知道了
                </Button>
          ];
        },
        }}
        onFinish={async (values) => {
        }}
      {...formItemLayout}
    >
      <List
        size="small"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        bordered
        // dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />

    </ModalForm >
  );
};