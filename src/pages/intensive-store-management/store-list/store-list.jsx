import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Tooltip, Image, Menu, Dropdown, Input } from 'antd';
import ProTable from '@/components/pro-table';
import ProCard from '@ant-design/pro-card';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { PageContainer } from '@/components/PageContainer';
import { getStoreList, applyConditionPage, memberShopPage } from '@/services/intensive-store-management/store-list';
import { history, useLocation } from 'umi';
import AddressCascader from '@/components/address-cascader';
import { getAuth } from '@/components/auth';
import Form from './form';
import Create from './create';
import Return from './return';
import ExcelModal from './excel-modal'
import GradeChange from './grade-change'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { amountTransform } from '@/utils/utils'
import Detail from './detail';
import AuditInfo from './audit-info';
import OrderDetail from '@/pages/order-management/normal-order/detail';
import styles from './style.less'
import ContentModel from './content-model';
import RangeInput from '@/components/range-input';
import CreatePc from './create-pc';
import moment from 'moment';
import StoreChargeRecord from '../store-review/store-charge-record'
import DetailDrawer from '@/pages/love-feedback-activities/love-feedback-gift-order/detail-drawer';
import IntensiveOrderDetail from '@/pages/order-management/intensive-order/supplier-order/detail';




const exportType = {
  normal: 'community-shopkeeper-export',
  cancelled: 'community-shopkeeper-cancelled-export',
  vip: 'store-export-vip-membershop',
  life_house : 'store-export-life-house',
}

