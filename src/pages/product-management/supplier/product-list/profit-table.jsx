import React, { useEffect, useState, useMemo } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import Big from 'big.js';

Big.RM = 2;

const ProfitTable = ({ value, form, callback }) => {

  const columns = [
    {
      title: '店主补贴占比',
      dataIndex: 'tStoreScale',
      valueType: 'text',
      fieldProps: {
        addonAfter: '%',
        style: {
          width: 200,
        }
      },
      // formItemProps: (_, record) => {
      //   return {
      //     rules: [
      //       {
      //         required: true,
      //         whitespace: true,
      //         message: '店主补贴占比是必填项',
      //         transform: (v) => `${v}`
      //       },
      //       {
      //         message: '店主补贴占比不能低于0',
      //         type: 'string',
      //         validator(a, v) {
      //           if (+v > 0) {
      //             return Promise.resolve();
      //           }
      //           return Promise.reject(new Error());
      //         },
      //         transform: (v) => `${v}`
      //       }
      //     ],
      //   }
      // },
    },
    {
      title: '平台毛利占比',
      dataIndex: 'tPlatformScale',
      valueType: 'text',
      fieldProps: {
        addonAfter: '%',
        style: {
          width: 200,
        },
        placeholder: '不低于5%'
      },
      // formItemProps: (_, record) => {
      //   return {
      //     rules: [
      //       {
      //         required: true,
      //         whitespace: true,
      //         message: '平台毛利占比是必填项',
      //         transform: (v) => `${v}`
      //       },
      //       {
      //         message: '平台毛利占比不能低于5%',
      //         type: 'string',
      //         validator(a, v) {
      //           if (+v > 5) {
      //             return Promise.resolve();
      //           }
      //           return Promise.reject(new Error());
      //         },
      //         transform: (v) => `${v}`
      //       }
      //     ],
      //   }
      // },
    },
    {
      title: '运营中心占比',
      dataIndex: 'tOperateScale',
      valueType: 'text',
      render: (_) => `${_}%`,
      editable: false,
    },
    {
      title: '供应商货款占比',
      dataIndex: 'tSupplierScale',
      valueType: 'text',
      render: (_) => `${_}%`,
      editable: false,
    },
    {
      title: '合计',
      dataIndex: 'e',
      valueType: 'text',
      render: (_) => `${_}%`,
      editable: false,
    },
  ]

  return (
    <EditableProTable
      columns={columns}
      rowKey="key"
      value={value}
      search={false}
      editable={{
        editableKeys: [1],
        onValuesChange: (record, recordList) => {
          let arr = []
          if (record.tStoreScale !== value[0].tStoreScale) {
            arr = recordList.map(item => {
              return {
                ...item,
                tPlatformScale: +new Big(100).minus(item.tSupplierScale).minus(item.tOperateScale).minus(item.tStoreScale).toFixed(2)
              }
            })
            
          } else {
            arr = recordList.map(item => {
              return {
                ...item,
                tStoreScale: +new Big(100).minus(item.tSupplierScale).minus(item.tPlatformScale).minus(item.tOperateScale).toFixed(2)
              }
            })
          }

          form.setFieldsValue({
            test: arr
          })
          
          callback(arr)
        }
      }}
      controlled
      scroll={{ x: 'max-content' }}
      bordered
      recordCreatorProps={false}
      tableAlertRender={false}
    />
  )
}

export default ProfitTable
