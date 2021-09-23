import React, { useState,useEffect} from 'react';
import {FormattedMessage,connect} from 'umi';
import styles from '../style.less'
import ProForm,{ProFormText,ProFormRadio} from '@ant-design/pro-form';

const circulation=props=>{
    const { DetailList,face1,face3,most,coupons,fullSubtract,id,pcType,type}=props
    const [summoney,setSummoney] = useState(0);
    const [position,setPosition]=useState()
    const sumMoney=e=>{
        setSummoney(e.target.value)
    }
    const checkConfirm=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
            await reject('不能输入小数')
        } else {
            await resolve()
        }
        })
    }
    const options=[
        {
            label:<FormattedMessage id="formandbasic-form.issued.quantity" />,
            value: 1,
        }
    ]
    const options2=[
        {
            label:'按总数量发行',
            value: 1,
        },
        {
            label:'不限制',
            value: 2,
        }
    ]
    return(
        <>
         <ProFormRadio.Group
                name="circulation"
                label={<FormattedMessage id="formandbasic-form.circulation" />}
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={type==3?options2:options}
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
                        <p>
                            优惠券发行总金额为
                            <span className={styles.compute }>
                                {
                                    pcType==1&&summoney*face1||
                                    pcType==3&&summoney*face3||
                                    pcType==2&&parseInt(summoney*most)||
                                    pcType==2&&summoney*fullSubtract*coupons/100||
                                    pcType==2&&summoney*parseInt(DetailList.data?.usefulAmount)*coupons/100||
                                    (parseInt(id)==id)&&DetailList.data?.issueQuantity*parseInt(DetailList.data?.couponAmountDisplay)||
                                    (parseInt(id)==id)&&DetailList.data?.issueQuantity*parseInt(DetailList.data?.maxFreeAmount)||
                                    (parseInt(id)==id)&&DetailList.data?.issueQuantity*parseInt(DetailList.data?.freeDiscount)/100*parseInt(DetailList.data?.usefulAmount)
                                }
                            </span>
                            元
                        </p>
                    </div>
                :null
            }
        </>
    )
}

export default connect(({ DetailList}) => ({
    DetailList,
  }))(circulation);
  