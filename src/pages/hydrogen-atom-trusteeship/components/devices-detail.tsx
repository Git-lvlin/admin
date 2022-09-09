import { useEffect, useState } from "react"
import { 
  Drawer, 
  Pagination, 
  Spin, 
  Empty, 
  Divider, 
  Space,
  Typography 
} from "antd"
import moment from "moment"

import type { FC } from "react"
import type { DevicesProps, DataProps } from "./data"

import { 
  devicePage, 
  payPage, 
  getHostingTotalNum,
  getHostingPendingPut,
  getHostingPendingNum,
  getHostingIngNum,
  getHostingStopNum,
  hostingLease
} from "@/services/hydrogen-atom-trusteeship/managed-transaction-data"
import { getOptLog, leaseList } from "@/services/hydrogen-atom-trusteeship/equipment-management"
import styles from "./styles.less"
import { amountTransform } from "@/utils/utils"
import Export from "@/components/export"

const { Title } = Typography

const DevicesDetail: FC<DevicesProps> = (props) => {
  const {
    visible, 
    setVisible, 
    type, 
    showTitle, 
    storeNo, 
    deviceNum,
    user, 
    amount,
    imei,
    normal,
    deductible
  } = props

  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number | undefined>(10)
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(false)
  const [data, setData] = useState<DataProps[]>([])
  const [curData, setCurData] = useState<DataProps[]>([])
  const [month, setMonth] = useState<string>()
  const [checked, setChecked] = useState<string>('normal')
  
  const api = {
    1: devicePage,
    2: devicePage,
    3: devicePage,
    4: payPage,
    5: getHostingTotalNum,
    6: getHostingPendingPut,
    7: getHostingPendingNum,
    8: getHostingIngNum,
    9: getHostingStopNum, 
    10: getOptLog,
    11: leaseList,
    12: hostingLease
  }[type]

  const params = {
    1: {
      storeNo,
      status: 'awaiting'
    },
    2: {
      storeNo,
      status: 'operating'
    },
    3: {
      storeNo,
      status: 'terminated'
    },
    4: {
      memberId: storeNo,
      status: checked
    },
    5: {
      hostingMemberId: storeNo
    },
    6: {
      hostingMemberId: storeNo
    },
    7: {
      hostingMemberId: storeNo
    },
    8: {
      hostingMemberId: storeNo
    },
    9: {
      hostingMemberId: storeNo
    }, 
    10: {
      orderId: storeNo
    },
    11: {
      orderId: storeNo,
      type: 'list'
    },
    12: {
      memberId: storeNo
    }
  }

  useEffect(()=>{
    api?.({
      ...params[type],
      page,
      size: pageSize
    }).then((res: any) => {
      setLoad(false)
      setData(res.data)
      setPageTotal(res.total)
      setMonth(res.monthSum)
    })
   
  }, [pageSize, page, checked])

  useEffect(()=> {
    if(type === 11) {
      leaseList({
        orderId: storeNo,
        type: 'currDetail'
      }).then(res => {
        setCurData(res.data)
      })
    }
  }, [storeNo])

  const pageChange = (a: number, b?: number) => {
    setPage(a)
    setPageSize(b)
  }

  const objTitle = {
    1: `待运营设备（用户:${user}）`,
    2: `运营中设备（用户:${user}）`,
    3: `停止运营设备（用户:${user}）`,
    4: `运营服务费（用户:${user}）`,
    5: `托管购买信息（用户:${user}）`,
    6: `待投放设备（用户:${user}）`,
    7: `待运营设备（用户:${user}）`,
    8: `运营中设备（用户:${user}）`,
    9: `终止托管设备（用户:${user}）`,
    10: `操作日志（机器ID：${imei} 操作:${pageTotal}次）`,
    11: (
      <Space>
        <div>缴租明细（用户：{user} 机器ID:{imei} ）</div>
        <Export 
          type='healthyDeviceLease' 
          conditions={{orderId: storeNo}}
          slot={<a>导出</a>}
          slotHistory={(e)=><a onClick={e}>···</a>}
          placement='bottom'
        />
      </Space>
    ),
    12: `托管管理费（用户:${user}）`
  }

  const cardTitle = {
    1: `待运营设备数：${deviceNum}台`,
    2: `运营中设备数：${deviceNum}台`,
    3: `停止运营设备数：${deviceNum}台`,
    4: (
      <Space size={20}>
        <div>总金额：{amountTransform(amount, '/')}元</div>
        <Space size={10}> 
          <a 
            style={{color: checked === 'normal' ? '#1890ff' : '#fff'}}
            onClick={()=> setChecked('normal')}
          >
            正常：{normal}台
          </a>
          <a 
            style={{color: checked === 'deductible' ? '#1890ff' : '#fff'}}
            onClick={()=> setChecked('deductible')}
          >
            已扣除：{deductible}台
          </a>
        </Space>
      </Space>
    ),
    5: (
      <Space size={20}>
        <div>总金额：{amountTransform(amount, '/')}元</div>
        <div>总产品：{deviceNum}台</div>
      </Space>
    ),
    6: `待投放设备数：${deviceNum}台`,
    7: `待运营设备数：${deviceNum}台`,
    8: `运营中托管设备数：${deviceNum}台`,
    9: `总终止托管设备数：${deviceNum}台`,
    12: (
      <Space size={20}>
        <div>总金额：{amountTransform(amount, '/')}元</div>
        <div>总租期：{month}个月</div>
      </Space>
    )
  }

  const orderPay = {
    0: '模拟支付',
    1: '支付宝',
    2: '微信',
    3: '小程序',
    4: '银联',
    5: '钱包支付',
    6: '支付宝',
    7: '微信',
    8: '银联',
    9: '快捷支付'
  }

  const content = {
    1: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>机器ID：{item.imei}</div>
            <div>投资人手机号：{item.hostingMemberPhone}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{item.statusDesc}</div>
            <div>运营单号：{item.orderId}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    2: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>设备ID：{item.imei}</div>
            <div>激活时间：{item.activationTime}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>投资人手机号：{item.hostingMemberPhone}</div>
            <div>运营天数：{item.optDay}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    3: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>设备ID：{item.imei}</div>
            <div>激活时间：{item.activationTime}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>停止操作人：{item.optName}</div>
            <div>停止时间：{item.stopTime}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>停止原因：{item.  optContent}</div>
            <div>停止运营类型：{item.optTitle}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    4: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>{`${amountTransform(item.qualificationAmount, '/')}元`}</div>
            <div>支付方式：{orderPay[item.payType]}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{item.payTime}</div>
            <div>订单号：{item.payOrderNo}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>运营期限截止时间：{item.expireTime}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    5: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>{`${amountTransform(item.hostingPayAmount, '/')}元`}</div>
            <div>机器ID：{item.imei}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{moment(item.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
            <div>订单号：{item.hostingOrderId}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ), 
    6: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>{item.statusDesc}</div>
            <div>{item.contractDesc}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{item.afterSalesDesc}</div>
            <div>托管购买单号：{item.hostingOrderId}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    7: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>{item.storeHouseNumber}</div>
            <div>机器ID：{item.imei}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{item.storeName}</div>
            <div>运营单号：{item.hostingOrderId}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      ))
    ),
    8: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>设备ID：{item.imei}</div>
            <div>激活时间：{item.optTime}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>运营商姓名：{item.storeName}</div>
            <div>购买托管单号：{item.hostingOrderId}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>运营商店铺地址：{item.storeAddress}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      )) 
    ),
    9: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>设备ID：{item.imei}</div>
            <div>终止时间：{item.optTime}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>终止操作人：{item.optName}</div>
            <div>购买托管单号：{item.hostingOrderId}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>终止原因：{item.reason}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      )) 
    ), 
    10: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>操作动作：{item.optItem}</div>
            <div>操作人：{item.optName}（{item.optRole}）</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{item.optContent}</div>
            <div>操作时间：{item.createTime}</div>
          </div>
          <Divider style={{margin: '10px 0 24px 0'}}/>
        </div>
      )) 
    ),
    11: (
      <>
        <Title level={5}>当前设备管理费信息：</Title>
        <Divider style={{margin: '-5px 0 10px 0'}}/>
        {
          curData.length !== 0 ?
          <>
           
            <div className={styles.cardList}>
              <div>{curData?.[0]?.packageName}</div>
              <div>租期截至时间：{curData?.[0]?.leaseEnd}</div>
            </div>
            <div className={styles.cardListContent}>
              <div>金额：{amountTransform(curData?.[0]?.payAmount, '/')}</div>
              <div>支付时间：{curData?.[0]?.payTime}</div>
            </div>
            <div className={styles.cardListContent}>
              <div>支付方式：{curData?.[0]?.payTypeDesc}</div>
              <div>支付单号：{curData?.[0]?.payOrderSn}</div>
            </div>
            <Divider style={{margin: '10px 0 24px 0'}}/>
          </>: 
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
        <Title level={5}>历史管理费信息：</Title>
        <Divider style={{margin: '-5px 0 10px 0'}}/>
        {
          data.length !== 0 ?
          data?.map((item, idx) => (
            <div key={idx}>
              <div className={styles.cardList}>
              <div>{item.packageName}</div>
              <div>租期截至时间：{item.leaseEnd}</div>
            </div>
            <div className={styles.cardListContent}>
              <div>金额：{amountTransform(item.payAmount, '/')}</div>
              <div>支付时间：{item.payTime}</div>
            </div>
            <div className={styles.cardListContent}>
              <div>支付方式：{item.payTypeDesc}</div>
              <div>支付单号：{item.payOrderSn}</div>
            </div>
              <Divider style={{margin: '10px 0 24px 0'}}/>
            </div>
          )):
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
      </>
    ),
    12: (
      data?.map((item, idx) => (
        <div key={idx}>
          <div className={styles.cardList}>
            <div>{`${amountTransform(item.payAmount, '/')}元`}</div>
            <div>套餐类型：{item.leaseTitle}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>{item.payTime}</div>
            <div>支付方式：{orderPay[item.payType]}</div>
          </div>
          <div className={styles.cardListContent}>
            <div>租期天数：{item.leasePeriodDay}</div>
            <div>支付编号：{item.payOrderSn}</div>
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
      width={700}
      destroyOnClose={true}
    >
      <Spin delay={500} spinning={load}>
        {
          !showTitle &&
          <div className={styles.cardTitle}>
            {cardTitle[type]}
          </div>
        }
        {
          (data?.length !== 0 || curData.length !== 0) ?
          content[type]:
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        }
      </Spin>
      {
        (data?.length !== 0) &&
        <div className={styles.pagination}>
          <Pagination
            total={pageTotal}
            showTotal={(total, range) => `第${range[0]}-${range[1]}条/总共${total}条`}
            pageSize={pageSize}
            current={page}
            onChange={pageChange}
          />
        </div>
      }
    </Drawer>
  )
}

export default DevicesDetail