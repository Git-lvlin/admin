import React, { useState, useRef, useMemo } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form, Tooltip, Input, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import Big from 'big.js';
import { amountTransform } from '@/utils/utils'
import debounce from 'lodash/debounce';


export default function EditTable({ onSelect }) {
  const [editableKeys, setEditableKeys] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectData, setSelectData] = useState([]);
  const [form] = Form.useForm();

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
      hideInTable: true
    },
    {
      dataIndex: 'skuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品skuID',
        maxLength: 30,
      },
      hideInTable: true
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
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      hideInSearch: true,
      editable: false
    },
    {
      title: '商品分类',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      render: (_, data) => `${data.gcId1Display}-${data.gcId2Display}`
    },
    {
      title: '主图',
      dataIndex: 'imageUrl',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      render: (text) => <img src={text} width={50} height={50} />
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '批发供货价(元)',
      dataIndex: 'wholesaleSupplyPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false
    },
    {
      title: '市场价(元)',
      dataIndex: 'marketPriceDisplay',
      valueType: 'text',
      hideInSearch: true,
      editable: false
    },
    {
      title: '平均运费(元)',
      dataIndex: 'wholesaleFreight',
      valueType: 'text',
      hideInSearch: true,
      editable: false
    },
    {
      title: '总库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
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
    },
    {
      title: '售价上浮比(%)',
      dataIndex: 'settlePercent',
      valueType: 'text',
      hideInSearch: true,
      renderFormItem: () => <Input addonAfter="%" />
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
    },
    {
      title: '实际盈亏(元)',
      dataIndex: 'profit',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '配送费补贴(元)',
      dataIndex: 'fixedPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
    },
    {
      title: '单次起订量',
      dataIndex: 'minNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '单次限订量',
      dataIndex: 'maxNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '全款金额',
      dataIndex: 'totalPrice',
      valueType: 'text',
      hideInSearch: true,
      editable: false,
      render: (_) => <span style={{ color: 'red' }}>{_}</span>
    },
  ]

  const postData = (data) => {
    setEditableKeys(data.map(item => item.id));
    const arr = data.map(item => ({
      ...item,
      totalStockNum: parseInt(item.stockNum * 0.8, 10),
      minNum: item.wholesaleMinNum || 10,
      maxNum: 100,
      price: amountTransform(item.price, '/'),
      fixedPrice: amountTransform(item.fixedPrice, '/'),
      settlePercent: amountTransform(item.settlePercent),
      wholesaleFreight: amountTransform(item.wholesaleFreight, '/'),
      wholesaleSupplyPrice: amountTransform(item.wholesaleSupplyPrice, '/'),
      profit: amountTransform(item.profit, '/'),
      totalPrice: item.salePrice > 0 ? +new Big(item.price).div(100).times(item.wholesaleMinNum || 10) : 0,
    }))
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
        isGetWholesale: 1,
        priceScale: amountTransform(record.settlePercent, '/'),
        price: amountTransform(record.price)
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
              settlePercent: amountTransform(skuData.settlePercent),
              price: amountTransform(skuData.price, '/'),
              profit: amountTransform(skuData.profit, '/'),
              totalPrice: (skuData.price > 0 && item.maxNum > 0) ? +new Big(amountTransform(skuData.price, '/')).times(item.minNum) : 0
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
        console.log('getList(selectData, skuData, (arr) => { setSelectData(arr)})', getList(selectData, skuData, (arr) => { setSelectData(arr) }));
        onSelect(getList(selectData, skuData, (arr) => { setSelectData(arr)}))
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
      scroll={{ x: '120vw' }}
      controlled
      request={productList}
      search={{
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
        ],
      }}
      editable={{
        // form,
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
        // type: 'radio',
        selectedRowKeys,
        // onChange: (_, val) => {
        //   console.log('_', _);
        //   onSelect(val)
        //   setSelectedRowKeys(val.map(item => item.skuId))
        // },
        onSelect: (record, selected) => {
          if (selected) {
            if (selectedRowKeys.length === 10) {
              message.error('最多只能选择10个商品');
              return;
            }
            const arr = [...selectedRowKeys];
            arr.push(record.skuId);
            setSelectedRowKeys(arr);
            const datas = [...selectData];
            datas.push(record);
            setSelectData(datas);
            onSelect(datas);
          } else {
            const arr = selectedRowKeys.filter(item => item !== record.skuId)
            setSelectedRowKeys(arr);
            const datas = selectData.filter(item => item.skuId !== record.skuId);
            setSelectData(datas);
            onSelect(datas);
          }
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
