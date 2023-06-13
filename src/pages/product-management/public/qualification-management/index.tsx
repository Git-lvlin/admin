import { useState, useRef } from 'react'
import { Button, Image } from 'antd'

import type { ActionType, ProColumns } from '@ant-design/pro-table'

import ProTable from '@/components/pro-table'
import PageContainer from '@/components/PageContainer'
import Category from './category'
import { goodsQlfList } from '@/services/product-management/qualification-management'
import Edit from './edit'

const QualificationManagement: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [title, setTitle] = useState<string>()
  const [id, setId] = useState<string>()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
    },
    {
      title: '资质名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '应用商品分类',
      dataIndex: 'status',
      align: 'center',
      render: (_, r) => <a onClick={()=> {setVisible(true); setTitle(r.name); setId(r.id)}}>点击查看</a>
    },
    {
      title: '上传说明',
      dataIndex: 'intro',
      align: 'center'
    },
    {
      title: '示例图',
      dataIndex: 'qlfImg',
      align: 'center',
      render: (_, r) => <Image width={50} height={50} src={r.qlfImg} />
    },
    {
      title: '状态',
      dataIndex: 'statusDesc',
      align: 'center'
    },
    {
      title: '最近更新时间',
      dataIndex: 'updateTime',
      align: 'center'
    },
    {
      title: '最近操作人',
      dataIndex: 'optName',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => <a onClick={()=> {setEditVisible(true); setId(r.id)}}>编辑</a>
    },
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        options={false}
        toolBarRender={()=> [
          <Button type='primary' onClick={()=> {setEditVisible(true); setId('')}}>添加</Button>
        ]}
        bordered
        actionRef={actRef}
        request={goodsQlfList}
        search={false}
        scroll={{x: 'max-content'}}
        paginationProps={false}
      />
      {
        visible &&
        <Category 
          title={title}
          visible={visible}
          setVisible={setVisible}
          id={id}
        />
      }
      {
        editVisible &&
        <Edit
          id={id}
          visible={editVisible}
          setVisible={setEditVisible}
          callback={()=> actRef.current?.reload()}
        />
      }
    </PageContainer>
  )
}

export default QualificationManagement