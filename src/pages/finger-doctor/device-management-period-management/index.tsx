import {  useRef } from "react"
import ProTable  from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
// import { volunteerPage } from "@/services/love-feedback-activities/volunteer-list"
import Export from "@/components/export"


const DeviceManagementPeriodManagement: FC = ()=>  {
    const form = useRef<FormInstance>()
    const getFieldValue = () => {
      const { ...rest } = form.current?.getFieldsValue()
      return {
        ...rest
      }
  
    }

    const columns: ProColumns[] = [
        {
          dataIndex: 'nickName',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入设备编号'
          }
        },
        {
          title: '设备编号',
          dataIndex: 'nickName',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '设备状态',
          dataIndex: 'area',
          align: 'center',
         hideInSearch: true
        },
        {
          dataIndex: 'vip',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入设备所属人手机号'
          }
        },
        {
          title: '所属人手机号',
          dataIndex: 'vip',
          align: 'center',
          hideInSearch: true,
        },
        {
          dataIndex: 'userType',
          align: 'center',
          hideInTable: true,
          valueType: 'select',
          valueEnum: {
            0: '女',
            1: '男'
          },
          fieldProps: {
            placeholder: '请选择管理期状态'
          }
        },
        {
          title: '当前管理期类型',
          dataIndex: 'userType',
          align: 'center',
          hideInSearch: true,
          valueType: 'select',
          valueEnum: {
            0: '女',
            1: '男'
          },
        },
        {
          title: '当前管理期状态',
          dataIndex: 'userType',
          align: 'center',
          hideInSearch: true,
          valueType: 'select',
          valueEnum: {
            0: '女',
            1: '男'
          },
        },
        {
          title: '当前管理开始日期',
          dataIndex: 'phoneNumber',
          align: 'center',
          hideInSearch  : true,
        },
        {
          title: '当前管理结束日期',
          dataIndex: 'phoneNumber',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '当前剩余管理期(天)',
          dataIndex: 'sourceTypeDesc',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '当前设备管理费(元)',
          dataIndex: 'createTime',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '操作',
          dataIndex: 'remark',
          align: 'center',
          hideInSearch: true,
          render: (_,data) => {
            return <a onClick={()=> { }}>历史交管理费</a>
          }
        },
      ]
    return (
        <PageContainer>
        <ProTable
          rowKey='memberId'
          columns={columns}
          options={false}
        //   request={volunteerPage}
          formRef={form}
          pagination={{
            showQuickJumper: true,
            pageSize: 10
          }}
          search={{
            labelWidth: 120,
            optionRender: (searchConfig, props, dom) => [
              ...dom.reverse(),
              <Export
                key='export'
                type="healthy-member-volunteer"
                conditions={getFieldValue}
              />
            ]
          }}
        />
      </PageContainer>
    )
  }
  
  export default DeviceManagementPeriodManagement
