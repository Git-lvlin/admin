import React, { useState} from 'react';
import { ModalForm,ProFormText,ProFormRadio} from '@ant-design/pro-form';
import { Button, message } from 'antd';
import { changeStatus } from '@/services/intensive-activity-management/penny-activity';
import { history,connect } from 'umi';
import { ExclamationCircleFilled } from '@ant-design/icons';

const formItemLayout = {
    labelCol: { span: 6 },
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
    const {record,visible,setVisible,callback,onClose}=props

    return (
        <ModalForm
          onVisibleChange={setVisible}
          title={<p>编辑1分钱活动商品可用库存 <span style={{color:'#D8D8D8'}}>{record?.goodsName}（spuID：{record?.spuId}/skuID：{record?.skuId}）</span></p>}
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
              <Button  key="cacnl" onClick={() =>{setVisible(false);onClose()}}>
                  取消
              </Button>,
              <Button  type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确定
              </Button>
              ];
          },
          }}
          onFinish={async (values) => {
            //   await 
          }}
          {...formItemLayout}
      >
       <ProFormText
          width="md"
          name="name"
          label='当前集约活动可用库存'
        />
        <ProFormText
          width="md"
          name="name"
          label='当前1分钱活动可用库存'
        />
        <ProFormRadio.Group
            name="goodsType"
            label='操作类型'
            options={[
            {
                label:'增加活动库存',
                value: 1,
                // disabled:choose==4||(parseInt(id)==id )&&DetailList.data?.memberType==4
            },
            {
                label: '减少活动库存',
                value: 2,
            }
            ]}

        />
        <ProFormText
          width="md"
          name="name"
          label='操作后1分钱活动可用库存'
        />
        <ProFormText
          width="md"
          name="name"
          label='操作后集约活动可用库存'
        />
      </ModalForm>
    )
}

