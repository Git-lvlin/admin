import { useState, useRef } from 'react'
import ProCard from '@ant-design/pro-card'
import {
  Cascader,
  Space,
  Select,
  Tooltip,
  Button
} from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'

import type { OptionProps, IneerListProps } from "../data"

import styles from './styles.less'

const { Option } = Select

const SearchModal = () => {
  const [rulesList, setRulesList] = useState([{key:0}])
  const [innerList, setInnerList] = useState({})
  const form = useRef<number>(0)

  const options: OptionProps[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou'
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing'
        },
      ],
    },
  ]
  
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
              <Cascader 
                options={options} 
                displayRender={(label) =>{
                  return <span>{label[label.length - 1]}</span>
                }}
                showSearch
              />
              的
                <Select
                  showSearch
                  filterOption={(input, option) =>
                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                  }
                  style={{width: 110}}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
                {
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
                }
                <a 
                  onClick={()=> {
                    const obj = JSON.parse(JSON.stringify(innerList))
                    if(!obj[index]) obj[index] = []
                    obj[index].push({key: ++form.current})
                    setInnerList(obj)
                  }}
                >
                  筛选
                </a>
            </Space>
            {
              innerList[index]?.[0] &&
              innerList[index].map((item: IneerListProps, idx: number)=> (
                <div key={item.key} className={styles.innerList}>
                  <Space size='small'>
                    <Select
                      showSearch
                      filterOption={(input, option) =>
                        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                      }
                      style={{width: 120}}
                    >
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                    <Select
                      style={{width: 100}}
                    >
                      <Option value="equal">等于</Option>
                      <Option value="unequal">不等于</Option>
                      <Option value="lt">小于</Option>
                      <Option value="gt">大于</Option>
                      <Option value="section">区间</Option>
                      <Option value="value">有值</Option>
                      <Option value="unvalue">没值</Option>
                    </Select>
                    <Select
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
                    />
                    <span
                      onClick={()=>{
                        const arr = JSON.parse(JSON.stringify(innerList))
                        arr[index].splice(idx, 1)
                        setInnerList(arr)    
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
      <a
        className={styles.addRules}
        onClick={() => {
          const arr = JSON.parse(JSON.stringify(rulesList))
          arr.push({key: ++form.current})
          setRulesList(arr)
        }}
      >
        <PlusOutlined/>
        指标
      </a>
      <ProCard
        bordered
        className={styles.rulesCard}
      >
        <div className={styles.searchBtn}>
          <Space size="middle">
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
          </Space>
          <Button type='primary'>查询</Button>
        </div>
      </ProCard>
    </div>
  )
}

export default SearchModal
