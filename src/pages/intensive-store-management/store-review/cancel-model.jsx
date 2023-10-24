import { useRef } from 'react';
import { Form, Button } from 'antd';
import {
  ModalForm,
} from '@ant-design/pro-form';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { memberShopCancelPost } from '@/services/intensive-store-management/store-review';

export default ( props) => {
  const { visible, setVisible, callback,data} = props;
  const [form] = Form.useForm();
  const ref=useRef()
  return (
    <ModalForm
      title={<p><ExclamationCircleFilled style={{color:"#FAAD14"}}/> 确认要为店铺申请注销么？</p>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      width={400}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
        }
      }}
      formRef={ref}
      submitter={{
        render: ({form})=> [
          <Button onClick={()=>form?.submit() }>确认申请注销</Button>,
          <Button type='primary' onClick={()=>setVisible(false)}>不申请注销</Button>
        ]
      }}
      onFinish={async (values) => {
        memberShopCancelPost({memberId:data.memberId,applyId:data.id}).then(res=>{
          if(res.code==0){
            setVisible(false)
            callback(true)
          }
        })
      }}
    >
     <p><span style={{ color:'red' }}>注销审核通过后将无法撤销</span>，你还要继续吗？</p>
    </ModalForm >
  );
};