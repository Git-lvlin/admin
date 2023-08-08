import { useRef, useState, useEffect } from 'react'
import ProForm, {
  ProFormSelect,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormDateTimeRangePicker,
} from '@ant-design/pro-form'
import { EditableProTable } from '@ant-design/pro-table'
import { 
  Divider, 
  Row, 
  Col, 
  Select, 
  Space, 
  Input, 
  Switch, 
  InputNumber,
  Tooltip,
  Spin
} from 'antd'
import Big from 'big.js'

import type { FormInstance } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'

import styles from './styles.less'
import { getListByParams } from '@/services/transaction-sharing-management/allocation-management'
import { amountTransform } from '@/utils/utils'
import Upload from '@/components/upload'
import ContractConfig from './contract-config'

const defaultData = [
  {
    id: 1,
    roleCode: 'goodsAmount',
    name: '产品成本',
    isChannelFee: 1,
    settleType: 1,
    status: 1,
    billVal: 2
  },
  {
    id: 2,
    roleCode: 'platform',
    name: '运营费用',
    isChannelFee: 1,
    settleType: 1,
    status: 1
  }
]

const MSwitch: React.FC<{value?: boolean, onChange?: (e: number) => void}> = ({value, onChange}) => {
  const flag = value ? true : false
  return <Switch checked={flag} onChange={(e)=> {onChange?.(e ? 1 : 0)}}/>
}

