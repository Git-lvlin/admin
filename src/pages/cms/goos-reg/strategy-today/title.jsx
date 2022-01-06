import React, { useState, useEffect } from 'react'
import { Space, Radio } from 'antd'

import { tagSortSub } from '@/services/cms/member/member'

const Title = ({actRef}) => {
  const [value, setValue] = useState(1)
  
  useEffect(() => {
    tagSortSub({
      tagType: 2,
      sortType: value
    })
  }, [value])

  const onChange = (e) => {
    setValue(e.target.value)
    actRef?.current?.reload()
  }

  return (
    <Space size={50}>
      <h3>首页秒约爆品</h3>
      <div>
        <span>排序方式：</span>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>随机排序</Radio>
          <Radio value={2}>手工排序</Radio>
        </Radio.Group>
      </div>
    </Space>
  )
}

export default Title
