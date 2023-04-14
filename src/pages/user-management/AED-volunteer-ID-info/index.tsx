import { PageContainer } from '@ant-design/pro-layout'
import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'
import { Space, Image } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'
import type{ FormInstance } from 'antd'

import Export from '@/components/export'
import Edit from './edit'
import { getAedUserInfoListByParams } from '@/services/user-management/AED-volunteer-ID-info'

const AEDVolunteerIDInfo = () => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [visible, setVisible] = useState<boolean>(false)
  const [data, setData] = useState()
  const form = useRef<FormInstance>()

  const getFieldValue = () => {
    return {
      ...form.current?.getFieldsValue(),
      selectIdArr: selectedKeys
    }
  }

  const columns: ProColumns[] = [
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '手机号码',
      dataIndex: 'memberMobile',
      align: 'center'
    },
    {
      title: '证件照片',
      dataIndex: 'certificateUrl',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.certificateUrl) {
          return <Image src={r.certificateUrl} width={50} height={50}/>
        } else {
          return <span>-</span>
        }
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '男',
        2: '女'
      }
    },
    {
      title: '服装尺码',
      dataIndex: 'clothSize',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        'M': 'M',
        'L': 'L',
        'XL': 'XL',
        'XXL': 'XXL',
        'XXXL': 'XXXL',
        'XXXXL': 'XXXXL',
      }
    },
    {
      title: '最近操作人',
      dataIndex: 'lastEditor',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最近操作时间',
      dataIndex: 'createTimeStr',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属团长手机号',
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
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Space size='middle'>
          <a onClick={() => { setVisible(true); setData(r) }}>更新</a>
        </Space>
      ) 
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="id"
        options={false}
        request={getAedUserInfoListByParams}
        formRef={form}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='aed-user'
              conditions={getFieldValue}
              callback={()=>{ setSelectedKeys([]) }}
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
          onChange: (e) => {
            setSelectedKeys(e)
          }
        }}
      />
      {
        visible &&
        <Edit
          visible={visible}
          setVisible={setVisible}
          data={data}
        />
      }
    </PageContainer>
  )
}

export default AEDVolunteerIDInfo