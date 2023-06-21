import React, { useState, useEffect } from 'react';
import { Cascader } from 'antd';
import { categoryAll } from '@/services/common';
import { arrayToTree } from '@/utils/utils'

const GcCascader = ({ value, onChange, isFresh, supplierId, ...rest }) => {
  const [gcData, setGcData] = useState([]);

  const changeHandle = (v) => {
    onChange(v)
  }

  useEffect(() => {
    categoryAll({
      supplierId,
    })
      .then(res => {
        if (res.code === 0) {
          const data = res.data.records.filter(item => item.gcShow === 1).map(item => ({
            ...item,
            pid: item.gcParentId,
            label: item.fresh !== 0 ? <>{item.gcName}<span type={item.fresh} style={{ color: 'green' }}>({{ 1: '精装生鲜', 2: '散装生鲜' }[item.fresh]})</span></> : item.gcName,
            value: item.id,
          }))

          setGcData(arrayToTree(data).filter(item => item.children?.length > 0))
        }
      });
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
      // loadData={gcLoadData}
      displayRender={label => {
        if (label?.[0]?.props && label?.[1]?.props) {
          return <span>{label[0].props.children[0]}/{label[1].props.children[0]}<span style={{ color: 'green' }}>({label[0].props.children[1].props.type === 1 ? '精装生鲜' : '散装生鲜'})</span></span>
        }
        return label.join('/')
      }}
      {...rest}
    />
  )
}

export default GcCascader;

