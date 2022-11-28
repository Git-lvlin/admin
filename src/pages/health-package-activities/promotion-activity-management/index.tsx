import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'
import type { FC } from 'react'

import PageContainer from "@/components/PageContainer"
import { joinStore } from "@/services/health-package-activities/health-package-order-management"
import Detail from './detail'
import Export from '@/components/export'

const PromotionActivityManagement: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [storeNo, setStoreNo] = useState<string>()

  const form = useRef<FormInstance>()

  const columns: ProColumns[]  = [
    {
      dataIndex: 'searchVal',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入店铺名称/店主手机号'
      }
    },
    {
      title: '店铺编号',
      dataIndex: 'storeHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店主手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店主姓名',
      dataIndex: 'realName',
      align: 'center',
      hideInSearch: true
    },
    // {
    //   title: '店铺吸氢服务数',
    //   dataIndex: 'serviceNums',
    //   align: 'center',
    //   hideInSearch: true
    // },
    // {
    //   title: '参与活动类型',
    //   dataIndex: 'activityStatusDesc',
    //   align: 'center',
    //   hideInSearch: true
    // },
    // {
    //   dataIndex: 'activityType',
    //   hideInTable: true,
    //   valueType: 'select',
    //   valueEnum: {
    //     1: '报名参加',
    //     2: '自动参加'
    //   },
    //   fieldProps: {
    //     placeholder: '请选择参加活动类型'
    //   }
    // },
    {
      title: '店铺自提点地址',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true,
      width: '30%'
    },
    {
      title: '参与时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '活动设备数',
      dataIndex: 'mchNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.mchNum > 0)
          return <a onClick={()=>{ setModalVisible(true); setStoreNo(r.storeNo)}}>{_}</a>
        return <span>{_}</span>
      }
    }
  ]
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        params={{}}
        request={joinStore}
        options={false}
        formRef={form}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='healthyCardReg'
              conditions={{...form.current?.getFieldsValue()}}
            />
          ]
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
      />
      {
        modalVisible&&
        <Detail
          visible={modalVisible}
          handleCancel={() => setModalVisible(false)}
          storeNo={storeNo}
        />
      }
    </PageContainer>
  )
}

export default PromotionActivityManagement
