import {  useRef } from "react"
import ProTable  from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
import { newWholesaleCityAgencyPm, newWholesaleCityAgencyPmStats } from "@/services/city-office-management/new-intensive-performance"
import Export from "@/components/export"


const VolunteerList: FC = ()=>  {
    const form = useRef<FormInstance>()
  
    const getFieldValue = () => {
      const { time, ...rest } = form.current?.getFieldsValue()
      return {
        ...rest
      }
  
    }

    const columns: ProColumns[] = [
        {
          title: '昵称',
          dataIndex: 'name',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '地区',
          dataIndex: 'time',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '是否已开VIP店铺',
          dataIndex: 'teamLeader',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '是否开店',
          dataIndex: 'time',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '手机号',
          dataIndex: 'payAmount',
          align: 'center',
          hideInTable: true,
          fieldProps:{
            placeholder:'请输入手机号'
          }
        },
        {
          title: '手机号',
          dataIndex: 'payAmount',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '注册来源',
          dataIndex: 'commission',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '注册时间',
          dataIndex: 'commission',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '上次访问时间',
          dataIndex: 'commission',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '捐款状态',
          dataIndex: 'commission',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '捐款状态',
          dataIndex: 'commission',
          valueType: 'select',
          hideInTable: true,
          valueEnum: {
            0: '未捐款',
            1: '已捐款'
          },
          fieldProps: {
            placeholder: '请选择捐款状态'
          }
        },
        {
          title: '开店情况',
          dataIndex: 'commission',
          valueType: 'select',
          hideInTable: true,
          valueEnum: {
            1: '已开店',
            2: '已开头社区店',
            3: '已开通VIP店'
          },
          fieldProps: {
            placeholder: '请选择开店情况'
          }
        },
        {
          title: '备注',
          dataIndex: 'commission',
          align: 'center',
          hideInSearch: true
        },
      ]
    return (
        <PageContainer>
        <ProTable
          rowKey='agencyId'
          columns={columns}
          params={{}}
          options={false}
          request={newWholesaleCityAgencyPm}
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
                type="newWholesaleCityAgencyPm"
                conditions={getFieldValue}
              />
            ]
          }}
        />
      </PageContainer>
    )
  }
  
  export default VolunteerList
  