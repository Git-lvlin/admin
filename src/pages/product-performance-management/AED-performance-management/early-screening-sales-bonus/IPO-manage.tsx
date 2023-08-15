import React, { useState } from 'react'
import { Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import type { ProColumns } from '@ant-design/pro-table'

import ProTable from '@/components/pro-table'

const IPOManage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>()

  const menu = () => {
    return (
      <Menu>
        <Menu.Item key='1'>
          <a
            onClick={()=> {
             
            }}
          >
            申请IPO奖
          </a>
        </Menu.Item>
        <Menu.Item key='2'>
          <a
            onClick={()=> {
             
            }}
          >
            奖励详情
          </a>
        </Menu.Item>
        <Menu.Item key='3'>
          <a
            onClick={()=> {
              
            }}
          >
            操作日志
          </a>
        </Menu.Item>
      </Menu>
    )
  }

  const columns: ProColumns[] = [
    {
      title: '本页',
      align: 'left',
      hideInSearch: true
    },
    {
      title: 'IPO奖领取状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '所属月份',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属月份',
      dataIndex: '',
      valueType: 'dateMonth',
      hideInTable: true
    },
    {
      title: '销售人用户ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '销售人手机号码',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '支付单数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '完成单数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '完成人数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '所属子公司名称',
      dataIndex: '',
      align: 'center'
    },
    {
      title: 'IPO奖实名人姓名',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖实名人身份证号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖金额',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '申请时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '审核时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '通知时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖领取时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖领取状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Dropdown overlay={() => menu()}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              管理
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )
    },
  ]

  return (
    <>
      <ProTable
        rowKey=''
        columns={columns}
        // request={}
        params={{}}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse()
          ]
        }}
        options={false}
        scroll={{x: 'max-content'}}
        rowSelection={{
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: _ => {
            setSelectedRowKeys(_)
          }
        }}
      />
    </>
  )
}

export default IPOManage