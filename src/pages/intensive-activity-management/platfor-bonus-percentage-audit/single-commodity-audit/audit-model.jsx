import React, { useEffect } from 'react';
import { Form } from 'antd';
import ProForm, {
  ProFormTextArea,
  ProFormRadio,
  ProFormText,
  ProFormDependency,
  ModalForm
} from '@ant-design/pro-form';
import * as api from '@/services/product-management/product-category'
import styles from './style.less'

const formItemLayout = {
    labelCol: { span: 4 },
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

export default (props) => {
  const { visible, setVisible, callback,formDetail} = props;
  useEffect(() => {
  }, [])
  return (
    <ModalForm
      title='请确认审核商品平台额外奖励占比设置（商品名称：哇哈哈矿泉水；商品分类：百货美食）'
      onVisibleChange={setVisible}
      visible={visible}
      width={1000}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          setVisible(false)
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return [
            ...defaultDoms
            ];
        },
        }}
        onFinish={async (values) => {
        }}
      className={styles.audit_model}
      {...formItemLayout}
    >
        <ProFormText
            width={250}
            label={<p>设置商品的店主<br/>额外奖励占比</p>}
            name="name"
            readonly={true}
            // labelCol={6}
            fieldProps={{
                value:<>
                       <p className={styles.percent}>90%</p>
                       <p>运营中心占平台额外奖励<span className={styles.percent}>10%</span></p>
                      </>
            }}
        />
         <ProFormText
            width={250}
            label={<p>商品现有所属分类的<br/>店主额外奖励占比</p>}
            name="name"
            readonly={true}
            // labelCol={5}
            fieldProps={{
                value:<>
                       <p className={styles.award}>80%</p>
                       <p>运营中心占平台额外奖励<span className={styles.award}>10%</span></p>
                      </>
            }}
        />
         <ProFormRadio.Group
                name="couponType"
                label='审核结果'
                rules={[{ required: true, message: '请审核' }]}
                options={[
                    {
                        label:'通过',
                        value: 1,
                    },
                    {
                        label: '拒绝',
                        value: 0,
                    },
                ]}
                initialValue={0}
            />
         <ProFormDependency name={['couponType']}>
                {({ couponType }) => { 
                if(couponType) return null
                if(couponType==0){
                    return   <ProFormTextArea
                                label='拒绝理由'
                                name="couponRule"
                                style={{ minHeight: 32, marginTop: 15 }}
                                placeholder='请输入拒绝理由 5-200个字以内 汉字、大小字母和常见标点符号'
                                rules={[{ required: true, message: '请输入拒绝理由' }]}
                                rows={4}
                                fieldProps={{
                                    minLength:5,
                                    maxLength:200
                                }}
                            />
                }
              }}
            </ProFormDependency>
    </ModalForm >
  );
};