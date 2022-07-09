import React, { useState} from 'react';
import ProForm,{ ModalForm,ProFormTextArea,ProFormText} from '@ant-design/pro-form';
import { Button,message } from 'antd';
import { history } from 'umi';
import { amountTransform } from '@/utils/utils'


const formItemLayout = {
    labelCol: { span: 3 },
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
    const {data,InterFace,boxref}=props
    const [visible, setVisible] = useState(false);
    const Termination=()=>{
        setVisible(true)
    }
    const checkConfirm=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if (value&&value<0) {
            await reject('必须大于等于0')
        }else if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
            await reject('只能输入整数')
        }else {
            await resolve()
        }
        })
    }
    const checkConfirm2=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if (value&&value<=0) {
            await reject('必须大于0')
        }else if(value&&!/^[0-9]+(.[0-9]{0,2})?$/.test(value)){
            await reject('只能输入数字，最多输入二位小数')
        }else if(value&&value>amountTransform(data?.goodsSalePrice,'/')){
            await reject('可用红包不可大于销售价')
        }else if(value&&value>amountTransform(data?.platformProfit,'/')){
            await reject('可用红包不可大于平台利润')
        }else {
            await resolve()
        }
        })
    }
    return (
        <ModalForm
            title='满减金额设置'
            onVisibleChange={setVisible}
            visible={visible}
            trigger={<a onClick={()=>Termination()}>设置优惠</a>}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
                values.destAmount=values.destAmount*100
                values.maxDeduction=values.maxDeduction*100
                InterFace({spuId:data.spuId,...values}).then(res=>{
                    if(res.code==0){
                        setVisible(false)   
                        boxref&&boxref.current?.reload()
                        message.success('操作成功')
                        return true;    
                    }
                })
            }}
            {...formItemLayout}
        >
        <ProFormText
            width={100}
            label="SPUID"
            readonly
            fieldProps={{
                value:data?.spuId
            }}
        />
        <ProFormText
            width={100}
            label="SkUID"
            readonly
            fieldProps={{
                value:data?.skuId
            }}
        />
        <ProFormText
            width={100}
            label="商品名称"
            readonly
            fieldProps={{
                value:data?.goodsName
            }}
        />
        <ProFormText
            width={100}
            label="运营类型"
            readonly
            fieldProps={{
                value:data?.operateType==1?'秒约':data?.operateType==2?'分享补贴':'未定'
            }}
        />
        <ProFormText
            width={100}
            label="零售供货价"
            readonly
            fieldProps={{
                value:`￥${amountTransform(data?.retailSupplyPrice,'/')}`
            }}
        />
        <ProFormText
            width={100}
            label="销售价"
            readonly
            fieldProps={{
                value:`￥${amountTransform(data?.goodsSalePrice,'/')}`
            }}
        />
        <ProFormText
            width={100}
            label="平台利润"
            readonly
            fieldProps={{
                value:`￥${amountTransform(data?.platformProfit,'/')}`
            }}
        />
        <ProForm.Group>
            <span>使用门槛 : 满</span>
            <ProFormText
                width={100}
                name='destAmount'
                readonly
                fieldProps={{
                    value:'0'
                }}
                initialValue="0"
            />
            <span>元，（填写0，则无使用门槛）</span>
        </ProForm.Group>
        <ProForm.Group>
            <span>可用红包 : </span>
            <ProFormText
                width={100}
                name='maxDeduction'
                rules={[
                    { required: true, message: '请输入可用红包' },
                    {validator: checkConfirm2}
                ]} 
            />
            <span>元，（必须大于0，最多支持2位小数）</span>
        </ProForm.Group>
        <p>红包金额需小于 {data?.goodsSalePrice/100} 元</p>
        
    </ModalForm>
    )
}

