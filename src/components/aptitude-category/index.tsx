import { useEffect, useState } from 'react'
import MultiCascader from 'rsuite/lib/MultiCascader'
import { categoryAll } from '@/services/common'
import 'rsuite/lib/MultiCascader/styles'
import { arrayToTree } from '@/utils/utils'
import { message, Tag } from 'antd'
import './style.less'

import type { categoryDataProps, cascaderProps } from './data'

const CategoryMultiCascader: React.FC<cascaderProps> = (props) => {
  const { value, pId = 0, maxLength, onChange, ...rest } = props
  const [data, setData] = useState<categoryDataProps[]>([])
  const [categoryData, setCategoryData] = useState<categoryDataProps[]>([])
  const [uncheckData, setUncheckData] = useState<number[]>([])
  const [selectAreaKey, setSelectAreaKey] = useState<number[]>(value || [])

  useEffect(()=> {
    categoryAll()?.then(res => {
      if(res.code === 0) {
        setData(res.data.records.map((item: any) => ({
          ...item,
          level: item.level,
          pid: item.gcParentId
        })))
      }
    })
  }, [])

  useEffect(()=> {
    const arr = arrayToTree(data || [], pId)
    let str = JSON.stringify(arr)
    str = str.replace(/gcName/g, 'label').replace(/id/g, 'value')
    setCategoryData(JSON.parse(str))
  }, [data])

  useEffect(()=> {
    if(categoryData && categoryData.length) {
      const newVal = categoryData.filter(item => item.level === 1)
      setUncheckData(newVal.map(res => res.value))
    }
    return () => {
      setUncheckData([])
    }
  }, [categoryData])

  const renderMultiCascaderTag = (selectedItems: any[]) => {
    
    const titleArr: any[] = [];
    selectedItems.forEach(item => {
      const arr = [];
      let node = item.parent;
      arr.push(item.label)
      while (node) {
        if (node.pvalue !==-1) {
          arr.push(node.label)
        }
        node = node.parent;
      }
      titleArr.push({
        label: arr.reverse().join('-'),
        value: item.value
      })
    })

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          titleArr.map(item => (
            <Tag
              key={item.value}
              closable
              color="blue"
              style={{ marginBottom: 10 }}
              onClose={() => {
                setSelectAreaKey(selectAreaKey.filter(it => it !== item.value))
              }}
            >
              {item.label}
            </Tag>
          ))
        }
      </div>
    );
  }

  useEffect(() => {
    setSelectAreaKey(value || [])
  }, [value])

  return (
    <MultiCascader
      value={selectAreaKey}
      onChange={(e) => {
        if(e.length <= maxLength) {
          onChange?.(e)
          setSelectAreaKey(e)
        } else {
          message.error(`最多可以选择${maxLength}个分类`)
          return
        }
      }}
      data={categoryData}
      locale={{ searchPlaceholder: '输入商品分类名称' }}
      placeholder="请选择后台商品分类"
      uncheckableItemValues={uncheckData}
      renderValue={(value, selectedItems) => renderMultiCascaderTag(selectedItems)}
      {...rest}
    />
  )
}

export default CategoryMultiCascader;
