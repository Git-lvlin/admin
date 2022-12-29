import { useState, useEffect } from 'react'
import { Space, Radio, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import type { Moment } from 'moment'
import type { FC } from 'react'
import { BarChartDataPorps } from './data'
import type { RadioChangeEvent } from'antd'

import SelectDate from './SelectDate'
import styles from './styles.less'
import { getTimeDistance } from '@/utils/utils'
import BarChart from './bar-chart'
import { 
  cityAgencySortOrderTotalNum,
  cityAgencySortOrderTotalAmount, 
  cityAgencySortOrderTotalIncome
} from "@/services/data-board/city-office-data"

const RankingOffice = () => {
  const [rangePickerValue, setRangePickerValue] = useState(getTimeDistance('nearly-7-days'))
  const [purchaseOrder, setPurchaseOrder] = useState<string>('')
  const [dataType, setDataType] = useState<number>(1)
  const [BarChartData, setBarChartData] = useState<BarChartDataPorps[]>([])
  const [type, setType] = useState<string>('社区店采购单总数量')

  const api = {
    1: cityAgencySortOrderTotalNum,
    2: cityAgencySortOrderTotalAmount,
    3: cityAgencySortOrderTotalIncome
  }[dataType]

  const code = {
    1: 'cityAgencySortOrderTotalNum',
    2: 'cityAgencySortOrderTotalAmount',
    3: 'cityAgencySortOrderTotalIncome'
  }[dataType]

  useEffect(()=> {
    api?.({
      startTime: rangePickerValue && rangePickerValue[0].format('YYYY-MM-DD HH:mm:ss'),
      endTime: rangePickerValue && rangePickerValue[1].format('YYYY-MM-DD HH:mm:ss'),
      type_id: purchaseOrder
    }).then(res=> {
      setBarChartData(res.data)
    })
  }, [dataType, purchaseOrder, rangePickerValue])

  const selectDate = (type: string) => {
    setRangePickerValue(getTimeDistance(type))
  }

  const handleRangePickerChange = (value: Moment[]) => {
    setRangePickerValue(value)
  }

  const purchaseOrderChange = (e: RadioChangeEvent) => {
    setPurchaseOrder(e.target.value)
  }

  const dataTypeChange = (e: RadioChangeEvent) => {
    setDataType(e.target.value)
    switch (e.target.value) {
      case 1:
        setType('社区店采购单总数量')
        break
      case 2:
        setType('社区店采购单总金额')
        break
      case 3:
        setType('社区店采购单总收益排名')
        break
      default:
        setType('')
        break
    }
  }

  return (
    <>
      <div className={styles.timeSearch}>
        <Space size={10}>
          <h3>市办事处排名</h3>
          <SelectDate
            selectDate={selectDate}
            rangePickerValue={rangePickerValue}
            handleRangePickerChange={handleRangePickerChange}
            code={code}
            type={purchaseOrder}
          />
        </Space>
      </div>
      <div className={styles.radioArea}>
        <div>
          <Space size={5}>
            <div>采购单类型（单选）：</div>
            <Radio.Group 
              onChange={purchaseOrderChange}
              value={purchaseOrder}
              size="large"
            >
              <Radio value=''>新集约商品 + 旧集约商品</Radio>
              <Radio value='30'>新集约商品</Radio>
              <Radio value='15'>旧集约商品</Radio>
            </Radio.Group>
          </Space>
        </div>
        <div className={styles.dataType}>
          <Space size={5}>
            <div>数据类型（单选）：</div>
            <Radio.Group 
              onChange={dataTypeChange}
              value={dataType}
              size="large"
            >
              <Radio value={1}>
                <Title type={1}/>
              </Radio>
              <Radio value={2}>
                <Title type={2}/>
              </Radio>
              <Radio value={3}>
                <Title type={3}/>
              </Radio>
            </Radio.Group>
          </Space>
        </div>
        <BarChart
          data={BarChartData}
          type={type}
        />
      </div>
    </>
  )
}

const Title: FC<{type: number}> = ({type}) => {

  const label = {
    1: '指采购单已支付的订单数量总和(所有覆盖范围内的社区店)',
    2: '指采购单的总实付金额(所有覆盖范围内的社区店)',
    3: '从创建账号进行收益分账算起，某个时间段内获的收益总额'
  }[type]

  const content = {
    1: '社区店采购单总数量(单)',
    2: '社区店采购单总金额(元)',
    3: '社区店采购单总收益排名'
  }

  return (
    <Space size={6}>
      {content[type]}
      <Tooltip title={label}>
        <QuestionCircleOutlined />
      </Tooltip>
    </Space>
  )
}

export default RankingOffice
