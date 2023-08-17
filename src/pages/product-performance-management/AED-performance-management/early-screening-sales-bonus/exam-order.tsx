import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import { Drawer } from 'antd'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import { ipoDetail, ipoDetailPage } from '@/services/product-performance-management/early-screening-sales-bonus'
import styles from "./styles.less"
import Export from '@/components/export'

const Aggregate: FC<any> = ({data, info}) => {
  
  const columns: ProDescriptionsItemProps[] = [
    {
      title: '支付单数',
      dataIndex: 'orderNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '待完成单数',
      dataIndex: 'noFinishNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '退款单数',
      dataIndex: 'refundNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '完成件数',
      dataIndex: 'finishNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '完成人数',
      dataIndex: 'directNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '状态',
      dataIndex: 'processDesc',
      render: _ => `${_ ? _ : 0}`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={{xl: 3, xxl: 6}}
      bordered
      dataSource={data}
      layout='vertical'
      title={`销售人用户ID：${info?.memberId}销售人手机号码：${info?.memberPhone} 已支付早筛体检子单信息`}
    />
  )
}

type props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  dataSource?: any
}

const ExamOrder: FC<props> = ({visible, setVisible, dataSource}) => {
  const [data, setData] = useState()
  const [change, setChange] = useState(0)
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { months, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      memberId: dataSource?.memberId, 
      months: months ? moment(months).format('YYYY-MM') : dataSource?.months,
    }
  }

  useEffect(()=> {
    ipoDetail({
      memberId: dataSource?.memberId, 
      months: dataSource?.months,
      orderMemberId: form.current?.getFieldsValue().orderMemberId,
      orderMemberPhone: form.current?.getFieldsValue().orderMemberPhone,
    }).then(res => {
      setData(res.data)
    })
  }, [change])

  const columns: ProColumns[] = [
    {
      title: '下单人用户ID',
      dataIndex: 'orderMemberId',
      align: 'center',
    },
    {
      title: '下单人手机号码',
      dataIndex: 'orderMemberPhone',
      align: 'center'
    },
    {
      title: '子单号',
      dataIndex: 'subOrderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子单状态',
      dataIndex: 'processDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签收时间',
      dataIndex: 'reportTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '样本运单号',
      dataIndex: 'shippingCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '早筛码',
      dataIndex: 'signCode',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '早筛人手机号码',
      dataIndex: 'signMemberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '报名时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '主单号',
      dataIndex: 'sumOrderId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属月份',
      dataIndex: 'months',
      valueType: 'dateMonth',
      hideInTable: true,
      initialValue: dataSource?.months
    }
  ]

  return (
    <Drawer 
      title={false}
      visible={visible}
      onClose={()=> setVisible(false)}
      width={1200}
      className={styles.desc}
    >
      <ProTable
        rowKey='subOrderSn'
        columns={columns}
        params={{
          memberId: dataSource?.memberId, 
          months: dataSource?.months
        }}
        request={ipoDetailPage}
        scroll={{x: 'max-content'}}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        onSubmit={()=> setChange(change + 1)}
        onReset={()=> setChange(0)}
        headerTitle={<Aggregate data={data} info={dataSource}/>}
        options={false}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='ipoDetailPageAdm'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </Drawer>
  )
}

export default ExamOrder
