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
  return (
    <div className={styles.brand_authorization}>
      <p style={{marginLift:'100px'}}>约购健康生活馆服务费佣金分成</p>
      <div className={styles.box_wrap} style={{borderBottom:'none'}}>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',borderLeft:'none'}}>序号</div>
        <div className={styles.box} style={{borderBottom:'none',width:'340px'}}>
          <div>约购健康生活馆加盟受权期限</div>
          <div style={{borderBottom:'none'}}>约购健康生活馆加盟服务费（元）</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>一年</div>
          <div style={{borderBottom:'none'}}>12000</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>二年</div>
          <div style={{borderBottom:'none'}}>18000</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>三年</div>
          <div style={{borderBottom:'none'}}>24000</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>分账对象</div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>提成发放方式</div>
      </div>
      <div className={styles.box_wrap}>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',borderLeft:'none'}}>1</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>直推佣金（仅限VIP资格）</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}} >服务费佣金（元）</div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>15%</div>
          <div style={{borderBottom:'none'}}>1800</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>17%</div>
          <div style={{borderBottom:'none'}}>3060</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>18%</div>
          <div style={{borderBottom:'none'}}>4320</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>直推VIP店主</div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px',padding:'none'}}>线上分账并提现</div>
      </div>
      <div className={styles.box_wrap}>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',borderLeft:'none'}}>2</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'red'}}>办事处</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}} >服务费佣金（元）</div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>15%</div>
          <div style={{borderBottom:'none'}}>1800</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>17%</div>
          <div style={{borderBottom:'none'}}>3060</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>18%</div>
          <div style={{borderBottom:'none'}}>4320</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>直推VIP店主</div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px',padding:'none'}}>线上分账并提现</div>
      </div>
      <div className={styles.box_wrap}>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',borderLeft:'none'}}>3</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'red'}}>运营中心</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}} >服务费佣金（元）</div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>15%</div>
          <div style={{borderBottom:'none'}}>1800</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>17%</div>
          <div style={{borderBottom:'none'}}>3060</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>18%</div>
          <div style={{borderBottom:'none'}}>4320</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>直推VIP店主</div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px',padding:'none'}}>线上分账并提现</div>
      </div>
      <div className={styles.box_wrap}>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',borderLeft:'none'}}>4</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'red'}}>运营成本</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}} >服务费佣金（元）</div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>15%</div>
          <div style={{borderBottom:'none'}}>1800</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>17%</div>
          <div style={{borderBottom:'none'}}>3060</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>18%</div>
          <div style={{borderBottom:'none'}}>4320</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>直推VIP店主</div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px',padding:'none'}}>线上分账并提现</div>
      </div>
      <div className={styles.box_wrap}>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',borderLeft:'none'}}>5</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'red'}}>服务费福利</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}} >赠送礼品</div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>15%</div>
          <div style={{borderBottom:'none'}}>1800</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>17%</div>
          <div style={{borderBottom:'none'}}>3060</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>18%</div>
          <div style={{borderBottom:'none'}}>4320</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>直推VIP店主</div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px',padding:'none'}}>线上分账并提现</div>
      </div>
      <div className={styles.box_wrap}>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',borderLeft:'none'}}>6</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>汇能利润</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}} >服务费佣金（元）</div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>15%</div>
          <div style={{borderBottom:'none'}}>1800</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>17%</div>
          <div style={{borderBottom:'none'}}>3060</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>18%</div>
          <div style={{borderBottom:'none'}}>4320</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>直推VIP店主</div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px',padding:'none'}}>线上分账并提现</div>
      </div>
      <div className={styles.box_wrap}>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',borderLeft:'none'}}>7</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center'}}>总计</div>
        <div className={styles.box} style={{width:'170px',borderBottom:'none',display:'flex',alignItems:'center',justifyContent:'center',color:'red'}} >服务费佣金 发放比例（元）</div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>15%</div>
          <div style={{borderBottom:'none'}}>1800</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>17%</div>
          <div style={{borderBottom:'none'}}>3060</div>
        </div>
        <div className={styles.box} style={{borderBottom:'none',width:'70px'}}>
          <div>18%</div>
          <div style={{borderBottom:'none'}}>4320</div>
        </div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px'}}>直推VIP店主</div>
        <div className={`${styles.box} ${styles.box_header}`} style={{borderBottom:'none',width:'120px',padding:'none'}}>线上分账并提现</div>
      </div>
    </div>
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
        <ProCard.TabPane key="0" tab="店铺品牌授权费">
          {
            activeKey == '0' && <BrandAuthorization type={activeKey}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
    )
  }
