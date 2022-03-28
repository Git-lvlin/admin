import React, { useEffect, useState} from 'react';
import { ModalForm,ProFormText,ProFormRadio,ProFormDependency} from '@ant-design/pro-form';
import { Button, message,Form } from 'antd';
import { changeStatus } from '@/services/intensive-activity-management/penny-activity';
import { history,connect } from 'umi';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { amountTransform } from '@/utils/utils'

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 10,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };
const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
        await reject('只能输入整数')
    } else {
        await resolve()
    }
    })
}

export default props=>{
    const {record,visible,setVisible,callback,onClose}=props
    const [form] = Form.useForm()
    const [kmNum,setKmNum]=useState()
    useEffect(()=>{
      console.log('record',record)
      form.setFieldsValue({
        ...record
      })
    },[])
    return (
        <ModalForm
          onVisibleChange={setVisible}
          title={<p>编辑特价活动商品可用库存 <span style={{color:'#D8D8D8',fontSize:'10px'}}>{record?.goodsName}（spuID：{record?.spuId}/skuID：{record?.skuId}）</span></p>}
          visible={visible}
          form={form}
          modalProps={{
            forceRender: true,
            destroyOnClose: true,
            onCancel: () => {
              onClose();
            }
          }}
          submitter={{
          render: (props, defaultDoms) => {
              return [
              <Button  key="cacnl" onClick={() =>{setVisible(false);onClose()}}>
                  取消
              </Button>,
              <Button  type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确定
              </Button>
              ];
          },
          }}
          onFinish={async (values) => {
            //   await 
          }}
          {...formItemLayout}
      >
       <ProFormText
          width="md"
          name="totalStockNum"
          label='当前集约活动可用库存'
          readonly
        />
        <ProFormText
          width="md"
          name="name"
          label='当前特价活动可用库存'
          readonly
        />
        <ProFormRadio.Group
            name="goodsType"
            label='操作类型'
            options={[
            {
                label:'增加活动库存',
                value: 1,
                // disabled:choose==4||(parseInt(id)==id )&&DetailList.data?.memberType==4
            },
            {
                label: '减少活动库存',
                value: 2,
            }
            ]}
            initialValue={1}

        />
        <ProFormDependency name={['goodsType']}>
                {({ goodsType }) => {
                    if (goodsType==1) return(
                      <ProFormText
                        name="num"
                        label='操作特价活动库存数量'
                        placeholder='请输入<=当前可用集约库存且为箱规单位量整数倍'
                        fieldProps={{
                          addonBefore:<span style={{cursor:'pointer'}} onClick={()=>setKmNum((amountTransform(Number(kmNum),'*')+100)/100)}>+</span>,
                          addonAfter:'斤',
                          onChange:(val)=>{
                            setKmNum(val)
                          },
                          value:kmNum
                        }}
                        rules={[{validator: checkConfirm}]}
                    />
                    )
                    if(goodsType==2){
                      return(
                        <ProFormText
                          name="num"
                          label='操作特价活动库存数量'
                          placeholder='请输入<=当前可用活动库存且为箱规单位量整数倍'
                          fieldProps={{
                            addonBefore:<span style={{cursor:'pointer'}} onClick={()=>setKmNum((amountTransform(Number(kmNum),'*')-100)/100)}>-</span>,
                            addonAfter:'斤',
                            onChange:(val)=>{
                              setKmNum(val)
                            },
                            value:kmNum
                          }}
                          rules={[{validator: checkConfirm}]}
                        />
                      )
                    }
                     
                }}
        </ProFormDependency>
        
        <ProFormText
          width="md"
          name="name"
          label='操作后特价活动可用库存'
          readonly
        />
        <ProFormText
          width="md"
          name="name"
          label='操作后集约活动可用库存'
          readonly
        />
      </ModalForm>
    )
}

