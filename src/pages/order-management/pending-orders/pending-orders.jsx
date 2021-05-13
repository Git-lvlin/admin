import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormDateRangePicker } from '@ant-design/pro-form';
import { Button, Space, Radio, Row, Col } from 'antd';
import styles from './style.less';

const TableList = () => {
  return (
    <PageContainer>
      <ProForm
        style={{ backgroundColor: '#fff', padding: 10, paddingBottom: '0px' }}
        layout="inline"
        submitter={{
          render: ({ form }, doms) => {
            return (
              <div>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      form?.submit();
                    }}
                  >
                    查询
                  </Button>
                  <Button
                    onClick={() => {
                      form?.resetFields();
                    }}
                  >
                    重置
                  </Button>
                  <Button onClick={() => { exportExcel(form) }}>导出</Button>
                </Space>
              </div>
            );
          },
        }}
      >
        <ProFormText
          label="订单号"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          label="商品名称"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          label="下单用户"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          label="下单手机号"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          label="所属商家"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormDateRangePicker
          label="下单时间"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
      </ProForm>
      <Radio.Group
        style={{ marginTop: 20 }}
        buttonStyle="solid"
        optionType="button"
        size="large"
        options={[
          {
            label: '全部订单',
            value: 0
          },
          {
            label: '待付款',
            value: 1
          },
          {
            label: '待发货',
            value: 2
          },
          {
            label: '待收货',
            value: 3
          },
          {
            label: '已完成',
            value: 4
          },
          {
            label: '已关闭',
            value: 5
          },
        ]}
      />
      <div className={styles.list_wrap}>
        <div className={styles.list_header}>
          <div>商品信息</div>
          <div>定金</div>
          <div>尾款</div>
          <div>合计实收</div>
          <div>订单状态</div>
          <div>操作</div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TableList;
