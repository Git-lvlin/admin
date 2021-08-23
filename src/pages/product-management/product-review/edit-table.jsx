import React, { useState, useEffect, useMemo } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form } from 'antd';
import Upload from '@/components/upload';
import styles from './edit-table.less';
import debounce from 'lodash/debounce';
import * as api from '@/services/product-management/product-list';
import { amountTransform } from '@/utils/utils'

export default function EditTable(props) {
  const { tableHead, tableData, setTableData, settleType, goodsSaleType } = props;
  const [columns, setColumns] = useState([])
  const [editableKeys, setEditableKeys] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const arr = [];
    tableHead.forEach((item, index) => {
      if (item) {
        arr.push({
          title: item,
          dataIndex: `spec${index + 1}`,
          editable: false,
          width: 130,
        })
      }
    });

    setColumns([
      {
        title: '规格图片',
        dataIndex: 'imageUrl',
        width: 80,
        editable: false,
        render: (_) => _ ? <img src={_} width="50" height="50" /> : '',

      },
      ...arr,
      {
        title: '零售供货价(元)',
        dataIndex: 'retailSupplyPrice',
        editable: false,
        hideInTable: goodsSaleType === 1,
        width: 130,
      },
      {
        title: '批发供货价(元)',
        dataIndex: 'wholesaleSupplyPrice',
        editable: false,
        width: 130,
        hideInTable: goodsSaleType === 2,
      },
      {
        title: '最低批发量',
        dataIndex: 'wholesaleMinNum',
        editable: false,
        width: 130,
        hideInTable: goodsSaleType === 2,
      },
      
      {
        title: '库存预警值',
        dataIndex: 'stockAlarmNum',
        width: 90,
        editable: false,
      },
      {
        title: '可用库存',
        dataIndex: 'stockNum',
        width: 90,
        editable: false,
      },

      // {
      //   title: '操作',
      //   valueType: 'option',
      //   render: () => {
      //     return null;
      //   },
      //   width: 50
      // },
    ])

  }, [tableHead, settleType])

  useEffect(() => {
    setDataSource(tableData);
  }, [tableData])

  return (
    <EditableProTable
      columns={columns}
      rowKey="key"
      value={dataSource}
      scroll={{ x: '70vw' }}
      controlled
      editable={{
        editableKeys,
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
          // setDataSource(recordList);
          // setTableData(recordList)
          debounceFetcher({ record, recordList })
        }
      }}
      bordered
      recordCreatorProps={false}
      style={{ marginBottom: 20 }}
    />
  )
}
