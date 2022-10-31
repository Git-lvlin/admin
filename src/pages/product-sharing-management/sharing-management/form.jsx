import React, { useEffect, useState, useRef } from 'react';
import ProCard from '@ant-design/pro-card';
import { Select, Form, Input, Tooltip, Button, AutoComplete,message,InputNumber  } from 'antd';
import ProTable from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { QuestionCircleOutlined } from '@ant-design/icons';
import ProForm,{
  ProFormText,
  DrawerForm,
  ProFormRadio,
  ProFormDependency,
  ProFormSelect
} from '@ant-design/pro-form';
import { saveCommissionConfig, getCommissionConfigBySpuId, productList, wholeSaleAccountCheck } from '@/services/product-management/designated-commodity-settlement';
import { PlusOutlined } from '@ant-design/icons';
import { amountTransform } from '@/utils/utils'
import ConfirmationModel from './confirmation-model'
import { history } from 'umi'

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

const FromWrap = ({ value, onChange, content, right,bottom }) => (
  <div>
    <div style={{ display: 'flex' }}>
      <div>{content(value, onChange)}</div>
      <div style={{ flex: 1, marginLeft: 10,  }}>{right(value)}</div>
    </div>
    <div>{bottom(value)}</div>
  </div>
)

const bloodData = [
  {
    id: 1,
    name: <>
          <div>直推收益（VIP店主）-服务佣金(直)</div>
          <div>无相关角色，分成归属平台</div>
          <div style={{color:'#999999'}}>无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费</div>
          </>
  },
  {
    id: 2,
    name: <>
          <div>店主（下单人）开店地址所属市办事处</div>
          </>
  },
  {
    id: 3,
    name: <>
          <div>供应商-货款</div>
          <div>批发供货价+平均运费，销售订单承担通道费</div>
          </>,
  },
  {
    id: 4,
    name: <>
          <div>汇智能通省代</div>
          <div>VIP直推人开启地址所属省代收益</div>
          </>,
  },
  {
    id: 5,
    name: <>
          <div>汇智能通市代</div>
          <div>VIP直推人开启地址所属市代收益</div>
          </>,
  },
  {
    id: 6,
    name: <>
          <div>氢原子市代</div>
          <div>VIP直推人开启地址所属氢原子市代收益</div>
          </>,
  },
   {
    id: 7,
    name:<>
        <div>培训中心</div>
        <div>管理奖励</div>
        </>
  },
  {
    id: 8,
    name: <>
          <div>汇能科技</div>
          <div>积分/红包</div>
          </>
  },
  {
    id: 9,
    name: <>
          <div>运营中心</div>
          <div>服务费佣金</div>
          </>
  },
  {
    id: 10,
    name:<>
          <div>汇能</div>
          <div>平台运营成本</div>
          </>
  },
  {
    id: 11,
    name:<>
        <div>汇能</div>
        <div style={{color:'#999999'}}>没有对应角色的分成归此处,线下结算的角色资金先分账到平台</div>
        </>
  },
]

const CusAutoComplete = ({ value, onChange, onChange2,setUserList, userList, options, ...rest }) => {
  const changeHandle = (e) => {
    const findItem = userList?.find(item => item.skuId === e)
    if (findItem) {
      onChange(`skuID：${findItem.skuId} ${findItem.goodsName} 新集约价： ${amountTransform(findItem.distributePrice, '/').toFixed(2)}元`)
      onChange2(findItem)
      return
    }
    onChange(e);
    onChange2(null)
  }
  const SearchHandle=(e)=>{
    if (!isNaN(e)) {
      productList({ skuId: e, orderType: 30 }).then(res => {
        setUserList(res.data)
      })
    } else {
      productList({ goodsName: e, orderType: 30 }).then(res => {
        setUserList(res.data)
      })
    }
  }
  const selectHandle = (e) => {
    const findItem = userList?.find(item => item.skuId === e)
    if (findItem) {
      onChange(`skuID：${findItem.skuId} ${findItem.goodsName} 新集约价： ${amountTransform(findItem.distributePrice, '/').toFixed(2)}元`)
      onChange2(findItem)
    }
  }
  return (
    <AutoComplete
      value={value}
      options={options}
      {...rest}
      onChange={changeHandle}
      onSelect={selectHandle}
      filterOption={(inputValue, option) => {
        return option?.label?.includes(inputValue)
      }}
      onSearch={SearchHandle}
    />
  )
}


