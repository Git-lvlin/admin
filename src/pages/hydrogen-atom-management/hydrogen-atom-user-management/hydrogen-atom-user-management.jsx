import { useState, useRef, useEffect } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import AddedEnabledHydrogen from './added-enabled-hydrogen'
import StoreInformation from './store-information'
import { Descriptions } from 'antd';
import moment from 'moment'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import RangeInput from "@/components/range-input"

import { queryPage } from "@/services/user-management/hydrogen-atom-user-management"

export default function TransactionData () {
  const [visible, setVisible] = useState(false)
  const [resetVisible, setResetVisible] = useState(false)
  const [storeVisible, setStoreVisible] = useState(false)
  const [detailList,setDetailList]=useState()
  const [type, setType] = useState(0)
  const [msgDetail, setMsgDetail] = useState()
  const form = useRef()
  const tableColumns= [
    {
      title: '用户ID',
      dataIndex: 'memberId',
      order: -1,
    },
    {
      title: '手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      ondrag: 4,
      fieldProps:{
        placeholder:'请输入手机号码'
      }
    },
    {
      title: '注册时间',
      dataIndex: 'memberRegisterTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最近登录时间',
      dataIndex: 'lastLoginTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '免费使用次数',
      dataIndex: 'freeTimes',
      align: 'center',
      ondrag: 3,
      fieldProps:{
        placeholder:'请输入免费使用次数'
      }
    },
    {
      title: '当前免费机会状态',
      dataIndex: 'freeStatus',
      align: 'center',
      hideInTable: true,
      vulueType: 'select',
      valueEnum:{
        0: '免费中',
        1: '已过期',
      }
    },
    {
      title: '当前免费状态',
      dataIndex: 'freeStatusName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '当前免费机会已使用次数',
      dataIndex: 'usedTimes',
      align: 'center',
      renderFormItem: ()=> <RangeInput beforePlaceholder='最低次数' afterPlaceholder='最高次数' />,
      hideInTable: true
    },
    {
      title: '已使用次数',
      dataIndex: 'usedTimes',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return <a onClick={()=>{setStoreVisible(true);setMsgDetail(data);setType(1)}}>{_}</a>
        }else{
          return _
        }
      },
      hideInSearch: true
    },
    {
      title: '免费使用时段',
      dataIndex: 'freeUsagePeriod',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '免费机会原因',
      dataIndex: 'freeReason',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作人',
      dataIndex: 'operater',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    }
  ]
  return (
    <PageContainer title={false}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setVisible(true) }}>添加免费启用氢原子机会</Button>
        </div>
      </Card>
      <ProTable
        rowKey="agencyId"
        columns={tableColumns}
        request={queryPage}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          defaultCollapsed: false,
          labelWidth: 165,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        scroll={{ x: 'max-content' }}
      />
      {
        visible&&
        <AddedEnabledHydrogen
          visible={visible}
          setVisible={setVisible}
          callback={()=>{ form?.current?.reload()}}
          onClose={()=>{ form?.current?.reload()}}
        />
      }
      {
        storeVisible&&
        <StoreInformation
          visible={storeVisible}
          setVisible={setStoreVisible}
          msgDetail={msgDetail}
          onClose={()=>{ form?.current?.reload();setMsgDetail(null)}}
          type={type}
        />
      }
    </PageContainer>
  )
}
