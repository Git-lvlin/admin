import React, { useState, useMemo } from 'react'
import ProForm, { 
  ProFormList
} from '@ant-design/pro-form'
import { AutoComplete, Button, Space, Empty } from 'antd'
import { debounce } from 'lodash'

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { ListProps } from './data'

import styles from './styles.less'
import { goodsSpu } from '@/services/finger-doctor/health-detection-condition'

const { Option } = AutoComplete

const SingleScheme: FC<{formRef: React.MutableRefObject<FormInstance<any> | undefined>}> = ({formRef,fieldsName}) => {
  const [result, setResult] = useState<ListProps[]>([])
  const debounceFetcher =  useMemo(() => {
    const loadOptions = (value: string) => {
      goodsSpu({
        searchVal: value
      }).then((res) => {
        if (res.code === 0) {
          setResult(res.data.records.map((item: ListProps)=>({
            id: item.id,
            spuId: item.spuId,
            goodsName: item.goodsName,
            isMultiSpec: !!Number(item.isMultiSpec),
            goodsSaleMinPriceDisplay: item.goodsSaleMinPriceDisplay,
            goodsSaleMaxPriceDisplay: item.goodsSaleMaxPriceDisplay
          })))
        }
      })
    }
    return debounce(loadOptions, 800)
  }, [])

  const checkedValue = (e: string) => {
    const arr = result.filter(item=> item.id === parseInt(e))
    const list = formRef?.current?.getFieldsValue().list
    
    const newArr: string[] = []
    list.forEach((item: any) => {
      if(arr[0].id == item.goods) {
        newArr.push({...item, ...arr[0], goods: `spuID：${arr[0].spuId} ${arr[0].goodsName}`})
      } else {
        newArr.push({...item})
      }
    })
    formRef?.current?.setFieldsValue({
      list: newArr
    })
    
  }

  return (
    <ProFormList
      name={fieldsName}
      label="调理症状的产品方案"
      itemRender={({ listDom, action }, { record }) => ({listDom})}
      creatorButtonProps={false}
      initialValue={[{}]}
    >
      {
        (fields, { add, remove }) => {
          
          return(
          fields.map((res) => (
            <ProForm.Item
              name={[res.name, 'goods']}
              key={res.name}
              extra={(
                <Space size='small'>
                  <Button 
                    style={{position: 'absolute', left: '410px', top: 0}}
                    type='primary'
                    onClick={() => add()}
                  >
                    增加调理产品
                  </Button>
                  {
                    fields.length !== 1 && 
                    <Button 
                      style={{position: 'absolute', left: '530px', top: 0}}
                      type='primary'
                      danger
                      onClick={() => remove(res.name)}
                    >
                      删除
                    </Button>
                  }
                </Space>
              )}
            >
              <AutoComplete
                style={{width: '400px', position: 'relative'}}
                placeholder='输入调理症状的商品名称或spuID搜索'
                onSearch={debounceFetcher}
                onSelect={checkedValue}
                notFoundContent={<Empty/>}
              >
                {
                  result.map(item => (
                    <Option key={item.id}>
                      <div className={styles.option}>
                        <div>spuID：{item.spuId}  {item.goodsName}</div>
                        <div>零售价（元）：{item.isMultiSpec ? `${item.goodsSaleMinPriceDisplay} ~ ${item.goodsSaleMaxPriceDisplay}` :  `${item.goodsSaleMinPriceDisplay}`}</div>
                      </div>
                    </Option>
                  ))
                }
              </AutoComplete>
            </ProForm.Item>
          ))
        )}
      }
    </ProFormList>
  )
}

export default SingleScheme
