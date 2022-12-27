import { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import type { DetailProps, DataProps } from './data'

import { detail } from "@/services/health-package-activities/promotion-activity-management"

const Detail: FC<DetailProps> = ({visible, handleCancel, storeNo}) => {
  const [tableData, setTableData] = useState([])
  const [data, setData] = useState<DataProps>()

  useEffect(()=> {
    detail({storeNo}).then(res => {
      if(res.success) {
        setData(res.data)
        setTableData(res.data.machine)
      }
    })
  }, [])

  const columns: ProColumns[] = [
    {
      title: '设备ID',
      dataIndex: 'imei',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'deviceStatus',
      align: 'center'
    },
    {
      title: '参加类型',
      dataIndex: 'activityTypeDesc',
      align: 'center'
    },
    {
      title: '激活时间',
      dataIndex: 'activeTime',
      align: 'center'
    },
    {
      title: '参与活动时间',
      dataIndex: 'createTime',
      align: 'center'
    },
    {
      title: '使用氢卡启动次数',
      dataIndex: 'startUpNum',
      align: 'center'
    }
  ]

  return (
    <Modal
      title='参与活动设备'
      width={800}
      visible={visible}
      destroyOnClose
      footer={[
        <Button type='primary' key='close' onClick={handleCancel}>关闭</Button>
      ]}
      onCancel={handleCancel}
    >
      <div>
        <div>店铺编号：{data?.storeHouseNumber}</div>
        <div>店铺名称：{data?.storeName}</div>
        <div>店主姓名：{data?.realName}</div>
        <div>店主手机：{data?.memberPhone}</div>
        <div>店铺自提点地址：{data?.address}</div>
      </div>
      <ProTable
        search={false}
        headerTitle='店铺参与活动的设备：'
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
          hideOnSinglePage: true
        }}
        columns={columns}
        dataSource={tableData}
        options={false}
      />
    </Modal>
  )
}

export default Detail