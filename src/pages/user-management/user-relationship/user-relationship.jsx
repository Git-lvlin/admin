
import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { userRelationShip } from '@/services/cms/member/member';
import { history } from 'umi';
const { Search } = Input;
const UserRelationship = () => {
  const actionRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState();
  const [indexData, setIndexData] = useState(false);


  const columns = [
    {
      title: '用户手机号',
      dataIndex: 'phoneNumber',
      valueType: 'text',
      search: false,
    },
    {
      title: '用户手机号',
      dataIndex: 'subPhoneNumber',
      valueType: 'digit',
      hideInTable: true,
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      search: false,
    },
    {
      title: '秒约订单数（单）',
      dataIndex: 'secondOrderNum',
      search: false,
      render: (_, records) => {
        return <a href={`/order-management/normal-order?buyerId=${records?.id}&orderType=2`} target='_blank'>{_}</a>
      }
    },
    {
      title: '1688订单数（单）',
      dataIndex: 's1688OrderNum',
      search: false,
      render: (_, records) => {
        return <a href={`/order-management/normal-order?buyerId=${records?.id}&orderType=11`} target='_blank'>{_}</a>
      }
    },
    {
      title: 'c端集约数（单）',
      dataIndex: 'togetherOrderNum',
      search: false,
      render: (_, records) => {
        return <a href={`/order-management/intensive-order/shopkeeper-order?buyerId=${records?.id}`} target='_blank'>{_}</a>
      }
    },
    {
      title: '店主采购订单数（单）',
      dataIndex: 'purchaseOrderNum',
      search: false,
      render: (_, records) => {
        return <a href={`/order-management/intensive-order/supplier-order?memberId=${records?.id}`} target='_blank'>{_}</a>
      }
    },
    {
      title: '渠道',
      dataIndex: 'sourceType',
      search: false,
      valueEnum: {
        0: '-',
        1: '商品分享',
        2: '邀请新人(好友)活动',
        3: '盲盒活动',
        4: '签到活动',
        5: '五星店主活动',
        6: '周末大狂欢活动',
        7: '新人专享活动',
        8: '每日红包活动',
        9: '秒杀活动',
        10: '推荐有礼',
      }
    },
    {
      title: '是否签到',
      dataIndex: 'inviteStatus',
      search: false,
      valueEnum: {
        0: '未签到',
        1: '未签到',
        2: '已签到',
      }
    },
    {
      title: '是否为社区店主',
      dataIndex: 'userType',
      valueType: 'text',
      search: false,
      valueEnum: {
        0: '不是',
        1: '是',
      }
    },
    {
      title: '店铺状态',
      dataIndex: 'storeStatus',
      search: false,
      valueEnum: {
        0: '-/不是店主/无状态',
        1: '启用',
        2: '注销未退保证金',
        3: '关闭',
        5: '注销已退保证金',
      }
    },
    {
      title: '注册时间',
      dataIndex: 'regTime',
      valueType: 'text',
      search: false,
    },
    {
      title: '最近访问时间',
      dataIndex: 'regTime',
      valueType: 'text',
      search: false,
    },
  ];

  return (
    <PageContainer>
        <ProForm.Group>
          <Search
            style={
              {
                width: 300,
                marginBottom: 20,
                marginLeft: 24,
              }
            }
            placeholder="请输入用户手机号码"
            onSearch={(value) => {
              setPhoneNumber(Number(value))
            }}
            enterButton={'查询'} />
        </ProForm.Group>
        <ProForm.Group>
            &nbsp;&nbsp;手机号码：{indexData?.phoneNumber}&nbsp;&nbsp;&nbsp;&nbsp;Ta的邀请人手机号：{indexData?.invitePhoneNumber}&nbsp;&nbsp;&nbsp;&nbsp;是否为社区店主：{indexData?.userType?'是':'不是'}
          </ProForm.Group>
          <ProForm.Group>
            &nbsp;&nbsp;用户昵称：{indexData?.nickName}&nbsp;&nbsp;&nbsp;&nbsp;Ta的邀请人昵称：{indexData?.inviteNickName}&nbsp;&nbsp;&nbsp;&nbsp;邀请成功的好友数量（位）：{indexData?.inviteCount}
          </ProForm.Group>
    {phoneNumber&&<ProTable
      style={{paddingTop: 100}}
      rowKey="id"
      columns={columns}
      actionRef={actionRef}
      params={phoneNumber&&{phoneNumber: phoneNumber}}
      request={userRelationShip}
      postData={(data) => {
        setIndexData(data.memberInviteInfoDTO)
        return data.list.records
      }}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      dateFormatter="string"
    />}
    </PageContainer>
  );
};


export default UserRelationship;