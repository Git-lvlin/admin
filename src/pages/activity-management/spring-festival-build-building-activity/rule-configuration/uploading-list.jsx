import React, { useState} from 'react';
import { ModalForm,ProFormText} from '@ant-design/pro-form';
import { message,Form,List,Button } from 'antd';
import { couponInviteEnd } from '@/services/activity-management/share-red-packet-activity';
import { history,connect } from 'umi';
import { PlusOutlined } from '@ant-design/icons';

export default props=>{
    const {endId,visible,setVisible,canBlack}=props
    const checkConfirm = (rule, value, callback) => {
        return new Promise(async (resolve, reject) => {
          if (value && !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(value)) {
            await reject('请输入正确的手机号')
          }else {
            await resolve()
          }
        })
      }
    return (
        <ModalForm
          title="上传白名单"
          key={endId}
          onVisibleChange={setVisible}
          visible={visible}
          submitter={{
          render: (props, defaultDoms) => {
              return [
              ...defaultDoms
              ];
          },
          }}
          onFinish={async (values) => {
              const prizePhones=values.prizeNotice.map(ele=>(ele.phone)).toString()
              canBlack(prizePhones)
              setVisible(false) 
          }}
        initialValues={{
        prizeNotice:[{
            phone: ''
        }],
        }}
      >
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
                          <Button style={{ marginLeft: 10, width: 80,color:'#D9001B',border:'1px solid #D9001B' }} onClick={() => { remove(field.name) }} danger>
                            删除
                          </Button>}
                      >
                          <ProFormText
                            {...field}
                            name={[field.name, 'phone']}
                            fieldKey={[field.fieldKey, 'phone']}
                            placeholder='输入用户手机号'
                            key="2"
                            fieldProps={{
                              style: {
                                width: 328
                              },
                              maxLength:11
                            }}
                            rules={[
                              { required: true, message: '请设置奖品预告' },
                              {validator: checkConfirm}
                            ]}
                          />
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
      </ModalForm>
    )
}

