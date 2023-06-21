import { useState, useEffect, useRef } from "react"
import { Drawer, Pagination, Spin, Empty, Divider, Space, Button } from "antd"
import ProForm, { ProFormText } from '@ant-design/pro-form'
import moment from 'moment'

import type { FormInstance } from "antd"
import type { DetailProps, DataProps } from "./data"

import { 
  newWholesaleCityAgencyComDetail,
  loveFeedBackComDetail,
  cityAgencyLifeHouseComDetail,
  healthyCardComDetail,
  cityAgencyGoodsStComDetail,
  listItemCommissionPage,
  itemCommissionPage,
  itemCommissionSum,
  commissionSum
} from "@/services/city-office-management/new-intensive-performance"
import styles from "./styles.less"
import Export from "@/components/export"
import { amountTransform } from "@/utils/utils"
import TimeSelect from '@/components/time-select'

const CommissionDetail: React.FC<DetailProps> = ({id, visible, setVisible, title, type, totalAmount}) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number | undefined>(10)
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(false)
  const [data, setData] = useState<DataProps[]>([])
  const [query, setQuery] = useState<number>(0)

  const form = useRef<FormInstance>()

  const api: any = {
    1: newWholesaleCityAgencyComDetail,
    2: loveFeedBackComDetail,
    3: cityAgencyLifeHouseComDetail,
    4: healthyCardComDetail,
    5: cityAgencyGoodsStComDetail,
    6: listItemCommissionPage,
    7: itemCommissionPage    
  }[type]

  const code = {
    1: 'newWholesaleCityAgencyComDetail',
    2: 'loveFeedBackComDetail',
    3: 'cityAgencyLifeHouseComDetail',
    4: 'healthyCardComDetail',
    5: 'cityAgencyGoodsStComDetail',
    6: 'exportHealthyGiftCityOfficeListItemCommission',
    7: 'doctorBootCityOfficeItemCommissionList'
  }[type]

  const showTime = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: {defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]},
    7: {defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]},
  }[type]

  useEffect(()=> {
    const { time, ...rest } = form.current?.getFieldsValue()
    if(type === 6) {
      itemCommissionSum({
        agencyId: id,
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        ...rest
      }).then(res => {
        if(res.code === 0) {
          setAmount(res.data.totalCommission)
        }
      })
    } else if(type === 7) {
      commissionSum({
        agencyId: id,
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD'),
        ...rest
      }).then(res => {
        if(res.code === 0) {
          setAmount(res.data.totalCommission)
        }
      })
    }
  }, [])

  useEffect(()=>{
    const { time, ...rest } = form.current?.getFieldsValue()
    setLoad(true)
    api({
      agencyId: id,
      startTime: (type === 6 || type === 7) ? time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss') : time && moment(time?.[0]).format('YYYY-MM-DD'),
      endTime: (type === 6 || type === 7) ? time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss') : time && moment(time?.[1]).format('YYYY-MM-DD'),
      page,
      pageSize,
      ...rest
    }).then((res: any)=> {
      setData(res.data)
      setPageTotal(res.total)
    }).finally(()=> {
      setLoad(false)
    })
    
  }, [pageSize, page, query])

  const getFieldsValue = () => {
    const { time, ...rest } = form.current?.getFieldsValue()
    return {
      agencyId: id,
      startTime: (type === 6 || type === 7) ? time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss') : time && moment(time?.[0]).format('YYYY-MM-DD'),
      endTime: (type === 6 || type === 7) ? time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss') : time && moment(time?.[1]).format('YYYY-MM-DD'),
      ...rest
    }
  }

  const pageChange = (a: number, b?: number) => {
    setPage(a)
    setPageSize(b)
  }

  return (
    <Drawer
      visible={visible}
      onClose={()=>setVisible(false)}
      title={title}
      width={700}
      destroyOnClose={true}
    >
      <Spin delay={500} spinning={load}>
        {
          <ProForm<FormInstance>
            layout="inline"
            formRef={form}
            onFinish={async () => {
              setPage(1)
              setQuery(query + 1)
              return true
            }}
            submitter={{
              render: ({form})=> [
                <Space size={10} key='1' className={styles.search}>
                  <Button type='primary' onClick={()=>form?.submit()}>查询</Button>
                  <Button onClick={()=>{form?.resetFields(); setQuery(query + 1)}}>重置</Button>
                  <Export type={code as string} conditions={getFieldsValue} key='export'/>
                </Space>
              ]
            }}
          >
            <ProForm.Item
              name='time'
            >
              <TimeSelect showTime={showTime as boolean} />
            </ProForm.Item>
            <ProFormText
              name='orderSn'
              placeholder='请输入订单号'
            />
          </ProForm>
        }
      </Spin>
      {
        data?.length === 0 ?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
        <>
          {
            (type === 6 || type === 7) ?
            <div className={styles.cardTitle}>累计提成金额：{amountTransform(amount, '/')}元</div> :
            <div className={styles.cardTitle}>累计提成金额：{amountTransform(totalAmount, '/')}元</div>
          }
          {
            data?.map((item, idx) => (
              <div key={idx}>
                <div className={styles.cardList}>
                  <div>{item.commissionDesc}元</div>
                  <div>{item.createTime}</div>
                </div>
                <div className={styles.cardListContent}>
                  <div>{item.memberPhone}</div>
                  <div>订单号：{item.orderNo}</div>
                </div>
                <div className={styles.cardListContent}>
                  {
                    type === 3 ? 
                    <div></div> :
                    <div>{item.goodsName}</div>
                  }
                  {
                    type === 5 ?
                    <div>数量：{item.quantity}</div> :
                    <div>店铺编号：{item.doorNumber}</div>
                  }
                </div>
                {
                  type !== 3 &&
                  <div className={styles.cardListContent}>
                    <div></div>
                    <div>skuID：{item.skuId}</div>
                  </div>
                }
                <Divider style={{margin: '10px 0 24px 0'}}/>
              </div>
            ))
          }
        </>
      }
      {
        data?.length !== 0 &&
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

export default CommissionDetail
