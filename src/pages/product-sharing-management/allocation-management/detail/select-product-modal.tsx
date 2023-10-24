import React, { useEffect, useState } from 'react'
import { ModalForm } from '@ant-design/pro-form'

import type { ProColumns } from '@ant-design/pro-table'

import ProTable from '@/components/pro-table'
import { amountTransform } from '@/utils/utils'
import { productList } from '@/services/transaction-sharing-management/allocation-management'

export default (props: any) => {
  const { visible, setVisible, callback, skuData} = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectItems, setSelectItems] = useState<any[]>([])
  const [goodsData, setGoodsData] = useState<any[]>([])

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  }

  useEffect(()=> {
    setSelectItems(skuData)
    setSelectedRowKeys(skuData?.map((item: any) => item.skuId))
  }, [])


  const columns: ProColumns[] = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入spuID'
      },
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      align: 'center'
    },
    {
      title: '库存',
      dataIndex: 'stockNum',
      valueType: 'text',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '市场价',  
      dataIndex: 'goodsMarketPrice',
      hideInSearch: true,
      align: 'center',
      render: (_, r) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '销售价',
      dataIndex: 'goodsSaleMinPriceDisplay',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '零售商家结算价(元)',
      dataIndex: 'minRetailSupplyPrice',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      render: (_, r) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '批发商家结算价',
      dataIndex: 'minWholesaleSupplyPrice',
      valueType: 'text',
      hideInSearch: true,
      align: 'center',
      render: (_, r) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '上架状态',
      dataIndex: 'goodsVerifyRemark',
      valueType: 'text',
      hideInSearch: true,
      align: 'center'
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
      align: 'center'
    }
  ]

  return (
    <ModalForm
      title='选择商品'
      modalProps={{
        destroyOnClose: true
      }}
      onVisibleChange={setVisible}
      visible={visible}
      width={1200}
      onFinish={async() => {
        await callback(selectItems)
        return true;
      }}
      layout='horizontal'
      {...formItemLayout}
    >
      <ProTable
        rowKey="defaultSkuId"
        columns={columns}
        options={false}
        scroll={{y: 400}}
        request={productList}
        params={{
          fresh: 0,
          goodsVerifyState: 1
        }}
        postData={(v:any) => {
          const arr: any[] = [...goodsData]
          arr.push(...v)
          setGoodsData(arr)
          return v
        }}
        rowSelection={{
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: _ => {
            const arr: React.Key[] = []
            _.forEach(item => {
              const obj = [...skuData, ...goodsData].find(ele => {
                return (ele.skuId === item || ele.defaultSkuId === item)
               })
              const newObj ={
                skuId: obj.defaultSkuId,
                marketPrice: obj?.goodsMarketPrice,
                salePrice: obj?.goodsSaleMinPrice,
                retailSupplyPrice: obj?.minRetailSupplyPrice,
                wholesaleSupplyPrice: obj?.minWholesaleSupplyPrice,
                ...obj
              }
               obj && arr.push(newObj)
             })
            setSelectItems(arr || [])
            setSelectedRowKeys(_)
          }
        }}
      />
    </ModalForm>
  );
};