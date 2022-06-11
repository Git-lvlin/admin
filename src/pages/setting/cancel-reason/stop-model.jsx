import React, { useEffect } from 'react';
import { Form,message,  Button } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText
} from '@ant-design/pro-form';
import { cancelReasonUpdate,setCancelMessage} from '@/services/setting/cancel-reason';
import { ExclamationCircleOutlined,QuestionCircleOutlined} from '@ant-design/icons';


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
  const { visible, setVisible, callback,onClose,formDetail,storeType} = props;
  const [form] = Form.useForm()
  useEffect(() => {
    if(formDetail?.id){
      form.setFieldsValue({
        ...formDetail,
      })
    }else if(formDetail?.message){
      form.setFieldsValue({
        ...formDetail,
      })
    }
  }, [])
  return (
    <ModalForm
      title='确认提示'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      form={form}
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
                  {storeType=='1'?formDetail?.status==1?'暂不禁用':'暂不启用':formDetail?.status?.code==1?'暂不禁用':'暂不启用'}
              </Button>,
              <Button  type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  {storeType=='1'?formDetail?.status==1?'确认禁用':'确认启用':formDetail?.status?.code==1?'确认禁用':'确认启用'}
              </Button>
            ];
        },
        }}
        onFinish={async (values) => {
          storeType=='1'?
            setCancelMessage({status:formDetail?.status==1?0:1,...values}).then(res=>{
              if(res.code==0){
                message.success('操作成功')
                setVisible(false)
                callback(true)
              }
            })
            :
            cancelReasonUpdate({status:formDetail?.status?.code==1?2:1,...values}).then(res=>{
              if(res.code==0){
                message.success('操作成功')
                setVisible(false)
                callback(true)
              }
            })
        }}
      {...formItemLayout}
    > 

    {
      storeType=='1'?<p><QuestionCircleOutlined style={{color:'#FEA82F'}}/> {formDetail?.status==1?`是否确定禁用注销原因：${formDetail?.message} ？`:`是否确定启用注销原因：${formDetail?.message} ？`}</p>
      :
      <p><QuestionCircleOutlined style={{color:'#FEA82F'}}/> {formDetail?.status?.code==1?`是否确定禁用注销原因：${formDetail?.reason} ？`:`是否确定启用注销原因：${formDetail?.reason} ？`}</p>
    }
    {
      storeType=='1'?<p style={{color:'#999999',fontSize:'10px'}}> {formDetail?.status==1?'确认后店主注销店铺选择原因时将没有此项，请确认！':'确认后店主注销店铺选择原因时将有此项，请确认！'}</p>
      :
      <p style={{color:'#999999',fontSize:'10px'}}> {formDetail?.status?.code==1?'确认后店主注销店铺选择原因时将没有此项，请确认！':'确认后店主注销店铺选择原因时将有此项，请确认！'}</p>
    }
        
    <ProFormText 
      width="md"
      name="id"
      label="id"
      hidden
    />

    <ProFormText 
      width="md"
      name="code"
      label="code"
      hidden
    />
    </ModalForm >
  );
};