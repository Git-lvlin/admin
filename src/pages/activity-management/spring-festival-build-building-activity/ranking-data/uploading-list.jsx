import React, { useState} from 'react';
import { ModalForm,ProFormText} from '@ant-design/pro-form';
import { message,Form,List,Button } from 'antd';
import { setVirtualInvite,checkUserExist } from '@/services/activity-management/spring-festival-build-building-activity';
import { history,connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export default props=>{
    const {endId,visible,setVisible,canBlack,phones,falg}=props
    const [form] = Form.useForm()
    const [nickname,setNickname]=useState([])
    const checkConfirm = (rule, value, callback) => {
        return new Promise(async (resolve, reject) => {
          if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
            await reject('请输入正确的手机号')
          }else {
            await resolve()
          }
        })
      }
    const checkConfirm2 = (rule, value, callback) => {
      return new Promise(async (resolve, reject) => {
        if (value && !/^[0-9]*[1-9][0-9]*$/.test(value)) {
          await reject('只能输入正整数')
        }else {
          await resolve()
        }
      })
    }
    useEffect(()=>{
      if(endId){
        const prizeNotice=phones.split(',')
        form.setFieldsValue({
          prizeNotice:prizeNotice.map(ele=>({phone:ele}))
        })
      }
    },[endId,phones])
    return (
        <ModalForm
          title='上传邀请用户排名：（仅计算邀请新用户注册APP）'
          key={endId}
          form={form}
          onVisibleChange={setVisible}
          visible={visible}
          submitter={{
          render: (props, defaultDoms) => {
            if(endId&&falg){
              return []
            }
              return [
              ...defaultDoms
              ];
          },
          }}
          onFinish={async (values) => {
              const params={
                list:values.prizeNotice
              }
              setVirtualInvite(params).then(res=>{
                if(res.code==0){
                  setVisible(false) 
                  message.success('操作成功')
                }
              })
          }}
        initialValues={{
        prizeNotice:[{
            phone: '',
            inviteNums:''
        }],
        }}
      >
        {
            endId&&falg?
            <List
              itemLayout="horizontal"
              dataSource={phones.split(',').map(ele=>({phone:ele}))}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<p>{item.phone}</p>}
                  />
                </List.Item>
              )}
            />
            :
        <Form.List name="prizeNotice">
            {(fields, { add, remove }) => (
              <>
                <List
                //   bordered
                  itemLayout="horizontal"
                >
                  {fields.map((field) => {
                    return (
                      <List.Item
                        key={field.key}
                        extra={fields.length !== 1 &&
                          <Button style={{ marginLeft: 10, width: 80,color:'#D9001B',border:'1px solid #D9001B' }} onClick={() => {
                             remove(field.name) 
                             const arr=nickname.splice(field.name-1,1)
                             setNickname(arr)
                          }} danger>
                            删除
                          </Button>}
                      >
                          <ProFormText
                            {...field}
                            name={[field.name, 'phone']}
                            fieldKey={[field.fieldKey, 'phone']}
                            placeholder='输入用户手机号'
                            key="phone"
                            fieldProps={{
                              style: {
                                width: 200
                              },
                              maxLength:11,
                              onChange:(val)=>{
                                  checkUserExist({phone:val.target?.value}).then(res=>{
                                  if(res.code==0){
                                    const arr=[...nickname]
                                    if(arr[field.name]){
                                      arr[field.name]=res?.data?.nickname
                                    }else if(res?.data?.nickname){
                                      arr.push(res?.data?.nickname)
                                    }
                                    const arr2=arr.filter((item) => item!== '')
                                    setNickname(arr2)
                                  }
                                })
                              },
                            }}
                            rules={[
                              { required: true, message: '请输入用户手机号' },
                              // {validator: checkConfirm}
                            ]}
                          />
                          <span>{nickname[field.name]}</span>
                          <ProFormText
                            {...field}
                            name={[field.name, 'inviteNums']}
                            fieldKey={[field.fieldKey, 'inviteNums']}
                            placeholder='输入邀请新用户数'
                            key="inviteNums"
                            fieldProps={{
                              style: {
                                width: 200
                              },
                            }}
                            rules={[
                              { required: true, message: '输入邀请新用户数' },
                              {validator: checkConfirm2}
                            ]}
                          />
                            <ProFormText
                            {...field}
                            name={[field.name, 'activityId']}
                            fieldKey={[field.fieldKey, 'activityId']}
                            initialValue={'42'}
                            hidden
                          />
                          <span>人</span>
                      </List.Item>
                    )
                  })}
                </List>
                <Button icon={<PlusOutlined />} style={{ marginTop: 10,color:'#3986FF',border:'1px solid #3986FF' }} onClick={() => { add() }}>
                  添加
                </Button>
              </>
            )}
          </Form.List>
        }
        <p style={{marginTop:'20px'}}>*手机号必须是注册过我们约购APP平台的</p>
      </ModalForm>
    )
}

