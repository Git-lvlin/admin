import React, { useEffect, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { Table } from 'antd';
import { singleGroupList, groupMemberList } from '@/services/single-contract-activity-management/group-detail'
import { useParams } from 'umi';


const SubTable = (props) => {
  const [data, setData] = useState([])
  const columns = [
    { title: '序号', dataIndex: 'index', render: (_, $, index) => data.length - index },
    { title: '参团用户手机号', dataIndex: 'joinMemberPhone' },
    { title: '参团时间', dataIndex: 'createTime' },
    { title: '支付状态', dataIndex: 'payStatus' },
    { title: '拼约商品数量', dataIndex: 'goodsNum' },
  ];

  useEffect(() => {
    groupMemberList({
      groupId: props.data.id
    }).then(res => {
      if (res.code === 0) {
        setData(res?.data?.length ? res.data : [])
      }
    })
  }, [])

  return (
    <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
  )
};

const TableList = ({skuId}) => {
  const params = useParams();

  const columns = [
    {
      title: '团ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '团长手机号',
      dataIndex: 'groupMemberPhone',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入请输入会员手机号'
      }
    },
    {
      title: '开团时间',
      dataIndex: 'createGroupTime',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '开团时间',
      dataIndex: 'startTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '真实参团人数',
      dataIndex: 'joinedNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '成团时间',
      dataIndex: 'finishGroupTime',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '拼团商品数量',
      dataIndex: 'goodsNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '参团手机号',
      dataIndex: 'joinMemberPhone',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入请输入会员手机号'
      },
      hideInTable: true,
    },
    {
      title: '参团时间',
      dataIndex: 'joinGroupTime',
      valueType: 'dateRange',
      hideInTable: true,
    },
    {
      title: '成团时间',
      dataIndex: 'finishGroupTime',
      valueType: 'dateRange',
      hideInTable: true,
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        params={{
          activityId: params.id,
          groupState: 1,
          skuId,
        }}
        expandable={{ expandedRowRender: (_) => <SubTable data={_} /> }}
        request={singleGroupList}
        search={{
          defaultCollapsed: false,
          labelWidth: 100,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
          ],
        }}
        columns={columns}
      />
    </>

  );
};

export default TableList;
