import React from 'react'
import { message } from 'antd'
import ProForm, { ProFormText, ProFormSelect  } from '@ant-design/pro-form'
import { PageContainer } from '@ant-design/pro-layout'


const waitTime = () => {

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
        </ProForm>
      </div>
    </PageContainer>
  )
}

export default ExportConfiguration
