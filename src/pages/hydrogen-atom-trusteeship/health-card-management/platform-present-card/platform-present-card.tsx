import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from '@/components/pro-table'

import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { TableProps } from "./data"

import { platformCardList } from "@/services/hydrogen-atom-trusteeship/health-card-management"
import Edit from './form';
import End from './end'
import { amountTransform } from "@/utils/utils"

export default function TransactionData () {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [endVisible, setEndVisible] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<string>()
  const ref = useRef<FormInstance>()

  const columns: ProColumns<TableProps>[] = [
    {
      title: '卡名称',
      dataIndex: 'cardName',
      align: 'center',
    },
    {
      title: '商品图',
      dataIndex: 'cardImage',
      align: 'center',
      valueType: 'image',
    },
    {
      title: '触发事件',
      dataIndex: 'type',
      align: 'center',
      valueEnum:{
        1: '投资商首次下单支付',
        2: '运营商首次下单支付',
      }
    },
    {
      title: '合计发放',
      dataIndex: 'totalMonth',
      align: 'center',
      render: (_, r) => <span>{_}个月</span>
    },
    {
      title: '合计可用次数',
      dataIndex: 'totalNum',
      align: 'center',
      render: (_, r) => <span>{_}次</span>
    },
    {
      title: '单次价值（元）',
      dataIndex: 'amount',
      align: 'center',
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '总价值（元）',
      dataIndex: 'totalAmount',
      align: 'center',
      render: (_, r) => amountTransform(_,'/').toFixed(2)
    },
    {
      title: '操作',
      dataIndex: 'payImeiSum',
      align: 'center',
      render: (_, r)=> {
        return [
                <a style={{marginRight:'10px'}} key='sort' onClick={()=>{ setEndVisible(true); setDetailData(r);}}>{r?.status?'终止':'启用'}</a>,
                <a key='edit' onClick={()=>{ setFormVisible(true); setDetailData(r);}}>编辑</a>
            ]
      },
      hideInSearch: true,
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable<TableProps>
        rowKey="id"
        headerTitle='数据列表'
        columns={columns}
        request={platformCardList}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10
        }}
        options={false}
        search={false}
      />
      {
        formVisible &&<Edit
          detailData={detailData}
          visible={formVisible}
          setVisible={setFormVisible}
          onClose={()=>{ref.current?.reload();setDetailData(null)}}
          callback={()=>{ref.current?.reload();setDetailData(null)}}
        />
      }
      {
        endVisible &&<End
          detailData={detailData}
          visible={endVisible}
          setVisible={setEndVisible}
          onClose={()=>{ref.current?.reload();setDetailData(null)}}
          callback={()=>{ref.current?.reload();setDetailData(null)}}
        />
      }
    </PageContainer>
  )
}
