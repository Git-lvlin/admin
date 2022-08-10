import { Input, InputNumber } from 'antd'

import type { FC } from "react"
import type { RangeInputProps } from './data'

const RangeInput: FC<RangeInputProps> = ({firstPlaceholder , lastPlaceholder}) => {
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
      />
    </Input.Group>
  )
}

export default RangeInput
