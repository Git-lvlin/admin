
import type { ProColumns } from '@ant-design/pro-table'

import ProTable from '@/components/pro-table'
import Export from '@/components/export'

const SalesPerformance: React.FC = () => {
  const columns:ProColumns[] = [
    {
      title: '所属月份',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属月份',
      dataIndex: '',
      valueType: 'dateMonth',
      hideInTable: true
    },
    {
      title: '销售人用户ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '销售人手机号码',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '支付单数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '完成单数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人数',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '所属子公司名称',
      dataIndex: '',
      align: 'center'
    }
  ]
  return (
    <ProTable
      rowKey=''
      columns={columns}
      // request={}
      params={{}}
      options={false}
      bordered
      search={{
        labelWidth: 120,
        optionRender: (search, props, dom) => [
          ...dom.reverse(),
          <Export 
            type=''
            key='1'
            conditions={{}}
          />
        ]
      }}
    />
  )
}

export default SalesPerformance