const Config: React.FC<{meta: any, formCallback: any, tableCallback: any, detailData: any, selectData: any}> = ({meta, formCallback, tableCallback, detailData, selectData})=> {
  const [sign, setSign] = useState()
  const [count, setCount] = useState(2)
  const [dataSource, setDataSource] = useState<any>(defaultData)
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([1, 2])
  const [orderTypes, setOrderTypes] = useState([])
  const [data, setData] = useState<any>([])
  const [roleList, setRoleList] = useState([])
  const [showType, setShowType] = useState()
  const [configVisible, setConfigVisible] = useState(false)
  const [flag, setFlag] = useState(false)
  const [spin, setSpin] = useState(false)
  const [text, setText] = useState()
  const [minPrice, setMinPrice] = useState<any>()
  const [type, setType] = useState()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    formCallback(form)
    tableCallback(dataSource)
  }, [])

  useEffect(()=> {
    form.current?.setFieldsValue({
      billType: 2
    })
  }, [])
  
  useEffect(()=> {
    if(meta.length > 0) {
      setMinPrice(computedValue(meta, dataSource, count, type))
    }
  }, [meta, count])

  useEffect(()=> {
    if(detailData) {
      const arr = detailData?.divideInfoList.map((res: any)=> ({
        ...res,
        billVal: res.roleCode === 'goodsAmount' ? res.billVal : detailData?.billType === 1 ? amountTransform(res.billVal, '*') : amountTransform(res.billVal, '/'),
        billCond: res?.billCond?.[0]
      }))
      form.current?.setFieldsValue({
        id: detailData?.id,
        subType: detailData?.subType,
        agreementShowType: detailData?.agreementShowType,
        agreementName: detailData?.agreementName,
        agreementUrl: detailData?.agreementUrl,
        buyer: detailData?.buyer.length == 0 ? '1' : detailData?.buyer[0],
        afterSale: detailData?.afterSale,
        miniProgram: detailData?.miniProgram,
        orderDetailTips: detailData?.orderDetailTips,
        name: detailData?.name,
        contractIsSign: detailData?.contractIsSign,
        remark: detailData?.remark,
        billType: detailData?.billType,
        time: [detailData?.startTime, detailData?.endTime],
        contractFeeBear: detailData?.contractFeeBear,
        contractCode: detailData?.contractCode,
        platformLeastSpuId: detailData?.platformLeastSpuId, 
        platformLeastSkuId: detailData?.platformLeastSkuId, 
        platformLeastFee: amountTransform(detailData?.platformLeastFee, '/'),
        platformLeastAmount: amountTransform(detailData?.platformLeastAmount, '/')
      })
      setDataSource(arr)
      tableCallback(arr)
      setEditableRowKeys(detailData?.divideInfoList.map((res: any)=> res.id))
      setCount(detailData?.billType)
      setSign(detailData?.contractIsSign)
      if(detailData?.contractIsSign === 1) {
        setFlag(true)
      } else {
        setFlag(false)
      }
      setText(detailData?.contractCode)
      setMinPrice(computedValue(meta, arr, count, detailData?.contractFeeBear))
      setShowType(detailData?.agreementShowType)
    }
  }, [detailData])

  useEffect(()=> {
    if(minPrice) {
      form.current?.setFieldsValue({
        platformLeastSpuId: minPrice?.goodsData?.spuId, 
        platformLeastSkuId: minPrice?.goodsData?.skuId, 
        platformLeastFee: minPrice.balanceAmount,
        platformLeastAmount: minPrice?.goodsData?.goodsSaleMinPrice
      })
    }
  }, [minPrice])

  useEffect(()=> {
    setSpin(true)
    getListByParams({
      page: 1,
      size: 10
    }).then(res => {
      if(res.code === 0) {
        setRoleList(res.data.roleInfo.map((item: any) => ({
          label: item.roleName,
          value: item.roleCode
        })))
        setData(res.data.roleInfo)
        setOrderTypes(res.data.orderTypeInfo.map((item: any) => ({
          label: item.name,  
          value: item.code
        })))
      }
    }).finally(()=> {
      setSpin(false)
    })
  }, [])

  useEffect(()=> {
    selectData(data)
  }, [data])

  const getSettled = (record: any, obj: any) => {
    if(record?.roleCode === "directMember" || record.roleCode === 'indirectMember') {
      return obj
    } else if(record?.roleCode === "yuegou" || record?.roleCode === "platform" || record?.roleCode === "goodsAmount"){
      return ({
        ...obj,
        settleType: 1
      })
    } else {
      return ({
        ...obj,
        settleType: 3
      })
    }                 
  }

  const amountFreeze = (record: any, o: any, list: any) => {
    let obj = o
    const findObj = list.find((item: any) => item.roleCode === 'platform')

    if (record.roleCode === 'platform' && obj.roleCode !== 'goodsAmount' && obj.roleCode !== 'yuegou' && obj.roleCode) {
      obj = {
        ...obj,
        trueUnfrezeeType: record?.trueUnfrezeeType
      }
    }

    if ( obj.id === record.id && record.roleCode !== 'platform' && obj.roleCode !== 'goodsAmount' && obj.roleCode !== 'yuegou' && obj.roleCode) {
      obj = {
        ...obj,
        trueUnfrezeeType: findObj?.trueUnfrezeeType
      }
    }

    return obj
    
  }

  const setBusinessUnfrezeeTypeRow = (record: any, o: any ,list: any) => {
    let obj = o
    const findObj = list.find((item: any) => item.roleCode === 'platform')

    if (record.roleCode === 'platform' && obj.roleCode !== 'goodsAmount' && obj.roleCode !== 'yuegou' && obj.roleCode && obj?.roleCode !== "directMember" && obj.roleCode !== 'indirectMember') {
      obj = {
        ...obj,
        businessUnfrezeeType: record.businessUnfrezeeType
      }
    }

    if (obj.id === record.id && record.roleCode !== 'platform' && obj.roleCode !== 'goodsAmount' && obj.roleCode !== 'yuegou' && obj.roleCode && obj?.roleCode !== "directMember" && obj.roleCode !== 'indirectMember') {
      obj = {
        ...obj,
        businessUnfrezeeType: findObj.businessUnfrezeeType
      }
    }

    return obj

  }
  
  const columns: ProColumns[] = [
    {
      title: '分成角色',
      dataIndex: 'roleCode',
      align: 'center',
      renderFormItem: (_, {recordKey })=> {
        if(recordKey === '1') {
          return '供应商'
        } else if(recordKey === '2') {
          return '平台'
        } else {
          const list = roleList.map((item: any) => {
            if (dataSource.find((it: any)=> item.value === it.roleCode)) {
              return {
                ...item,
                disabled: true,
              }
            }
            return item
          })
          return (
            <Select options={list} placeholder='请选择' />
          )
        }
      },
      fixed: 'left'
    },
    {
      title: `${count === 2 ? '分成金额(元)' : '分成比例(%)'}`,
      dataIndex: 'billVal',
      align: 'center',
      renderFormItem: (_, {recordKey, record}) => {
        if(recordKey === '1') {
          if(type === 'supplier' && sign === 1) {
            return (
              <div>
                <Select defaultValue={2} options={[{label: '零售供货价', value: 2}, {label: '批发供货价', value: 1}]} placeholder='请选择' style={{width: '120px'}}/>
                <div>减5 元 合同费</div>
              </div>
            )
          } else {
            return <Select defaultValue={2} options={[{label: '零售供货价', value: 2}, {label: '批发供货价', value: 1}]} placeholder='请选择' style={{width: '120px'}}/>
          }
        } else if(recordKey === '2'){
          if(type === 'platform' && sign === 1) {
            return (
              <div>
                <div>{minPrice?.balanceAmount ?? 0}</div>
                <div>已减5 元 合同费</div>
              </div>
            )
          } else {
            return minPrice?.balanceAmount ?? 0     
          }
        } else if(record?.roleCode === 'hyCityAgent' && record?.scope === 'nation') {
          return <InputNumber placeholder='请输入' addonAfter={'X 5'} controls={false} />
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
      renderFormItem: (_, {record, recordKey})=> {
        const arr: any = data.find((it: any) => it.roleCode === record.roleCode)
        const arr1 = arr?.isChannelFee.map((item: any) => ({label: item.name, value: item.code}))
        if(recordKey === '1' || recordKey === '2') {
          return '承担通道费'
        } else {
          return (
            <Select 
              style={{width: '130px'}}
              placeholder='请选择'
              options={arr1}
            />
          )
        }
      }
    },
    {
      title: '结算方式',
      dataIndex: 'settleType',
      align: 'center',
      renderFormItem: (_, {record, recordKey})=> {
        const arr: any = data.find((it: any) => it.roleCode === record.roleCode)
        if(recordKey == '1' || recordKey == '2') {
          return '汇付'
        }else{
          return (
            <Select
              style={{width: '110px'}}
              placeholder='请选择'
              options={
                arr?.settleType.map((item: any) => ({label: item.name, value: item.code}))
              } 
            />
          )
        }
      }
    },
    {
      title: '实际资金解冻时机',
      dataIndex: 'trueUnfrezeeType',
      align: 'center',
      renderFormItem: (_, {record})=> {
        const arr: any = data.find((it: any) => it.roleCode === record.roleCode)
        const disabled = () =>{
          if(record.roleCode === 'goodsAmount' || record.roleCode === 'platform' || record.roleCode === 'yuegou') {
            return false
          } else {
            return true
          }
        }
        return (
          <Select 
            style={{width: '170px'}}
            placeholder='请选择'
            options={arr?.trueUnfrezeeType.map((item: any) => ({label: item.name, value: item.code}))} 
            disabled={disabled()}
          />
        )
      }
    },
    {
      title: '业绩记账解冻时机',
      dataIndex: 'businessUnfrezeeType',
      align: 'center',
      renderFormItem: (_, {record})=> {
        const arr: any = data.find((it: any) => it.roleCode === record.roleCode)
        const list = arr?.businessUnfrezeeType.map((item: any) => {
          if(record?.trueUnfrezeeType && record?.trueUnfrezeeType > item.code) {
            return ({
              label: item.name, value: item.code, disabled: true
            })
          } else {
            return ({
              label: item.name, value: item.code
            })
          }
        })
        const disabled = () =>{
          if(record?.trueUnfrezeeType) {
            if(record.roleCode === 'goodsAmount' || record.roleCode === 'platform' || record.roleCode === 'yuegou' || record.roleCode === 'indirectMember' || record.roleCode === 'directMember') {
              return false
            } else {
              return true
            }
          } else {
            return true
          }
        }
        return (
          <Select
            style={{width: '170px'}}
            placeholder='请选择'
            disabled={disabled()}
            options={list} 
          />
        )
      }
    },
    {
      title: '业绩范围',
      dataIndex: 'scope',
      align: 'center',
      renderFormItem: (_, {record, recordKey})=> {
        const arr: any = data.find((it: any) => it.roleCode === record.roleCode)
        if(recordKey === '1' || recordKey === '2') {
          return '/'
        } else {
          return (
            <Select
              placeholder='请选择'
              style={{width: '120px'}}
              options={
                arr?.scope.map((item: any) => ({label: item.name, value: item.code}))
              }
            />
          )
        }
      }
    },
    {
      title: '分账条件',
      dataIndex: 'billCond',
      align: 'center',
      renderFormItem: (_, {record, recordKey})=> {
        const arr: any = data.find((it: any) => it.roleCode === record.roleCode)
        if(recordKey === '1' || recordKey === '2' || record.roleCode === 'businessCollege' || record.roleCode === 'trainingCenter' || record.roleCode === 'yuegou') {
          return '/'
        } else {
          return (
            <Select
              style={{width: '240px'}}
              placeholder='请选择'
              options={
                arr?.cond.map((item: any) => ({label: item.title, value: item.code}))
              } 
            />
          )
        }
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center',
      fieldProps: {
        placeholder: '3-30个字符'
      },
      renderFormItem: (_, {recordKey}) => {
        if(recordKey === '1' || recordKey === '2') {
          return '/'
        } else {
          return <Input placeholder='3-30个字符'/>
        }
      }
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      align: 'center',
      renderFormItem: (_, {recordKey}) => {
        if(recordKey === '1' || recordKey === '2') {
          return ''
        } else {
          return <MSwitch />
        }
      }
    },
    {
      title: '操作',
      align: 'center',
      fixed: 'right',
      renderFormItem: (_, {record, recordKey}) => {
        if(record.roleCode === 'goodsAmount' || record.roleCode === 'platform') {
          return
        } else {
          const arr = dataSource.filter((item: any) => item.id != recordKey)
          return <a onClick={()=> {setDataSource(arr); tableCallback(arr); setMinPrice(computedValue(meta, arr, count, type))}}>删除</a>
        }
      }
    }
  ]

  return (
    <Spin spinning={spin}>
      <ProForm
        formRef={form}
        layout='vertical'
        submitter={false}
        className={styles.desc}
      >
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{fontWeight: 600}}>基本信息</div>
          <div>
            通道费：
            <span style={{color: '#E7342F'}}>0.65%</span>
          </div>
        </div>
        <ProFormText
          name='id'
          hidden
        />
        <ProFormText
          name='platformLeastAmount'
          hidden
        />
        <Divider/>
        <Row gutter={[8, 16]}>
          <Col span={6}>
            <ProFormSelect
              name='subType'
              label='订单类型'
              rules={[{required: true}]}
              options={orderTypes}
              extra={<span>主订单类型为秒约订单</span>}
              width='sm'
            />
          </Col>
          <Col span={8}>
            <ProFormRadio.Group
              name='agreementShowType'
              label='业务协议'
              rules={[{required: true}]}
              fieldProps={{
                onChange: (e) => {setShowType(e.target.value)}
              }}
              options={[
                {label: '没有协议', value: 0},
                {label: '必须勾选协议才能下单', value: 2}
              ]}
              extra={
                (showType === 1 || showType === 2) &&
                <Space>
                  <ProFormText name='agreementName' fieldProps={{placeholder: '请输入协议名称'}}/>
                  <ProForm.Item name='agreementUrl'>
                    <Upload />
                  </ProForm.Item>
                </Space>
              }
            />
          </Col>
          <Col span={10}>
            <ProFormRadio.Group
              name='buyer'
              label='可购买身份'
              rules={[{required: true}]}
              options={[
                {label: '所有用户', value: '1'},
                {label: '所有社区店店主', value: 'communityStore'},
                {label: '所有VIP店主', value: 'vipStore'},
                {label: '所有生活馆店主', value: 'lifeStore'},
              ]}
            />
          </Col>
        </Row>
        <Divider/>
        <Row gutter={[8, 16]}>
          <Col span={8}>
            <ProFormRadio.Group
              name='afterSale'
              label='是否支持售后'
              rules={[{required: true}]}
              options={[
                {label: '支持', value: 1},
                {label: '不支持（前端不显示售后入口）', value: 0}
              ]}
            />
          </Col>
          <Col span={8}>
            <ProFormRadio.Group
              name='miniProgram'
              label='是否支持小程序下单'
              rules={[{required: true}]}
              options={[
                {label: '支持', value: 1},
                {label: '不支持', value: 0}
              ]}
            />
          </Col>
          <Col span={8}>
            <ProFormTextArea
              name='orderDetailTips'
              label='订单详情底部提示'
              fieldProps={{
                placeholder: '请输入6-60个字符',
                maxLength: 60,
                showCount: true
              }}
              rules={[{
                validator: (_, value) => {
                  if(value?.length < 6) {
                    return Promise.reject('请输入6-60个字符')
                  } else {
                    return Promise.resolve()
                  }
                }
              }]}
            />
          </Col>
        </Row>
        <Divider/>
        <Row gutter={[8, 16]}>
          <Col span={8}>
            <ProFormText
              name='name'
              label='业务名称'
              rules={[{required: true}]}
              fieldProps={{
                placeholder: '请输入业务名称'
              }}
              width='md'
            />
          </Col>
          <Col span={8}>
            <ProFormRadio.Group
              name='contractIsSign'
              label='法大大合同'
              rules={[{required: true}]}
              options={[
                {label: '不需签署', value: 0},
                {label: '需要签署', value: 1}
              ]}
              fieldProps={{
                onChange: (e) => setSign(e.target.value)
              }}
              extra={
                sign === 1 ? 
                <Space>
                  {
                    flag ?
                    <div>
                      <span>已配置，</span>
                      <a onClick={()=> {
                          setConfigVisible(true); 
                          if(detailData) {
                            form.current?.getFieldsValue()?.contractCode? 
                              setText(form.current?.getFieldsValue()?.contractCode):
                              setText(detailData?.contractCode)
                          } else {
                            setText(form.current?.getFieldsValue()?.contractCode)
                          }
                        }}
                      >
                        点击查看
                      </a>
                    </div>:
                    <a onClick={()=> {setConfigVisible(true)}}>配置合同</a>
                  }
                  <ProFormSelect
                    name='contractFeeBear'
                    width='sm'
                    options={[
                      {label: '平台承担5元合同费', value: 'platform'},
                      {label: '供应商承担5元合同费', value: 'supplier'}
                    ]}
                    fieldProps={{
                      placeholder: '请选择签法大大5元合同费用承担方',
                      onChange: (e) => {
                        setType(e)
                        if(meta.length > 0) {
                          setMinPrice(computedValue(meta, dataSource, count, e))
                        }
                      }
                    }}
                  />
                </Space> :
                false
              }
            />
          </Col>
          <Col span={8}>
            <ProFormTextArea
              name='remark'
              label='备注'
              fieldProps={{
                placeholder: '请输入6-60个字符',
                maxLength: 60,
                showCount: true
              }}
              rules={[{
                validator: (_, value) => {
                  if(value?.length < 6) {
                    return Promise.reject('请输入6-60个字符')
                  } else {
                    return Promise.resolve()
                  }
                }
              }]}
            />
          </Col>
        </Row>
        <Divider/>
        <Row gutter={[8, 16]}>
          <Col span={8}>
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
                  if(meta.length > 0) {
                    setMinPrice(computedValue(meta, dataSource, e.target.value, type))
                  }
                }
              }}
            />
          </Col>
          <Col span={8}>
            <ProFormDateTimeRangePicker
              name='time'
              label='记账时段'
              rules={[{required: true}]}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name='contractCode'
              hidden
            />
          </Col>
        </Row>
        <Row gutter={[8, 16]}>
          <Col span={8}>
            <ProFormText
              name='platformLeastSpuId'
              hidden
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name='platformLeastSkuId'
              hidden
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name='platformLeastFee'
              hidden
            />
          </Col>
        </Row>
      </ProForm>
      <EditableProTable
        rowKey='id'
        bordered  
        columns={columns}
        value={dataSource}
        search={false}
        options={false}
        headerTitle='分成明细'
        className={styles.editDesc}
        toolBarRender={
          ()=> [
            <div>
              参与分成角色：{dataSource.length} 位，
              参与分成商品 {meta.length} 款，
              <Tooltip 
                title='价差 = 销售价 - 已选供货价'
              >
                价差最少商品skuID
              </Tooltip>：
              {minPrice?.goodsData?.skuId ?? '/'}，
              交易金额（销售价）：<span>{amountTransform(minPrice?.goodsData?.salePrice, '/').toFixed(2) ?? 0}</span>元，
              {
                (type === 'platform' && sign === 1) ?
                <Tooltip title='已减 5 元 合同费'>
                  平台结余金额：<span>{minPrice?.balanceAmount ?? 0}</span>元（剔除通道费后）
                </Tooltip>:
                `平台结余金额：${minPrice?.balanceAmount ?? 0}元（剔除通道费后'）`
              }
            </div>
          ]
        }
        pagination={false}
        editable={{
          type: 'multiple',
          editableKeys,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete]
          },
          onValuesChange: (record, recordList) => {
            let arr = recordList
            if(record) {
              arr = recordList?.map(res=> {
                let obj = res
                if (res.id === record.id) {
                  obj = getSettled(record, obj)
                } 
                obj = amountFreeze(record, obj, recordList)
                obj = setBusinessUnfrezeeTypeRow(record, obj, recordList)
                return obj
              })
            }
            setMinPrice(computedValue(meta, arr, count, type))
            tableCallback(arr)
            setDataSource(arr)
          },
          onChange: setEditableRowKeys
        }}
        recordCreatorProps={{
          record: () => ({
            id: +Date.now(),
            status: 1
          }),
          newRecordType: 'dataSource',
          creatorButtonText: '新增分成角色'
        }}
        scroll={{x: 'max-content'}}
        controlled
      />
      {
        configVisible &&
        <ContractConfig
          visible={configVisible}
          setVisible={setConfigVisible}
          callback={(e)=> {form.current?.setFieldsValue({contractCode: e})}}
          flag={setFlag}
          data={text}
        />
      }
    </Spin>
  )
}

