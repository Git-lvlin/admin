import React, { useState, useEffect } from 'react'
import { Space, Radio, Popconfirm } from 'antd'

import { tagSortSub, tagSortInfo } from '@/services/cms/member/member'

const Title = ({actRef}) => {
  const [value, setValue] = useState(1)
  
  // useEffect(() => {
  //   tagSortSub({
  //     tagType: 2,
  //     sortType: value
  //   })
  // }, [value])

  useEffect(() => {
    tagSortInfo({
      tagType: 2
    }).then(res => {
      setValue(res?.data?.sortType)
    })
  }, [])

  const randomSort = () => {
    setValue(1)
    tagSortSub({
      tagType: 2,
      sortType: 1
    })
    actRef?.current?.reload()
  }

  const manualSort = () => {
    setValue(2)
    tagSortSub({
      tagType: 2,
      sortType: 2
    })
    actRef?.current?.reload()
  }

  return (
    <Space size={50}>
        <h4>首页秒约爆品</h4>
        <div>
          <span>排序方式：</span>
          <Radio.Group value={value}>
            <Popconfirm title='确认要将排序方式变更为随机排序吗？' onConfirm={randomSort}>
              <Radio value={1}>随机排序</Radio>
            </Popconfirm>
            <Popconfirm title='确认要将排序方式变更为手工排序吗？' onConfirm={manualSort}>
              <Radio value={2}>手工排序</Radio>
            </Popconfirm>
          </Radio.Group>
        </div>
      </Space>
  )
}

export default Title
