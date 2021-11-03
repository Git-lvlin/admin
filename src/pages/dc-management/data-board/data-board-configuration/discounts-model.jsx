import React, { useState} from 'react';
import ProForm,{ ModalForm,ProFormTextArea,ProFormText} from '@ant-design/pro-form';
import { Button,message } from 'antd';
import { history } from 'umi';



const formItemLayout = {
    labelCol: { span: 6},
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
    const {InterFace}=props
    const [visible, setVisible] = useState(false);
    const Termination=()=>{
        setVisible(true)
    }
    return (
        <ModalForm
            title='测试结果验证'
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<Button style={{marginLeft:'100px'}} type="primary" key="submit"  onClick={()=>Termination()}> 测试 </Button>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                setVisible(false) 
            }}
            {...formItemLayout}
        >
        <ProForm
            onFinish={async (values)=>{
                const {...rest}=values
                const params={
                    ...rest
                }
                InterFace(params).then(res=>{
                    if(res.code==0){
                        // setVisible(false)   
                        // message.success('操作成功')
                        // return true;    
                    }
                })
            return true;
            } }
            {...formItemLayout} 
            submitter={{
            render: (props, doms) => {
                return [
                <Button style={{margin:'30px'}} type="primary" key="submit" onClick={() => {
                    props.form?.submit?.()
                }}>
                    提交
                </Button>
                ];
            }
            }}
        >
        <ProFormText
            width="md"
            name="reportCode"
            label="接口编码"
            placeholder="输入接口编码"
            rules={[{ required: true, message: '请输入接口编码' }]}
        />
         <ProFormTextArea
            width="md"
            name="responseTemplate"
            label="请求参数"
            placeholder="请输入"
            />
        </ProForm>
    </ModalForm>
    )
}

