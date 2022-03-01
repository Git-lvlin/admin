import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Tooltip,Image } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { getStoreList,applyConditionPage } from '@/services/intensive-store-management/store-list';
import { history } from 'umi';
import AddressCascader from '@/components/address-cascader';
import Auth from '@/components/auth';
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

const StoreList = (props) => {
  const { storeType } = props
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [returnVisible, setReturnVisible] = useState(false);
  const [excelVisible, setExcelVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [visit, setVisit] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false);
  const [orderVisible,setOrderVisible]=useState(false)
  const [orderId,setOrderId]=useState()
  const [auditInfoVisible, setAuditInfoVisible] = useState(false);
  const [attachmentImage,setAttachmentImage]=useState()
  const actionRef = useRef();
  const formRef = useRef();

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
      title: '生鲜店铺编号',
      dataIndex: 'shopMemberAccount',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入生鲜店铺编号'
      },
      hideInTable: storeType == 'freshStores',
      hideInSearch: storeType == 'freshStores',
      width:200
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
      render: (_, data) => <div><div>{data.memberPhone}</div><div>{data.nickname === data.memberPhone ? '' : data.nickname}</div></div>
    },
    {
      title: '店主类型',
      dataIndex: 'memberShopType',
      valueType: 'text',
      hideInSearch: true,
      render:(_,data)=>{
        return <p>{_.desc}</p>
      },
      hideInTable: storeType == 'freshStores',
      width:200
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      },
      width:200
    },
    {
      title: '等级',
      dataIndex: ['level', 'levelName'],
      valueType: 'text',
      hideInSearch: true,
      width:200
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
      width:200
    },
    {
      title: '提货点详细地址',
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
      width:200
    },
    {
      title: '生鲜柜',
      dataIndex: 'isOrdered',
      valueType: 'select',
      hideInSearch: storeType != 'freshStores',
      hideInTable: true,
      valueEnum:{
        1: '已购买',
        0: '未购买'
      },
    },
    {
      title: '生鲜柜订单号',
      dataIndex: 'isOrdered',
      valueType: 'text',
      hideInSearch: true,
      render:(_,data)=>{
        return <a onClick={()=>{setOrderVisible(true);setOrderId(data?.freshOrder?.id)}}>{data?.freshOrder?.orderSn}</a>
      },
      hideInTable: storeType != 'freshStores'
    },
    {
      title: '开店必备礼包',
      dataIndex: 'isGiftOrdered',
      valueType: 'select',
      hideInSearch: storeType != 'freshStores',
      hideInTable: true,
      valueEnum:{
        1: '已购买',
        0: '未购买'
      },
    },
    {
      title: '开店必备礼包订单号',
      dataIndex: 'isGiftOrdered',
      valueType: 'text',
      hideInSearch: true,
      render:(_,data)=>{
        return <a onClick={()=>{setOrderVisible(true);setOrderId(data?.giftOrder?.id)}}>{data?.giftOrder?.orderSn}</a>
      },
      hideInTable: storeType != 'freshStores'
    },
    {
      title: '是否生鲜店铺',
      dataIndex: 'memberShopType',
      valueType: 'select',
      hideInTable:true,
      hideInSearch: storeType == 'freshStores',
      valueEnum:{
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
      hideInTable: storeType == 'freshStores',
      valueEnum: {
        "0": '没有申请过',
        "1": '审核通过',
        "2": '审核不通过',
        "5": '取消申请',
        "6": '待审核'
      },
      width:200
    },
    {
      title: '所属运营中心',
      dataIndex: 'operationCompanyName',
      valueType: 'text',
      hideInTable: true,
      hideInSearch: storeType == 'freshStores',
      fieldProps: {
        placeholder: '请输入运营中心名称'
      },
      width:200
    },
    {
      title: '所属运营中心ID',
      dataIndex: 'operationId',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'freshStores',
      width:200
    },
    {
      title: '所属运营中心名称',
      dataIndex: 'operationCompanyName',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'freshStores',
      width:200
    },
    {
      title: '店主收件号',
      dataIndex: 'phone',
      fieldProps: {
        placeholder: '请输入店主收件手机号'
      },
      order: -1,
      hideInTable: storeType == 'freshStores'
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
      hideInTable: storeType == 'freshStores'
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
      hideInTable: storeType == 'freshStores'
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
      hideInTable: storeType == 'freshStores'
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
      hideInTable: storeType == 'freshStores'
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
      hideInTable: storeType == 'freshStores'
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
      hideInSearch: storeType == 'cancelled',
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
      hideInTable: storeType == 'cancelled'||storeType == 'freshStores',
      render: (_, data) => {
        const { depositRefendList } = data;
        return (
          <>
            <p>{_}</p>
            {depositRefendList && depositRefendList.map(ele => {
              return <p>{amountTransform(Number(ele.refendAmount), '/')}元（{ele.optAdminName}/{ele.refendTime}）</p>
            })}
          </>
        )
      },
      width:200
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatus',
      valueType: 'select',
      hideInSearch: storeType == 'normal'||storeType == 'freshStores',
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
      hideInTable: storeType == 'normal'||storeType == 'freshStores',
      render: (_, data) => {
        const { depositRefendList } = data;
        return (
          <>
            <p>{_}</p>
            {depositRefendList && depositRefendList.map(ele => {
              return <p>{amountTransform(Number(ele.refendAmount), '/')}元（{ele.optAdminName}/{ele.refendTime}）</p>
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
      width:200
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
      hideInTable: storeType == 'normal'||storeType == 'freshStores',
      render: (_, data) => {
        if(data?.cancelInfo?.balance){
          return (
            <>
              <p>有余额注销</p>
              <a onClick={() => {setVisible(true);setAttachmentImage(data?.cancelInfo?.attachList)}}>附件（点击查看）</a>
              <p>注销时还剩余额：{data?.cancelInfo?.balance}元</p>
              <pre className={styles.line_feed}>理由：{data?.cancelInfo?.reason}</pre>
            </>
          )
        }else{
          return (
            <>
              <p>{_}</p>
              <p>（{data?.createTime}）</p>
            </>
          )
        }
      }
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          <a onClick={() => { setSelectItem(data); setDetailVisible(true) }}>详情</a>
          {data.status.code === 2 && <a onClick={() => { setSelectItem({ ...data, type: 1 }); setReturnVisible(true) }}>线下退保证金登记</a>}
          {data.status.code === 2 && <a onClick={() => { setSelectItem({ ...data, type: 2 }); setReturnVisible(true) }}>线上原路退回保证金</a>}
          {data.status.code === 1 && <a onClick={() => { setSelectItem({ ...data, toStatus: 3 }); setFormVisible(true) }}>关闭</a>}
          {data.status.code === 3 && <a onClick={() => { setSelectItem({ ...data, toStatus: 1 }); setFormVisible(true) }}>开启</a>}
          {data.status.code === 3 && <a onClick={() => { setSelectItem({ ...data, toStatus: 2 }); setFormVisible(true) }}>注销</a>}
          <a onClick={() => { setSelectItem(data); setAuditInfoVisible(true) }}>审核资料</a>
          <Auth
            name="store/member_shop/grade"
          >
            <GradeChange
              callback={() => { actionRef.current.reload() }}
              storeNo={data.storeNo}
            />
          </Auth>
          
        </Space>
      ),
      hideInTable: storeType == 'freshStores',
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

  const postData=(data)=>{
    return data.map(ele=>({...ele,verifyStatus:ele?.freshApplyRow?.verifyStatus?.code}))
  }

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        params={{
          operation: storeType
        }}
        postData={postData}
        request={
          storeType == 'freshStores'?applyConditionPage:getStoreList
        }
        scroll={{ x: 'max-content' }}
        search={{
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button
              key="new"
              onClick={() => {
                setCreateVisible(true);
              }}
            >
              新建
            </Button>,
            <Export
              change={(e) => { setVisit(e) }}
              key="export"
              type={storeType == 'normal' ? "community-shopkeeper-export" : "community-shopkeeper-cancelled-export"}
              conditions={getFieldValue}
            />,
            <ExportHistory key="exportHistory" show={visit} setShow={setVisit} type={storeType == 'normal' ? "community-shopkeeper-export" : "community-shopkeeper-cancelled-export"} />
            // <Button
            //   key="new2"
            //   onClick={() => {
            //     setExcelVisible(true);
            //   }}
            // >
            //   批量新建
            // </Button>,
            // <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>,
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
        className={styles.store_list}
      />
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
        onClose={()=>{ actionRef.current.reload();setSelectItem(null) }}
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
      {visible&& <ContentModel
        setVisible={setVisible}
        visible={visible}
        attachList={attachmentImage}
        onClose={()=>{actionRef.current.reload();setAttachmentImage(null)}}
      />
      }
    </>
  );
};


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
      </ProCard>
    </PageContainer>
  )
}

export default OverallStore;
