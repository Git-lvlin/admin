import { useEffect, useState, useMemo, useRef } from 'react'
import ProForm, { ModalForm, ProFormSelect, ProFormText, ProFormDependency } from '@ant-design/pro-form'
import { 
  AutoComplete, 
  Descriptions,
  message,
  Typography,
  Empty
} from "antd"
import { debounce } from 'lodash'

import type { FC } from 'react'
import type { FormInstance } from 'antd'
import type { LaunchEquipmentProps, ListProps } from './data'

import { 
  bindable, 
  handHosting, 
  resetHosting, 
  stopResetHosting,
  getExpressList 
} from "@/services/hydrogen-atom-trusteeship/equipment-management"
import styles from "./styles.less"

const { Option } = AutoComplete
const { Title, Paragraph } = Typography


const LaunchEquipment: FC<LaunchEquipmentProps> = (props: LaunchEquipmentProps) => {
  const { visible, setVisible, orderId, type, callback } = props
  const [result, setResult] = useState<ListProps[]>([])
  const [expressList, setExpressList] = useState([])
  const [num, setNum] = useState(0)
  const formRef = useRef<FormInstance>()

  const api = {
    1: handHosting,
    2: resetHosting,
    3: stopResetHosting
  }[type]

  useEffect(()=>{
    if(num === 1) {
      getExpressList({}).then(res => {
        const arr = res.data.map((item: {expressName: string}) => ({ 
          label: item.expressName,
          value: item.expressName
        }))
        setExpressList(arr)
      })
    }
  }, [num])

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      bindable({
        keyword: value
      }).then((res) => {
        if (res.code === 0) {
          setResult(res.data.records.map((item: ListProps)=>({
            ...item,
            id: item.id,
            storeNo: item.storeNo,
            realname: item.realname,
            memberPhone: item.memberPhone,
            fullAddress: item.fullAddress
          })))
        }
      })
    }
    return debounce(loadOptions, 800)
  }, [])

  const checkedValue = (e: string) => {
    const arr = result.filter(item=> item.id === parseInt(e))
    arr.forEach(item=>{
      formRef.current?.setFieldsValue({
        storeNo: item.storeNo,
        storeName: `【${item.shopMemberAccount}】${item.storeName}`,
        realname: item.realname,
        memberPhone: item.memberPhone,
        fullAddress: item.fullAddress,
        store: null
      })
    })
  }


  const submit = (e: ListProps) => {
    delete e['store']
    return new Promise<void>((resolve, reject) => { 
      if(Object.keys(e).length) {
        api?.({...e, orderId}, {showSuccess: true}).then(res => {
          if(res.code === 0) {
            callback()
            resolve()
          }else {
            reject()
          }
        })
      } else {
        message.error('请选择社区店')
        reject()
      }
    })
  }

  return (
    <ModalForm
      title='指定社区店收货'
      width={500}
      visible={visible}
      formRef={formRef}
      onFinish={async (v: ListProps)=> {
        await submit(v)
        return true
      }}
      onVisibleChange={setVisible}
      submitter={{
        searchConfig: {
          submitText: '确认投放',
          resetText: '取消投放'
        }
      }}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
      wrapperCol={{span: 14}}
      labelCol={{span: 8}}
    >
      <>
        <div style={{color: '#E5670B'}}>收货店铺需满足：</div>
        <div style={{color: '#E5670B'}}>
          1.有可用待运营资质；2.缴纳租金管理费；3.已开通VIP社区店；4.已签订代运营合同。
        </div>
      </>
      <ProForm.Item
        label='选择约购店'
        name='store'
      >
        <AutoComplete
          placeholder='请输入店铺编号、店主姓名、手机号或店铺提货点搜索'
          style={{
            width: 300
          }}
          onSearch={debounceFetcher}
          onSelect={checkedValue}
          notFoundContent={<Empty/>}
        >
          {result.map((value: ListProps) => (
            <Option key={value.id} disabled={value.statusCode === 1}>
              <Descriptions
                bordered
                column={1}
                labelStyle={{
                  width: 16
                }}
              >
                <Descriptions.Item label="店铺">
                  <div className={styles.address}>
                    【{value.shopMemberAccount}】{value.storeName}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label="店主">{value.realname}</Descriptions.Item>
                <Descriptions.Item label="手机">{value.memberPhone}</Descriptions.Item>
                <Descriptions.Item label="地址">
                  <div className={styles.address}>{value.provinceName}{value.cityName}{value.regionName}</div>
                  <div className={styles.address}>{value.address}{value.houseNumber}</div>
                </Descriptions.Item>
                <Descriptions.Item label="状态">
                  <div className={styles.status}>
                    <span>{value.statusStr}</span>
                    <a
                      href={`/hydrogen-atom-trusteeship/managed-transaction-data?type=2&searchVal=${value.memberPhone}`}
                      onClick={(e)=> e.stopPropagation()}
                    >
                      查看
                    </a>
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </Option>
          ))}
        </AutoComplete>
      </ProForm.Item>
      <ProFormText
        name='storeNo'
        hidden
      />
      <ProFormText
        label='社区店名称'
        name='storeName'
        width='md'
        readonly
      />
       <ProFormText
        label='店主姓名'
        name='realname'
        width='md'
        readonly
      />
       <ProFormText
        label='店主手机'
        name='memberPhone'
        width='md'
        readonly
      />
       <ProFormText
        label='店铺地址'
        name='fullAddress'
        width='md'
        readonly
      />
      {
        type === 3 &&
        <ProFormSelect
          label='请输入设备投放方式'
          name='expressType'
          fieldProps={{
            onChange: (e)=> setNum(e)
          }}
          options={[
            {label: '线下取货', value: 2},
            {label: '快递配送', value: 1}
          ]}
        />
      }
      <ProFormDependency name={['expressType']}>
        {
          ({expressType})=> {
            if(expressType === 2) {
              return (
                <ProFormText
                  label='线下取货联系手机号'
                  name='contactPhone'
                  rules={[{required: true}]}
                />
              )
            } else if(expressType === 1){
              return (
                <>
                  <ProFormSelect
                    label='物流公司'
                    name='expressName'
                    options={expressList}
                    rules={[{required: true}]}
                    fieldProps={{
                      showSearch: true
                    }}
                  />
                  <ProFormText
                    label='物流单号'
                    name='expressNo'
                    rules={[{required: true}]}
                  />
                </>
              )
            } else {
              return null
            }
          }
        }
      </ProFormDependency>
      {
        (type === 1 || type === 2) &&
        <Typography>
          <Title level={5}>确认投放后系统将实现：</Title>
          <Paragraph>
            <ol>
              <li>根据托管订单生成新的运营订单；</li>
              <li>将确认投放时间作为新运营订单的下单时间；</li>
              <li>根据托管订单单号生成新运营订单单号；</li>
              <li>将投放的运营商社区店提货点设为运营订单的收货地址；</li>
              <li>将运营订单推送给设备供应商，以便其发货；</li>
            </ol>
          </Paragraph>
        </Typography>
      }
      {
        type === 3 &&
        <div style={{fontWeight: 700, fontSize: '16px'}}>确重新投放后，社区店收货激活后即可正常代运营。</div>
      }
    </ModalForm>
  )
}

export default LaunchEquipment
