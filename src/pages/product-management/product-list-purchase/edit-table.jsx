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
        editable: false,
        render: (_) => <img src={_} width="50" height="50" />,
        width: 100,
        // renderFormItem: () => <Upload disable maxCount={1} className={styles.upload} accept="image/*" />,
        // formItemProps: {
        //   rules: [{
        //     required: true,
        //     whitespace: true,
        //     message: '请上传规格图片',
        //   }],
        // }
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
        title: '集采箱规单位量',
        dataIndex: 'batchNumber',
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
        editable: false,
        width: 130,
      },
      {
        title: '可用库存',
        dataIndex: 'stockNum',
        editable: false,
        width: 130,
        // formItemProps: {
        //   rules: [{
        //     required: true,
        //     whitespace: true,
        //     message: '请输入可用库存',
        //   }],
        // }
      },
      {
        title: '平均运费(元)',
        dataIndex: 'wholesaleFreight',
        width: 130,
        hideInTable: goodsSaleType === 2,
      },
      {
        title: '是否包邮',
        dataIndex: 'isFreeFreight',
        width: 130,
        render: (_) => _ === 1 ? '包邮' : '不包邮',
        hideInTable: goodsSaleType === 1,
      },
      {
        title: '运费模板',
        dataIndex: 'freightTemplateId',
        width: 130,
        render: (_) => _.label ? _.label : '_',
        hideInTable: goodsSaleType === 1,
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

      if (
        (findItem.salePrice !== record.salePrice || findItem.salePriceFloat !== record.salePriceFloat)
        && goodsSaleType !== 1
        && (record.salePrice !== '' && record.salePriceFloat !== '')
      ) {
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
          } else {
            setDataSource(recordList)
            setTableData(recordList)
          }
        })
      } else {
        setDataSource(recordList)
        setTableData(recordList)
      }
    };

    return debounce(loadData, 1000);
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
      controlled
      scroll={{ x: '70vw' }}
      bordered
      recordCreatorProps={false}
      style={{ marginBottom: 20 }}
    />
  )
}
