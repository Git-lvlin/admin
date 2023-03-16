import { useEffect, useRef } from 'react'
import ProForm, { 
  ProFormRadio, 
  ProFormDependency
} from '@ant-design/pro-form'

import type { FormInstance } from 'antd'
import type { FC } from 'react'
import type { ListProps } from './data'

import { editSolutions, solutions } from '@/services/finger-doctor/health-detection-condition'
import SingleScheme from './single-scheme'
import MultipleSchemes from './multiple-schemes'
import styles from './styles.less'

const Scheme: FC<{gender: string}> = ({gender}) => {
  const formRef = useRef<FormInstance>()

  useEffect(()=>{
    solutions({gender}).then(res => {
      const newArr: ListProps[] = []
      const obj = {}
      if(res.code === 0) {
        if(res.data.type === 1) {
          res?.data?.list.map((item: ListProps) => {
            item.goods.map(e => {
              newArr.push({...e})
            })
          })
          formRef.current?.setFieldsValue({
            type: res.data.type,
            list: newArr
          })
        } else {
          formRef.current?.setFieldsValue({
            type: res.data.type,
            multipleList: res?.data?.list.map((item: ListProps) => {
              const str = item.solution.map(res => {
                return res.name
              }).join(' ,  ')
              const id = item.solution.map(res => {
                return {
                  id: Number(res.id),
                  name: res.name
                }
              })
              obj['list'] = item.goods
              return {
                ...item, ...obj, solution: str, solutionId: id
              }
            })
          })
        }
      }
    })
  }, [])


  const submit = (v: any) => {
    const arr: string[] = []
    v['gender'] = gender
    if(v.type === 1) {
      v.list.forEach((res: ListProps)=> (
        arr.push(res.spuId.toString())
      ))
      v['list'] = {goods: arr}
    } else {
      v['list'] = v.multipleList.map((res: ListProps)=>({
        goods: res.list.map(item => item.spuId.toString()),
        name: res.name,
        solution: res.solutionId.map(item => item.id)
      }))
      delete v.multipleList
    }
    return new Promise<void>((resolve, reject) => {
      editSolutions(v, {showSuccess: true}).then(res=> {
        if(res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  return (
    <ProForm
      layout='horizontal'
      style={{background: '#fff', padding: '20px', marginTop: '10px'}}
      onFinish={async (v)=> {
        await submit(v)
      }}
      submitter={{
        searchConfig: {
          submitText: '确定'
        }
      }}
      formRef={formRef}
      className={styles.form}
    >
      <ProFormRadio.Group
        name="type"
        label="调理方案类型"
        initialValue={1}
        options={[
          {
            label: '单个调理方案',
            value: 1,
          },
          {
            label: '多个调理方案',
            value: 2,
          }
        ]}
      />
      <ProFormDependency name={['type']}>
        {({ type }) => {
          if(type === 1) {
            return <SingleScheme formRef={formRef} fieldsName="list" type="single"/>
          } else {
            return <MultipleSchemes formRef={formRef} gender={gender}/>
          }
        }}
      </ProFormDependency>
    </ProForm>
  )
}

export default Scheme