import React,{useState} from 'react';
import { FormattedMessage,connect } from 'umi';
import ProForm,{ ProFormRadio,ProFormDependency} from '@ant-design/pro-form';
import UseCollect from './use-collect'
import { Radio } from 'antd';
import UseSecond from './use-second'
import { useEffect } from 'react';

const useScope=props => {
    const {DetailList,id,choose,form,type}=props
    const [position,setPosition]=useState(false)
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
                options={[
                    {
                        label:<FormattedMessage id="formandbasic-form.Secret.Garden" />,
                        value: 1,
                    },
                    // {
                    //     label: <FormattedMessage id="formandbasic-form.container.number" />,
                    //     value: 2,
                    // },
                ]} 
            />
             {
                position==1||(parseInt(id)==id )&&DetailList.data?.useType==1||choose==4?
                <div style={{display:position==2?'none':'block'}}>
                  <UseSecond type={type} id={id} choose={choose} form={form}/>
                </div>
                :null
            }

            {/* <ProFormDependency name={['useType']}>
              {({ useType }) => { 
                  if(useType==1||choose==4){
                      return  <UseSecond type={type} id={id} choose={choose} form={form}/>
                  }
                //   if(useType==2){
                //       return  <UseCollect id={id}/>
                //   }
              }}
            </ProFormDependency> */}
            
        </>
    )
}
export default connect(({ DetailList}) => ({
    DetailList,
  }))(useScope);