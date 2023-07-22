import ProCard from '@ant-design/pro-card'

import PageContainer from '@/components/PageContainer'
<<<<<<< HEAD
import TimeSelect from '@/components/time-select'
import { subCompanyUser } from '@/services/product-performance-management/early-user-management'
import RegistForm from '@/common/components/early-screening'
import CancelRegister from './cancel-register'
import RefundRequestRemarks from './refund-request-remarks'
import ImportFile from '@/components/ImportFile'
import Notice from './notice'
import Sampling from './sampling'
import ExpressList from './express-list'
import styles from './styles.less'

const AEDEarlyUserManagement: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [cancelRegisterVisible, setCancelRegisterVisible] = useState<boolean>(false)
  const [refundRequestRemarksVisible, setRefundRequestRemarksVisible] = useState<boolean>(false)
  const [noticeVisible, setNoticeVisible] = useState<boolean>(false)
  const [samplingVisivle, setSamplingVisivle] = useState<boolean>(false)
  const [expressVisible, setExpressVisible] = useState<boolean>(false)
  const [data, setData] = useState()
  const [state, setState] = useState()
  const [dateTime, setDateTime] = useState()
  const [type, setType] = useState<boolean>(false)
  const [id, setId] = useState<string>()
  const [shortId, setShortId] = useState<string>()
  const [select, setSelect] = useState<string>()
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const { query } = useLocation()

  const columns: ProColumns[] = [
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
      title: '早筛码',
      dataIndex: 'signCode',
      align: 'center', 
      order: 1
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
      title: '订单时间',
      dataIndex: 'payTime',
      renderFormItem: () => <TimeSelect />,
      hideInTable: true
    },
    {
      title: '早筛人姓名',
      dataIndex: 'signUser',
      align: 'center'
    },
    {
      title: '早筛人手机号',
      dataIndex: 'signMemberPhone',
      align: 'center',
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
      align: 'center',
      hideInSearch: true
    },
    {
      title: '物流单号',
      dataIndex: 'shippingCode',
      align: 'center',
      hideInSearch: true,
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
      title: '所属子公司名称',
      dataIndex: 'subName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司地址',
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
      title: '所属子公司状态',
      dataIndex: 'isSub',
      valueType: 'select',
      valueEnum: {
        0: '无所属子公司',
        1: '有所属子公司'
      },
      hideInTable: true
    },
    {
      title: '查看',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      render: (_, r) => {
        if(r.signUser) {
          return (
            <Space size='small'>
              <a
                onClick={()=> {
                  setVisible(true)
                  setId(r.subOrderSn)
                  setShortId(r.signCode)
                }}
              >
                查看同意书
              </a>
              {
                r.reportUrl&&
                <a href={`${r.reportUrl && r.reportUrl}`} target='_blank'>
                  体检报告
                </a>
              }
            </Space>
          )
        } else {
          return
        }
      }
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      render: (_, r) => {
        if(r.processDesc === '待采样' || r.processDesc === '已下单' || r.processDesc === '已采样' || r.processDesc === '待报名' || r.processDesc === '检测中') {
          return (
            <Space size='small'>
              <a onClick={()=> {setRefundRequestRemarksVisible(true); setId(r.subOrderSn); setType(false); setData(undefined)}}>申请退款备注</a>
              {
                (r.processDesc === '待采样' || r.processDesc === '已下单' || r.processDesc === '已采样' || r.processDesc === '检测中') &&
                <a onClick={()=> {setCancelRegisterVisible(true); setData(r)}}>取消报名</a>
              }
              {
                r.processDesc === '待采样' &&
                <a onClick={()=> {setNoticeVisible(true); setData(r)}}>通知采样</a>
              }
              {/* {
                r.processDesc === '待采样' &&
                <a onClick={()=> {setSamplingVisivle(true); setData(r)}}>采样发货</a>
              } */}
            </Space>
          )
        } else if(r.refund){
          return (
            <a onClick={()=> {setRefundRequestRemarksVisible(true); setId(r.subOrderSn); setType(true); setData(r.refund)}}>查看退款备注</a>
          )
        } else {
          return
        }
      }
    }
  ]
  
  const getFieldsValue = () => {
    const { reportTime, signTime, payTime, noticeTime, ...rest } = form.current?.getFieldsValue()
    return { 
      orderStartTime: payTime && moment(payTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      orderEndTime: payTime && moment(payTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      signStartTime: signTime && moment(signTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      reportStartTime: reportTime && moment(reportTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      reportEndTime: reportTime && moment(reportTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      noticeStartTime: noticeTime && moment(noticeTime[0]).format('YYYY-MM-DD HH:mm:ss'),
      noticeEndTime: noticeTime && moment(noticeTime[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest
    }
  }
=======
import AEDEarlyOrderManagement from './early-order-management'
import WaitDetectionUser from './wait-detection-user'
>>>>>>> a56044846676e5850f62682eced694fddc80c68d

const Index = () => {
  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card'
        }}
      >
        <ProCard.TabPane
          key='1'
          tab='早筛订单'
        >
          <AEDEarlyOrderManagement />
        </ProCard.TabPane>
        <ProCard.TabPane
           key='2'
           tab='待采样早筛订单'
        >
          <WaitDetectionUser />
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default Index