import { useState } from 'react'
import { Button } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'

import ProTable from '@/components/pro-table'
import PageContainer from '@/components/PageContainer'
import Category from './category'

const QualificationManagement: React.FC = () => {
  const [visible, setVisible] = useState(false)

  const columns: ProColumns[] = [
    {
      title: 'id',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '资质名称',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '应用商品分类',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '上传说明',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '示例图',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '最近更新时间',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '最近操作人',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => <a>编辑</a>
    },
  ]

  return (
    <PageContainer>
      <ProTable
        rowKey=''
        columns={columns}
        params={{}}
        options={false}
        toolBarRender={()=> [
          <Button type='primary' onClick={()=> {}}>添加</Button>
        ]}
        // request={}
        search={false}
        scroll={{x: 'max-content'}}
      />
      {
        visible &&
        <Category 
          title=''
          visible={visible}
          setVisible={setVisible}
        />
      }
      {
        
      }
    </PageContainer>
  )
}

export default QualificationManagement