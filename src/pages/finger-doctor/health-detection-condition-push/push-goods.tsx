import ProTable from '@ant-design/pro-table'
import { Drawer, Button, Image } from 'antd'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import { goodsProps } from './data'

import { pushReportGoods } from '@/services/finger-doctor/health-detection-condition-push'

const PushGoods: FC<goodsProps> = ({id, title, setVisible, visible}) => {

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center',
      width: '15%'
    },
    {
      title: 'skuID',
      dataIndex: 'defaultSkuId',
      align: 'center'
    },{
      title: '商品图片',
      dataIndex: 'goodsImageUrl',
      align: 'center',
      render: (_, r) => <Image src={r.goodsImageUrl} width='80px' height='80px'/>
    },
    {
      title: '商品分类',
      dataIndex: 'gcId1Display',
      align: 'center',
      render: (_, r) => <span>{_}{r.gcId2Display}</span>
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      align: 'center'
    },
    {
      title: '零售价（元）',
      dataIndex: 'goodsSaleMinPriceDisplay',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'goodsStateDisplay',
      align: 'center'
    }
  ]

  return (
    <Drawer
      title={`用户手机号：${title?.phone}  检测报告编号：${title?.id}  推送时间：${title?.pushTime}`}
      width={1200}
      footer={<Button type='primary' onClick={()=> setVisible(false)}>返回</Button>}
      visible={visible}
      onClose={()=> setVisible(false)}
    >
      <ProTable
        rowKey='id'
        columns={columns}
        search={false}
        options={false}
        pagination={false}
        params={{reportId: id}}
        request={pushReportGoods}
      />
    </Drawer>
  )
}

export default PushGoods
