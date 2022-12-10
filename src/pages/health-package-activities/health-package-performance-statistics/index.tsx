import { useState, useRef, useEffect } from "react"
import ProTable  from "@ant-design/pro-table"
import ProDescriptions from '@ant-design/pro-descriptions'

import type { FC } from "react"
import type { ProColumns }  from "@ant-design/pro-table"
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions'
import type { FormInstance } from "antd"

import PageContainer from "@/components/PageContainer"
import { amountTransform } from "@/utils/utils"
import { cardCityAgencyOrderPm, cardCityAgencyOrderPmStats } from "@/services/health-package-activities/health-package-performance-statistics"
import styles from "./styles.less"
import Export from "@/components/export"
import Detail from "./detail"
import GcCascader from "@/components/address-cascader"
import RangeInput from "@/components/range-input"

const Aggregate: FC<{form?: any}> = ({form}) => {
  const [data, setData] = useState()

  const getData = () => {
    cardCityAgencyOrderPmStats({
      ...form,
      provinceId: form?.area && form?.area?.[0].value,
      cityId: form?.area && form?.area?.[1].value,
      regionId: form?.area && form?.area?.[2].value,
      minPayAmount: form?.amount && amountTransform(form?.amount.min, '*'),
      maxPayAmount: form?.amount && amountTransform(form?.amount.max, '*'),
      minOrderNums: form?.orderNum && form?.orderNum.min,
      maxOrderNums: form?.orderNum && form?.orderNum.max
    }).then(res=> {
      if(res.success) {
        setData(res.data)
      }
    })
  }

  useEffect(()=> {
    getData()
  }, [form])
  
  const columns: ProDescriptionsItemProps[] = [
    {
      title: '绑定套餐的店铺数量',
      dataIndex: 'storeNums',
      render: _ => `${_ ? _ : 0}家`
    },
    {
      title: '套餐总订单数',
      dataIndex: 'orderNums',
      render: _ => `${_ ? _ : 0}单`
    },

    {
      title: '套餐总订单金额',
      dataIndex: 'payAmount',
      render: _ => `${amountTransform(_, '/')}元`
    },
    {
      title: '所有套餐总吸氢服务',
      dataIndex: 'serviceNums',
      render: _ => `${_ ? _ : 0}次`
    },
    {
      title: '可用吸氢服务的设备总数',
      dataIndex: 'deviceNum',
      render: _ => `${_ ? _ : 0}台`
    }
  ]

  return (
    <ProDescriptions
      columns={columns}
      column={5}
      bordered
      dataSource={data}
    />
  )
}

const HealthPackagePerformance: FC = () => {
  const [searchConfig, setSearchConfig] = useState()
  const [dataSource, setDataSource] = useState()
  const [visible, setVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  const getFieldValue = () => {
    const { area, amount, orderNum, ...rest } = form.current?.getFieldsValue()
    return {
      provinceId: area && area?.[0].value,
      cityId: area && area?.[1].value,
      regionId: area && area?.[2].value,
      minPayAmount: amount && amountTransform(amount.min, '*'),
      maxPayAmount: amount && amountTransform(amount.max, '*'),
      minOrderNums: orderNum && orderNum.min,
      maxOrderNums: orderNum && orderNum.max,
      ...rest
    }

  }

  const columns: ProColumns[] = [
    {
      title: '店主手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '所属店主店铺编号',
      dataIndex: 'houseNumber',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '店铺编号',
      dataIndex: 'houseNumber',
      hideInTable: true,
      align: 'center'
    },
    {
      title: '店主店铺所在区域',
      dataIndex: 'area',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '设备店铺所属省市区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <GcCascader/>
    },
    {
      title: '业绩总额',
      dataIndex: 'amount',
      hideInTable: true,
      renderFormItem: () => <RangeInput/>
    },
    {
      title: '绑定订单数',
      dataIndex: 'orderNum',
      hideInTable: true,
      renderFormItem: () => <RangeInput beforePlaceholder="请输入最低单数" afterPlaceholder="最高单数"/>
    },
    {
      title: '店主店铺地址',
      dataIndex: 'address',
      hideInSearch: true,
      width: '20%',
      align: 'center'
    },
    {
      title: '店铺设备数',
      dataIndex: 'deviceNum',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '套餐订单数',
      dataIndex: 'orderNums',
      hideInSearch: true,
      align: 'center',
      render: (_, r) => <a onClick={()=>{setVisible(true); setDataSource(r)}}>{_}</a>
    },
    {
      title: '套餐订单总金额',
      dataIndex: 'payAmount',
      hideInSearch: true,
      align: 'center',
      render: (_) => amountTransform(_, '/')
    },
    {
      title: '套餐总吸氢服务次数',
      dataIndex: 'serviceNums',
      hideInSearch: true,
      align: 'center'
    }
  ]

  return (
    <PageContainer className={styles.desc}>
      <ProTable
        rowKey='agencyId'
        columns={columns}
        headerTitle={<Aggregate form={searchConfig}/>}
        params={{}}
        options={false}
        onSubmit={()=>{
          setSearchConfig(form.current?.getFieldsValue())
        }}
        onReset={()=> {
          setSearchConfig(undefined)
        }}
        request={cardCityAgencyOrderPm}
        formRef={form}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        search={{
          labelWidth: 140,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type="cardCityAgencyOrderPm"
              conditions={getFieldValue}
            />
          ]
        }}
      />
      {
        visible&&
        <Detail
          visible={visible}
          setVisible={setVisible}
          dataSource={dataSource}
        />
      }
    </PageContainer>
  )
}

export default HealthPackagePerformance
