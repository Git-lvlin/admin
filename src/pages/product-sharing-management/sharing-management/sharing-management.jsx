import { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { getCommissionList } from '@/services/product-management/designated-commodity-settlement';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Row } from 'antd';
import ProCard from '@ant-design/pro-card';
import Form from './form';
import DeleteModel from './delete-model'
import { amountTransform } from '@/utils/utils'
import styles from './detail.less';
import { lifeHousePackage } from '@/services/intensive-store-management/shop-area'

const IntensiveGoods=() => {
    const [visible, setVisible] = useState(false);
    const [detailData, setDetailData] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const actionRef = useRef();
    const columns = [
      {
        title: '序号',
        dataIndex:'id',
        valueType: 'borderIndex',
        hideInSearch: true,
        valueType: 'indexBorder'
      },
      {
        title: '分成版本',
        dataIndex: 'versionNo',
        align: 'center',
        order: 1
      },
      {
        title: '商品名称',
        dataIndex: 'goodsName',
        align: 'center',
        order: 2
      },
      {
        title: '分成类型',
        dataIndex: 'commissionType',
        align: 'center',
        valueType: 'select',
        valueEnum: {
          1: '金额',
          2: '百分比'
        },
        hideInSearch: true,
      },
      {
        title: 'spuID',
        dataIndex: 'spuId',
        align: 'center',
        order: 5
      },
      {
        title: 'skuID',
        dataIndex: 'skuId',
        align: 'center',
        order: 4
      },
      {
        title: '新集约价',
        dataIndex: 'distributePrice',
        align: 'center',
        render: (_)=>{
          return <span style={{color:'red'}}>￥{amountTransform(_,'/').toFixed(2)}</span>
        },
        hideInSearch: true,
      },
      {
        title: '直推人(vip店主)',
        dataIndex: 'shoppervipChargeFee',
        align: 'center',
        render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
        },
        hideInSearch: true,
      },
      {
        title: '下单店主开店地址所属办事处',
        dataIndex: 'cityManageFee',
        align: 'center',
        render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
        },
        hideInSearch: true,
      },
      {
        title: '培训中心',
        dataIndex: 'trainCenterManageFee',
        align: 'center',
        render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
        },
        hideInSearch: true,
      },
      {
        title: '运营中心',
        dataIndex: 'companyAgent',
        align: 'center',
        render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
        },
        hideInSearch: true,
      },
      {
        title: '运营成本',
        dataIndex: 'platformOperateFee',
        align: 'center',
        render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
        },
        hideInSearch: true,
      },
      {
        title: '汇能科技积分/红包',
        dataIndex: 'serviceFee',
        align: 'center',
        render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
        },
        hideInSearch: true,
      },
      // {
      //   title: '供应商',
      //   dataIndex: 'wholesaleSupplyPrice',
      //   align: 'center',
      //   render: (_,data)=>{
      //     return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
      //   },
      //   hideInSearch: true,
      // },
      {
        title: '汇能',
        dataIndex: 'company',
        align: 'center',
        render: (_,data)=>{
          return data?.commissionType==2?<span>{parseFloat(_)}%</span>:<span>￥{amountTransform(_,'/').toFixed(2)}</span>
        },
        hideInSearch: true,
      },
      {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        valueType: 'select',
        valueEnum: {
          1: '生效中',
          0: '已失效'
        },
        hideInTable: true,
        order: 3
      },
      {
        title: '状态',
        dataIndex: 'status',
        align: 'center',
        valueType: 'select',
        valueEnum: {
          1: '生效中',
          0: '已失效',
          2: '已关闭'
        },
        hideInSearch: true
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => [
          <a key='edit' onClick={() => { setDetailData(record);setFormVisible(true) }}>修改</a>,
          <a key='delete' style={{ display:record?.status==2?'none':'block' }} onClick={() => { setDetailData(record);setVisible(true) }}>关闭</a>
        ],
        fixed: 'right',
        hideInSearch: true,
      },
    ];
  
    return (
      <>
        <ProTable
          rowKey="id"
          bordered
          options={false}
          scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
          request={getCommissionList}
          columns={columns}
          actionRef={actionRef}
          params={{
            orderType:30
          }}
          pagination={{
            pageSize: 10,
            showQuickJumper: true,
          }}
          search={{
            defaultCollapsed: true,
            labelWidth: 100,
            optionRender: (searchConfig, formProps, dom) => [
              ...dom.reverse(),
              <Button key="out" type="primary" onClick={() => { setFormVisible(true) }}>添加指定商品分成</Button>
            ],
          }}
        />
        {formVisible && <Form
          visible={formVisible}
          setVisible={setFormVisible}
          onClose={() => { setFormVisible(false); setDetailData(null) }}
          detailData={detailData}
          callback={() => { actionRef.current.reload();setDetailData(null) }}
        />}
        {visible && <DeleteModel
          visible={visible}
          setVisible={setVisible}
          onClose={() => { setVisible(false); setDetailData(null) }}
          detailData={detailData}
          callback={() => { actionRef.current.reload(); setDetailData(null) }}
        />}
      </>
    );
  };

