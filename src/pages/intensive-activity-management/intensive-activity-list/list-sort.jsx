import React, { useState, useEffect } from 'react'
import { Radio } from 'antd'

// import { getWholesaleList } from '@/services/intensive-activity-management/intensive-activity-list'

const ListSort = ({onChange, value}) => {
  // const [value, setValue] = useState(1)
  
  // useEffect(() => {
  //   getWholesaleList({
  //     page: 1,
  //     sortType: value
  //   })
  // }, [value])

  // const onChange = (e) => {
  //   setValue(e.target.value)
  //   actRef?.current?.reload()
  // }

  return (
    <div>
      <span>排序方式：</span>
      <Radio.Group onChange={(e)=>onChange(e.target.value)} value={value}>
        <Radio value={1}>默认</Radio>
        <Radio value={2}>补贴从高到底</Radio>
        <Radio value={3}>补贴从低到高</Radio>
      </Radio.Group>
    </div>
  )
}

export default ListSort
