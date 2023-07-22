import { useState } from 'react'
import { DatePicker, Space, Select } from 'antd'

const DatePickers: React.FC<any> = ({value, onChange}) => {
  const [values, setValues] = useState(value)

  return (
    <Space>
      <DatePicker
        style={{width: '120px'}}
        value={values?.date}
        onChange={(e) => {
          const obj = {
            date: e,
            select: values.select
          }
          setValues(obj)
          onChange(obj)
        }}
      />
      <Select
        style={{width: '180px'}}
        placeholder='请选择时段'
        value={values?.select}
        onChange={(e) => {
          const obj = {
            date: values.date,
            select: e
          }
          setValues(obj)
          onChange(obj)
        }}
        options={[
          { 
            value: 1,
            label: '上午8：00 — 10：00'
          },
          { 
            value: 2,
            label: '上午10：00 — 12：00'
          },
          { 
            value: 3,
            label: '下午14：00 — 16：00'
          },
          { 
            value: 4,
            label: '下午16：00 — 18：00'
          }
        ]}
      />
    </Space>
  )
}

export default DatePickers