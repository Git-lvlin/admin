import { Button, Drawer } from 'antd'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { FC } from 'react'
import type { modifyRecordProps } from './data'

import { bankCardInfoLogPage } from '@/services/product-performance-management/AED-course-list'

const ModifyRecord:FC<modifyRecordProps> = ({visible, setVisible, data}) => {

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '修改项',
      dataIndex: 'modifyItem',
      align: 'center'
    },
    {
      title: '原数据',
      dataIndex: 'originalData',
      align: 'center'
    },
    {
      title: '新数据',
      dataIndex: 'newData',
      align: 'center'
    },
    {
      title: '修改端',
      dataIndex: 'source',
      align: 'center'
    },
    {
      title: '修改人',
      dataIndex: 'creator',
      align: 'center'
    },
    {
      title: '修改时间',
      dataIndex: 'createTime',
      align: 'center'
    },
  ]

  const close = () => {
    setVisible(false)
  }

  return (
    <Drawer
      title='修改历史'
      width={1200}
      visible={visible}
      onClose={close}
      destroyOnClose={true}
      footer={()=> <Button onClick={close}>返回</Button>}
    >
      <div>下单人手机号：{data?.buyerMobile}</div>
      <div>订单号：{data?.orderSn}</div>
      <div>订单支付时间：{data?.payTime}</div>
      <div>订单状态：{data?.orderStatusDesc}</div>
      <ProTable
        rowKey='id'
        columns={columns}
        search={false}
        pagination={{
          showQuickJumper: false,
          pageSize: 10
        }}
        options={false}
        request={bankCardInfoLogPage}
        params={{}}
      />
    </Drawer>
  )
}

export default ModifyRecord
