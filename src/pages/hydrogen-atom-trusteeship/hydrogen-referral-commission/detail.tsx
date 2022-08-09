import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Space, Button, Modal, Steps, Spin,Image } from 'antd';
import { findMemberDeviceTotal, findMemberDevicePage } from "@/services/hydrogen-atom-management/transaction-data"
import { amountTransform } from '@/utils/utils'
import type { ProColumns } from "@ant-design/pro-table"
import type { DescriptionsProps, TableProps } from "./data"
import type { FormInstance } from "@ant-design/pro-form"
import ProTable from "@ant-design/pro-table"
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'

export default (props) => {
  const { visible, setVisible, onClose, id } = props;
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const [visit, setVisit] = useState(false)
  const ref = useRef<FormInstance>()
  const columns: ProColumns<TableProps>[] = [
    {
      title: '推荐人手机',
      dataIndex: 'memberId',
      align: 'center',
    },
    {
      title: '佣金类型',
      dataIndex: 'nickName',
      align: 'center',
      valueEnum: {
        0: '投资商设备推荐佣金',
        1: '购卡推荐佣金',
        2: '运营设备推荐佣金'
      },
      hideInTable: true,
    },
    {
      title: '佣金类型',
      dataIndex: 'nickName',
      align: 'center',
      valueEnum: {
        0: '投资商设备推荐佣金',
        1: '购卡推荐佣金',
        2: '运营设备推荐佣金'
      },
      hideInSearch: true,
    },
    {
      title: '提成金额（元）',
      dataIndex: 'icon',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '订单金额（元）',
      dataIndex: 'icon',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '订单号',
      dataIndex: 'userType',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '交易时间',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true,
    },
  ]
  const getFieldValue = (searchConfig) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
      ...rest,
    }
  }
  return (
    <Drawer
      title="详情"
      width={1200}
      placement="right"
      onClose={() => { setVisible(false);onClose() }}
      visible={visible}
      footer={false}
    >
      <ProTable<TableProps>
        rowKey="memberId"
        columns={columns}
        request={findMemberDevicePage}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Export
            key='export'
            change={(e) => { setVisit(e) }}
            type={'day-red-detail-export'}
            conditions={()=>{return getFieldValue(searchConfig)}}
          />,
          <ExportHistory key='task' show={visit} setShow={setVisit} type='day-red-detail-export'/>,
          ]
        }}
      />
    </Drawer>
  )
}
