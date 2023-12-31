import { useState, useEffect, useRef } from "react"
import { Drawer, Spin, Empty, Divider, Space, Button } from "antd"
import Pagination from '@/components/pagination'
import ProForm, { ProFormText } from '@ant-design/pro-form'
import moment from 'moment'

import type { FC } from "react"
import type { FormInstance } from "antd"
import type { DetailProps, DataProps } from "./data"

import { itemSum, listItemPage } from "@/services/city-office-management/health-gift-package-performance"
import styles from "./styles.less"
import Export from "@/components/export"
import { amountTransform } from "@/utils/utils"
import TimeSelect from '@/components/time-select'

const Detail: FC<DetailProps> = ({id, visible, setVisible, title}) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number | undefined>(10)
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [totalAmount, setTotalAmount] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(false)
  const [data, setData] = useState<DataProps[]>([])
  const [query, setQuery] = useState<number>(0)

  const form = useRef<FormInstance>()

  useEffect(()=>{
    const { time, ...rest } = form.current?.getFieldsValue()
    setLoad(true)
    listItemPage({
      cityOfficeId: id,
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      page,
      pageSize,
      ...rest
    }).then(res=> {
      setData(res.data)
      setPageTotal(res.total)
    }).finally(()=> {
      setLoad(false)
    })
    
  }, [pageSize, page, query])

  useEffect(()=> {
    const { time, ...rest } = form.current?.getFieldsValue()
    itemSum({
      cityOfficeId: id,
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }).then(res => {
      if(res.code === 0) {
        setTotalAmount(res.data.totalAmount)
      }
    })
  }, [])

  const getFieldsValue = () => {
    const { time, ...rest } = form.current?.getFieldsValue()
    return {
      cityOfficeId: id,
      startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
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
                  <Export type="exportHealthyGiftCityOfficeListItem" conditions={getFieldsValue} key='export'/>
                </Space>
              ]
            }}
          >
            <ProForm.Item
              name='time'
            >
              <TimeSelect />
            </ProForm.Item>
            <ProFormText
              name='orderNo'
              placeholder='请输入订单号'
            />
          </ProForm>
        }
      </Spin>
      {
        data?.length === 0 ?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
        <>
          <div className={styles.cardTitle}>累计业绩金额：{amountTransform(totalAmount, '/')}元</div>
          {
            data?.map((item, idx) => (
              <div key={idx}>
                <div className={styles.cardList}>
                  <div>{amountTransform(item.amount, '/')}元</div>
                  <div>{item.payTime}</div>
                </div>
                <div className={styles.cardListContent}>
                  <div>{item.buyerMobile}</div>
                  <div>订单号：{item.orderNo}</div>
                </div>
                <div className={styles.cardListContent}>
                  <div>{item.goodsName}</div>
                  <div>店铺编号：{item.shopMemberAccount}</div>
                </div>
                <div className={styles.cardListContent}>
                  <div></div>
                  <div>skuID：{item.skuId}</div>
                </div>
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

export default Detail
