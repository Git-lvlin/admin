import React, { useState, useRef } from 'react'
import ProTable from '@/components/pro-table'
import { PageContainer } from '@ant-design/pro-layout'
import { Button, Drawer, Space } from 'antd'
import { ModalForm } from '@ant-design/pro-form'
import { ExclamationCircleOutlined } from "@ant-design/icons"

import { dateFormat, amountTransform } from '@/utils/utils'
import ProductDetailDrawer from '@/components/product-detail-drawer'
import { ruleGoodsList, ruleStatInfo, ruleGoodsSortTop, ruleGoodsStateSub } from '@/services/single-contract-activity-management/activity-product'
import EditStock from './edit-stock'
import GroupDetail from './group-detail'

const TableList = ({onClose, visible, id}) => {

  const [info, setInfo] = useState({})
  const [productDetailDrawerVisible, setProductDetailDrawerVisible] = useState(false)
  const [editStockVisible, setEditStockVisible] = useState(false)
  const [spuId, setSpuId] = useState(0)
  const [stockData, setStockData] = useState(null)
  const [groupDetailVisible, setGroupDetailVisible] = useState(false)
  const [groupState, setGroupState] = useState(1)
  const [formVisible, setFormVisible] = useState(false)
  const [putawaySoldOut, setPutawaySoldOut] = useState(false)

  const actionRef = useRef() 
  
  const toTop = (ruleGoodsId, actionRef) => {
    ruleGoodsSortTop({ruleGoodsId},{ showSuccess: true }).then(res=> {
      if(res.code === 0) {
        actionRef.current?.reload()
      }
    })
  }

  const statInfo = [
    {
      title: '活动商品SPU&SKU',
      dataIndex: 'activitySpuNum',
      align: 'center',
      render: (_, r) => <span>{`${_}&${r.activitySkuNum}`}</span>
    },
    {
      title: '活动商品总库存',
      dataIndex: 'activitySkuStockNum',
      align: 'center'
    },
    {
      title: '已拼商品SPU&SKU',
      dataIndex: 'activitySpuSuc',
      align: 'center',
      render: (_, r) => <span>{`${_}&${r.activitySkuSuc}`}</span>
    },
    {
      title: '已拼商品件数',
      dataIndex: 'activitySkuSucNum',
      align: 'center'
    },
    {
      title: '拼团转化率',
      dataIndex: 'groupIngRate',
      align: 'center',
      render: (_) => `${_}%`
    },
    {
      title: '开团总数',
      dataIndex: 'totalGroupNum',
      align: 'center'
    }, {
      title: '成团数量',
      dataIndex: 'successGroupNum',
      align: 'center'
    },

     {
      title: '成团转化率',
      dataIndex: 'groupSucRate',
      align: 'center',
      render: (_) => `${_}%`
    },
  ]

  const columns = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入spuID'
      }
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      width: '15%',
      render: (_, r)=> <a onClick={()=> {setProductDetailDrawerVisible(true); setSpuId(r.spuId)}}>{_}</a>
    },
    {
      title: '在架状态',
      dataIndex: 'goodsState',
      valueType: 'select',
      valueEnum: {
        0: '下架',
        1: '上架'
      },
      hideInSearch: true,
      hideInTable: info.activityStatus === 3 || info.activityStatus === 4
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '成团人数',
      dataIndex: 'defaultGroupNum',
      hideInSearch: true,
    },
    {
      title: '已拼数量(件)',
      dataIndex: 'skuGroupNum',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '拼团中团数',
      dataIndex: 'groupIngNum',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        if(_ > 0) {
          return <a onClick={()=>{setGroupDetailVisible(true); setStockData(record); setGroupState(2)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '成功团数',
      dataIndex: 'groupSucNum',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        if(_ > 0) {
          return <a onClick={()=>{setGroupDetailVisible(true); setStockData(record); setGroupState(1)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '失败团数',
      dataIndex: 'groupFailNum',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => {
        if(_ > 0) {
          return <a onClick={()=>{setGroupDetailVisible(true); setStockData(record); setGroupState(3)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record)=> (
        <Space size="middle">
          <a onClick={()=> {toTop(record.ruleGoodsId, actionRef)}}>置顶</a>
          <a onClick={() => {setEditStockVisible(true); setStockData(record)}}>编辑库存</a>
          <a onClick={() => {setStockData(record); setPutawaySoldOut(true) }}>{`从活动${record.goodsState === 1 ? '下' : '上'}架`}</a>
        </Space>
      ),
      fixed: 'right',
      hideInTable: info.activityStatus === 3 || info.activityStatus === 4
    }
  ]

  return (
    <Drawer
      title={false}
      onClose={onClose} 
      visible={visible}
      width={1200}
    >
      <div style={{ marginBottom: 10, background: '#fff', padding: 10 }}>
        <Space size="middle">
          <span>{info.activityName}</span>
          <span>{info.activityStartTime}~{info.activityEndTime}</span>
          {info.virtualType === 2 && <span>虚拟成团</span>}
          <span>{{
            1: '待开始',
            2: '进行中',
            3: '已结束',
            4: '已终止'
          }[info.activityStatus]}</span>
        </Space>
      </div>
      <ProTable
        rowKey="activitySkuNum"
        options={false}
        search={false}
        pagination={false}
        postData={(data)=> [data]}
        bordered
        request={ruleStatInfo}
        params={{id}}
        columns={statInfo}
        actionRef={actionRef}
      />
      <ProTable
        rowKey="spuId"
        options={false}
        params={{ id }}
        postData={(data) => {
          setInfo({
            activityName: data.activityName,
            activityStartTime: dateFormat(data.activityStartTime * 1000),
            activityEndTime: dateFormat(data.activityEndTime * 1000),
            groupNum: data.groupNum,
            virtualType: data.virtualType,
            activityStatus: data.activityStatus,
          });
          return data.goodsList.records;
        }}
        request={ruleGoodsList}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ]
        }}
        actionRef={actionRef}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        scroll={{x: 'max-content'}}
      />
      {
        productDetailDrawerVisible&&
        <ProductDetailDrawer
          visible={productDetailDrawerVisible}
          setVisible={setProductDetailDrawerVisible}
          spuId={spuId}
        />
      }
      {
        editStockVisible&&
        <EditStock
          visible={editStockVisible}
          onClose={setEditStockVisible}
          data={stockData}
          callback={() => { actionRef.current?.reload() }}
          id={id}
        />
      }
      {
        groupDetailVisible&&
        <GroupDetail
          visible={groupDetailVisible}
          onClose={()=>setGroupDetailVisible(false)}
          data={stockData}
          id={id}
          groupState={groupState}
          info={info}
        />
      }
      {
        putawaySoldOut&&
        <PutawaySoldOut
          visible={putawaySoldOut} 
          setVisible={setPutawaySoldOut} 
          data={stockData}
          callback={() => { actionRef.current?.reload() }}
        />
      }
    </Drawer>

  );
};

const PutawaySoldOut = ({visible, setVisible, data, callback}) => {
  const submit = () => {
    const res = data.goodsState === 0 ? 1 : 0
    ruleGoodsStateSub({
      ruleGoodsId: data.ruleGoodsId,
      goodsState: res
    }).then(res => {
      if(res.code === 0) {
        callback()
      }
    })
  }

  return (
    <ModalForm
      title={<p><ExclamationCircleOutlined style={{color: '#1890FF'}}/> 确认要下架活动中的商品？</p>}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={()=>{
        submit()
        return true
      }}
      width={300}
    />
  )
}

export default TableList
