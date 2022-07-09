import React, { useState, useEffect } from 'react'
import { Input, Popover, InputNumber } from 'antd';

type EditTableInputProps = {
  value?: string,
  onChange?: (v: string) => void,
  rules: {
    message?: string,
    pattern?: RegExp,
    validator?: () => Promise<void>
  }[],
  inputNumber?: boolean
  now?: boolean
}

const EditTableInput: React.FC<EditTableInputProps> = ({
  value,
  onChange,
  rules,
  inputNumber = false,
  now = false,
  ...rest
}) => {

  const Component = inputNumber ? InputNumber : Input

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');

  const reset = () => {
    setContent('');
    setVisible(false);
  }

  const validator = async (v: string) => {
    for (let index = 0; index < rules.length; index += 1) {
      if (rules[index].pattern) {
        if (!(rules[index].pattern as RegExp).test(v)) {
          setContent(rules[index].message as string)
          setVisible(true)
          break
        } else {
          reset()
        }
      }

      if (rules[index].validator) {
        try {
          await rules[index].validator(v)
          reset()
        } catch (_) {
          setContent(_ as string)
          setVisible(true)
          break
        }
      }

      if (!rules[index].pattern && !rules[index].validator) {
        if (!`${v}`.replace(/\s/, '')) {
          setContent(rules[index].message as string)
          setVisible(true)
          break
        } else {
          reset()
        }
      }
    }
  }

  useEffect(() => {
    if (now) {
      validator(value)
    }
  }, [])

  return (
    <Popover
      visible={visible}
      content={<span style={{ color: 'red' }}>{content}</span>}
    >
      <Component
        status={visible ? 'error' : ''}
        value={value}
        onChange={(e) => {
          onChange(inputNumber ? e as string : (e as React.ChangeEvent<HTMLInputElement>).target.value);
          if (rules.length) {
            validator(inputNumber ? e as string : (e as React.ChangeEvent<HTMLInputElement>).target.value)
          }
        }}
        {...rest}
      />
    </Popover>
  )
}

export default EditTableInput
