import React, { useRef } from 'react'
import { Select } from 'antd';

type RangeInputProps = {
  onChange?: (v: number ) => void,
  beforePlaceholder?: string,
  afterPlaceholder?: string,
  defaultValue: number
}

const RangeOvertime0rder: React.FC<RangeInputProps> = ({
  onChange = () => { },
  beforePlaceholder = '请选择',
  afterPlaceholder = '请选择',
  defaultValue = 5
}) => {

  const front = useRef<number>()
  const later = useRef<number>()

  return (
    <div className='ant-input-affix-wrapper' style={{ width: '400px', border:'none', display:'flex', alignItems: 'center', justifyContent:'space-between' }}>
      支付后超过
      <Select
        placeholder={beforePlaceholder}
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
        defaultValue={defaultValue}
        onChange={(e: number) => {
          onChange(e)
        }} />
      天还未发货的供应商
      {/* <Select
        placeholder={afterPlaceholder}
        style={{ width: 120 }}
        options={[
          { value: 'jack', label: '普通订单' },
          { value: 'lucy', label: '集约订单' },
        ]}
        onChange={(e: number) => {
          later.current = e;
          onChange({ later: e, front: front.current })
        }} /> */}
    </div>
  )
}

export default RangeOvertime0rder
