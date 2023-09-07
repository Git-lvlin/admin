import { Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import type { ProColumns } from '@ant-design/pro-table'

import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import AddressCascader from '@/components/address-cascader'

type props = {
  type: string
}

const CountyServiceProviders:React.FC<props> = ({type}) => {

  const menu = (data: any) => {
    return (
      <Menu>
        {
          type === 'review' &&
          <>
            <Menu.Item>
              <a>复审</a>
            </Menu.Item>
          </>
        }
        {
          type === 'verify' &&
          <>
            <Menu.Item>
              <a>上传缴费凭证</a>
            </Menu.Item>
            <Menu.Item>
              <a>初审</a>
            </Menu.Item>
          </>
        }
        {
          type === 'order' &&
          <>
            <Menu.Item>
              <a>上传缴费凭证</a>
            </Menu.Item>
            <Menu.Item>
              <a>锁定代理区域</a>
            </Menu.Item>
          </>
        }
      </Menu>
    )
  }

  const columns: ProColumns[] = [
    {
      title: '服务商编号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '下单手机号码',
      dataIndex: '',
      align: 'center'
    },
    {

      title: '用户ID',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人姓名',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人手机号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务区域',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务区域',
      dataIndex: '',
      renderFormItem: () => <AddressCascader changeOnSelect/>,
      hideInTable: true
    },
    {
      title: '付款凭证张数(张)',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '已交金额(元)',
      dataIndex: '',
      align: 'center', 
      hideInSearch: true
    },
    {
      title: '合同签定时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签约时间',
      dataIndex: '',
      renderFormItem: ()=> <TimeSelect />,
      hideInTable: true
    },
    {
      title: '合同状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '合同ID',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '门店数量',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '招募状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '招募状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> (
        <Dropdown overlay={()=> menu(r)}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              管理
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )
    }
  ]

  return (
    <ProTable
      rowKey=''
      columns={columns}
      options={false}
      search={{
        labelWidth: 120,
        optionRender: (search, props, dom) => [
          ...dom.reverse()
        ]
      }}
    />
  )
}

export default CountyServiceProviders