
import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { userRelationShip } from '@/services/cms/member/member';
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
      title: '渠道',
      dataIndex: 'sourceType',
      search: false,
      valueEnum: {
        0: '',
        1: '商品分享',
        2: '邀请新人',
        3: '盲盒活动',
        4: '签到活动',
        5: '五星店主活动',
        6: '周末大狂欢',
      }
    },
    {
      title: '是否签到',
      dataIndex: 'inviteStatus',
      search: false,
      valueEnum: {
        0: '',
        1: '',
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