import {  useRef } from "react"
import ProTable  from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
// import { volunteerPage } from "@/services/love-feedback-activities/volunteer-list"
import Export from "@/components/export"


const UserHealthDataManagement: FC = ()=>  {
    const form = useRef<FormInstance>()
  
    const getFieldValue = () => {
      const { ...rest } = form.current?.getFieldsValue()
      return {
        ...rest
      }
  
    }

    const columns: ProColumns[] = [
        {
          title: '用户编号',
          dataIndex: 'nickName',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '姓名',
          dataIndex: 'area',
          align: 'center',
          fieldProps: {
            placeholder: '请输入用户姓名'
          }
        },
        {
          title: '手机号',
          dataIndex: 'vip',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入用户手机号'
          }
        },
        {
          title: '手机号',
          dataIndex: 'vip',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '性别',
          dataIndex: 'userType',
          align: 'center',
          hideInTable: true,
          valueType: 'select',
          valueEnum: {
            0: '女',
            1: '男'
          },
        },
        {
          title: '性别',
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
          title: '年龄',
          dataIndex: 'phoneNumber',
          align: 'center',
          hideInSearch  : true,
        },
        {
          title: '生日',
          dataIndex: 'phoneNumber',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '身高（厘米）',
          dataIndex: 'sourceTypeDesc',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '体重（公斤）',
          dataIndex: 'createTime',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '地址',
          dataIndex: 'loginTime',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '录入时间',
          dataIndex: 'contributionStatus',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '操作',
          dataIndex: 'remark',
          align: 'center',
          hideInSearch: true,
          render: () => {
            return <a onClick={()=> { }}>查看详情</a>
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
  
  export default UserHealthDataManagement