const computedValue = (goodsData = [], roleData: any, type = 2, contractFeeBear = '') => {
  if(goodsData.length == 0) {
    return
  }
  Big.RM = 0;
  const supplierObject: any = roleData.find((item: any) => item.roleCode === 'goodsAmount') || {}
  const minValueObject = goodsData.map((item: any) => {
    let difference = 0
    if (supplierObject.billVal == 1) {
      difference = item.salePrice - item.wholesaleSupplyPrice
    } else {
      difference = item.salePrice - item.retailSupplyPrice
    }
    return {
      ...item,
      difference
    }
  }).sort((a, b) => a.difference - b.difference)[0]

  let balanceAmount = minValueObject.salePrice

  roleData.forEach((item: any) => {
    let num = 0
    if(item.billVal) {
      num = new Big(item.billVal).times(5)
    }
    if (item.roleCode === 'platform' || !item.status) {
      return
    }
    let price = 0;
    if (supplierObject.billVal == 1) {
      price = minValueObject.wholesaleSupplyPrice
    } else {
      price = minValueObject.retailSupplyPrice
    }
    if (type == 2) {
      if (item.roleCode === 'goodsAmount') {
        balanceAmount -= price
        balanceAmount -= new Big(balanceAmount).times(0.0065)
      } else {
        if(item.roleCode === 'hyCityAgent' && item?.scope === 'nation') {
          balanceAmount -= amountTransform(num)
        } else {
          balanceAmount -= amountTransform(item.billVal)
        }
      }
    } else {
      if (item.roleCode === 'goodsAmount') {
        balanceAmount -= price
        balanceAmount -= new Big(balanceAmount).times(0.0065)
      } else {
        if(item.roleCode === 'hyCityAgent' && item?.scope === 'nation') {
          balanceAmount = new Big(balanceAmount).minus(new Big(minValueObject.salePrice).times(amountTransform(num, '/')))
        } else {
          balanceAmount = new Big(balanceAmount).minus(new Big(minValueObject.salePrice).times(amountTransform(item?.billVal, '/')))
        }
      }
    }
  })
  if(contractFeeBear === 'platform') {
    balanceAmount = new Big(balanceAmount).minus(500)
  }

  return {
    balanceAmount: amountTransform(balanceAmount, '/'),
    goodsData: minValueObject
  }
}

export default Config