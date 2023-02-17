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
import { history } from 'umi';

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
      <div style={{ flex: 1 }}>{right(value)}</div>
    </div>
    <div>{bottom(value)}</div>
  </div>
)


const bloodData = [
  {
    id: 1,
    name: <>
          <div>直推人（必须是VIP店主）</div>
          <div>直推收益</div>
          </>
  },
  {
    id: 2,
    name: <>
          <div>市办事处 - 无大团长</div>
          <div>下单店主的店铺地址所属市办事处，没有VIP推荐人，归平台</div>
          </>
  },
  {
    id: 3,
    name: <>
          <div>市办事处 - 有大团长</div>
          <div>下单店主的店铺地址所属市办事处，没有VIP推荐人，归平台</div>
          </>
  },
  {
    id: 4,
    name: <>
          {/* <div>市办事处 - 大团长</div>
          <div>距离最近且具有大团长身份的下单人的推荐人</div> */}
          <div>大团队长</div>
          {/* <div>距离最近且具有大团长身份的下单人的推荐人</div> */}
          </>
  },
   {
    id: 5,
    name:<>
        <div>培训中心</div>
        <div>管理奖励</div>
        </>
  },
  {
    id: 6,
    name: <>
          <div>汇能科技</div>
          <div>积分/红包</div>
          </>
  },
  {
    id: 7,
    name: <>
          <div>供应商货款</div>
          <div>批发供货价+平均运费</div>
          </>,
  },
  {
    id: 8,
    name: <>
          <div>汇智能通省代</div>
          <div>VIP直推人开启地址所属省代收益</div>
          </>,
  },
  {
    id: 9,
    name: <>
          <div>汇智能通市代</div>
          <div>VIP直推人开启地址所属市代收益</div>
          </>,
  },
  {
    id: 10,
    name: <>
          <div>氢原子市代</div>
          <div>VIP直推人开启地址所属氢原子市代收益</div>
          </>,
  },
  {
    id: 11,
    name: <>
          <div>运营中心</div>
          <div>服务费佣金</div>
          </>
  },
  {
    id: 12,
    name:<>
          <div>汇能</div>
          <div>平台运营成本</div>
          </>
  },
  {
    id: 13,
    name:'汇能'
  },
]


