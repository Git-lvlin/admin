import { useState, useEffect } from 'react'
import { Image, Spin } from 'antd'

import { voucherDetail } from '@/services/outpatient-service-management/county-service-providers-management'

type Props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
}

const Detail:React.FC<Props> = (props) => {
  const {visible, setVisible, id} = props
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState([])

  useEffect(()=> {
    setLoading(true)
    voucherDetail({
      subOrderSn: id
    }).then(res => {
      if(res.code === 0) {
        setDataSource(res.data?.voucher)
      }
    }).finally(()=> {
      setLoading(false)
    })
  }, [])

  return (
    <>
      <div style={{ display: 'none' }}>
        
          <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Spin spinning={loading}>
            {
              dataSource.map(res=> (
                <div key={res}>
                  <Image src={res} height='200px'/>
                </div>
              ))
            }
        </Spin>
          </Image.PreviewGroup>
      </div>
  </>
  )
}

export default Detail