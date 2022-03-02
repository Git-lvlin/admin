import React, { useState, useEffect, useRef } from 'react';
import { couponVerifyDetail, couponVerify } from '@/services/coupon-management/coupon-audit';
import SubTable from '@/pages/coupon-construction/coupon-subtable'
import { Divider, Form, Spin, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import AuditModel from './audit-model'
import { amountTransform } from '@/utils/utils'
import { history } from 'umi';
import { CaretRightFilled } from '@ant-design/icons';
import styles from './style.less'
import { arrayOf } from 'prop-types';

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};



export default props => {
  const ref = useRef()
  const id = props.location.query.id
  const [form] = Form.useForm()
  const [detailData, setDetailData] = useState([])
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: '群体名称',
      dataIndex: 'name',
      valueType: 'text',
    }
  ];
  const columns2 = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      valueType: 'text',
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName'
    },
    {
      title: '结算模式',
      dataIndex: 'settleType',
      valueType: 'select',
      valueEnum: {
        1: '佣金模式',
        2: '底价模式',
        3: '集约模式'
      },
    },
    {
      title: '供货价',
      dataIndex: 'retailSupplyPrice',
      render: (_)=> amountTransform(_, '/').toFixed(2),
    },
    {
      title: '销售价',
      dataIndex: 'goodsSalePrice',
      render: (_)=> amountTransform(_, '/').toFixed(2),

    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
    },
  ];
  const columns3 = [
    {
      title: '审核时间',
      dataIndex: 'createTime',
      valueType: 'text',
    },
    {
      title: '审核人员',
      dataIndex: 'adminName',
      valueType: 'text',
    },
    {
      title: '审核结果',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        3: '审核驳回',
        4: '审核通过',
      },
    },
    {
      title: '意见审核',
      dataIndex: 'content',
      valueType: 'text'
    },
  ];

  useEffect(() => {
    setLoading(true);
    couponVerifyDetail({ id }).then(res => {
      setDetailData(res.data)
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  return (
    <>
      <Spin
        spinning={loading}
      >
        <Form
          form={form}
          {...formItemLayout}
          className={styles.couponFrom}
        >

          <h1><CaretRightFilled /> 红包审核详情</h1>
          <Button className={styles.goback} type="default" onClick={() => history.goBack()}>返回</Button>
          <div className={styles.msg}>
            <h3 className={styles.head}>基本信息</h3>
            <Form.Item
              label="红包名称"
            >
              {detailData.couponName}
            </Form.Item>

            <Form.Item
              label="红包类型"
            >
              {
                detailData.couponType == 1 ?
                  '满减红包'
                  : detailData.couponType == 2 ?
                    '折扣红包'
                    : detailData.couponType == 3 ?
                      '立减红包' : null
              }
            </Form.Item>

            <Form.Item
              label="使用门槛"
            >
              {detailData.couponMsg}
            </Form.Item>

            <Form.Item
              label="红包面值"
            >
              {Number(detailData.couponAmountDisplay).toFixed(2)}
            </Form.Item>

            {
              detailData.issueType != 4&&            
              <Form.Item
                label="最高优惠"
              >
                {detailData.maxFreeAmount}元
              </Form.Item>
            }
            
            <Form.Item
              label="发行方式"
            >
              {
                detailData.issueType == 1 ?
                  '会员领取红包'
                  :detailData.issueType == 2 ? 
                  '系统发放红包'
                  :detailData.issueType == 3 ? 
                  '每日红包':'邀请好友红包'
              }
            </Form.Item>
            <Form.Item
              label="发放数量"
            >
              {detailData.issueQuantity=='-1'?'不限量发放':detailData.issueQuantity}
            </Form.Item>
            {
              detailData.issueType != 4&&
              <Form.Item
                label="每人限领"
              >
                {detailData.limitQuantity}
              </Form.Item>
            }
            {
              detailData.limitStartTime&&<Form.Item
                label="可领取时间"
              >
              {detailData.limitStartTime + ' -- ' + detailData.limitEndTime}
            </Form.Item>
            }
            <Form.Item
              label="有效期"
            >
             {
                detailData.activityTimeType == 1 ?
                <p>{detailData.activityStartTime + ' -- ' + detailData.activityEndTime}</p>
                :detailData.activityTimeType == 2 ?
                <p>领红包{detailData.activityStartDay}天起，{detailData.activityEndDay}天内可用</p>
                : <p>领红包0天起，{detailData.activityEndHour}小时内可用</p>
              }
            </Form.Item>

            {
              detailData.issueType == 3&&
              <Form.Item
                  label="可领条件"
                >
              <p>每日首次下单的用户</p>
              </Form.Item>
            }

            <Form.Item
              label="可领红包群体"
            >
              {
                detailData.memberType == 1 ?
                  '全部会员'
                  : detailData.memberType == 2? '指定用户群体':'新用户（未下过订单的用户）'
              }
            </Form.Item>
            {
              detailData.memberType == 2 ?
                <ProTable
                  actionRef={ref}
                  rowKey="name"
                  options={false}
                  expandable={{ expandedRowRender: (_) => <SubTable name={_.name} /> }}
                  dataSource={[detailData.crowdList]}
                  search={false}
                  columns={columns}
                />
                : null
            }
          </div>

          <div className={styles.msg}>
            <h3 className={styles.head}>使用设置</h3>
            <Form.Item
              label="使用范围"
            >
              {
                detailData.useType == 1 ?
                  '秒约商品'
                  : '集约商品'
              }
            </Form.Item>

            <Form.Item
              label="商品范围"
            >
              {
                detailData.goodsType == 1 ?
                  '全部商品' :
                  detailData.goodsType == 2 ?
                    '指定商品' :
                    detailData.goodsType == 3 ?
                      '指定品类' : null
              }
            </Form.Item>
            {
              detailData.goodsType == 2 ?
              <>
                <p className={styles.mark}>已选中<span>{detailData.spuInfo?.length}个</span>指定商品</p>
                <ProTable
                  actionRef={ref}
                  rowKey="spuId"
                  options={false}
                  dataSource={detailData.spuInfo}
                  search={false}
                  columns={columns2}
                />
              </>
                : null
            }
            <Form.Item
              label="可用人群"
            >
              {
                detailData.memberType == 1 ?
                  '全部会员' :
                  detailData.memberType == 2? '指定用户群体':'新用户（未下过订单的用户）'
              }
            </Form.Item>

            <Form.Item
              label="规则说明"
            >
              <pre className={styles.line_feed}>
                {
                  detailData?.couponRule
                }
              </pre>
            </Form.Item>
          </div>

            {
             detailData.verifyInfo && detailData.verifyInfo.length !=0 && detailData.verifyInfo[0].status ?
                <div className={styles.msg}>
                  <h3 className={styles.head}>审核信息</h3>
                  <ProTable
                    actionRef={ref}
                    rowKey="createTime"
                    options={false}
                    dataSource={detailData.verifyInfo}
                    search={false}
                    columns={columns3}
                  />
                </div>
                :
                null
            }

          {
            detailData.verifyInfo && detailData.verifyInfo.length !=0 && detailData.verifyInfo[0].status == 4 ?
              null
              : <>
                <AuditModel
                  type={1}
                  status={4}
                  label={'审核通过'}
                  text={'确认审核通过吗？'}
                  InterFace={couponVerify}
                  id={id}
                  title={'操作确认'}
                  boxref={ref}
                />
                <AuditModel
                  type={2}
                  status={3}
                  label={'驳回'}
                  InterFace={couponVerify}
                  title={'审核驳回'}
                  id={id}
                  boxref={ref}
                />
              </>
          }

        </Form>
      </Spin>

    </>
  );
};
