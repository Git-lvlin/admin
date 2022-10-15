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
import { saveCommissionConfig, getCommissionConfigBySpuId } from '@/services/product-management/designated-commodity-settlement';
import { PlusOutlined } from '@ant-design/icons';
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import { amountTransform } from '@/utils/utils'
import ConfirmationModel from './confirmation-model'

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
    name: '店主（下单人）开店地址所属市办事处',
    tip: '销售订单按订单收货地址判断业绩归属。（线下结算，下单后修改收货地址，依然按下单时的地址判断业绩归属）',
  },
  {
    id: 2,
    name: '直推收益（VIP店主）-服务佣金(直)',
    tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
  },
  {
    id: 3,
    name: <>
          <div>供应商-货款</div>
          <div>销售订单承担通道费</div>
          </>,
  },
   {
    id: 4,
    name:<>
        <div>培训中心</div>
        <div>管理奖励</div>
        </>
  },
  {
    id: 5,
    name: <>
          <div>汇能科技</div>
          <div>积分/红包</div>
          </>
  },
  {
    id: 6,
    name: <>
          <div>运营中心</div>
          <div>服务费佣金</div>
          </>
  },
  {
    id: 7,
    name:<>
          <div>汇能</div>
          <div>平台运营成本</div>
          </>
  },
  {
    id: 8,
    name: '汇能',
    tip: '没有对应角色的分成归此处,线下结算的角色资金先分账到平台',
  },
]

