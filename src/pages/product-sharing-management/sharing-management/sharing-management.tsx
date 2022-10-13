import { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { getCommissionList } from '@/services/product-management/designated-commodity-settlement';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Col, Row } from 'antd';
// import type { ProColumns,ActionType } from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import Form from './form';
import DeleteModel from './delete-model'
import { amountTransform } from '@/utils/utils'
import styles from './detail.less';

type activityItem={
  wholesaleStartTime:number;
  spuid:number;
  skuid:number;
  goodsName:string;
  typeName:string;
  skuName:number;
  unit:string;
  portion:number;
  totalNum:number;
  wholesaleSupplyPrice:number;
  price:number;
  beforeProfit:number;
  agentCompanyCommission:number;
  profit:number;
}

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
        dataIndex: 'cityManageFee',
        align: 'center',
        render: (_)=>{
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '下单店主开店地址所属办事处',
        dataIndex: 'shopperChargeFee',
        align: 'center',
        render: (_)=>{
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '培训中心',
        dataIndex: 'userChargeFee',
        align: 'center',
        render: (_)=>{
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '汇能科技',
        dataIndex: 'company',
        align: 'center',
        render: (_)=>{
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '供应商',
        dataIndex: 'retailSupplyPrice',
        align: 'center',
        render: (_)=>{
          return amountTransform(_,'/').toFixed(2)
        },
        hideInSearch: true,
      },
      {
        title: '汇能',
        dataIndex: 'company',
        align: 'center',
        render: (_)=>{
          return amountTransform(_,'/').toFixed(2)
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
          0: '已失效'
        },
        hideInSearch: true
      },
      {
        title: '操作',
        dataIndex: 'option',
        valueType: 'option',
        render: (_, record) => [
          <a key='edit' onClick={() => { setDetailData(record);setFormVisible(true) }}>修改</a>,
          <a key='delete' onClick={() => { setDetailData(record);setVisible(true) }}>关闭</a>
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
  return (
    <>
      <p style={{marginLift:'100px'}}>约购健康生活馆服务费佣金分成</p>
      <div className={styles.box_wrap}>
        <div className={`${styles.box} ${styles.box_header}`}>序号</div>
        <div className={styles.box}>
          <div>约购健康生活馆加盟受权期限</div>
          <div>约购健康生活馆加盟服务费（元）</div>
        </div>
        <div className={styles.box}>
          <div>一年</div>
          <div>12000</div>
        </div>
        <div className={styles.box}>
          <div>二年</div>
          <div>18000</div>
        </div>
        <div className={styles.box}>
          <div>三年</div>
          <div>24000</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`}>分账对象</div>
        <div className={`${styles.box} ${styles.box_header}`}>提成发放方式</div>
      </div>
    </>
  );
};
  export default ()=>{
    const [activeKey, setActiveKey] = useState<string>('1')
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
        <ProCard.TabPane key="0" tab="店铺品牌授权费">
          {
            activeKey == '0' && <BrandAuthorization type={activeKey}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
    )
  }
