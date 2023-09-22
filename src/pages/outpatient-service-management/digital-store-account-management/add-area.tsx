import { useRef, useState } from 'react'
import {
  DrawerForm,
} from '@ant-design/pro-form'
import ProTable from '@/components/pro-table'
import {
  Typography,
  Button,
} from 'antd'

import type { FormInstance } from 'antd'
import OperationModel from './operation-model'
import { accountProviderList } from '@/services/outpatient-service-management/digital-store-account-management'
import type { CumulativeProps } from "./data"
import type { ProColumns } from "@ant-design/pro-table"

const { Title } = Typography;

export default (props:CumulativeProps)=> {
  const {visible, setVisible, callback, msgDetail} = props
  const form = useRef<FormInstance>()
  const [submitMsg, setSubmitMsg] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectItems, setSelectItems] = useState([]);
  const [optionVisible, serOptionVisible] = useState<boolean>(false)
  
  const tableColumns: ProColumns[] = [
    {
      title: '服务区域',
      dataIndex: 'serviceArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '服务商编号',
      dataIndex: 'houseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '区县服务商下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '下单手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人姓名',
      dataIndex: 'consignee',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '联系人手机号',
      dataIndex: 'consigneePhone',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '复审时间',
      dataIndex: 'finishTime',
      hideInSearch: true
    }
  ]
  const onsubmit=values=>{
    try {
      serOptionVisible(true) 
      setSubmitMsg({accountId:msgDetail?.accountId,agencyList:selectedRowKeys})
    } catch (error) {
      console.log('error',error)
    }

 }
  return (
    <DrawerForm
      layout='horizontal'
      title='大健康服务项目 / 数字化门店账号管理  / 添加服务区域'
      width={1000}
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
              <Button type="primary" key="submit" onClick={() => { props.form?.submit() }}>
                 提交
              </Button>,
              <Button type="default" onClick={() => { setSelectedRowKeys([]); setSelectItems([]) } }>
                 重置
              </Button>
            ];
          }
        }
      }
      onFinish={async (values)=>{
        await  onsubmit(values);
      }}
      visible={visible}
      onVisibleChange={setVisible}
      formRef={form}
    >
      <Title level={5}>一、选择服务区域</Title>
      <ProTable
        rowKey="id"
        columns={tableColumns}
        request={accountProviderList}
        columnEmptyText={false}
        // actionRef={ref}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          labelWidth:160,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
        rowSelection={{
          preserveSelectedRowKeys: true,
          selectedRowKeys,
          onChange: (_,val) => {
            setSelectedRowKeys(_);
            setSelectItems(val)
          }
        }}
      />
      <p>
        已选 {selectedRowKeys.length} 个服务区域
      </p>
      {
        selectItems.map((item,index)=><span>{index+1}、{item?.serviceArea}&nbsp;&nbsp;</span>)
      }
      {optionVisible&&<OperationModel
        visible={optionVisible}
        setVisible={serOptionVisible}
        callback={()=>{ callback(); setVisible(false) }}
        msgDetail={submitMsg}
        type={2}
      />}
    </DrawerForm>
  )
}
