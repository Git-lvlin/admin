import { useState, useRef } from 'react'

import type { ProColumns, ActionType } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import RangeNumberInput from '@/components/range-number-input'
import SplitConfig from './split-config'
import { provideGetListByParams } from '@/services/outpatient-service-management/procurement-zone'

const  ProcurementZone:React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
    {
      title: 'spuID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: 'skuID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '商品图片',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center'
    },
    {
      title: '供应商ID',
      dataIndex: '',
      align: 'center'
    },  
    {
      title: '零售供货价(元)',
      dataIndex: 'retailSupplyPriceStr',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '销售价(元)',
      dataIndex: 'salePriceStr',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '门店价(元)',
      dataIndex: 'actPriceStr',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '平台盈亏(元)',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '平台盈亏',
      dataIndex: '',
      hideInTable: true,
      renderFormItem: () => <RangeNumberInput />
    },
    {
      title: '可用库存',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '起订数量',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '分成配置状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> <a onClick={()=> {setVisible(true); setData(r)}}>未配置</a>
    },
    {
      title: '分成配置状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '门店上架状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '门店上架状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '商品状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品状态',
      dataIndex: '',
      hideInTable: true
    },
    {
      title: '显示序号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    }, 
    {
      title: '操作',
      valueType: 'option',
      align: 'center'
    }
  ]

  return (
    <PageContainer>
      <ProTable 
        rowKey='id'
        columns={columns}
        actionRef={actRef}
        params={{}}
        request={provideGetListByParams}
        // dataSource={[{id: 1}]}
        options={false}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse()
          ]
        }}
      />
      {
        visible &&
        <SplitConfig
          visible={visible}
          setVisible={setVisible}
          meta={data}
          callback={()=> actRef.current?.reload()}
        />
      }
    </PageContainer>
  )
}

export default ProcurementZone