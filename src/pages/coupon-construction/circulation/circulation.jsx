import React, { useState} from 'react';
import {FormattedMessage,connect} from 'umi';
import styles from '../style.less'
import ProForm,{ProFormText,ProFormRadio} from '@ant-design/pro-form';

const circulation=props=>{
    const { DetailList,face}=props
    let {id}=props
    const [summoney,setSummoney] = useState(0);
    const [position,setPosition]=useState()
    const sumMoney=e=>{
        setSummoney(e.target.value)
    }
    const checkConfirm=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)) {
            await reject('不能输入小数')
        } else {
            await resolve()
        }
        })
    }
    return(
        <>
         <ProFormRadio.Group
                name="circulation"
                label={<FormattedMessage id="formandbasic-form.circulation" />}
                // rules={[{ required: true, message: '请选择发行量' }]}
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                {
                    label:<FormattedMessage id="formandbasic-form.issued.quantity" />,
                    value: 1,
                },
                ]}
            />
            {
                position==1||DetailList.data?.issueQuantity?
                    <div className={styles.unfold}>
                        <ProForm.Group>
                            <ProFormText 
                                name="issueQuantity"
                                fieldProps={{
                                    onChange: (e) => sumMoney(e),
                                    }}
                                placeholder="请输入拟发行的总数量"
                                rules={[
                                    {validator: checkConfirm}
                                ]} 
                            />
                            <span>张</span>
                        </ProForm.Group>
                        <p>优惠券发行总金额为<span className={styles.compute }>{summoney*face||(parseInt(id)==id)&&DetailList.data?.issueQuantity*parseInt(DetailList.data?.couponAmountDisplay)}</span>元</p>
                    </div>
                :null
            }
        </>
    )
}

export default connect(({ DetailList}) => ({
    DetailList,
  }))(circulation);
  