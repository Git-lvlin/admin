import { useEffect } from 'react';
import { Form, message, Image } from 'antd';
import {
  ProFormText,
  ModalForm,
  ProFormTextArea,
  ProFormDependency,
  ProFormRadio
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { CumulativeProps } from './data';
import { qlfAuditDetail, qlfAudit } from '@/services/supplier-management/supplier-list'

const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 14 }
  };

export default (props:CumulativeProps) => {
  const { visible, setVisible, msgDetail, callback } = props;
  const [form] = Form.useForm();
  const waitTime = (values: {} | undefined) => {
    const res = qlfAudit(values);
    if (res) {
      res.then((res) => {
        if (res.code == 0) {
          message.success('操作成功');
          callback(values);
          setVisible(false);
        }
      });
    }
  };
  
  useEffect(()=>{
    const res = qlfAuditDetail({supId:msgDetail?.supId, goodsQlfId: msgDetail?.goodsQlfId, gc: msgDetail?.gc});
    if (res) {
      res.then((res) => {
        if (res.code == 0) {
          form.setFieldsValue(res.data)
        }
      });
    }
  },[msgDetail])
  return (
    <ModalForm
      layout="horizontal"
      title={<span>质检报告 审核 （供应商名称：{msgDetail?.companyName}）</span>}
      onVisibleChange={setVisible}
      visible={visible}
      form={form}
      modalProps={{
        forceRender: true,
        destroyOnClose: true,
        onCancel: () => {
        }
      }}
      onFinish={async (values) => {
        await waitTime(values);
        return true;
      }}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '关闭',
        }
      }}
      {...formItemLayout}
    >
      <ProFormText
        label='经营需资质的分类'
        name="gcDesc"
        readonly
      />
      <ProFormText
        label='资质编号'
        name="qlfNumber"
        readonly
      />
      
      <Form.Item
        label="资质证书"
        name="qlfImg"
        >
        <Image src={msgDetail?.qlfImg} />
      </Form.Item>

      <ProFormRadio.Group
        name="auditStatus"
        label="审核结果"
        options={[
            {
                value: '1',
                label: '审核通过',
            },
            {
                value: '2',
                label: '审核拒绝',
            },
            ]}
        rules={[
            {
                required: true,
                message: '请选择审核结果',
            },
            ]}
        />

        <ProFormDependency name={['auditStatus']}>
            {({ auditStatus }) => {
                return auditStatus === '2' ? (
                    <ProFormTextArea
                        label='拒绝理由'
                        name="auditReason"
                        fieldProps={{
                            maxLength:30,
                            minLength:5,
                            placeholder:'请输入拒绝理由，5-30个字符'
                        }}
                    />
                ) : null;
            }
            }
        </ProFormDependency>
      <ProFormText
        name="supId"
        hidden
      />
      <ProFormText
        name="goodsQlfId"
        hidden
      />
      <ProFormText
        name="gc"
        hidden
      />
    </ModalForm >
  );
};
