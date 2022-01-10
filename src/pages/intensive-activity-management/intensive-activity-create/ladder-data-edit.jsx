import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Row, Col, Input } from 'antd'
import { EditableProTable } from '@ant-design/pro-table';
import { amountTransform } from '@/utils/utils'
import debounce from 'lodash/debounce';
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'

const CusInput = ({ onChange, record, unit, readOnly, ...rest }) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        社区店额外奖励占比：<Input className="red" disabled={readOnly} onChange={(e) => { onChange(e.target.value) }} style={{ width: 100 }} addonAfter={<span style={{ color: 'red' }}>%</span>} {...rest} />&nbsp;运营中心：<span style={{ color: 'red' }}>{record?.operationPercent}%</span>
      </div>
      <div>总额外奖励占多盈利<span style={{ color: 'red' }}>{record?.totalExtraScale}%</span>，总额外奖励金额<span style={{ color: 'red' }}>{record?.totalExtraSubsidy / 100}元/{unit}</span></div>
    </>
  )
}

export default function EditTable({ data, setData, unit, wsUnit, batchNumber, skuData, readOnly }) {
  const [editableKeys, setEditableKeys] = useState([])
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState([]);
  const formRef = useRef();
  const debounceFetcher = useMemo(() => {
    const loadData = (value) => {
      const { recordList } = value;
      const obj = {
        skuId: skuData.skuId,
        fixedPrice: amountTransform(skuData.fixedPrice),
        operationFixedPrice: amountTransform(skuData.operationFixedPrice),
        isGetWholesale: 1,
        priceScale: amountTransform(skuData.settlePercent, '/'),
        price: amountTransform(skuData.price),
        ladderData: recordList.map(item => ({
          tier: item.tier,
          skuId: skuData.skuId,
          storePercent: amountTransform(item.storePercent, '/'),
        }))
      }

      productList(obj).then(res => {
        const arr = res.data[0].ladderData.map(item => (
          {
            ...item,
            totalExtraScale: amountTransform(item.totalExtraScale),
            operationPercent: amountTransform(item.operationPercent),
            storePercent: amountTransform(item.storePercent),
          }
        ))
        setDataSource(arr)
        setData(arr)
      })
    };

    return debounce(loadData, 10);
  }, [dataSource, setData, skuData]);

  useEffect(() => {
    setColumns([
      {
        title: '阶梯最低量',
        dataIndex: 'wsStart',
        valueType: 'text',
        editable: false,
        render: (_) => {
          return <>
            <div>{_}{unit}</div>
            {batchNumber > 1 && !!wsUnit && <div>({parseInt(_ / batchNumber, 10)}{wsUnit})</div>}
          </>
        }
      },
      {
        title: '阶梯供货价',
        dataIndex: 'wsSupplyPrice',
        valueType: 'text',
        editable: false,
        render: (_, record) => {
          return <>
            <div>{_ / 100}元/{unit}</div>
            {batchNumber > 1 && !!wsUnit && <div>({record.wsBatchSupplyPrice / 100}元/{wsUnit})</div>}
          </>
        }
      },
      {
        title: <><div>多阶梯盈亏金额(元/{unit})</div><div>(固定供货价 - 阶梯供货价)</div></>,
        dataIndex: 'wsProfit',
        valueType: 'text',
        editable: false,
        render: _ => amountTransform(_, '/')
      },
      {
        title: '平台对社区店额外奖励',
        dataIndex: 'storePercent',
        renderFormItem: (_, { record }) => {
          return <CusInput record={record} unit={unit} readOnly={readOnly} onBlur={() => {
            debounceFetcher({ record, recordList: dataSource })
          }} />
        },
      },
      {
        title: `平台额外奖励给社区店金额(元/${unit})`,
        dataIndex: 'storeSubsidy',
        valueType: 'text',
        editable: false,
        render: _ => amountTransform(_, '/')
      },
      {
        title: `平台额外奖励给运营中心金额(元/${unit})`,
        dataIndex: 'operationSubsidy',
        valueType: 'text',
        editable: false,
        render: _ => amountTransform(_, '/')
      },
    ])
    setDataSource(data);
    setEditableKeys(data.map(item => item.wsStart))
  }, [data, unit, dataSource])

  return (
    <EditableProTable
      columns={columns}
      rowKey="wsStart"
      value={dataSource}
      scroll={{ x: 'max-content' }}
      controlled
      formRef={formRef}
      search={false}
      style={{ marginBottom: 10 }}
      editable={{
        editableKeys,
        onValuesChange: (record, recordList) => {
          setData(recordList)
          setDataSource(recordList)
        }
      }}
      title={() => {
        return (
          <Row gutter={100}>
            <Col>固定集采供货价：{skuData?.wholesaleSupplyPrice} 元 / {unit}</Col>
            <Col>集约价：{skuData?.price} 元 / {unit}</Col>
            <Col>盈利金额：{skuData?.profit} 元 / {unit}</Col>
          </Row>
        )
      }}
      bordered
      recordCreatorProps={false}
      tableAlertRender={false}
    />
  )
}
