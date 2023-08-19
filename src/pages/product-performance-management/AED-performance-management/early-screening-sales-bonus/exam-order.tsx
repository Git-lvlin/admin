import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import ProForm, { ProFormDatePicker } from '@ant-design/pro-form'
import ProDescriptions from '@ant-design/pro-descriptions'
import { Drawer } from 'antd'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import { ipoDetail, ipoDetailPage, ipoDetailPageReal } from '@/services/product-performance-management/early-screening-sales-bonus'
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
  type?: string
}

const ExamOrder: FC<props> = ({visible, setVisible, dataSource, type}) => {
  const [data, setData] = useState()
  const [month, setMonth] = useState(dataSource.months)
  const form = useRef<FormInstance>()

  const api = type === 'sales' ? ipoDetailPageReal : ipoDetailPage
  const code = type === 'sales' ? 'ipoDetailPageRealAdm' : 'ipoDetailPageAdm'

  const getFieldsValue = () => {
    const { orderMemberId, orderMemberPhone, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      memberId: dataSource?.memberId, 
      months: month,
      orderMemberId,
      orderMemberPhone
    }
  }

  useEffect(()=> {
    ipoDetail({
      memberId: dataSource?.memberId, 
      months: month
    }).then(res => {
      setData(res.data)
    })
  }, [month])

  const columns: ProColumns[] = [
    {
      title: '下单人用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人用户ID',
      dataIndex: 'orderMemberId',
      hideInTable: true
    },
    {
      title: '下单人手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '下单人手机号码',
      dataIndex: 'orderMemberPhone',
      hideInTable: true
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
      <ProForm
        layout='inline'
        submitter={false}
      >
        <ProFormDatePicker
          label='所属月份'
          name='months'
          fieldProps={{
            picker: 'month',
            format: 'YYYY-MM',
            value: month,
            onChange: (e) => setMonth(e?.format('YYYY-MM')),
            allowClear: false
          }}
          disabled={type === 'sales'}
        />
      </ProForm>
      {
        type !== 'sales' &&
        <Aggregate data={data} info={dataSource}/>
      }
      <ProTable
        columns={columns}
        params={{
          memberId: dataSource?.memberId, 
          months: month,
          ids: type === 'sales' ? dataSource?.idArr : undefined
        }}
        headerTitle={
          type === 'sales' ?
          `销售人用户ID：${dataSource?.memberId}销售人手机号码：${dataSource?.memberPhone} 已支付早筛体检子单信息`:
          ''
        }
        request={api}
        scroll={{x: 'max-content'}}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        options={false}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type={code}
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </Drawer>
  )
}

export default ExamOrder
