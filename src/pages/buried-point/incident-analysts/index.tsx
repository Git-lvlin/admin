import { useState } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"
import moment from "moment"

import type { FC } from "react"
import type { ProColumns } from "@ant-design/pro-table"
import type { ProTableProps } from "../data"

import SearchModal from "./search-modal"
import { indexDetail } from "@/services/buried-point/incident-analysts"
import SelectDate from "./select-date"

const IncidentAnalysts: FC = () => {
  const [ formData, setFormData ] = useState({})
  const [ title, setTitle ] = useState<string>('')
  const [ rangePicker, setRangePicker ] = useState<moment.Moment[]>([])

  const columns: ProColumns<ProTableProps>[] = [
    {
      title: '日期',
      dataIndex: 'dates',
      align: 'center'
    },
    {
      title: `${title}总次数`,
      dataIndex: 'totalNum',
      align: 'center'
    },
    {
      title: `${title}总人数`,
      dataIndex: 'userNum',
      align: 'center'
    },
    {
      title: `${title}平均次数`,
      dataIndex: 'average',
      align: 'center',
      render: (_, r)=> Number(r.average).toFixed(1)
    }
  ]

  return (
    <PageContainer title={false}>
      <SearchModal 
        setFormData={setFormData} 
        setTitle={setTitle}
      />
      <ProTable
        rowKey='dates'
        columns={columns}
        request={indexDetail}
        params={{
          ...formData, 
          startTime: rangePicker[0]?.format('YYYY-MM-DD'),
          endTime: rangePicker[1]?.format('YYYY-MM-DD')
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        headerTitle={<SelectDate setRangePickerValue={setRangePicker}/>}
        options={false}
        search={false}
      />
    </PageContainer>
  )
}

export default IncidentAnalysts
