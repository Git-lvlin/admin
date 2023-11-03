import { useRef, useState } from 'react'
import moment from 'moment'
import { Space, Dropdown, Menu, Button, message } from 'antd'
import { useLocation } from 'umi'
import { DownOutlined } from '@ant-design/icons'

import type { ActionType, ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import Export from '@/components/export'
import TimeSelect from '@/components/time-select'
import { subCompanyUser } from '@/services/product-performance-management/early-user-management'
import RegistForm from '@/common/components/early-screening'
import CancelRegister from './cancel-register'
import RefundRequestRemarks from './refund-request-remarks'
import ImportReport from './import-report'
import Sampling from './sampling'
import UploadInspectionReport from './upload-inspection-report'
import ExpressList from './express-list'
import ModifyInfo from './modify-info'

const AEDEarlyOrderManagement: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [cancelRegisterVisible, setCancelRegisterVisible] = useState<boolean>(false)
  const [refundRequestRemarksVisible, setRefundRequestRemarksVisible] = useState<boolean>(false)
  const [importReportVisible, setImportReportVisible] = useState<boolean>(false)
  const [modifyInfoVisible, setModifyInfoVisible] = useState<boolean>(false)
  const [uploadVisible, setUploadVisible] = useState<boolean>(false)
  const [samplingVisivle, setSamplingVisivle] = useState<boolean>(false)
  const [expressVisible, setExpressVisible] = useState<boolean>(false)
  const [data, setData] = useState()
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [type, setType] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [shortId, setShortId] = useState<string>()
  const [select, setSelect] = useState<string>()
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const { query } = useLocation() as any

  const menu = (data: any) => (
    <Menu>
      <Menu.Item key='1' disabled={!data.signUser}>
        <a
          onClick={()=> {
            setVisible(true)
            setId(data.subOrderSn)
            setShortId(data.signCode)
          }}
        >
          查看知情同意书
        </a>
      </Menu.Item>
      {/* <Menu.Item key='2' disabled={(data.process !== 1 || data.isNotice === 1)}>
        <a onClick={()=> {setNoticeVisible(true); setData(data)}}>通知采样</a>
      </Menu.Item> */}
      <Menu.Item key='3' disabled={(data.process === 0 || data.process === 10 || data.process === 15 || data.process === 20)}>
        <a onClick={()=> {setCancelRegisterVisible(true); setData(data)}}>取消报名</a>
      </Menu.Item>
      <Menu.Item key='4' disabled={(data.process === 10 || data.process === 15 || data.process === 20)}>
        <a onClick={()=> {setRefundRequestRemarksVisible(true); setId(data.subOrderSn); setType(false); setData(undefined)}}>申请退款备注</a>
      </Menu.Item>
      <Menu.Item key='2' disabled={!(data.process === 2 || data.process === 3 || data.process === 5)}>
        <a onClick={()=> {setId(data.subOrderSn); setImportReportVisible(true); setData(data)}}>导入报告</a>
      </Menu.Item>
      <Menu.Item key='5' disabled={!data.refund}>
        <a onClick={()=> {setRefundRequestRemarksVisible(true); setId(data.subOrderSn); setType(true); setData(data.refund)}}>查看申请退款备注</a>
      </Menu.Item>
      <Menu.Item key='6' disabled={!(data.process === 10)}>
        <a href={`${data.reportUrl && data.reportUrl}`} target='_blank' referrerPolicy='no-referrer'>查看检测报告</a>
      </Menu.Item>
      <Menu.Item key='7' disabled={!(data.process === 1 || data.process === 2)}>
        <a onClick={()=> {setModifyInfoVisible(true); setData(data)}}>修改早筛人信息</a>
      </Menu.Item>
    </Menu>
  )

  const columns: ProColumns[] = [
    {
      title: '选中本页',
      align: 'left', 
      hideInSearch: true
    },
    {
      title: '门店合作商编号',
      dataIndex: 'storeHouseNumber',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '区县服务商编号',
      dataIndex: 'areaHouseNumber',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '早筛码',
      dataIndex: 'signCode',
      align: 'center', 
    },
    {
      title: '早筛人姓名',
      dataIndex: 'signUser',
      align: 'center'
    },
    {
      title: '订单来源',
      dataIndex: 'providerType',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        'store': '门店合作商',
        'provider': '区县服务商',
        'other': '其他来源',
      }
    },
    {
      title: '早筛人手机号',
      dataIndex: 'signMemberPhone',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'process',
      valueType: 'select',
      fieldProps: {
        onChange: (e: string) => setSelect(e)
      },
      valueEnum: {
        0: '待报名',
        1: '待采样',
        2: '已采样',
        3: '已下单',
        5: '检测中',
        10: '已完成',
        15: '已退款',
        20: '已失效',
      },
      hideInTable: true
    },
    {
      title: '早筛报名时间',
      dataIndex: 'signTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '早筛报名时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '报告上传时间',
      dataIndex: 'reportTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '报告上传时间',
      dataIndex: 'reportTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '液体活检编号',
      dataIndex: 'detectionNo',
      align: 'center'
    },
    {
      title: '送检时间',
      dataIndex: 'sendDetectionTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '送检时间',
      dataIndex: 'sendDetectionTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '物流单号',
      dataIndex: 'shippingCode',
      align: 'center',
      render: (_, r) => {
        if(r.shippingCode) {
          return <a onClick={()=> {setExpressVisible(true); setId(r)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '早筛人身份证号码',
      dataIndex: 'idcard',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '性别',
      dataIndex: 'senderDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属合作公司名称',
      dataIndex: 'subName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合作公司地址',
      dataIndex: 'subAddress',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'processDesc',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => (
        <>
          <div>{_}</div>
          {
            r.processDesc === '待采样' &&
            (
              r.isNoticeDesc === '待通知' ?
              <div style={{color: '#FF6600'}}>{r.isNoticeDesc}</div> :
              <div style={{color: '#1FCA66'}}>{r.isNoticeDesc}</div>
            )
          }
        </>
      )
    },
    {
      title: '通知状态',
      dataIndex: 'isNotice',
      valueType: 'select',
      valueEnum: {
        0: '待通知',
        1: '已通知'
      },
      hideInTable: true,
      hideInSearch: select !== '1'
    },
    {
      title: '预约采样日期',
      dataIndex: 'noticeTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '预约采样日期',
      dataIndex: 'noticeTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '预约时段',
      dataIndex: 'noticeTimePeriod',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属合作公司状态',
      dataIndex: 'isSub',
      valueType: 'select',
      valueEnum: {
        0: '无所属合作公司',
        1: '有所属合作公司'
      },
      hideInTable: true
    },
    {
      title: '子单号',
      dataIndex: 'subOrderSn',
      align: 'center'
    },
    {
      title: '总订单号',
      dataIndex: 'sumOrderId',
      align: 'center',
      initialValue: query.id && query.id
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '下单人用户ID', 
      dataIndex: 'memberId',
      align: 'center'
    },
    {
      title: '直推人手机号', 
      dataIndex: 'directPhone',
      align: 'center'
    },
    {
      title: '订单金额',
      dataIndex: 'payAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单支付时间',
      dataIndex: 'payTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    // {
    //   title: '查看',
    //   valueType: 'option',
    //   align: 'center',
    //   fixed: 'right',
    //   render: (_, r) => {
    //     if(r.signUser) {
    //       return (
    //         <Space size='small'>
    //           <a
    //             onClick={()=> {
    //               setVisible(true)
    //               setId(r.subOrderSn)
    //               setShortId(r.signCode)
    //             }}
    //           >
    //             查看同意书
    //           </a>
    //           {
    //             r.reportUrl&&
    //             <a href={`${r.reportUrl && r.reportUrl}`} target='_blank'>
    //               体检报告
    //             </a>
    //           }
    //         </Space>
    //       )
    //     } else {
    //       return
    //     }
    //   }
    // },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   align: 'center',
    //   fixed: 'right',
    //   render: (_, r) => {
    //     if(r.processDesc === '待采样' || r.processDesc === '已下单' || r.processDesc === '已采样' || r.processDesc === '待报名' || r.processDesc === '检测中') {
    //       return (
    //         <Space size='small'>
    //           <a onClick={()=> {setRefundRequestRemarksVisible(true); setId(r.subOrderSn); setType(false); setData(undefined)}}>申请退款备注</a>
    //           {
    //             (r.processDesc === '待采样' || r.processDesc === '已下单' || r.processDesc === '已采样' || r.processDesc === '检测中') &&
    //             <a onClick={()=> {setCancelRegisterVisible(true); setData(r)}}>取消报名</a>
    //           }
    //           {
    //             r.processDesc === '待采样' &&
    //             <a onClick={()=> {setNoticeVisible(true); setData(r)}}>通知采样</a>
    //           }
    //           {/* {
    //             r.processDesc === '待采样' &&
    //             <a onClick={()=> {setSamplingVisivle(true); setData(r)}}>采样发货</a>
    //           } */}
    //         </Space>
    //       )
    //     } else if(r.refund){
    //       return (
    //         <a onClick={()=> {setRefundRequestRemarksVisible(true); setId(r.subOrderSn); setType(true); setData(r.refund)}}>查看退款备注</a>
    //       )
    //     } else {
    //       return
    //     }
    //   }
    // }
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      width: '80px',
      render: (_, r) => (
        <Dropdown overlay={()=> menu(r)}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              管理
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )
    }
  ]
  
  const getFieldsValue = () => {
    const { reportTime, signTime, payTime, noticeTime, sendDetectionTime, ...rest } = form.current?.getFieldsValue()
    return { 
      orderStartTime: payTime && moment(payTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      orderEndTime: payTime && moment(payTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      signStartTime: signTime && moment(signTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      reportStartTime: reportTime && moment(reportTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      reportEndTime: reportTime && moment(reportTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      noticeStartTime: noticeTime && moment(noticeTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      noticeEndTime: noticeTime && moment(noticeTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      sendDetectionStartTime: sendDetectionTime && moment(sendDetectionTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      sendDetectionEndTime: sendDetectionTime && moment(sendDetectionTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      subOrderSnArr: selectedRowKeys.length ? selectedRowKeys : undefined,
      ...rest
    }
  }

  return (
    <>
      <ProTable
        rowKey='subOrderSn'
        columns={columns}
        params={{}}
        formRef={form}
        request={subCompanyUser}
        options={false}
        actionRef={actRef}
        rowSelection={{
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: _ => {
            setSelectedRowKeys(_)
          }
        }}
        toolBarRender={()=> [
          <Button type='primary' onClick={()=> {setUploadVisible(true)}}>上传检测报告</Button>
        ]}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='scrAdmCompanyUser'
              conditions={getFieldsValue}
              text={`导出${selectedRowKeys.length > 0 ? '（选中项）' : '（查询结果）'}`}
            />
            // <Button 
            //   type='primary' 
            //   key='2'
            //   onClick={()=> {
            //     setNoticeVisible(true)
            //     setData(undefined)
            //   }}
            // >
            //   通知采样
            // </Button>
          ]
        }}
      />
      {
        visible &&
        <RegistForm
          visible={visible}
          setVisible={setVisible}
          id={id}
          shortId={shortId}
        />
      }
      {
        cancelRegisterVisible &&
        <CancelRegister
          visible={cancelRegisterVisible}
          setVisible={setCancelRegisterVisible}
          data={data}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        refundRequestRemarksVisible &&
        <RefundRequestRemarks
          visible={refundRequestRemarksVisible}
          setVisible={setRefundRequestRemarksVisible}
          id={id}
          type={type}
          data={data}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        samplingVisivle &&
        <Sampling
          visible={samplingVisivle}
          setVisible={setSamplingVisivle}
          data={data}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        expressVisible &&
        <ExpressList
          visible={expressVisible}
          setVisible={setExpressVisible}
          data={id}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        importReportVisible &&
        <ImportReport
          visible={importReportVisible}
          setVisible={setImportReportVisible}
          reportNo={id}
          data={data}
          callback={()=> actRef.current?.reload()}
        />
      }
      {
        uploadVisible &&
        <UploadInspectionReport
          visible={uploadVisible}
          setVisible={setUploadVisible}
          callback={(e: string)=> {message.success(e); actRef.current?.reload()}}
        />
      }
      {
        modifyInfoVisible &&
        <ModifyInfo
          visible={modifyInfoVisible}
          setVisible={setModifyInfoVisible}
          callback={()=> actRef.current?.reload()}
          data={data}
        />
      }
    </>
  )
}

export default AEDEarlyOrderManagement