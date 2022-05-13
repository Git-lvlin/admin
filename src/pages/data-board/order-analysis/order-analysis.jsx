import React, { useState } from 'react'
import { PageContainer } from '@/components/PageContainer'
import moment from 'moment'

import SelectDate from "./select-date"
import OrderTransactionData from "./order-transaction-data"
import Chart from "./charts"
import styles from './styles.less'

const OrderAnalysis = () => {
  const [rangePickerValue, setRangePickerValue] = useState([moment().startOf('day'), moment()])
  const [dateValue, setDateValue] = useState(2)
  const [status, setStatus] = useState()

  return (
    <PageContainer title={false}>
      <OrderTransactionData
        time={rangePickerValue}
        status={dateValue}
        timeSelect={
          <SelectDate
            rangePickerValue={rangePickerValue}
            setRangePickerValue={setRangePickerValue}
            dateValue={dateValue}
            setDateValue={setDateValue}
            status={status}
            setStatus={setStatus}
          />
        }
      />
      <Chart
        time={rangePickerValue} 
        dateValue={dateValue}
      />
    </PageContainer>
  )
}

export default OrderAnalysis
