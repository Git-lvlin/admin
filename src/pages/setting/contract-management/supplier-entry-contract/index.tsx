import { useEffect, useState, useRef } from "react"
import ProTable from "@ant-design/pro-table"
import { Button, Image, Modal } from "antd"
import moment from "moment"
import ProForm,{
  ModalForm, 
  ProFormRadio, 
  ProFormSelect, 
  ProFormText,
  ProFormDatePicker,
  ProFormDigit,
  ProFormDependency
} from "@ant-design/pro-form"
import { history } from "umi"
import { CheckCircleOutlined } from "@ant-design/icons"

import type { FC } from "react"
import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { 
  TableProps, 
  AddContractProps, 
  SupplierListProps, 
  ModalFormProps, 
  SupplierSelectProps,
  MiniQrProps
} from "../data"
import type { FormInstance } from "antd"

import { 
  getList, 
  getPactNo, 
  getSupplierList, 
  settled, 
  getMiniQr,
  getDetail,
  edit
} from "@/services/setting/contract-management"
import { amountTransform } from "@/utils/utils"
import { getAuth } from "@/components/auth"
import styles from "../styles.less"
import OperationLog from "./operation-log"
import EditContract from "./edit-contract"
import Upload from "@/components/upload"

const SupplierEntryContract: FC = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState()
  const [fileUrl, setFileUrl] = useState<string>()
  const [data, setData] = useState<ModalFormProps | undefined>()
  const [storeName, setStoreName] = useState<string>()
  const [optLog, setOptLog] = useState<boolean>(false)
  const [contractId, setContractId] = useState<string>()
  const [editVisible, setEditVisible] = useState<boolean>(false)
  const actRef = useRef<ActionType>()

  const openMiniQr = (e: string) => {
    getMiniQr({contractId: e}).then(res => {
      setImageUrl(res.data?.records?.url)
      setVisible(true)
    })
  }

  const openDetail = (id: string) => {
    getDetail({contractId: id}).then(res => {
      setData(res.data.records)
    })
    setShowAdd(true)
  }

  const editDetail = (id: string) => {
    getDetail({contractId: id}).then(res => {
      setData(res.data.records)
    })
    setEditVisible(true)
  }

  const columns: ProColumns<TableProps>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true
    },
    {
      title: '编号',
      dataIndex: 'pactNo',
      align: 'center',
      render: (_, r) => {
        if(r.type === 2 && r.signStatus === 1) {
          return <a href={r.pactUrl} target='blank'>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '供应商手机',
      dataIndex: 'phone',
      align: 'center'
    },
    {
      title: '供应商名称',
      dataIndex: 'name',
      align: 'center',
      render: (_, r)=> {
        if(r.supplierId) {
          return <a onClick={() => history.push(`/supplier-management/supplier-list?supplierId=${r.supplierId}`)}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '合作期限',
      dataIndex: 'signLong',
      align: 'center',
      hideInSearch: true,
      render: (_) => `${_}个月`
    },
    {
      title: '合作期限',
      dataIndex: 'signLong',
      valueType: 'select',
      valueEnum: {
        1: '1年及1年以内',
        2: '1年以上至2年（含2年）',
        3: '2年以上至3年（含3年）',
        4: '3年以上'
      },
      hideInTable: true
    },
    {
      title: '最近编辑信息',
      dataIndex: 'operateName',
      align: 'center',
      hideInSearch: true,
      render: (_, record)=> (
        <>
          <div>{_}</div>
          {
            record.operateTime > 0 &&
            <div>{moment(record.operateTime * 1000).format('YYYY-MM-DD HH:mm:ss')}</div>
          }
        </>
      )
    },
    {
      title: '到期时间',
      dataIndex: 'expireDteDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订日期',
      dataIndex: 'signDteDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订日期',
      dataIndex: 'signDate',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '合同类型',
      dataIndex: 'type',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '线上电子合同',
        2: '线下纸质合同'
      }
    },
    {
      title: '合同模式',
      dataIndex: 'modeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签合同支付信息',
      dataIndex: 'payAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r)=> (
        <>
          {
            r.payAmount > 0 &&
            <div>{amountTransform(r.payAmount, '/')}元</div>
          }
          <div>{r.payTypeDesc}</div>
        </>
      )
    },
    {
      title: '剩余到期时长',
      dataIndex: 'remainLong',
      valueType: 'select',
      valueEnum: {
        1: '1个月及1个月以内',
        2: '1个月以上至2个月（含2个月）',
        3: '2个月以上至3个月（含3个月）',
        4: '3个月以上至6个月（含6个月）',
        5: '6个月以上'
      },
      hideInTable: true
    },
    {
      title: '签合同支付单号',
      dataIndex: 'orderNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '电子合同ID',
      dataIndex: 'thirdContractId',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.type === 1 && r.signStatus === 1) {
          return <a href={r.checkUrl} target='blank'>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '合同ID',
      dataIndex: 'thirdContractId',
      align: 'center',
      hideInTable: true
    },
    {
      title: '签订状态',
      dataIndex: 'signStatus',
      align: 'center',
      valueType: 'select',
      valueEnum: {
        1: '已签订',
        2: '未签订',
        3: '待上传',
        4: '待支付',
        5: '待签订'
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <>
          {
            ((r.signStatus >=4 || r.signStatus === 1) && r.type === 1)&&
            <div>
              <a onClick={()=> {openMiniQr(r.id); setFileUrl(r.pactUrl); setStoreName(r.name)}}>查看签合同入口码</a>
            </div>
          }
          {
            (r.type === 1 && r.signStatus === 1 && r.supplierId === 0)&&
            <div>
              <a onClick={() => history.push('/supplier-management/supplier-list')}>创建供应商</a>
            </div>
          }
          {
            (r.payStatus <= 1 && r.thirdContractId === '')&&
            <div>
              <a onClick={()=> openDetail(r.id)}>修改</a>
            </div>
          }
          {
            (getAuth('setting/contract-management/edit-contract') && r.signStatus > 1 && r.signStatus <= 4) &&
            <div>
              <a 
                onClick={()=> {
                  setContractId(r?.id)
                  editDetail(r?.id)
                }}
              >
                编辑入驻合同文件
              </a>
            </div>
          }
          <div>
            <a onClick={()=>{setOptLog(true); setContractId(r?.id)}}>操作日志</a>
          </div>
        </>
      )
    },
  ]

  return (
    <>
      <ProTable<TableProps>
        rowKey='id'
        columns={columns}
        params={{}}
        request={getList}
        pagination={{
          pageSize: 10,
          showQuickJumper: true
        }}
        actionRef={actRef}
        options={false}
        search={{
          labelWidth: 100,
          optionRender: (searchConfig, props, dom)=> [
            ...dom.reverse(),
            <Button key='add' onClick={()=>{setShowAdd(true); setData(undefined)}}>新建</Button>
          ]
        }}
      />
      {
        showAdd&&
        <AddContract
          visible={showAdd}
          setVisible={setShowAdd}
          callback={()=> actRef.current?.reload()}
          data={data}
        />
      }
      {
        visible&&
        <MiniQr 
          imgUrl={imageUrl} 
          visible={visible} 
          setVisible={setVisible}
          fileUrl={fileUrl}
          storeName={storeName}
        />
      }
      {
        optLog&&
        <OperationLog
          visible={optLog}
          setVisible={setOptLog}
          id={contractId}
        />
      }
      {
        editVisible&&
        <EditContract
          visible={editVisible}
          setVisible={setEditVisible}
          id={contractId}
          data={data}
          callback={()=> actRef.current?.reload()}
        />
      }
    </>
  )
}

