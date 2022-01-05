import React, { useEffect } from 'react';
import { Form,Button } from 'antd';
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
      title='确认提示 信息提示'
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
      className={styles.cancel_model}
      submitter={{
        render: (props, defaultDoms) => {
          return [
              <Button  key="cacnl" onClick={() =>setVisible(false)}>
                  取消注销
              </Button>,
              <Button  type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确认注销
              </Button>,
              <Button  key="submit" onClick={() =>props.form?.submit?.()}>
                强制注销
              </Button>,
              <Button  type="primary" key="cacnl" onClick={() => {
                setVisible(false)
                }}>
                  暂不注销
              </Button>
          ];
        },
        }}
        onFinish={async (values) => {
        }}
      {...formItemLayout}
    >
      <h3 className={styles.tis}>是否确定强制注销店铺？</h3>
      <p className={styles.ation}>注销后店铺将不能继续使用，请确认！</p>
      <h3 className={styles.tis}>此店铺余额大于等于5.00元，暂时无法注销</h3>
      <p className={styles.ation}>店铺账号余额小于5元时才可注销</p>
    </ModalForm >
  );
};