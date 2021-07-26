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
        title: '秒约价',
        dataIndex: 'salePrice',
        editable: settleType === 2,
        width: 130,
        hideInTable: goodsSaleType === 1,
      },
      {
        title: '秒约价上浮比例',
        dataIndex: 'salePriceFloat',
        hideInTable: goodsSaleType === 1,
        width: 130,
      },
      {
        title: '秒约价实际盈亏',
        dataIndex: 'salePriceProfitLoss',
        editable: false,
        hideInTable: goodsSaleType === 1,
        width: 130,
      },
      {
        title: '市场价',
        dataIndex: 'marketPrice',
        width: 130,
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

  const debounceFetcher = useMemo(() => {
    const loadData = (value) => {
      const { recordList, record } = value;

      const findItem = dataSource.find(item => item.skuId === record.skuId);
      const obj = {
        skuId: findItem.skuId,
        retailSupplyPrice: amountTransform(findItem.retailSupplyPrice),
        wholesaleTaxRate: props.wholesaleTaxRate,
      }
      if (findItem.salePrice !== record.salePrice) {
        obj.salePrice = amountTransform(record.salePrice);
      }

      if (findItem.salePriceFloat !== record.salePriceFloat) {
        obj.salePriceFloat = amountTransform(record.salePriceFloat, '/');
      }

      if ((findItem.salePrice !== record.salePrice || findItem.salePriceFloat !== record.salePriceFloat) && goodsSaleType !== 1) {
        api.subAccountCheck(obj).then(res => {
          if (res.code === 0) {
            const skuData = res.data[0];
            const arr = recordList.map(item => {
              if (item.skuId === record.skuId) {
                const data = {
                  ...item,
                  salePrice: amountTransform(skuData.salePrice, '/'),
                  salePriceProfitLoss: amountTransform(skuData.salePriceProfitLoss, '/'),
                  salePriceFloat: amountTransform(skuData.salePriceFloat),
                }
                return data
              }
              return item
            })
            setDataSource(arr)
            setTableData(arr)
          }
        })
      } else {
        setDataSource(recordList)
        setTableData(recordList)
      }
    };

    return debounce(loadData, 500);
  }, [dataSource, props]);

  useEffect(() => {
    setEditableKeys(tableData.map(item => item.key));
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
