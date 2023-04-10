import { PageContainer } from '@ant-design/pro-layout'
import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import Export from '@/components/export'

const AEDVolunteerExamInfo = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const form = useRef<FormInstance>()

  const getFieldValue = () => {
    
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '手机号码',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '视频学习状态',
      dataIndex: '',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '考试状态',
      dataIndex: '',
      hideInTable: true,
      valueType: 'radio',
      valueEnum: {
        1: '通过',
        2: '未考试'
      }
    },
    {
      title: '视频学习状态',
      dataIndex: '',
      hideInTable: true,
      valueType: 'radio',
      valueEnum: {
        1: '已学习',
        2: '未学习'
      }
    },
    {
      title: '考试状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '考试分数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '考试时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '课程内容',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单支付时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属团长手机',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属团长姓名',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属团长类型',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=""
        options={false}
        // request={}
        formRef={form}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type=''
              conditions={getFieldValue}
            />
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        rowSelection={{
          selectedRowKeys: selectedKeys,
          onChange: (e) => setSelectedKeys(e)
        }}
      />
    </PageContainer>
  )
}

export default AEDVolunteerExamInfo