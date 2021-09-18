import React, { useState } from 'react';
import { connect } from 'umi';
import styles from '../style.less'
import Circulation from '../circulation/circulation'
import ProForm, { ProFormText, ProFormSelect,ProFormRadio } from '@ant-design/pro-form';

const couponType = (props) => {
    let { id,Discounts,type } = props
    let { DetailList } = props
    const [flag, setFlag] = useState()
    const [discounts, setDiscounts] = useState('');
    const [coupons, setCoupons] = useState('');
    const [immediately, setImmediately] = useState('');
    const [position,setPosition]=useState()
    const [face1,setFace1]=useState()
    const [face3,setFace3]=useState()
    const [most,setMost]=useState()
    const [fullSubtract,setFullSubtract]=useState()
    const onDiscounts = e => {
        setDiscounts(e.target.value)
        setFace1(e.target.value)
    }
    const onCoupons = e => {
        setCoupons(e.target.value)
    }
    const onImmediately = e => {
        setImmediately(e.target.value)
        setFace3(e.target.value)
    }
    const toggle = val => {
        setFlag(val)
    }
    const checkConfirm=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
            await reject('只能输入整数')
        } else {
            await resolve()
        }
        })
    }
    const checkDiscounts=(rule, value, callback)=>{
        return new Promise(async (resolve, reject) => {
        if(value&&value>=10){
            await reject('折扣不能大于等于10')
        }else if(value&&!/^[0-9]+(.[0-9]{0,2})?$/.test(value)){
            await reject('最多输入两位小数点')
        }else {
            await resolve()
        }
        })
    }
    const options=[
        {
            label:'满减券',
            value: 1,
        },
        {
            label: '折扣券',
            value: 2,
        },
        {
            label: '立减券',
            value: 3,
        }
    ]
    const options2=[
        {
            label: '满减红包',
            value: 4
        },
    ]
    return (
        <>
            <ProFormRadio.Group
                name="couponType"
                label='优惠券类型'
                rules={[{ required: true, message: '请选择优惠券类型' }]}
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={type==3?options2:options}
            />
            {
                position==1||(parseInt(id)==id )&&DetailList.data?.couponType==1?
                <div style={{display:position==2||position==3?'none':'block'}} className={styles.unfold}>
                    <ProForm.Group>
                    <span>使用门槛: 活动商品满</span>
                    <ProFormText
                        width={100}
                        name="usefulAmount"
                        rules={[
                            {validator: checkConfirm}
                        ]}
                    />
                    <span>元 （如果设置为0，则无使用门槛)</span>
                    </ProForm.Group>
                    <ProForm.Group>
                        <span>优惠内容 : 减免</span>
                        <ProFormText 
                            name="freeAmount"
                            fieldProps={{
                                onChange: (e) => onDiscounts(e)
                                }}
                            width={100}
                            rules={[
                                {validator: checkConfirm}
                            ]} 
                        />
                        <span>元</span>
                    </ProForm.Group>
                    <p>
                        优惠券面值
                        <span className={styles.compute}>
                            {discounts||(parseInt(id) == id) && DetailList.data?.couponAmountDisplay}
                        </span> 
                        元
                    </p>
                </div>
                :null
            }
            {
                position==2||(parseInt(id)==id )&&DetailList.data?.couponType==2?
                <div style={{display:position==1||position==3?'none':'block'}} className={styles.unfold}>
                 <ProForm.Group>
                    <span>使用门槛 : 活动商品满</span>
                    <ProFormText
                        width={100}
                        name={flag == 2 ? 'usefulNum' : 'usefulAmount'}
                        fieldProps={{ onChange: (val) => setFullSubtract(val.target.value) }}
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <ProFormSelect
                        name="unit"
                        initialValue={1}
                        fieldProps={{ onChange: (val) => { toggle(val) } }}
                        options={[
                            {
                                value: 1,
                                label: '元',
                            },
                            {
                                value: 2,
                                label: '件',
                            },
                        ]}
                        width={100}
                        placeholder="元"
                    />
                    <span>（如果设置为0，则无使用门槛）</span>
                </ProForm.Group>
                <ProForm.Group>
                    <span>优惠内容: </span>
                    <ProFormText 
                        name="freeDiscount"
                        fieldProps={{
                            onChange: (e) => onCoupons(e)
                        }}
                        width={100}
                        rules={[
                            {validator: checkDiscounts}
                        ]} 
                    />
                    <span>折，最多优惠</span>
                    <ProFormText
                        width={100}
                        name="maxFreeAmount"
                        rules={[
                            {validator: checkConfirm}
                        ]}
                        fieldProps={{
                            onChange: (e) =>setMost(e.target.value)
                        }} 
                    />
                    <span>元 （不填写则不作限制） </span>
                </ProForm.Group>
                <p>
                    优惠券面值
                    <span className={styles.compute}>
                        {coupons ? coupons: ''||(parseInt(id) == id) && DetailList.data?.couponAmountDisplay ?DetailList.data?.freeDiscount: ''}
                    </span> 
                    折券
                </p>
                </div>
                :null
            }
            {
                position==3||(parseInt(id)==id )&&DetailList.data?.couponType==3?
                <div style={{display:position==1||position==2?'none':'block'}} className={styles.unfold}>
                  <ProForm.Group>
                    <span>使用门槛 :订单金额满</span>
                    <ProFormText
                        width={100}
                        name='usefulAmount'
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span>元 （如果设置为0，则无使用门槛）</span>
                </ProForm.Group>
                <ProForm.Group>
                    <span>优惠内容 : 可立减</span>
                    <ProFormText 
                        name="freeAmount"
                        fieldProps={{
                            onChange: (e) => onImmediately(e),
                            }}
                        width={100}
                        rules={[
                            {validator: checkConfirm}
                        ]} 
                    />
                    <span>元</span>
                </ProForm.Group>
                <p>
                    优惠券面值
                    <span className={styles.compute}>
                        {immediately||(parseInt(id) == id) && DetailList.data?.couponAmountDisplay}
                    </span> 
                    元
                </p>
                </div>
                :null
            }
             {/* {
                position==4||(parseInt(id)==id )&&DetailList.data?.couponType==4?
                <div className={styles.unfold}>
                    <ProForm.Group>
                    <span>使用门槛: 满</span>
                    <ProFormText
                        width={100}
                        name="usefulAmount"
                        rules={[
                            {validator: checkConfirm}
                        ]}
                    />
                    <span>元， （填写0，则无使用门槛）</span>
                    </ProForm.Group>
                    <p>红包面值：随机</p>
                    <ProForm.Group>
                        <span>随机取值范围：</span>
                        <ProFormText 
                            name="freeAmount"
                            fieldProps={{
                                onChange: (e) => onDiscounts(e)
                                }}
                            width={100}
                            rules={[
                                {validator: checkConfirm}
                            ]} 
                        />
                        <span>到</span>
                        <ProFormText 
                            name="freeAmount"
                            fieldProps={{
                                onChange: (e) => onDiscounts(e)
                                }}
                            width={100}
                            rules={[
                                {validator: checkConfirm}
                            ]} 
                        />
                        <span>元</span>
                    </ProForm.Group>
                    <p>示例：输入1到3元，则用户领取红包金额从1-3元里随机取值，只可输入整数</p>
                </div>
                :null
            } */}
            {/* 发行量 */}
            {
            type == 2 ?
                <ProFormRadio.Group
                    name="issueQuantity"
                    label='发行量' 
                    options={[
                        {
                        label: '不限量发放',
                        value: 1
                        }]}
                />
                :
                <Circulation 
                    id={id} 
                    face1={face1} 
                    face3={face3} 
                    most={most} 
                    coupons={coupons} 
                    fullSubtract={fullSubtract} 
                    pcType={position}
                    // type={type}
                />
            }
        </>
    )
}
export default connect(({ DetailList }) => ({
    DetailList
}))(couponType);