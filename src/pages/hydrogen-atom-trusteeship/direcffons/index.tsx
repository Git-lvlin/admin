import ProTable from '@ant-design/pro-table'
import { PageContainer } from '@ant-design/pro-layout'

import type { ProColumns } from '@ant-design/pro-table'


const Direcffons = () => {
  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '设备ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '',
      dataIndex: '',
      align: 'center'
    },
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=''
        columns={columns}
      />
    </PageContainer>
  )
}

export default Direcffons