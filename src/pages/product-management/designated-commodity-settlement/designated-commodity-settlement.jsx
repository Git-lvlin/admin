import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@/components/PageContainer';
import { Button, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { postageList, postageDetail } from '@/services/product-management/freight-template';
import Form from './form';
import DeleteModel from './delete-model'

export default () => {
  const [formVisible, setFormVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
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
      title: '商品名称',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
    },
    {
      title: 'skuID',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
    },
    {
      title: '金额',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
    },
    {
      title: '省办事处-管理奖',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip:'销售订单按订单收货地址判断业绩归属。（线下结算，下单后修改收货地址，依然按下单时的地址判断业绩归属）'
      // children: [
      //   {
      //     title: '销售订单按订单收货地址判断业绩归属。（线下结算，下单后修改收货地址，依然按下单时的地址判断业绩归属）',
      //     align: 'center',
      //   }
      // ]
    },
    {
      title: '社区店主-服务佣金(直)',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip:<><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
    },
    {
      title: '用户-服务佣金(直)',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
    },
    {
      title: '社区店主-管理佣金(间)',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
    },
    {
      title: '用户-管理佣金(间)',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
    },
    {
      title: 'VIP店主-服务佣金(直)',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
    },
    {
      title: 'VIP店主-管理佣金(间)',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>无相关角色，分成归属平台</p><p>提现时扣除7%手续费和2元/笔，不承担通道费</p></>,
    },
    {
      title: '供应商-货款',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: '销售订单承担通道费',
    },
    {
      title: '运营中心',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>线上记账线下结算,不承担通道费</p><p>销售订单：下单人为普通用户，则运营中心无收益，如下单人为店主，则业绩归属于下单店主绑定的运营中心</p></>,
    },
    {
      title: '省代',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>线下结算</p><p>销售订单按订单收货地址判断业绩归属</p></>,
    },
    {
      title: '市代',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>线下结算</p><p>销售订单按订单收货地址判断业绩归属</p></>,
    },
    {
      title: '全国分红奖',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: <><p>线下结算</p><p>每月统计全国各省市的总共业绩（含租赁+销售）前三名</p></>,
    },
    {
      title: '汇能科技',
      dataIndex: 'storeCancelNumNotAudit',
      align: 'center',
      tip: '没有对应角色的分成归此处,线下结算的角色资金先分账到平台',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a key='edit' onClick={() => { setDetailData(record);setFormVisible(true) }}>修改</a>,
        <a key='delete' onClick={() => { setDetailData(record.id);setVisible(true) }}>删除</a>
      ],
    },
  ];

  return (
    <PageContainer>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button key="out" type="primary" onClick={() => { setFormVisible(true) }}>添加指定商品分成</Button>
        </div>
      </Card>
      <ProTable
        rowKey="id"
        bordered
        options={false}
        // scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        request={postageList}
        search={false}
        columns={columns}
        actionRef={actionRef}
      />
      {formVisible && <Form
        visible={formVisible}
        setVisible={setFormVisible}
        onClose={() => { setFormVisible(false); setDetailData(null) }}
        detailData={detailData}
        callback={() => { actionRef.current.reload() }}
      />}
      {visible && <DeleteModel
        visible={visible}
        setVisible={setVisible}
        onClose={() => { setVisible(false); setDetailData(null) }}
        detailData={detailData}
        callback={() => { actionRef.current.reload() }}
      />}
    </PageContainer>
  );
};