export default (props) => {
  const { onClose, visible, setVisible, detailData, callback } = props;
  const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState(()=>bloodData?.map(item => item.id));
  const [dataSource, setDataSource] = useState(()=>bloodData);
  const [userList, setUserList] = useState([])
  const [recordList, setRecordList] = useState([])
  const actionRef = useRef();
  const [commType, setCommType] = useState(2)
  const [submitType, setSubmitType] = useState()
  const [loding, setLoding] = useState(0)
  const [marketType, setMarketType] = useState(0)
  const [computePrice, setComputePrice] = useState()

  useEffect(() => {
    if (detailData?.spuId) {
      getCommissionConfigBySpuId({ spuId: detailData?.spuId,orderType: 30 }).then(res => {
        const findItem=detailData?.skuId?res.data.find(ele=>ele?.skuId==detailData?.skuId)||detailData:res?.data[0]||detailData
        if(findItem){
          setRecordList(findItem)
          setCommType(findItem?.commissionType||2)
          setMarketType(findItem?.saleType||0)
          form.setFieldsValue({
            name: findItem?.goodsName,
            commissionType: findItem?.commissionType||2,
            saleType: findItem?.saleType||0
          })
          if(findItem?.skuId&&findItem?.provinceAgent){
            wholeSaleAccountCheck(findItem).then(res=>{
              if(res.code==0){
                setComputePrice(res.data)
              }
            })
          }
          const data = [
            {
              id: 1,
              name: <>
                    <div>直推人（必须是VIP店主）</div>
                    <div>直推收益</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.shoppervipChargeFee:amountTransform(findItem?.shoppervipChargeFee, '/')
            },
            {
              id: 2,
              name: <>
                    <div>市办事处 - 无大团长</div>
                    <div>下单店主的店铺地址所属市办事处，没有VIP推荐人，归平台</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.cityManageFee:amountTransform(findItem?.cityManageFee, '/')
            },
            {
              id: 3,
              name: <>
                    <div>市办事处 - 有大团长</div>
                    <div>下单店主的店铺地址所属市办事处，没有VIP推荐人，归平台</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.cityManageTeamFee:amountTransform(findItem?.cityManageTeamFee, '/')
            },
            {
              id: 4,
              name: <>
                    {/* <div>市办事处 - 大团长</div>
                    <div>距离最近且具有大团长身份的下单人的推荐人</div> */}
                    <div>大团队长</div>
                    {/* <div>距离最近且具有大团长身份的下单人的推荐人</div> */}
                    </>,
              price: findItem?.commissionType==2?findItem?.cityTeamLeader:amountTransform(findItem?.cityTeamLeader, '/')
            },
             {
              id: 5,
              name:<>
                  <div>培训中心</div>
                  <div>管理奖励</div>
                  </>,
              price: findItem?.commissionType==2?findItem?.trainCenterManageFee:amountTransform(findItem?.trainCenterManageFee, '/')
            },
            {
              id: 6,
              name: <>
                    <div>汇能科技</div>
                    <div>积分/红包</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.serviceFee:amountTransform(findItem?.serviceFee, '/')
            },
            {
              id: 7,
              name: <>
                    <div>供应商货款</div>
                    <div>批发供货价+平均运费</div>
                    </>,
            },
            {
              id: 8,
              name: <>
                    <div>汇智能通省代</div>
                    <div>VIP直推人开启地址所属省代收益</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.provinceAgent:amountTransform(findItem?.provinceAgent, '/')
            },
            {
              id: 9,
              name: <>
                    <div>汇智能通市代</div>
                    <div>VIP直推人开启地址所属市代收益</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.cityAgent:amountTransform(findItem?.cityAgent, '/')
            },
            {
              id: 10,
              name: <>
                    <div>氢原子市代</div>
                    <div>VIP直推人开启地址所属氢原子市代收益</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.hydrogenCityAgent:amountTransform(findItem?.hydrogenCityAgent, '/')
            },
            {
              id: 11,
              name: <>
                    <div>运营中心</div>
                    <div>服务费佣金</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.companyAgent:amountTransform(findItem?.companyAgent, '/')
            },
            {
              id: 12,
              name:<>
                    <div>汇能</div>
                    <div>平台运营成本</div>
                    </>,
              price: findItem?.commissionType==2?findItem?.platformOperateFee:amountTransform(findItem?.platformOperateFee, '/')
            },
            {
              id: 13,
              name:'汇能'
            },
          ]
          setEditableRowKeys(data?.map(item => item.id))
          setDataSource(data)
        }
      })
    }
  }, [loding])

  useEffect(() => {
    if(detailData.commissionConfig==0&&recordList.length==0){
      productList({ spuId: detailData?.spuId,skuId:detailData?.skuId,orderType: 30 }).then(res => {
        setCommType(2)
        setRecordList({
          skuId:res.data[0]?.skuId,
          goodsName:res.data[0]?.goodsName,
          distributePrice:res.data[0]?.distributePrice,
          spuId:res.data[0]?.spuId,
          wholesaleSupplyPrice:res.data[0]?.wholesaleSupplyPrice,
          wholesaleFreight:res.data[0]?.wholesaleFreight
        })
      })
    }
  }, [loding])

  const submit = (values) => {
    const { commissionType, saleType } = values
    if(commissionType==2?compute2()<0:compute()<0){
      return message.error('平台金额为负！')
    }
    try {
      const params = {
        status: submitType?1:null,
        orderType: 30,
        id: recordList?.id&&recordList?.provinceAgent? recordList?.id : 0,
        spuId: recordList?.spuId,
        skuId: recordList?.skuId,
        shoppervipChargeFee:commissionType==2?dataSource[0]?.price:amountTransform(dataSource[0]?.price, '*'),
        cityManageFee:commissionType==2?dataSource[1]?.price:amountTransform(dataSource[1]?.price, '*'),
        cityManageTeamFee:commissionType==2?dataSource[2]?.price:amountTransform(dataSource[2]?.price, '*'),
        cityTeamLeader:commissionType==2?dataSource[3]?.price:amountTransform(dataSource[3]?.price, '*'),
        trainCenterManageFee:commissionType==2?dataSource[4]?.price:amountTransform(dataSource[4]?.price, '*'),
        serviceFee: commissionType==2?dataSource[5]?.price:amountTransform(dataSource[5]?.price, '*'),
        provinceAgent: commissionType==2?dataSource[7]?.price:amountTransform(dataSource[7]?.price, '*'),
        cityAgent: commissionType==2?dataSource[8]?.price:amountTransform(dataSource[8]?.price, '*'),
        hydrogenCityAgent:commissionType==2?dataSource[9]?.price:amountTransform(dataSource[9]?.price, '*'),
        companyAgent: commissionType==2?dataSource[10]?.price:amountTransform(dataSource[10]?.price, '*'),
        platformOperateFee: commissionType==2?dataSource[11]?.price:amountTransform(dataSource[11]?.price, '*'),
        dividends: 0,
        provinceManageFee: 0,
        shopperChargeFee: 0,
        userChargeFee: 0,
        shopperManageFee: 0,
        userManageFee: 0,
        shoppervipManageFee: 0,
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

  const compute = () => {
    let sum = 0
    for (let index = 0; index < 13; index++) {
      if (dataSource[index]?.price) {
        sum = sum + parseFloat(dataSource[index]?.price)
      }
    }
    const company=amountTransform(recordList?.distributePrice - amountTransform(sum, '*')-recordList?.wholesaleSupplyPrice-recordList?.wholesaleFreight, '/')
    return myToFixed(company)
  }

  const compute2 = () => {
    let sum = 0
    for (let index = 0; index < 13; index++) {
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
    return <span>{editPrice&&myToFixed(editPrice)}{commType==1?'%':'元'}</span>
  }

  const proportion2 = (_) =>{
    const editPrice=commType==2?amountTransform(amountTransform(recordList?.wholesaleSupplyPrice+recordList?.wholesaleFreight,'/')/amountTransform(recordList?.distributePrice,'/'),'*'):
                                amountTransform((recordList?.wholesaleSupplyPrice+recordList?.wholesaleFreight)/recordList?.distributePrice,'*') 
  return editPrice&&myToFixed(editPrice)
  }

  const proportion4 = (val) =>{
    const editPrice=commType==2?amountTransform(val/recordList?.distributePrice,'*'):
                                amountTransform(parseFloat(val),'/')
  return <span>{editPrice&&myToFixed(editPrice)}</span>
  }

  const proportion5 = (val) =>{
    const editPrice=commType==2?amountTransform(parseFloat(val),'/'):
                                amountTransform(val/recordList?.distributePrice,'*')                  
  return <span>{editPrice&&myToFixed(editPrice)}</span>
  }

  const touchBlur = () =>{
    const params = {
      status: submitType?1:null,
      orderType: 30,
      id: recordList?.id&&recordList?.id!= recordList?.skuId? recordList?.id : 0,
      spuId: recordList?.spuId,
      skuId: recordList?.skuId,
      shoppervipChargeFee:commType==2?dataSource[0]?.price:amountTransform(dataSource[0]?.price, '*'),
      cityManageFee:commType==2?dataSource[1]?.price:amountTransform(dataSource[1]?.price, '*'),
      cityManageTeamFee:commType==2?dataSource[2]?.price:amountTransform(dataSource[2]?.price, '*'),
      cityTeamLeader:commType==2?dataSource[3]?.price:amountTransform(dataSource[3]?.price, '*'),
      trainCenterManageFee:commType==2?dataSource[4]?.price:amountTransform(dataSource[4]?.price, '*'),
      serviceFee: commType==2?dataSource[5]?.price:amountTransform(dataSource[5]?.price, '*'),
      provinceAgent: commType==2?dataSource[7]?.price:amountTransform(dataSource[7]?.price, '*'),
      cityAgent: commType==2?dataSource[8]?.price:amountTransform(dataSource[8]?.price, '*'),
      hydrogenCityAgent:commType==2?dataSource[9]?.price:amountTransform(dataSource[9]?.price, '*'),
      companyAgent: commType==2?dataSource[10]?.price:amountTransform(dataSource[10]?.price, '*'),
      platformOperateFee: commType==2?dataSource[11]?.price:amountTransform(dataSource[11]?.price, '*'),
      dividends: 0,
      provinceManageFee: 0,
      shopperChargeFee: 0,
      userChargeFee: 0,
      shopperManageFee: 0,
      userManageFee: 0,
      shoppervipManageFee: 0,
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
      title: '序号',
      dataIndex: 'id',
      width: 50,
      align: 'center',
      editable: false,
    },
    {
      title: '分成对象&费用名称',
      align: 'center',
      dataIndex: 'name',
      hideInSearch: true,
      editable: false,
    },
    {
      title: <>
              <p>{recordList?.goodsName}</p>
              <span>skuID:{recordList?.skuId}  新集约价:￥{amountTransform(recordList?.distributePrice, '/')}&nbsp;&nbsp;&nbsp; <a onClick={()=>{ setLoding(loding+1) }}>获取最新价</a></span>
            </>,
      align: 'center',
      hideInSearch: true,
      dataIndex: 'price',
      renderFormItem: (_,{ record }) => {
        if (_?.entry?.id == 7) {
          return <>
            <p>
              {commType==1&&<span>{myToFixed(amountTransform(recordList?.wholesaleSupplyPrice+recordList?.wholesaleFreight, '/'))}{commType==1?'元':'%'}</span>}
              {commType==1&&<span style={{marginLeft:'415px'}}>= {proportion2(_)}{commType==2?'元':'%'}</span>}
              {commType==2&&<span>{proportion2(_)}{commType==1?'元':'%'} </span>}
              {commType==2&&<span style={{marginLeft:'415px'}}> =  {myToFixed(amountTransform(recordList?.wholesaleSupplyPrice+recordList?.wholesaleFreight, '/'))}{commType==2?'元':'%'} </span>}
              </p>
            <p style={{ color: '#F88000' }}>（取供应商提供的批发供货价+平均运费）</p>
          </>
        } else if (_?.entry?.id == 12) {
          return <FromWrap
                  content={(value, onChange) =>  <InputNumber  
                    min="0"
                    max={amountTransform(recordList?.distributePrice,'/')}
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
                    const editPrice=commType==2?amountTransform(recordList?.distributePrice,'/')*amountTransform(parseFloat(value),'/'):
                                                amountTransform(amountTransform(value,'*')/recordList?.distributePrice,'*')
                        if(commType==1&&editPrice&&editPrice<5&&_?.entry?.id==12){
                          return <p>建议平台运营成本分成不低于5% <span style={{color:'red'}}>设置的运营成本低于商品集约价的5%！请谨慎操作</span></p>
                        }else if(commType==2&&value&&parseFloat(value)<5&&_?.entry?.id==12){
                          return <p>建议平台运营成本分成不低于5% <span style={{color:'red'}}>设置的运营成本低于商品集约价的5%！请谨慎操作</span></p>
                        }
                  }}
                />
        } else if (_?.entry?.id == 13) {
          return <>
            <p>
              {proportion4(computePrice)}{commType==1?'元':'%'}
              <span style={{marginLeft:'415px'}}>= {proportion5(computePrice)} </span>{commType==2?'元':'%'}
            </p>
            <p style={{ color: '#F88000' }}>= 根据含抵税的新集约新定价公式计算所得（2022/10/28）</p>
            <p>新集约价：{amountTransform(recordList?.distributePrice,'/')}元&nbsp;&nbsp;&nbsp; <a target='_blank' href={'/product-management/supplier/product-list?spuId='+detailData?.spuId}>编辑新集约价</a></p>
          </>
        }
        return  <FromWrap
                  content={(value, onChange) =>   <InputNumber  
                    min="0"
                    max={amountTransform(recordList?.distributePrice,'/')}
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
                    const editPrice=commType==2?amountTransform(recordList?.distributePrice,'/')*amountTransform(parseFloat(value),'/'):
                                                amountTransform(amountTransform(value,'*')/recordList?.distributePrice,'*')
                        if(commType==1&&editPrice&&editPrice>5&&_?.entry?.id!=12){
                          return <p>建议分佣/奖励分成不高于5% <span style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作</span></p>
                        }else if(commType==2&&value&&parseFloat(value)>5&&_?.entry?.id!=12){
                          return <p>建议分佣/奖励分成不高于5% <span style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作</span></p>
                        }
                  }}
                />   
    
      }
    },

  ]

  return (
    <DrawerForm
      onVisibleChange={setVisible}
      title='查看商品分成结算配置'
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
                <p key='versionNo' style={{marginRight:'900px',display:recordList?.versionNo?'block':'none'}}>当前分成版本：{recordList?.versionNo}</p>,
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
      <p style={{paddingLeft:'20px'}}>[spuID:{detailData?.spuId}] {detailData?.goodsName}</p>
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
    </DrawerForm>
  );
};