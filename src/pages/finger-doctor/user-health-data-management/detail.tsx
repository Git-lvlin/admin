import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Divider, Table, Row, Avatar, Typography, Spin, Button } from 'antd';
import { getMemberDetail } from '@/services/user-management/user-list';
import ProTable  from "@ant-design/pro-table"


const { Title } = Typography;

const columns = [
  {
    title: '检测日期',
    dataIndex: 'index',
  },
  {
    title: '检测评估结果',
    dataIndex: 'consignee',
    hideInSearch: true
  },
  {
    title: '测量值',
    dataIndex: 'phone',
    hideInSearch: true
  },
  {
    title: '体验时间',
    dataIndex: 'fullAddress',
    hideInSearch: true
  },
  {
    title: '操作',
    dataIndex: 'isDefault',
    hideInSearch: true,
    render: (_) =><a onClick={()=> {  }}>查看</a>
  },
];

const sourceType = {
  1: 'vivo',
  2: '小米',
  3: '应用宝',
  4: '小程序',
  5: '移动端浏览器',
  6: '官方渠道',
  7: '魅族',
  8: 'oppo',
  9: '华为',
  10: 'appStore',
  11: 'WEB',
}

type DetailProps = {
  visible: boolean,
  setVisible: (v: boolean) => void,
  id: string,
}

type DataType = {
  memberInfoToAdminResponse?: {
    icon: string,
    nickName: string,
    phoneNumber: string,
    sourceType: string,
    inviteCode: string,
    gender: number,
    userType: number,
    createTime: string,
    uId: string,
    loginTime: string,
    [x: string]: any
  },
  [x: string]: any
}

const Detail: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, id } = props;
  const [detailData, setDetailData] = useState<DataType>({});
  const { memberInfoToAdminResponse: info } = detailData;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (getMemberDetail({
      id
    }) as Promise<{ data: DataType, code: number }>).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
      }
    }).finally(() => {
      setLoading(false);
    })
  }, [id])

  return (
    <Drawer
      title="用户健康资料详情"
      width={1200}
      placement="right"
      onClose={() => { setVisible(false) }}
      visible={visible}
    >
      <Spin spinning={loading}>
        <div style={{ background: '#fff', padding: 25 }}>
          <Row >
            <Title style={{ marginBottom: -10 }} level={5}>基本信息</Title>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <Avatar size={100} src={info?.icon} />
              <div>{info?.nickName}</div>
            </div>
            <Descriptions style={{ flex: 1 }} labelStyle={{ textAlign: 'right', width: 100, display: 'inline-block' }}>
              <Descriptions.Item label="手机号码">{info?.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label="身高">{sourceType[info?.sourceType as string]}</Descriptions.Item>
              <Descriptions.Item label="体重">
                {info?.inviteCode}
              </Descriptions.Item>
              <Descriptions.Item label="性别">{info?.gender === 1 ? '男' : '女'}</Descriptions.Item>
              <Descriptions.Item label="婚姻状况">
                {info?.userType === 1 ? '已婚' : '未婚'}
              </Descriptions.Item>
              <Descriptions.Item label="文化程度">
                {info?.createTime}
              </Descriptions.Item>
              <Descriptions.Item label="出生日期">
                {info?.uId}
              </Descriptions.Item>
              <Descriptions.Item label="工作单位">
                {info?.loginTime}
              </Descriptions.Item>
              <Descriptions.Item label="身份证号">
                {info?.birthday}
              </Descriptions.Item>
              <Descriptions.Item label="联系地址">
                {info?.job}
              </Descriptions.Item>
              <Descriptions.Item label="电子邮箱">
                {info?.education}
              </Descriptions.Item>
            </Descriptions>
          </Row>

          <Row style={{ marginTop: 50 }}>
            <Title style={{ marginBottom: -10 }} level={5}>检测档案</Title>
            <Divider />
            <ProTable
              rowKey='memberId'
              columns={columns}
              options={false}
            //   request={volunteerPage}
              dataSource={detailData?.memberAddressResp}
              pagination={{
                showQuickJumper: true,
                pageSize: 10
              }}
              style={{ width: '100%' }}
              search={{
                labelWidth: 120,
                optionRender: (searchConfig, props, dom) => [
                  ...dom.reverse(),
                  <Button type='primary' onClick={()=>{  }}>新增</Button>
                ]
              }}
            />
          </Row>
        </div>
      </Spin>
    </Drawer>
  )
}

export default Detail;
