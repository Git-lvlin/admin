import { useState, useEffect } from 'react'
import ProForm, { 
  ProFormList,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form'
import { Button, Space } from 'antd'

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type{ data } from './data'

import SingeScheme from './single-scheme'
import SymptomList from './symptom-list'
import styles from './styles.less'

const MultipleSchemes: FC<{formRef: React.MutableRefObject<FormInstance<any> | undefined>, gender: string}> = ({formRef, gender}) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [tableData, setTableData] = useState<data[]>([])
  const [idx, setIdx] = useState(0)

  useEffect(()=> {
    const multipleList = formRef?.current?.getFieldsValue().multipleList
    const str = tableData.map(res=> {
      return res.name
    }).join(' ,  ')
    const id = tableData.map(res=> {
      return {
        id: res.id,
        name: res.name
      }
    })
    if(tableData.length !== 0) {
      multipleList[idx].solution = str
      multipleList[idx].solutionId = id
      formRef.current?.setFieldsValue({
        multipleList
      })
    }
  }, [tableData])
  
  return (
    <>
      <ProFormList
        name='multipleList'
        label='调理症状的产品方案'
        initialValue={[{}]}
        itemRender={({ listDom, action }, { record }) => ({listDom})}
      >
        {
          (fields, { add, remove }) => (
            fields.map((res, idx) => {
            return(
              <div key={res.name}>
                <ProForm.Group>
                  <ProFormText
                    name={[res.name, 'name']}
                    width='md'
                    fieldProps={{
                      addonBefore: `${idx + 1}、`,
                      placeholder: `方案${idx + 1}名称，前端展示，10个汉字以内`,
                      maxLength: 10
                    }}
                  />
                  <ProFormTextArea
                    name={[res.name, 'solution']}
                    width='xl'
                    fieldProps={{
                      placeholder: '请点击并选择检测列表勾选一个或多个调理的症状，已勾选症状将展示在此',
                      onFocus: () => {
                        const multipleList = formRef?.current?.getFieldsValue().multipleList
                        multipleList[res.name].solutionId ? setTableData(multipleList[res.name].solutionId) : setTableData([])
                        setVisible(true)
                        setIdx(res.name)
                      },
                      allowClear: false
                    }}
                  />
                </ProForm.Group>
                <ProForm.Group>
                  <div className={styles.multipleBtn}>
                    <Space size='small' className={styles.space}>
                      <Button onClick={()=> add()} type='primary'>增加调理方案</Button>
                      {
                        fields.length !== 1 && 
                        <Button onClick={()=> remove(res.name)} type='primary' danger>删除</Button>
                      }
                    </Space>
                    <SingeScheme formRef={formRef} fieldsName={[res.name, 'list']} type='multiple' idx={res.name}/>
                  </div>
                </ProForm.Group>
              </div>
            )}
          ))
        }
      </ProFormList>
      {
        visible&&
        <SymptomList
          visible={visible}
          setVisible={setVisible}
          gender={gender}
          callback={(v: data[]) => {
            setTableData(v.map(item => {
              return { ...item }
            }))
          }}
          skuData={tableData}
        />
      }
    </>
  )
}

export default MultipleSchemes