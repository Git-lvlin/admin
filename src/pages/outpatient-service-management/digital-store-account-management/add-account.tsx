import { useRef, useState, useEffect } from 'react'
import ProForm,{
  DrawerForm,
  ProFormText,
  ProFormGroup,
  ProFormRadio
} from '@ant-design/pro-form'
import ProTable from '@/components/pro-table'
import {
  Divider,
  Typography,
  Button,
  Descriptions,
  Image,
  Space
} from 'antd'

import type { FormInstance } from 'antd'
import OperationModel from './operation-model'

// import { provideSetDivideInfo } from '@/services/outpatient-service-management/procurement-zone'

const { Title } = Typography;


type props = {
  meta: any, 
  callback: ()=> void
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string,
}

export default (props:props)=> {
  const {visible, setVisible, msgDetail, callback} = props
  const form = useRef<FormInstance>()
  const [detailData, setDetailData] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectItems, setSelectItems] = useState([]);
  const [optionVisible, serOptionVisible] = useState<boolean>(false)

  const data=[
    {
      "serviceArea": "北京",
      "houseNumber": "BJ001",
      "servicePhone": "13800138000",
      "memberPhone": "13900139000",
      "memberId": "123456",
      "manager": "张三",
      "managerPhone": "13700137000",
      "signTime": "2023-09-16T09:32:05+08:00"
    },
    {
      "serviceArea": "上海",
      "houseNumber": "SH001",
      "servicePhone": "13800138001",
      "memberPhone": "13900139001",
      "memberId": "123457",
      "manager": "李四",
      "managerPhone": "13700137001",
      "signTime": "2023-09-16T09:32:06+08:00"
    }
  ]
  
  const tableColumns = [
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
      dataIndex: 'servicePhone',
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
      dataIndex: 'manager',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '联系人手机号',
      dataIndex: 'managerPhone',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '复审时间',
      dataIndex: 'signTime',
      hideInSearch: true
    }
  ]
  return (
    <DrawerForm
      layout='horizontal'
      title='大健康服务项目 / 数字化门店账号管理  / 添加账号'
      width={1000}
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
              <Button type="primary" key="submit" onClick={() => { serOptionVisible(true) }}>
                 提交
              </Button>,
              <Button type="default" onClick={() => props.form?.resetFields()}>
                 重置
              </Button>
            ];
          }
        }
      }
      visible={visible}
      onVisibleChange={setVisible}
      formRef={form}
    >
      <Title level={5}>一、选择服务区域</Title>
      <ProTable
        rowKey="memberId"
        columns={tableColumns}
        // request={configHpa}
        columnEmptyText={false}
        dataSource={data}
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
        selectItems.map((item,index)=><span>{index+1}、{item.serviceArea}&nbsp;&nbsp;</span>)
      }
      <Divider />
      <Title style={{ marginTop: -10, marginBottom: '20px' }} level={5}>二、填写账号信息</Title>
      <ProFormGroup>
        <ProFormText
          name=''
          label='名称'
          rules={[{ required: true, message: '请请输入名称' }]}
          placeholder='请输入3-15个字'
        />
        <ProFormText
          name=''
          label='登录账号'
          rules={[{ required: true, message: '请输入登录账号' }]}
        />
        <ProFormText
          name=''
          label='联系人'
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormRadio.Group
          name="state"
          label="启用状态"
          initialValue={0}
          options={[
            {
              label: '开启',
              value: 1,
            },
            {
              label: '关闭',
              value: 0,
            },
          ]}
        />
        <ProFormText
          name=''
          label='登录密码'
          rules={[{ required: true, message: '请输入登录账号' }]}
        />
        <ProFormText
          name=''
          label='联系人手机号'
        />
      </ProFormGroup>
      {optionVisible&&<OperationModel
        visible={optionVisible}
        setVisible={serOptionVisible}
        callback={()=>{  }}
      />}
    </DrawerForm>
  )
}
