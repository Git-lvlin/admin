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
import AddRoleModal from './add-role-modal'
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import { amountTransform } from '@/utils/utils'

const formItemLayout = {
  labelCol: { span: 6 },
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
    name: '省办事处-管理奖',
    tip: '销售订单按订单收货地址判断业绩归属。（线下结算，下单后修改收货地址，依然按下单时的地址判断业绩归属）',
  },
  {
    id: 2,
    name: '社区店主-服务佣金(直)',
    tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
  },
  {
    id: 3,
    name: '用户-服务佣金(直)',
    tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
  },
  {
    id: 4,
    name: '社区店主-管理佣金(间)',
    tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
  },
  {
    id: 5,
    name: '用户-管理佣金(间)',
    tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
  },
  {
    id: 6,
    name: 'VIP店主-服务佣金(直)',
    tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
  },
  {
    id: 7,
    name: 'VIP店主-管理佣金(间)',
    tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
  },
  {
    id: 8,
    name: '供应商-货款',
    tip: '销售订单承担通道费',
  },
  // {
  //   id: 9,
  //   name: '运营中心',
  //   tip: '线上记账线下结算,不承担通道费 销售订单：下单人为普通用户，则运营中心无收益，如下单人为店主，则业绩归属于下单店主绑定的运营中心',
  // },
  {
    id: 9,
    name: '省代',
    tip: '线下结算 销售订单按订单收货地址判断业绩归属',
  },
  {
    id: 10,
    name: '市代',
    tip: '线下结算 销售订单按订单收货地址判断业绩归属',
  },
  {
    id: 11,
    name: '全国分红奖',
    tip: '线下结算 每月统计全国各省市的总共业绩（含租赁+销售）前三名',
  },
  {
    id: 12,
    name: '汇能科技',
    tip: '没有对应角色的分成归此处,线下结算的角色资金先分账到平台',
  }
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
  const [sum, setSum] = useState(11)
  const [userList, setUserList] = useState([])
  const [recordList, setRecordList] = useState([])
  const [recordId, setRecordId] = useState()
  const actionRef = useRef();

  useEffect(() => {
    if (detailData?.spuId) {
      getCommissionConfigBySpuId({ spuId: detailData?.spuId }).then(res => {
        const findItem=res.data.find(ele=>ele?.skuId==recordId?.skuId)||res.data.find(ele=>ele?.skuId==detailData?.skuId)
        setRecordList(findItem)
        form.setFieldsValue({
          name: findItem?.goodsName
        })
        if(findItem){
          const data = [
            {
              id: 1,
              name: '省办事处-管理奖',
              tip: '销售订单按订单收货地址判断业绩归属。（线下结算，下单后修改收货地址，依然按下单时的地址判断业绩归属）',
              price: amountTransform(findItem?.provinceManageFee, '/')
            },
            {
              id: 2,
              name: '社区店主-服务佣金(直)',
              tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
              price: amountTransform(findItem?.shopperChargeFee, '/')
            },
            {
              id: 3,
              name: '用户-服务佣金(直)',
              tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
              price: amountTransform(findItem?.userChargeFee, '/')
            },
            {
              id: 4,
              name: '社区店主-管理佣金(间)',
              tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
              price: amountTransform(findItem?.shopperManageFee, '/')
            },
            {
              id: 5,
              name: '用户-管理佣金(间)',
              tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
              price: amountTransform(findItem?.userManageFee, '/')
            },
            {
              id: 6,
              name: 'VIP店主-服务佣金(直)',
              tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
              price: amountTransform(findItem?.shoppervipChargeFee, '/')
            },
            {
              id: 7,
              name: 'VIP店主-管理佣金(间)',
              tip: '无相关角色，分成归属平台 提现时扣除7%手续费和2元/笔，不承担通道费',
              price: amountTransform(findItem?.shoppervipManageFee, '/')
            },
            {
              id: 8,
              name: '供应商-货款',
              tip: '销售订单承担通道费',
            },
            // {
            //   id: 9,
            //   name: '运营中心',
            //   tip: '线上记账线下结算,不承担通道费 销售订单：下单人为普通用户，则运营中心无收益，如下单人为店主，则业绩归属于下单店主绑定的运营中心',
            //   price: amountTransform(findItem?.companyAgent, '/')
            // },
            {
              id: 9,
              name: '省代',
              tip: '线下结算 销售订单按订单收货地址判断业绩归属',
              price: amountTransform(findItem?.provinceAgent, '/')
            },
            {
              id: 10,
              name: '市代',
              tip: '线下结算 销售订单按订单收货地址判断业绩归属',
              price: amountTransform(findItem?.cityAgent, '/')
            },
            {
              id: 11,
              name: '全国分红奖',
              tip: '线下结算 每月统计全国各省市的总共业绩（含租赁+销售）前三名',
              price: amountTransform(findItem?.dividends, '/')
            },
            {
              id: 12,
              name: '汇能科技',
              tip: '没有对应角色的分成归此处,线下结算的角色资金先分账到平台',
            },
            ...findItem?.extData?.map(ele => ({ id: ele.code, name: ele.name, price: amountTransform(ele?.commission, '/') }))
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
      id: recordList?.id ? recordList?.id : 0,
      spuId: recordList?.id ? recordList?.spuId : recordId?.spuId,
      skuId: recordList?.id ? recordList?.skuId : recordId?.skuId,
      provinceManageFee: amountTransform(dataSource[0].price, '*'),
      shopperChargeFee: amountTransform(dataSource[1].price, '*'),
      userChargeFee: amountTransform(dataSource[2].price, '*'),
      shopperManageFee: amountTransform(dataSource[3].price, '*'),
      userManageFee: amountTransform(dataSource[4].price, '*'),
      shoppervipChargeFee: amountTransform(dataSource[5].price, '*'),
      shoppervipManageFee: amountTransform(dataSource[6].price, '*'),
      // companyAgent: amountTransform(dataSource[8].price, '*'),
      companyAgent: 0,
      provinceAgent: amountTransform(dataSource[8].price, '*'),
      cityAgent: amountTransform(dataSource[9].price, '*'),
      dividends: amountTransform(dataSource[10].price, '*'),
      company: amountTransform(compute(), '*'),
      extData: dataSource.filter(ele => ele.id > 12).map(ele => ({ code: ele.id, name: ele.name, commission: amountTransform(ele.price, '*') }))
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
    for (let index = 0; index < dataSource?.length; index++) {
      if (dataSource[index]?.price && dataSource?.length <= 12) {
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
      title: '参与商品和对应金额',
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
            if (_?.entry?.id == 8) {
              return <>
                <p>{recordId?amountTransform(recordId?.retailSupplyPrice, '/').toFixed(2):amountTransform(recordList?.retailSupplyPrice, '/').toFixed(2)}元</p>
                <p style={{ color: '#F88000' }}>（取供应商提供的零售供货价）</p>
              </>
            } else if (_?.entry?.id == 12) {
              return <>
                <p>{compute()}元</p>
                <p style={{ color: '#F88000' }}>= 售价  -  前11项之和（随前11项数据即时更新）</p>
              </>
            }
            return <InputNumber  
                      min="0"
                      max={amountTransform(recordList?.salePrice,'/')||amountTransform(recordId?.salePrice,'/')}
                      style={{ width: '450px' }} 
                      precision='2'
                      stringMode
                      addonAfter='元' 
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
        searchConfig: {
          resetText: '',
          submitText: detailData?.id?'保存':'提交'
        }
      }}
      onFinish={async (values) => {
        await submit(values);
      }}
      visible={visible}
      {...formItemLayout}
    >
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
      {/* <Button
        onClick={() => {
          setRoleVisible(true)
          setSum(sum + 1)
        }}
        style={{ width: '1100px', marginLeft: '20px', border: '1px dashed #B4B0B0' }}
        icon={<PlusOutlined />}
      >
        添加
      </Button> */}
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