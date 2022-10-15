import React, { useRef, useEffect, useState } from 'react';
import { message, Form, List, Button, Switch, Image } from 'antd';
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
import styles from './detail.less';

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
  const [previewVisible, setPreviewVisible] = useState(false);
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
    callback();
    setVisible(false)
  };

  useEffect(() => {
    if (detailData?.id) {
      const { ...rest } = detailData;
      form.setFieldsValue({
        ...rest,
      })
    }
  }, [form, detailData])

  return (
    <ModalForm
      title={<p>二级类目 <span style={{color:'#B3B2B2',fontSize:'10px'}}>辅助信息</span></p>}
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
      }}
      {...formItemLayout}
    >
      <ProFormText
        name="categoryName"
        label="一级类目"
        readonly
      />
      <Form.Item label='二级类目'>
        <div className={styles.box_wrap}>
          {
            detailData?.items?.map(ele=>{
              return <div className={styles.box}>
                      <div>{ele?.categoryName}</div>
                      <div>
                      <a onClick={() => { setPreviewVisible(true); }}>查看此分类商品</a>
                      <Image
                        width={200}
                        style={{ display: 'none' }}
                        src={ele?.icon}
                        preview={{
                          visible: previewVisible,
                          src: ele?.icon,
                          onVisibleChange: value => {
                            setPreviewVisible(value)
                          },
                        }}
                      />
                      </div>
                     </div>
            })
          }
        </div>
      </Form.Item>
    </ModalForm>
  );
};