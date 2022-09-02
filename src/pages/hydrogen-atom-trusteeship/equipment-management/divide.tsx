import { ModalForm } from "@ant-design/pro-form"
import { Button } from "antd"
import { history } from "umi"
import ProCard from "@ant-design/pro-card"

import type { FC } from "react"
import type { DivideProps } from "./data"

import styles from "./styles.less"
import DealAmount from "./deal-amount"
import DealAmounts from "./deal-amounts"

const Divide: FC<DivideProps> = ({visible, setVisible, data}) => {

  return (
    <ModalForm
      title={`累计分成明细（设备ID：${data?.imei}）`}
      visible={visible}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async()=>{
        return true
      }}
      submitter={{
        render: (props) => {
          return [
            <div className={styles.btn}>
              <a
                key="1"
                onClick={() => {setVisible(false); history.push('/hydrogen-atom-trusteeship/divided-configuration')}}
              >
                查看分成配置
              </a>
              <Button
                key="2"
                type="primary"
                onClick={()=> props?.submit()}
              >
                确定
              </Button>
            </div>
          ]
        }
      }}
    >
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="托管购买交易款">
          <DealAmount data={data} type={1}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="运营商培训服务费">
          <DealAmount data={data} type={2}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="运营商管理费套餐">
          <DealAmounts data={data} type={3}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="4" tab="设备启动费">
          <DealAmounts data={data} type={4}/>
        </ProCard.TabPane>
      </ProCard>
    </ModalForm>
  )
}

export default Divide