import TimeSelect from '@/components/time-select'
import React, { useEffect, useState } from 'react';
import { Drawer, Descriptions, Divider, Row, Avatar, Typography, Spin} from 'antd';
import { getUser,userReport } from "@/services/finger-doctor/user-health-data-management"
import ProTable  from "@ant-design/pro-table"
import type { TableColumn, DetailProps, DataType } from './data'

const { Title } = Typography;

const columns: TableColumn[] = [
  {
    title: '',
    dataIndex: 'createTime',
    renderFormItem: () => <TimeSelect showTime={false}/>,
    hideInTable: true,
    search: {
      transform: (value) => ({
        startTime: value[0],
        endTime: value[1],
      }),
      config: {
        span: 8,
        width: 200,
      }
    },
    render: (_) => _
  },
  {
    title: '检测日期',
    dataIndex: 'createTime',
    hideInSearch: true,
    valueType: 'text',
    render: (_) => _
  },
  {
    title: '检测评估结果',
    dataIndex: 'checkResult',
    hideInSearch: true,
    valueType: 'text',
    render: (_) => _
  },
  {
    title: '测量值',
    dataIndex: 'checkVal',
    hideInSearch: true,
    valueType: 'text',
    render: (_) => _
  },
  {
    title: '体验时间',
    dataIndex: 'checkTime',
    hideInSearch: true,
    valueType: 'text',
    render: (_) => _
  },
  {
    title: '操作',
    dataIndex: 'reportUrl',
    hideInSearch: true,
    valueType: 'text',
    render: (_) =>{
      return <a href={_} target='_blank' rel='noopener noreferrer'>查看</a>
    }
  },
];

const Detail: React.FC<DetailProps> = (props) => {
  const { visible, setVisible, memberId } = props;
  const [detailData, setDetailData] = useState<DataType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (getUser({
      memberId
    }) as Promise<{ data: DataType, code: number }>).then(res => {
      if (res.code === 0) {
        setDetailData(res.data)
      }
    }).finally(() => {
      setLoading(false);
    })
  }, [memberId])

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
              <Avatar size={100} src={detailData?.icon} />
              <div>{detailData?.name}</div>
            </div>
            <Descriptions style={{ flex: 1 }} labelStyle={{ textAlign: 'right', width: 100, display: 'inline-block' }}>
              <Descriptions.Item label="手机号码">{detailData?.phone}</Descriptions.Item>
              <Descriptions.Item label="身高">{detailData?.height}</Descriptions.Item>
              <Descriptions.Item label="体重">
                {detailData?.weight}
              </Descriptions.Item>
              <Descriptions.Item label="性别">{detailData?.gender === 'men' ? '男' : '女'}</Descriptions.Item>
              {/* <Descriptions.Item label="婚姻状况">
                {detailData?.userType === 1 ? '已婚' : '未婚'}
              </Descriptions.Item> */}
              {/* <Descriptions.Item label="文化程度">
                {detailData?.createTime}
              </Descriptions.Item> */}
              <Descriptions.Item label="出生日期">
                {detailData?.birthday}
              </Descriptions.Item>
              {/* <Descriptions.Item label="工作单位">
                {detailData?.loginTime}
              </Descriptions.Item> */}
              <Descriptions.Item label="身份证号">
                {detailData?.identityNo}
              </Descriptions.Item>
              <Descriptions.Item label="联系地址">
                {detailData?.address}
              </Descriptions.Item>
              <Descriptions.Item label="电子邮箱">
                {detailData?.email}
              </Descriptions.Item>
            </Descriptions>
          </Row>

          <Row style={{ marginTop: 50 }}>
            <Title style={{ marginBottom: -10 }} level={5}>检测档案</Title>
            <Divider />
            <ProTable
              rowKey='checkVal'
              columns={columns}
              options={false}
              request={userReport}
              pagination={{
                showQuickJumper: true,
                pageSize: 10
              }}
              params={{
                memberId
              }}
              style={{ width: '100%' }}
              search={{
                layout: 'vertical',
                labelWidth: 120,
                optionRender: (searchConfig, props, dom) => [
                  ...dom.reverse()
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
