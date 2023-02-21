import {  useRef } from "react"
import ProTable  from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
import { volunteerPage } from "@/services/love-feedback-activities/volunteer-list"
import Export from "@/components/export"


const VolunteerList: FC = ()=>  {
    const form = useRef<FormInstance>()
  
    const getFieldValue = () => {
      const { ...rest } = form.current?.getFieldsValue()
      return {
        ...rest
      }
  
    }

    const columns: ProColumns[] = [
        {
          title: '昵称',
          dataIndex: 'nickName',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '地区',
          dataIndex: 'area',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '是否已开VIP店铺',
          dataIndex: 'vip',
          align: 'center',
          hideInSearch: true,
          valueType: 'select',
          valueEnum: {
            0: '否',
            1: '是'
          },
        },
        {
          title: '是否开店',
          dataIndex: 'userType',
          align: 'center',
          hideInSearch: true,
          valueType: 'select',
          valueEnum: {
            0: '否',
            1: '是'
          },
        },
        {
          // title: '手机号',
          dataIndex: 'phoneNumber',
          align: 'center',
          hideInTable: true,
          fieldProps:{
            placeholder:'请输入手机号'
          }
        },
        {
          title: '手机号',
          dataIndex: 'phoneNumber',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '注册来源',
          dataIndex: 'sourceTypeDesc',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '注册时间',
          dataIndex: 'createTime',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '上次访问时间',
          dataIndex: 'loginTime',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '捐款状态',
          dataIndex: 'contributionStatus',
          align: 'center',
          hideInSearch: true,
          valueType: 'select',
          valueEnum: {
            0: '未捐款',
            1: '已捐款'
          },
        },
        {
          // title: '捐款状态',
          dataIndex: 'contributionStatus',
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
          // title: '开店情况',
          dataIndex: 'storeCase',
          valueType: 'select',
          hideInTable: true,
          valueEnum: {
            1: '未开店',
            2: '已开通社区店',
            3: '已开通VIP店'
          },
          fieldProps: {
            placeholder: '请选择开店情况'
          }
        },
        {
          title: '备注',
          dataIndex: 'remark',
          align: 'center',
          hideInSearch: true
        },
      ]
    return (
        <PageContainer>
        <ProTable
          rowKey='memberId'
          columns={columns}
          options={false}
          request={volunteerPage}
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
  
  export default VolunteerList
  