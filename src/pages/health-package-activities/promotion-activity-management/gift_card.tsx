import moment from 'moment'
import { 
  Button, 
  Modal, 
  Image, 
  Row, 
  Col 
} from 'antd'
import ProTable from '@ant-design/pro-table'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import type { GiftCardProps } from './data'

import { getCardSendLogList } from '@/services/health-package-activities/promotion-activity-management'

const GiftCard: FC<GiftCardProps> = ({visible, setVisible, id, data}) => {

  const handleCancel = () => {
    setVisible(false)
  }

  const Title = () => {
    return (
      <Row gutter={[32, 8]}>
        <Col span={6}>店主手机：{data?.memberPhone}</Col>
        <Col span={6}>店主姓名：{data?.realName}</Col>
        <Col span={6}>店铺编号：{data?.storeHouseNumber}</Col>
        <Col span={6}>店铺名称：{data?.storeName}</Col>
      </Row>
    )
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center'
    },
    {
      title: '获赠人手机',
      dataIndex: 'ownerMobile',
      align: 'center'
    },
    {
      title: '获赠次数',
      dataIndex: 'cardNum',
      align: 'center'
    },
    {
      title: '获赠次数有效截止日',
      dataIndex: 'expireTime',
      align: 'center',
      render: (_, r) => moment(r.expireTime * 1000).format('YYYY-MM-DD')
    },
    {
      title: '可调整凭证',
      dataIndex: 'url',
      align: 'center',
      render: (_, r) => {
        if(r.url) {
          return <Image src={r.url} width={80} height={80}/>
        } else {
          return '-'
        }
      }
    },
    {
      title: '店主已申请次数',
      dataIndex: 'applyNum',
      align: 'center'
    },
    {
      title: '操作人',
      dataIndex: 'lastEditor',
      align: 'center'
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      align: 'center',
      render: (_, r) => moment(r.createTime * 1000).format('YYYY-MM-DD')
    },
  ]

  return (
    <Modal
      visible={visible}
      title="吸氢服务累计增加次数详情"
      onCancel={handleCancel}
      width={900}
      footer={[
        <Button 
          key="back"
          onClick={handleCancel}
          type='primary'
        >
          返回
        </Button>
      ]}
    >
      <ProTable
        rowKey='id'
        columns={columns}
        headerTitle={<Title/>}
        search={false}
        pagination={false}
        params={{storeNo: id}}
        request={getCardSendLogList}
        options={false}
      />
    </Modal>
  )
}

export default GiftCard
