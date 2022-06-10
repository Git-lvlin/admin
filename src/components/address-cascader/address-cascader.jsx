import React, { useState, useEffect, useRef } from 'react';
import { Cascader } from 'antd';
import { arrayToTree } from '@/utils/utils'

const GcCascader = ({ value = [], onChange, fieldProps,areaData, ...rest }) => {
  const [data, setData] = useState([]);

  const changeHandle = (v, selectedOptions = []) => {
    onChange(selectedOptions.map(item => ({ label: item.label, value: item.value })))
    console.log('ewrw',werwe)
  }

  useEffect(() => {
    const arr = arrayToTree(areaData || window.yeahgo_area)
    let str = JSON.stringify(arr)
    str = str.replace(/name/g, 'label').replace(/id/g, 'value')
    console.log('str',str)
    setData(JSON.parse(str))
  }, [])
  return (
    <Cascader value={value?.map(item => item.value)} onChange={changeHandle} options={data} placeholder="请选择" {...rest} />
  )
}

export default GcCascader;