const BrandAuthorization=() => {
  const columns = [
    {
      title: '套餐名称',
      dataIndex: 'title',
      align: 'center',
      order: 2
    },
    {
      title: '有效期(个月)',
      dataIndex: 'period',
      align: 'center',
    },
    {
      title: '售价(元)',
      dataIndex: 'periodAmount',
      align: 'center',
      render: (_)=>{
        return <span style={{color:'red'}}>{amountTransform(_,'/').toFixed(2)}</span>
      },
      hideInSearch: true,
    },
    {
      title: '直推人佣金',
      dataIndex: 'directVipStore',
      align: 'center',
      render: (_,data)=>{
        return <>
                <p>{amountTransform(data?.collectingInfo?.directVipStore?.amount,'/').toFixed(2)}</p>
                <p>（{amountTransform(amountTransform(data?.collectingInfo?.directVipStore?.amount,'/')/amountTransform(data?.periodAmount,'/'),'*').toFixed(2)}%）</p>
               </>
      },
      hideInSearch: true,
    },
    {
      title: '市办事处',
      dataIndex: 'cityOffice',
      align: 'center',
      render: (_,data)=>{
        return <>
                <p>{amountTransform(data?.collectingInfo?.cityOffice?.amount,'/').toFixed(2)}</p>
                <p>（{amountTransform(amountTransform(data?.collectingInfo?.cityOffice?.amount,'/')/amountTransform(data?.periodAmount,'/'),'*').toFixed(2)}%）</p>
               </>
      },
      hideInSearch: true,
    },
    {
      title: '运营中心',
      dataIndex: 'operationCenter',
      align: 'center',
      render: (_,data)=>{
        return <>
                <p>{amountTransform(data?.collectingInfo?.operationCenter?.amount,'/').toFixed(2)}</p>
                <p>（{amountTransform(amountTransform(data?.collectingInfo?.operationCenter?.amount,'/')/amountTransform(data?.periodAmount,'/'),'*').toFixed(2)}%）</p>
              </>
      },
      hideInSearch: true,
    },
    {
      title: '运营成本',
      dataIndex: 'operationCost',
      align: 'center',
      render: (_,data)=>{
        return <>
                <p>{amountTransform(data?.collectingInfo?.operationCost?.amount,'/').toFixed(2)}</p>
                <p>（{amountTransform(amountTransform(data?.collectingInfo?.operationCost?.amount,'/')/amountTransform(data?.periodAmount,'/'),'*').toFixed(2)}%）</p>
               </>
      },
      hideInSearch: true,
    },
    {
      title: '服务费福利',
      dataIndex: 'welfare',
      align: 'center',
      render: (_,data)=>{
        return <>
                <p>{amountTransform(data?.collectingInfo?.welfare?.amount,'/').toFixed(2)}</p>
                <p>（{amountTransform(amountTransform(data?.collectingInfo?.welfare?.amount,'/')/amountTransform(data?.periodAmount,'/'),'*').toFixed(2)}%）</p>
               </>
      },
      hideInSearch: true,
    },
    {
      title: '汇能利润',
      dataIndex: 'platform',
      align: 'center',
      render: (_,data)=>{
        return <>
                <p>{amountTransform(data?.collectingInfo?.platform?.amount,'/').toFixed(2)}</p>
                <p>（{amountTransform(amountTransform(data?.collectingInfo?.platform?.amount,'/')/amountTransform(data?.periodAmount,'/'),'*').toFixed(2)}%）</p>
               </>
      },
      hideInSearch: true,
    },
  ];
  return (
    <ProTable
      rowKey="id"
      bordered
      options={false}
      scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
      request={lifeHousePackage}
      columns={columns}
      pagination={{
        pageSize: 10,
        showQuickJumper: true,
      }}
      search={false}
    />
 );
};
  export default ()=>{
    const [activeKey, setActiveKey] = useState('1')
    return (
      <PageContainer title=" ">
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="1" tab="新集约商品批发">
          {
            activeKey == '1' && <IntensiveGoods type={activeKey}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="0" tab="生活馆服务费">
          {
            activeKey == '0' && <BrandAuthorization type={activeKey}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
    )
  }
