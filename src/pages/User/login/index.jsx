import {
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { Alert } from 'antd';
import React from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { connect } from 'umi';
import { Button } from 'antd';
import styles from './index.less';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status } = userLogin;

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.title_wrap}>
        <div className={styles.logo}>
          <img />
        </div>
        <div className={styles.title}>
          约购运营管理平台
          <div>始终以数据增长为唯一目标</div>
        </div>
      </div>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          searchConfig: {
            resetText: '重置',
            submitText: '提交',
          },
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
          submitButtonProps: {},
          render: (props, doms) => {
            return (
              <div className={styles.submit_wrap}>
                <Button size="large" style={{ marginBottom: 10, width: '100%' }} key="1" type="primary" onClick={() => props.form?.submit?.()}>
                  登录
                </Button>
                <ProFormCheckbox noStyle name="autoLogin">
                  记住账号密码
                </ProFormCheckbox>
              </div>
            )
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        {status === 'error' && !submitting && (
          <LoginMessage
            content={'账户或密码错误'}
          />
        )}
        <ProFormText
          name="userName"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder='请输入账号'
          rules={[
            {
              required: true,
              message: "请输入账号",
            },
          ]}
        />

        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder='请输入密码'
          rules={[
            {
              required: true,
              message: '请输入密码'
            },
          ]}
        />

        <div style={{ display: 'flex' }}>
          <ProFormText
            name="userName"
            fieldProps={{
              size: 'large',
              prefix: <SafetyCertificateOutlined className={styles.prefixIcon} />,
            }}
            placeholder='请输入图形验证码'
            rules={[
              {
                required: true,
                message: "请输入图形验证码",
              },
            ]}
          />
          <img />
        </div>
      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
