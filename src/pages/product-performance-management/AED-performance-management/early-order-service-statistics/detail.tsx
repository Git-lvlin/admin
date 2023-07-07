import { useRef } from 'react'
import ProTable from '@/components/pro-table'
import { Drawer } from 'antd'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'
import type { detailProps } from './data'

import { statisticsUserOrder } from '@/services/product-performance-management/early-order-service-statistics'
import styles from './styles.less'
import Export from '@/components/export'

const Detail:React.FC<detailProps> = ({ id, visible, setVisible, phone }) => {
  const form = useRef<FormInstance>()

  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center'
    },
    {
      title: '总订单号',
      dataIndex: 'sumOrderId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '总订单号',
      dataIndex: 'orderId',
      hideInTable: true
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.payTime) {
          return moment(r.payTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return '-'
        }
      }
    },
    {
      title: '服务数量',
      dataIndex: 'thinkCount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '待报名数',
      dataIndex: 'signUpPre',
      align: 'center',
      hideInSearch: true
    }, 
    {
      title: '待采样数',
      dataIndex: 'signUp',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '检测中数',
      dataIndex: 'check',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '已完成',
      dataIndex: 'done',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '退款中数',
      dataIndex: 'refund',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '已退款数',
      dataIndex: 'refunded',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <Drawer
      title={`下单人手机号：${phone} 下单人用户ID：${id}`}
      width={1200}
      visible={visible}
      onClose={()=> {setVisible(false)}}
      className={styles.desc}
    >
      <ProTable
        rowKey='sumOrderId'
        columns={columns}
        params={{memberId: id}}
        formRef={form}
        request={statisticsUserOrder}
        options={false}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='aed-scr-order-user'
              conditions={{...form.current?.getFieldsValue(), memberId: id}}
            />
          ]
        }}
      />
    </Drawer>
  )
}

export default Detail