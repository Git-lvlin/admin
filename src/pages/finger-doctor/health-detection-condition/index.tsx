import { useEffect, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProForm, { 
  ProFormRadio, 
  ProFormDependency
} from '@ant-design/pro-form'

import type { FormInstance } from 'antd'
import type { ListProps } from './data'

import { editSolutions, solutions } from '@/services/finger-doctor/health-detection-condition'
import SingleScheme from './single-scheme'
import MultipleSchemes from './multiple-schemes'
import styles from './styles.less'

const HealthDetectionCondition = () => {

  const formRef = useRef<FormInstance>()

  useEffect(()=>{
    solutions().then(res => {
      const newArr: ListProps[] = []
      if(res.code === 0) {
        res.data.list.map((item: {goods: ListProps[]}) => {
          item.goods.map(e => {
            newArr.push({...e, goods: `spuID：${e.spuId} ${e.goodsName}`})
          })
        })
        formRef.current?.setFieldsValue({
          type: res.data.type,
          list: newArr
        })
      }
    })
  }, [])

  const submit = (v: any) => {
    // v['list'] = v.list.map((res: ListProps)=> ({
    //   goods: [res.id]
    // }))
    console.log(v);
    
    // return new Promise<void>((resolve, reject) => {
    //   editSolutions(v, {showSuccess: true}).then(res=> {
    //     if(res.code === 0) {
    //       resolve()
    //     } else {
    //       reject()
    //     }
    //   })
    // })
  }

  return (
    <PageContainer title={false}>
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
              return <SingleScheme formRef={formRef}/>
            } else {
              return <MultipleSchemes formRef={formRef}/>
            }
          }}
        </ProFormDependency>
      </ProForm>
    </PageContainer>
  )
}

export default HealthDetectionCondition