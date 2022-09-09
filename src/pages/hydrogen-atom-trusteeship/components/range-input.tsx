import { useRef } from "react"
import { Input, InputNumber } from 'antd'

import type { FC } from "react"
import type { RangeInputProps } from './data'

const RangeInput: FC<RangeInputProps> = ({
  firstPlaceholder='最低数量',
  lastPlaceholder='最高数量',
  onChange= ()=>{}
}) => {
  const min = useRef<number>()
  const max = useRef<number>()

  return (
    <Input.Group compact>
      <InputNumber  
        style={{ 
          width: 100,
          textAlign: 'center',
          borderRight: 0
        }}
        min={0}
        placeholder={firstPlaceholder} 
        onChange={(v)=>{
          min.current = v
          onChange({min: v, max: max.current})
        }}
      />
      <Input
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
          background: 'transparent'
        }}
        placeholder="~"
        disabled
      />
      <InputNumber 
        style={{
          width: 100,
          textAlign: 'center',
          borderLeft: 0
        }}
        min={0}
        placeholder={lastPlaceholder}
        onChange={(v)=> {
          max.current = v
          onChange({min: min.current, max: v})
        }}
      />
    </Input.Group>
  )
}

export default RangeInput
