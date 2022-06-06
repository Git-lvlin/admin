import { useEffect, useState, useRef } from "react"
import ProTable from "@ant-design/pro-table"
import { Button, Image, Modal, Space } from "antd"
import moment from "moment"
import ProForm, {
  ModalForm, 
  ProFormRadio, 
  ProFormSelect, 
  ProFormText,
  ProFormDateTimePicker
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
  getDetail
} from "@/services/setting/contract-management"
import { amountTransform } from "@/utils/utils"
import Upload from "@/components/upload"
import styles from "../styles.less"

const SupplierEntryContract: FC = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [imageUrl, setImageUrl] = useState()
  const [fileUrl, setFileUrl] = useState<string>()
  const [data, setData] = useState<ModalFormProps | undefined>()
  const actRef = useRef<ActionType>()

  const openMiniQr = (e: number) => {
    getMiniQr({contractId: e}).then(res => {
      setImageUrl(res.data?.records?.url)
      setVisible(true)
    })
  }

  const openDetail = (id: number) => {
    getDetail({contractId: id}).then(res => {
      setData(res.data.records)
    })
    setShowAdd(true)
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
      align: 'center'
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
          return <a onClick={() => history.push(`/supplier-management/supplier-list?companyName=${_}`)}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
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
      title: '签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.signTime > 0) {
          return moment(r.signTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        } else {
          return null
        }
      }
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
        2: '待签订'
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Space size="small">
          {
            (r.signStatus === 2 && r.type === 1)&&
            <a onClick={()=> {openMiniQr(r.id); setFileUrl(r.pactUrl)}}>查看签合同入口码</a>
          }
          {
            (r.type === 1 && r.signStatus === 1)&&
            <a onClick={() => history.push('/supplier-management/supplier-list')}>创建供应商</a>
          }
          {
            (r.payStatus <= 1 && r.thirdContractId === '')&&
            <a onClick={()=> openDetail(r.id)}>修改</a>
          }
        </Space>
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

  const selectSupplier = (e: number) => {
    setPhone(supplierList?.find(item=> item.value === e)?.phone)
  }

  useEffect(()=> {
    if(data) {
      formRef.current?.setFieldsValue({
        pactNo: data.pactNo,
        phone: data.phone,
        type: data.type,
        signStatus: data.signStatus,
        supplierId: data.supplierId,
        name: data.name,
        pactUrl: data.pactUrl
      })
    }
  },[data, pactNo, type, phone])

  const submit = (e: ModalFormProps) => {
    new Promise((resolve, reject)=>{
      settled({
        ...e,
        signTime: moment(e.signTime).unix()
      }).then(res => {
        if(res.code === 0) {
          resolve('')
          callback()
        } else {
          reject()
        }
      })
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
      <ProFormRadio.Group
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
      />
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
        readonly={data && true}
      />
      {
        type === 2 &&
        <ProFormDateTimePicker 
          name="signTime" 
          label="签订日期" 
          width='sm'
          rules={[{
            required: true
          }]}
        />
      }
    </ModalForm>
  )
}

const MiniQr: FC<MiniQrProps> = ({imgUrl, visible, setVisible, fileUrl}) => {
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
          <a href={fileUrl} target="blank">约购供应商合作协议.pdf</a>
        </div>
        <div className={styles.content}>供应商入驻合同签写入口码</div>
        <div className={styles.footer}>请复制入口码图片，发给供应商确认合同并签署合同</div>
      </div>
    </Modal>
  )
}

export default SupplierEntryContract
