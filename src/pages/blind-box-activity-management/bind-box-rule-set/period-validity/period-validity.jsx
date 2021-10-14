import React from 'react';
import ProForm,{ ProFormText,ProFormDateTimeRangePicker,ProFormDependency,ProFormRadio} from '@ant-design/pro-form';
import styles from '../style.less'

export default (props)=>{
    const {id,falg}=props
    return (
        <>
        <ProFormRadio.Group
            name="validiteType"
            label='盲盒机会有效期'
            rules={[{ required: true, message: '请选择有效期限' }]}
            options={[
                {
                    label:'限时',
                    value: 1,
                },
                {
                    label:'活动期限内有效',
                    value: 0,
                }
            ]}
            readonly={id} 
        />
        <ProFormDependency name={['validiteType']}>
            {({ validiteType }) => {
                if (!validiteType) return null
                if (validiteType==1){
                    return ( 
                    <div className={styles.unfold}>
                        <ProForm.Group>
                            <span>获得机会</span>  
                            <ProFormText
                                width={100}
                                name="validiteHour"
                                readonly={id} 
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