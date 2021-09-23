import React, { useState, useRef } from 'react'
import { message, Form, Button } from 'antd'
import ProForm, { 
  ProFormText, 
  ProFormSelect
} from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import { PageContainer } from '@ant-design/pro-layout'
import { EditableProTable } from '@ant-design/pro-table'
import { PlusOutlined } from '@ant-design/icons'

import Upload from '@/components/upload'
import styles from './styles.less'

const waitTime = (e) => {
  console.log(e)
}

const ExportConfiguration = () => {
  const formRef = useRef()
  const [choose, setChoose] = useState(1)

  const FormData = () => {
    const [dataSource, setDataSource] = useState([])
    const [editableKeys, setEditableRowKeys] = useState([])
    const actionRef = useRef()
    const [form] = Form.useForm()
    const columns = [
      {
        title: 'code',
        dataIndex: 'code'
      },
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '操作',
        valueType: 'option',
        render: (text, record, _, action) => [
          <a
            key="editable"
            onClick={() => {
              action?.startEditable?.(record.id)
            }}
          >
            编辑
          </a>,
          <a
            key="delete"
            onClick={() => {
              setDataSource(dataSource.filter((item) => item.id !== record.id))
            }}
          >
            删除
          </a>
        ]
      }
    ]
    return (
      <>
        <ProFormText
          width="md"
          name="1"
          label="数据接口Url："
          placeholder="请输入数据接口Url" 
        />
        <ProFormText
          width="md"
          name="2"
          label="起始数据行："
          placeholder="请输入起始数据行" 
        />
        {
          choose === 2 &&
          <div className={styles.editTable}>
            <div>字段配置：</div>
            <EditableProTable
              rowKey="code"
              actionRef={actionRef}
              maxLength={5}
              recordCreatorProps={false}
              columns={columns}
              value={dataSource}
              onChange={setDataSource}
              editable={{
                form,
                editableKeys,
                onSave: async () => {
                  await waitTime(2000)
                },
                onChange: setEditableRowKeys,
                // actionRender: (row, config, dom) => [dom.save, dom.cancel]
              }}
            />
            <Button
              type="primary"
              onClick={() => {
                actionRef.current?.addEditRecord?.({
                  id: (Math.random() * 1000000).toFixed(0)
                })
              }}
              icon={<PlusOutlined />}
            >
              新增字段
            </Button>
          </div>
        }
      </>
    )
  }

  const handleChange = (e) => {
    setChoose(e)
  }

  return (
    <PageContainer title={false}>
      <div className={styles.form}>
        <ProForm
          onFinish={async (values) => {
            await waitTime(values)
            message.success('提交成功')
          }}
          layout="horizontal"
          formRef={formRef}
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
                label: '模板文件'
              },
              {
                value: 2,
                label: '字段配置'
              }
            ]}
            initialValue={choose}
            width="xs"
            name="useMode"
            label="选择方式"
            fieldProps={{
              onChange: (e) => {
                handleChange(e)
              },
              allowClear: false
            }}
          />
          {
            choose === 1&&
            <ProForm.Item
              label="模板文件"
              name="file"
              // rules={[{message: '请上传模板文件', required: true}]}
            >
              <Upload
                code={230}
                accept="file/*"
              />
            </ProForm.Item>
          }
          <ProCard
            tabs={{ 
              type: 'editable-card'
            }}
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
