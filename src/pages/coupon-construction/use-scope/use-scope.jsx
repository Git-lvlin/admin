import React,{useState} from 'react';
import { FormattedMessage,connect } from 'umi';
import { ProFormRadio} from '@ant-design/pro-form';
import UseCollect from './use-collect'
import UseSecond from './use-second'

const useScope=props => {
    const {DetailList,id,choose}=props
    const [position,setPosition]=useState()
    const options=[
        {
            label:<FormattedMessage id="formandbasic-form.Secret.Garden" />,
            value: 1
        },
        {
            label: <FormattedMessage id="formandbasic-form.container.number" />,
            value: 2,
        },
    ]
    const options2=[
        {
            label:<FormattedMessage id="formandbasic-form.Secret.Garden" />,
            value: 1
        }
    ]
    return (
        <>
           <ProFormRadio.Group
                name="useType"
                label={<FormattedMessage id="formandbasic-form.usable.range" />}
                rules={[{ required: true, message: '请选择使用范围' }]}
                fieldProps={{
                onChange: (e) => setPosition(e.target.value),
                value:choose==3?1:position
                }}
                options={choose==3?options2:options}
            />
            {
                position==1||(parseInt(id)==id )&&DetailList.data?.useType==1||choose==3?
                <div style={{display:position==2?'none':'block'}}>
                  <UseSecond id={id} choose={choose}/>
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