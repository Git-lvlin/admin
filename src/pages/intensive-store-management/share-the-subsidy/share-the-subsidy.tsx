import React, { useState, useEffect, useRef } from 'react'
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { consumerOrderPage } from '@/services/hydrogen-atom-management/hydrogen-atom-start-recording'
import moment from 'moment'
import { amountTransform } from '@/utils/utils'
import { PageContainer } from '@ant-design/pro-layout';
import Export from '@/pages/export-excel/export'
import { useLocation } from 'umi';
import type { ConsumerOrderPage } from "./data"
import ExportHistory from '@/pages/export-excel/export-history'
import ShareTheSubsidyOrder from './share-the-subsidy-order';


export default () => {
  const [visit, setVisit] = useState<boolean>(false)
  const [subOrderId, setSubOrderId] = useState(null)
  const [orderVisible, setOrderVisible] = useState(false)
  const isPurchase = useLocation().pathname.includes('purchase')
  const ref=useRef()
  const columns:ProColumns<ConsumerOrderPage>[]= [
    {
      title: '分享人手机',
      dataIndex: 'memberPhone',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入用户手机'
      }, 
      order:2,
      hideInTable: true
    },
    {
      title: '店主手机',
      dataIndex: 'memberPhone',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '总补贴金额（元）',
      dataIndex: 'isShopkeeper',
      valueType: 'select',
      hideInSearch : true,
      render:(_)=>{
          return <a onClick={()=>{setOrderVisible(true);setSubOrderId()}}>{_}234234</a>
      }
    },
    {
      title: '总分享订单金额（元）',
      dataIndex: 'isShopkeeper',
      valueType: 'select',
      hideInSearch: true,
       render:(_)=>{
          return <a onClick={()=>{setOrderVisible(true);setSubOrderId()}}>{_}</a>
      }
    },
    {
      title: '总订单数',
      dataIndex: 'storeNo',
      valueType: 'text',
      hideInSearch : true,
    },
    {
      title: '最近交易时间',
      dataIndex: 'storeName',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '店铺名称',
      dataIndex: 'text',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入店铺名称'
      }, 
      order:3
    },
    {
      title: '社区店ID',
      dataIndex: 'createTime',
      valueType: 'text',
      fieldProps:{
        placeholder:'请输入店铺ID'
      }, 
      order:1
    },
    {
      title: '提货点地区',
      dataIndex: 'deviceUseTime',
      valueType: 'text',
      hideInSearch: true
    }
  ];
  const getFieldValue = (searchConfig) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }
  return (
    <PageContainer>
        <ProTable<ConsumerOrderPage>
          actionRef={ref}
          rowKey="id"
          options={false}
          request={consumerOrderPage}
          search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
                key='export'
                change={(e) => { setVisit(e) }}
                type={'queryIotConsumerOrderExport'}
                conditions={()=>{return getFieldValue(searchConfig)}}
              />,
              <ExportHistory key='task' show={visit} setShow={setVisit} type='queryIotConsumerOrderExport'/>,
          ],
          }}
          columns={columns}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
        />
        {
        orderVisible &&
        <ShareTheSubsidyOrder
          id={subOrderId}
          visible={orderVisible}
          setVisible={setOrderVisible}
          onClose={()=>{ref?.current?.reload();setSubOrderId(null)}}
        />
      }
  </PageContainer>
  )
}