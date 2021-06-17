import React, { useState, useRef,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { commissionSum,commissionPage } from '@/services/daifa-store-management/list';
import { history } from 'umi';
import { Statistic, Row, Col, Button } from 'antd';

export default props => {
    let storeNo = props.location.query.storeNo
    let [moneyData,setMoneyData]=useState({})
    const ref=useRef()
    const columns = [
        {
            title: '返佣金额',
            dataIndex: 'commission',
            valueType:'text',
            hideInSearch:true
        },
        {
            title: '利润金额',
            dataIndex: 'profit',
            valueType:'text',
            hideInSearch:true
        },
        {
            title: '订单金额',
            dataIndex: 'orderAmount',
            valueType:'text',
            hideInSearch:true
        },
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            valueType:'text'    
        },
        {
            title: '商品数量',
            dataIndex: 'productCount',
            valueType:'text',
            hideInSearch:true
        },
        {
            title: '买家手机号',
            dataIndex: 'mobile',
            valueType:'text',
        },
        {
            title: '支付时间',
            dataIndex: 'payTime',
            valueType:'text',
            hideInSearch:true
        },
        {
            title: '返佣到账时间',
            dataIndex: 'commissionTime',
            valueType:'text',
            hideInSearch:true
        },
        {
            title: '返佣时间',
            key: 'dateRange',
            dataIndex: 'commissionTime',
            valueType: 'dateRange',
            hideInTable: true,
        }
    ];
    useEffect(()=>{
        commissionSum({storeNo}).then(res=>{
            setMoneyData(res.data)
        })
    },[])
  return (
    <PageContainer>
        <Row gutter={16}>
            <Col span={8}>
               <Statistic title="累计成交金额" value={moneyData.totalOrderAmount} precision={2} suffix="元" />
            </Col>
            <Col span={8}>
              <Statistic title="累计佣金金额" value={moneyData.totalCommission} precision={2} suffix={'元（其中冻结佣金额为'+moneyData.freezeCommission+'元)'}/>
            </Col>
            <Col span={8}>
               <Statistic title="累计返佣订单笔数" value={moneyData.totalOrderCount} precision={2} suffix="笔"/>
            </Col>
        </Row>
        <ProTable
            rowKey="id"
            actionRef={ref}
            params={{
                storeNo
            }}
            request={commissionPage}
            search={{
                defaultCollapsed: false,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                    ...dom.reverse()
                ],
            }}
            columns={columns}
        />
  </PageContainer>
  );
};
