import { Button, Drawer } from 'antd'

import type { FC } from 'react'

interface props {
  url?: string
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Detail: FC<props> = ({url, visible, setVisible}) => {
  return (
    <Drawer
      title='健康检测报告详情'
      width={1200}
      footer={<Button type='primary' onClick={()=> setVisible(false)}>返回</Button>}
      visible={visible}
      onClose={()=> setVisible(false)}
    >
      <iframe src={url} frameBorder={0} style={{width: '100%',height: 'calc(100vh - 161px)', overflowY: 'auto'}}/>
    </Drawer>
  )
}

export default Detail