const AddContract: FC<AddContractProps> = ({visible, setVisible, callback, data}) => {
  const [type, setType] = useState<number>(1)
  const [pactNo, setPactNo] = useState()
  const [supplierList, setSupplierList] = useState<SupplierSelectProps[]>()
  const [phone, setPhone] = useState<string>()
  const formRef = useRef<FormInstance>()

  useEffect(()=>{
    getPactNo().then(res => {
      setPactNo(res.data.records.packNo)
    })
  }, [])

  useEffect(()=> {
    getSupplierList().then(res => {
      const obj = {}
      setSupplierList(res.data.records.map((item: SupplierListProps) =>{
        obj[item.supplierId] = item.companyName
        return {
          label: item.companyName,
          value: item.supplierId,
          phone: item.phone
        }
      }))
    })
  }, [])

  useEffect(()=>{
    formRef.current?.setFieldsValue({
      pactNo,
      signStatus: type === 2 ? 1 : 2,
      phone
    })
  }, [pactNo, type, phone])

  useEffect(()=> {
    if(data) {
      if(data.type === 2) {
        setType(2)
      } else {
        setType(1)
      }
      formRef.current?.setFieldsValue({
        pactNo: data.pactNo,
        phone: data.phone,
        type: data.type,
        signStatus: data.signStatus,
        supplierId: data.name,
        name: data.name,
        pactUrl: data.pactUrl,
        signTime: moment(data.signTime * 1000).format("YYYY-MM-DD HH:mm:ss")
      })
    }
  },[data, pactNo, type])

  const selectSupplier = (e: number) => {
    setPhone(supplierList?.find(item=> item.value === e)?.phone)
  }

  const submit = (e: ModalFormProps) => {
    new Promise((resolve, reject)=>{
      if(!data) {
        settled({
          ...e,
          signStatus: 2,
          signTime: moment(e.signTime).unix()
        }).then(res => {
          if(res.code === 0) {
            resolve('')
            callback()
          } else {
            reject()
          }
        })
      } else {
        edit({
          ...e,
          id: data.id,
          supplierId: data.supplierId,
          signTime: moment(e.signTime).unix()
        }).then(res => {
          if(res.code === 0) {
            resolve('')
            callback()
          } else {
            reject()
          }
        })
      }
    })
  }

  return (
    <ModalForm<ModalFormProps>
      title={`${data? '编辑': '新建'}供应商入驻合同`}
      visible={visible}
      onVisibleChange={setVisible}
      width={500}
      layout='horizontal'
      labelCol={{span: 8}}
      wrapperCol={{span: 16}}
      formRef={formRef}
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async (values)=>{
        submit(values)
        return true
      }}
    >
      <ProFormRadio.Group
        name='type'
        label='合同类型'
        initialValue={1}
        fieldProps={{
          onChange: (e) => setType(e.target.value)
        }}
        disabled={data && true}
        options={[
          {
            value: 1,
            label: '线上电子合同'
          },
          {
            value: 2,
            label: '线下纸质合同'
          }
        ]}
      />
      {/* <ProFormRadio.Group
        name='signStatus'
        label='签订状态'
        width='sm'
        options={[
          {
            value: 2,
            label: '待签订'
          },
          {
            value: 1,
            label: '已签订'
          }
        ]}
        disabled={true}
      /> */}
      {
        type === 2&&
        <ProFormSelect
          label='供应商名称'
          name='supplierId'
          options={supplierList}
          width='sm'
          fieldProps={{
            optionFilterProp: 'label',
            showSearch: true,
            onChange: (e) => selectSupplier(e)
          }}
          rules={[{
            required: true
          }]}
        />
      }
      {
        type === 1&&
        <ProFormText
          label='供应商名称'
          name='name'
          width='sm'
          fieldProps={{
            maxLength: 60
          }}
          rules={[{
            required: true
          }]}
        />
      }
      <ProFormText
        label='供应商手机'
        name='phone'
        width='sm'
        rules={[{
          required: true
        }]}
      />
      <ProFormDependency name={['type']}>
        {({type})=>{
          if(type === 2) {
            return (
              <>
                <ProForm.Item
                  label='上传入驻合同文件'
                  name='pactUrl'
                  extra={<div>请上传pdf格式文件，不超过800KB</div>}
                  rules={[{
                    required: true
                  }]}
                >
                  <Upload 
                    size={1024 * 0.8} 
                    accept='.pdf' 
                    code={307}
                    isPDF={true}
                  />
                </ProForm.Item>
                <ProFormText
                  label='协议编号'
                  name='pactNo'
                  width='sm'
                />
                <ProFormDatePicker 
                  name="signTime" 
                  label="签订日期" 
                  width='sm'
                  rules={[{
                    required: true
                  }]}
                />
                <ProFormDigit
                  name="signLong" 
                  label="合作期限" 
                  width='sm'
                  rules={[{
                    required: true
                  }]}
                  fieldProps={{
                    addonAfter: '个月'
                  }}
                />
                <ProFormDependency name={['signTime', 'signLong']}>
                  {({ signTime, signLong}) => {
                    if(signTime && signLong) {
                      return (
                        <ProForm.Item
                          label='到期时间'
                          name='expireTime'
                        >
                          <div>{moment(signTime).add(signLong, 'month').subtract(1, 'day').format('YYYY-MM-DD')}</div>
                        </ProForm.Item>
                      )
                    } else {
                      return null
                    }
                  }}
                </ProFormDependency>
              </>
            )
          } else {
            return null
          }
        }}
      </ProFormDependency>
    </ModalForm>
  )
}

const MiniQr: FC<MiniQrProps> = ({imgUrl, visible, setVisible, fileUrl, storeName}) => {
  return (
    <Modal
      title={
        <span>
          <CheckCircleOutlined 
            style={{
              color: '#52c41a', 
              marginRight: 5, 
              fontSize: 18
            }}
          />
          供应商入驻合同创建成功！
        </span>
      }
      visible={visible}
      centered
      destroyOnClose
      width={380}
      onCancel={()=> setVisible(false)}
      footer={null}
    >
      <div className={styles.miniQr}>
        <Image 
          width={150} 
          height={150} 
          src={imgUrl}
          preview={false}
        />
        <div className={styles.file}>
          <a href={fileUrl} target="blank" style={{fontSize: '16px', fontWeight: 'bold'}}>{storeName}</a>
        </div>
        <div className={styles.content}>供应商入驻合同签写入口码</div>
        <div className={styles.footer}>请复制入口码图片，发给供应商确认合同并签署合同</div>
      </div>
    </Modal>
  )
}

export default SupplierEntryContract
