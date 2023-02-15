import {  useRef } from "react"
import ProTable  from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
import { newWholesaleCityAgencyPm } from "@/services/city-office-management/new-intensive-performance"
import Export from "@/components/export"


const RecommendationCommission:FC = ()=>  {
  const form = useRef<FormInstance>()
  
  const getFieldValue = () => {
    const { time, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest
    }

  }

  const columns: ProColumns[] = [
      {
        title: '交易月度查询',
        dataIndex: 'commission',
        valueType: 'select',
        hideInTable: true,
        valueEnum: {
          1: '2022年11月',
          2: '2022年12月',
          3: '2023年1月',
          4: '2023年2月'
        },
        fieldProps: {
          placeholder: '请选择月份'
        }
      },
      {
        title: '手机号',
        dataIndex: 'payAmount',
        align: 'center',
        hideInSearch: true,
      },
      {
        title: '用户手机',
        dataIndex: 'payAmount',
        align: 'center',
        hideInTable: true,
        fieldProps:{
          placeholder:'请输入用户手机号'
        }
      },
      {
        title: '用户店铺编号',
        dataIndex: 'name',
        align: 'center',
        hideInSearch: true
      },
      {
        title: '推荐订单总额',
        dataIndex: 'time',
        align: 'center',
        hideInSearch: true,
        render: (_,data) => {
          return <a onClick={()=>{}}>{_}</a>
        }
      },
      {
        title: '推荐订单总提成',
        dataIndex: 'teamLeader',
        align: 'center',
        hideInSearch: true
      },
      {
        title: '直推用户数',
        dataIndex: 'time',
        align: 'center',
        hideInSearch: true
      }
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
  
  export default RecommendationCommission
  