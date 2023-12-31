import TimeSelect from '@/components/time-select'
import React, { useRef, useState, useEffect } from 'react';
import { Button, message, Input, Divider } from 'antd';
import ProTable from '@/components/pro-table'
import ProForm from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { PageContainer } from '@/components/PageContainer';
import { userRelationShip, generateUpdata, getGenerteUrl } from '@/services/cms/member/member';
import Export from './export'
import ExportHistory from '@/pages/export-excel/export-history'
import Big from 'big.js'
import { amountTransform } from '@/utils/utils'

Big.RM = 0;

const { Search } = Input;
const UserRelationship = () => {
  const actionRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState();
  const [phoneNumber2, setPhoneNumber2] = useState();
  const [memberId, setMemberId] = useState();
  const [memberId2, setMemberId2] = useState();
  const [indexData, setIndexData] = useState(false);

  const [loading, setLoading] = useState(false);
  const [upDataIsOk, setUpDataIsOk] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [totalVisit, setTotalVisit] = useState(false)
  const form = useRef()
  // useEffect(() => {
  //   if (phoneNumber) {
  //     getInitData()
  //   }
  // }, [phoneNumber])

  const getInitData = () => {
    console.log('initialData', phoneNumber)
    const json = {
      phoneNumber: phoneNumber,
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

  const getFieldValue = () => {
    const { regTm = [], ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      startRegTm: regTm[0] &&regTm[0].format('YYYY-MM-DD HH:mm:ss'),
      endTRegTm: regTm[1] && regTm[1].format('YYYY-MM-DD HH:mm:ss'),
      phoneNumber: phoneNumber,
      pid: memberId
    }
  }

  // const getEXT = () => {
  //   if (taskId) {
  //     getGenerteUrl({id: taskId}).then(({data}) => {
  //       switch(data.state) {
  //         case 0:
  //           message.error('未开始')
  //           break
  //         case 1:
  //           message.error('导出处理中')
  //           break
  //         case 2:
  //           message.success('导出成功')
  //           // message.success('导出成功,点击下载后将回到上一页')
  //           window.open(data.fileUrl, "_blank");
  //           // setTimeout(() => {
  //           //   init()
  //           // }, 3000);
  //           break
  //         case 3:
  //           message.error('导出失败')
  //           break
  //       }
  //     })
  //   } else {
  //     message.error('缺少参数taskId')
  //   }
  // }

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'id',
      order: -1,
    },
    {
      title: '用户手机号',
      dataIndex: 'phoneNumber',
      valueType: 'text',
      search: false,
      render: (_) => <a onClick={() => { setPhoneNumber(_); setPhoneNumber2(_);setMemberId('');setMemberId2('') }}>{_}</a>
    },
    {
      title: '用户手机号',
      dataIndex: 'subPhoneNumber',
      valueType: 'digit',
      hideInTable: true,
      fieldProps: {
        controls: false,
      },
      render: (_, data) => {
        return <p>{_}</p>
      }
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
      title: '氢原子订单数',
      dataIndex: '',
      search: false,
      render: (_, records) => {
        return (
          <>
            <div><a href={`/order-management/normal-order?orderType=666&orderTypes=666&buyerId=${records?.id}`} target='_blank'>购买{records.deviceBuyNum}</a></div>
            <div><a href={`/order-management/normal-order?orderType=888&orderTypes=888&buyerId=${records?.id}`} target='_blank'>租赁{records.deviceLeaseNum}</a></div>
          </>
        )
      }
    },
    {
      title: '氢原子交易业绩',
      dataIndex: '',
      search: false,
      render: (_, records) => {
        return (
          <>
            {records.buyAmount == 0 && records.rentAmount == 0
              ? '0元'
              :
              <>
                <div>{new Big(records.buyAmount).plus(records.rentAmount).div(100).toFixed(2)}元</div>
                <div>(销售{amountTransform(records.buyAmount, '/')}元+管理费{amountTransform(records.rentAmount, '/')}元)</div>
              </>
            }
          </>
        )
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
        11: '年货节活动',
        12: '春节盖楼活动（玩前）',
        13: '春节盖楼活动（玩后）',
        14: '特价活动',
        15: '一分钱活动',
        16: '店主招募活动',
      }
    },
    {
      title: '是否签到',
      dataIndex: 'inviteStatus',
      search: false,
      render: (_) => {
        if(_ == 2){
          return '已签到'
        }
        return '未签到'
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
        4: '待开户',
        5: '注销已退保证金',
      }
    },
    {
      title: 'VIP社区店主',
      dataIndex: 'vipStore',
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
      title: '邀请好友(位)',
      dataIndex: 'inviteNum',
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
    {
      title: '邀请注册时间',
      dataIndex: 'regTm',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true,
    },
  ];

  return (
    <PageContainer>
      <ProCard>
        <ProForm.Group>
          <Search
            style={
              {
                width: 300,
                marginLeft: 24,
                marginTop: 20,
                marginBottom: 20,
              }
            }
            placeholder="请输入用户手机号码"
            onSearch={(value) => {
              setPhoneNumber(Number(value))
              setMemberId('')
              setMemberId2('')
            }}
            onChange={(e) => { setPhoneNumber2(e.target.value) }}
            value={phoneNumber2}
            enterButton={'查询'} />
          <Search
            style={
              {
                width: 300,
                marginLeft: 24,
                marginTop: 20,
                marginBottom: 20,
              }
            }
            placeholder="请输入用户ID"
            onSearch={(value) => {
              setMemberId(value)
              setPhoneNumber('')
              setPhoneNumber2('')
            }}
            onChange={(e) => { setMemberId2(e.target.value) }}
            value={memberId2}
            enterButton={'用户ID查询'} />
        </ProForm.Group>
        <ProForm.Group>
          &nbsp;&nbsp;手机号码：{indexData?.phoneNumber}&nbsp;&nbsp;&nbsp;&nbsp;Ta的邀请人手机号：{indexData?.invitePhoneNumber}&nbsp;&nbsp;&nbsp;&nbsp;是否为生鲜店主：{indexData?.memberShopType ? '是' : '不是'}&nbsp;&nbsp;&nbsp;&nbsp;是否为社区店主：{indexData?.userType ? '是' : '不是'}
        </ProForm.Group>
        <ProForm.Group>
          &nbsp;&nbsp;用户昵称：{indexData?.nickName}&nbsp;&nbsp;&nbsp;&nbsp;Ta的邀请人昵称：{indexData?.inviteNickName}&nbsp;&nbsp;&nbsp;&nbsp;邀请成功的好友数量（位）：{indexData?.inviteCount}&nbsp;&nbsp;&nbsp;&nbsp;是否VIP社区店店主：{indexData?.vipStore ? '是' : '不是'}
        </ProForm.Group>
        <Divider />
        <ProForm.Group>
          &nbsp;&nbsp;是否为大团队长：{indexData?.isTeamLeader ? '是' : '不是'}&nbsp;&nbsp;&nbsp;&nbsp;所属大团队长：{indexData?.teamLeaderPhone?indexData?.teamLeaderPhone:'-'}
        </ProForm.Group>
        <ProForm.Group>
          &nbsp;&nbsp;是否为AED团长：{indexData?.isAEDLeader ? '是' : '不是'}&nbsp;&nbsp;&nbsp;&nbsp;所属AED团长：{indexData?.aedLeaderPhone?indexData?.aedLeaderPhone:'-'}&nbsp;&nbsp;&nbsp;&nbsp;所属AED合作公司：{indexData?.subsidiaryName?indexData?.subsidiaryName:'-'}
        </ProForm.Group>
        <ProForm.Group>
          &nbsp;&nbsp;用户ID：{indexData?.id}
        </ProForm.Group>
      </ProCard>

      {(!!phoneNumber || !!memberId) && <ProTable
        formRef={form}
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        params={((phoneNumber|| memberId)&& { phoneNumber: phoneNumber, pid: memberId }) }
        request={userRelationShip}
        postData={(data) => {
          setIndexData(data.memberInviteInfoDTO)
          setInitialData(data.list.records)
          return data.list.records
        }}
        scroll={{ x: 'max-content' }}
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          showSizeChanger: true,
        }}
        toolBarRender={(_, record) => [
          // <Button key="button" type="primary" onClick={() => { getEXT() }}>
          //   导出
          // </Button>,
          <Export
            key='total'
            change={(e) => { setTotalVisit(e) }}
            type='member-relation-export'
            conditions={() => getFieldValue()}
            title='导出'
            phoneNumber={phoneNumber}
          />,
          <ExportHistory
            key='totalHistory'
            show={totalVisit}
            setShow={setTotalVisit}
            type='member-relation-export'
          />
        ]}
        dateFormatter="string"
      />}
    </PageContainer>
  );
};


export default UserRelationship;