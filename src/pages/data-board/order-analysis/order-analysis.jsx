import React, { useState } from 'react'
import { PageContainer } from '@/components/PageContainer'
import moment from 'moment'

import SelectDate from "./select-date"
import OrderTransactionData from "./order-transaction-data"
import Chart from "./charts"
import IndicatorDataDetails from "./indicator-data-details"
import QueryPaidOrderDetails from './query-paid-order-details'
import RegionalOrderAnalysis from './regional-order-analysis'
import styles from './styles.less'

const OrderAnalysis = () => {
  const [rangePickerValue, setRangePickerValue] = useState([moment().startOf('day'), moment()])
  const [dateValue, setDateValue] = useState(2)
  const [status, setStatus] = useState()
  const [data, setData] = useState([])
  const [dataType, setDataType] = useState('总交易额')
  const [type, setType] = useState(1)

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
        setData={setData}
        setDataType={setDataType}
        dataType={dataType}
        type={type}
        setType={setType}
      />
      <IndicatorDataDetails
        index={type} 
        type={dateValue}
        dateTimeRange={rangePickerValue}
        dataType={dataType}
      />
      <QueryPaidOrderDetails/>
      <RegionalOrderAnalysis/>
    </PageContainer>
  )
}

export default OrderAnalysis
