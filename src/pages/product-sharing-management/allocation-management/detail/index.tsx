import { useState, useEffect } from 'react'
import { DrawerForm } from '@ant-design/pro-form'
import ProCard from '@ant-design/pro-card'
import moment from 'moment'

import Goods from './goods'
import Config from './config'
import { getConfigById } from '@/services/transaction-sharing-management/allocation-management'
import Preview from './preview'
import { amountTransform } from '@/utils/utils'

type detailProps = {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  id?: string
  callback: () => void
}

const Detail: React.FC<detailProps> = ({visible, setVisible, id, callback=()=> {}}) => {
  const [tableData, setTableData] = useState([])
  const [formData, setFormData] = useState<any>()
  const [editTableData, setEditTableData] = useState<any>()
  const [detailData, setDetailData] = useState<any>()
  const [data, setData] = useState<any>()
  const [previewVisible, setPreviewVisible] = useState(false)
  const [selectData, setSelectData] = useState()

  const submit = () => {
    const { time, platformLeastFee, billType, buyer, ...rest } = formData.current?.getFieldsValue()
    const arr = tableData.map((res: any) => ({
        ...res,
        id: 0,
        status: 1
      }))
      
      editTableData.forEach((ele: any, i: number) => {
        delete(ele[i])
      })
      const obj = {
        id: id ? id : 0,
        status: 1,
        contractFeeBear: 0,
        ...rest,
        billType,
        buyer: [buyer],
        platformLeastFee: amountTransform(platformLeastFee),
        startTime: time && moment(time?.[0]).format('YYYY-MM-DD HH:mm:ss'),
        endTime: time && moment(time?.[1]).format('YYYY-MM-DD HH:mm:ss'),
        divideInfoList: editTableData.map((res: any)=> {
          if(billType === 1) {
            return {
              ...res,
              supplyPriceType: res.billVal,
              billCond: Array.isArray(res.billCond) ? res.billCond : [res.billCond],
              billVal: res.roleCode === 'goodsAmount' ? res.billVal : amountTransform(res.billVal, '/')
            }
          } else {
            return {
              ...res,
              supplyPriceType: res.billVal,
              billCond: Array.isArray(res.billCond) ? res.billCond : [res.billCond],
              billVal: res.roleCode === 'goodsAmount' ? res.billVal : amountTransform(res.billVal, '*')
            }
          }
        }),
        goods: id ? tableData : arr
      }
      setData(obj)
      setPreviewVisible(true)
  }

  useEffect(()=> {
    if(id) {
      getConfigById({id}).then(res => {
        setDetailData(res?.data)
      })
    }
  }, [id])

  return (
    <DrawerForm
      title={`${id ? '编辑' : '新建'}产品`}
      width={1300}
      visible={visible}
      onVisibleChange={setVisible}
      layout='horizontal'
      drawerProps={{
        destroyOnClose: true,
      }}
      onFinish={async ()=> {
        submit()
      }}
      submitter={{
        searchConfig: {
          submitText: '提交',
          resetText: '取消'
        }
      }}
    >
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane key="tab1" tab="分成商品">
          <Goods callback={(e: any)=> {setTableData(e)}} data={detailData?.goods}/>
        </ProCard.TabPane>
        <ProCard.TabPane key="tab2" tab="分成配置">
          <Config 
            meta={tableData} 
            formCallback={(e: any)=> {setFormData(e)}} 
            tableCallback={(e: any)=> setEditTableData(e)}
            detailData={detailData}
            selectData={setSelectData}
          />
        </ProCard.TabPane>
      </ProCard>
      {
        previewVisible &&
        <Preview
          visible={previewVisible}
          setVisible={setPreviewVisible}
          callback={()=> setVisible(false)}
          tableCallback={()=>callback()}
          data={data}
          selectData={selectData}
        />
      }
    </DrawerForm>
  )
}

export default Detail