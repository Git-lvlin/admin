import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import ProForm, { ProFormText, ProFormSelect, ProFormCheckbox } from '@ant-design/pro-form';
import { Button, Space, Radio, Descriptions, Spin, Empty, Form, Modal, Tag, Popconfirm } from 'antd';
import Pagination from '@/components/pagination'
import { history, useLocation } from 'umi';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import moment from 'moment';
import styles from './style.less';
import { orderList, refundAllRetailOrders, getPurchaseOrderList, refundOrder, getFollowOrderList, apply5, audit5 } from '@/services/order-management/supplier-order';
import { amountTransform } from '@/utils/utils'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import ImportHistory from '@/components/ImportFile/import-history'
import Import from '@/components/ImportFile/import'
import Detail from './detail';
import Auth from '@/components/auth';
import EditAddress from './edit-address'
import TimeSelect from '@/components/time-select'

const { confirm } = Modal;


const TableList = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageTotal, setPageTotal] = useState(0)
  const [orderType, setOrderType] = useState('')
  const [loading, setLoading] = useState(false)
  const [deliveryVisible, setDeliveryVisible] = useState(false)
  const [form] = Form.useForm()
  const location = useLocation();
  const [visit, setVisit] = useState(false)
  const [importVisit, setImportVisit] = useState(false)
  const isPurchase = location.pathname.includes('purchase')
  const isDocumentary = location.pathname.includes('documentary')
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [orderStatusType, setOrderStatusType] = useState()
  const [subOrderId, setSubOrderId] = useState(null)
  const [addressVisible, setAddressVisible] = useState(false)
  const [primaryAddress, setPrimaryAddress] = useState({})

  const pageChange = (a, b) => {
    setPage(a)
    setPageSize(b)
  }

  const orderTypeChange = (e) => {
    setOrderStatusType([])
    setOrderType(e.target.value)
    setPage(1)
  }

  const refund = (orderId) => {
    confirm({
      title: '与此订单关联的C端订单将执行关闭并退款，确定启动吗？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        refundAllRetailOrders({
          orderId
        }, { showSuccess: true })
          .then(res => {
            if (res.code === 0) {
              setSearch(search + 1)
            }
          })
      },
    });
  }

  const getFieldValue = () => {
    const { time, statusArr, ...rest } = form.getFieldsValue();

    return {
      status: orderType,
      startTime: time?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
      endTime: time?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      memberId: location?.query?.memberId,
      wsId: location?.query?.wsId,
      operatorSource: 2,
      statusArr: orderType !== '' ? [] : statusArr,
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
    let apiMethod = isPurchase ? getPurchaseOrderList : orderList;
    if (isDocumentary) {
      apiMethod = getFollowOrderList
    }
    apiMethod({
      page,
      size: pageSize,
      ...getFieldValue()
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
        onFinish={() => {
          setPage(1)
          setSearch(search + 1)
        }}
        layout="inline"
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
                      setOrderStatusType([])
                    }}
                  >
                    重置
                  </Button>
                  <Export
                    change={(e) => { setVisit(e) }}
                    type={`${isDocumentary ? 'followOrderList' : isPurchase ? 'purchase-order-intensive-export' : 'order-intensive-export'}`}
                    conditions={getFieldValue}
                  />
                  <ExportHistory show={visit} setShow={setVisit} type={`${isDocumentary ? 'followOrderList' : isPurchase ? 'purchase-order-intensive-export' : 'order-intensive-export'}`} />
                  {
                    isPurchase && !isDocumentary
                    &&
                    <>
                      <Import
                        change={(e) => { setImportVisit(e) }}
                        code="order_intensive_send_goods_import"
                        conditions={getFieldValue}
                      />
                      <ImportHistory show={importVisit} setShow={setImportVisit} type="order_intensive_send_goods_import" />
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
          name="orderId"
          fieldProps={{
            style: {
              marginBottom: 20,
            }
          }}
        />
        <ProFormText
          label="商品名称"
          name="goodsName"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          name="nickName"
          label="下单用户"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          label="下单手机号"
          name="phoneNumber"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          label="用户ID"
          name="memberId"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        {isPurchase && <ProFormSelect
          label="商家类型"
          name="supplierType"
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
        {/* <ProFormSelect
          label="尾款类型"
          name="isMerge"
          options={[
            {
              value: 1,
              label: '拼约尾款'
            },
            {
              value: 0,
              label: '直接尾款'
            }
          ]}
          fieldProps={{
            style: {
              marginBottom: 20,
              width: 180,
            }
          }}
        /> */}
         <ProForm.Item
          name="time"
          label="下单时间"
        >
          <TimeSelect defaultValue="过去90天"/>
        </ProForm.Item>
        {
          !isPurchase && <ProFormSelect
            label="活动订单"
            name="activityCode"
            options={[
              {
                value: '',
                label: '请选择'
              },
              {
                value: 'wsCentActiveCode',
                label: '一分钱领菜活动'
              },
              {
                value: 'wsDiscountActiveCode',
                label: '特价生鲜活动'
              },
            ]}
            fieldProps={{
              style: {
                marginBottom: 20,
                width: 180,
              }
            }}
          />
        }

        <ProFormText
          name="receiptUser"
          label="收件人"
          fieldProps={{
            style: {
              marginBottom: 20
            }
          }}
        />
        <ProFormText
          name="expressNo"
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
              name="statusArr"
              label="订单状态"
              fieldProps={{
                onChange: (val) => {
                  setOrderType('')
                  setOrderStatusType(val)
                },
                value: orderStatusType
              }}
              options={[
                // {
                //   label: '已付尾款',
                //   value: 2
                // },
                {
                  label: '待收货',
                  value: 3
                },
                {
                  label: '已完成',
                  value: 5
                },
              ]}
            />
          </>
        }
        <ProFormSelect
          label="订单类别"
          name="businessType"
          options={[
            {
              value: 1,
              label: '普适品'
            },
            {
              value: 2,
              label: '精装生鲜'
            },
            {
              value: 3,
              label: '散装生鲜'
            },
            {
              value: 30,
              label: '新集约'
            },
          ]}
          fieldProps={{
            style: {
              marginBottom: 20,
              width: 180,
            }
          }}
        />
        <ProFormText
          name="wsId"
          label="集约活动ID"
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
            value: ''
          },
          {
            label: '待付款',
            value: 0
          },
          {
            label: '已付款',
            value: 2
          },
          // {
          //   label: '已付尾款',
          //   value: 2
          // },
          {
            label: '待收货',
            value: 3
          },
          {
            label: '已完成',
            value: 5
          },
          {
            label: '已关闭',
            value: 6
          },
        ]}
      />
      <Spin
        spinning={loading}
      >
        <div className={styles.list_header_wrap}>
          <div className={styles.list_header}>
            <div>商品信息</div>
            {!isDocumentary &&<div>支付金额</div>}
            <div>商品ID</div>
            {/* <div>合计实收</div> */}
            <div>订单状态</div>
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
                <div className={styles.second}>
                  <Space size="large">
                    <span>下单时间：{item.createTime}</span>
                    <span>主单号：{item.sumOrderId}</span>
                    <span>下单用户：{item.store.linkman}</span>
                    <span>用户手机号：{item.store.phone}</span>
                    <span>下单店铺ID：{item.storeNo}</span>
                    {!!+item.wsId && <span>商品归属集约活动ID：{item.wsId}</span>}
                    {!isDocumentary && <span>总金额：{amountTransform(item.totalFee, '/')}元</span>}
                    <span>用户ID：{item.memberId}</span>
                  </Space>
                </div>
                {item.businessType === 30
                  ?
                  <>
                    <Tag style={{ borderRadius: 2, position: 'absolute', marginLeft: 10, marginTop: 10 }} color="#f59a23">直发到店</Tag>
                    <Tag style={{ borderRadius: 2, position: 'absolute', marginLeft: 80, marginTop: 10 }} color='#58B138'>新集约商品</Tag>
                  </>
                  :
                  <>
                    <Tag style={{ borderRadius: 2, position: 'absolute', marginLeft: 10, marginTop: 10 }} color="#f59a23">{item.wholesaleFlowType === 1 ? '直发到店' : '运营中心配送'}</Tag>
                    <Tag style={{ borderRadius: 2, position: 'absolute', marginLeft: 110, marginTop: 10 }} color='#58B138'>{item?.businessType !== 1 ? (item?.businessType === 2 ? '精装生鲜' : '散装生鲜') : '普适品'}</Tag>
                  </>
                }

                {
                  item.isRefund && <Tag style={{ borderRadius: 2, position: 'absolute', marginLeft: 185, marginTop: 10 }} color="#7FA1FD">{item.isRefund}</Tag>
                }
                {
                  isPurchase
                    ?
                    <div className={styles.store_name}><span>订单号：{item.orderId}</span>&nbsp; &nbsp; &nbsp; &nbsp; 供应商家名称：{item.supplier.companyName}（ID:{item.supplierId} 总计出单数：{item.supplierOrderNums}单）{(item.isAgent === 1 && isPurchase) && <Tag style={{ borderRadius: 10, marginLeft: 10 }} color="#f59a23">代运营</Tag>}</div>
                    :
                    <div className={styles.store_name}><span>订单号：{item.orderId}</span>&nbsp; &nbsp; &nbsp; &nbsp; 供应商家ID：{item.supplier.supplierId}</div>
                }
                <div className={styles.body}>
                  <div className={styles.goods_info}>
                    {
                      item.sku.map(it => (
                        <div>
                          <img width="100" height="100" src={it.skuImageUrl} />
                          <div className={styles.info}>
                            <div>{it.goodsName}</div>
                            <div>
                              {!isDocumentary &&<>集约价：{amountTransform(it.price, '/')}元{it?.wholesaleFreight > 0 ? `（含平均运费¥${amountTransform(it?.wholesaleFreight, '/')}/件）` : ''}</>}
                              <time style={{ marginLeft: !isDocumentary?20:0 }}>规格：{it.skuName}</time>
                            </div>
                            <div>数量： <span>{it.totalNum}</span>{it.unit}</div>
                            {
                              !isDocumentary && <>
                                <div>商品小计： <span>{amountTransform(it.totalAmount, '/')}</span>元</div>
                                <div>配送运费： {amountTransform(it.freight, '/')}元</div>
                                {isPurchase && <div>批发供货价： {amountTransform(it.wholesaleSupplyPrice, '/')}元</div>}
                                {isPurchase && <div>平均运费： {amountTransform(it.wholesaleFreight, '/')}元</div>}
                              </>
                            }

                          </div>
                        </div>
                      ))
                    }
                  </div>
                  {
                    !isDocumentary && <>
                      <div className={styles.cell}>

                        {
                          item.sku.map(it => (
                            <div>
                              <Descriptions column={1} labelStyle={{ width: 100, justifyContent: 'flex-end' }}>
                                <Descriptions.Item label="应付金额">{amountTransform(it.orderAmount, '/')}元</Descriptions.Item>
                                <Descriptions.Item label="用户实付">{amountTransform(it.actualAmount, '/')}元</Descriptions.Item>
                              </Descriptions>
                            </div>
                          ))
                        }
                      </div>
                    </>
                  }
                  
                  <div className={styles.cell} style={{ textAlign: 'center' }}>
                    {
                      item.sku.map(it => (
                        <div>
                          <Descriptions column={1} labelStyle={{ width: 100, justifyContent: 'flex-end' }}>
                            <Descriptions.Item label="skuId">{it.skuId}</Descriptions.Item>
                            <Descriptions.Item label="spuId">{it.spuId}</Descriptions.Item>
                          </Descriptions>
                        </div>
                      ))
                    }
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {item.statusDesc}
                    {item.refundAllRetailStatus === 1 && <div style={{ color: 'red' }}>已启动C端退款</div>}
                  </div>
                  <div className={styles.cell}>
                    {
                      item.sku.map(it => (
                        <div style={{ flexDirection: 'column' }}>
                          {item.isRefundable === 1 && <div><a onClick={() => { refund(item.orderId) }}>启动C端退款</a></div>}
                          {/* <a onClick={() => { history.push(`/order-management/intensive-order/supplier-order-detail${isPurchase ? '-purchase' : ''}/${item.orderId}`) }}>详情</a> */}
                          <a onClick={() => { setSelectItem(it); setDetailVisible(true); }}>详情</a>
                          {item.businessType !== 30 && !isDocumentary && <div><a target="_blank" href={`/order-management/intensive-order/shopkeeper-order?objectId=${item.orderId}`}>查看零售订单</a></div>}
                          {
                            (orderType === 2 && item.auditStatus === 0 && item.wholesaleType === 5) &&
                            <Auth name="order/auditRecord/apply5">
                              <Popconfirm
                                title="确认操作?"
                                onConfirm={() => {
                                  apply5({
                                    objectId: item.orderId
                                  }, { showSuccess: true })
                                    .then(res => {
                                      if (res.code === 0) {
                                        setSearch(search + 1)
                                      }
                                    })
                                }}
                              >
                                <a>退款申请</a>
                              </Popconfirm>
                            </Auth>
                          }
                          {
                            (orderType === 2 && item.auditStatus === 3 && item.wholesaleType === 5) &&
                            <Auth name="order/auditRecord/audit5">
                              <Popconfirm
                                title="确认操作?"
                                onConfirm={() => {
                                  audit5({
                                    objectId: item.orderId,
                                    action: 'approve'
                                  }, { showSuccess: true })
                                    .then(res => {
                                      if (res.code === 0) {
                                        setSearch(search + 1)
                                      }
                                    })
                                }}
                                onCancel={() => {
                                  audit5({
                                    objectId: item.orderId,
                                    action: 'refuse'
                                  }, { showSuccess: true })
                                    .then(res => {
                                      if (res.code === 0) {
                                        setSearch(search + 1)
                                      }
                                    })
                                }}
                              >
                                <a>退款审核</a>
                              </Popconfirm>
                            </Auth>
                          }
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className={styles.footer}>
                  <Space size="large">
                    <span>收货人：{item.receivingInfo.receiptUser}</span>
                    <span>电话：{item.receivingInfo.receiptPhone}</span>
                    <span>地址：{item.receivingInfo.receiptAddress}</span>
                    {
                      (orderType === 1 || orderType === 2) &&
                      <Button onClick={() => { setSubOrderId(item.orderId); setAddressVisible(true); setPrimaryAddress(item) }}>修改地址</Button>
                    }
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
          id={selectItem?.orderId}
          visible={detailVisible}
          setVisible={setDetailVisible}
          isPurchase={isPurchase}
          skuId={selectItem?.skuId}
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
