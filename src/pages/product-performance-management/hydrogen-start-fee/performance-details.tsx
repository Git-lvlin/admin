import TimeSelect from '@/components/time-select'
import { useState, useRef } from "react"
import ProTable from '@/components/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import { hydrogenStartUpPm } from "@/services/product-performance-management/hydrogen-start-fee"
import { amountTransform } from '@/utils/utils'
import styles from "../styles.less"
import Export from '@/components/export'

const Aggregate: FC<any> = ({data}) => {
  
  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总业绩金额',
      dataIndex: 'payAmount',
      render: (_) => `${amountTransform(_, '/')}元`
    },
    {
      title: '总下单店铺数量',
      dataIndex: 'storeNum',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '总销售数量',
      dataIndex: 'deviceNum',
      render: _ => `${_ ? _ : 0}台`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={{xl: 2, xxl: 3}}
      bordered
      dataSource={data}
    />
  )
}

const PerformanceDetails: FC = () => {
  const [data, setData] = useState()
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const {payTime, ...rest} = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'memberPhone',
      align: 'center',
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center'
    },
    {
      title: '订单编号',
      dataIndex: 'orderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备ID',
      dataIndex: 'imei',
      align: 'center'
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      renderFormItem: () => <TimeSelect showTime={false}/>,
      initialValue: [moment('2022-9-24 00:00:00'), moment(+new Date())],
      hideInTable: true
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/')
    },
    {
      title: '店主手机号',
      dataIndex: 'storeMemberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店主用户ID',
      dataIndex: 'recomMemberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店主店铺编号',
      dataIndex: 'storeHomeNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺编号',
      dataIndex: 'storeHomeNumber',
      hideInTable: true
    },
    {
      title: '店主店铺所在区域',
      dataIndex: 'storeArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备所属市办事处',
      dataIndex: 'agencyName',
      align: 'center'
    },
    {
      title: '店主店铺地址',
      dataIndex: 'storeAddress',
      align: 'center',
      width: '12%',
      hideInSearch: true
    },
    {
      title: '市办事处',
      dataIndex: 'cityAgencyName',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <div className={styles.desc}>
      <div className={styles.title}>2022年9月24日至今 氢原子设备启动费业绩明细</div>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        request={hydrogenStartUpPm}
        postData={(v:any)=>{
          setData(v[0].total)
          return (v[0].res)
        }}
        scroll={{x: 'max-content'}}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={form}
        headerTitle={<Aggregate data={data}/>}
        options={false}
        search={{
          labelWidth: 140,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type="hydrogenStartUpPm"
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </div>
  )
}

export default PerformanceDetails
