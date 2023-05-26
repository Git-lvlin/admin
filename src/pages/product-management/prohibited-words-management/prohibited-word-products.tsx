import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import Export from '@/components/export'
import { getWordCheckListByParams } from '@/services/product-management/prohibited-words-management'
import GcCascader from '@/components/gc-cascader'
import Edit from '@/pages/product-management/supplier/product-list/edit'
import { getDetail } from '@/services/product-management/product-list'
import { getAuth } from '@/components/auth'

const ProhibitedWordProducts: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [detailData, setDetailData] = useState(null)
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const getDetail1 = (id: string) => {
    getDetail({spuId: id})?.then(res => {
      if (res.code === 0) {
        setVisible(true)
        setDetailData({
          ...res.data,
          settleType: 2
        })
      }
    })
  }

  const getFieldsValue = () => {
    const { gc, ...rest } = form.current?.getFieldsValue()
    return {
      gcId1: gc && gc[0],
      gcId2: gc && gc[1],
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '违禁词/敏感词',
      dataIndex: 'words',
      hideInTable: true
    },
    {
      title: '类目',
      dataIndex: 'gc',
      renderFormItem: () => <GcCascader changeOnSelect/>,
      hideInTable: true
    },
    {
      title: '商品上架状态',
      dataIndex: 'goodsState',
      valueType: 'select',
      valueEnum: {
        0: '下架',
        1: '正常'
      },
      hideInTable: true
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      align: 'center',
      hideInSearch: true,
      width: '4%'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      hideInSearch: true,
      width: '12%'
    },
    {
      title: '一级类目',
      dataIndex: 'gcId1Name',
      align: 'center',
      hideInSearch: true,
      width: '5%'
    },
    {
      title: '二级类目',
      dataIndex: 'gcId2Name',
      align: 'center',
      hideInSearch: true,
      width: '6%'
    },
    {
      title: '包含违禁词',
      dataIndex: 'words1',
      align: 'center',
      hideInSearch: true,
      width: '25%'
    },
    {
      title: '包含敏感词',
      dataIndex: 'words2',
      align: 'center',
      hideInSearch: true,
      width: '25%'
    },
    {
      title: '上架状态',
      dataIndex: 'goodsStateStr',
      align: 'center',
      hideInSearch: true,
      width: '5%'
    },
    {
      title: '检测时间',
      dataIndex: 'updateTime',
      align: 'center',
      hideInSearch: true,
      width: '5%'
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: '5%',
      render: (_, r)=> {
        if(getAuth('goodsEdit')) {
          return <a onClick={()=> {getDetail1(r.spuId)}}>编辑</a>
        } else {
          return <span>编辑</span>
        }
      }
    },
  ]

  return (
    <>
      <ProTable
        rowKey='spuId'
        columns={columns}
        params={{}}
        request={getWordCheckListByParams}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        formRef={form}
        actionRef={actRef}
        options={false}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='sensitive-goods-list'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
      {
        visible &&
        <Edit
          visible={visible}
          setVisible={setVisible}
          detailData={detailData}
          callback={() => {}}
          onClose={() => {}}
        />
      }
    </>
  )
}

export default ProhibitedWordProducts