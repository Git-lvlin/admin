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
      valueType: 'text',
      editable:false
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      valueType: 'text',
      editable:false
    },
    {
      title: '基本信息',
      dataIndex: 'goodsName',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
      render:(_,data)=>{
        return <div style={{display:'flex'}}>
                <Image src={data.imageUrl} alt="" width='50px' height='50px' />
                <div style={{marginLeft:'10px'}}>
                  <p style={{fontSize:'14px'}}>{data.goodsName}</p>
                  <p style={{fontSize:'12px'}}>规格：{data.skuName}</p>
                </div>
            </div>
      }
    },
    {
      title: '集约活动名称',
      dataIndex: 'name',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true,
      editable:false
    },
    {
      title: '集约活动ID',
      dataIndex: 'wsId',
      valueType: 'text',
      hideInSearch:true,
      editable:false
    },
    {
      title: '集约活动时段',
      dataIndex: 'wholesaleStartTime',
      valueType: 'text',
      hideInSearch:true,
      editable:false,
      render:(_,data)=>{
        return <p>{moment(data.wholesaleStartTime*1000).format('YYYY-MM-DD HH:mm:ss')}-{moment(data.endTimeAdvancePayment*1000).format('YYYY-MM-DD HH:mm:ss')}</p>
      }
    },
    {
      title: '集约活动状态',
      dataIndex: 'wholesaleStatusDesc',
      valueType: 'text',
      editable:false
    },
    {
      title: '集约单次限量',
      dataIndex: 'minNum',
      hideInSearch: true,
      editable:false,
      render: (_,data)=> {
        return <p>{data?.minNum} - {data?.maxNum}包</p>
      },
    },
    {
      title: '集约价',
      dataIndex: 'wholesaleSupplyPrice',
      hideInSearch: true,
      render: (_)=> {
        return <p>{amountTransform(_, '/').toFixed(2)}包</p>
      },
      editable:false
    },
    {
      title: '集约库存',
      dataIndex: 'totalStockNum',
      hideInSearch: true,
      editable:false,
      render: (_)=> {
        return <p>{_}元/包</p>
      },
    },
    {
      title: '活动价',
      dataIndex: 'price',
      hideInSearch: true,
      render: (_) =>{
        return <p>{_}元/包</p>
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
            <Descriptions.Item label="每位店主总限量">
              {detailData?.content?.shoperLimitAll}
            </Descriptions.Item>
            <Descriptions.Item label="每位店主单次限量">{detailData?.content?.shoperLimitOnece}</Descriptions.Item>
            <Descriptions.Item label="每位消费者限量">
            {detailData?.content?.buyerLimit}
            </Descriptions.Item>
            <Descriptions.Item label="店主再次参与活动条件">
            {detailData?.content?.joinAgainPercent}
            </Descriptions.Item>
            <Descriptions.Item label="参与活动的店铺">
            {detailData?.content?.joinShopType}
            </Descriptions.Item>
            <Descriptions.Item label="参与活动的消费者">
            {detailData?.content?.joinBuyerType}
            </Descriptions.Item>
            <Descriptions.Item label="活动创建人">
            {detailData?.lastEditor}
            </Descriptions.Item>
            <Descriptions.Item label="创建时间">
            {moment(detailData?.updateTime*1000).format('YYYY-MM-DD HH:mm:ss')}
            </Descriptions.Item>
          </Descriptions>
    </div>
    </PageContainer>
  );
};
