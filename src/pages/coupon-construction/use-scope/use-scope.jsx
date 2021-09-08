import React,{useState} from 'react';
import { FormattedMessage,connect } from 'umi';
import ProForm,{ ProFormRadio} from '@ant-design/pro-form';
import UseCollect from './use-collect'
import { Radio } from 'antd';
import UseSecond from './use-second'
import { useEffect } from 'react';

const useScope=props => {
    const {DetailList,id,choose,form}=props
    const [position,setPosition]=useState(false)
    const options=[
        {
            label:<FormattedMessage id="formandbasic-form.Secret.Garden" />,
            value: 1,
        },
        {
            label: <FormattedMessage id="formandbasic-form.container.number" />,
            value: 2,
        },
    ]
    const options2=[
        {
            label:<FormattedMessage id="formandbasic-form.Secret.Garden" />,
            value: 1,
        }
    ]
    useEffect(()=>{
        if(choose==4){
        form.setFieldsValue({useType:1})
        }
    },[choose])
    return (
        <>
           <ProFormRadio.Group
                name="useType"
                label={<FormattedMessage id="formandbasic-form.usable.range" />}
                rules={[ { required: true, message: '请选择使用范围' }]}
                fieldProps={{
                    onChange: (e) => setPosition(e.target.value),
                    value:choose==4?1:position||(parseInt(id)==id )&&DetailList.data?.useType,
                }}
                options={choose==4?options2:options} 
            />
            {
                position==1||(parseInt(id)==id )&&DetailList.data?.useType==1||choose==4?
                <div style={{display:position==2?'none':'block'}}>
                  <UseSecond id={id} choose={choose} form={form}/>
                </div>
                :null
            }
            {
                position==2||(parseInt(id)==id )&&DetailList.data?.useType==2?
                <div style={{display:position==1?'none':'block'}}>
                  <UseCollect id={id}/>
                </div>
                :null
            }
            
        </>
    )
}
export default connect(({ DetailList}) => ({
    DetailList,
  }))(useScope);