import { Button, Drawer } from 'antd'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { FC } from 'react'
import type { modifyRecordProps } from './data'

const ModifyRecord:FC<modifyRecordProps> = ({visible, setVisible}) => {

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '修改项',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '原数据',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '新数据',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '修改端',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '修改人',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '修改时间',
      dataIndex: '',
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
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <ProTable
        rowKey=''
        columns={columns}
        search={false}
        pagination={false}
        options={false}
      />
    </Drawer>
  )
}

export default ModifyRecord
