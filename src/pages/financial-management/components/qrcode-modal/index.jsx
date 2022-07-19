import { useRef, useEffect } from "react"
import { ModalForm } from '@ant-design/pro-form'
import {QRCodeCanvas} from 'qrcode.react'
import { message } from 'antd'

import { amountTransform } from '@/utils/utils'
import { rechargeDetail } from '@/services/financial-management/yeahgo-virtual-account-management'

const QrCodeModal = (props) => {
  const {visible, setVisible, callback, data, payInfo, setChange, change} = props
  const timer = useRef()

  useEffect(() => {
    timer.current = setInterval(()=>{
      getStatus()
    }, 3000)
    return ()=> {
      clearInterval(timer.current)
    }
  }, [visible])

  const getStatus = () => {
    return new Promise((resolve, reject) => {
      rechargeDetail({
        rechargeNo: payInfo?.orderNo
      }).then(res => {
        if(res.data.paymentStatus === 'success') {
          clearInterval(timer.current)
          setChange(change + 1)
          callback()
          resolve()
        } else {
          reject('')
        }
      })
    })
  }

  return (
    <ModalForm
      title='账户充值'
      visible={visible}
      onVisibleChange={setVisible}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      width={500}
      submitter={{
        searchConfig: {
          submitText: '我已付款'
        },
        resetButtonProps: {
          style: {
            display: 'none'
          }
        }
      }}
      onFinish={async () => {
        message.error('请付款')
        await getStatus()
      }}
    >
      <div>充值账户：{data?.platform?.accountName}</div>
      <div style={{marginTop: 20}}>账户号码：{data?.platform?.sn}</div>
      <div style={{margin: '20px 0'}}>现有余额：￥{amountTransform(data?.platform?.balance, '/')}</div>
      <div style={{marginBottom: 20}}>支付方式：支付宝</div>
      <div>
        请使用支付宝扫码付款充值
        <QRCodeCanvas
          value={payInfo?.expend?.payInfo}
          size={128}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"Q"}
          includeMargin={false}
          imageSettings={{
            src: "https://pro-yeahgo-oss.yeahgo.com/publicMobile/files/zfb_logo.png",
            height: 30,
            width: 30,
            excavate: true,
          }}
        />
      </div>
    </ModalForm>
  )
}

export default QrCodeModal