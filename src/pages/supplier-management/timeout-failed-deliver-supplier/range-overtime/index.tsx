import React from 'react'
import { Select } from 'antd';

type RangeInputProps = {
  onChange?: ( v: number ) => void,
  placeholder?: string,
}

const RangeOvertime: React.FC<RangeInputProps> = ({
  onChange = () => { },
  placeholder = '请选择',
}) => {


  return (
    <div className='ant-input-affix-wrapper' style={{ width: '400px', border:'none', display:'flex', alignItems: 'center', justifyContent:'space-between' }}>
      支付后距今超过
      <Select
        placeholder={placeholder}
        style={{ width: 120 }}
        options={[
          { value: 5, label: '5天' },
          { value: 7, label: '7天' },
          { value: 10, label: '10天' },
          { value: 15, label: '15天'},
          { value: 30, label: '30天'},
          { value: 60, label: '60天'},
          { value: 90, label: '90天'},
        ]}
        defaultValue={5}
        onChange={(e: number) => {
          onChange(e)
        }} />
      天还未发货的供应商
    </div>
  )
}

export default RangeOvertime
