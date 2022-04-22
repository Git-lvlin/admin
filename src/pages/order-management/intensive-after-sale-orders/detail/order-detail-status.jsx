import React from 'react'
import styles from './styles.less'

const AfterState = ({ stage }) => {
  const status = () => {
    switch(stage){
      case 1:
        return '待退款'
      case 2:
        return '退款完成'
      case 6:
        return '已取消'
    }
  }
  return (
    <div className={styles.detailTitle}>
      { status() }
    </div>
  )
}

const InterventionDetailStatus = props => {
  const { orderSn, status } = props
  return (
    <div className={styles.orderDetail}>
      <div>
        <div className={styles.detailTag}>
          售后单号
          <span>{orderSn}</span>
        </div>
        <AfterState stage={status}/>
      </div>
    </div>
  )
}

export default InterventionDetailStatus