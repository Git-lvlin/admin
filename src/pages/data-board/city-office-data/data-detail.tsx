import ProCard from '@ant-design/pro-card'

import MainData from './main-data'
import OtherData from './other-data'
import HydrogenData from './hydrogen-data'
import styles from './styles.less'

const DataDetail = () => {
  return (
    <div className={styles.detail}>
      <ProCard
        tabs={{type: 'line'}}
      >
        <ProCard.TabPane key="tab1" tab="市办事处主要交易数据明细">
          <MainData/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="市办事处其他交易数据明细">
          <OtherData/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab3" tab="市办事处氢原子相关交易数据明细">
          <HydrogenData/>
        </ProCard.TabPane>
      </ProCard>
    </div>
  )
}

export default DataDetail
