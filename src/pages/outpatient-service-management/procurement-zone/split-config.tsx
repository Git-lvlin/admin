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
  Select,
  Spin
} from 'antd'
import Big from 'big.js'

import type { FormInstance } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'

import styles from './styles.less'
import { provideSetDivideInfo, provideGetRoleInfo } from '@/services/outpatient-service-management/procurement-zone'
import Store from './store'
import CountyServiceProvider from './county-service-provider'
import { RATIO } from '@/constants'
import { amountTransform } from '@/utils/utils'

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
  const [loading, setLoading] = useState(false)
  const [storeDataSource, setStoreDataSource] = useState<any>([])
  const [countyServiceProviderdataSource, setCountyServiceProviderdataSource] = useState<any>(countyServiceProviderData)
  const [minPrice, setMinPrice] = useState<number>(0)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(meta?.billType) {
      form.current?.setFieldsValue({
        billType: meta?.billType
      })
      setCount(meta?.billType)
    } else {
      form.current?.setFieldsValue({
        billType: 2
      })
    }
  }, [meta])

  useEffect(()=> {
    setLoading(true)
    provideGetRoleInfo().then(res => {
      if(res?.code === 0) {
        if(meta?.divideInfoList1?.length > 0) {
          const arr = res.data.map((res: any) => {
            return meta.divideInfoList1.find((item: any) => res.roleCode === item.roleCode)
          })
          setStoreDataSource(arr.map((item: any, idx: number) => {
            if(item?.roleCode === 'goodsAmount') {
              return {
                ...item,
                id: idx + 1,
                billVal: amountTransform(item?.billVal, '/'),
                name: '产品成本',
                isChannelFee: 1,
                settleType: 1,
                settleTypeDesc: '汇付',
                trueUnfrezeeType: '4',
                trueUnfrezeeTypeDesc: '确认收货后解冻',
                businessUnfrezeeType: '4',
                businessUnfrezeeTypeDesc: '确认收货后解冻'
              }
            } else if(item?.roleCode === 'platform') {
              return {
                ...item,
                id: idx + 1,
                billVal: amountTransform(item?.billVal, '/'),
                name: '运营费用',
                isChannelFee: 1,
                settleType: 1,
                settleTypeDesc: '汇付',
                trueUnfrezeeType: '1',
                trueUnfrezeeTypeDesc: '分账后即解冻',
                businessUnfrezeeType: '1',
                businessUnfrezeeTypeDesc: '分账后即解冻',
              }
            } else if(item?.roleCode === 'directMember'){
              return {
                ...item,
                id: idx + 1,
                billVal: amountTransform(item?.billVal, '/'),
                settleType: 2,
                name: '销售佣金',
                settleTypeDesc: '线上代付',
                trueUnfrezeeType: '6',
                trueUnfrezeeTypeDesc: '满足业务解冻',
                businessUnfrezeeType: '6',
                businessUnfrezeeTypeDesc: '满足业务解冻',
                scope: 't',
                scopeDesc: '推荐关系链',
                billCond: 'storeDirectUser',
                condDesc: '订单直推人 (大健康门店合作商)',
              }
            } else {
              return {
                ...item,
                billVal: amountTransform(item?.billVal, '/'),
                id: idx + 1,
                settleType: 3,
                settleTypeDesc: '线下',
                trueUnfrezeeType: '6',
                trueUnfrezeeTypeDesc: '满足业务解冻',
                businessUnfrezeeType: '6',
                scope: item?.scope,
                scopeDesc: item?.scopeDesc,
                businessUnfrezeeTypeDesc: '满足业务解冻',
                billCond: 'providerStoreArea',
                condDesc: '大健康服务商或门店区域',
              }
            }
          }))
        } else {
          setStoreDataSource(res.data.map((item: any, idx: number) => {
            if(item.roleCode === 'goodsAmount') {
              return {
                ...item,
                id: idx + 1,
                name: '产品成本',
                isChannelFee: 1,
                settleType: 1,
                settleTypeDesc: '汇付',
                trueUnfrezeeType: '4',
                trueUnfrezeeTypeDesc: '确认收货后解冻',
                businessUnfrezeeType: '4',
                businessUnfrezeeTypeDesc: '确认收货后解冻'
              }
            } else if(item.roleCode === 'platform') {
              return {
                ...item,
                id: idx + 1,
                name: '运营费用',
                isChannelFee: 1,
                settleType: 1,
                settleTypeDesc: '汇付',
                trueUnfrezeeType: '1',
                trueUnfrezeeTypeDesc: '分账后即解冻',
                businessUnfrezeeType: '1',
                businessUnfrezeeTypeDesc: '分账后即解冻',
              }
            } else if(item.roleCode === 'directMember'){
              return {
                ...item,
                id: idx + 1,
                settleType: 2,
                name: '销售佣金',
                settleTypeDesc: '线上代付',
                trueUnfrezeeType: '6',
                trueUnfrezeeTypeDesc: '满足业务解冻',
                businessUnfrezeeType: '6',
                businessUnfrezeeTypeDesc: '满足业务解冻',
                scope: 't',
                scopeDesc: '推荐关系链',
                billCond: 'storeDirectUser',
                condDesc: '订单直推人 (大健康门店合作商)',
              }
            } else {
              return {
                ...item,
                id: idx + 1,
                settleType: 3,
                settleTypeDesc: '线下',
                trueUnfrezeeType: '6',
                trueUnfrezeeTypeDesc: '满足业务解冻',
                businessUnfrezeeType: '6',
                scope: item?.scope?.[0]?.code,
                scopeDesc: item?.scope?.[0]?.name,
                businessUnfrezeeTypeDesc: '满足业务解冻',
                billCond: 'providerStoreArea',
                condDesc: '大健康服务商或门店区域',
              }
            }
          }))
        }
      }
    }).finally(()=> {
      setLoading(false)
    })  
  }, [meta])
  
  useEffect(()=> {
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
    if(storeDataSource.length > 0) {
      setMinPrice(computedValue(meta, storeDataSource, count))
    }
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
      title: ()=> {
        if(count === 2) {
          return (
            <>
              分成金额(元)
              <span style={{color: '#ff0000'}}>*</span>
            </>
          )
        } else {
          return (
            <>
              分成比例(%)
              <span style={{color: '#ff0000'}}>*</span>
            </>
          )
        }
      },
      dataIndex: 'billVal',
      align: 'center',
      renderFormItem: (_, {record}) => {
        if(record.roleCode === 'goodsAmount') {
          return `${meta?.retailSupplyPriceStr ?? 0}（零售供货价）`
        } else if(record.roleCode === 'platform'){
          return `${minPrice ?? 0}元`
        } else {
          return <InputNumber placeholder='请输入' controls={false}/>
        }
      }
    },
    {
      title: () => (<>费用名称<span style={{color: '#ff0000'}}>*</span></>),
      dataIndex: 'name',
      align: 'center',
      renderFormItem: (_, { record }) => {
        if(record.roleCode === 'goodsAmount') {
          return '产品成本'
        } else if(record.roleCode === 'platform') {
          return '运营费用'
        } else {
          return <Input placeholder='请输入'/>
        }
      }
    },
    {
      title: () => (<>是否承担通道费<span style={{color: '#ff0000'}}>*</span></>),
      dataIndex: 'isChannelFee',
      align: 'center',
      renderFormItem: (_, {record})=> {
        if(record.roleCode === 'platform' || record.roleCode === 'goodsAmount') {
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
    },
    {
      title: '业绩范围',
      dataIndex: 'scopeDesc',
      align: 'center',
      renderFormItem: (_, { record })=> {
        if(record.roleCode === 'platform' || record.roleCode === 'goodsAmount') {
          return '/'
        } else if(record.roleCode === 'businessCollege' || record.roleCode === 'companyManager' || record.roleCode === 'other'){
          return '全国'
        } else {
          return record?.scopeDesc
        }
      }
    },
    {
      title: '分账条件',
      dataIndex: 'condDesc',
      align: 'center',
      renderFormItem: (_, { record })=> {
        if(record.roleCode === 'platform' || record.roleCode === 'goodsAmount' || record.roleCode === 'businessCollege' || record.roleCode === 'companyManager' || record.roleCode === 'other') {
          return '/'
        } else{
          return record?.condDesc
        }
      }
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
      <Spin spinning={loading}>
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
      </Spin>
    </DrawerForm>
  )
}

const computedValue = (meta: any, roleData: any, type = 2) => {
  Big.RM = 3;

  const val = new Big(meta?.actPriceStr ?? 0).minus(meta?.retailSupplyPriceStr ?? 0)
  let balanceAmount = val.minus(val.times(RATIO))
  roleData?.forEach((e: any) => {
    if(type === 2) {
      if(e.roleCode !== 'goodsAmount' && e.roleCode !== 'platform') {
        balanceAmount = new Big(balanceAmount).minus(e.billVal ?? 0)
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