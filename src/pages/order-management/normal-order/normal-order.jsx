import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { Button, Space, Radio, Descriptions, Pagination, Spin, Empty, Tag, Form } from 'antd';
import { history } from 'umi';
import styles from './style.less';
import Delivery from '@/components/delivery'
import { amountTransform } from '@/utils/utils'
import { orderList, deliverGoods } from '@/services/order-management/normal-order';

const TableList = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pageTotal, setPageTotal] = useState(0)
  const [orderType, setOrderType] = useState(0)
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(0)
  const [deliveryVisible, setDeliveryVisible] = useState(false)

  const [form] = Form.useForm()


  const pageChange = (a, b) => {
    setPage(a)
    setPageSize(b)
  }

  const orderTypeChange = (e) => {
    setOrderType(e.target.value)
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

  useEffect(() => {
    setLoading(true);
    const { time, ...rest } = form.getFieldsValue();
    orderList({
      page,
      size: pageSize,
      orderStatus: orderType === 0 ? '' : orderType,
      startCreateTime: time?.[0]?.format('YYYY-MM-DD'),
      endCreateTime: time?.[1]?.format('YYYY-MM-DD'),
      ...rest,
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
                    }}
                  >
                    重置
                  </Button>
                  <Button onClick={() => { exportExcel(form) }}>导出</Button>
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
          name="consignee"
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
        <ProFormSelect
          name="orderType"
          label="订单类型"
          options={[{ value: 1, label: '秒约' }, { value: 2, label: '单约' }, { value: 3, label: '团约' }]}
          fieldProps={{
            style: {
              marginBottom: 20,
              width: 180,
            }
          }}
        />
        <ProFormDateRangePicker
          label="下单时间"
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
        ]}
      />
      <Spin
        spinning={loading}
      >
        <div className={styles.list_header_wrap}>
          <div className={styles.list_header}>
            <div>商品信息</div>
            <div>金额</div>
            <div>实收</div>
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
        {
          data.map(item => (
            <div className={styles.list} key={item.id}>
              <div className={styles.store_name}>所属商家：{item.storeName}</div>
              <div className={styles.second}>
                <Space size="large">
                  <span>下单时间：{item.createTime.replace('T', ' ')}</span>
                  <span>订单号：{item.orderSn}</span>
                  <span>下单用户：LUCAS</span>
                  <span>用户手机号：{item.userPhone}</span>
                </Space>
              </div>

              <div className={styles.body}>
                <div className={styles.goods_info}>
                  {
                    item.orderItem.map(it => (
                      <div key={it.skuId}>
                        <img width="100" height="100" src={it.goodsImageUrl} />
                        <div className={styles.info}>
                          <div>{it.goodsName}</div>
                          <div>{{ 1: '秒约', 2: '单约', 3: '团约' }[item.orderType]}价：{amountTransform(it.skuSalePrice, '/')}元    规格：{it.skuName}</div>
                          <div>数量： <span>{it.skuNum}件</span></div>
                          <div>小计： <span>{amountTransform(it.totalAmount, '/')}</span>元</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div>
                  <Descriptions column={1} labelStyle={{ width: 100, justifyContent: 'flex-end' }}>
                    <Descriptions.Item label="商品总金额">{amountTransform(item.totalAmount, '/')}元</Descriptions.Item>
                    <Descriptions.Item label="运费">+{amountTransform(item.shippingFeeAmount, '/')}元</Descriptions.Item>
                    <Descriptions.Item label="优惠券">+{amountTransform(item.couponAmount, '/')}元</Descriptions.Item>
                    <Descriptions.Item label="用户实付">{amountTransform(item.payAmount, '/')}元</Descriptions.Item>
                  </Descriptions>
                </div>
                <div style={{ textAlign: 'center' }}>
                  {item.status === 5 ? 0 : amountTransform(item.incomeAmount, '/')}元
                </div>
                <div style={{ textAlign: 'center' }}>{{ 1: '待付款', 2: '待发货', 3: '已发货', 4: '已完成', 5: '已关闭', 6: '无效订单' }[item.status]}</div>
                <div style={{ textAlign: 'center' }}><Tag style={{ borderRadius: 10 }} color="#f59a23">{{ 1: '秒约', 2: '单约', 3: '团约' }[item.orderType]}订单</Tag></div>
                <div style={{ textAlign: 'center' }}>
                  <a onClick={() => { history.push(`/order-management/normal-order-detail/${item.id}`) }}>详情</a>
                </div>
              </div>

              <div className={styles.footer}>
                <Space size="large">
                  <span>收货人：{item.consignee}</span>
                  <span>电话：{item.phone}</span>
                  <span>地址：{item.address}</span>
                </Space>
              </div>
            </div>
          ))
        }
      </Spin>


      <div
        className={styles.pagination}
      >
        <Pagination
          total={pageTotal}
          showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`}
          pageSize={pageSize}
          current={page}
          onChange={pageChange}
        />
      </div>

      {deliveryVisible &&
        <Delivery
          visible={deliveryVisible}
          setVisible={setDeliveryVisible}
          callback={(values) => { orderShipRequest(values) }}
        />
      }
    </PageContainer>
  );
};

export default TableList;
