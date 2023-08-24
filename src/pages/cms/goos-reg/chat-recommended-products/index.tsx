import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'
import type { ProColumns,ActionType } from "@ant-design/pro-table"
import type { TableProps } from "./data"
import AddGoods from './add-goods'
import SortMpdel from './sort-model'
import { getChatListByParam, deleteChat } from "@/services/cms/chat-recommended-products"
import { Button, message } from "antd"
import Export from "@/pages/export-excel/export"
import ExportHistory from "@/pages/export-excel/export-history"
import { amountTransform } from "@/utils/utils"

export default function TransactionData () {
  const [visible, setVisible] = useState<boolean>(false)
  const [sortVisible, setSortVisible] = useState<boolean>(false)
  const [msgDetail, setMsgDetail] = useState<TableProps>()
  const [visit, setVisit] = useState<boolean>(false)
  const form = useRef<ActionType>()
  const tableColumns: ProColumns[] = [
    {
      title: '显示序号',
      dataIndex:'sort',
      hideInSearch: true,
    },
    {
      title: 'spuID',
      dataIndex: 'spuId',
      align: 'center',
    },
    {
      title: '商品主图',
      dataIndex: 'goodsImageUrl',
      align: 'center',
      valueType: 'image',
      hideInSearch: true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      fieldProps: {
        placeholder: '请输入商品名称'
      }
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '商品分类',
      dataIndex: 'gcId1Display',
      align: 'center',
      hideInSearch: true,
      render: (_,data) => {
        return `${data.gcId1Display}>${data.gcId2Display}>${data.gcId3Display}`
      }
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      align: 'center',
      hideInSearch: true  
    },
    {
      title: '销售价',
      dataIndex: 'goodsSaleMinPrice',
      align: 'center',
      hideInSearch: true,
      render: (_) => {
        return amountTransform(_,'/').toFixed(2)
      }
    },
    {
      title: '状态',
      dataIndex: 'goodsState',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        0: '下架',
        1: '正常'
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>([
        <a onClick={()=>{setSortVisible(true);setMsgDetail(data)}} key='edit'>排序</a>,
        <a onClick={()=>{ 
          deleteChat({ id:data.id }).then(res=>{
            if(res.code==0){
              form?.current?.reload()
              message.success('操作成功！')
            }
          })
         }} key='reset'>删除</a>,
      ])
    },
  ]
  const getFieldValue = (searchConfig: any) => {
    const {...rest}=searchConfig.form.getFieldsValue()
    return {
        ...rest,
        }
    }
  return (
    <PageContainer title={false}>
      <ProTable
        rowKey="id"
        columns={tableColumns}
        request={getChatListByParam}
        columnEmptyText={false}
        actionRef={form}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        options={false}
        search={{
          defaultCollapsed: true,
          labelWidth: 110,
          optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
            ...dom.reverse(),
            <Button type="primary" onClick={()=>{ setVisible(true) }}>添加商品</Button>,
            <Export
              key='export'
              change={(e: boolean | ((prevState: boolean) => boolean)) => { setVisit(e) }}
              type={'goods-chat'}
              conditions={()=>{return getFieldValue(searchConfig)}}
            />,
            <ExportHistory key='task' show={visit} setShow={setVisit} type='goods-chat'/>,
          ],
        }}
      />
      {
        visible&&
        <AddGoods
          visible={visible}
          setVisible={setVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
      {
        sortVisible&&
        <SortMpdel
          visible={sortVisible}
          setVisible={setSortVisible}
          msgDetail={msgDetail}
          callback={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
          onClose={()=>{ form?.current?.reload();setMsgDetail(undefined)}}
        />
      }
    </PageContainer>
  )
}
