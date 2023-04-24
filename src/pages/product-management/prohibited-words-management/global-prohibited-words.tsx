import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'
import { Button, Space } from 'antd'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import Edit from './edit'
import Model  from './model-form'

const GlobalProhibitedWords = () => {
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [modelVisible, setModelVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
    {
      title: '违禁词',
      dataIndex: '',
      align: 'center', 
      width: '15%'
    },
    {
      title: '最近操作人',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '最近操作时间',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r)=>(
        <Space size='small'>
          <a onClick={()=> {setEditVisible(true); setId(r)}}>编辑</a>
          <a onClick={()=> {setModelVisible(true)}}>不限制</a>
        </Space>
      )
    },
  ]

  return (
    <>
      <ProTable
        columns={columns}
        params={{}}
        // request={}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        formRef={form}
        actionRef={actRef}
        options={false}
        search={false}
        toolBarRender={()=> [
          <Button
            key='add'
            type='primary'
            onClick={()=> {setEditVisible(true)}}
          >
            新增
          </Button>
        ]}
      />
      {
        editVisible &&
        <Edit
          visible={editVisible}
          setVisible={setEditVisible}
          id={id}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        modelVisible &&
        <Model
          visible={modelVisible}
          setVisible={setModelVisible}
          callback={()=> actRef.current?.reload()}
        />
      }
    </>
  )
}

export default GlobalProhibitedWords