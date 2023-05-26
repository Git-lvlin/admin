import { useState, useRef } from 'react'
import ProTable from '@ant-design/pro-table'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'
import type { FC } from 'react'

import PageContainer from '@/components/PageContainer'
import { joinStore } from '@/services/health-package-activities/promotion-activity-management'
import Detail from './detail'
import ImageDetail from './imageDetail'
import Export from '@/components/export'
import SaveCard from './save_card'
import GiftCard from './gift_card'

const PromotionActivityManagement: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [imgModalVisible, setImgModalVisible] = useState<boolean>(false)
  const [saveCardVisible, setSaveCardVisible] = useState<boolean>(false)
  const [giftCardVisible, setGiftCardVisible] = useState<boolean>(false)
  const [storeNo, setStoreNo] = useState<string>()
  const [data, setData] = useState()
 
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[]  = [
    {
      dataIndex: 'searchVal',
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入店铺名称/店主手机号'
      }
    },
    {
      title: '店铺编号',
      dataIndex: 'storeHouseNumber',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店主手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店主用户ID',
      dataIndex: 'memberId',
      align: 'center',
      order:-1
    },
    {
      title: '店主姓名',
      dataIndex: 'realName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺自提点地址',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true,
      width: '25%'
    },
    {
      title: '参与时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '活动设备数',
      dataIndex: 'mchNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.mchNum > 0)
          return <a onClick={()=>{ setModalVisible(true); setStoreNo(r.storeNo)}}>{_}</a>
        return <span>{_}</span>
      }
    },
    {
      title: '门店图片（张）',
      dataIndex: 'imgNums',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.imgNums > 0)
          return <a onClick={()=>{ setImgModalVisible(true); setStoreNo(r.storeNo)}}>{_}</a>
        return <span>{_}</span>
      }
    },
    {
      title: '吸氢服务累计增加次数',
      dataIndex: 'giftCardNums',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.giftCardNums) {
          return <a onClick={()=> {setGiftCardVisible(true); setStoreNo(r.storeNo); setData(r)}}>{_}次</a>
        } else {
          return <span>-</span>
        }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => <a onClick={()=>{setSaveCardVisible(true); setData(r)}}>赠送此店吸氢服务次数</a>
    }
  ]
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        params={{}}
        request={joinStore}
        options={false}
        formRef={form}
        actionRef={actRef}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='healthyCardReg'
              conditions={{...form.current?.getFieldsValue()}}
            />
          ]
        }}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
      />
      {
        modalVisible&&
        <Detail
          visible={modalVisible}
          handleCancel={() => setModalVisible(false)}
          storeNo={storeNo}
        />
      }
      {
        imgModalVisible&&
        <ImageDetail
          visible={imgModalVisible}
          handleCancel={setImgModalVisible}
          storeNo={storeNo}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        saveCardVisible&&
        <SaveCard
          visible={saveCardVisible}
          setVisible={setSaveCardVisible}
          data={data}
          callback={()=> {setSaveCardVisible(false); actRef.current?.reload()}}
        />
      }
      {
        giftCardVisible&&
        <GiftCard
          visible={giftCardVisible}
          setVisible={setGiftCardVisible}
          id={storeNo}
          data={data}
        />
      }
    </PageContainer>
  )
}

export default PromotionActivityManagement
