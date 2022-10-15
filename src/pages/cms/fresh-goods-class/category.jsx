import React, { useRef, useEffect, useState } from 'react';
import { message, Form, List, Button, Switch } from 'antd';
import ProForm, {
  ModalForm,
  ProFormText,
  ProFormDigit,
  ProFormRadio,
  ProFormTextArea,
  ProFormSwitch
} from '@ant-design/pro-form';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { saveCategory2 } from '@/services/cms/fresh-goods-class';
import Upload from '@/components/upload';

const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
  </div>
)

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 14 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

export default (props) => {
  const { detailData, setVisible, onClose, visible, callback } = props;
  const formRef = useRef();
  const [form] = Form.useForm();

  const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length < 2||value.length > 4) {
        await reject('请填写自定义运营类目名称，2-4个汉字/字母')
      }
      if (value&&/[^a-zA-Z\u4e00-\u9fa5]+/g.test(value)) {
        await reject('请填写自定义运营类目名称，2-4个汉字/字母')
      }
      await resolve()
    })
  }

  const waitTime = (values) => {
    let api = saveCategory2
    const { categoryName,items,...rest } = values
    const param = {
        ...rest,
        items:items.map(ele=>({id:ele?.id,isShow:ele?.isShow,categoryName:ele?.categoryName,icon:ele?.icon}))
    }
    return new Promise((resolve, reject) => {
      api(param).then((res) => {
        if (res.code === 0) {
          callback();
          resolve(true);
        } else {
          reject(false);
        }
      })
    });
  };

  useEffect(() => {
    if (detailData?.id) {
      const { id,...rest } = detailData;
      form.setFieldsValue({
        ...rest,
        parentId:id
      })
    }
  }, [form, detailData])

  return (
    <ModalForm
      title={<p>编辑二级类目 <span style={{color:'#B3B2B2',fontSize:'10px'}}>辅助信息</span></p>}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('编辑成功');
        return true;
      }}
      {...formItemLayout}
      initialValues={{
        items:[{
            categoryName: '',
            icon:'',
            isShow:'',
        }],
      }}
    >
      <ProFormText
        name="categoryName"
        label="一级类目"
        readonly
      />
      <Form.Item label='二级类目'>
        <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                <List
                  bordered
                  itemLayout="horizontal"
                >
                  {fields.map((field) => {
                    return (
                      <List.Item
                        key={field.key}
                        extra={fields.length !== 1 &&
                          <Button style={{ marginLeft: 10, width: 80 }} onClick={() => { remove(field.name) }} type="primary" danger>
                            删除
                          </Button>}
                      >
                         <div>
                         <ProFormText
                            {...field}
                            name={[field.name, 'categoryName']}
                            fieldKey={[field.fieldKey, 'categoryName']}
                            placeholder='类目名称'
                            key="1"
                            width='xs'
                            rules={[
                              { required: true, message: '请设置类目名称' },
                              {validator: checkConfirm}
                            ]}
                            extra='2-4个汉字；'
                          />
                          <ProFormSwitch  
                            name={[field.name, 'isShow']} 
                            fieldKey={[field.fieldKey, 'isShow']}
                          />
                         </div>
                          <Form.Item style={{ marginLeft:'20px' }}  key="2" {...field} name={[field.name, 'icon']} fieldKey={[field.fieldKey, 'icon']}>
                            <FromWrap
                              content={(value, onChange) => <Upload multiple value={value} onChange={onChange} dimension="1:1"   maxCount={1} accept="image/*"  size={200} />}
                              right={(value) => {
                                return (
                                  <dl>
                                    <dt>尺寸：1:1正方形；</dt>
                                    <dd>大小：不超过200KB；</dd>
                                    <dd>格式：jpg/png/gif；</dd>
                                  </dl>
                                )
                              }}
                            />
                          </Form.Item>
                      </List.Item>
                    )
                  })}
                </List>
                <Button icon={<PlusOutlined />} style={{ marginTop: 10 }} onClick={() => { add() }}>
                  添加
                </Button>
              </>
            )}
          </Form.List>
      </Form.Item>
      <ProFormText
        name="parentId"
        label="id"
        hidden
      />
    </ModalForm>
  );
};