import {  useRef } from "react"
import ProTable  from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
import { findDeviceDoctorPage } from "@/services/finger-doctor/device-management-period-management"
import Export from "@/components/export"
import { amountTransform } from "@/utils/utils"


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
          dataIndex: 'imei',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入设备编号'
          }
        },
        {
          title: '设备编号',
          dataIndex: 'imei',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '设备状态',
          dataIndex: 'status',
          align: 'center',
          hideInSearch: true,
          valueEnum: {
            0: '待绑定',
            1: '待激活',
            2: '正常',
            3: '已停用',
            4: '已解绑'
          }
        },
        {
          dataIndex: 'memberPhone',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入设备所属人手机号'
          }
        },
        {
          title: '所属人手机号',
          dataIndex: 'memberPhone',
          align: 'center',
          hideInSearch: true,
        },
        {
          dataIndex: 'leaseStatus',
          align: 'center',
          hideInTable: true,
          valueType: 'select',
          valueEnum: {
            0: '无租期',
            1: '免租期',
            2: '管理中',
            3: '已逾期'
          },
          fieldProps: {
            placeholder: '请选择管理期状态'
          }
        },
        {
          title: '当前管理期类型',
          dataIndex: 'manageType',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '当前管理期状态',
          dataIndex: 'leaseStatusStr',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '当前管理开始日期',
          dataIndex: 'activatedTime',
          align: 'center',
          hideInSearch  : true,
        },
        {
          title: '当前管理结束日期',
          dataIndex: 'leaseDeadline',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '当前剩余管理期(天)',
          dataIndex: 'remainManageDayStr',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '当前设备管理费(元)',
          dataIndex: 'manageFee',
          align: 'center',
          hideInSearch: true,
          render: (_) => {
            if(_){
              return amountTransform(_,'/').toFixed(2)
            }else{
              return '-'
            }
          }
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
          rowKey='imei'
          columns={columns}
          options={false}
          request={findDeviceDoctorPage}
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
                type="iot-export-member-device-doctor"
                conditions={getFieldValue}
              />
            ]
          }}
        />
      </PageContainer>
    )
  }
  
  export default DeviceManagementPeriodManagement
