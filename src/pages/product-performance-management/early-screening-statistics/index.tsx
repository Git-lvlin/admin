import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import { awardCount, aednoSubOrder } from '@/services/product-performance-management/early-screening-statistics'
import styles from "./styles.less"
import Export from '@/components/export'
import RangeNumberInput from '@/components/range-number-input'
import PageContaine from "@/components/PageContainer/PageContainer"
import Detail from './detail'

const Aggregate: FC<any> = ({data}) => {
  
  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总领取人数',
      dataIndex: 'userNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '总累计领取月数',
      dataIndex: 'totalMonths',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '总领取IPO奖金(元)',
      dataIndex: 'ipoAmountDesc',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '总领取红酒(箱)',
      dataIndex: 'wineNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '总领取书籍(本)',
      dataIndex: 'bookNum',
      render: _ => `${_ ? _ : 0}`
    },
    {
      title: '总领取VIP权益(个月)',
      dataIndex: 'vipMonths',
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
    />
  )
}

const EarlyScreeningStatistics: FC = () => {
  const [data, setData] = useState()
  const [change, setChange] = useState(0)
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    const { IPOAmount, ...rest } = form.current?.getFieldsValue()
    awardCount({
      ipoStartAmount: IPOAmount?.min,
      ipoEndAmount: IPOAmount?.max,
      ...rest
    }).then(res => {
      if(res.code === 0) {
        setData(res.data)
      }
    })
  }, [change])

  const getFieldsValue = () => {
    const { IPOAmount, ...rest } = form.current?.getFieldsValue()
    return {
      ipoStartAmount: IPOAmount?.min,
      ipoEndAmount: IPOAmount?.max,
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '排名',
      dataIndex: 'rank',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '销售人用户ID',
      dataIndex: 'memberId',
      align: 'center'
    },
    {
      title: '销售人手机号码',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '领取月数(个月)',
      dataIndex: 'totalMonths',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属月份',
      dataIndex: 'months',
      valueType: 'dateMonth',
      hideInTable: true
    },
    {
      title: '状态',
      dataIndex: 'process',
      valueType: 'select',
      valueEnum: {
        1: '未合格',
        2: '待完成',
        4: '待到期',
        8: '待申请',
        16: '待审核',
        32: '待通知',
        64: '待领取',
        128: '已领取',
      },
      hideInTable: true
    },
    {
      title: 'IPO奖金金额',
      dataIndex: 'IPOAmount',
      hideInTable: true,
      renderFormItem: () => <RangeNumberInput />
    },
    {
      title: '累计IPO奖金额(元)',
      dataIndex: 'ipoAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '累计红酒(箱)',
      dataIndex: 'wineNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '累计书籍(本)',
      dataIndex: 'bookNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '累计VIP权益(个月)',
      dataIndex: 'vipMonths',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '明细',
      valueType: 'option',
      align: 'center',
      render: (_, r)=> <a onClick={()=> {setVisible(true); setId(r)}}>查看明细</a>
    }
  ]

  return (
    <PageContaine className={styles.desc}>
      <ProTable
        rowKey='memberId'
        columns={columns}
        params={{}}
        request={aednoSubOrder}
        scroll={{x: 'max-content'}}
        formRef={form}
        onSubmit={()=> setChange(change + 1)}
        onReset={()=> setChange(0)}
        headerTitle={<Aggregate data={data} />}
        options={false}
        postData={(v: any)=> {
          const arr = v.records.map((res: any, index: number) => {
            return ({
              ...res,
              rank: ((index + 1) + (v.page - 1) * v.size)
            })
          })
          return arr
        }}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='awardCountPage'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
          id={id}
        />
      }
    </PageContaine>
  )
}

export default EarlyScreeningStatistics
