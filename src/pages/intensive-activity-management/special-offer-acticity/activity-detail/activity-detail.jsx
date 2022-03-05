import React, { useState, useEffect, useRef } from 'react';
import { getActiveConfigById } from '@/services/intensive-activity-management/special-offer-acticity';
import { Divider, Form, Spin, Button,Image,InputNumber,Row,Col,Descriptions,Typography } from 'antd';
import ProForm,{ ModalForm,ProFormRadio,ProFormText,ProFormDateTimeRangePicker,ProFormTextArea,ProFormCheckbox} from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { amountTransform } from '@/utils/utils'
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment'
const { Title } = Typography;


export default props => {
  const ref = useRef()
  const id = props.location.query.id
  const [form] = Form.useForm()
  const [detailData, setDetailData] = useState([])

  useEffect(() => {
    if (id) {
      getActiveConfigById({id}).then(res=>{
          setDetailData(res.data)
      })
    }
  }, [])

  const columns= [
    {
      title: 'spuID',
      dataIndex: 'spuId',
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
    },
    {
      title: '商品分类',
      dataIndex: 'gcName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true
    },
    {
      title: '商品主图',
      dataIndex: 'imageUrl',
      valueType: 'image',
      ellipsis:true,
      hideInSearch:true
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true
    },
    {
      title: '商品规格',
      dataIndex: 'gcName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true
    },
    {
      title: '批发供货价',
      dataIndex: 'wholesaleSupplyPrice',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{amountTransform(_, '/')}元/{data?.unit}</p>
      }
    },
    {
      title: '集约活动名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true
    },
    {
      title: '集约活动ID',
      dataIndex: 'wsId',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '集约活动状态',
      dataIndex: 'wholesaleStatusDesc',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '集约活动开始时间',
      dataIndex: 'wholesaleStartTime',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
      render:(_)=>{return <p>{moment(_*1000).format('YYYY-MM-DD HH:mm:ss')}</p>}
    },
    {
      title: '采购单下单截止时间',
      dataIndex: 'endTimeAdvancePayment',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
      render:(_)=>{return <p>{moment(_*1000).format('YYYY-MM-DD HH:mm:ss')}</p>}
    },
    {
      title: '活动状态',
      dataIndex: 'wholesaleStatus',
      valueType: 'select',
      hideInTable:true,
      valueEnum: {
          1: '待开始',
          2: '进行中',
      },
    },
    {
      title: '集约库存',
      dataIndex: 'totalStockNum',
      hideInSearch: true,
    },
    {
      title: '集采箱规单位量',
      dataIndex: 'batchNumber',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{_}{data?.unit}/{data?.wsUnit}</p>
      }
    },
    {
      title: '单次起订量',
      dataIndex: 'minNum',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{_}{data?.unit}</p>
      }
    },
    {
      title: '最大限购量',
      dataIndex: 'maxNum',
      hideInSearch: true,
    },
    {
      title: '活动价',
      dataIndex: 'price',
      hideInSearch: true,
      render: (_,data) =>{
        return <p>{amountTransform(_, '/')}元/{data?.unit}</p>
    }
    }
  ]; 
  
  return (
    <PageContainer>
    <div style={{ background: '#fff', padding: 25 }}>
      <Row style={{ marginTop: 50 }}>
          <Title style={{ marginBottom: -10 }} level={5}>活动商品</Title>
          <Divider />
          <ProTable
            actionRef={ref}
            rowKey="spuId"
            options={false}
            dataSource={detailData.content?.goods}
            search={false}
            columns={columns}
            />
      </Row>
      <Title style={{ marginBottom: -10 }} level={5}>活动参数</Title>
          <Divider />
          <Descriptions style={{ flex: 1 }} labelStyle={{ textAlign: 'right', width: 200, display: 'inline-block' }}>
            <Descriptions.Item label="活动名称">{detailData?.name}</Descriptions.Item>
            <Descriptions.Item label="活动时间">
                {moment(detailData?.startTime*1000).format('YYYY-MM-DD HH:mm:ss')} 至 {moment(detailData?.endTime*1000).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
            <Descriptions.Item label="C端可购买数量">
             {
               detailData?.content?.buyerType==0?
               <p>不限</p>
               :
               <p>{detailData?.content?.buyerLimit}{detailData?.content?.unit} 每人/每天</p>
             } 
            </Descriptions.Item>
            <Descriptions.Item label="C端可购买时间">
            {
               detailData?.content?.buyerTimeType==0?
               <p>{detailData?.content?.buyerStartTime}~{detailData?.content?.buyerEndTime}</p>
               :
               <p>{detailData?.content?.buyerStartTime}~{detailData?.content?.buyerEndTime}（每天）</p>
             } 
              {}
            </Descriptions.Item>
            <Descriptions.Item label="参与活动的店铺">
            {{1:"生鲜店铺"}[detailData?.content?.joinShopType]}
            </Descriptions.Item>
            <Descriptions.Item label="活动最近一次操作人">
            {detailData?.lastEditor}
            </Descriptions.Item>
            <Descriptions.Item label="活动最近一次操作时间">
            {moment(detailData?.updateTime*1000).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
    </div>
    </PageContainer>
  );
};
