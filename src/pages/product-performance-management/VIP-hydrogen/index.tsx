import TimeSelect from '@/components/time-select'
import { useState, useRef, useEffect } from "react"
import ProTable from '@/components/pro-table'
import ProDescriptions from '@ant-design/pro-descriptions'
import moment from 'moment'

import type { FC } from "react"
import type { ProColumns } from '@ant-design/pro-table'
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import PageContainer from '@/components/PageContainer'
import { vipStoreHydrogenPm, vipStoreHydrogenPmStats } from "@/services/product-performance-management/VIP-hydrogen"
import { amountTransform } from '@/utils/utils'
import AddressCascader from "@/components/address-cascader"
import styles from "../styles.less"
import Export from '@/components/export'

const Aggregate: FC<any> = ({form}) => {
  const [data, setData] = useState()

  const getData = async () => {
    const orderStatus = form?.orderStatus ? form?.orderStatus : '4'
    await vipStoreHydrogenPmStats({
      ...form,
      orderStatus
    }).then(res => {
      setData(res.data)
    })
  }

  useEffect(()=> {
    getData()
  }, [form])
  
  const columns: ProDescriptionsItemProps[] = [
    {
      title: '总业绩金额',
      dataIndex: 'payAmount',
      render: (_) => `${amountTransform(_, '/')}元`
    },
    {
      title: '总下单店铺数量',
      dataIndex: 'totalUserNum',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '总销售数量',
      dataIndex: 'totalBuyNum',
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

const VIPHydrogen: FC = () => {
  const [searchConfig, setSearchConfig] = useState()
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const {payTime, area, ...rest} = form.current?.getFieldsValue()
    return {
      startTime: payTime && moment(payTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: payTime && moment(payTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: area && area?.[0]?.value,
      cityId: area && area?.[1]?.value,
      regionId: area && area?.[2]?.value,
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '下单人手机号码',
      dataIndex: 'memberPhone',
      align: 'center'
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
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      renderFormItem: () => <TimeSelect showTime={false}/>,
      initialValue: [moment('2022-9-24'), moment(+new Date())],
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
      title: '订单状态',
      dataIndex: 'orderStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      valueType: 'select',
      initialValue: '4',
      valueEnum: {
        '1': '已完成（已过售后期）',
        '2': '售后中',
        '3': '已退款',
        '4': '所有已完成'
      },
      hideInTable: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'storeMemberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人用户ID',
      dataIndex: 'recomMemberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人店铺编号',
      dataIndex: 'storeHomeNumber',
      align: 'center'
    },
    {
      title: '推荐人店铺所在区域',
      dataIndex: 'storeArea',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人的店铺省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '推荐人店铺地址',
      dataIndex: 'storeAddress',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '氢原子市代',
      dataIndex: 'cityProxy',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '市办事处',
      dataIndex: 'cityAgencyName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '间推人手机号',
      dataIndex: 'interPushMemberPhone',
      align: 'center',
      hideInSearch: true
    },
  ]

  return (
    <PageContainer className={styles.desc}>
      <div className={styles.title}>2022年9月24日至今 VIP店主购买氢原子交易业绩明细</div>
      <ProTable
        rowKey='id'
        columns={columns}
        params={{}}
        request={vipStoreHydrogenPm}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        scroll={{x: 'max-content'}}
        formRef={form}
        headerTitle={<Aggregate form={searchConfig}/>}
        options={false}
        onSubmit={()=>{
          setSearchConfig(form.current?.getFieldsValue())
        }}
        onReset={()=> {
          setSearchConfig(undefined)
        }}
        search={{
          labelWidth: 140,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type="vipStoreHydrogenPm"
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </PageContainer>
  )
}

export default VIPHydrogen
