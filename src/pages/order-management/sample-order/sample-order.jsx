import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import ProForm, { ProFormText, ProFormSelect, ProFormCheckbox } from '@ant-design/pro-form';
import { Button, Space, Radio, Descriptions, Spin, Empty, Tag, Form } from 'antd';
import Pagination from '@/components/pagination'
import { history, useLocation } from 'umi';
import styles from './style.less';
import Delivery from '@/components/delivery'
import { amountTransform } from '@/utils/utils'
import { orderList, deliverGoods, orderList2, orderList4 } from '@/services/order-management/normal-order';
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import ImportHistory from '@/components/ImportFile/import-history'
import Import from '@/components/ImportFile/import'
import Detail from './detail';
import EditAddress from './edit-address'
import TimeSelect from '@/components/time-select'


const TableList = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [visit, setVisit] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [pageTotal, setPageTotal] = useState(0)
  const [orderType, setOrderType] = useState(0)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(0)
  // const [deliveryVisible, setDeliveryVisible] = useState(false)
  const [importVisit, setImportVisit] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const location = useLocation();
  const isPurchase = location.pathname.includes('purchase')
  const isDocumentary = location.pathname.includes('documentary')
  const [orderStatusType, setOrderStatusType] = useState()
  const [addressVisible, setAddressVisible] = useState(false)
  const [subOrderId, setSubOrderId] = useState(null)


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
    const { time, orderStatusSet, ...rest } = form.getFieldsValue();

    return {
      orderStatus: orderType === 0 ? '' : orderType,
      startCreateTime: time?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      endCreateTime: time?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      orderStatusSet: orderType !== 0 ? [] : orderStatusSet,
      orderType: 22,
      ...rest,
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      ...location?.query,
    })
  }, [])

  useEffect(() => {
    setLoading(true);
    let apiMethod = isPurchase ? orderList2 : orderList;

    if (isDocumentary) {
      apiMethod = orderList4
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
              <div>
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
                      setOrderStatusType([])
                    }}
                  >
                    重置
                  </Button>
                  <Export
                    change={(e) => { setVisit(e) }}
                    type={`${isDocumentary ?'order-common-sample-export':isPurchase ? 'purchase-order-simple-export' : 'order-simple-export'}`}
                    conditions={getFieldValue}
                  />
                  <ExportHistory show={visit} setShow={setVisit} type={`${isDocumentary ? 'order-common-sample-export' : isPurchase ? 'purchase-order-simple-export' : 'order-simple-export'}`} />
                  {
                    isPurchase
                    &&
                    <>
                      <Import
                        change={(e) => { setImportVisit(e) }}
                        code="order_simple_send_goods_import"
                        conditions={getFieldValue}
                      />
                      <ImportHistory show={importVisit} setShow={setImportVisit} type="order_simple_send_goods_import" />
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
        {/* <ProFormText
          label="所属商家"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        /> */}
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
        <ProFormText
          name="buyerId"
          label="用户ID"
          fieldProps={{
            style: {
              marginBottom: 20
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
            {!isDocumentary && <div>金额</div>}
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
                              {!isDocumentary &&<>样品价：{amountTransform(it.skuSalePrice, '/')}元</>}
                              <time style={{ marginLeft: !isDocumentary ? 20 : 0 }}>规格：{it.skuName}</time>
                            </div>
                            <div>数量： <span>{it.skuNum}{it.unit}</span></div>
                            {!isDocumentary && <div>小计： <span>{amountTransform(it.totalAmount, '/')}</span>元</div>}
                            {isPurchase && <div>样品商家结算价： ¥{amountTransform(it.retailSupplyPrice, '/')}</div>}
                            {it.afterSalesStatus !== 0 && <Tag style={{ borderRadius: 10 }} color="#f59a23"><span style={{ color: '#fff' }}>{it.afterSalesStatusStr}</span></Tag>}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {!isDocumentary && <div>
                    <Descriptions column={1} labelStyle={{ width: 100, justifyContent: 'flex-end' }}>
                      <Descriptions.Item label="商品总金额">{amountTransform(item.goodsTotalAmount, '/')}元</Descriptions.Item>
                      <Descriptions.Item label="运费">+{amountTransform(item.shippingFeeAmount, '/')}元</Descriptions.Item>
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
                    <Tag style={{ borderRadius: 10 }} color="#FB1C1C">样品订单</Tag>
                    {
                      item.relevant1688OrderId && <div>关联1688单号：{item.relevant1688OrderId}</div>
                    }
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {/* <a onClick={() => { history.push(`/order-management/normal-order-detail${isPurchase ? '-purchase' : ''}/${item.id}`) }}>详情</a> */}
                    <a onClick={() => { setSelectItem(item); setDetailVisible(true); }}>详情</a>
                  </div>
                </div>

                <div className={styles.footer}>
                  <Space size="large">
                    <span>收货人：{item.consignee}</span>
                    <span>电话：{item.phone}</span>
                    <span>地址：{item.address}</span>
                    {
                      (orderType === 1 || orderType === 2) &&
                      <Button onClick={() => { setSubOrderId(item.id); setAddressVisible(true) }}>修改地址</Button>
                    }
                  </Space>
                </div>
              </div>
            ))
          }
        </div>

      </Spin>
      {
        addressVisible &&
        <EditAddress
          subOrderId={subOrderId}
          setVisible={setAddressVisible}
          visible={addressVisible}
          setChange={setSearch}
          change={search}
        />
      }
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

      <div
        className={styles.pagination}
      >
        <Pagination
          total={pageTotal}
          showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
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
