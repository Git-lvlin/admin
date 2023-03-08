import React, { useRef } from 'react'
import { InputNumber } from 'antd'

type RangeInputProps = {
  onChange?: (v: { min?: number, max?: number }) => void,
  beforePlaceholder?: string,
  afterPlaceholder?: string
}

const RangeNumberInput: React.FC<RangeInputProps> = ({
  onChange = () => { },
  beforePlaceholder = '请输入最低金额',
  afterPlaceholder = '最高金额'
}) => {

  const min = useRef<number>()
  const max = useRef<number>()

  return (
    <div className='ant-input-affix-wrapper'>
      <InputNumber
        placeholder={beforePlaceholder}
        bordered={false}
        controls={false}
        onChange={(e: number) => {
          if(e !== 0 && e) min.current = e;
          onChange({ min: e, max: max.current })
        }} />
      ~
      <InputNumber
        placeholder={afterPlaceholder}
        bordered={false}
        controls={false}
        onChange={(e: number) => {
          if(e !== 0 && e) max.current = e;
          onChange({ max: e, min: min.current })
        }} />
    </div>
  )
}

export default RangeNumberInput
