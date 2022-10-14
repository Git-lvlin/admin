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
          <div>店主（下单人）开店地址所属市办事处</div>
          <div>管理佣金</div>
          </>
  },
   {
    id: 3,
    name:<>
        <div>培训中心</div>
        <div>管理奖励</div>
        </>
  },
  {
    id: 4,
    name: <>
          <div>汇能科技</div>
          <div>积分/红包</div>
          </>
  },
  {
    id: 5,
    name: <>
          <div>供应商</div>
          <div>货款</div>
          </>,
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
  const [commType,setCommType] = useState(2)

  useEffect(() => {
    if (detailData?.spuId) {
      getCommissionConfigBySpuId({ spuId: detailData?.spuId, orderType: 30 }).then(res => {
        const findItem=detailData?.skuId?res.data.find(ele=>ele?.skuId==detailData?.skuId):res.data[0]
        setRecordList(findItem)
        console.log('findItem?.commissionType',findItem)
        setCommType(findItem?.commissionType)
        form.setFieldsValue({
          name: findItem?.goodsName,
          commissionType: findItem?.commissionType
        })
        if(findItem){
          const data = [
            {
              id: 1,
              name: <>
                    <div>直推人（必须是VIP店主）</div>
                    <div>直推收益</div>
                    </>,
              price: amountTransform(findItem?.shoppervipChargeFee, '/')
            },
            {
              id: 2,
              name: <>
                    <div>店主（下单人）开店地址所属市办事处</div>
                    <div>管理佣金</div>
                    </>,
              price: amountTransform(findItem?.cityManageFee, '/')
            },
             {
              id: 3,
              name:<>
                  <div>培训中心</div>
                  <div>管理奖励</div>
                  </>,
              price: amountTransform(findItem?.trainCenterManageFee, '/')
            },
            {
              id: 4,
              name: <>
                    <div>汇能科技</div>
                    <div>积分/红包</div>
                    </>,
              price: amountTransform(findItem?.serviceFee, '/')
            },
            {
              id: 5,
              name: <>
                    <div>供应商</div>
                    <div>货款</div>
                    </>,
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
              name:'汇能'
            },
          ]
          setEditableRowKeys(data?.map(item => item.id))
          setDataSource(data)
        }
      })
    }
  }, [])

  const submit = (values) => {
    if(compute()<0){
      return message.error('平台金额为负！')
    }
    try {
      console.log('dataSource',dataSource)
      const params = {
        orderType: 30,
        id: recordList?.id ? recordList?.id : 0,
        spuId: recordList?.spuId,
        skuId: recordList?.skuId,
        cityManageFee: amountTransform(dataSource[0]?.price, '*'),
        shoppervipChargeFee: amountTransform(dataSource[1]?.price, '*'),
        provinceManageFee: 0,
        shopperChargeFee: 0,
        userChargeFee: 0,
        shopperManageFee: 0,
        userManageFee: 0,
        shoppervipManageFee: 0,
        trainCenterManageFee:amountTransform(dataSource[2]?.price, '*'),
        serviceFee: amountTransform(dataSource[3]?.price, '*'),
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
    productList({}).then(res => {
      setUserList(res.data)
    })
  }, [])
  const compute = () => {
    let sum = 0
    for (let index = 0; index < 6; index++) {
      if (dataSource[index]?.price) {
        sum = sum + parseFloat(dataSource[index]?.price)
      }
    }
    const company=amountTransform(recordList?.salePrice - amountTransform(sum, '*')-recordList?.retailSupplyPrice, '/').toFixed(2)
    return company
  }

  const proportion = (_) =>{
    if(commType==2){
      const editPrice=amountTransform(recordList?.salePrice/amountTransform(_?.entry?.price,'*'),'*')
    }
    const editPrice=amountTransform(amountTransform(_?.entry?.price,'*')/recordList?.salePrice,'*')
    return <span>{editPrice&&parseFloat(editPrice).toFixed(2)}{commType==1?'%':'元'}</span>
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
              <span>skuID:{recordList?.skuId}  新集约价:￥{amountTransform(recordList?.salePrice, '/')}</span>
            </>,
      align: 'center',
      hideInSearch: true,
      dataIndex: 'price',
      renderFormItem: (_, r) => {
        if (_?.entry?.id == 5) {
          return <>
            <p>{amountTransform(recordList?.retailSupplyPrice, '/').toFixed(2)}{commType==1?'元':'%'}</p>
            <p style={{ color: '#F88000' }}>（取供应商提供的批发供货价）</p>
          </>
        } else if (_?.entry?.id == 7) {
          return <FromWrap
                  content={(value, onChange) =>  <InputNumber  
                    min="0"
                    max={amountTransform(recordList?.salePrice,'/')}
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
                    if(commType==2){
                      const editPrice=amountTransform(recordList?.salePrice/amountTransform(value,'*'),'*')
                    }
                    const editPrice=amountTransform(amountTransform(value,'*')/recordList?.salePrice,'*')
                        if(commType==1&&editPrice&&editPrice<5&&_?.entry?.id==7){
                          return <p style={{color:'red'}}>设置的运营成本低于商品集约价的5%！请谨慎操作</p>
                        }else if(commType==2&&value&&parseFloat(value)<5&&_?.entry?.id==7){
                          return <p style={{color:'red'}}>设置的运营成本低于商品集约价的5%！请谨慎操作</p>
                        }
                  }}
                />
        } else if (_?.entry?.id == 8) {
          return <>
            <p>{compute()}{commType==1?'元':'%'}</p>
            <p style={{ color: '#F88000' }}>= 新集约价 - 前各项金额之和(随前各项数据即时更新)</p>
          </>
        }
        return  <FromWrap
                  content={(value, onChange) =>   <InputNumber  
                    min="0"
                    max={amountTransform(recordList?.salePrice,'/')}
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
                    if(commType==2){
                      const editPrice=amountTransform(recordList?.salePrice/amountTransform(value,'*'),'*')
                    }
                    const editPrice=amountTransform(amountTransform(value,'*')/recordList?.salePrice,'*')
                        if(commType==1&&editPrice&&editPrice>5&&_?.entry?.id!=7){
                          return <p style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作</p>
                        }else if(commType==2&&value&&parseFloat(value)>5&&_?.entry?.id!=7){
                          return <p style={{color:'red'}}>设置的分佣/奖励成本高于商品集约价的5%！请谨慎操作</p>
                        }
                  }}
                />   
    
      }
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
                <p key='versionNo' style={{marginRight:'1000px'}}>当前分成版本：{recordList?.versionNo}</p>,
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
      <p style={{paddingLeft:'20px'}}>[spuID:{detailData?.spuId}] {detailData?.goodsName}</p>
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
          onValuesChange: (record, recordList) => {
            compute()
            setDataSource(recordList)
          }
        }}
        recordCreatorProps={false}
      />
      <p style={{ color: '#F88000',float:'right' }}>运营成本建议不低于商品新集约价5%，其他各输入项建议不得高于商品新集约价5%</p>
    </DrawerForm>
  );
};