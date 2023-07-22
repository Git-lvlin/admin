import React, { useState, useRef } from 'react'
import moment from 'moment'
import { Button } from 'antd'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import Export from '@/components/export'
import ImportFile from '@/components/ImportFile'
import TimeSelect from '@/components/time-select'
import { waitDetectionUser } from '@/services/product-performance-management/early-user-management'
import Notice from './notice'

const WaitDetectionUser: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [noticeVisible, setNoticeVisible] = useState<boolean>(false)
  const [selected, setSelected] = useState<React.Key[] | undefined>([])
  const [keys, setKeys] = useState<number>()
  const [total, setTotal] = useState<number>()
  const [data, setData] = useState()
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
    {
      title: '本页全选',
      align: 'left', 
      width: '80px',
      hideInSearch: true
    },
    {
      title: '通知状态',
      dataIndex: 'isNoticeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '通知状态',
      dataIndex: 'isNotice',
      valueType: 'select',
      valueEnum: {
        0: '待通知',
        1: '已通知'
      },
      hideInTable: true
    },
    {
      title: '早筛码',
      dataIndex: 'signCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '姓名',
      dataIndex: 'signUser',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '早筛人手机号',
      dataIndex: 'signMemberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '手机号',
      dataIndex: 'signMemberPhone',
      hideInTable: true
    },
    {
      title: '早筛报名时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '预约采样日期',
      dataIndex: 'noticeTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '预约采样日期',
      dataIndex: 'noticeTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '预约时段',
      dataIndex: 'noticeTimePeriod',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '身份证号码',
      dataIndex: 'idcard',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '性别',
      dataIndex: 'senderDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子单号',
      dataIndex: 'subOrderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司名称',
      dataIndex: 'subName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r)=> <a onClick={()=> {setNoticeVisible(true); setData(r)}}>通知采样</a>
    }
  ]

  const getFieldsValue = () => {
    const { noticeTime, ...rest } = form.current?.getFieldsValue()

    return {
      noticeStartTime: noticeTime && moment(noticeTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      noticeEndTime: noticeTime && moment(noticeTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      subOrderSnArr: selectedRowKeys.length ? selectedRowKeys : undefined,
      ...rest
    }
  }
  
  const count = selectedRowKeys.length > 0 ? selectedRowKeys.length : total
  const rowKeys = selectedRowKeys.length > 0 ? selectedRowKeys : undefined

  return (
    <>
      <ProTable
        rowKey='subOrderSn'
        columns={columns}
        request={waitDetectionUser}
        params={{}}
        options={false}
        rowSelection={{
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: _ => {
            setSelectedRowKeys(_)
          }
        }}
        actionRef={actRef}
        toolBarRender={()=> [
          <span>导出后录入活检编号和物流信息，然后再导入完成样本发货</span>
        ]}
        headerTitle={
          <Button
            type='primary'
            onClick={()=> {
              setNoticeVisible(true);
              setData(undefined);
              setKeys(count)
              setSelected(rowKeys)
            }}
          >
            通知用户采样{selectedRowKeys.length > 0 ? '（选中项）' : '（查询结果）'}
          </Button>
        }
        formRef={form}
        paginationProps={{
          showQuickJumper: true,
          pageSize: 10,
          showTotal: (total: number, range: [number, number]) => {
            setTotal(total)
            return `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
          }
        }}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='2'
              type='scrAdmWaitDetectUser'
              text={`导出${selectedRowKeys.length > 0 ? '（选中项）' : '（查询结果）'}`}
              conditions={getFieldsValue}
            />,
            <ImportFile
              key='3'
              code='scrAdmDetectUser'
              title='导入液体活检编号和物流单号'
            />
          ]
        }}
      />
      {
        noticeVisible &&
        <Notice
          visible={noticeVisible}
          setVisible={setNoticeVisible}
          data={data}
          callback={()=> {actRef.current?.reload(); setSelectedRowKeys([])}}
          num={keys}
          getFields={form}
          selectedKeys={selected}
        />
      }
    </>
  )
}

export default WaitDetectionUser