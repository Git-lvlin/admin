import { useState, useRef, useEffect } from 'react'
import { Drawer, Table, Spin, Tooltip, Image, Space } from 'antd'
import ProTable from '@/components/pro-table'
import { QuestionCircleOutlined } from '@ant-design/icons'

import type { goodsDetailProps } from './data'
import type{ ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import { amountTransform, typeTransform } from '@/utils/utils'
import { productList, getConfig} from '@/services/product-management/product-list'
import GcCascader from '@/components/gc-cascader'
import Export from '@/components/export'

const SubTable: React.FC<any> = (props) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const columns = [
    { title: 'skuID', dataIndex: 'skuId' },
    { title: '规格图', dataIndex: '' },
    { title: '规格1', dataIndex: '' },
    { title: '规格2', dataIndex: '' },
    { title: '销售价', dataIndex: '', render: (_) => _ > 0 ? amountTransform(_, '/') : '-' },
    { title: '市场价', dataIndex: '', render: (_) => _ > 0 ? amountTransform(_, '/') : '-' },
    { title: '可用库存', dataIndex: 'stockNum' }
  ];

  useEffect(() => {
    setLoading(true);
    productList({
      selectType: 2,
      spuId: props.data.spuId
    }).then(res => {
      setData(res?.data)
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  return (
    <Spin spinning={loading}>
      <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
    </Spin>
  )
};

const GoodsDetail: React.FC<goodsDetailProps> = ({visible, setVisible, appGcId1, appGcId2, title, subTitle}) => {
  const [config, setConfig] = useState<any>()
  const formRef = useRef<FormInstance>()

  useEffect(() => {
    getConfig()
      .then(res => {
        setConfig(res?.data || [])
      })
  }, [])

  const getFieldsValue = () => {
    const { gcId = [], ...rest } = formRef.current?.getFieldsValue()
    return {
      selectType: 1,
      gcId1: gcId[0],
      gcId2: gcId[1],
      gcId3: gcId[2],
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: 'sku',
      dataIndex: 'skuId',
      align: 'center'
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      align: 'center'
    },
    {
      title: '图片',
      dataIndex: 'goodsImageUrl',
      align: 'center',
      render: (_, r) => <Image width={50} height={50} src={r.goodsImageUrl} />,
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center'
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      align: 'center'
    },
    {
      title: '商品分类',
      dataIndex: 'gcId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品分类',
      dataIndex: 'gcId',
      renderFormItem: () => (<GcCascader />),
      hideInTable: true,
    },
    {
      title: '销售价',
      dataIndex: 'name',
      valueType: 'text',
      hideInSearch: true,
      width: 80,
      render: (_, data) => {
        const { goodsSaleMinPrice, goodsSaleMaxPrice } = data;
        if (goodsSaleMinPrice === goodsSaleMaxPrice) {
          return amountTransform(goodsSaleMinPrice, '/');
        }

        return `${amountTransform(goodsSaleMinPrice, '/')}~${amountTransform(goodsSaleMaxPrice, '/')}`
      }
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      hideInSearch: true,
    },
    {
      title: '审核状态',
      dataIndex: 'goodsVerifyStateDisplay',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        const { goodsVerifyRemark, goodsVerifyState } = record;
        return (
          <>
            {_}&nbsp;
            {(goodsVerifyRemark && goodsVerifyState === 2) && <Tooltip title={goodsVerifyRemark}><QuestionCircleOutlined /></Tooltip>}
          </>
        )
      },
    },
    {
      title: '审核状态',
      dataIndex: 'goodsVerifyStateDisplay',
      valueType: 'select',
      valueEnum: typeTransform(config?.goodsState),
      hideInTable: true,
    },
    {
      title: '上架状态',
      dataIndex: 'goodsState',
      onFilter: true,
      valueType: 'select',
      valueEnum: typeTransform(config?.goodsState),
      hideInTable: true,
    },
    {
      title: '上架状态',
      dataIndex: 'goodsStateDisplay',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        const { goodsStateRemark, goodsState } = record;
        return (
          <>
            {_}&nbsp;
            {(goodsStateRemark && goodsState === 0) && <Tooltip title={goodsStateRemark}><QuestionCircleOutlined /></Tooltip>}
          </>
        )
      },
    }
  ]

  return (
    <Drawer
      visible={visible}
      title={
        <Space size={20}>
          <span>类目名称：{title}</span> 
          {subTitle ? <span>上级类目名称：{subTitle}</span> : ''}
        </Space>
      }
      width={1200}
      destroyOnClose
      onClose={()=> setVisible(false)}
    >
      <ProTable
        rowKey='id'
        formRef={formRef}
        params={{
          selectType: 1,
          appGcId1,
          appGcId2
        }}
        options={false}
        request={productList}
        expandable={{ expandedRowRender: (_) => <SubTable data={_} /> }}
        columns={columns}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='goods-app-gc-export'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </Drawer>
  )
}

export default GoodsDetail 