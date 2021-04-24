import React, { useState, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { Form } from 'antd';
import Upload from '@/components/upload';
import styles from './edit-table.less';

export default function EditTable(props) {
  const { tableHead, tableData, setTableData } = props;
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
        // editable: false,
        width: 50,
        renderFormItem: () => <Upload maxCount={1} className={styles.upload} accept="image/*" />,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请上传规格图片',
          }],
        }
      },
      ...arr,
      {
        title: '零售供货价',
        dataIndex: 'retailSupplyPrice',
        width: 100,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入零售供货价',
          }],
        }
      },
      {
        title: '建议零售价',
        dataIndex: 'suggestedRetailPrice',
        width: 100
      },
      {
        title: '批发价',
        dataIndex: 'wholesalePrice',
        width: 100,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入批发价',
          }],
        }
      },
      {
        title: '批发起售量',
        dataIndex: 'wholesaleMinNum',
        width: 100,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入批发起售量',
          }],
        }
      },
      {
        title: '库存预警值',
        dataIndex: 'stockAlarmNum',
        width: 100
      },
      {
        title: '可用库存',
        dataIndex: 'stockNum',
        width: 100,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入可用库存',
          }],
        }
      },
      {
        title: '销售价',
        dataIndex: 'salePrice',
        width: 100,
        formItemProps: {
          rules: [{
            required: true,
            whitespace: true,
            message: '请输入销售价',
          }],
        }
      },
      {
        title: '市场划线价',
        dataIndex: 'marketPrice',
        width: 100
      },
      // {
      //   title: '活动名称',
      //   dataIndex: 'title',
      //   width: '30%',
      //   formItemProps: {
      //     rules: [
      //       {
      //         required: true,
      //         whitespace: true,
      //         message: '此项是必填项',
      //       },
      //       {
      //         max: 16,
      //         whitespace: true,
      //         message: '最长为 16 位',
      //       },
      //       {
      //         min: 6,
      //         whitespace: true,
      //         message: '最小为 6 位',
      //       },
      //     ],
      //   },
      // },
      {
        title: '操作',
        valueType: 'option',
        render: () => {
          return null;
        },
        width: 50
      },
    ])

  }, [tableHead])

  useEffect(() => {
    setEditableKeys(tableData.map(item => item.key));
    setDataSource(tableData);
    setTimeout(() => {
      form.validateFields();
    }, 1000);
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
