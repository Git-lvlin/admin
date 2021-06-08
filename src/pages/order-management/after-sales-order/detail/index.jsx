import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'umi';
import styles from './styles.less';

const detail = props => {
  console.log(props);
  const params = useParams()
  return (
    <PageContainer
      header={{
        title: [
          // TODO:标题
          <div key="1" className={styles.detailTag}>售后单号 { params.id }</div>,
          <div key="2" className={styles.detailTitle}>{}</div>
        ]
      }}
    >
      <div>test</div>
    </PageContainer>
  )
}
export default detail