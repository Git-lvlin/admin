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
        width: 100,
        render: (text) => {
          return <img src={text} width="50" height="50" />
        }
      },
      ...arr,
      {
        title: '货号',
        dataIndex: 'supplierSkuId',
      },
      {
        title: '供货价',
        dataIndex: 'retailSupplyPrice',
      },
      {
        title: '库存预警值',
        dataIndex: 'stockAlarmNum',
      },
      {
        title: '可用库存',
        dataIndex: 'stockNum',
      },
      // {
      //   title: '库存预警值',
      //   dataIndex: 'stockAlarmNum',
      // },
      // {
      //   title: '可用库存',
      //   dataIndex: 'stockNum',
      // },
      // {
      //   title: '销售价',
      //   dataIndex: 'salePrice',
      // },
      // {
      //   title: '市场划线价',
      //   dataIndex: 'marketPrice',
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
