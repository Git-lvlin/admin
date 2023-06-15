import { useState, useRef } from "react"
import ProTable from '@/components/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import { hyStartUpMonthStats } from "@/services/product-performance-management/hydrogen-start-fee"
import { amountTransform } from '@/utils/utils'
import styles from "../styles.less"
import Export from '@/components/export'
import moment from "moment"

const Aggregate: FC<any> = ({data}) => {
  
  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总付费启动次数',
      dataIndex: 'totalNums',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '总付费金额',
      dataIndex: 'payAmount',
      render: (_) => `${amountTransform(_, '/')}`
    },
    {
      title: '总付费下单店铺数',
      dataIndex: 'storeNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '月份数量',
      dataIndex: 'totalMonths',
      render: _ => `${_ ? _ : 0}`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={{xl: 2, xxl: 4}}
      bordered
      dataSource={data}
    />
  )
}

const MonthlyPerformance: FC = () => {
  const [data, setData] = useState()
  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center'
    },
    {
      title: '年份',
      dataIndex: 'years',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '年份',
      dataIndex: 'years',
      valueType: 'dateYear',
      initialValue: moment(+new Date()),
      fieldProps: {
        allowClear: false
      },
      hideInTable: true
    },
    {
      title: '月份',
      dataIndex: 'months',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '季度',
      dataIndex: 'quarter',
      valueType: 'select',
      valueEnum: {
        q1: '第一季度',
        q2: '第二季度',
        q3: '第三季度',
        q4: '第四季度',
      },
      hideInTable: true
    },
    {
      title: '启动费金额',
      dataIndex: 'payAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '启动次数',
      dataIndex: 'totalNums',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '付费下单店铺数',
      dataIndex: 'storeNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '设备所属市办事处',
      dataIndex: 'agencyName',
      align: 'center'
    }
  ]

  return (
    <div className={styles.desc}>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        request={hyStartUpMonthStats}
        postData={(v:any)=>{
          setData(v[0].total)
          return (v[0].res)
        }}
        scroll={{x: 'max-content'}}
        formRef={form}
        headerTitle={<Aggregate data={data}/>}
        options={false}
        search={{
          labelWidth: 140,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type="hyStartUpMonth"
              conditions={form.current?.getFieldsValue()}
            />
          ]
        }}
      />
    </div>
  )
}

export default MonthlyPerformance
