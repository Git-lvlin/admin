import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { storeList,statusSwitch, storeDetail } from '@/services/daifa-store-management/list'
import { history } from 'umi';
import AddModal from '@/components/ExcelModel'
import Edit from './edit';
import { max } from 'moment';

const TableList = () => {
  const ref=useRef()
  const [formVisible, setFormVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const actionRef = useRef();

  const switchStatus = (storeNo, type) => {
    // statusSwitch({
    //   storeNo,
    //   status:type
    // }).then(res => {
    //   if (res.code === 0) {
    //     actionRef.current.reload();
    //   }
    // })
  }

  const getDetail = (id) => {
    storeDetail({
      storeNo: id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
        console.log('res.data',res.data)
        setFormVisible(true)
      }
    })
  }

  const columns = [
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称',
      },
    //   render: (_, data)=>{
    //     return new Promise(async (resolve, reject) => {
    //     if(_&&_.length>10){
    //       await reject('店铺名称不超过10个字符')
    //     }else {
    //       await resolve()
    //   }
    //   })
    //  }
    },
    {
      title: '店主姓名',
      dataIndex: 'realname',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主姓名'
      }
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入手机号码'
      }
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
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0:'全部',
        1: '已启用',
        2: '已禁用',
      }
    },
    {
      title: '商品数',
      dataIndex: 'goodsTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        if (_ === 0) {
          return _;
        }
        return <a onClick={() => { history.push(`/daifa-store-management/list/consultant-product-list?spuId=${data.id}&storeNo=${data.storeNo}`) }}>{_}</a>
      }
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          {data.status === 1 && <a onClick={() => { switchStatus(data.storeNo, 2) }}>禁用</a>}
          {data.status === 2 && <a onClick={() => { switchStatus(data.storeNo, 1) }}>启用</a>}
          <a onClick={() => { history.push(`/daifa-store-management/list/list-detail?storeNo=${data.storeNo}`) }}>详情</a>
          <a onClick={() => { getDetail(data.storeNo) }}>编辑</a>
          <a onClick={() => { history.push(`/daifa-store-management/list/agent-shop-money?storeNo=${data.storeNo}`) }}>佣金明细</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        request={storeList}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button key="out" type="primary" onClick={() => { setFormVisible(true) }}>新建</Button>,
            <AddModal 
              callback={() => { actionRef.current.reload()}}
            />
          ]
        }}
        columns={columns}
        actionRef={actionRef}
      />
      {formVisible && <Edit
        visible={formVisible}
        setVisible={setFormVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { setDetailData(null) }}
      />}
    </>

  );
};

export default TableList;
