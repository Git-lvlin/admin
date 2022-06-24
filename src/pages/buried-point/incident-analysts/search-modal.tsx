import { useState, useRef, useEffect } from 'react'
import ProCard from '@ant-design/pro-card'
import {
  Space,
  Select,
  Tooltip,
  Button,
  Input
} from 'antd'
import { CloseOutlined } from '@ant-design/icons'

import type { FC } from "react"
import type { 
  IneerListProps, 
  EventAnalysisProps, 
  OptionsProps, 
  AttrProps, 
  SearchModalProps 
} from "../data"

import styles from './styles.less'
import { metadataEventAnalysis, flindEventProperties } from "@/services/buried-point/incident-analysts"

const { Option } = Select

const SearchModal: FC<SearchModalProps> = ({setFormData, setTitle}) => {
  const [rulesList, setRulesList] = useState([{key:0, innerList: []}])
  const [options, setOptions] = useState<OptionsProps[]>([])
  const [eventAnalys, setEventAnalys] = useState<string>()
  const [attrOptions, setAttrOptions] = useState<OptionsProps[]>([])
  const [attr, setAttr] = useState<string[]>([])
  const [attrIpt, setAttrIpt] = useState<string[]>([])
  const form = useRef<number>(0)
  
  useEffect(()=> {
    metadataEventAnalysis().then(res => {
      setOptions(res?.data.map((item: EventAnalysisProps) => ({
        label:item.name,
        value: 'dwd_'+item.event,
        key: ++form.current
      })))
    })
  }, [])

  useEffect(()=> {
    setEventAnalys(options[0]?.value)
    setTitle(options[0]?.label)
  }, [options])
  
  useEffect(()=> {
    if(eventAnalys && attrOptions.length === 0) {
      flindEventProperties({
        table: eventAnalys
      }).then(res=> {
        setAttrOptions(res.data.map((item: AttrProps)=> ({
          label: item.comment,
          value: item.columnName,
          key: ++form.current
        })))
      })
    }
  }, [eventAnalys])

  const getAttrOption = () => {
    if(eventAnalys && attrOptions.length === 0) {
      flindEventProperties({
        table: eventAnalys
      }).then(res=> {
        setAttrOptions(res.data.map((item: AttrProps)=> ({
          label: item.comment,
          value: item.columnName,
          key: ++form.current
        })))
      })
    }
  }
  
  const onReset = () => {
    form.current = 0
    setRulesList([{key:0, innerList: []}])
    setEventAnalys('')
    setAttrOptions([])
    setAttr([])
    setAttrIpt([])
  }

  const submit = () => {
    const obj = {}
    attr.map((res, idx) => (
      obj[res] = attrIpt[idx]
    ))
    setFormData({type: eventAnalys, ...obj})
  }

  return (
    <div className={styles.search}>
      {
        rulesList?.[0] &&
        rulesList?.map((item, index) => (
          <ProCard
            bordered
            key={item.key}
            className={styles.rulesCard}
          >
            <Space size='middle'>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }
                style={{width: 200}}
                value={eventAnalys}
                onChange={(v, { children }: any)=> {
                  setTitle(children)
                  setEventAnalys(v)
                  setAttrOptions([])
                  setAttr([])
                  setRulesList([{key:0, innerList: []}])
                  setAttrIpt([])
                }}
              >
                {
                  options.map(item => (
                    <Option key={item.key} value={item.value}>{item.label}</Option>
                  ))
                }
              </Select>
              {/* {
                rulesList.length >= 2 &&
                <span
                  onClick={()=>{
                    const arr = JSON.parse(JSON.stringify(rulesList))
                    arr.splice(index, 1)
                    setRulesList(arr)
                  }}
                >
                  <Tooltip title='删除该条件'>
                    <CloseOutlined />
                  </Tooltip>
                </span>
              } */}
              {
                rulesList[index].innerList.length < attrOptions.length &&
                <a 
                  onClick={()=> {
                    const arr = JSON.parse(JSON.stringify(rulesList))
                    if(!arr[index].innerList) arr[index].innerList = [] 
                    arr[index].innerList.push({key: ++form.current})
                    setRulesList(arr)
                  }}
                >
                  筛选
                </a>
              }
            </Space>
            {
              rulesList[index].innerList?.[0] &&
              rulesList[index].innerList.map((item: IneerListProps, idx: number)=> (
                <div key={item.key} className={styles.innerList}>
                  <Space size='small'>
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                      }
                      style={{width: 120}}
                      onChange={(v)=> {
                        const arr = JSON.parse(JSON.stringify(attr))
                        arr[idx] = v
                        setAttr(arr)
                      }}
                      onFocus={()=> getAttrOption()}
                    >
                      {
                        attrOptions.map(item => (
                          <Option 
                            key={item.key} 
                            value={item.value}
                            disabled={attr.includes(item.value)}
                          >
                            {item.label}
                          </Option>
                        ))
                      }
                    </Select>
                    <span>等于</span>
                    {/* <Select
                      mode="multiple"
                      style={{ width: 200 }}
                      options={[
                        {
                          label: 1,
                          value: 1
                        },
                        {
                          label: 2,
                          value: 2
                        },
                        {
                          label: 3,
                          value: 3
                        }
                      ]}
                    /> */}
                    <Input 
                      onChange={(v)=>{
                        const arr = JSON.parse(JSON.stringify(attrIpt))
                        arr[idx] = v.target.value
                        setAttrIpt(arr)
                      }}
                    />
                    <span
                      onClick={()=>{
                        const arr = JSON.parse(JSON.stringify(rulesList))
                        const arr2 = JSON.parse(JSON.stringify(attr))
                        const arr3 = JSON.parse(JSON.stringify(attrIpt))
                        arr2.splice(idx, 1)
                        arr3.splice(idx, 1)
                        arr[index].innerList.splice(idx, 1)
                        setRulesList(arr)
                        setAttr(arr2)
                        setAttrIpt(arr3)
                      }}
                    >
                      <Tooltip title='删除该条件'>
                        <CloseOutlined />
                      </Tooltip>
                    </span>
                  </Space>
                </div>
              ))
            }
          </ProCard>
        ))
      }
      {/* <a
        className={styles.addRules}
        onClick={() => {
          const arr = JSON.parse(JSON.stringify(rulesList))
          arr.push({key: ++form.current})
          setRulesList(arr)
        }}
      >
        <PlusOutlined/>
        指标
      </a> */}
      {/* <ProCard
        bordered
        className={styles.rulesCard}
      >
       
      </ProCard> */}
       <div className={styles.searchBtn}>
        {/* <Space size="middle">
          <span>按</span>
          <Select
            showSearch
            filterOption={(input, option) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
            style={{width: 80}}
          >
            <Option value='11'>11</Option>
            <Option value='22'>22</Option>
            <Option value='33'>33</Option>
          </Select>
          <span>查看</span>
        </Space> */}
        <Space size='small'>
          <Button type='primary' onClick={()=> submit()}>查询</Button>
          <Button onClick={()=>onReset()}>重置</Button>
        </Space>
      </div>
    </div>
  )
}

export default SearchModal
