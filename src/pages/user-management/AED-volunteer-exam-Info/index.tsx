import { PageContainer } from '@ant-design/pro-layout'
import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import Export from '@/components/export'
import { examResult } from '@/services/user-management/AED-volunteer-ID-info'

const AEDVolunteerExamInfo = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const form = useRef<FormInstance>()

  const getFieldValue = () => {
    return {
      ...form.current?.getFieldsValue(),
      sumOrderIds: selectedKeys
    }
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '手机号码',
      dataIndex: 'phoneNumber',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '视频学习状态',
      dataIndex: 'isLearnedStr',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '考试状态',
      dataIndex: 'resultStatus',
      hideInTable: true,
      valueType: 'radio',
      valueEnum: {
        1: '通过',
        2: '未通过',
        0: '未考试'
      }
    },
    {
      title: '视频学习状态',
      dataIndex: 'isLearned',
      hideInTable: true,
      valueType: 'radio',
      valueEnum: {
        1: '已学习',
        0: '未学习'
      }
    },
    {
      title: '考试状态',
      dataIndex: 'resultStatusStr',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '考试分数',
      dataIndex: 'score',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '考试时间',
      dataIndex: 'examTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '课程类型',
      dataIndex: 'classTypeStr',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单号',
      dataIndex: 'subOrderSn',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单状态',
      dataIndex: 'statusStr',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属团长手机',
      dataIndex: 'teamPhone',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属团长姓名',
      dataIndex: 'teamName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属团长类型',
      dataIndex: 'teamTypeStr',
      align: 'center',
      hideInSearch: true,
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="sumOrderId"
        options={false}
        request={examResult}
        formRef={form}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='export-member-exam-result'
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