import { useState, useRef } from "react"
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from "@/components/PageContainer"
// import Detail from "./detail"

const StoreHealthCardManagement = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const columns: ProColumns[] = [
    {
      title: '订单号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '套餐所属店铺编号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '套餐所属店铺名称',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '套餐名称',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人店铺编号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货人详细地址',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单金额',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单状态',
      dataIndex: '',
      align: 'center',
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
      {/* {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
        />
      } */}
    </PageContainer>
  )
}

export default StoreHealthCardManagement