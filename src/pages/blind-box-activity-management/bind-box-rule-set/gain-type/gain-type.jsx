import React, { useState } from 'react';
import { connect } from 'umi';
import styles from '../style.less'
// import Circulation from '../circulation/circulation'
import ProForm, { ProFormText, ProFormSelect,ProFormRadio,ProFormDependency } from '@ant-design/pro-form';

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
            label:'满减红包',
            value: 1,
        },
        {
            label: '折扣红包',
            value: 2,
        },
        {
            label: '立减红包',
            value: 3,
        }
    ]
    // const options2=[
    //     {
    //         label: '满减红包',
    //         value: 1
    //     },
    // ]
    return (
        <>
            <ProFormText
                width={120}
                label="开盲盒机会获取途径"
                readonly
                initialValue=" "
            />
            <ProFormRadio.Group
                name="couponType"
                label='1、邀请好友'
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 2,
                    }
                ]}
            />
            <ProFormDependency name={['couponType']}>
                {({ couponType }) => { 
                if(!couponType||couponType==2) return null
                if(couponType==1){
                    return  <div className={styles.unfold}>
                                <ProFormSelect
                                    name="unit"
                                    initialValue={1}
                                    options={[
                                        {
                                            value: 1,
                                            label: '每邀请1位新用户注册获得1次',
                                        },
                                        {
                                            value: 2,
                                            label: '每邀请2位新用户注册获得1次',
                                        },
                                        {
                                            value: 3,
                                            label: '每邀请3位新用户注册获得1次',
                                        },
                                        {
                                            value: 4,
                                            label: '每邀请4位新用户注册获得1次',
                                        },
                                        {
                                            value: 5,
                                            label: '每邀请5位新用户注册获得1次',
                                        },
                                        {
                                            value: 8,
                                            label: '每邀请8位新用户注册获得1次',
                                        },
                                        {
                                            value: 10,
                                            label: '每邀请10位新用户注册获得1次',
                                        }
                                    ]}
                                />
                                <ProForm.Group>
                                <span>此任务每天最高可获得</span>
                                <ProFormText
                                    width={100}
                                    name="usefulAmount"
                                    rules={[
                                        {validator: checkConfirm}
                                    ]}
                                />
                                <span>次</span>
                                </ProForm.Group>
                                <ProForm.Group>
                                    <span>中奖概率</span>
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
                                    <span>%，大于等于0，小于100的最多两位小数，必填。</span>
                                </ProForm.Group>
                            </div>
                }
              }}
            </ProFormDependency>
            <ProFormRadio.Group
                name="couponType2"
                label='2、每日签到'
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 2,
                    }
                ]}
            />
            <ProFormDependency name={['couponType2']}>
                {({ couponType2 }) => { 
                if(!couponType2||couponType2==2) return null
                if(couponType2==1){
                    return  <div className={styles.unfold}>
                                <ProFormSelect
                                    name="unit"
                                    initialValue={2}
                                    options={[
                                        {
                                            value: 2,
                                            label: '每连续到2天获得1次',
                                        },
                                        {
                                            value: 3,
                                            label: '每连续到3天获得1次',
                                        },
                                        {
                                            value: 4,
                                            label: '每连续到4天获得1次',
                                        },
                                        {
                                            value: 5,
                                            label: '每连续到5天获得1次',
                                        },
                                        {
                                            value: 7,
                                            label: '每连续到7天获得1次',
                                        },
                                        {
                                            value: 15,
                                            label: '每连续到15天获得1次',
                                        }
                                    ]}
                                />
                                <ProForm.Group>
                                    <span>中奖概率</span>
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
                                    <span>%，大于等于0，小于100的最多两位小数，必填。</span>
                                </ProForm.Group>
                            </div>
                }
              }}
            </ProFormDependency>
            <ProFormRadio.Group
                name="couponType3"
                label='3、订单消费'
                fieldProps={{
                  onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 2,
                    }
                ]}
            />
            <ProFormDependency name={['couponType3']}>
                {({ couponType3 }) => { 
                if(!couponType3||couponType3==2) return null
                if(couponType3==1){
                    return  <div className={styles.unfold}>
                                <ProFormSelect
                                    name="unit"
                                    initialValue={1}
                                    options={[
                                        {
                                            value: 1,
                                            label: '每日首次消费1笔获得1次',
                                        },
                                        {
                                            value: 2,
                                            label: '每日首次消费2笔获得1次',
                                        },
                                        {
                                            value: 3,
                                            label: '每日首次消费3笔获得1次',
                                        },
                                        {
                                            value: 4,
                                            label: '每日首次消费4笔获得1次',
                                        },
                                        {
                                            value: 5,
                                            label: '每日首次消费5笔获得1次',
                                        }
                                    ]}
                                />
                                <ProForm.Group>
                                    <span>中奖概率</span>
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
                                    <span>%，大于等于0，小于100的最多两位小数，必填。</span>
                                </ProForm.Group>
                            </div>
                }
              }}
            </ProFormDependency>

        </>
    )
}
export default connect(({ DetailList }) => ({
    DetailList
}))(couponType);