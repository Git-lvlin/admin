import { Drawer } from 'antd'
import ProTable from '@/components/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { OperationLogProps, OptLogTableProps } from "../data"

import { getLogList } from "@/services/setting/contract-management"
import moment from 'moment'

const OperationLog = (props: OperationLogProps) => {
  const { visible, setVisible, id } = props

  const columns: ProColumns<OptLogTableProps>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center',
      width: '15%'
    },
    {
      title: '操作人角色',
      dataIndex: 'optRole',
      align: 'center',
      width: '15%'
    },
    {
      title: '操作人账号',
      dataIndex: 'optName',
      align: 'center',
      width: '15%'
    },
    {
      title: '操作项',
      dataIndex: 'optItemDesc',
      align: 'center',
      width: '15%'
    },
    {
      title: '操作说明',
      dataIndex: 'optContent',
      align: 'center',
      width: '17%'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      width: '17%',
      render: (_, r) => moment(r?.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  ]

  const close = () => {
    setVisible(false)
  }
  return (
    <Drawer
      title='操作日志'
      visible={visible}
      onClose={close}
      width={1200}
    >
      <ProTable
        rowKey='id'
        columns={columns}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={false}
        options={false}
        request={getLogList}
        params={{contractId: id}}
      />
    </Drawer>
  )
}

export default OperationLog