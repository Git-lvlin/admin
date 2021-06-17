import React, { useState, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form } from 'antd';
import Upload from '@/components/upload';
import styles from './edit-table.less';

export default function EditTable(props) {
  const { tableHead, tableData, setTableData, settleType } = props;
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
        })
      }
    });

    setColumns([
      {
        title: '规格图片',
        dataIndex: 'imageUrl',
        width: 50,
        editable: false,
        render: (_) => _ ? <img src={_} width="50" height="50" /> : '',

      },
      ...arr,
      {
        title: '供货价',
        dataIndex: 'retailSupplyPrice',
        editable: false,
      },
      {
        title: '秒约价',
        dataIndex: 'salePrice',
        width: 150,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入秒约价',
          }],
        },
        editable: settleType !== 1,
      },
      {
        title: '市场价',
        dataIndex: 'marketPrice',
        width: 150,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入市场价',
          }],
        },
        editable: settleType !== 1,
      },
      {
        title: '库存预警值',
        dataIndex: 'stockAlarmNum',
        width: 150,
        editable: false,
      },
      {
        title: '可用库存',
        dataIndex: 'stockNum',
        width: 150,
        editable: false,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入可用库存',
          }],
        }
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
    setEditableKeys(tableData.map(item => item.key));
    setDataSource(tableData);
  }, [tableData])

  return (
    <EditableProTable
      columns={columns}
      rowKey="key"
      value={dataSource}
      editable={{
        form,
        editableKeys,
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
          setDataSource(recordList);
          setTableData(recordList)
        }
      }}
      bordered
      recordCreatorProps={false}
      style={{ marginBottom: 20 }}
    />
  )
}
