import { useEffect, useState } from "react"
import { 
  Drawer, 
  Pagination, 
  Spin, 
  Empty, 
  Divider, 
} from "antd"

import type { FC } from "react"
import { DetailProps } from "./data"

import styles from "./styles.less"

const Detail: FC<DetailProps> = ({visible, setVisible, sn}) => {
  const [data, setData] = useState([])
  const [load, setLoad] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number | undefined>(10)
  const [pageTotal, setPageTotal] = useState<number>(0)

  const pageChange = (a: number, b?: number) => {
    setPage(a)
    setPageSize(b)
  }

  return (
    <Drawer
      visible={visible}
      onClose={()=>setVisible(false)}
      title={`服务号${sn} 使用明细`}
      width={700}
      destroyOnClose={true}
    >
      <Spin delay={500} spinning={load}>
        <div className={styles.cardTitle}>
          服务所有人：{111}  已用次数：{222}，剩余{333}次
        </div>
        {
          data?.length !== 0 ?
          data?.map((item, idx) => (
            <div key={idx}>
              <div className={styles.cardList}>
                <div>{}</div>
                <div>店铺编号：{}</div>
              </div>
              <div className={styles.cardListContent}>
                <div>设备ID：{}</div>
                <div>订单号：{}</div>
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
