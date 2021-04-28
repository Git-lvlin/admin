import React, { useState, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form } from 'antd';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'

export default function EditTable(props) {
  const [editableKeys, setEditableKeys] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  const columns = [
    {
      dataIndex: 'retailSupplyPrice',
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
    {
      dataIndex: 'retailSupplyPrice',
      valueType: 'select',
      fieldProps: {
        placeholder: '请选择商品所属供应商类型'
      },
      valueEnum: {
        0: '全部',
        1: '佣金模式',
        2: '底价模式'
      },
      hideInTable: true
    },
    {
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商名称',
        maxLength: 30,
      },
      hideInTable: true
    },
    {
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品spuID',
        maxLength: 30,
      },
      hideInTable: true
    },
    {
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入商品skuID',
        maxLength: 30,
      },
      hideInTable: true
    },
    {
      dataIndex: 'gcId',
      renderFormItem: () => (<GcCascader />),
      hideInTable: true,
    },
    {
      dataIndex: 'brandId',
      renderFormItem: () => (<BrandSelect />),
      hideInTable: true,
    },
    {
      title: 'spuID',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: 'skuID',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '商品分类',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '主图',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '所属供应商名称',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '销售价',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '市场价',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '总库存',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '结算类型',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '集约总库存',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '限售起售量',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '集约价',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '单店集约量',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '全款金额',
      dataIndex: 'retailSupplyPrice',
      valueType: 'text',
      hideInSearch: true
    },
  ]

  return (
    <EditableProTable
      columns={columns}
      rowKey="key"
      value={dataSource}
      search={{
        defaultCollapsed: false,
        optionRender: (searchConfig, formProps, dom) => [
          ...dom.reverse(),
        ],
      }}
      editable={{
        form,
        editableKeys,
        // actionRender: (row, config, defaultDoms) => {
        //   return [defaultDoms.delete];
        // },
        // onValuesChange: (record, recordList) => {
        //   setDataSource(recordList);
        //   setTableData(recordList)
        // }
      }}
      owSelection={{
        hideSelectAll: true,
        type: 'radio'
      }}
      bordered
      recordCreatorProps={false}
      style={{ marginBottom: 20, width: '100%' }}
    />
  )
}
