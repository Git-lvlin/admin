import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import ProForm, { ProFormText, ProFormSelect, ProFormCheckbox } from '@ant-design/pro-form';
import { Button, Space, Radio, Descriptions, Spin, Empty, Tag, Form } from 'antd';
import Pagination from '@/components/pagination'
import { history, useLocation } from 'umi';
import styles from './style.less';
import Delivery from '@/components/delivery'
import { amountTransform } from '@/utils/utils'
import { orderList, deliverGoods, orderList2, orderList3, findAdminOrderType } from '@/services/order-management/normal-order';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import ImportHistory from '@/components/ImportFile/import-history'
import Import from '@/components/ImportFile/import'
import Detail from './detail';
import EditAddress from './edit-address'
import CloseOrder from './close-order'
import TimeSelect from '@/components/time-select'


const TableList = () => {
  const location = useLocation();
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [visit, setVisit] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [pageTotal, setPageTotal] = useState(0)
  const [orderType, setOrderType] = useState(location?.query.orderTypes || 0)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(0)
  // const [deliveryVisible, setDeliveryVisible] = useState(false)
  const [importVisit, setImportVisit] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const isPurchase = location.pathname.includes('purchase')
  const isDocumentary = location.pathname.includes('documentary')
  const [orderStatusType, setOrderStatusType] = useState()
  const [orderTypes, setOrderTypes] = useState(location?.query.orderTypes || 0)
  const [addressVisible, setAddressVisible] = useState(false)
  const [subOrderId, setSubOrderId] = useState(null)
  const [orderVisible, setOrderVisible] = useState(false)
  const [primaryAddress,setPrimaryAddress] = useState({})
  const [orderTypeArr, setOrderTypeArr] = useState([])


  const [form] = Form.useForm()


  const pageChange = (a, b) => {
    setPage(a)
    setPageSize(b)
  }

  const orderTypeChange = (e) => {
    setOrderStatusType([])
    setOrderType(e.target.value)
    setPage(1)
  }

  const orderShipRequest = (values) => {
    deliverGoods({
      id: orderId,
      shippingCode: values.expressNo,
      expressType: values.expressId,
      expressName: values.expressName
    }, { showSuccess: true })
      .then(res => {
        if (res.code === 0) {
          setSearch(search + 1)
        }
      })
  }

  const getFieldValue = () => {
    const { time, orderStatusSet, payTime, ...rest } = form.getFieldsValue();
    console.log('time',time);
    return {
      orderStatus: orderType === 0 ? '' : orderType,
      startCreateTime: time?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      endCreateTime: time?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      payStartCreateTime: payTime?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      payEndCreateTime: payTime?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      orderStatusSet: orderType !== 0 ? [] : orderStatusSet,
      orderTypes: orderTypes == 0 ? [2, 3, 4, 11, 17, 18, 32, 33, 34, 36] : [orderTypes],
      exclusiveSubType: 1004,
      ...rest,
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...location?.query,
    })
    findAdminOrderType({}).then(res=>{
      if(res.code==0){
        setOrderTypeArr(res.data)
      }
    })
  }, [])

  useEffect(() => {
    setLoading(true);
    let apiMethod = isPurchase ? orderList2 : orderList;

    if (isDocumentary) {
      apiMethod = orderList3
    }

    apiMethod({
      page,
      size: pageSize,
      ...getFieldValue(),
    })
      .then(res => {
        if (res.code === 0) {
          setData(res.data.records)
          setPageTotal(res.data.total)
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }, [page, pageSize, orderType, form, search])
  return (
    <PageContainer>
      <ProForm
        // {...formItemLayout}
        form={form}
        style={{ backgroundColor: '#fff', padding: 10, paddingBottom: '0px' }}
        layout="inline"
        onFinish={() => {
          setPage(1)
          setSearch(search + 1)
        }}
        submitter={{
          render: ({ form }, doms) => {
            return (
              <div style={{ marginBottom: 20 }}>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      form?.submit();
                    }}
                  >
                    查询
                  </Button>
                  <Button
                    onClick={() => {
                      form?.resetFields();
                      form?.submit();
                      setOrderTypes(0)
                      setOrderStatusType([])
                    }}
                  >
                    重置
                  </Button>
                  <Export
                    change={(e) => { setVisit(e) }}
                    type={`${isDocumentary ?'order-common-doc-export':isPurchase ? 'purchase-order-common-export' : 'order-common-export'}`}
                    conditions={getFieldValue}
                  />
                  <ExportHistory show={visit} setShow={setVisit} type={`${isDocumentary ? 'order-common-doc-export' : isPurchase ? 'purchase-order-common-export' : 'order-common-export'}`} />
                  {
                    isPurchase
                    &&
                    <>
                      <Import
                        change={(e) => { setImportVisit(e) }}
                        code="order_common_send_goods_import"
                        conditions={getFieldValue}
                      />
                      <ImportHistory show={importVisit} setShow={setImportVisit} type="order_common_send_goods_import" />
                    </>
                  }
                </Space>
              </div>
            );
          },
        }}
      >
        <ProFormText
          label="订单号"
          name="orderSn"
          fieldProps={{
            style: {
              marginBottom: 20,
            }
          }}
        />
        <ProFormText
          name="goodsName"
          label="商品名称"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          name="buyerNickname"
          label="下单用户"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          name="phone"
          label="下单手机号"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          label="用户ID"
          name="buyerId"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        {/* <ProFormText
          label="所属商家"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        /> */}
        <ProFormSelect
          name="orderType"
          label="订单类型"
          options={orderTypeArr}
          fieldProps={{
            style: {
              marginBottom: 20,
              width: 180,
            },
            onChange: (val) => {
              setOrderTypes(val || 0)
            }
          }}
        />
        {isPurchase && <ProFormSelect
          label="商家类型"
          name="businessType"
          options={[
            {
              value: 1,
              label: '代理运营商家'
            }
          ]}
          fieldProps={{
            style: {
              marginBottom: 20,
              width: 180,
            }
          }}
        />}
        <ProForm.Item
          name="time"
          label="下单时间"
        >
          <TimeSelect defaultValue="过去90天"/>
        </ProForm.Item>
        <ProFormText
          name="consignee"
          label="收件人"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          name="shippingCode"
          label="物流单号"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        {
          isPurchase &&
          <>
            <ProFormText
              name="supplierId"
              label="供应商家ID"
              fieldProps={{
                style: {
                  marginBottom: 20
                }
              }}
            />
            <ProFormText
              name="supplierName"
              label="供应商家名称"
              fieldProps={{
                style: {
                  marginBottom: 20
                }
              }}
            />
            <ProFormCheckbox.Group
              name="orderStatusSet"
              label="订单状态"
              fieldProps={{
                onChange: (val) => {
                  setOrderType(0)
                  setOrderStatusType(val)
                },
                value: orderStatusType
              }}
              options={[
                {
                  label: '待发货',
                  value: 2
                },
                {
                  label: '已发货',
                  value: 3
                },
                {
                  label: '已完成',
                  value: 4
                },
              ]}
            />
          </>
        }
       <ProForm.Item
          name="payTime"
          label="支付时间"
        >
          <TimeSelect/>
        </ProForm.Item>
        <ProFormSelect
          label="大健康供应系统交易"
          name="objectId"
          options={[
            {
              value: 'provide',
              label: '是'
            },
            {
              value:'!provide',
              label: '否'
            }
          ]}
          fieldProps={{
            style: {
              marginBottom: 20,
              width: 180,
            }
          }}
        />
      </ProForm>
      <Radio.Group
        style={{ marginTop: 20 }}
        buttonStyle="solid"
        optionType="button"
        size="large"
        value={orderType}
        onChange={orderTypeChange}
        options={[
          {
            label: '全部订单',
            value: 0
          },
          {
            label: '待付款',
            value: 1
          },
          {
            label: '拼团中',
            value: 7
          },
          {
            label: '待发货',
            value: 2
          },
          {
            label: '已发货',
            value: 3
          },
          {
            label: '已完成',
            value: 4
          },
          {
            label: '已关闭',
            value: 5
          },
        ]
        }
      />
      <Spin
        spinning={loading}
      >
        <div className={styles.list_header_wrap}>
          <div className={styles.list_header}>
            <div>商品信息</div>
            {!isDocumentary &&<div>金额</div>}
            {/* <div>实收</div> */}
            <div>订单状态</div>
            <div>订单类型</div>
            <div>操作</div>
          </div>
        </div>
        {data.length === 0 &&
          <div>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        }
        <div style={{ marginBottom: 10 }}>
          {
            data.map(item => (
              <div className={styles.list} key={item.id}>
                {
                  isPurchase
                    ?
                    <div className={styles.store_name}>供应商家名称：{item.supplierName}（ID:{item.supplierId} 总计出单数：{item.orderCount}单）{(item.supplierHelper === 1 && isPurchase) && <Tag style={{ borderRadius: 10, marginLeft: 10 }} color="#f59a23">代运营</Tag>}</div>
                    :
                    <div className={styles.store_name}>供应商家ID：{item.supplierId}</div>
                }
                <div className={styles.second}>
                  <Space size="large">
                    <span>下单时间：{item.createTime.replace('T', ' ')}</span>
                    <span>订单号：{item.orderSn}</span>
                    <span>下单用户：{item.buyerNickname}</span>
                    <span>用户手机号：{item.buyerPhone}</span>
                    <span>用户ID：{item.buyerId}</span>
                    <span>支付单号：{item.paySn}</span>
                    {
                      (item.subType === 2 || item.subType === 21)
                      &&
                      <>
                        <span>启动机器ID：{item.orderItem[0].deviceId}</span>
                        <span>机器所属店主手机号：{item.storePhone}</span>
                      </>
                    }
                  </Space>
                </div>

                <div className={styles.body}>
                  <div className={styles.goods_info}>
                    {
                      item.orderItem.map(it => (
                        <div key={it.skuId}>
                          <img width="100" height="100" src={it.skuImageUrl} />
                          <div className={styles.info}>
                            <div>{it.goodsName}</div>
                            <div>
                              {!isDocumentary &&<>{({ 2: '秒约', 3: '拼团', 4: '团约', 11: '1688' }[item.orderType] || '秒约')}价：{amountTransform(it.skuSalePrice, '/')}元</>}
                              <time style={{ marginLeft: !isDocumentary ? 20 : 0 }}>规格：{it.skuName}</time>
                            </div>
                            {item.activityName && <div>参与活动名称：<span>{item.activityName}</span></div>}
                            <div>数量： <span>{it.skuNum}{it.unit}</span></div>
                            {!isDocumentary &&<div>小计： <span>{amountTransform(it.totalAmount, '/')}</span>元</div>}
                            {isPurchase && <div>零售商家结算价： ¥{amountTransform(it.retailSupplyPrice, '/')}</div>}
                            {it.afterSalesStatus !== 0 && <Tag style={{ borderRadius: 10 }} color="#f59a23"><span style={{ color: '#fff' }}>{it.afterSalesStatusStr}</span></Tag>}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {!isDocumentary &&<div>
                    <Descriptions column={1} labelStyle={{ width: 100, justifyContent: 'flex-end' }}>
                      <Descriptions.Item label="商品总金额">{amountTransform(item.goodsTotalAmount, '/')}元</Descriptions.Item>
                      <Descriptions.Item label="运费">{item.shippingType ? `+${amountTransform(item.shippingFeeAmount, '/')}元` : '收货时付运费'}</Descriptions.Item>
                      <Descriptions.Item label="红包">
                        {
                          item?.orderType === 17
                            ? '盲盒全额抵扣'
                            : `-${amountTransform(item.couponAmount, '/')}元${item?.orderType === 18 ? '（签到红包）' : ''}`
                        }
                      </Descriptions.Item>
                      <Descriptions.Item label="用户实付">{amountTransform(item.payAmount, '/')}元</Descriptions.Item>
                    </Descriptions>
                  </div>}
                  {/* <div style={{ textAlign: 'center' }}>
                  {item.status === 5 ? 0 : amountTransform(item.incomeAmount, '/')}元
                </div> */}
                  <div style={{ textAlign: 'center' }}>
                    {{ 1: '待付款', 2: '待发货', 3: '已发货', 4: '已完成', 5: '已关闭', 6: '无效订单' }[item.status]}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Tag style={{ borderRadius: 10, marginTop: '10px' }} color="#f59a23">
                      {
                        item.orderTypeDesc
                        // item.subType === 1001 && item.orderType === 33?(
                        //   <Tag style={{ borderRadius: 10, marginTop: '10px' }} color="#f59a23">
                        //     爱心回馈订单 
                        //   </Tag>
                        // ):
                        // item.subType === 1001 && item.orderType === 34?(
                        //   <Tag style={{ borderRadius: 10, marginTop: '10px' }} color="#f59a23">
                        //     健康礼包订单 
                        //   </Tag>
                        // ):item.subType ? ( <Tag style={{ borderRadius: 10, marginTop: '10px' }} color="#f59a23">{({ 4: '氢原子购买', 3: '氢原子押金', 2: '氢原子启动',  5: '分享', 21: '氢原子启动', 42: '氢原子托管购买', 22: '氢原子托管启动', 23: '健康检测启动'}[item.subType])}订单</Tag> )
                        // :( <Tag style={{ borderRadius: 10 }} color="#f59a23">{({ 2: '秒约', 3: '拼团', 4: '团约', 11: '1688', 17: '盲盒活动', 18: '签到活动', 666: '氢原子购买', 888: '氢原子押金', 999: '氢原子启动'}[item.orderType] || '秒约')}订单</Tag> )
                      }
                    </Tag>
                    {
                      item.relevant1688OrderId && <div>关联1688单号：{item.relevant1688OrderId}</div>
                    }
                     {
                      item.objectName && <div>{item.objectName}</div>
                    }
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {/* <a onClick={() => { history.push(`/order-management/normal-order-detail${isPurchase ? '-purchase' : ''}/${item.id}`) }}>详情</a> */}
                    <a onClick={() => { setSelectItem(item); setDetailVisible(true); }}>详情</a>
                    {
                      item.orderTypeDesc === 'AED早筛订单' &&
                      <div>
                        <a href={`/product-performance-management/AED-performance-management/early-user-management?id=${item.orderSn}`} target='_blank'>早筛检测</a>
                      </div>
                    }
                  </div>
                </div>

                <div className={styles.footer}>
                  <Space size="large">
                    <span>收货人：{item.consignee}</span>
                    <span>电话：{item.phone}</span>
                    <span>地址：{item.address}</span>
                    {
                      (orderType === 1 || orderType === 2) &&
                      <Button onClick={() => { setSubOrderId(item.id); setAddressVisible(true); setPrimaryAddress(item) }}>修改地址</Button>
                    }
                    {/* {
                      orderType === 2 &&
                      <Button onClick={() => { setSubOrderId(item.id); setOrderVisible(true) }}>关闭订单</Button>
                    } */}
                  </Space>
                </div>
              </div>
            ))
          }
        </div>
      </Spin>
      {
        detailVisible &&
        <Detail
          id={selectItem?.id}
          visible={detailVisible}
          setVisible={setDetailVisible}
          isPurchase={isPurchase}
          isDocumentary={isDocumentary}
        />
      }
      {
        addressVisible &&
        <EditAddress
          subOrderId={subOrderId}
          primaryAddress={primaryAddress}
          setVisible={setAddressVisible}
          visible={addressVisible}
          setChange={setSearch}
          change={search}
        />
      }
      {
        orderVisible &&
        <CloseOrder
          subOrderId={subOrderId}
          setVisible={setOrderVisible}
          visible={orderVisible}
          setChange={setSearch}
          change={search}
        />
      }
      <div
        className={styles.pagination}
      >
        <Pagination
          total={pageTotal}
          showTotal={(total, range) =>{ 
            if(total==null){
              return `总共 0 条`
            }
             return  `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
          }}
          pageSize={pageSize}
          current={page}
          onChange={pageChange}
          showQuickJumper
        />
      </div>
    </PageContainer>
  );
};

export default TableList;
