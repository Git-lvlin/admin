import React from 'react'
import { message } from 'antd'
import ProForm, { ProFormText, ProFormSelect  } from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { PageContainer } from '@ant-design/pro-layout'

import Upload from '@/components/upload'

const waitTime = () => {

}

const FormData = () => {
  return (
    <ProForm.Item>
      
    </ProForm.Item>
  )
}

const ExportConfiguration = () => {
  return (
    <PageContainer title={false}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: '#ffffff',
          padding: 20
        }}
      >
        <ProForm
          onFinish={async (values) => {
            await waitTime(values)
            message.success('提交成功')
          }}
          layout="horizontal"
        >
          <ProFormText
            width="md"
            name="name"
            label="导出文件名"
            placeholder="请输入文件名称" 
          />
          <ProFormText
            width="md"
            name="company"
            label="唯一编码"
            placeholder="请输入唯一编码" 
          />
          <ProFormSelect
            options={[
              {
                value: 1,
                label: '模板文件',
              },
              {
                value: 2,
                label: '字段配置',
              },
            ]}
            width="xs"
            name="useMode"
            label="选择方式"
          />
          <ProForm.Item
            label="模板文件"
            name=""
            rules={[{message: '请上传模板文件', required: true}]}
          >
            <Upload
              code={230}
              accept="file/*"
            />
          </ProForm.Item>
          <ProCard
             tabs={{ type: 'editable-card' }}
          >
            <ProCard.TabPane key="tab1" tab="Sheet1" closable={false}>
              <FormData />
            </ProCard.TabPane>
            <ProCard.TabPane key="tab2" tab="Sheet2" closable={false}>
              <FormData />
            </ProCard.TabPane>
          </ProCard>
        </ProForm>
      </div>
    </PageContainer>
  )
}

export default ExportConfiguration
