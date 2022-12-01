import { useEffect, useState } from "react"
import { 
  Drawer, 
  Pagination, 
  Spin, 
  Empty, 
  Divider, 
} from "antd"

import type { FC } from "react"
import type { DetailProps, DataProps } from "./data"

import styles from "./styles.less"
import { getUseCardByCardNo } from "@/services/health-package-activities/store-health-card-management"
import moment from "moment"

const Detail: FC<DetailProps> = ({visible, setVisible, dataSource}) => {
  const [data, setData] = useState<DataProps[]>([])
  const [load, setLoad] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number | undefined>(10)
  const [pageTotal, setPageTotal] = useState<number>(0)

  useEffect(()=> {
    setLoad(true)
    getUseCardByCardNo({cardNo: dataSource?.cardNo}).then(res => {
      if(res.success) {
        setData(res.data)
        setPageTotal(res.total)
      }
    }).finally(()=> {
      setLoad(false)
    })
  }, [])

  const pageChange = (a: number, b?: number) => {
    setPage(a)
    setPageSize(b)
  }

  return (
    <Drawer
      visible={visible}
      onClose={()=>setVisible(false)}
      title={`服务号${dataSource?.cardNo} 使用明细`}
      width={700}
      destroyOnClose={true}
    >
      <Spin delay={500} spinning={load}>
        <div className={styles.cardTitle}>
          服务所属人：{dataSource?.ownerMobile}  已用次数：{Number(dataSource?.totalNum) - Number(dataSource?.remainingNum)}，剩余{dataSource?.remainingNum}次
        </div>
        {
          data?.length !== 0 ?
          data?.map(item => (
            <div key={item.id}>
              <div className={styles.cardList}>
                <div>{moment(item.useTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
                <div>店铺编号：{item.useOrderNo}</div>
              </div>
              <div className={styles.cardListContent}>
                <div>设备ID：{item.useDeviceNo}</div>
                <div>订单号：{item.cardNo}</div>
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
