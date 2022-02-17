
import React, { useRef, useState, useEffect } from 'react';
import { Button, message, Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProForm from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { userRelationShip, generateUpdata, getGenerteUrl } from '@/services/cms/member/member';
const { Search } = Input;
const UserRelationship = () => {
  const actionRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState();
  const [indexData, setIndexData] = useState(false);

  const [loading, setLoading] = useState(false);
  const [upDataIsOk, setUpDataIsOk] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    if (phoneNumber) {
      getInitData()
    }
  }, [phoneNumber])

  const getInitData = () => {
    console.log('initialData', phoneNumber)
    const json = {
      phoneNumber: phoneNumber
    }
    const batchs = JSON.stringify(json);
    console.log('batchs', batchs)
    const timestamp = new Date().getTime();
    const param = {
      code: 'member-relation-export',
      fileName: 'userRelationship' + timestamp + '.xlsx',
      queryParamStr: batchs
    }
    generateUpdata(param).then((res) => {
      console.log('generateUpdata-res', res)
      if (res.code === 0) {
        setTaskId(res?.data?.taskId)
        setTimeout(() => {
          setLoading(false)
          setUpDataIsOk(true)
        }, 2000)
      } else {
        setLoading(false)
        message.error(res.msg)
      }
    })
  }

  const getEXT = () => {
    if (taskId) {
      getGenerteUrl({id: taskId}).then(({data}) => {
        switch(data.state) {
          case 0:
            message.error('未开始')
            break
          case 1:
            message.error('导出处理中')
            break
          case 2:
            message.success('导出成功')
            // message.success('导出成功,点击下载后将回到上一页')
            window.open(data.fileUrl, "_blank");
            // setTimeout(() => {
            //   init()
            // }, 3000);
            break
          case 3:
            message.error('导出失败')
            break
        }
      })
    } else {
      message.error('缺少参数taskId')
    }
  }

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
      title: '是否为生鲜店主',
      dataIndex: 'memberShopType',
      valueType: 'text',
      search: false,
      valueEnum: {
        0: '不是',
        1: '是',
      }
    },
    {
      title: '成为生鲜店主时间',
      dataIndex: 'beFrTime',
      valueType: 'text',
      search: false,
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
        setInitialData(data.list.records)
        return data.list.records
      }}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 5,
      }}
      toolBarRender={(_,record) => [
        <Button key="button" type="primary" onClick={() => { getEXT() }}>
          导出
        </Button>,
      ]}
      dateFormatter="string"
    />}
    </PageContainer>
  );
};


export default UserRelationship;