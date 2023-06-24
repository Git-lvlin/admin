import React, { useState} from 'react';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { modifySpuState } from '@/services/cms/fresh-goods-sort';
import { history,connect } from 'umi';
import { ExclamationCircleFilled } from '@ant-design/icons';


const formItemLayout = {
  labelCol: { span:5 },
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

export default props=>{
    const {selectedRows,visible,setVisible,callback,onClose}=props
    const checkConfirm = (rule, value, callback) => {
      return new Promise(async (resolve, reject) => {
        if (value&&/[%&'=?$\x22]/.test(value)) {
          await reject('不可以含')
        } else {
          await resolve()
        }
      })
    }
    return (
        <ModalForm
          title='下架'
          onVisibleChange={setVisible}
          visible={visible}
          modalProps={{
            forceRender: true,
            destroyOnClose: true,
            onCancel: () => {
              onClose();
            }
          }}
          submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
          }}
          onFinish={async (values) => {
            console.log('selectedRows',selectedRows)
            modifySpuState({spuIds:selectedRows.toString(),...values}).then(res=>{
            if(res.code==0){
              setVisible(false) 
              callback(true) 
              message.success('操作成功')
              return true;
            }
          })
          }}
          {...formItemLayout}
      >
        <ProFormTextArea
          label='下架理由'
          name="remark"
          style={{ minHeight: 32, marginTop: 15 }}
          placeholder='请输入下架理由！'
          rules={[
            { required: true, message: '请输入下架理由' },
            // { validator: checkConfirm }
          ]}
          rows={4}
          fieldProps={{
              maxLength:200
          }}
      />
      </ModalForm>
    )
}

