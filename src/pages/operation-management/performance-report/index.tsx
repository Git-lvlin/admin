import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"

function PerformanceReport () {

  const columns: ProColumns[] = [
    {
      title: '运营商ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '运营商名称',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '统计时间',
      dataIndex: '',
      valueType: 'dateTimeRange',
      hideInTable: true
    },
    {
      title: '总收益（元）',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备销售收益（元）',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备租金收益（元）',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey=""
        columns={columns}
        params={{}}
        // request={}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse()
          ]
        }}
      />
    </PageContainer>
  )
}

export default PerformanceReport
