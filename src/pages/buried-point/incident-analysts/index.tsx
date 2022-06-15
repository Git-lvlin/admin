import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns } from "@ant-design/pro-table"
import type { ProTableProps } from "../data"

import SearchModal from "./search-modal"

const IncidentAnalysts: FC = () => {

  const columns: ProColumns<ProTableProps>[] = [
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // },
    // {
    //   title: '',
    //   dataIndex: '',
    //   align: 'center'
    // }
  ]

  return (
    <PageContainer title={false}>
      <SearchModal/>
      <ProTable
        rowKey=''
        columns={columns}
        params={{}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={false}
      />
    </PageContainer>
  )
}

export default IncidentAnalysts
