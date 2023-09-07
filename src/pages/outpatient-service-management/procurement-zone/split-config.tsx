import { useRef, useState, useEffect } from 'react'
import {
  DrawerForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-form'
import {
  Divider,
  Input,
  InputNumber,
  Select
} from 'antd'
import Big from 'big.js'

import type { FormInstance } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'

import styles from './styles.less'
import { provideSetDivideInfo } from '@/services/outpatient-service-management/procurement-zone'
import Store from './store'
import CountyServiceProvider from './county-service-provider'
import { RATIO } from '@/constants'
import { amountTransform } from '@/utils/utils'

const storeData = [
  {
    id: 1,
    roleCode: 'goodsAmount',
    roleName: '供应商',
    name: '产品成本',
    isChannelFee: 1,
    isChannelFeeDesc: '承担通道费',
    settleType: 1,
    settleTypeDesc: '汇付',
    trueUnfrezeeType: '4',
    trueUnfrezeeTypeDesc: '确认收货后解冻',
    businessUnfrezeeType: '4',
    businessUnfrezeeTypeDesc: '确认收货后解冻'
  },
  {
    id: 2,
    roleCode: 'platform',
    roleName: '平台',
    name: '运营费用',
    isChannelFee: 1,
    isChannelFeeDesc: '承担通道费',
    settleType: 1,
    settleTypeDesc: '汇付',
    trueUnfrezeeType: '1',
    trueUnfrezeeTypeDesc: '分账后即解冻',
    businessUnfrezeeType: '1',
    businessUnfrezeeTypeDesc: '分账后即解冻',
  },
  {
    id: 3,
    roleCode: 'healthyProvider',
    roleName: '区县服务商',
    settleType: 3,
    settleTypeDesc: '线下',
    trueUnfrezeeType: '6',
    trueUnfrezeeTypeDesc: '满足业务解冻',
    businessUnfrezeeType: '6',
    businessUnfrezeeTypeDesc: '满足业务解冻',
  },
  {
    id: 4,
    roleCode: 'orderDirectMember',
    roleName: '订单直推人',
    settleType: 2,
    settleTypeDesc: '线上代付',
    trueUnfrezeeType: '6',
    trueUnfrezeeTypeDesc: '满足业务解冻',
    businessUnfrezeeType: '6',
    businessUnfrezeeTypeDesc: '满足业务解冻',
  },
  {
    id: 5,
    roleCode: 'businessCollege',
    roleName: '商学院',
    settleType: 3,
    settleTypeDesc: '线下',
    trueUnfrezeeType: '6',
    trueUnfrezeeTypeDesc: '满足业务解冻',
    businessUnfrezeeType: '6',
    businessUnfrezeeTypeDesc: '满足业务解冻',
  },
  {
    id: 6,
    roleCode: 'companyManager',
    roleName: '管理',
    settleType: 3,
    settleTypeDesc: '线下',
    trueUnfrezeeType: '6',
    trueUnfrezeeTypeDesc: '满足业务解冻',
    businessUnfrezeeType: '6',
    businessUnfrezeeTypeDesc: '满足业务解冻',
  }
]

const countyServiceProviderData = [
  {
    id: 1,
    roleCode: 'goodsAmount',
    roleName: '供应商',
    name: '产品成本',
    isChannelFee: 1,
    isChannelFeeDesc: '承担通道费',
    settleType: 1,
    settleTypeDesc: '汇付',
    trueUnfrezeeType: '4',
    trueUnfrezeeTypeDesc: '确认收货后解冻',
    businessUnfrezeeType: '4',
    businessUnfrezeeTypeDesc: '确认收货后解冻'
  },
  {
    id: 2,
    roleCode: 'platform',
    roleName: '平台',
    name: '运营费用',
    isChannelFee: 1,
    isChannelFeeDesc: '承担通道费',
    settleType: 1,
    settleTypeDesc: '汇付',
    trueUnfrezeeType: '1',
    trueUnfrezeeTypeDesc: '分账后即解冻',
    businessUnfrezeeType: '1',
    businessUnfrezeeTypeDesc: '分账后即解冻',
  },
]

type props = {
  meta: any, 
  callback: ()=> void
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
}

const SplitConfig: React.FC<props> = ({visible, setVisible, meta, callback})=> {
  const [count, setCount] = useState(2)
  const [storeDataSource, setStoreDataSource] = useState<any>(storeData)
  const [countyServiceProviderdataSource, setCountyServiceProviderdataSource] = useState<any>(countyServiceProviderData)
  const [minPrice, setMinPrice] = useState<any>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    form.current?.setFieldsValue({
      billType: 2
    })
  }, [])

  useEffect(()=> {
    if(meta?.divideInfoList1?.length > 0) {
      setStoreDataSource(
        meta?.divideInfoList1.map((it: any) => {
          return {
            ...it,
            billVal: amountTransform(it.billVal, '/')
          }
        })
      )
    }
    if(meta?.divideInfoList2?.length > 0) {
      setCountyServiceProviderdataSource(
        meta?.divideInfoList2.map((it: any) => {
          return {
            ...it,
            billVal: amountTransform(it.billVal, '/')
          }
        })
      )
    }
  }, [meta])

  useEffect(()=> {
    setMinPrice(computedValue(meta, storeDataSource, count))
  }, [storeDataSource])
  

  const submit = (val: any) => {
    return new Promise<void>((resolve, reject) => {
      const arr = storeDataSource.map((res: any) => {
        if(res.roleCode === 'goodsAmount') {
          return {
            ...res,
            billVal: meta.retailSupplyPrice
          }
        }
        if(res.roleCode === 'platform') {
          return {
            ...res,
            billVal: amountTransform(+minPrice)
          }
        } else {
          return {
            ...res,
            billVal: amountTransform(res.billVal)
          }
        }
      })

      const arr1 = countyServiceProviderdataSource.map((res: any) => {

        if(res.roleCode === 'goodsAmount') {
          return {
            ...res,
            billVal: meta.retailSupplyPrice
          }
        }
        if(res.roleCode === 'platform') {
          return {
            ...res,
            billVal: amountTransform(+res.billVal)
          }
        } else {
          return res
        }
      })

      provideSetDivideInfo({
        ...val,
        id: meta?.id,
        divideInfoList1: arr,
        divideInfoList2: arr1,
      }, {
        showSuccess: true
      }).then(res => {
        if(res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  const columns: ProColumns[] = [
    {
      title: '分成角色',
      dataIndex: 'roleName',
      align: 'center',
      fixed: 'left',
      renderFormItem: (_, { record })=> record.roleName
    },
    {
      title: `${count === 2 ? '分成金额(元)' : '分成比例(%)'}`,
      dataIndex: 'billVal',
      align: 'center',
      renderFormItem: (_, {recordKey}) => {
        if(recordKey === '1') {
          return `${meta?.retailSupplyPriceStr ?? 0}（零售供货价）`
        } else if(recordKey === '2'){
          return `${minPrice ?? 0}元`
        } else {
          return <InputNumber placeholder='请输入' controls={false}/>
        }
      }
    },
    {
      title: '费用名称',
      dataIndex: 'name',
      align: 'center',
      renderFormItem: (_, { recordKey }) => {
        if(recordKey === '1') {
          return '产品成本'
        } else if(recordKey === '2') {
          return '运营费用'
        } else {
          return <Input placeholder='请输入'/>
        }
      }
    },
    {
      title: '是否承担通道费',
      dataIndex: 'isChannelFee',
      align: 'center',
      renderFormItem: (_, {recordKey})=> {
        if(recordKey === '1' || recordKey === '2') {
          return '承担通道费'
        } else {
          return (
            <Select 
              style={{width: '130px'}}
              placeholder='请选择'
              options={[
                {label: '不承担通道费', value: 0},
                {label: '承担通道费', value: 1}
              ]}
            />
          )
        }
      }
    },
    {
      title: '结算方式',
      dataIndex: 'settleTypeDesc',
      align: 'center',
      renderFormItem: (_, { record })=> record.settleTypeDesc
    },
    {
      title: '实际资金解冻时机',
      dataIndex: 'trueUnfrezeeTypeDesc',
      align: 'center',
      renderFormItem: (_, { record })=> record.trueUnfrezeeTypeDesc
    },
    {
      title: '业绩记账解冻时机',
      dataIndex: 'businessUnfrezeeTypeDesc',
      align: 'center',
      renderFormItem: (_, { record })=> record.businessUnfrezeeTypeDesc
    }
  ]


  return (
    <DrawerForm
      title='门店合作商供应链商品分成配置'
      width={1200}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '取消'
        }
      }}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async (v)=> {
        await submit(v)
        callback()
        return true
      }}
      formRef={form}
      className={styles.desc}
    >
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{fontWeight: 600}}>基本信息</div>
        <div>
          通道费：
          <span style={{color: '#E7342F'}}>0.65%</span>
        </div>
      </div>
      <Divider />
      <ProFormText
        name='id'
        hidden
      />
      <ProFormRadio.Group
        name='billType'
        label='计算类型'
        rules={[{required: true}]}
        options={[
          {label: '比例', value: 1},
          {label: '金额', value: 2}
        ]}
        fieldProps={{
          onChange: (e) => {
            setCount(e.target.value)
            setMinPrice(computedValue(meta, storeDataSource, e.target.value))
          }
        }}
      />
        <Store 
          columns={columns}
          dataSource={storeDataSource}
          setDataSource={setStoreDataSource}
          info={meta}
          setMinPrice={setMinPrice}
          computedValue={computedValue}
          type={count}
          val={minPrice}
        />
        <CountyServiceProvider
          columns={columns}
          dataSource={countyServiceProviderdataSource}
          setDataSource={setCountyServiceProviderdataSource}
          meta={meta}
        />
    </DrawerForm>
  )
}

const computedValue = (meta: any, roleData: any, type = 2) => {
  Big.RM = 3;

  const val = new Big(meta?.actPriceStr ?? 0).minus(meta?.retailSupplyPriceStr ?? 0)
  let balanceAmount = val.minus(val.times(RATIO))
  roleData.forEach((e: any) => {
    if(type === 2) {
      if(e.roleCode !== 'goodsAmount' && e.roleCode !== 'platform') {
        balanceAmount = new Big(balanceAmount).minus(e?.billVal ?? 0)
      }
    } else {
      if(e.roleCode !== 'goodsAmount' && e.roleCode !== 'platform') {
        balanceAmount = new Big(balanceAmount).minus(new Big(val).times(amountTransform(e?.billVal, '/')))
      }
    }
  })
  return balanceAmount.toFixed(2)
}

export default SplitConfig