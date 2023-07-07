import { useState, useEffect } from 'react'
import { ModalForm } from '@ant-design/pro-form'
import{ Timeline, Empty, Spin } from 'antd'

import type { noticeProps } from './data'

import styles from './styles.less'
import { expressInfo } from "@/services/hydrogen-atom-trusteeship/order-management"

const { Item } = Timeline

const ExpressList: React.FC<noticeProps> = ({data, visible, setVisible}) => {
  const [express, setExpress] = useState<any>()
  const [load, setLoad] = useState(false)

  useEffect(()=> {
    setLoad(true)
    expressInfo({
      shippingCode: data?.shippingCode,
      expressType: data?.expressType,
      mobile: data?.consigneePhone,
      deliveryTime: data?.expressTime
    }).then(res => {
      if(res.code === 0 ){
        setExpress(res.data?.deliveryList)
      }
    }).finally(() => {
      setLoad(false)
    })
  }, [data])

  const showLastStatus = (lastStatus: any) => {
    if(lastStatus){
      return lastStatus?.map((item: any)=>(
        <Item key={item.time}>
          <span className={styles.time}>{item.time}</span>
          {item.content}
        </Item>
      ))
    } else {
      return <Empty className={styles.empty}/>
    }
  }

  return (
    <ModalForm
      title='快递消息'
      width={800}
      modalProps={{
        destroyOnClose: true,
        closable: true
      }}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async()=> true}
    >
      <Spin spinning={load} className={styles.timelineWarp}>
        <Timeline>
          {showLastStatus(express)}
        </Timeline>
      </Spin>
    </ModalForm>
  )
}

export default ExpressList