import React, { useRef } from 'react'
import { Input } from 'antd';

type RangeInputProps = {
  onChange?: (v: { min: number | string, max: number | string }) => void,
}

const RangeInput: React.FC<RangeInputProps> = ({
  onChange = () => { },
}) => {

  const min = useRef('');
  const max = useRef('');

  return (
    <div className='ant-input-affix-wrapper' style={{ display: 'flex' }}>
      <Input
        placeholder='请输入最低金额'
        bordered={false}
        onChange={(e) => {
          const { value } = e.target;
          min.current = value;
          onChange({ min: value, max: max.current })
        }} />
      ~
      <Input
        style={{ paddingLeft: 20 }}
        placeholder='最高金额'
        bordered={false}
        onChange={(e) => {
          const { value } = e.target;
          max.current = value;
          onChange({ max: value, min: min.current })
        }} />
    </div>
  )
}

export default RangeInput
