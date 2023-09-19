import { useRef, useState } from 'react'
import {
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
} from 'antd'

import type { FormInstance } from 'antd'
import OperationModel from './operation-model'
import { accountProviderList } from '@/services/outpatient-service-management/digital-store-account-management'
import md5 from 'blueimp-md5';

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
  const [submitMsg, setSubmitMsg] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectItems, setSelectItems] = useState([]);
  const [optionVisible, serOptionVisible] = useState<boolean>(false)
  
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
      setSubmitMsg({...values,password:values?.password&&md5(values?.password),agencyList:selectedRowKeys})
    } catch (error) {
      console.log('error',error)
    }

 }
  return (
    <DrawerForm
      layout='horizontal'
      title='大健康服务项目 / 数字化门店账号管理  / 添加账号'
      width={1000}
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
              <Button type="primary" key="submit" onClick={() => { props.form?.submit() }}>
                 提交
              </Button>,
              <Button type="default" onClick={() => props.form?.resetFields()}>
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
      <Divider />
      <Title style={{ marginTop: -10, marginBottom: '20px' }} level={5}>二、填写账号信息</Title>
      <ProFormGroup>
        <ProFormText
          name='nickName'
          label='名称'
          rules={[
            { required: true, message: '请输入名称' },
            { min: 3, max: 15, message: '请输入3-15个字' },
          ]}
          placeholder='请输入3-15个字'
        />
        <ProFormText
          name='userName'
          label='登录账号'
          rules={[{ required: true, message: '请输入登录账号' }]}
        />
        <ProFormText
          name='contactName'
          label='联系人'
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormRadio.Group
          name="status"
          label="启用状态"
          initialValue={0}
          options={[
            {
              label: '开启',
              value: 1,
            },
            {
              label: '关闭',
              value: 2,
            },
          ]}
        />
        <ProFormText
          name='password'
          label='登录密码'
          rules={[
            { required: true, message: '请输入登录账号' },
            { min:6, message: '密码最少6个字符' },
          ]}
        />
        <ProFormText
          name='contactPhone'
          label='联系人手机号'
        />
      </ProFormGroup>
      {optionVisible&&<OperationModel
        visible={optionVisible}
        setVisible={serOptionVisible}
        callback={()=>{ callback(); setVisible(false) }}
        msgDetail={submitMsg}
      />}
    </DrawerForm>
  )
}
