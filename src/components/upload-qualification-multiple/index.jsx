import { useRef, useEffect, useState } from 'react';
import { message, Form, Image } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ModalForm,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { qlfModifyMul } from '@/services/common';
import style from './style.less'

const SampleGraph = (props) => {
  const { visible, setVisible, exampleImg } = props;
  return (
    <ModalForm
      title="质检报告-示例图"
      onVisibleChange={setVisible}
      visible={visible}
      submitter={{
        render: false,
      }}
    >
      <Image src={exampleImg} />
    </ModalForm >
  );
};

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default (props) => {
  const { msgDetail, setVisible, visible, callback, supId, readonly = false } = props;
  const [sampleVisible, setSampleVisible] = useState(false);
  const [exampleImg, setExampleImg] = useState('');
  const formRef = useRef();
  const [form] = Form.useForm()
  const FromWrap = ({ value, onChange, content, right }) => (
    <div style={{ display: 'flex' }}>
      <div>{content(value, onChange)}</div>
      <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right()}</div>
    </div>
  )


  const onsubmit = async (values) => {
    qlfModifyMul({
      supId,
      content: values.info,
    }).then((res) => {
      if (res.code === 0) {
        message.success('操作成功');
        callback && callback(true)
        setVisible(false)
      }
    })

  };

  useEffect(() => {
    form.setFieldsValue({
      info: msgDetail,
    })
  }, [msgDetail])

  return (
    <DrawerForm
      className={style.container}
      layout='horizontal'
      title={'商品资质文件'}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      drawerProps={{
        // forceRender: true,
        // destroyOnClose: true,
        onClose: () => {
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
          return [
            defaultDoms[0],
            readonly ? null : defaultDoms[1],
          ];
        },
      }}
      onFinish={async (values) => {
        try {
          await onsubmit(values);
        } catch (error) {
          console.log('error', error)
        }
      }}
      initialValues={{
        info: []
      }}
      {...formItemLayout}
    >
      <Form.List name="info">
        {
          (fields) => {
            return fields.map(field => (
              <div key={field.name}>
                <ProFormText
                  name={[field.name, 'name']}
                  label="证书名称"
                  readonly
                />

                <ProFormText
                  width="md"
                  label="证书编号"
                  name={[field.name, 'qlfNumber']}
                  placeholder="请填写证书编号"
                  fieldProps={{
                    maxLength: 36,
                  }}
                  rules={[
                    { required: true, message: '请填写证书编号' },
                  ]}
                  readonly={readonly}
                />

                <Form.Item
                  name={[field.name, 'qlfImg']}
                  label="资质文件"
                  rules={[{ required: true, message: '请上传图片!' }]}
                  extra={!readonly && <a onClick={() => { setSampleVisible(true); setExampleImg(msgDetail[field.name].exampleImg) }}>点击查看示例文件</a>}
                >
                  <FromWrap
                    content={(value, onChange) => <Upload disabled={readonly} multiple value={value} onChange={onChange} maxCount={1} accept="image/*" />}
                    right={() => {
                      return !readonly && <dl>
                        <dt>上传说明</dt>
                        <dd>{msgDetail[field.name]?.intro}</dd>
                      </dl>
                    }}
                    value={msgDetail?.qlfImg}
                  />
                </Form.Item>
              </div>
            ))
          }
        }
      </Form.List>


      {sampleVisible &&
        <SampleGraph
          visible={sampleVisible}
          setVisible={setSampleVisible}
          exampleImg={exampleImg}
        />}

    </DrawerForm>
  );
};
