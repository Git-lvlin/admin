import React, { useState, useRef,useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { storeApplyList,storeApplyDetail } from '@/services/daifa-store-management/agent-shop-store_apply'
import { history } from 'umi';
import Edit from './edit';

const agentShopStoreApply = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [aplyId, setAplyId] = useState();
  const actionRef = useRef();

  const getDetail = (id,data) => {
    console.log('data',data)
    storeApplyDetail({
      applyId:id
    }).then(res => {
      console.log('deilres',res)
      if (res.code === 0) {
        setDetailData(res.data)
        setAplyId(id)
        setFormVisible(true)
      }
    })
  }

const box=(res)=>{
  console.log('res',res)
    const arr=res.map(ele=>
      ({ 
          id:ele.id,
          storeName:ele.details.storeName,
          realname:ele.details.realname,
          mobile:ele.details.mobile,
          wechatNo:ele.details.wechatNo,
          station:ele.details.station,
          createTime:ele.createTime,
          verifyStatus:ele.verifyStatus.code,
          auditMsg:ele.auditMsg,
          adminName:ele.details.adminName
      }))
      return arr
    }


  const columns = [
    {
      title: '店铺ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch:true
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
    },
    {
      title: '店主姓名',
      dataIndex: 'realname',
      valueType: 'text',
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      valueType: 'text',
    },
    {
      title: '微信号',
      dataIndex: 'wechatNo',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '岗位或角色',
      dataIndex: 'station',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'adminName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '实名认证状态',
      dataIndex: 'verifyStatus',
      valueType: 'select',
      valueEnum: {
        0: '未知',
        1: '店铺入驻成功',
        2: '认证失败',
        3: '已认证',
        4: '待审核',
        5:'取消申请'
      }
    },
    {
      title: '认证成功/失败详解',
      dataIndex: 'auditMsg',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          <a onClick={() => { history.push(`/daifa-store-management/agent-shop-store_apply/store-apply-detail?applyId=${data.id}`) }}>详情</a>
          {
            data.verifyStatus==3?null:<a onClick={() => { getDetail(data.id,data) }}>编辑</a>
          }
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        params={{
          pageSize:15
        }}
        // dataSource={listData}
        postData={box}
        request={storeApplyList}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ]
        }}
        columns={columns}
        actionRef={actionRef}
      />
      {formVisible && <Edit
        aplyId={aplyId}
        visible={formVisible}
        setVisible={setFormVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { setDetailData(null) }}
      />}
    </>

  );
};

export default agentShopStoreApply;
