import React, { useRef } from 'react'
import { Input } from 'antd';

type RangeInputProps = {
  onChange?: (v: { min: number | string, max: number | string }) => void,
  beforePlaceholder?: string,
  afterPlaceholder?: string
}

const RangeInput: React.FC<RangeInputProps> = ({
  onChange = () => { },
  beforePlaceholder = '请输入最低金额',
  afterPlaceholder = '最高金额'
}) => {

  const min = useRef('');
  const max = useRef('');

  return (
    <div className='ant-input-affix-wrapper' style={{ display: 'flex' }}>
      <Input
        placeholder={beforePlaceholder}
        bordered={false}
        onChange={(e) => {
          const { value } = e.target;
          min.current = value;
          onChange({ min: value, max: max.current })
        }} />
      ~
      <Input
        style={{ paddingLeft: 20 }}
        placeholder={afterPlaceholder}
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
