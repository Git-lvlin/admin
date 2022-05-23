import React, { useEffect } from 'react';
import { Form,Button } from 'antd';
import ProForm, {
  ModalForm
} from '@ant-design/pro-form';
import { accountActivityAudit } from '@/services/blind-box-activity-management/blind-box-withdraw-deposit-detail';
import { CloseCircleFilled,ExclamationCircleFilled} from '@ant-design/icons';

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
  const { visible, setVisible, callback,sn,onClose} = props;
  return (
    <ModalForm
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return [
                <Button type="default" key="cancel" onClick={() =>{onClose()}}>
                 确认继续给用户提现
                </Button>,
                  <Button type="primary" key="submit" onClick={() => {
                    callback()
                }}>
                  拒绝用户提现
                </Button>
            ];
        },
        }}
        onFinish={async (values) => {
         
        }}
      {...formItemLayout}
    >
      <p><ExclamationCircleFilled style={{color:'#FBC550'}}/> 当前用户名在此活动中出现不同提现号码</p>
      <p><span style={{color:'#F2574C'}}>很可能为黑产行为</span><span style={{color:'#CCC8C8'}}>，请确认给用户提现？</span></p>
    </ModalForm >
  );
};