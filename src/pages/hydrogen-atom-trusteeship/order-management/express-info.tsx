import { useEffect, useState } from "react"
import { Timeline, Empty } from 'antd'
import{ ModalForm } from '@ant-design/pro-form'

import type { FC } from "react"
import type { ListProps, ExpressInfoProps } from "./data"

import { expressInfo } from "@/services/hydrogen-atom-trusteeship/order-management"
import styles from "./styles.less"

const { Item } = Timeline

const ExpressInfo: FC<ExpressInfoProps> = (props) => {
  const {visible, setVisible, data} = props
  const [list, setList] = useState<ListProps[]>([])

  useEffect(()=> {
    expressInfo({
      shippingCode: data?.orderId,
      expressType: data?.companyNo,
      mobile: data?.storePhone,
      deliveryTime: data?.deliveryTimeDesc
    }).then(res => {
      if(res.code === 0 ){
        setList(res.data?.deliveryList)
      }
    })
  }, [data])

const ShowLastStatus: FC = () => {
  if(list.length){
    return (
      <>
        {
          list.map((item)=>(
            <Item key={item.time}>
              <span className={styles.time}>{item.time}</span>
              {item.content}
            </Item>
          ))
        }
      </>
    )
  } else {
    return <Empty className={styles.empty}/>
  }
}

  return (
    <ModalForm
      title='物流跟踪'
      width={700}
      modalProps={{
        closable: true,
        destroyOnClose: true
      }}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async () => true}
    >
      <Timeline className={styles.timelineWarp}>
        <ShowLastStatus/>
      </Timeline>
    </ModalForm>
  )
}

export default ExpressInfo
