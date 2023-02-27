import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import { admReportList } from '@/services/finger-doctor/health-detection-record-management'

const HealthDetectionRecordManagement = () => {

  const columns: ProColumns[] = [
    {
      title: '报告编号',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '检测设备号',
      dataIndex: 'imei',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备所属人手机号',
      dataIndex: 'storePhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '性别',
      dataIndex: 'genderDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '身高（厘米）',
      dataIndex: 'height',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '体重（公斤）',
      dataIndex: 'weight',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '套餐名称',
      dataIndex: 'packageName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '报告时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, r) => (
        <a onClick={()=> {}}>操作</a>
      )
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable<ProColumns>
        rowKey='id'
        columns={columns}
        params={{}}
        request={admReportList}
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
    </PageContainer>
  )
}

export default HealthDetectionRecordManagement
