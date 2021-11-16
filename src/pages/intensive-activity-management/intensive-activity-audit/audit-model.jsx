import React, { useState} from 'react';
import { ModalForm,ProFormTextArea} from '@ant-design/pro-form';
import { Button,message } from 'antd';
import { history } from 'umi';

const formItemLayout = {
    labelCol: { span:4 },
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
    const {type,text,InterFace,title,label,id}=props
    const [visible, setVisible] = useState(false);
    const Termination=()=>{
        setVisible(true)
    }
    return (
        <ModalForm
            title={title}
            key={id}
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<Button style={{background:type==2?'red':'',color:'#fff',marginLeft:'50px'}} type={type==1?"primary":"default"}  onClick={()=>Termination()}>{label}</Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                InterFace({wsId:id,type:type,...values},{ showSuccess: true }).then(res=>{
                    if(res.code==0){
                        setVisible(false)   
                        history.goBack()
                        return true;    
                    }
                })
            }}
            {...formItemLayout}
        >
        {
            type==1?
            <p>{text}</p>
            :
            <ProFormTextArea
                width="md"
                name="rejectionReason"
                label="驳回理由"
                placeholder="请输入驳回理由 30个字以内"
                rules={[
                    { required: true, message: '请输入驳回理由' },
                    {
                        validator: (rule, value, callback) => {
                            return new Promise(async (resolve, reject) => {
                                if (value && value.length > 30) {
                                    await reject('30个字符以内')
                                } else {
                                    await resolve()
                                }
                            })
                        }
                    }
                ]}
            />
        }
        
    </ModalForm>
    )
}