export default (props) => {
  const { onClose, visible, setVisible, detailData, callback } = props;
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState(()=>bloodData?.map(item => item.id));
  const [dataSource, setDataSource] = useState(()=>bloodData);
  const [roleVisible, setRoleVisible] = useState();
  const [userList, setUserList] = useState([])
  const [recordList, setRecordList] = useState([])
  const [recordId, setRecordId] = useState()
  const actionRef = useRef();
  const [commType,setCommType] = useState(2)
  const [astrictType,setAstrictType] = useState(false)
  const [submitType, setSubmitType] = useState()
  const [loding, setLoding] = useState(0)
  const [marketType, setMarketType] = useState(0)
  const [computePrice, setComputePrice] = useState()
  useEffect(() => {
    if (detailData?.spuId||recordId?.spuId) {
      getCommissionConfigBySpuId({ spuId: recordId?.spuId||detailData?.spuId, orderType: 30 }).then(res => {
        if(res.code==0&&res.data.length!=0){
          const findItem=res?.data?.find(ele=>ele?.skuId==recordId?.skuId)||res?.data?.find(ele=>ele?.skuId==detailData?.skuId)
          if(findItem){
            wholeSaleAccountCheck(findItem).then(res=>{
              if(res.code==0){
                setComputePrice(res.data)
              }
            })

            setRecordList(findItem)
            setCommType(findItem?.commissionType)
            form.setFieldsValue({
              commissionType: findItem?.commissionType
            })
            form2.setFieldsValue({
              name: findItem?.goodsName,
            })
            const data = [
              {
                id: 1,
                name: <>
                      <div>直推收益（VIP店主）-服务佣金(直)</div>
                      <div>无相关角色，分成归属平台</div>
                      <div style={{color:'#999999'}}>无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费</div>
                      </>,
                price: findItem?.commissionType==2?findItem?.shoppervipChargeFee:amountTransform(findItem?.shoppervipChargeFee, '/')
              },
              {
                id: 2,
                name: <>
                      <div>店主（下单人）开店地址所属市办事处</div>
                      </>,
                price: findItem?.commissionType==2?findItem?.cityManageFee:amountTransform(findItem?.cityManageFee, '/')
              },
              {
                id: 3,
                name: <>
                      <div>供应商-货款</div>
                      <div>批发供货价+平均运费，销售订单承担通道费</div>
                      </>,
              },
              {
                id: 4,
                name: <>
                      <div>汇智能通省代</div>
                      <div>VIP直推人开启地址所属省代收益</div>
                      </>,
                price: findItem?.commissionType==2?findItem?.provinceAgent:amountTransform(findItem?.provinceAgent, '/')
              },
              {
                id: 5,
                name: <>
                      <div>汇智能通市代</div>
                      <div>VIP直推人开启地址所属市代收益</div>
                      </>,
                price: findItem?.commissionType==2?findItem?.cityAgent:amountTransform(findItem?.cityAgent, '/')
              },
              {
                id: 6,
                name: <>
                      <div>氢原子市代</div>
                      <div>VIP直推人开启地址所属氢原子市代收益</div>
                      </>,
                price: findItem?.commissionType==2?findItem?.hydrogenCityAgent:amountTransform(findItem?.hydrogenCityAgent, '/')
              },
               {
                id: 7,
                name:<>
                    <div>培训中心</div>
                    <div>管理奖励</div>
                    </>,
                price: findItem?.commissionType==2?findItem?.trainCenterManageFee:amountTransform(findItem?.trainCenterManageFee, '/')
              },
              {
                id: 8,
                name: <>
                      <div>汇能科技</div>
                      <div>积分/红包</div>
                      </>,
                price: findItem?.commissionType==2?findItem?.serviceFee:amountTransform(findItem?.serviceFee, '/')
              },
              {
                id: 9,
                name: <>
                      <div>运营中心</div>
                      <div>服务费佣金</div>
                      </>,
                price: findItem?.commissionType==2?findItem?.companyAgent:amountTransform(findItem?.companyAgent, '/')
              },
              {
                id: 10,
                name:<>
                      <div>汇能</div>
                      <div>平台运营成本</div>
                      </>,
                price: findItem?.commissionType==2?findItem?.platformOperateFee:amountTransform(findItem?.platformOperateFee, '/')
              },
              {
                id: 11,
                name: <>
                      <div>汇能</div>
                      <div style={{color:'#999999'}}>没有对应角色的分成归此处,线下结算的角色资金先分账到平台</div>
                      </>
              },
            ]
            setEditableRowKeys(data?.map(item => item.id))
            setDataSource(data)
          }
        }
      })
    }
  }, [recordId,loding])

  const submit = (values) => {
    const { commissionType, saleType } = values
    try {
      if(commissionType==2?compute2()<0:compute()<0){
        return message.error('平台金额为负！')
      }
      const params = {
        status: submitType?1:null,
        orderType: 30,
        id: recordList?.id ? recordList?.id : 0,
        spuId: recordList?.id ? recordList?.spuId : recordId?.spuId,
        skuId: recordList?.id ? recordList?.skuId : recordId?.skuId,
        shoppervipChargeFee:commissionType==2?dataSource[0]?.price:amountTransform(dataSource[0]?.price, '*'),
        cityManageFee: commissionType==2?dataSource[1]?.price:amountTransform(dataSource[1]?.price, '*'),
        provinceManageFee: 0,
        shopperChargeFee: 0,
        userChargeFee: 0,
        shopperManageFee: 0,
        userManageFee: 0,
        shoppervipManageFee: 0,
        provinceAgent: commissionType==2?dataSource[3]?.price:amountTransform(dataSource[3]?.price, '*'),
        cityAgent: commissionType==2?dataSource[4]?.price:amountTransform(dataSource[4]?.price, '*'),
        hydrogenCityAgent:commissionType==2?dataSource[5]?.price:amountTransform(dataSource[5]?.price, '*'),
        trainCenterManageFee:commissionType==2?dataSource[6]?.price:amountTransform(dataSource[6]?.price, '*'),
        serviceFee: commissionType==2?dataSource[7]?.price:amountTransform(dataSource[7]?.price, '*'),
        companyAgent: commissionType==2?dataSource[8]?.price:amountTransform(dataSource[8]?.price, '*'),
        platformOperateFee: commissionType==2?dataSource[9]?.price:amountTransform(dataSource[9]?.price, '*'),
        dividends: 0,
        company: commissionType==2?compute2():amountTransform(compute(), '*'),
        commissionType,
        saleType
      }
      saveCommissionConfig(params).then(res => {
        if (res.code == 0) {
          setVisible(false)
          callback()
          detailData?.id?message.success('修改成功！'):message.success('提交成功！')
        }
      })
    } catch (error) {
      console.log('error',error)
    }
  }

  const myToFixed=(num)=>{
    num = num.toString()
    const index = num.indexOf('.')
    if (index !== -1) {
      num = num.substring(0, 2 + index + 1)
    } else {
      num = num.substring(0)
    }
          //截取后保留两位小数
    return parseFloat(num).toFixed(2)
  }


  useEffect(() => {
    productList({ orderType: 30 }).then(res => {
      setUserList(res.data)
    })
  }, [loding])
  const compute = () => {
    let sum = 0
    for (let index = 0; index < 11; index++) {
      if (dataSource[index]?.price) {
        sum = sum + parseFloat(dataSource[index]?.price)
      }
    }
    const company=recordId?amountTransform(recordId?.distributePrice - amountTransform(sum, '*')-recordId?.wholesaleSupplyPrice-recordId?.wholesaleFreight, '/'):amountTransform(recordList?.distributePrice - amountTransform(sum, '*')-recordList?.wholesaleSupplyPrice-recordList?.wholesaleFreight, '/')
    return myToFixed(company)
  }

  const compute2 = () => {
    let sum = 0
    for (let index = 0; index < 11; index++) {
      if (dataSource[index]?.price) {
        sum = sum + parseFloat(dataSource[index]?.price)
      }
    }
    const company=amountTransform(10000 - amountTransform(sum,'*')-amountTransform(proportion2(),'*'),'/')
    return myToFixed(company)
  }

  const proportion = (_) =>{
      const editPrice=commType==2?amountTransform(recordList?.distributePrice,'/')*amountTransform(parseFloat(_?.entry?.price),'/'):
                                  amountTransform(amountTransform(parseFloat(_?.entry?.price),'*')/recordList?.distributePrice,'*')
      const price=commType==2?amountTransform(recordId?.distributePrice,'/')*amountTransform(parseFloat(_?.entry?.price),'/'):
                              amountTransform(amountTransform(parseFloat(_?.entry?.price),'*')/recordId?.distributePrice,'*')
    return <span>{editPrice&&myToFixed(editPrice)||myToFixed(price)}{commType==1?'%':'元'}</span>
  }

  const proportion2 = (_) =>{
      const editPrice=commType==2?amountTransform(amountTransform((recordList?.wholesaleSupplyPrice+recordList?.wholesaleFreight),'/')/amountTransform(recordList?.distributePrice,'/'),'*'):
                                  amountTransform((recordList?.wholesaleSupplyPrice+recordList?.wholesaleFreight)/recordList?.distributePrice,'*')
      const price=commType==2?amountTransform(amountTransform((recordId?.wholesaleSupplyPrice+recordId?.wholesaleFreight),'/')/amountTransform(recordId?.distributePrice,'/'),'*'):
                              amountTransform((recordId?.wholesaleSupplyPrice+recordId?.wholesaleFreight)/recordId?.distributePrice,'*')
    return editPrice&&myToFixed(editPrice)||myToFixed(price)
  }

  const proportion4 = (val) =>{
    const editPrice=commType==2?amountTransform(val/recordList?.distributePrice,'*'):
                                amountTransform(parseFloat(val),'/')
    const price=commType==2?amountTransform(val/recordId?.distributePrice,'*'):
                            amountTransform(parseFloat(val),'/')
  return <span>{editPrice&&myToFixed(editPrice)||myToFixed(price)}</span>
  }

  const proportion5 = (val) =>{
    const editPrice=commType==2?amountTransform(parseFloat(val),'/'):
                                amountTransform(val/recordList?.distributePrice,'*')
                                
    const price=commType==2?amountTransform(parseFloat(val),'/'):
                            amountTransform(val/recordId?.distributePrice,'*')
                           
  return <span>{editPrice&&myToFixed(editPrice)||myToFixed(price)}</span>
  }
  const touchBlur = () =>{
    const params = {
      status: submitType?1:null,
      orderType: 30,
      id: recordList?.id ? recordList?.id : 0,
      spuId: recordList?.id ? recordList?.spuId : recordId?.spuId,
      skuId: recordList?.id ? recordList?.skuId : recordId?.skuId,
      shoppervipChargeFee:commType==2?dataSource[0]?.price?dataSource[0]?.price:0:amountTransform(dataSource[0]?.price, '*'),
      cityManageFee: commType==2?dataSource[1]?.price?dataSource[1]?.price:0:amountTransform(dataSource[1]?.price, '*'),
      provinceManageFee: 0,
      shopperChargeFee: 0,
      userChargeFee: 0,
      shopperManageFee: 0,
      userManageFee: 0,
      shoppervipManageFee: 0,
      provinceAgent: commType==2?dataSource[3]?.price?dataSource[3]?.price:0:amountTransform(dataSource[3]?.price, '*'),
      cityAgent: commType==2?dataSource[4]?.price?dataSource[4]?.price:0:amountTransform(dataSource[4]?.price, '*'),
      hydrogenCityAgent:commType==2?dataSource[5]?.price?dataSource[5]?.price:0:amountTransform(dataSource[5]?.price, '*'),
      trainCenterManageFee:commType==2?dataSource[6]?.price?dataSource[6]?.price:0:amountTransform(dataSource[6]?.price, '*'),
      serviceFee: commType==2?dataSource[7]?.price?dataSource[7]?.price:0:amountTransform(dataSource[7]?.price, '*'),
      companyAgent: commType==2?dataSource[8]?.price?dataSource[8]?.price:0:amountTransform(dataSource[8]?.price, '*'),
      platformOperateFee: commType==2?dataSource[9]?.price?dataSource[9]?.price:0:amountTransform(dataSource[9]?.price, '*'),
      dividends: 0,
      company: commType==2?compute2():amountTransform(compute(), '*'),
      commissionType: commType,
      saleType: marketType
    }
    wholeSaleAccountCheck(params).then(res=>{
      if(res.code==0){
        setComputePrice(res.data)
      }
    })
  }
  const columns = [
    {
      title: '参与角色',
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title: '序号',
          dataIndex: 'id',
          width: 50,
          align: 'center',
          editable: false,
        },
        {
          title: '对象和对应结算项名称',
          dataIndex: 'name',
          align: 'center',
          editable: false,
        }
      ]
    },
    {
      title: <>
              <span>参与商品或费用和对应金额</span>&nbsp;&nbsp;&nbsp;
              <a onClick={()=>{ setLoding(loding+1) }}>获取最新价</a>
             </>,
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title: <ProForm
          form={form2}
          submitter={false}
         >
            <Form.Item
              name='name'
            >
              <CusAutoComplete
                placeholder="输入商品名称或skuID搜索"
                options={userList?.map(item => ({ label: `skuID：${item.skuId} ${item.goodsName} 售价： ${myToFixed(amountTransform(item.distributePrice, '/'))}元`, value: item.skuId }))}
                onChange2={(v) => {
                  setRecordId(v)
                  compute()
                  setDataSource(bloodData.map(ele=>({...ele,price:null})))
                }}
                userList={userList}
                setUserList={setUserList}
              />
            </Form.Item>
          </ProForm>,
          dataIndex: 'price',
          renderFormItem: (_, r) => {
            if (_?.entry?.id == 3) {
              return <>
                <p>
                
                {commType==1&&<span>{recordId?myToFixed(amountTransform((recordId?.wholesaleSupplyPrice+recordId?.wholesaleFreight), '/')):myToFixed(amountTransform((recordList?.wholesaleSupplyPrice+recordList?.wholesaleFreight), '/'))}{commType==1?'元':'%'}</span>}
                {commType==1&&<span style={{marginLeft:'415px'}}>= {proportion2(_)}{commType==2?'元':'%'}</span>}
                {commType==2&&<span>{proportion2(_)}{commType==1?'元':'%'} </span>}
                {commType==2&&<span style={{marginLeft:'415px'}}> =  {recordId?myToFixed(amountTransform((recordId?.wholesaleSupplyPrice+recordId?.wholesaleFreight), '/')):myToFixed(amountTransform((recordList?.wholesaleSupplyPrice+recordList?.wholesaleFreight), '/'))}{commType==2?'元':'%'} </span>}
                </p>
                <p style={{ color: '#F88000' }}>（取供应商提供的批发供货价+平均运费）</p>
              </>
            } else if (_?.entry?.id == 10) {
              return <FromWrap
                      content={(value, onChange) =>  <InputNumber  
                        min="0"
                        max={amountTransform(recordList?.distributePrice,'/')||amountTransform(recordId?.distributePrice,'/')}
                        style={{ width: '450px' }} 
                        precision='2'
                        stringMode
                        addonAfter={commType==1?'元':'%'} 
                        placeholder='请输此行角色的结算金额，0.00至新集约价。总结算金额<新集约价' 
                        value={value} 
                        onChange={onChange}
                        onBlur={()=>{ touchBlur() }}
                      />}
                      right={(value) => {
                        return <span>= {proportion(_)} </span>
                      }}
                      bottom={(value)=>{
                          const editPrice=commType==2?amountTransform(recordList?.distributePrice,'/')*amountTransform(parseInt(value),'/'):
                                                      amountTransform(amountTransform(value,'*')/recordList?.distributePrice,'*')
                          const price=commType==2?amountTransform(recordId?.distributePrice/amountTransform(value,'*'),'*'):
                                                  amountTransform(amountTransform(value,'*')/recordId?.distributePrice,'*')
                            if(commType==2&&value&&parseFloat(value)<5&&_?.entry?.id==10){
                              return <p>建议平台运营成本分成不低于5% <span style={{color:'red'}}>设置的运营成本低于商品集约价的5%！请谨慎操作</span></p>
                            }else if(commType==1&&editPrice&&editPrice<5||commType==1&&price&&price<5&&_?.entry?.id==10){
                              return <p>建议平台运营成本分成不低于5% <span style={{color:'red'}}>设置的运营成本低于商品集约价的5%！请谨慎操作</span></p>
                            }
                      }}
                    />
            } else if (_?.entry?.id == 11) {
              return <>
                <p>
                  {proportion4(computePrice)}{commType==1?'元':'%'}
                  <span style={{marginLeft:'415px'}}>= {proportion5(computePrice)} </span>{commType==2?'元':'%'}
                </p>
                <p style={{ color: '#F88000' }}>= 新集约价 - 前各项金额之和(随前各项数据即时更新)</p>
                <p>新集约价：{amountTransform(recordId?.distributePrice,'/')||amountTransform(recordList?.distributePrice,'/')}元 &nbsp;&nbsp;&nbsp;<a target='_blank' href={'/product-management/supplier/product-list?spuId='+detailData?.spuId||recordId?.spuId}>编辑新集约价</a></p>
              </>
            }
            return <FromWrap
                    content={(value, onChange) =>   <InputNumber  
                      min="0"
                      max={amountTransform(recordList?.distributePrice,'/')||amountTransform(recordId?.distributePrice,'/')}
                      style={{ width: '450px' }} 
                      precision='2'
                      stringMode
                      addonAfter={commType==1?'元':'%'} 
                      placeholder='请输此行角色的结算金额，0.00至新集约价。总结算金额<新集约价' 
                      value={value} 
                      onChange={onChange}
                      onBlur={()=>{ touchBlur() }}
                    />}
                    right={(value) => {
                      return <span>= {proportion(_)} </span>
                    }}
                    bottom={(value)=>{
                      const editPrice=commType==2?amountTransform(recordList?.distributePrice,'/')*amountTransform(parseInt(value),'/'):
                                  amountTransform(amountTransform(parseInt(value),'*')/recordList?.distributePrice,'*')
                      const price=commType==2?amountTransform(recordId?.distributePrice,'/')*amountTransform(parseInt(value),'/'):
                              amountTransform(amountTransform(parseInt(value),'*')/recordId?.distributePrice,'*')
                          if(commType==2&&parseFloat(value)&&parseFloat(value)>5&&_?.entry?.id!=10){
                            return <p>建议分佣/奖励分成不高于5% <span style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作</span></p>
                          }else if(commType==1&&editPrice&&editPrice>5||commType==1&&price&&price>5&&_?.entry?.id!=10){
                            return <p>建议分佣/奖励分成不高于5% <span style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作</span></p>
                          }
                    }}
                  />   
          },
        }
      ]
    },

  ]

 
  return (
    <DrawerForm
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1300,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return [
                <p key='versionNo' style={{marginRight:'900px',display:detailData?.versionNo?'block':'none'}}>当前分成版本：{detailData?.versionNo}</p>,
                <Button  type="default" key="submit1" onClick={() => {
                  props.form?.submit?.()
                  setSubmitType(1)
                }}>
                  保存并应用
                </Button>,
                <Button  type="primary" key="submit2" onClick={() => {
                  props.form?.submit?.()
                  setSubmitType(0)
                }}>
                  保存
                </Button>
            ];
        },
        }}
      onFinish={async (values) => {
        await submit(values);
      }}
      form={form}
      visible={visible}
      {...formItemLayout}
    >
      <ProFormRadio.Group
        name="saleType"
        label='销售类型'
        options={[
          {
              label: '引流',
              value: 1,
          },
          {
              label: '利润',
              value: 2,
          },
          {
              label:'其他',
              value: 0,
          },
        ]}
        fieldProps={{
          onChange:(_)=>{
            setMarketType(_.target.value)
          }
        }}
        initialValue={0}
      />
      <ProFormRadio.Group
        name="commissionType"
        label='结算分成类型'
        options={[
          {
              label:'按百分比分成',
              value: 2,
          },
          {
              label: '按金额分成',
              value: 1,
          }
        ]}
        fieldProps={{
          onChange:(_)=>{
            setCommType(_.target.value)
            proportion()
          }
        }}
        initialValue={2}
      />
      <EditableProTable
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        actionRef={actionRef}
        bordered
        search={false}
        columns={columns}
        toolbar={{
          settings: false
        }}
        controlled
        pagination={false}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (rowKey, data, row) => {
            console.log(rowKey, data, row);
          },
          onValuesChange: (record, List) => {
            compute()
            setDataSource(List)
          }
        }}
        recordCreatorProps={false}
      />
      <p style={{ color: '#F88000',float:'right' }}>运营成本建议不低于商品新集约价5%，其他各输入项建议不得高于商品新集约价5%</p>
      {roleVisible && <ConfirmationModel
          visible={roleVisible}
          setVisible={setRoleVisible}
          onClose={() => { setRoleVisible(false); setAstrictType(null) }}
          astrictType={astrictType}
          callback={() => { setRoleVisible(false); setAstrictType(null) }}
        />}
    </DrawerForm>
  );
};



