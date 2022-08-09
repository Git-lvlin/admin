import { useState, useRef } from "react"
import { PageContainer } from "@ant-design/pro-layout"
import ProTable from "@ant-design/pro-table"

import type { ProColumns } from "@ant-design/pro-table"
import type { FormInstance } from "@ant-design/pro-form"
import type { TableProps } from "./data"

import { cardList, cardStatusSub } from "@/services/hydrogen-atom-trusteeship/health-card-management"
import Edit from './form';
import Sort from './sort'
import { amountTransform } from "@/utils/utils"
import { Button, Card,Switch, message } from "antd"
import { PlusOutlined } from '@ant-design/icons';

export default function TransactionData () {
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [sortVisible, setSortVisible] = useState<boolean>(false);
  const [detailData, setDetailData] = useState<string>()
  const ref = useRef<FormInstance>()

  const onFF=(bol,data)=>{
    cardStatusSub({id:data.id,status:bol?1:0}).then(res=>{
    if(res.code==0){
        message.success('设置成功');
        ref.current.reload()
    }
    })
  }

  const columns: ProColumns<TableProps>[] = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
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
      hideInSearch: true,
    },
    {
      title: '售价（元）',
      dataIndex: 'salePrice',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(_,'/')
    },
    {
      title: '卡类别',
      dataIndex: 'cardType',
      align: 'center',
      hideInTable: true,
      valueEnum:{
        1: '标准卡',
        2: '新人专享卡',
      }
    },
    {
      title: '卡类别',
      dataIndex: 'cardType',
      align: 'center',
      hideInSearch: true,
      valueEnum:{
        1: '标准卡',
        2: '新人专享卡',
      }
    },
    {
      title: '适用设备',
      dataIndex: 'equipmentType',
      align: 'center',
      hideInSearch: true,
      valueEnum:{
        1: '托管设备',
      }
    },
    {
      title: '卡总次数（次）',
      dataIndex: 'num',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '有效期',
      dataIndex: 'validTimeStr',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '展示到前端',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
      render: (_,r) => {
       return <Switch checked={_} onChange={(bol)=>{onFF(bol,r)}}/>
      },
    },
    {
      title: '操作',
      dataIndex: 'payImeiSum',
      align: 'center',
      render: (_, r)=> {
        return [
                <Button style={{marginRight:'10px'}} key='edit' onClick={()=>{ setFormVisible(true); setDetailData(r);}}>编辑</Button>,
                <Button key='sort' onClick={()=>{ setSortVisible(true); setDetailData(r);}}>排序</Button>
            ]
      },
      hideInSearch: true,
    },
  ]

  return (
    <PageContainer title={false}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setFormVisible(true) }}>添加商品卡</Button>
        </div>
      </Card>
      <ProTable<TableProps>
        rowKey="id"
        columns={columns}
        request={cardList}
        columnEmptyText={false}
        actionRef={ref}
        pagination={{
          pageSize: 10
        }}
        options={false}
        search={{
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse()
          ]
        }}
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
        sortVisible &&<Sort
          detailData={detailData}
          visible={sortVisible}
          setVisible={setSortVisible}
          onClose={()=>{ref.current?.reload();setDetailData(null)}}
          callback={()=>{ref.current?.reload();setDetailData(null)}}
        />
      }
    </PageContainer>
  )
}
