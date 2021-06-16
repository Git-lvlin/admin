import React from 'react'
import ProDescriptions from '@ant-design/pro-descriptions'
import { Image } from 'antd'
import ProCard from '@ant-design/pro-card'
import moment from 'moment'

import styles from './styles.less'
import './styles.less'


const PlatformDecision = props => {
  const { data, platformEvidenceImg, platformOpinion } = props

  const columns = [
    {
      title: '操作人',
      dataIndex: 'handleMan'
    },
    {
      title: '操作时间',
      dataIndex: 'handleTime',
      render: (_)=> moment(_).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '操作结果',
      dataIndex: 'winnerRole',
      valueType: 'select',
      valueEnum: {
        1: '买家胜诉',
        2: '买家败诉'
      }
    }
  ]

  const imageArr = () => {
    const imgUrl = platformEvidenceImg?.split(',')
    return imgUrl?.map((url, idx) => (
      <Image
        key={idx}
        width={80}
        src={url}
      />
    ))
  }

  return (
    <>
      <ProCard.Group>
        <ProDescriptions
          rowKey='orderNumber'
          className={styles.description}
          layout='horizontal'
          bordered
          title='平台处理结果'
          column={1}
          dataSource={data}
          columns={columns}
        />
      </ProCard.Group>
      <ProCard.Group className={styles.tabelRow}>
        <ProCard bordered className={styles.item}>
          <div className={styles.itemOpinion}>
            处理意见：
            <span>{ platformOpinion }</span>
          </div>
          <div className={styles.itemImg}>
            <div className={styles.itemTxt}>处理凭证：</div>
            <Image.PreviewGroup>
              { imageArr() }
            </Image.PreviewGroup>
          </div>
        </ProCard>
      </ProCard.Group>
    </>
  )
}

export default PlatformDecision