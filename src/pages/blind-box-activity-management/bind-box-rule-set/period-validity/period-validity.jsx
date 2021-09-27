import React from 'react';
import { FormattedMessage, formatMessage,connect } from 'umi';
import { Input, Form, Divider, message, Button,Space } from 'antd';
import moment from 'moment';
import ProForm,{ ProFormText,ProFormDateTimeRangePicker,ProFormDependency,ProFormRadio} from '@ant-design/pro-form';
import styles from '../style.less'

const validity=(props)=>{
    let {id,DetailList,type}=props
    const disabledDate=(current)=>{
        return current && current < moment().startOf('day');
    }
    return (
        <>
        {
            // type!=3||DetailList.data?.issueType != 3 && id?
                <ProFormRadio.Group
                    name="activityTimeType"
                    label='盲盒机会有效期'
                    rules={[{ required: true, message: '请选择有效期限' }]}
                    options={[
                        {
                            label:'限时',
                            value: 1,
                        },
                        {
                            label:'永久有效',
                            value: 2,
                        }
                    ]}
                />
        }
        <ProFormDependency name={['activityTimeType']}>
            {({ activityTimeType }) => {
                if (!activityTimeType||activityTimeType==2) return null
                if (activityTimeType==1){
                    return ( 
                    <div className={styles.unfold}>
                        <ProForm.Group>
                            <span>获得机会</span>  
                            <ProFormText
                                width={100}
                                name="activityEndDay"
                            />
                            <span>小时内可用</span>
                        </ProForm.Group>
                        <p className={styles.give}>超出有效期后将收回用户过期的开盒机会</p>
                    </div>
                    );
                }
                }}
        </ProFormDependency>
        </>
    )
}
export default connect(({ DetailList}) => ({
    DetailList,
  }))(validity);