import React, { useState, useEffect, useRef } from 'react'
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { consumerOrderPage } from '@/services/hydrogen-atom-management/hydrogen-atom-start-recording'
import moment from 'moment'
import { formatMessage } from 'umi';
import { Button, Space, Typography,Image,Skeleton,Form } from 'antd'
import { amountTransform } from '@/utils/utils'
import { PageContainer } from '@ant-design/pro-layout';
import { useLocation } from 'umi';
import Detail from '@/pages/user-management/user-list/detail';
import { DrawerForm,ProFormText,ProFormDateTimeRangePicker,ProFormDependency } from '@ant-design/pro-form';
import styles from './style.less'
import Associated0Goods from './associated0-goods'
import Upload from '@/components/upload';
const { Title } = Typography;

const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
  </div>
)

const formItemLayout = {
    labelCol: { span: 5 },
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

export default props=>{
    const {visible, setVisible, callback,id,onClose}=props;
    const [form] = Form.useForm();
    const onSubmit=(values)=>{

    }
    const disabledDate=(current)=>{
        return current && current < moment().startOf('day');
    }
    return (
        <DrawerForm
            onVisibleChange={setVisible}
            title='活动详情'
            visible={visible}
            width={1500}
            form={form}
            drawerProps={{
            forceRender: true,
            destroyOnClose: true,
            onClose: () => {
                onClose();
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
                await onSubmit(values)
            }}
            className={styles?.thematic_event_management}
            {...formItemLayout}
        >
          <div className={styles?.three_column_layout}>
            <div className={styles?.border_box}>
                <Title style={{ marginBottom: 10 }} level={5}>基础设置</Title>
                <ProFormText 
                  label="专题标题"
                  name="name"
                  rules={[{ required: true, message: '请输入专题名称' }]} 
                  placeholder='请输入专题名称'
                />
                <ProFormDateTimeRangePicker
                    label='活动时间'
                    rules={[{ required: true, message: '请选择活动时间' }]}
                    name="dateRange"
                    fieldProps={{
                        disabledDate:(current)=>disabledDate(current)
                    }}
                    placeholder={[
                        formatMessage({
                        id: 'formandbasic-form.placeholder.start',
                        }),
                        formatMessage({
                        id: 'formandbasic-form.placeholder.end',
                        }),
                    ]}
                    />
            </div>
            <div className={styles?.border_box}>
              <Title style={{ marginBottom: 10 }} level={5}>组件设置</Title>
              <div className={styles?.topic_page}>
                 <header className={styles?.header} onClick={()=>{form.setFieldsValue({setPicture:true})}}>
                     <p>点击配置图片</p>
                     <Button>倒计时控件</Button>
                 </header>
                 <figure className={styles?.figure}>
                     副标题图    
                 </figure>
                 <aside className={styles?.aside}>
                    <section className={styles?.section}>
                        <Skeleton.Image /> 
                        <div className={styles?.section_goos}>
                            <p>商品名称商品名称<br/>商品名称</p>
                            <figure className={styles?.figure}> 价格标签 </figure>
                        </div>
                    </section>
                    <article className={styles?.article}>
                    <div className={styles?.article_goos}>
                        <Skeleton.Image />
                        <p>商品名称商品名称<br/>商品名称</p>
                        <Button> 价格标签 </Button></div>
                    <div  className={styles?.article_goos}>
                        <Skeleton.Image />
                        <p>商品名称商品名称<br/>商品名称...</p>
                    </div>
                    </article>
                 </aside>
              </div>
            </div>
            <div className={styles?.border_box}>
              <Title style={{ marginBottom: 10 }} level={5}>头图</Title>
              <ProFormDependency name={['setPicture']}>
              {({ setPicture }) => { 
                if(setPicture){
                    return   <Form.Item
                    label="活动封面"
                    name="bannerImage"
                  >
                    <FromWrap
                      content={(value, onChange) => <Upload multiple value={value}  onChange={onChange} size={2 * 1024}   maxCount={1} accept="image/*" />}
                      right={(value) => {
                        return (
                          <dl>
                            <dd>支持jpg/png，2M以内</dd>
                          </dl>
                        )
                      }}
                    />
                  </Form.Item>
                }
              }}
              </ProFormDependency>
            </div>
          </div>
          <Associated0Goods/>
        </DrawerForm>
    )
}