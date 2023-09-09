import { useState, useEffect } from 'react'
import { Image } from 'antd'

import { voucherDetail } from '@/services/outpatient-service-management/county-service-providers-management'

type Props = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
}

const Detail:React.FC<Props> = (props) => {
  const {visible, setVisible, id} = props
  const [dataSource, setDataSource] = useState([])

  useEffect(()=> {
    voucherDetail({
      subOrderSn: id
    }).then(res => {
      if(res.code === 0) {
        setDataSource(res.data?.voucher)
      }
    })
  }, [])

  return (
    <>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          {
            dataSource.map(res=> (
              <Image src={res} key={res}/>
            ))
          }
        </Image.PreviewGroup>
      </div>
    </>
  )
}

export default Detail