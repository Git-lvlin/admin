import { useState, useEffect, useRef } from "react"
import { Drawer, Pagination, Spin, Empty, Divider, Space, Button, DatePicker } from "antd"
import ProForm from '@ant-design/pro-form'

import type { FC } from "react"
import type { FormInstance } from "antd"
import type { DetailProps, DataProps } from "./data"
import { queryDetailPage } from '@/services/health-gift-package-activities/health-package-commission'
import styles from "./styles.less"
import { amountTransform } from "@/utils/utils"
import moment from "moment"

const Detail: FC<DetailProps> = ({id, visible, setVisible, title}) => {
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number | undefined>(10)
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [load, setLoad] = useState<boolean>(false)
  const [data, setData] = useState<DataProps[]>([])
  const [query, setQuery] = useState<number>(0)

  const form = useRef<FormInstance>()

  useEffect(()=>{
    const {tradeMonth, ...rest} = form.current?.getFieldsValue()
    setLoad(true)
    queryDetailPage({
      memberId: id,
      page,
      size: pageSize,
      tradeMonth: tradeMonth && moment(tradeMonth).format('YYYY-MM'),
      ...rest
    }).then(res=> {
      setData(res.data.records)
      setPageTotal(res.data.total)
    }).finally(()=> {
      setLoad(false)
    })
    
  }, [pageSize, page, query])

  const pageChange = (a: number, b?: number) => {
    setPage(a)
    setPageSize(b)
  }

  return (
    <Drawer
      visible={visible}
      onClose={()=>setVisible(false)}
      title={`用户 ${title} 推荐的健康礼包交易明细`}
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
                <Space size={10} key='1'>
                  <Button type='primary' onClick={()=>form?.submit()}>查询</Button>
                  <Button onClick={()=>{form?.resetFields(); form?.submit()}}>重置</Button>
                </Space>
              ]
            }}
          >
            <ProForm.Item
              label='月度查询'
              name='tradeMonth'
            >
              <DatePicker picker="month"/>
            </ProForm.Item>
          </ProForm>
        }
      </Spin>
      {
        data?.length === 0 ?
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> :
        <>
          {
            data?.map((item, idx) => (
              <div key={idx}>
                <div className={styles.cardList}>
                  <div>{item?.packageName}</div>
                  <div>订单金额：{amountTransform(item?.amount,'/').toFixed(2)}</div>
                </div>
                <div className={styles.cardListContent}>
                  <div>{item.payTime}</div>
                  <div>订单号：{item.orderNo}</div>
                </div>
                <div className={styles.cardListContent}>
                  <div>{item?.tradeTypeDesc}：{amountTransform(item?.commission,'/')}元</div>
                  <div>下单人：{item.buyerMobile}</div>
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
            showQuickJumper
            onChange={pageChange}
          />
        </div>
      }
    </Drawer>
  )
}

export default Detail
