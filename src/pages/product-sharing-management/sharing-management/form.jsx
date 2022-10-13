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
    name: '供应商-货款',
    tip: '销售订单承担通道费',
  },
  // {
  //   id: 4,
  //   name: '培训中心',
  //   tip: '管理奖励',
  //   price: amountTransform(findItem?.shopperManageFee, '/')
  // },
  // {
  //   id: 5,
  //   name: '汇能科技',
  //   tip: '积分/红包',
  //   price: amountTransform(findItem?.company, '/')
  // },
  // {
  //   id: 6,
  //   name: '运营中心',
  //   tip: '服务费佣金',
  //   price: amountTransform(findItem?.company, '/')
  // },
  // {
  //   id: 7,
  //   name: '汇能',
  //   tip: '平台运营成本',
  //   price: amountTransform(findItem?.company, '/')
  // },
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
      productList({ skuId: e }).then(res => {
        setUserList(res.data)
      })
    } else {
      productList({ goodsName: e }).then(res => {
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
  const [editableKeys, setEditableRowKeys] = useState(()=>bloodData?.map(item => item.id));
  const [dataSource, setDataSource] = useState(()=>bloodData);
  const [roleVisible, setRoleVisible] = useState();
  // const [sum, setSum] = useState(12)
  const [userList, setUserList] = useState([])
  const [recordList, setRecordList] = useState([])
  const [recordId, setRecordId] = useState()
  const actionRef = useRef();
  const [submitType,setSubmitType] = useState()
  const [commissionType,setCommissionType] = useState(1)

  useEffect(() => {
    if (detailData?.spuId) {
      getCommissionConfigBySpuId({ spuId: detailData?.spuId, orderType: 30 }).then(res => {
        const findItem=res.data.find(ele=>ele?.skuId==recordId?.skuId)||res.data.find(ele=>ele?.skuId==detailData?.skuId)
        setRecordList(findItem)
        form.setFieldsValue({
          name: findItem?.goodsName,
          commissionType: findItem?.commissionType
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
              name: '供应商-货款',
              tip: '销售订单承担通道费',
            },
            // {
            //   id: 4,
            //   name: '培训中心',
            //   tip: '管理奖励',
            //   price: amountTransform(findItem?.shopperManageFee, '/')
            // },
            // {
            //   id: 5,
            //   name: '汇能科技',
            //   tip: '积分/红包',
            //   price: amountTransform(findItem?.company, '/')
            // },
            // {
            //   id: 6,
            //   name: '运营中心',
            //   tip: '服务费佣金',
            //   price: amountTransform(findItem?.company, '/')
            // },
            // {
            //   id: 7,
            //   name: '汇能',
            //   tip: '平台运营成本',
            //   price: amountTransform(findItem?.company, '/')
            // },
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
    if(compute()<0){
      return message.error('平台金额为负！')
    }
    const params = {
      orderType: 30,
      id: recordList?.id ? recordList?.id : 0,
      spuId: recordList?.id ? recordList?.spuId : recordId?.spuId,
      skuId: recordList?.id ? recordList?.skuId : recordId?.skuId,
      cityManageFee: amountTransform(dataSource[0].price, '*'),
      shoppervipChargeFee: amountTransform(dataSource[1].price, '*'),
      provinceManageFee: 0,
      shopperChargeFee: 0,
      userChargeFee: 0,
      shopperManageFee: 0,
      userManageFee: 0,
      shoppervipManageFee: 0,
      companyAgent: 0,
      provinceAgent: 0,
      cityAgent: 0,
      dividends: 0,
      platformOperateFee: 0,
      serviceFee: 0,
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
  }
  useEffect(() => {
    productList({}).then(res => {
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
              <Tooltip placement="top" title={data?.tip}>
                <QuestionCircleOutlined style={{ marginLeft: 4 }} />
              </Tooltip>
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
          form={form}
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
                <p>{recordId?amountTransform(recordId?.retailSupplyPrice, '/').toFixed(2):amountTransform(recordList?.retailSupplyPrice, '/').toFixed(2)}{commissionType==1?'元':'%'}</p>
                <p style={{ color: '#F88000' }}>（取供应商提供的零售供货价，非实物商品时固定为0）</p>
              </>
            } else if (_?.entry?.id == 8) {
              return <>
                <p>{compute()}{commissionType==1?'元':'%'}</p>
                <p style={{ color: '#F88000' }}>= 新集约价 - 前各项金额之和(随前各项数据即时更新)</p>
              </>
            }
            return  <InputNumber  
                      min="0"
                      max={amountTransform(recordList?.salePrice,'/')||amountTransform(recordId?.salePrice,'/')}
                      style={{ width: '450px' }} 
                      precision='2'
                      stringMode
                      addonAfter={commissionType==1?'元':'%'} 
                      placeholder='请输此行角色的结算金额，0.00至售价。总结算金额<售价' 
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
        width: 1200,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
            return [
                <p key='versionNo' style={{marginRight:'900px'}}>当前分成版本：{detailData?.versionNo}</p>,
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
            setCommissionType(_.target.value)
          }
        }}
        initialValue={1}
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
      {roleVisible &&
        <AddRoleModal
          visible={roleVisible}
          setVisible={setRoleVisible}
          callback={(val) => {
            setDataSource([...dataSource, {
              id: sum,
              price: '',
              ...val
            }])
            setEditableRowKeys([...dataSource?.map(item => item.id), sum])
          }}
        />
      }
    </DrawerForm>
  );
};