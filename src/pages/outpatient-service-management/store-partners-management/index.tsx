
import type { ProColumns } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import Export from '@/components/export'
import AddressCascader from '@/components/address-cascader'

const StorePartnersManagement: React.FC = () => {
  const columns: ProColumns[] = [
    {
      title: '门诊编号',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '合作商编号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务商编号',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '下单人手机号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '下单用户ID',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人姓名', 
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人手机号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合作商所在地',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务区域',
      dataIndex: '',
      hideInTable: true,
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '订单金额(元)',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同签定时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签定时间',
      dataIndex: '',
      hideInTable: true,
      renderFormItem: () => <TimeSelect />
    },
    {
      title: '合同ID',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '所属服务商编号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: '',
      align: 'center' 
    },
    {
      title: '招募状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '招募状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '培训状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '培训状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '店铺编号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center', 
    },
  ]
  return (
    <PageContainer>
      <ProTable 
        rowKey=''
        columns={columns}
        params={{}}
        // request={}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom)=> [
            ...dom.reverse(),
            <Export 
              key='1'
              type=''
              conditions={{}}
            />
          ]
        }} 
        options={false}
      />
    </PageContainer>
  )
}

export default StorePartnersManagement