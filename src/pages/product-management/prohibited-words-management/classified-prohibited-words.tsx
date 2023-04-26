import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'
import { Button, Space } from 'antd'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import Export from '@/components/export'
import Edit from './edit'
import Model  from './model-form'
import GcCascader from '@/components/gc-cascader'
import { getSensitiveListByParams } from '@/services/product-management/prohibited-words-management'

const ClassifiedProhibitedWords = () => {
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const [modelVisible, setModelVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [id1, setId1] = useState<string>()
  const [id2, setId2] = useState<string>()
  const [type, setType] = useState<string>('')
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const getFieldsValue = () => {
    const { gc, ...rest } = form.current?.getFieldsValue()
    return {
      gcId1: gc && gc[0],
      gcId2: gc && gc[1],
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '类目',
      dataIndex: 'gc',
      renderFormItem: () => <GcCascader changeOnSelect/>,
      hideInTable: true,
    },
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true,
      width: "3%"
    },
    {
      title: '一级类目',
      dataIndex: 'gcId1Name',
      align: 'center',
      hideInSearch: true,
      width: "6%"
    },
    {
      title: '二级类目',
      dataIndex: 'gcId2Name',
      align: 'center',
      hideInSearch: true,
      width: "6%"
    },
    {
      title: '违禁词',
      dataIndex: 'words',
      align: 'center',
      width: '25%'
    },
    {
      title: '最近操作人',
      dataIndex: 'lastEditor',
      align: 'center',
      hideInSearch: true,
      width: "5%"
    },
    {
      title: '最近操作时间',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true,
      width: "5%"
    },
    {
      title: '状态',
      dataIndex: 'statusStr',
      align: 'center',
      hideInSearch: true,
      width: "4%"
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: "5%",
      render: (_, r)=>(
        <Space size='small'>
          <a onClick={()=> {setEditVisible(true); setId1(r.gcId1); setType('edit'); setId2(r.gcId2);}}>编辑</a>
          <a onClick={()=> {setModelVisible(true); setType(r.statusStr === '已限制' ? '0' : '1'); setId(r.id)}}>
            {r.statusStr === '已限制' ? '不限制' : '限制'}
          </a>
        </Space>
      )
    },
  ]

  return (
    <>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        request={getSensitiveListByParams}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        formRef={form}
        actionRef={actRef}
        options={false}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='sensitive-list'
              conditions={getFieldsValue}
            />
          ]
        }}
        toolBarRender={()=> [
          <Button
            key='add'
            type='primary'
            onClick={()=> {setEditVisible(true); setType('add'); setId1('')}}
          >
            新增
          </Button>,
          <Button
            key='push'
            type='primary'
            onClick={()=> {setEditVisible(true); setType('push'); setId1('')}}
          >
            追加
          </Button>,
          <Button
            key='delete'
            type='primary'
            onClick={()=> {setEditVisible(true); setType('delete'); setId1('')}}
          >
            删除
          </Button>
        ]}
      />
      {
        editVisible &&
        <Edit
          visible={editVisible}
          setVisible={setEditVisible}
          id1={id1}
          id2={id2}
          callback={()=> actRef.current?.reload()}
          type={type}
        />
      }
      {
        modelVisible &&
        <Model
          visible={modelVisible}
          setVisible={setModelVisible}
          callback={()=> actRef.current?.reload()}
          id={id}
          type={type}
        />
      }
    </>
  )
}

export default ClassifiedProhibitedWords