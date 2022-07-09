import { useState } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"
import type { TableProps } from "./data"

import { metadataEvent } from "@/services/buried-point/metadata-management"
import Detail from "./detail"

function MetaEvent () { 
  const [detailVisible, setDetailVisible] = useState<boolean>(false)
  const [event, setEvent] = useState<string>()

  const columns: ProColumns<TableProps>[] = [
    {
      title: '事件名',
      dataIndex: 'event',
      align: 'center',
      width: '33%',
      render: (_, r)=> <a onClick={()=> {setDetailVisible(true); setEvent(r.event)}}>{_}</a>
    },
    {
      title: '事件显示名',
      dataIndex: 'name',
      align: 'center',
      width: '33%'
    },
    {
      title: '应埋点平台',
      dataIndex: 'setPointPosition',
      align: 'center',
      hideInSearch: true,
      width: '33%'
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey='event'
        columns={columns}
        params={{}}
        request={metadataEvent}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse()
          ]
        }}
      />
      {
        detailVisible&&
        <Detail
          visible={detailVisible}
          setVisible={setDetailVisible}
          enventType={'dwd_' + event}
        />
      }
    </PageContainer>
  )
}

export default MetaEvent
