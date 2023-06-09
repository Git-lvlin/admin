import { useRef, useEffect, useState } from 'react';
import { message, Form, Image } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormCheckbox,
  ModalForm,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { qlfModify } from '@/services/supplier-management/supplier-list';
import {  Props, Values, FromWrapProps  } from './data'

const SampleGraph = (props: Props) => {
    const { visible, setVisible, msgDetail } = props;
  
    return (
      <ModalForm
        title="质检报告-示例图"
        onVisibleChange={setVisible}
        visible={visible}
        submitter={{
          render: false,
        }}
      >
        <Image src={msgDetail?.goodsQlfImg} />
      </ModalForm >
    );
  };

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
};

export default (props:Props) => {
  const { msgDetail, setVisible, visible, callback, title } = props;
  const [sampleVisible, setSampleVisible] = useState(false);
  const formRef = useRef();
  const [form] = Form.useForm()
  const FromWrap = ({ value, onChange, content, right }:FromWrapProps) => (
    <div style={{ display: 'flex' }}>
      <div>{content(value, onChange)}</div>
      <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right()}</div>
    </div>
  )


  const onsubmit =async (values: Values) => {
    if(values.articleType.length) {
      qlfModify(values).then((res) => {
        if (res.code === 0) {
          message.success('操作成功');
          callback(true)
          setVisible(false)
        }
      })
    }

  };

  useEffect(() => {
      form.setFieldsValue({
        ...msgDetail
      })
  }, [])

  return (
    <DrawerForm
      layout='horizontal'
      title={title}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
        }
      }}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '返回',
        },
      }}
      onFinish={async (values: Values) => {
        try {
          await onsubmit(values);
        } catch (error) {
          console.log('error',error)
        }
      }}
      {...formItemLayout}
    >
        <ProFormText 
          name="name"
          label="资质名称"
          readonly
        />

        <ProFormText 
          width="md"
          name="typeDesc"
          label="资质类型"
          readonly
        />

        <ProFormText 
          width="md"
          name="gcDesc"
          label="应用类目"
          readonly
        />

        <ProFormText 
          width="md"
          name="qlfNumber"
          label="编号"
          placeholder="请填写资质证书编号"
          fieldProps={{
            maxLength: 36,
          }}
          rules={[
            { required: true, message: '请填写资质证书编号' },
          ]}
        />

       <Form.Item
          label="资质证书"
          name="qlfImg"
          rules={[{ required: true, message: '请上传图片!' }]}
          extra={<a onClick={()=>{ setSampleVisible(true) }}>点击查看示例文件</a>}
        >
        <FromWrap
          content={(value: string, onChange: (success: boolean) => void) => <Upload multiple value={value} onChange={onChange} maxCount={1} accept="image/*" />}
          right={() => {
            return (
              <dl>
                <dt>上传说明</dt>
                <dd>1、{msgDetail?.intro}</dd>
              </dl>
            );
          } } 
          value={msgDetail?.qlfImg}
          onChange={(success: boolean) => {
            if (success) {
              message.success('上传成功');
            } else {
              message.error('上传失败');
            }
          }
          }
        />
        </Form.Item>

        <ProFormCheckbox.Group
          name="articleType"
          width={400}
          fieldProps={{
            style:{
              marginLeft: '80px'
            }
          }}
          options={[
            {
              value: '1',
              label: <span style={{ color: 'red' }}>我已核对并确认资质证书编号和资质证书图标的真实有效！</span>,
            },
          ]}
        />

        <ProFormText 
          name="supId"
          label="资质名称"
          hidden
        />

        <ProFormText 
          name="goodsQlfId"
          label="资质名称"
          hidden
        />

        <ProFormText 
          name="gc"
          label="资质名称"
          hidden
        />

       {sampleVisible &&
        <SampleGraph
          visible={sampleVisible}
          setVisible={setSampleVisible}
          msgDetail={msgDetail}
          callback={()=>{}}
        />}

    </DrawerForm>
  );
};
