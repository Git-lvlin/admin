import React, { useState, useRef, useMemo, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form, Checkbox, Input, message, Radio } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import Big from 'big.js';
import { amountTransform } from '@/utils/utils'
import debounce from 'lodash/debounce';

const Subsidy = ({ value = {}, onChange, profit }) => {
  return (
    <>
      <div>当订单金额达到 <Input onChange={(e) => { const obj = { ...value }; obj.a = e.target.value; onChange(obj) }} value={value.a} style={{ width: 100 }} /></div>
      <div>实际盈亏为 {profit}元</div>
      <div>补贴 <Input onChange={(e) => { const obj = { ...value }; obj.b = e.target.value; onChange(obj) }} value={value.b} style={{ width: 100 }} /></div>
    </>
  )
}


export default function EditTable({ onSelect, sku, wholesaleFlowType }) {
  const [editableKeys, setEditableKeys] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectData, setSelectData] = useState([]);
  // const [isFirst, setIsFirst] = useState(true);
  const isFirst = useRef(true);
  const formRef = useRef();

  const columns = [
    {
      dataIndex: 'goodsName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品名称',
        maxLength: 50,
      },
      hideInTable: true
    },
    {
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品关键字',
        maxLength: 30,
      },
      hideInTable: true
    },
    // {
    //   dataIndex: 'retailSupplyPrice',
    //   valueType: 'select',
    //   fieldProps: {
    //     placeholder: '请选择商品所属供应商家类型'
    //   },
    //   valueEnum: {
    //     0: '全部',
    //     1: '佣金模式',
    //     2: '底价模式'
    //   },
    //   hideInTable: true
    // },
    {
      dataIndex: 'supplierId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商家ID',
        maxLength: 30,
      },
      hideInTable: true
    },
    {
      dataIndex: 'spuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品spuID',
        maxLength: 30,
      },
      hideInTable: true,
    },
    {
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品skuID',
        maxLength: 30,
      },
      hideInTable: true,
      initialValue: sku?.skuId,
    },
    {
      dataIndex: 'gcId',
      renderFormItem: () => (<GcCascader placeholder="请选择商品分类" />),
      hideInTable: true,
    },
    {
      dataIndex: 'brandId',
      renderFormItem: () => (<BrandSelect placeholder="请选择商品品牌" />),
      hideInTable: true,
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 80,
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 80,
    },
    {
      title: '商品分类',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      render: (_, data) => `${data.gcId1Display}-${data.gcId2Display}`,
      width: 100,
    },
    {
      title: '主图',
      dataIndex: 'imageUrl',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 80,
      render: (text) => <img src={text} width={50} height={50} />
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 100,
    },
    {
      title: '配送模式',
      dataIndex: 'wholesaleFlowType',
      hideInSearch: true,
      width: 145,
      renderFormItem: (_, { record }) => {
        return (<Radio.Group>
          <Radio value={1}>直发到店</Radio>
          <Radio value={2}>运营中心配送</Radio>
        </Radio.Group>)
      }
    },
    {
      title: '批发供货价(元)',
      dataIndex: 'wholesaleSupplyPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 120,
    },
    {
      title: '市场价(元)',
      dataIndex: 'marketPriceDisplay',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 120,
    },
    {
      title: '平均运费(元)',
      dataIndex: 'wholesaleFreight',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 120,
    },
    {
      title: '总库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 100,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 150,
    },
    // {
    //   title: '结算类型',
    //   dataIndex: 'settleType',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   editable: false,
    //   valueEnum: {
    //     1: '佣金模式',
    //     2: '底价模式'
    //   },
    // },
    {
      title: '集约总库存',
      dataIndex: 'totalStockNum',
      valueType: 'text',
      hideInSearch: true,
      width: 110,
    },
    {
      title: '售价上浮比(%)',
      dataIndex: 'settlePercent',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: () => <Input addonAfter="%" />,
      width: 110,
      // formItemProps: {
      //   rules: [
      //     {
      //       required: true,
      //       whitespace: true,
      //       message: '请输入集约分成比例',
      //     },
      //   ],
      // }
    },
    {
      title: (
        <>
          集约价
          {/* <Tooltip placement="top" title="集约价最低=(批发供货价+配送费补贴) ÷（100%-集约分成比例-0.68%）">
            <QuestionCircleOutlined style={{ marginLeft: 4 }} />
          </Tooltip> */}
        </>
      ),
      dataIndex: 'price',
      valueType: 'text',
      hideInSearch: true,
      width: 110,
    },
    {
      title: '实际盈亏(元)',
      dataIndex: 'profit',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 120,
    },
    {
      title: '是否指定配送补贴',
      dataIndex: 'isEditSubsidy',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: () => <Checkbox.Group><Checkbox value={1}>指定配送补贴</Checkbox></Checkbox.Group>,
      width: 120,
    },
    {
      title: '运营中心配送费补贴',
      dataIndex: 'operationFixedPrice',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_, { record }) => {
        if (record.isEditSubsidy.length) {
          return <Input />
        }
        return record.operationFixedPrice
      },
      width: 110,
    },
    {
      title: '社区店配送费补贴',
      dataIndex: 'fixedPrice',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: (_, { record }) => {
        if (record.isEditSubsidy.length) {
          return <Input />
        }
        return record.fixedPrice
      },
      width: 110,
    },
    {
      title: '社区店特殊补贴',
      dataIndex: 'subsidy',
      valueType: 'text',
      hideInSearch: true,
      width: 250,
      renderFormItem: (_, { record }) => {
        return <Subsidy profit={record.profit} />
      }
    },
    {
      title: '集采箱规单位量',
      dataIndex: 'batchNumber',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      width: 100,
    },
    {
      title: '单次起订量',
      dataIndex: 'minNum',
      valueType: 'text',
      hideInSearch: true,
      width: 110,
    },
    {
      title: '单次限订量',
      dataIndex: 'maxNum',
      valueType: 'text',
      hideInSearch: true,
      width: 110,
    },
    {
      title: '全款金额',
      dataIndex: 'totalPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      render: (_) => <span style={{ color: 'red' }}>{_}</span>,
      width: 100,
    },
  ]

  const postData = (data) => {
    setEditableKeys(data.map(item => item.id));
    const arr = data.map(item => ({
      ...item,
      totalStockNum: parseInt(item.stockNum * 0.8, 10),
      minNum: item.batchNumber,
      maxNum: 100,
      price: amountTransform(item.price, '/'),
      fixedPrice: amountTransform(item.fixedPrice, '/'),
      operationFixedPrice: amountTransform(item.operationFixedPrice, '/'),
      settlePercent: amountTransform(item.settlePercent),
      wholesaleFreight: amountTransform(item.wholesaleFreight, '/'),
      wholesaleSupplyPrice: amountTransform(item.wholesaleSupplyPrice, '/'),
      profit: amountTransform(item.profit, '/'),
      totalPrice: item.salePrice > 0 ? +new Big(item.price).div(100).times(item.wholesaleMinNum || 10) : 0,
      wholesaleFlowType: 1,
      isEditSubsidy: [1],
      subsidy: {
        a: item.orderAmount > 0 ? amountTransform(item.orderAmount, '/') : '',
        b: item.subsidy > 0 ? amountTransform(item.subsidy, '/') : '',
      }
    }))

    if (isFirst.current && sku) {
      arr[0] = {
        ...arr[0],
        minNum: sku.minNum,
        maxNum: sku.maxNum,
        totalStockNum: sku.totalStockNum,
        price: amountTransform(sku.price, '/'),
        fixedPrice: amountTransform(sku.fixedPrice, '/'),
        operationFixedPrice: amountTransform(sku.operationFixedPrice, '/'),
        settlePercent: amountTransform(sku.settlePercent),
        wholesaleSupplyPrice: amountTransform(sku.wholesaleSupplyPrice, '/'),
        profit: amountTransform(sku.profit, '/'),
        totalPrice: sku.salePrice > 0 ? +new Big(sku.price).div(100).times(sku.minNum || 10) : 0,
        wholesaleFlowType,
        isEditSubsidy: sku.isEditSubsidy === 0 ? [] : [1],
        subsidy: {
          a: sku.orderAmount > 0 ? amountTransform(sku.orderAmount, '/') : '',
          b: sku.subsidy > 0 ? amountTransform(sku.subsidy, '/') : '',
        }
      }
      setSelectedRowKeys([sku.skuId])
      setSelectData(arr);
      onSelect(arr);
      formRef.current.setFieldsValue({
        skuId: '',
      })
    } else {
      setSelectedRowKeys([])
      setSelectData([]);
      onSelect([]);
    }
    isFirst.current = false;
    setDataSource(arr)
    // return arr;
  }

  const debounceFetcher = useMemo(() => {
    const loadData = (value) => {
      const { recordList, record } = value;
      const findItem = dataSource.find(item => item.id === record.id);
      const obj = {
        skuId: record.skuId,
        fixedPrice: amountTransform(record.fixedPrice),
        operationFixedPrice: amountTransform(record.operationFixedPrice),
        isGetWholesale: 1,
        priceScale: amountTransform(record.settlePercent, '/'),
        price: amountTransform(record.price),
      }

      if (record.subsidy.a && record.subsidy.b) {
        obj.orderAmount = record.subsidy.a ? amountTransform(record.subsidy.a) : '';
        obj.subsidy = record.subsidy.b ? amountTransform(record.subsidy.b) : '';
      }

      if (findItem.price !== record.price) {
        obj.price = amountTransform(record.price);
        obj.priceScale = -1;
      }

      if (findItem.settlePercent !== record.settlePercent) {
        obj.priceScale = amountTransform(record.settlePercent, '/');
        delete obj.price;
      }

      const getList = (list, skuData, cb) => {
        const arr = list.map(item => {
          if (item.id === skuData.id) {
            const data = {
              ...record,
              fixedPrice: amountTransform(skuData.fixedPrice, '/'),
              operationFixedPrice: amountTransform(skuData.operationFixedPrice, '/'),
              settlePercent: amountTransform(skuData.settlePercent),
              price: amountTransform(skuData.price, '/'),
              profit: amountTransform(skuData.profit, '/'),
              totalPrice: (skuData.price > 0 && record.maxNum > 0) ? +new Big(amountTransform(skuData.price, '/')).times(record.minNum) : 0
            }
            return data
          }
          return item
        })
        if (cb) {
          cb(arr);
        }
        return arr;
      }

      productList(obj).then(res => {
        const skuData = res.data[0];
        onSelect(getList(selectData, skuData, (arr) => { setSelectData(arr) }))
        setDataSource(getList(recordList, skuData))
      })
    };

    return debounce(loadData, 1000);
  }, [dataSource, selectData, onSelect]);

  return (
    <EditableProTable
      postData={postData}
      columns={columns}
      rowKey="skuId"
      value={dataSource}
      params={{
        goodsState: 1,
        goodsVerifyState: 1,
        hasStock: 1,
        isGetWholesale: 1,
      }}
      scroll={{ x: '130vw' }}
      controlled
      request={productList}
      formRef={formRef}
      search={{
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
        ],
      }}
      editable={{
        editableKeys,
        onValuesChange: (record, recordList) => {
          debounceFetcher({ record, recordList })
        }
      }}
      pagination={{
        pageSize: 5,
        pageSizeOptions: [5, 10, 20, 50, 100]
      }}

      rowSelection={{
        hideSelectAll: true,
        type: 'radio',
        selectedRowKeys,
        // onChange: (_, val) => {
        //   console.log('_', _);
        //   onSelect(val)
        //   setSelectedRowKeys(val.map(item => item.skuId))
        // },
        onSelect: (record, selected) => {
          // if (selected) {
          //   if (selectedRowKeys.length === 10) {
          //     message.error('最多只能选择10个商品');
          //     return;
          //   }
          //   const arr = [...selectedRowKeys];
          //   arr.push(record.skuId);
          //   setSelectedRowKeys(arr);
          //   const datas = [...selectData];
          //   datas.push(record);
          //   setSelectData(datas);
          //   onSelect(datas);
          // } else {
          //   const arr = selectedRowKeys.filter(item => item !== record.skuId)
          //   setSelectedRowKeys(arr);
          //   const datas = selectData.filter(item => item.skuId !== record.skuId);
          //   setSelectData(datas);
          //   onSelect(datas);
          // }
          setSelectedRowKeys([record.skuId])
          setSelectData([record]);
          onSelect([record]);
        },
        fixed: true
      }}
      bordered
      recordCreatorProps={false}
      tableAlertRender={false}
      style={{ marginBottom: 20, width: '100%' }}
    />
  )
}
