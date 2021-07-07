import React, { useState, useEffect, useRef } from 'react';
import { Cascader } from 'antd';
import { getProvinces, getChildArea } from '@/services/common';

const GcCascader = ({ value = [], onChange, ...rest }) => {
  const [data, setData] = useState([]);
  const pid = useRef();
  const loadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    getChildArea({ id: targetOption.value })
      .then(res => {
        targetOption.loading = false;
        targetOption.children = res.data.map(item => ({ label: item.name, value: item.id, isLeaf: !pid.current.includes(item.parentId) }));
        if (res.code === 0) {
          setData([...data])
        }
      })
  }

  const changeHandle = (v, selectedOptions) => {
    onChange(selectedOptions.map(item => ({ label: item.label, value: item.value })))
  }

  useEffect(() => {
    getProvinces()
      .then(res => {
        if (res.code === 0) {
          pid.current = res.data.map(item => item.id)
          setData(res.data.map(item => ({ label: item.name, value: item.id, isLeaf: false })))
        }
      })
  }, [])

  return (
    <Cascader value={value.map(item => item.value)} onChange={changeHandle} options={data} placeholder="请选择" loadData={loadData} changeOnSelect {...rest} />
  )
}

export default GcCascader;

