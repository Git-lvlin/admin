import { useState } from 'react'
import ProTable from '@ant-design/pro-table'
import { Drawer, Button, Image } from 'antd'

import type { FC } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import { goodsProps } from './data'

import { pushReportGoods } from '@/services/finger-doctor/health-detection-condition-push'
import Detail from '../health-detection-record-management/detail'

const PushGoods: FC<goodsProps> = ({id, title, setVisible, visible}) => {
  const [url, setUrl] = useState<string>()
  const [detailVisible, setDetailVisible] = useState<boolean>(false)

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
    <>
      <Drawer
        title={
          <div> 
            <span>用户手机号：{title?.phone}</span> 
            <span>检测报告编号：
              <a onClick={()=> {setDetailVisible(true); setUrl(title?.reportUrl)}}>{title?.id}</a>
            </span>
          </div>}
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
      {
        detailVisible&&
        <Detail
          url={url}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
    </>
  )
}

export default PushGoods
