import React, { useState, useEffect } from 'react';
import { Cascader } from 'antd';
import { category} from '@/services/product-management/product-category';

const GcCascader = ({ value, onChange }) => {
  const [gcData, setGcData] = useState([]);
  const gcLoadData = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    category({ gcParentId: targetOption.value })
      .then(res => {
        targetOption.loading = false;
        targetOption.children = res.data.records.map(item => ({ label: item.gcName, value: item.id }));
        if (res.code === 0) {
          setGcData([...gcData])
        }
      })
  }

  const changeHandle = (v) => {
    onChange(v)
  }

  useEffect(() => {
    if (value) {
      const [gcId1] = value
      category({ gcParentId: 0 })
        .then(res => {
          if (res.code === 0) {
            const gcId = gcId1
            const index = res.data.records.findIndex(item => item.id === gcId);
            const data = res.data.records.map(item => ({ label: item.gcName, value: item.id, isLeaf: false }));
            setGcData(data)

            category({ gcParentId: gcId })
              .then(res2 => {
                if (res2.code === 0) {
                  data[index].children = res2.data.records.map(item => ({ label: item.gcName, value: item.id }));
                  if (res.code === 0) {
                    setGcData([...data])
                  }
                }
              })
          }
        })
    } else {
      category({ gcParentId: 0 })
        .then(res => {
          if (res.code === 0) {
            const data = res.data.records.map(item => ({ label: item.gcName, value: item.id, isLeaf: false }));
            setGcData(data)
          }
        })
    }

    return () => {
      setGcData([])
    }
  }, [])

  return (
    <Cascader value={value} onChange={changeHandle} options={gcData} placeholder="请选择商品品类" loadData={gcLoadData} changeOnSelect />
  )
}

export default GcCascader;