const CusAutoComplete = ({ value, onChange, onChange2,setUserList, userList, options, ...rest }) => {
  const changeHandle = (e) => {
    const findItem = userList?.find(item => item.skuId === e)
    if (findItem) {
      onChange(findItem.goodsName)
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
      onChange(findItem.goodsName)
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
  useEffect(() => {
    if (detailData?.spuId) {
      getCommissionConfigBySpuId({ spuId: detailData?.spuId, orderType: 30 }).then(res => {
        const findItem=res.data.find(ele=>ele?.skuId==recordId?.skuId)||res.data.find(ele=>ele?.skuId==detailData?.skuId)
        setRecordList(findItem)
        setCommType(findItem?.commissionType)
        form.setFieldsValue({
          commissionType: findItem?.commissionType
        })
        form2.setFieldsValue({
          name: findItem?.goodsName,
        })
        if(findItem){
          const data = [
            {
              id: 1,
              name: '店主（下单人）开店地址所属市办事处',
              tip: '销售订单按订单收货地址判断业绩归属。（线下结算，下单后修改收货地址，依然按下单时的地址判断业绩归属）',
              price: amountTransform(findItem?.cityManageFee, '/')
            },
            {
              id: 2,
              name: '直推收益（VIP店主）-服务佣金(直)',
              tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
              price: amountTransform(findItem?.shoppervipChargeFee, '/')
            },
            {
              id: 3,
              name: <>
                    <div>供应商-货款</div>
                    <div>销售订单承担通道费</div>
                    </>,
            },
             {
              id: 4,
              name:<>
                  <div>培训中心</div>
                  <div>管理奖励</div>
                  </>,
              price: amountTransform(findItem?.trainCenterManageFee, '/')
            },
            {
              id: 5,
              name: <>
                    <div>汇能科技</div>
                    <div>积分/红包</div>
                    </>,
              price: amountTransform(findItem?.serviceFee, '/')
            },
            {
              id: 6,
              name: <>
                    <div>运营中心</div>
                    <div>服务费佣金</div>
                    </>,
              price: amountTransform(findItem?.companyAgent, '/')
            },
            {
              id: 7,
              name:<>
                    <div>汇能</div>
                    <div>平台运营成本</div>
                    </>,
              price: amountTransform(findItem?.platformOperateFee, '/')
            },
            {
              id: 8,
              name: '汇能',
              tip: '没有对应角色的分成归此处,线下结算的角色资金先分账到平台',
            },
          ]
          setEditableRowKeys(data?.map(item => item.id))
          setDataSource(data)
        }
      })
    }
  }, [recordId])

  const submit = (values) => {
    try {
      if(compute()<0){
        return message.error('平台金额为负！')
      }
      const params = {
        orderType: 30,
        id: recordList?.id ? recordList?.id : 0,
        spuId: recordList?.id ? recordList?.spuId : recordId?.spuId,
        skuId: recordList?.id ? recordList?.skuId : recordId?.skuId,
        cityManageFee: amountTransform(dataSource[0]?.price, '*'),
        shoppervipChargeFee: amountTransform(dataSource[1]?.price, '*'),
        provinceManageFee: 0,
        shopperChargeFee: 0,
        userChargeFee: 0,
        shopperManageFee: 0,
        userManageFee: 0,
        shoppervipManageFee: 0,
        trainCenterManageFee:amountTransform(dataSource[3]?.price, '*'),
        serviceFee: amountTransform(dataSource[4]?.price, '*'),
        companyAgent: amountTransform(dataSource[5]?.price, '*'),
        platformOperateFee: amountTransform(dataSource[6]?.price, '*'),
        provinceAgent: 0,
        cityAgent: 0,
        dividends: 0,
        company: amountTransform(compute(), '*'),
        ...values
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
  useEffect(() => {
    productList({ orderType: 30 }).then(res => {
      setUserList(res.data)
    })
  }, [])
  const compute = () => {
    let sum = 0
    for (let index = 0; index < 8; index++) {
      if (dataSource[index]?.price) {
        sum = sum + parseFloat(dataSource[index]?.price)
      }
    }
    const company=recordId?amountTransform(recordId?.salePrice - amountTransform(sum, '*')-recordId?.retailSupplyPrice, '/').toFixed(2):amountTransform(recordList?.salePrice - amountTransform(sum, '*')-recordList?.retailSupplyPrice, '/').toFixed(2)
    return company
  }

  const proportion = (_) =>{
      const editPrice=commType==2?amountTransform(recordList?.salePrice,'/')*amountTransform(parseInt(_?.entry?.price),'/'):
                                  amountTransform(amountTransform(parseInt(_?.entry?.price),'*')/recordList?.salePrice,'*')
      const price=commType==2?amountTransform(recordId?.salePrice,'/')*amountTransform(parseInt(_?.entry?.price),'/'):
                              amountTransform(amountTransform(parseInt(_?.entry?.price),'*')/recordId?.salePrice,'*')
    return <span>{editPrice&&editPrice.toFixed(2)||price.toFixed(2)}{commType==1?'%':'元'}</span>
  }

  const proportion2 = (_) =>{
      const editPrice=commType==2?amountTransform(amountTransform(recordList?.salePrice,'/')*amountTransform(recordList?.retailSupplyPrice,'/'),'/'):
                                  amountTransform(recordList?.retailSupplyPrice/recordList?.salePrice,'*') 
      const price=commType==2?amountTransform(amountTransform(recordId?.salePrice,'/')*amountTransform(recordId?.retailSupplyPrice,'/'),'/'):
                              amountTransform(recordId?.retailSupplyPrice/recordId?.salePrice,'*')
    return <span>{editPrice&&editPrice.toFixed(2)||price.toFixed(2)}{commType==1?'%':'元'}</span>
  }

  const proportion3 = (val) =>{
    const editPrice=commType==2?amountTransform(recordList?.salePrice,'/')*amountTransform(parseInt(val),'/'):
                                amountTransform(amountTransform(parseInt(val),'*')/recordList?.salePrice,'*')
    const price=commType==2?amountTransform(recordId?.salePrice,'/')*amountTransform(parseInt(val),'/'):
                            amountTransform(amountTransform(parseInt(val),'*')/recordId?.salePrice,'*')
  return <span>{editPrice&&editPrice.toFixed(2)||price.toFixed(2)}{commType==1?'%':'元'}</span>
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
          render: (_, data) => {
            return <p>
              {_}
              {data?.id<3||data?.id==8&&<Tooltip placement="top" title={data?.tip}>
                            <QuestionCircleOutlined style={{ marginLeft: 4 }} />
                          </Tooltip>
              }
            </p>
          }
        }
      ]
    },
    {
      title: '参与商品或费用和对应金额',
      align: 'center',
      hideInSearch: true,
      children: [
        {
          title: <ProForm
          form={form2}
          submitter={false}
         >
            <Form.Item
              name="name"
            >
              <CusAutoComplete
                placeholder="输入商品名称或skuID搜索"
                options={userList?.map(item => ({ label: `skuID：${item.skuId} ${item.goodsName} 售价： ${amountTransform(item.salePrice, '/').toFixed(2)}元`, value: item.skuId }))}
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
                  {recordId?amountTransform(recordId?.retailSupplyPrice, '/').toFixed(2):amountTransform(recordList?.retailSupplyPrice, '/').toFixed(2)}
                  {commType==1?'元':'%'}
                  <span style={{marginLeft:'415px'}}>= {proportion2(_)} </span>
                </p>
                <p style={{ color: '#F88000' }}>（取供应商提供的零售供货价，非实物商品时固定为0）</p>
              </>
            } else if (_?.entry?.id == 7) {
              return <FromWrap
                      content={(value, onChange) =>  <InputNumber  
                        min="0"
                        max={amountTransform(recordList?.salePrice,'/')||amountTransform(recordId?.salePrice,'/')}
                        style={{ width: '450px' }} 
                        precision='2'
                        stringMode
                        addonAfter={commType==1?'元':'%'} 
                        placeholder='请输此行角色的结算金额，0.00至新集约价。总结算金额<新集约价' 
                        value={value} 
                        onChange={onChange}
                      />}
                      right={(value) => {
                        return <span>= {proportion(_)} </span>
                      }}
                      bottom={(value)=>{
                          const editPrice=commType==2?amountTransform(recordList?.salePrice,'/')*amountTransform(parseInt(value),'/'):
                                                      amountTransform(amountTransform(value,'*')/recordList?.salePrice,'*')
                          const price=commType==2?amountTransform(recordId?.salePrice/amountTransform(value,'*'),'*'):
                                                  amountTransform(amountTransform(value,'*')/recordId?.salePrice,'*')
                            if(commType==2&&value&&parseFloat(value)<5&&_?.entry?.id==7){
                              return <p style={{color:'red'}}>设置的运营成本低于商品集约价的5%！请谨慎操作</p>
                            }else if(commType==1&&editPrice&&editPrice<5||commType==1&&price&&price<5&&_?.entry?.id==7){
                              return <p style={{color:'red'}}>设置的运营成本低于商品集约价的5%！请谨慎操作</p>
                            }
                      }}
                    />
            } else if (_?.entry?.id == 8) {
              return <>
                <p>{compute()}{commType==1?'元':'%'}  <span style={{marginLeft:'415px'}}>= {proportion3(compute())} </span></p>
                <p style={{ color: '#F88000' }}>= 新集约价 - 前各项金额之和(随前各项数据即时更新)</p>
              </>
            }
            return <FromWrap
                    content={(value, onChange) =>   <InputNumber  
                      min="0"
                      max={amountTransform(recordList?.salePrice,'/')||amountTransform(recordId?.salePrice,'/')}
                      style={{ width: '450px' }} 
                      precision='2'
                      stringMode
                      addonAfter={commType==1?'元':'%'} 
                      placeholder='请输此行角色的结算金额，0.00至新集约价。总结算金额<新集约价' 
                      value={value} 
                      onChange={onChange}
                    />}
                    right={(value) => {
                      return <span>= {proportion(_)} </span>
                    }}
                    bottom={(value)=>{
                      const editPrice=commType==2?amountTransform(recordList?.salePrice,'/')*amountTransform(parseInt(value),'/'):
                                  amountTransform(amountTransform(parseInt(value),'*')/recordList?.salePrice,'*')
                      const price=commType==2?amountTransform(recordId?.salePrice,'/')*amountTransform(parseInt(value),'/'):
                              amountTransform(amountTransform(parseInt(value),'*')/recordId?.salePrice,'*')
                          if(commType==2&&parseFloat(value)&&parseFloat(value)>5&&_?.entry?.id!=7){
                            return <p style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作</p>
                          }else if(commType==1&&editPrice&&editPrice>5||commType==1&&price&&price>5&&_?.entry?.id!=7){
                            return <p style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作</p>
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
                <p key='versionNo' style={{marginRight:'1000px',display:detailData?.versionNo?'block':'none'}}>当前分成版本：{detailData?.versionNo}</p>,
                <Button  type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  {detailData?.id?'保存':'提交'}
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
          onValuesChange: (record, recordList) => {
            compute()
            setDataSource(recordList)
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