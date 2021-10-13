import React, { useState } from 'react';
import { connect } from 'umi';
import styles from '../style.less'
// import Circulation from '../circulation/circulation'
import ProForm, { ProFormText, ProFormSelect,ProFormRadio,ProFormDependency } from '@ant-design/pro-form';

export default (props) => {
    const {id,falg}=props
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
    return (
        <>
            <ProFormText
                width={120}
                label="开盲盒机会获取途径"
                readonly
                fieldProps={{
                    value:' ',
                 }}
                
            />
            <ProFormRadio.Group
                name="switch1"
                label='1、邀请好友'
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 0,
                    }
                ]}
                rules={[{ required: true, message: '请设置邀请状态' }]}
                readonly={id&&falg}
            />
            <ProFormDependency name={['switch1']}>
                {({ switch1 }) => { 
                if(!switch1) return null
                if(switch1==1){
                    return  <div className={styles.unfold}>
                                <ProFormSelect
                                    name="inviteNum"
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
                                    readonly={id}
                                />
                                <ProForm.Group>
                                <span>此任务每天最高可获得</span>
                                <ProFormText
                                    width={100}
                                    name="dayGainMax"
                                    rules={[
                                        {validator: checkConfirm}
                                    ]}
                                    readonly={id}
                                />
                                <span>次</span>
                                </ProForm.Group>
                                <ProForm.Group>
                                    <span>中奖概率</span>
                                    <ProFormText 
                                        name="probability1"
                                        width={100}
                                        rules={[
                                            {validator: checkConfirm}
                                        ]} 
                                        readonly={id&&falg}
                                    />
                                    <span>%，大于等于0，小于100的最多两位小数，必填。</span>
                                </ProForm.Group>
                            </div>
                }
              }}
            </ProFormDependency>
            <ProFormRadio.Group
                name="switch2"
                label='2、每日签到'
                options={[
                    {
                        label:'开启',
                        value: 1,
                    },
                    {
                        label: '关闭',
                        value: 0,
                    }
                ]}
                readonly={id&&falg}
                rules={[{ required: true, message: '请设置签到状态' }]}
            />
            <ProFormDependency name={['switch2']}>
                {({ switch2 }) => { 
                if(!switch2) return null
                if(switch2==1){
                    return  <div className={styles.unfold}>
                                <ProFormSelect
                                    name="signInNum"
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
                                    readonly={id}
                                />
                                <ProForm.Group>
                                    <span>中奖概率</span>
                                    <ProFormText 
                                        name="probability2"
                                        width={100}
                                        rules={[
                                            {validator: checkConfirm}
                                        ]} 
                                        readonly={id&&falg}
                                    />
                                    <span>%，大于等于0，小于100的最多两位小数，必填。</span>
                                </ProForm.Group>
                            </div>
                }
              }}
            </ProFormDependency>
            <ProFormRadio.Group
                name="switch3"
                label='3、订单消费'
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
                readonly={id&&falg}
                rules={[{ required: true, message: '请设置订单消费状态' }]}
            />
            <ProFormDependency name={['switch3']}>
                {({ switch3 }) => { 
                if(!switch3) return null
                if(switch3==1){
                    return  <div className={styles.unfold}>
                                <ProFormSelect
                                    name="consumeNum"
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
                                    readonly={id}
                                />
                                <ProForm.Group>
                                    <span>中奖概率</span>
                                    <ProFormText 
                                        name="probability3"
                                        width={100}
                                        rules={[
                                            {validator: checkConfirm}
                                        ]} 
                                        readonly={id&&falg}
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