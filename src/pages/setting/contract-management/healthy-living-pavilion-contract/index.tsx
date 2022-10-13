import { useState, useRef } from "react"
import ProTable from "@ant-design/pro-table"
import moment from "moment"

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from "antd"
import type { HealthyLivingPavilionProps } from "../data"

import {  } from "@/services/setting/contract-management"

const HealthyLivingPavilionContract: FC = () => {

  const columns: ProColumns<HealthyLivingPavilionProps>[] = [
    {
      title: '序号',
      valueType: 'indexBorder'
    },
    {
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '店主手机',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '社区店ID',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '签订时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '开通生活馆缴费单号',
      dataIndex: '',
      align: 'center',
    },
    {
      title: '合同ID',
      dataIndex: '',
      align: 'center',
    }
  ]

  return (
    <>
      <ProTable<HealthyLivingPavilionProps>
        rowKey='id'
        columns={columns}
        params={{}}
        // request={}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
      />
    </>
  )
}

export default HealthyLivingPavilionContract