const StoreList = (props) => {
  const { storeType, type } = props
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [returnVisible, setReturnVisible] = useState(false);
  const [excelVisible, setExcelVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [visit, setVisit] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false);
  const [orderVisible, setOrderVisible] = useState(false)
  const [orderId, setOrderId] = useState()
  const [auditInfoVisible, setAuditInfoVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [gradeChangeVisible, setGradeChangeVisible] = useState(false);
  const [createPcVisible, setCreatePcVisible] = useState(false);
  const [chargeRecordVisible, setChargeRecordVisible] = useState(false);
  const [attachmentImage, setAttachmentImage] = useState()
  const actionRef = useRef();
  const formRef = useRef();

  const handleMenuClick = ({ key }, data) => {
    if (key === '1') {
      setSelectItem({ ...data, type: 1 })
      setReturnVisible(true)
    }
    if (key === '2') {
      setSelectItem({ ...data, type: 2 })
      setReturnVisible(true)
    }

    if (key === '3') {
      setSelectItem({ ...data, toStatus: 3 })
      setFormVisible(true)
    }

    if (key === '4') {
      setSelectItem({ ...data, toStatus: 1 })
      setFormVisible(true)
    }

    if (key === '5') {
      setSelectItem({ ...data, toStatus: 2 })
      setFormVisible(true)
    }

    if (key === '6') {
      setSelectItem(data)
      setAuditInfoVisible(true)
    }

    if (key === '7') {
      setSelectItem(data)
      setGradeChangeVisible(true)
    }
    if (key === '8') {
      setSelectItem(data)
      setCreatePcVisible(true)
    }
    if (key === '9') {
      setSelectItem(data)
      setChargeRecordVisible(true)
    }
  }

  const menu = (data) => {
    return (
      <Menu onClick={(e) => { handleMenuClick(e, data) }}>
        {data.status.code === 2 && <Menu.Item key="1">线下退保证金登记</Menu.Item>}
        {data.status.code === 2 && <Menu.Item key="2">线上原路退回保证金</Menu.Item>}
        {data.status.code === 1 && <Menu.Item key="3">关闭</Menu.Item>}
        {data.status.code === 3 && <Menu.Item key="4">开启</Menu.Item>}
        {data.status.code === 3 && <Menu.Item key="5">注销</Menu.Item>}
        <Menu.Item key="6">审核资料</Menu.Item>
        {getAuth('store/member_shop/grade') && <Menu.Item key="7">
          店铺等级调整
        </Menu.Item>}
        <Menu.Item key="8">操作PC后台</Menu.Item>
        {data.status.code === 1 &&<Menu.Item key="9">缴费记录</Menu.Item>}
      </Menu>
    )
  }

  const columns = [
    {
      title: '店铺ID',
      dataIndex: 'id',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺ID'
      }
    },
    // {
    //   title: '店铺图片',
    //   dataIndex: 'storeLogo',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   render: (_) => <img src={_} width="50" height="50" />
    // },
    {
      title: '店铺编号',
      dataIndex: 'shopMemberAccount',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺编号'
      },
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
      hideInSearch: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
    },
    {
      title: '店主手机号',
      dataIndex: 'memberPhone',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主手机号'
      },
      hideInTable: true,
    },
    {
      title: '店主',
      dataIndex: 'phone',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => 
      <div>
        <div>{data.memberPhone?data.memberPhone:<span style={{ color:'red' }}>1881111100（第1次注销）</span>}</div>
        <div>{data.nickname === data.memberPhone ? '' : data.nickname}</div>
      </div>
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInTable: true,
      order:-1
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺类型',
      dataIndex: 'memberShopType',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return <div>{_.desc}</div>
      },
      hideInTable: storeType == 'freshStores' || storeType == 'vip',
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      },
      hideInSearch: storeType == 'vip',
    },
    {
      title: '店主姓名',
      dataIndex: 'realname',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主姓名'
      },
    },
    {
      title: 'VIP店铺',
      dataIndex: 'vip',
      valueType: 'text',
      valueEnum: {
        0: '否',
        1: '是'
      },
      hideInSearch: true,
      hideInTable: storeType === 'vip' || storeType === 'cancelled',
    },
    {
      title: 'PC开通状态',
      dataIndex: 'statusAction',
      valueType: 'text',
      hideInTable: storeType !== 'normal',
      hideInSearch: true,
      valueEnum: {
        1: '已开通',
        0: '未开通',
        2: '已注销'
      }
    },
    {
      title: 'PC系统',
      dataIndex: 'productList',
      valueType: 'text',
      hideInTable: storeType !== 'normal',
      hideInSearch: true,
      render: (_) => {
        return _.map(item => (
          <div key={item.id}>{`${item.name}(至${moment(item.usefulEnd * 1000).format('YYYY-MM-DD')})`}</div>
        ))
      }
    },
    {
      title: '类型',
      dataIndex: 'vipSource',
      valueType: 'text',
      valueEnum: {
        'upgrade': '升级',
        'settled': '入驻'
      },
      hideInTable: storeType != 'vip',
      hideInSearch: storeType != 'vip',
    },
    {
      title: '等级',
      dataIndex: ['level', 'levelName'],
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '爱心VIP状态',
      dataIndex: 'isJoinLoveFeedback',
      valueType: 'select',
      hideInSearch: storeType !== 'normal',
      hideInTable: storeType !== 'normal',
      valueEnum: {
        1: '爱心回馈VIP店铺',
        2: '非爱心回馈VIP店铺'
      },
      fieldProps: {
        placeholder:'请选择是否为爱心回馈VIP期限店铺'
      },
      order:-1
    },
    // {
    //   title: '积分',
    //   dataIndex: 'score',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    {
      title: '提货点所在地区',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, details) => {
        return (
          <>
            {details?.areaInfo?.[details?.provinceId]}{details?.areaInfo?.[details?.cityId]}{details?.areaInfo?.[details?.regionId]}
          </>)
      },
    },
    {
      title: '开通类型',
      dataIndex: 'lifeHouseFreeOpen',
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        1: '免费开通',
        0: '缴费开通'
      },
      hideInTable: storeType !== 'life_house'
    },
    {
      title: '合同签订状态',
      dataIndex: 'lifeHouseContractStatus',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType !== 'life_house'
    },
    {
      title: '氢原子交易',
      dataIndex: 'iotType',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType !== 'normal',
    },
    {
      title: '缴纳服务费方式',
      dataIndex: 'servicefeeType',
      valueType: 'text',
      valueEnum: {
        'upgrade': '已确认保证金转服务费',
        'pay': '支付服务费'
      },
      hideInTable: true,
      hideInSearch: storeType != 'vip',
    },
    {
      title: '缴纳服务费方式',
      dataIndex: 'servicefeeType',
      valueType: 'text',
      hideInTable: storeType != 'vip',
      hideInSearch: true,
    },
    {
      title: '提货点详细地址',
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'vip',
    },
    {
      title: '交保证金(元)',
      dataIndex: 'deposit',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'vip',
      render: (_) => _ / 100
    },
    {
      title: '交服务费(元)',
      dataIndex: 'serviceFee',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'vip',
      render: (_) => _ / 100
    },
    {
      title: '交授权费(元)',
      dataIndex: 'packagePeriodAmount',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType !== 'life_house',
      render: _ => _ / 100
    },
    {
      title: '开通套餐',
      dataIndex: 'packageTitle',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType !== 'life_house'
    },
    {
      title: '开通期限',
      dataIndex: 'packagePeriod',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType !== 'life_house'
    },
    {
      title: '生鲜柜',
      dataIndex: 'isOrdered',
      valueType: 'select',
      hideInSearch: storeType != 'freshStores',
      hideInTable: true,
      valueEnum: {
        1: '已购买',
        0: '未购买'
      },
    },
    {
      title: '生鲜柜订单号',
      dataIndex: 'isOrdered',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return <a onClick={() => { setOrderVisible(true); setOrderId(data?.freshOrder?.id) }}>{data?.freshOrder?.orderSn}</a>
      },
      hideInTable: storeType != 'freshStores',
    },
    {
      title: '开店必备礼包',
      dataIndex: 'isGiftOrdered',
      valueType: 'select',
      hideInSearch: storeType != 'freshStores',
      hideInTable: true,
      valueEnum: {
        1: '已购买',
        0: '未购买'
      },
    },
    {
      title: '开店必备礼包订单号',
      dataIndex: 'isGiftOrdered',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return <a onClick={() => { setOrderVisible(true); setOrderId(data?.giftOrder?.id) }}>{data?.giftOrder?.orderSn}</a>
      },
      hideInTable: storeType != 'freshStores',
    },
    {
      title: '是否生鲜店铺',
      dataIndex: 'memberShopType',
      valueType: 'select',
      hideInTable: true,
      hideInSearch: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
      valueEnum: {
        0: '全部',
        20: '生鲜店铺',
        10: '非生鲜店铺'
      },
    },
    {
      title: '生鲜店铺状态',
      dataIndex: 'verifyStatus',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
      valueEnum: {
        "0": '没有申请过',
        "1": '审核通过',
        "2": '审核不通过',
        "5": '取消申请',
        "6": '待审核'
      },
    },
    {
      title: '所属运营中心',
      dataIndex: 'operationCompanyName',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
      fieldProps: {
        placeholder: '请输入运营中心名称'
      },
    },
    {
      title: '所属运营中心ID',
      dataIndex: 'operationId',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
      render: (_, data) => {
        return <div>{_ == 0 ? '-' : _}</div>
      }
    },
    {
      title: '所属运营中心名称',
      dataIndex: 'operationCompanyName',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
    },
    {
      title: '申请类型',
      dataIndex: 'applyType',
      valueType: 'select',
      valueEnum: {
        10: '正常申请',
        11: 'VIP社区店',
        12: '买AED课程系统建店',
        20: '绿色通道申请',
        30: '健康生活馆',
        33: '爱心回馈系统建店'
      },
      hideInTable: true,
      hideInSearch: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
    },
    {
      title: '申请类型',
      dataIndex: storeType === 'freshStores' ? 'applyType' : ['applyType', 'code'],
      valueType: 'select',
      valueEnum: {
        10: '正常申请',
        11: 'VIP社区店',
        12: '买AED课程系统建店',
        20: '绿色通道申请',
        30: '健康生活馆',
        33: '爱心回馈系统建店'
      },
      hideInSearch: true,
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
    },
    {
      title: '店主收件号',
      dataIndex: 'phone',
      fieldProps: {
        placeholder: '请输入店主收件手机号'
      },
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
      hideInSearch: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '集约任务',
      dataIndex: 'wholeTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a
            onClick={() => {
              history.push({
                pathname: `/intensive-store-management/intensive-task/${data.storeNo}`,
                query: {
                  storeName: data.storeName,
                  phone: data.phone,
                  linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
                  memberId: data.memberId,
                }
              })
            }}>
            {_}
          </a>
          : _
      },
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '店内订单',
      dataIndex: 'saleOrderTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shopkeeper-order/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
              }
            })
          }}>
            {_}
          </a>
          :
          _
      },
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '商品',
      dataIndex: 'productTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/product-management/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
              }
            })
          }}>{_}</a>
          :
          _
      },
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '订单用户',
      dataIndex: 'userTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shop-user/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
              }
            })
          }}>{_}</a>
          :
          _
      },
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '直推用户',
      dataIndex: 'shopkeeperInvitedTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shopkeeper-user/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
                memberId: data.memberId,
              }
            })
          }}>{_}</a>
          :
          _
      },
      hideInTable: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '所在地区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect />)
    },
    {
      title: '详情地址',
      dataIndex: 'address',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入详情地址'
      },
      hideInTable: true,
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatus',
      valueType: 'select',
      hideInSearch: storeType != 'normal',
      hideInTable: true,
      valueEnum: {
        "normal": '全部',
        "11": '正常-已退部分保证金',
        "12": '正常-已退全部保证金',
        "13": '正常-未退保证金',
      },
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatusDesc',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'normal',
      render: (_, data) => {
        const { depositRefendList } = data;
        return (
          <>
            <div>{_}</div>
            {depositRefendList && depositRefendList.map(ele => {
              return <div key={ele.id}>{amountTransform(Number(ele.refendAmount), '/')}元（{ele.optAdminName}/{ele.refendTime}）</div>
            })}
          </>
        )
      },
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatus',
      valueType: 'select',
      hideInSearch: storeType != 'cancelled',
      hideInTable: true,
      valueEnum: {
        "cancelled": '全部',
        "20": '已注销-未退保证金',
        "21": '已注销-已退全部保证金',
        "22": '已注销-已退部分保证金',
      },
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatusDesc',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'cancelled',
      render: (_, data) => {
        const { depositRefendList } = data;
        return (
          <>
            <div>{_}</div>
            {
              depositRefendList?.[0]?.attach?.moneyCertificates &&
              <div>
                <a style={{ color: 'red' }} onClick={() => { setPreviewVisible(true); }}>查看线下退款凭证</a>
                <Image
                  width={200}
                  style={{ display: 'none' }}
                  src={depositRefendList?.[0]?.attach?.moneyCertificates}
                  preview={{
                    visible: previewVisible,
                    src: depositRefendList?.[0]?.attach?.moneyCertificates,
                    onVisibleChange: value => {
                      setPreviewVisible(value)
                    },
                  }}
                />
              </div>
            }
            {depositRefendList && depositRefendList.map(ele => {
              return <div>{{ 1: '线下退', 2: '线上退' }[ele.refendType]}{amountTransform(Number(ele.refendAmount), '/')}元（{ele.optAdminName}/{ele.refendTime}）</div>
            })}
          </>
        )
      }
    },
    {
      title: '营业状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInSearch: storeType == 'cancelled',
      hideInTable: true,
      valueEnum: {
        1: '已启用',
        3: '已关闭'
      },
    },
    {
      title: '营业状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'cancelled',
      render: (_, data) => {
        return (
          <>
            {_.desc}
          </>
        )
      },
    },
    {
      title: '生活馆有效期至',
      dataIndex: 'lifeHouseExpireTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType !== 'life_house'
    },
    {
      title: '生活馆剩余天数(天)',
      dataIndex: 'lifeHouseRemainingDay',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType !== 'life_house'
    },
    {
      title: 'VIP有效期至',
      dataIndex: 'vipExpireTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'vip',
    },
    {
      title: 'VIP剩余天数(天)',
      dataIndex: 'vipRemainingDay',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'vip',
    },
    {
      title: '店铺等级',
      dataIndex: 'level',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '一星店主',
        2: '二星店主',
        3: '三星店主',
        4: '四星店主',
        5: '五星店主',
      },
    },
    // {
    //   key: 'status',
    //   title: '集约任务',
    //   dataIndex: 'asdas',
    //   width: 100,
    //   valueType: 'checkbox',
    //   valueEnum: {
    //     all: { text: '参与过集约任务', status: 'Default' },

    //   },
    //   hideInTable: true,
    // },
    // {
    //   key: 'status',
    //   title: '用户关系',
    //   dataIndex: 'asdas',
    //   width: 100,
    //   valueType: 'checkbox',
    //   valueEnum: {
    //     all: { text: '已有直推用户', status: 'Default' }
    //   },
    //   hideInTable: true,
    // },
    {
      title: '注销原因',
      dataIndex: 'remark',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'cancelled',
      render: (_, data) => {
        if (data?.cancelInfo?.balance) {
          return (
            <>
              <p>有余额注销</p>
              <a onClick={() => { setVisible(true); setAttachmentImage(data?.cancelInfo?.attachList) }}>附件（点击查看）</a>
              <p>注销时还剩余额：{data?.cancelInfo?.balance}元</p>
              <pre className={styles.line_feed}>理由：{data?.cancelInfo?.reason}</pre>
              <p>（{data?.cancleTime}）</p>
            </>
          )
        } else {
          return (
            <>
              <p>{_}</p>
              <>
                {
                  data?.cancelInfo?.attachList?.length > 0 && <a onClick={() => { setVisible(true); setAttachmentImage(data?.cancelInfo?.attachList) }}>附件（点击查看）</a>
                }
              </>
              <p>（{data?.createTime}）</p>
            </>
          )
        }
      }
    },
    {
      title: '改价记录',
      dataIndex: 'isChangePrice',
      valueType: 'select',
      valueEnum: {
        0: '没有改价记录',
        1: '有改价记录',
      },
      hideInTable: true,
      hideInSearch: storeType == 'freshStores' || storeType == 'vip' || storeType === 'life_house',
    },
    {
      title: '提交认证时间',
      dataIndex: 'provideTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
      hideInSearch: storeType === 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '提交认证时间',
      dataIndex: 'provideTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType === 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '申请入驻审核通过时间',
      dataIndex: 'auditTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
      hideInSearch: storeType === 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '申请入驻审核通过时间',
      dataIndex: 'auditTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType === 'freshStores' || storeType == 'vip' || storeType === 'life_house'
    },
    {
      title: '注销时间',
      dataIndex: 'cancleTime',
      valueType: 'dateTimeRange',
      hideInTable: true,
      hideInSearch: storeType !== 'cancelled'
    },
    {
      title: 'PC开通状态',
      dataIndex: 'actionStatus',
      valueType: 'select',
      hideInTable: true,
      hideInSearch: storeType !== 'normal',
      valueEnum: {
        1: '已开通',
        0: '未开通',
        2: '已注销'
      }
    },
    {
      title: 'PC系统',
      dataIndex: 'actionId',
      valueType: 'select',
      hideInTable: true,
      hideInSearch: storeType !== 'normal',
      valueEnum: {
        10001: '预约系统',
        10002: '健康档案',
        10003: '充值系统',
      }
    },
    {
      title: '交保证金金额',
      dataIndex: 'deposit',
      valueType: 'text',
      renderFormItem: () => <RangeInput />,
      hideInSearch: storeType == 'vip',
      hideInTable: true,
    },
    {
      title: '交服务费金额',
      dataIndex: 'serviceFee',
      valueType: 'text',
      renderFormItem: () => <RangeInput />,
      hideInSearch: storeType == 'vip',
      hideInTable: true,
    },
    {
      title: 'VIP店铺',
      dataIndex: 'vip',
      valueType: 'select',
      valueEnum: {
        0: '非VIP店铺',
        1: 'VIP店铺'
      },
      hideInSearch: storeType === 'vip' || storeType === 'cancelled',
      hideInTable: true,
    },
    {
      title: '套餐类型',
      dataIndex: 'lifeHousePackageId',
      valueType: 'select',
      valueEnum: {
        1001: '一年套餐',
        1002: '两年套餐',
        1003: '三年套餐',
      },
      hideInSearch: storeType !== 'life_house',
      hideInTable: true,
    },
    {
      title: '开通类型',
      dataIndex: 'lifeHouseFreeOpen',
      valueType: 'select',
      valueEnum: {
        1: '免费开通',
        0: '缴费开通'
      },
      hideInSearch: storeType !== 'life_house',
      hideInTable: true,
    },
    {
      title: '有氢原子交易店铺',
      dataIndex: 'iotType',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: storeType !== 'normal',
      valueEnum: {
        investor: '购买托管',
        operator: '代运营'
      }
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, data) => (
        <Space>
          <Dropdown.Button onClick={() => { setSelectItem(data); setDetailVisible(true) }} overlay={() => { return menu(data) }}>详情</Dropdown.Button>
        </Space>
      ),
      hideInTable: storeType == 'freshStores' || storeType == 'vip'
    },
  ];

  const getFieldValue = () => {
    if (formRef?.current?.getFieldsValue) {
      const { current, pageSize, area = [], ...rest } = formRef?.current?.getFieldsValue?.();
      return {
        operation: storeType,
        provinceId: area[0]?.value,
        cityId: area[1]?.value,
        regionId: area[2]?.value,
        ...rest
      }
    }
    return {}
  }

  const postData = (data) => {
    return data.map(ele => ({ ...ele, verifyStatus: ele?.freshApplyRow?.verifyStatus?.code }))
  }

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        params={{
          operation: storeType,
        }}
        postData={postData}
        request={
          storeType == 'freshStores' ? applyConditionPage : getStoreList
        }
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        search={{
          defaultCollapsed: true,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            storeType === 'normal' &&
            <Button
              key="new"
              onClick={() => {
                setCreateVisible(true);
              }}
            >
              新建
            </Button>,
            (storeType != 'freshStores'&& storeType !== 'life_house') &&
            <>
              <Export
                change={(e) => { setVisit(e) }}
                key="export"
                type={exportType[storeType]}
                conditions={() => { return getFieldValue(searchConfig) }}
              />
              <ExportHistory key="exportHistory" show={visit} setShow={setVisit} type={exportType[storeType]} />
            </>
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        className={styles.store_list}
      />
      {
        createPcVisible &&
        <CreatePc
          data={selectItem}
          storeNo={selectItem?.storeNo}
          visible={createPcVisible}
          setVisible={setCreatePcVisible}
          callback={() => { setCreatePcVisible(false); actionRef.current.reload() }}
        />
      }
      {
        auditInfoVisible &&
        <AuditInfo
          storeNo={selectItem?.storeNo}
          visible={auditInfoVisible}
          setVisible={setAuditInfoVisible}
        />
      }
      {
        detailVisible &&
        <Detail
          storeNo={selectItem?.storeNo}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
      {formVisible && <Form
        visible={formVisible}
        setVisible={setFormVisible}
        data={selectItem}
        callback={() => { actionRef.current.reload() }}
        onClose={() => { actionRef.current.reload(); setSelectItem(null) }}
      />}
      {returnVisible && <Return
        visible={returnVisible}
        setVisible={setReturnVisible}
        data={selectItem}
        callback={() => { actionRef.current.reload() }}
      />}
      {createVisible && <Create
        visible={createVisible}
        setVisible={setCreateVisible}
        callback={() => { actionRef.current.reload() }}
      />}
      {excelVisible && <ExcelModal
        visible={excelVisible}
        setVisible={setExcelVisible}
        callback={() => { actionRef.current.reload() }}
      />}
      {orderVisible && <OrderDetail
        id={orderId}
        visible={orderVisible}
        setVisible={setOrderVisible}
      />}
      {visible && <ContentModel
        setVisible={setVisible}
        visible={visible}
        attachList={attachmentImage}
        onClose={() => { actionRef.current.reload(); setAttachmentImage(null) }}
      />
      }
      {gradeChangeVisible &&
        <GradeChange
          callback={() => { actionRef.current.reload() }}
          storeNo={selectItem.storeNo}
          visible={gradeChangeVisible}
          setVisible={setGradeChangeVisible}
        />
      }
      {chargeRecordVisible &&
        <StoreChargeRecord
          storeNo={selectItem.storeNo}
          visible={chargeRecordVisible}
          setVisible={setChargeRecordVisible}
        />
      }
    </>
  );
};

const ShopHealthPackages = (props) => {
  const { storeType } = props
  const location = useLocation();
  const actionRef = useRef();
  const formRef = useRef();
  const [visible, setVisible] = useState(false);
  const [sampleOrdervisible, setSampleOrderVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const isPurchase = location.pathname.includes('purchase')
  const isDocumentary = location.pathname.includes('documentary')
  const columns = [
    {
      title: '店铺ID',
      dataIndex: 'storeId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺ID'
      },
      order: 3
    },
    {
      title: '店主',
      dataIndex: 'memberPhone',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => <div><div>{data.memberPhone}</div><div>{data.nickname === data.memberPhone ? '' : data.nickname}</div></div>
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInTable: true,
      order:-1
    },
    {
      title: '用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      },
    },
    {
      title: '店主姓名',
      dataIndex: 'realname',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主姓名'
      },
      hideInSearch: true,
    },
    {
      title: '店主手机号',
      dataIndex: 'memberPhone',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主手机号'
      },
      hideInTable: true,
      order: 2
    },
    {
      title: 'VIP店铺',
      dataIndex: 'vipDesc',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '等级',
      dataIndex: 'shopMemberLevelName',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '提货点所在地区',
      dataIndex: storeType == 'purchased_gift_package_store'?'area':'areaInfoStr',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '提货点详细地址',
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '是否为赠送系统建店',
      dataIndex: 'giftShop',
      valueType: 'select',
      valueEnum: {
        1: '是',
        2: '否',
      },
      hideInTable: storeType != 'buy_aed',
      hideInSearch: true,
    },
    {
      title: '最近购买健康卡套餐名称',
      dataIndex: 'packageTitle',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'purchased_gift_package_store'
    },
    {
      title: '累计购买健康卡套餐金额',
      dataIndex: 'sumPayAmount',
      valueType: 'text',
      render: (_) => {
        return amountTransform(_,'/')
      },
      hideInSearch: true,
      hideInTable: storeType != 'purchased_gift_package_store'
    },
    {
      title: '最近购买健康卡套餐时间',
      dataIndex: 'lastCreateTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'purchased_gift_package_store'
    },
    {
      title: '最近购买健康卡套餐单号',
      dataIndex: 'lastOrderSn',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'purchased_gift_package_store'
    },
    {
      title: '购买套餐数量',
      dataIndex: 'orderNum',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'purchased_gift_package_store'
    },
    {
      title: '申请类型',
      dataIndex: 'applyType',
      valueType: 'select',
      valueEnum: {
        10: '正常申请',
        11: 'VIP社区店',
        12: '买AED课程系统建店',
        20: '绿色通道申请',
        30: '健康生活馆',
        33: '爱心回馈系统建店',
      },
      hideInTable: true,
      hideInSearch: storeType != 'love_customer_store',
    },
    {
      title: '最近领取回馈礼品名称',
      dataIndex: 'pgorderLastPackageTitle',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'love_customer_store'
    },
    {
      title: '累计捐赠金额',
      dataIndex: 'pgorderSumPayAmount',
      valueType: 'text',
      render: (_) => {
        return amountTransform(_,'/').toFixed(2)
      },
      hideInSearch: true,
      hideInTable: storeType != 'love_customer_store'
    },
    {
      title: '最近领取回馈时间',
      dataIndex: 'pgorderLastCreateTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'love_customer_store'
    },
    {
      title: '营业状态',
      dataIndex: 'statusDesc',
      hideInTable: storeType != 'love_customer_store',
      hideInSearch: true
    },
    {
      title: '店铺编号',
      dataIndex: 'shopMemberAccount',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'love_customer_store'
    },
    {
      title: '最近购买手指医生时间',
      dataIndex: 'purchaseOrderLastCreateTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'station_manager'
    },
    {
      title: '购买手指医生数量',
      dataIndex: 'purchaseOrderNum',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'station_manager'
    },
    {
      title: '最近购买手指医生订单号',
      dataIndex: 'purchaseOrderLastSubOrderSn',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'station_manager',
      render: (_,data) => {
        if(!isNaN(_)){
          return <a onClick={()=>{ setSelectItem(data); data?.purchaseOrderType==33?setVisible(true):setSampleOrderVisible(true); }}>{_}</a>
        }else{
          return '-'
        }
      }
    },
    {
      title: '最近捐赠3980元领取回馈礼包时间',
      dataIndex: 'packageOrderLastCreateTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'station_manager'
    },
    {
      title: '最近领取3980元礼包订单号',
      dataIndex: 'packageOrderLastOrderSn',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'station_manager',
      render: (_,data) => {
        if(!isNaN(_)){
          return <a onClick={()=>{ setSelectItem(data); setDetailVisible(true); }}>{_}</a>
        }else{
          return '-'
        }
      }
    },
    {
      title: '申请类型',
      dataIndex: 'applyType',
      valueType: 'select',
      valueEnum: {
        10: '正常申请',
        11: 'VIP社区店',
        12: '买AED课程系统建店',
        20: '绿色通道申请',
        30: '健康生活馆',
        33: '爱心回馈系统建店',
      },
      hideInTable: true,
      hideInSearch: storeType != 'buy_aed',
    },
    {
      title: '最近买AED课程名称',
      dataIndex: 'lastGoodsName',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'buy_aed'
    },
    {
      title: '累计购买AED课程金额',
      dataIndex: 'sumPayAmount',
      valueType: 'text',
      render: (_) => {
        return amountTransform(_,'/').toFixed(2)
      },
      hideInSearch: true, 
      hideInTable: storeType != 'buy_aed'
    },
    {
      title: '最近购买AED课程时间',
      dataIndex: 'lastTime',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'buy_aed'
    },
    {
      title: '店铺编号',
      dataIndex: 'shopMemberAccount',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType != 'buy_aed'
    },
  ];
  return (
    <>
      <ProTable
        rowKey="storeId"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        params={{
          operation: storeType
        }}
        request={memberShopPage}
        scroll={{ x: 'max-content', scrollToFirstRowOnChange: true, }}
        search={{
          defaultCollapsed: true,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse()
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
          showQuickJumper: true,
        }}
        className={styles.store_list}
      />
      {
        visible &&
        <IntensiveOrderDetail
          id={selectItem?.purchaseOrderLastSubOrderSn}
          visible={visible}
          setVisible={setVisible}
          isPurchase={isPurchase}
          skuId={selectItem?.purchaseOrderLastSkuId}
          isDocumentary={isDocumentary}
        />
      }
      {
        sampleOrdervisible &&
        <OrderDetail
          id={selectItem?.purchaseOrderLastSubOrderId}
          visible={sampleOrdervisible}
          setVisible={setSampleOrderVisible}
          isPurchase={isPurchase}
          isDocumentary={isDocumentary}
        />
      }
      {
        detailVisible&&
        <DetailDrawer
          visible={detailVisible}
          setVisible={setDetailVisible}
          id={selectItem?.packageOrderLastOrderId}
          state={selectItem?.isArrivalDesc}
        />
      }
    </>
  );
}

const OverallStore = () => {
  const [activeKey, setActiveKey] = useState('normal')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="normal" tab="正常店铺">
          {
            activeKey == 'normal' && <StoreList storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="cancelled" tab="已注销店铺">
          {
            activeKey == 'cancelled' && <StoreList storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="freshStores" tab="已买生鲜柜或开店礼包店铺">
          {
            activeKey == 'freshStores' && <StoreList storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="vip" tab="VIP社区店">
          {
            activeKey == 'vip' && <StoreList storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="life_house" tab="已开通健康生活馆店铺">
          {
            activeKey == 'life_house' && <StoreList storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="purchased_gift_package_store" tab="购买健康套餐店铺">
          {
            activeKey == 'purchased_gift_package_store' && <ShopHealthPackages storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="love_customer_store" tab="爱心回馈送VIP店铺">
          {
            activeKey == 'love_customer_store' && <ShopHealthPackages storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="station_manager" tab="健康服务站长">
          {
            activeKey == 'station_manager' && <ShopHealthPackages storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="buy_aed" tab="买AED课程送VIP店铺">
          {
            activeKey == 'buy_aed' && <ShopHealthPackages storeType={activeKey} />
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default OverallStore;