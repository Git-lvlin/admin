import { useEffect, useRef, useState } from 'react'
import ProForm, { 
  ProFormRadio, 
  ProFormDependency
} from '@ant-design/pro-form'

import type { FormInstance } from 'antd'
import type { FC } from 'react'
import type { ListProps, giftListProps } from './data'

import { giftPackage } from '@/services/finger-doctor/health-detection-condition'
import { editSolutions, solutions } from '@/services/finger-doctor/health-detection-condition'
import SingleScheme from './single-scheme'
import MultipleSchemes from './multiple-schemes'
import styles from './styles.less'
import SubmitModal from '../health-detection-condition-push/submit-modal'
import GiftList from './gift-list'

const Scheme: FC<{gender: string}> = ({gender}) => {
  const [submitVisible, setSubmitVisible] = useState<boolean>(false)
  const [dataSoure, setDataSoure] = useState<ListProps>()
  const [list, setList] = useState<giftListProps[]>([])
  const formRef = useRef<FormInstance>()

  useEffect(()=> {
    giftPackage().then(res => {
      if(res.code === 0) {
        setList(res.data.map((item: {goodsName: string, spuId: number}) => ({
          label: item.goodsName,
          value: item.spuId
        })))
      }
    })
  }, [])

  useEffect(()=>{
    solutions({gender}).then(res => {
      const newArr: (ListProps | number)[] = []
      const obj = {}
      if(res.code === 0) {
        if(res.data.type === 1 && res.data.list[0].goodsType === 1) {
          res?.data?.list.map((item: ListProps) => {
            item.goods.map(e => {
              newArr.push({...e})
            })
          })
          formRef.current?.setFieldsValue({
            type: res.data.type,
            goodsType: res.data.list[0].goodsType,
            list: newArr
          })
        } else if(res.data.type === 1 && res.data.list[0].goodsType === 2) {
          formRef.current?.setFieldsValue({
            type: res.data.type,
            goodsType: res.data.list[0].goodsType
          })
        } else if(res.data.type === 1 && res.data.list[0].goodsType === 3) {
          res?.data?.list.map((item: any) => {
            item.goods.map((e: any) => {
              newArr.push(parseInt(e.spuId))
            })
          })
          formRef.current?.setFieldsValue({
            type: res.data.type,
            goodsType: res.data.list[0].goodsType,
            goods: newArr
          })
        } else {
          formRef.current?.setFieldsValue({
            type: res.data.type,
            [`multipleList${res.data.type}`]: res?.data?.list.map((item: ListProps) => {
              const str = item.solution.map(res => {
                return res.name
              }).join(' ,  ')
              const id = item.solution.map(res => {
                return {
                  id: Number(res.id),
                  name: res.name
                }
              })
              if(res.data.type === 3) {
                obj['goods'] = item.goods.map(item => parseInt(item.spuId))
              } else {
                obj['list'] = item.goods
              }
              return { ...item, ...obj, solution: str, solutionId: id }
            })
          })
        }
      }
    })
  }, [])

  const submit = (v: any) => {
    const arr: string[] = []
    v['gender'] = gender
    if(v.type === 1 && v.goodsType === 2) {
      v['list'] = [{ goodsType: v.goodsType }]
      delete v.goodsType
    } else if(v.type === 1 && v.goodsType === 3) {
      v['list'] = [{ goods: v.goods, goodsType: v.goodsType }]
      delete v.goodsType
      delete v.goods
    } else if(v.type === 1 && v.goodsType === 1) {
      v.list.forEach((res: ListProps)=> (
        arr.push(res.spuId)
      ))
      v['list'] = [{ goods: arr, goodsType: v.goodsType }]
      delete v.goodsType
    } else {
      v['list'] = v[`multipleList${v.type}`].map((res: ListProps)=>({
        goods: v.type === 3 ? res.goods : res.list.map(item => item.spuId),
        name: res.name,
        solution: res.solutionId.map(item => item.id),
        sms: res.sms
      }))
      delete v[`multipleList${v.type}`]
    }
    setSubmitVisible(true)
    setDataSoure(v)
  }

  return (
    <>
      <ProForm
        layout='horizontal'
        style={{background: '#fff', padding: '20px', marginTop: '10px'}}
        onFinish={async (v)=> {
          submit(v)
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
              label: '多个礼包产品调理方案',
              value: 3,
            },
            {
              label: '多个秒约产品调理方案',
              value: 2,
            }
          ]}
        />
        <ProFormDependency name={['type']}>
          {({ type }) => {
            if(type === 1) {
              return (
                <ProFormRadio.Group
                  name="goodsType"
                  label="调理方案产品类型"
                  initialValue={1}
                  options={[
                    {
                      label: '健康礼包列表',
                      value: 2,
                    },
                    {
                      label: '指定健康礼包',
                      value: 3,
                    },
                    {
                      label: '秒约产品',
                      value: 1,
                    }
                  ]}
                />
              )
            } else {
              return (
                <MultipleSchemes 
                  formRef={formRef}
                  gender={gender} 
                  type={type}
                  key={type}
                  name={`multipleList${type}`}
                  giftData={list}
                />
              )
            }
          }}
        </ProFormDependency>
        <ProFormDependency name={['goodsType', 'type']}>
          {({ goodsType, type}) => {
            if(goodsType === 3 && type === 1) {
              return <GiftList fieldsName='goods' data={list}/>
            } else if(goodsType === 1 && type === 1) {
              return (
                <SingleScheme 
                  formRef={formRef} 
                  fieldsName="list" 
                  type="single"
                />
              )
            } else {
              return
            }
          }}
        </ProFormDependency>
      </ProForm>
      {
        submitVisible &&
        <SubmitModal
          visible={submitVisible}
          setVisible={setSubmitVisible}
          title="请确认要修改调理方案么？"
          data={dataSoure}
          callback={()=> setSubmitVisible(false)}
          api={editSolutions}
        />
      }
    </>
  )
}

export default Scheme