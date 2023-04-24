import ProCard from '@ant-design/pro-card'

import type { FC } from "react"

import PageContainer from '@/components/PageContainer'
import ClassifiedProhibitedWords from './classified-prohibited-words'
import GlobalProhibitedWords from './global-prohibited-words'

const ProhibitedWordsManagement: FC = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="1" tab="分类违禁词">
          <ClassifiedProhibitedWords />
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="全局违禁词">
          <GlobalProhibitedWords />
        </ProCard.TabPane>
        <ProCard.TabPane key="3" tab="含违禁词敏感词商品">
          
          </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default ProhibitedWordsManagement
