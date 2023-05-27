import { useState, useEffect } from 'react'
import { Drawer, Pagination, Spin, Empty } from 'antd'

import type { exportLogProps } from './data'

import { aedStatsRecord } from '@/services/product-performance-management/AED-program-transaction'
import styles from './styles.less'

const ExportLog: React.FC<exportLogProps> = ({visible, setVisible}) => {
  const [spin, setSpin] = useState<boolean>(true)
  const [data, setData] = useState<any[]>([])
  const [pageTotal, setPageTotal] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const [current, setCurrent] = useState(1)

  const getData =  () => {
    setSpin(true)
    aedStatsRecord({
      size: pageSize,
      page: current
    }).then(res=> {
      if(res.code === 0) {
        console.log(res.data.records);
        
        setPageTotal(res.data.total)
        setData(res.data.records)
      }
    }).finally(()=> {
      setSpin(false)
    })
  }

  useEffect(()=> {
    getData()
  }, [current])

  const pageChange = (a: number, b: number) => {
    setCurrent(a)
    setPageSize(b)
  }

  return (
    <Drawer
      visible={visible}
      onClose={()=> { setVisible(false) }}
      title='明细汇总说明：线上订单汇总为录入时线上的实际数据；线下订单数据由管理员手工编辑录入。'
      width={1200}
    >
      <Spin spinning={spin} delay={500}>
        {
          data.length === 0 &&
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
        }
        {
          data.map(res=> (
            <div className={styles.mTable} key={res.id}>
              <table>
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>业务项</th>
                    <th colSpan={2}>单独SPU保证金</th>
                    <th colSpan={6}>销售课程</th>
                    <th colSpan={6}>AED保证金订单</th>
                    <th colSpan={4}>AED合同签署情况</th>
                    <th>范围</th>
                    <th>录入人</th>
                    <th>录入时间 </th>
                  </tr> 
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan={4}>{res.id}</td>
                    <th>订单项</th>
                    <th>线上已交10000元保证金订单</th>
                    <th>线下已交10000元保证金订单</th>
                    <th>旧3800订单</th>
                    <th>线上 5&3800&13800&14300&4300订单</th>
                    <th>线下 5&3800&13800&14300&4300订单</th>
                    <th>线上4800区县订单</th>
                    <th>线下4800区县订单</th>
                    <th>课程订单总计</th>
                    <th>线上已交保证金订单</th>
                    <th>线下已交保证金订单</th>
                    <th>线上需交未交保证金订单</th>
                    <th>线下需交未交保证金订单</th>
                    <th>线上无需交保证金订单</th>
                    <th>线下无需交保证金订单</th>
                    <th>线上已签电子合同数</th>
                    <th>线下已签纸质合同数</th>
                    <th>已签合同数</th>
                    <th>未签合同数 </th>
                    <th rowSpan={4}>{res.scope}</th>
                    <th rowSpan={4}>{res.operateName}</th>
                    <th rowSpan={4}>{res.createTime}</th>
                  </tr>
                  <tr>
                    <th>订单数量</th>
                    <td>{res.onlineDopSimpleNum}</td>
                    <td>{res.offlineDopSimpleNum}</td>
                    <td>{res.oteOrderNum}</td>
                    <td>{res.onlineCourseNum}</td>
                    <td>{res.offlineCourseNum}</td>
                    <td>{res.onlineDcNum}</td>
                    <td>{res.offlineDcNum}</td>
                    <td>{res.courseNum}</td>
                    <td>{res.onlineDopNum}</td>
                    <td>{res.offlineDopNum}</td>
                    <td>{res.onlineDopMustNoNum}</td>
                    <td>{res.offlineDopMustNoNum}</td>
                    <td>{res.onlineDopNoNum}</td>
                    <td>{res.offlineDopNoNum}</td>
                    <td>{res.onlineContractNum}</td>
                    <td>{res.offlineContractNum}</td>
                    <td>{res.signContractNum}</td>
                    <td>{res.noSignContractNum}</td>
                  </tr>
                  <tr>
                    <th>小计金额（元）</th>
                    <td>{res.onlineDopSimpleAmount}</td>
                    <td>{res.offlineDopSimpleAmount}</td>
                    <td>{res.oteAmount}</td>
                    <td>{res.onlineCourseAmount}</td>
                    <td>{res.offlineCourseAmount}</td>
                    <td>{res.onlineDcAmount}</td>
                    <td>{res.offlineDcAmount}</td>
                    <td>{res.courseAmount}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td> 
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <th>总计金额（元）</th>
                    <td colSpan={7}>{res.totalAmount}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        }
      </Spin>
      <div className={styles.pagination}>
        <Pagination
          total={pageTotal}
          showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
          pageSize={pageSize}
          current={current}
          onChange={pageChange}
        />
      </div>
    </Drawer>
  )
}

export default ExportLog