import { useState, useRef } from "react"
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from "@/components/PageContainer"
import RangeInput from '@/components/range-input'
import Detail from "./detail"

const StoreHealthCardManagement = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const columns: ProColumns[] = [
    {
      title: '所属店铺编号',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '所属店主手机',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '服务号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '服务类型',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '服务状态',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '有效期截止日',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '价值(元)',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '总次数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '剩余可用次数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '剩余可用次数',
      dataIndex: '',
      align: 'center',
      hideInTable: true,
      renderFormItem: () => <RangeInput/>
    },
    {
      title: '服务所属人手机号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '所属套餐名称',
      dataIndex: '',
      align: 'center'
    },

    {
      title: '服务所属人店铺编号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '持有时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '最近使用时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r)=> <a onClick={()=> {setVisible(true)}}>详情</a>
    },
  ]

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        params={{}}
        // request={}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse()
          ]
        }}
      />
      {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
        />
      }
    </PageContainer>
  )
}

export default StoreHealthCardManagement