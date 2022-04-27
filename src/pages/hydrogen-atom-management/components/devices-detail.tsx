import { useEffect, useState } from "react"
import { Drawer, Pagination, Spin, Empty, Divider } from "antd"
import moment from "moment"

import type { FC } from "react"
import type { PropsDevices, PropsData, PropsStatistics } from "./data"

import { devices, consumerOrder, findOrderRecordList, queryMyCommissionDetail, findOptionLog } from "@/services/hydrogen-atom-management/transaction-data"
import styles from "./styles.less"
import { amountTransform } from "@/utils/utils"

const DevicesDetail: FC<PropsDevices> = (props) => {
  const {visible, setVisible, type, memberId, memberPhone, showTitle} = props

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(false)
  const [data, setData] = useState<PropsData[]>([])
  const [statistics, setStatistics] = useState<PropsStatistics>()

  const api = {
    1: devices,
    2: devices,
    3: findOrderRecordList,
    4: consumerOrder,
    5: queryMyCommissionDetail,
    6: findOptionLog
  }[type]

  const params = {
    1: {
      memberId,
      occupationMode: type
    },
    2: {
      memberId,
      occupationMode: type
    },
    3: !showTitle ? {
      memberId,
      flag: true
    }: 
    {
      memberDeviceId: memberId
    },
    4: !showTitle ?{
      occupantId: memberId
    }:
    {
      deviceImei: memberId
    },
    5: {
      buyId: memberId
    },
    6: {
      imei: memberId
    }
  }

  const options = {
    1: '绑定',
    2: '解绑',
    3: '激活',
    4: '启动',
    5: '禁用'
  }

  useEffect(()=>{
    setLoad(true)
    api?.(params[type]).then(res => {
      setLoad(false)
      setData(res.data.records)
      setPageTotal(res.data.total)
      setStatistics(res.data)
    })
  }, [])

  const pageChange = (a: number, b: number) => {
    setPage(a)
    setPageSize(b)
  }

  const objTitle = {
    1: `租赁明细（用户:${memberPhone}）`,
    2: `购买明细（用户:${memberPhone}）`,
    3: `缴租明细（用户:${memberPhone}）`,
    4: `启动明细（用户:${memberPhone}）`,
    5: `提成明细（用户:${memberPhone}）`,
    6: `操作日志 （机器ID：${memberId}操作：${pageTotal}次）`
  }

  const cardTitle = {
    1: (
      <>
        <span>总押金金额：{amountTransform(statistics?.totalOrderAmount, '/')}</span>
        <span>总产品：{statistics?.orderCount}</span>
      </>
    ),
    2: (
      <>
        <span>总金额：{amountTransform(statistics?.totalOrderAmount, '/')}</span>
        <span>总产品：{statistics?.orderCount}</span>
      </>
    ),
    3: (
      <>
        <span>总缴租金额：{amountTransform(statistics?.totalAmount, '/')}</span>
        <span>已租{statistics?.dateDoc}</span>
      </>
    ),
    4: <span>总启动金额：{amountTransform(statistics?.totalAmount, '/')}</span>,
    5: (
      <>
        <span>总金额：{amountTransform(statistics?.sumAmount, '/')}</span>
        <span>总产品：{statistics?.totalDriverCount}</span>
      </>
    ),
    6: ''
  }

  const content = {
    1: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>￥{amountTransform(item.orderAmount, '/')}元</div>
            <div>机器ID：{item.imei}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>订单号：{item.orderSn}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    2: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>￥{amountTransform(item.orderAmount, '/')}元</div>
            <div>机器ID：{item.imei}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>订单号：{item.orderSn}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    3: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>金额：{amountTransform(item.payAmount, '/')}元</div>
            <div>支付方式：{item.payTypeStr}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>租期：{item.leaseTerm}</div>
            <div>时间：{item.payTime}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>机器ID：{item.imei}</div>
            <div>支付编号：{item.id}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    4: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>金额：{amountTransform(item.orderAmount, '/')}元</div>
            <div>支付方式：{item.payType}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>启动时长：{item.deviceUseTime}</div>
            <div>时间：{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>机器ID：{item.imei}</div>
            <div>支付编号：{item.orderSn}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    5: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>+{amountTransform(item.amount, '/')}元</div>
            <div>
              {
                item.commissionType === 1 ? '购买' : '租赁'
              }
            </div>
          </div>
          <div className={styles.cardListContent}>
            <div>{item.createTime}</div>
            <div>机器ID：{item.imei}</div>
          </div>
          <div className={styles.cardListContentLast}>
            <div>支付编号：{item.orderNo}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    6: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>操作动作：{options[item.opType]}</div>
            <div>操作人：{item.createRole}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>被绑手机：{item.bindPhone}</div>
            <div>操作时间：{item.createTime}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    )
  }

  return (
    <Drawer
      visible={visible}
      onClose={()=>setVisible(false)}
      title={objTitle[type]}
      width={450}
      destroyOnClose={true}
    >
      <Spin delay={500} spinning={load}>
        {
          data?.length === 0 &&
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
        {
          (data?.length !== 0 && !showTitle) &&
          <div className={styles.cardTitle}>
            {cardTitle[type]}
          </div>
        }
        {
          content[type]
        }
      </Spin>
      {
        data?.length !== 0 &&
        <div className={styles.pagination}>
          <Pagination
            total={pageTotal}
            showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
            pageSize={pageSize}
            current={page}
            onChange={()=>pageChange}
          />
        </div>
      }
    </Drawer>
  )
}

export default DevicesDetail