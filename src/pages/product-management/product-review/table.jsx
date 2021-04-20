import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

export default function EditTable(props) {
  const { tableHead, tableData } = props;
  const [columns, setColumns] = useState([])

  useEffect(() => {
    const arr = [];
    tableHead.forEach((item, index) => {
      if (item) {
        arr.push({
          title: item,
          dataIndex: `spec${index + 1}`,
        })
      }
    });

    setColumns([
      {
        title: '规格图片',
        dataIndex: 'imageUrl',
        width: 50,
        render: (text) => {
          return <img src={text} width="50" height="50" />
        }
      },
      ...arr,
      {
        title: '零售供货价',
        dataIndex: 'retailSupplyPrice',
      },
      {
        title: '建议零售价',
        dataIndex: 'suggestedRetailPrice',
      },
      {
        title: '批发价',
        dataIndex: 'wholesalePrice',
      },
      {
        title: '批发起售量',
        dataIndex: 'wholesaleMinNum',
      },
      {
        title: '库存预警值',
        dataIndex: 'stockAlarmNum',
      },
      {
        title: '可用库存',
        dataIndex: 'stockNum',
      },
      {
        title: '销售价',
        dataIndex: 'salePrice',
      },
      {
        title: '市场划线价',
        dataIndex: 'marketPrice',
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
    ])

  }, [tableHead])

  return (
    <Table
      columns={columns}
      rowKey="key"
      dataSource={tableData}
      bordered
      style={{ marginBottom: 20 }}
      pagination={false}
    />
  )
}
