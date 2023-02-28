import {  useRef, useState } from "react"
import ProTable  from "@ant-design/pro-table"

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
import { userList } from "@/services/finger-doctor/user-health-data-management"
import Export from "@/components/export"
import Detail from './detail';


const UserHealthDataManagement: FC = ()=>  {
    const form = useRef<FormInstance>()
    const [detailVisible, setDetailVisible] = useState<boolean>(false);
    const [datailMsg, setDatailMsg] = useState<string>('');
  
    const getFieldValue = () => {
      const { ...rest } = form.current?.getFieldsValue()
      return {
        ...rest
      }
  
    }

    const columns: ProColumns[] = [
        {
          title: '用户编号',
          dataIndex: 'memberId',
          align: 'center',
          hideInSearch: true
        },
        {
          dataIndex: 'name',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入用户姓名'
          },
          order: 2
        },
        {
          title: '姓名',
          dataIndex: 'name',
          align: 'center',
          hideInSearch: true
        },
        {
          dataIndex: 'phone',
          align: 'center',
          hideInTable: true,
          fieldProps: {
            placeholder: '请输入用户手机号'
          },
          order: 3
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          align: 'center',
          hideInSearch: true,
        },
        {
          dataIndex: 'gender',
          align: 'center',
          hideInTable: true,
          valueType: 'select',
          valueEnum: {
            'women': '女',
            'men': '男'
          },
          fieldProps: {
            placeholder: '请选择性别'
          }
        },
        {
          title: '性别',
          dataIndex: 'gender',
          align: 'center',
          hideInSearch: true,
          valueType: 'select',
          valueEnum: {
            'women': '女',
            'men': '男'
          },
        },
        {
          title: '年龄',
          dataIndex: 'age',
          align: 'center',
          hideInSearch  : true,
        },
        {
          title: '生日',
          dataIndex: 'birthday',
          align: 'center',
          hideInSearch: true,
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
          title: '地址',
          dataIndex: 'address',
          align: 'center',
          hideInSearch: true
        },
        {
          title: '录入时间',
          dataIndex: 'createTime',
          align: 'center',
          hideInSearch: true,
        },
        {
          title: '操作',
          dataIndex: 'remark',
          align: 'center',
          hideInSearch: true,
          render: (_,data) => {
            return <a onClick={()=> { setDatailMsg(data?.memberId);setDetailVisible(true) }}>查看详情</a>
          }
        },
      ]
    return (
        <PageContainer>
        <ProTable
          rowKey='memberId'
          columns={columns}
          options={false}
          request={userList}
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
                type="doctorUser"
                conditions={getFieldValue}
              />
            ]
          }}
        />
      {detailVisible &&
        <Detail
          memberId={datailMsg}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
      </PageContainer>
    )
  }
  
  export default UserHealthDataManagement
