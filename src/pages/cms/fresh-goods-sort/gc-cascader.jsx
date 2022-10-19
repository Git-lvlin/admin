import React, { useState, useEffect } from 'react';
import { Cascader } from 'antd';
import { category } from '@/services/product-management/product-category';
import { goodsClassList } from '@/services/cms/fresh-goods-class';

const GcCascader = ({ value, onChange, isFresh, ...rest }) => {
  const [gcData, setGcData] = useState([]);

  const changeHandle = (v) => {
    onChange(v)
  }

  useEffect(() => {
      goodsClassList({}).then(res => {
            const data = res.data?.map(item => ({
              label: item.categoryName,
              value: item.id,
              children:item?.items?.map(ele=>({
                value: ele.id,
                label:ele.categoryName
              })),
            }));
            setGcData(data)
        })

    return () => {
      setGcData([])
    }
  }, [])

  return (
    <Cascader
      value={value}
      onChange={changeHandle}
      options={gcData}
      placeholder="请选择商品品类"
      {...rest}
    />
  )
}

export default GcCascader;

