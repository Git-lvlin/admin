import { useState } from 'react'
import ProForm, { 
  ProFormList,
  ProFormText
} from '@ant-design/pro-form'
import { Button, Space } from 'antd'

import type { FC } from 'react'
import type { FormInstance } from 'antd'

import SingeScheme from './single-scheme'
import SymptomList from './symptom-list'
import styles from './styles.less'

const MultipleSchemes: FC<{formRef: React.MutableRefObject<FormInstance<any> | undefined>}> = ({formRef}) => {
  const [visible, setVisible] = useState<boolean>(false)
  
  return (
    <>
      <ProFormList
        name='multipleList'
        label='调理症状的产品方案'
        initialValue={[{}]}
      >
        {
          (fields, { add, remove }) => (
            fields.map((res, idx) => (
              <>
                <ProForm.Group>
                  <ProFormText
                    name='name'
                    width='md'
                    fieldProps={{
                      addonBefore: `${idx + 1}、`,
                      placeholder: `方案${idx + 1}名称，前端展示，10个汉字以内`
                    }}
                  />
                  <ProFormText
                    name='solution'
                    width='xl'
                    fieldProps={{
                      placeholder: '请点击并选择检测列表勾选一个或多个调理的症状，已勾选症状将展示在此',
                      onFocus: () => setVisible(true)
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
                    <SingeScheme formRef={formRef}/>
                  </div>
                  
                </ProForm.Group>
              </>
            )
          ))
        }
      </ProFormList>
      {
        visible&&
        <SymptomList
          visible={visible}
          setVisible={setVisible}
        />
      }
    </>
  )
}

export default MultipleSchemes