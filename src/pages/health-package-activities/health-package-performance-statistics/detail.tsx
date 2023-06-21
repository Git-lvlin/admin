import { useEffect, useState } from "react"
import { 
  Drawer, 
  Spin, 
  Empty, 
  Divider, 
} from "antd"
import Pagination from '@/components/pagination'
import type { FC } from "react"
import type { DetailProps, DataProps } from "./data"

import styles from "./styles.less"
import { cardCityAgencyOrderPmDetail } from "@/services/health-package-activities/health-package-performance-statistics"
import { amountTransform } from "@/utils/utils"

const Detail: FC<DetailProps> = ({visible, setVisible, dataSource}) => {
  const [data, setData] = useState<DataProps[]>([])
  const [load, setLoad] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number | undefined>(10)
  const [pageTotal, setPageTotal] = useState<number>(0)

  useEffect(()=> {
    setLoad(true)
    cardCityAgencyOrderPmDetail({
      storeNo: dataSource?.storeNo,
      page,
      size: pageSize
    }).then(res => {
      if(res.success) {
        setData(res.data)
        setPageTotal(res.total)
      }
    }).finally(()=> {
      setLoad(false)
    })
  }, [page, pageSize])

  const pageChange = (a: number, b?: number) => {
    setPage(a)
    setPageSize(b)
  }

  return (
    <Drawer
      visible={visible}
      onClose={()=>setVisible(false)}
      title={`店铺${dataSource?.houseNumber} 绑定套餐订单明细`}
      width={700}
      destroyOnClose={true}
    >
      <Spin delay={500} spinning={load}>
        <div className={styles.cardTitle}>
          店主：{dataSource?.memberPhone}  绑定套餐订单数：{dataSource?.orderNums}单
        </div>
        {
          data?.length !== 0 ?
          data?.map((item, idx) => (
            <div key={idx}>
              <div className={styles.cardList}>
                <div>{item.packageName}</div>
                <div>订单金额：{amountTransform(item.payAmount, '/').toFixed(2)}</div>
              </div>
              <div className={styles.cardListContent}>
                <div>{item.createTime}</div>
                <div>订单号：{item.orderSn}</div>
              </div>
              <div className={styles.cardListContent}>
                <div>{item.cardNum}次</div>
                <div>下单人：{item.memberPhone}</div>
              </div>
              <Divider style={{margin: '10px 0 24px 0'}}/>
            </div>
          )):
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

export default Detail
