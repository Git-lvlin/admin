import { useRef, useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import { admReportList } from '@/services/finger-doctor/health-detection-record-management'
import Export from '@/components/export'
import Detail from './detail'

const HealthDetectionRecordManagement = () => {
  const [url, setUrl] = useState<string>()
  const [visible, setVisible] = useState<boolean>(false)

  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { time, ...rest } = form.current?.getFieldsValue()
    return {
      startTime: time && moment(time[0]).format('YYYY-MM-DD'),
      endTime: time && moment(time[1]).format('YYYY-MM-DD'),
      ...rest
    }
  }

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
      dataIndex: 'imei',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入检测设备号'
      }
    },
    {
      title: '设备所属人手机号',
      dataIndex: 'storePhone',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'storePhone',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入设备所属人手机号'
      }
    },
    {
      title: '姓名',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'name',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入用户姓名'
      }
    },
    {
      dataIndex: 'time',
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'phone',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入用户手机号'
      }
    },
    {
      title: '性别',
      dataIndex: 'genderDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'gender',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        'men': '男',
        'women': '女'
      },
      fieldProps: {
        placeholder: '请选择性别'
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
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
        <a onClick={()=> {setUrl(r.reportUrl); setVisible(true)}}>查看</a>
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
        formRef={form}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='doctorReport'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible&&
        <Detail
          url={url}
          visible={visible}
          setVisible={setVisible}
        />
      }
    </PageContainer>
  )
}

export default HealthDetectionRecordManagement
