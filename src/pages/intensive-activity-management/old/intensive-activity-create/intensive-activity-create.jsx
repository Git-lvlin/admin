import React, { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@/components/PageContainer';
import {
  StepsForm,
  ProFormText,
  ProFormCheckbox,
  ProFormRadio,
  ProFormDependency,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import { InfoCircleOutlined } from '@ant-design/icons';
import ProCard from '@ant-design/pro-card';
import { Button, Result, message, Descriptions, Form, Table } from 'antd';
import EditTable from './edit-table';
import styles from './index.less';
import { addWholesale, productList } from '@/services/intensive-activity-management/intensive-activity-create'
import { getWholesaleDetail } from '@/services/intensive-activity-management/intensive-activity-list'
import AddressMultiCascader from '@/components/address-multi-cascader'
import Upload from '@/components/upload'
import { history, useParams, useLocation } from 'umi';
import moment from 'moment'
import { amountTransform } from '@/utils/utils'
import LadderDataEdit from './ladder-data-edit'
import PriceExplanation from './price-explanation'
import FreshIncome from './fresh-income'

const FromWrap = ({ value, onChange, content }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
  </div>
)

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

// function range(start, end) {
//   const result = [];
//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }
//   return result;
// }

// const disabledRangeTime = (_, type) => {
//   if (type === 'start') {
//     return {
//       disabledMinutes: () => range(1, 59),
//       disabledSeconds: () => range(1, 59),
//     };
//   }
//   return {
//     disabledMinutes: () => range(0, 59),
//     disabledSeconds: () => range(0, 59),
//   };
// }

const IntensiveActivityCreate = () => {
  const [selectItem, setSelectItem] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [ladderData, setLadderData] = useState([]);
  // const [uncheckableItemValues, setUncheckableItemValues] = useState([]);
  const [submitValue, setSubmitValue] = useState(null);
  const formRef = useRef();
  const editTableRef = useRef();
  const [detailData, setDetailData] = useState({})
  const [loading, setLoading] = useState(true)
  const params = useParams();
  const location = useLocation();
  const getAreas = (areas = []) => {
    const areaArr = [];
    for (let index = 0; index < areas.length; index++) {
      const refuseArea = areas[index];
      if (refuseArea.areaId) {
        areaArr.push(refuseArea.areaId)
        continue;
      }
      if (refuseArea.cityId) {
        areaArr.push(refuseArea.cityId)
        continue;
      }
      areaArr.push(refuseArea.provinceId)
    }
    return areaArr;
  }

  const getDetail = () => {
    getWholesaleDetail({
      wholesaleId: params.id,
      view: +location.query?.type === 1 ? 1 : 0,
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data);
        const wholesaleInfo = res.data.wholesale
        formRef.current.setFieldsValue({
          ...wholesaleInfo,
          ladderShowPercent: amountTransform(res.data.sku[0].ladderShowPercent),
          freshCommission: amountTransform(res.data.sku[0].freshCommission),
          orderAmount: amountTransform(wholesaleInfo.orderAmount, '/'),
          subsidy: amountTransform(wholesaleInfo.subsidy, '/'),
          // wholesaleStartTime: wholesaleInfo.wholesaleStartTime,
          area: getAreas(res.data.allowArea)
        })
      }
    }).finally(() => {
      setLoading(false);
    })
  }

  const getSubmitAreaData = (v) => {
    const arr = [];
    if (v[0] === 0) {
      return '';
    }
    v.forEach(item => {
      let deep = 0;
      let node = window.yeahgo_area.find(it => it.id === item);
      const nodeIds = [node.id];
      const nodeNames = [node.name]
      while (node.pid) {
        deep += 1;
        node = window.yeahgo_area.find(it => it.id === node.pid);
        nodeIds.push(node.id);
        nodeNames.push(node.name);
      }
      arr.push({
        provinceId: nodeIds[deep],
        cityId: deep > 0 ? nodeIds[deep - 1] : 0,
        areaId: deep > 1 ? nodeIds[deep - 2] : 0,
        areaName: nodeNames.reverse().join('')
      })
    })

    return arr;
  }

  const submit = (values) => {
    const { wholesaleTime, area, isEditSubsidy, orderAmount, subsidy, ladderShowPercent, freshSpecial, freshCommission, ...rest } = values;
    return new Promise((resolve, reject) => {
      const obj = {};
      const goodsInfos = {};

      if (isEditSubsidy === 1) {
        obj.orderAmount = amountTransform(orderAmount)
        obj.subsidy = amountTransform(subsidy)
      }

      if (isEditSubsidy === 2) {
        goodsInfos.ladderData = ladderData.map(item => ({
          ...item,
          skuId: selectItem[0].skuId,
          totalExtraScale: amountTransform(item.totalExtraScale, '/'),
          operationPercent: amountTransform(item.operationPercent, '/'),
          storePercent: amountTransform(item.storePercent, '/'),
        }))
        obj.ladderShowPercent = amountTransform(ladderShowPercent, '/');
      }

      if (freshSpecial === 1) {
        obj.freshCommission = amountTransform(freshCommission, '/')
      } else {
        obj.freshCommission = selectItem[0].freshCommission
      }

      const requestParams = {
        goodsInfos: selectItem.map(item => ({
          spuId: item.spuId,
          skuId: item.skuId,
          totalStockNum: item.totalStockNum,
          minNum: item.minNum,
          maxNum: item.maxNum,
          supplierId: item.supplierId,
          totalPrice: item.totalPrice,
          price: amountTransform(item.price),
          operationFixedPrice: amountTransform(item.operationFixedPrice),
          wholesaleSupplyPrice: amountTransform(item.wholesaleSupplyPrice),
          fixedPrice: amountTransform(item.fixedPrice),
          settlePercent: amountTransform(item.settlePercent, '/'),
          isAppointSubsidy: item.isAppointSubsidy.length === 0 ? 0 : 1,
          ...goodsInfos,
        })),
        allowArea: getSubmitAreaData(area),
        storeLevel: 'ALL',
        memberLevel: 'ALL',
        // wholesaleStartTime: wholesaleTime[0],
        // wholesaleEndTime: wholesaleTime[1],
        recoverPayTimeout: 0,
        canRecoverPayTimes: 0,
        wholesaleFlowType: selectItem[0].wholesaleFlowType,
        isEditSubsidy,
        freshSpecial,
        ...rest,
        ...obj,
        wsId: (+params.id === 0 || +location.query?.type === 1) ? '' : params.id,
      }
      setSubmitValue(requestParams)
      addWholesale(requestParams).then(res => {
        if (res.code === 0) {
          resolve()
        }
      }).finally(() => {
        reject()
      })
    });
  }

  const getUncheckableItemValues = () => {
    const data = JSON.parse(JSON.stringify(window.yeahgo_area))
    data.unshift({ name: '全国', id: 0, pid: -1 })
    setAreaData(data)
  }

  const parseShipAddr = (data) => {
    const arr = [];

    data.forEach(item => {
      const provinceName = window.yeahgo_area.find(it => it.id === item.provinceId)?.name
      const cityName = window.yeahgo_area.find(it => it.id === item.cityId)?.name
      const areaName = window.yeahgo_area.find(it => it.id === item.areaId)?.name
      arr.push(`${provinceName}${cityName}${areaName}`)
    })

    return arr.join('、')
  }

  useEffect(() => {
    getUncheckableItemValues();
    if (params.id && +params.id !== 0) {
      getDetail()
    } else {
      setLoading(false);
    }
  }, [])

  useEffect(() => {
    setLadderData(selectItem?.[0]?.ladderData.map(item => (
      {
        ...item,
        totalExtraScale: amountTransform(item.totalExtraScale),
        operationPercent: amountTransform(item.operationPercent),
        storePercent: amountTransform(item.storePercent),
      }
    )) || [])
    const { isEditSubsidy } = formRef.current.getFieldsValue();
    if (selectItem?.[0]?.ladderData?.length === 0 && isEditSubsidy === 2) {
      formRef.current.setFieldsValue({
        isEditSubsidy: 0
      })
    }

    if (selectItem.length) {
      formRef.current.setFieldsValue({
        settlePercent: selectItem[0].settlePercent,
        price: selectItem[0].price,
      })

      formRef.current.validateFields(['price']);

      const { freshSpecial } = formRef.current.getFieldsValue()

      if (selectItem.length && freshSpecial === 0) {
        formRef.current.setFieldsValue({
          freshCommission: amountTransform(selectItem[0].freshCommission)
        })
      }
    }

  }, [selectItem])

  return (
    <PageContainer className={styles.page}>
      <ProCard style={{ width: '100%' }}>
        <StepsForm
          // formProps={{
          //   validateMessages: {
          //     required: '此项为必填项',
          //   },
          // }}
          submitter={{
            render: (props) => {
              if (props.step === 0) {
                return (
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Button type="primary" onClick={() => props.onSubmit?.()}>
                      下一步
                    </Button>
                  </div>
                );
              }
              return (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <Button type="primary" onClick={() => props.onSubmit?.()}>
                    完成
                  </Button>
                </div>
              )
            }
          }}
        >
          <StepsForm.StepForm
            name="checkbox"
            title="选择活动商品确认活动参数"
            onFinish={async (values) => {

              if (!selectItem.length) {
                message.error('请选择活动商品');
                return false;
              }

              for (let index = 0; index < selectItem.length; index++) {
                const item = selectItem[index];
                if (!/^\d+$/g.test(item.totalStockNum) || +item.totalStockNum <= 0) {
                  message.error(`sku:${item.skuId}集约总库存只能是大于0的整数`);
                  return false;
                }

                if (+item.totalStockNum > +item.stockNum) {
                  message.error(`sku:${item.skuId}集约总库存不能大于可用库存`);
                  return false;
                }

                if (+item.fixedPrice < 0 || +item.fixedPrice > 100) {
                  message.error(`sku:${item.skuId}配送费补贴只能是0-100之间`);
                  return false;
                }
                if (+item.settlePercent < 0 || +item.settlePercent > 500) {
                  message.error(`sku:${item.skuId}售价上浮比只能是0-500之间`);
                  return false;
                }

                if (+item.minNum > +item.maxNum) {
                  message.error(`sku:${item.skuId}单次起订量不能大于单次限订量`);
                  return false;
                }

                if (+item.profit < 0) {
                  message.error(`sku:${item.skuId}实际盈亏不能小于0`);
                  return false;
                }

                if (+item.totalStockNum % +item.batchNumber !== 0) {
                  message.error(`sku:${item.skuId}集约总库存数量与集采箱规单位量之间必须为倍数关系，请重新输入`);
                  return false;
                }

                if (+item.minNum % +item.batchNumber !== 0) {
                  message.error(`sku:${item.skuId}单次起订量与集采箱规单位量之间必须为倍数关系，请重新输入`);
                  return false;
                }

                if (+item.maxNum % +item.batchNumber !== 0) {
                  message.error(`sku:${item.skuId}单次限订量与集采箱规单位量之间必须为倍数关系，请重新输入`);
                  return false;
                }
              }

              // const { endTimeAdvancePayment, wholesaleStartTime } = values;
              // if (endTimeAdvancePayment <= wholesaleStartTime) {
              //   message.error('店主采购单下单截止时间必须大于活动开始时间且小于截至时间');
              //   return false;
              // }
              await submit(values);
              return true;
            }}
            formRef={formRef}
            {...formItemLayout}
            initialValues={{
              // canRecoverPayTimes: 1,
              // recoverPayTimeout: 3
              isEditSubsidy: 0,
              ladderShowPercent: 50,
              preSale: 0,
              freshSpecial: 0,
              freshCommission: 30,
              activityShowType: 0,
            }}
            className={styles.center}
          >
            {
              !loading &&
              <ProFormDependency name={['isEditSubsidy']}>
                {({ isEditSubsidy }) => (
                  <EditTable
                    radioSelect={(v) => {
                      if (v?.[0]?.fresh === 0) {
                        formRef.current.setFieldsValue({
                          preSale: 1
                        })
                      } else {
                        formRef.current.setFieldsValue({
                          preSale: 0
                        })
                      }
                    }}
                    onSelect={(v) => {
                      if (v?.[0]?.skuId === selectItem?.[0]?.skuId && selectItem?.[0]?.skuId !== undefined && isEditSubsidy === 2) {
                        const skuData = v[0];
                        const obj = {
                          skuId: skuData.skuId,
                          fixedPrice: amountTransform(skuData.fixedPrice),
                          operationFixedPrice: amountTransform(skuData.operationFixedPrice),
                          isGetWholesale: 1,
                          priceScale: amountTransform(skuData.settlePercent, '/'),
                          price: amountTransform(skuData.price),
                          ladderData: ladderData.map(item => ({
                            tier: item.tier,
                            skuId: skuData.skuId,
                            storePercent: amountTransform(item.storePercent, '/'),
                          }))
                        }

                        productList(obj).then(res => {
                          skuData.ladderData = res.data[0].ladderData
                          setSelectItem([skuData])
                        })
                      } else {
                        setSelectItem(v)
                      }
                    }} sku={detailData?.sku?.[0]} wholesale={detailData?.wholesale} ref={editTableRef} />
                )}
              </ProFormDependency>

            }
            <ProFormText name="name" label="活动名称" width="lg" placeholder="请输入活动名称" rules={[{ required: true, message: '请输入活动名称' }]} />
            <ProFormDateTimePicker
              name="wholesaleStartTime"
              label="活动开始时间"
              width="lg"
              rules={[{ required: true, message: '请选择活动开始时间' }]}
              fieldProps={{
                // disabledDate: (currentDate) => { return +currentDate < +new Date() || new Date(+currentDate).getDate() === new Date().getDate() },
                // disabledTime: disabledRangeTime,
                showTime: {
                  defaultValue: moment('00:00:00', 'HH:mm:ss')
                }
              }}
            />
            {
              selectItem?.[0]?.wholesaleFlowType === 2
                ?
                <ProFormText
                  name="deliveryCycle"
                  label="采购单推送周期"
                  width="lg"
                  placeholder="请输入店主采购单推送周期,可输入1-240"
                  validateFirst
                  rules={[
                    { required: true, message: '请输入采购单推送周期' },
                    () => ({
                      validator(_, value) {
                        if (+value < 1 || +value > 240 || !(/\d+/g).test(value)) {
                          return Promise.reject(new Error('请输入1-240之间的正整数'));
                        }
                        return Promise.resolve();
                      },
                    })
                  ]}
                  fieldProps={{
                    addonAfter: '小时 推送1次采购单'
                  }}
                />
                :
                <ProFormDateTimePicker
                  name="endTimeAdvancePayment"
                  label="店主采购单下单截至时间"
                  width="lg"
                  rules={[{ required: true, message: '请选择店主采购单下单截至时间' }]}
                  fieldProps={{
                    // disabledDate: (currentDate) => { return +currentDate < +new Date() || new Date(+currentDate).getDate() === new Date().getDate() },
                    // disabledTime: disabledRangeTime,
                    showTime: {
                      defaultValue: moment('00:59:59', 'HH:mm:ss')
                    }
                  }}
                />
            }

            <ProFormRadio.Group
              label="仅参与1分钱活动"
              name="activityShowType"
              required
              options={[
                {
                  label: '不是（也参与正常集约活动）',
                  value: 0,
                },
                {
                  label: '是（仅参与1分钱集约活动或特价集约活动）',
                  value: 1,
                },
              ]}
            />
            <ProFormRadio.Group
              label="消费者集约预售"
              name="preSale"
              required
              options={[
                {
                  label: '开启（店主收货前可对消费者售卖）',
                  value: 1,
                },
                {
                  label: '关闭（店主收货后才能对消费者售卖）',
                  value: 0,
                },
              ]}
            />

            {!!selectItem.length && <>
              <Form.Item
                label="批发商家结算价"
              >
                {selectItem[0].wholesaleSupplyPrice}元
              </Form.Item>
              <Form.Item
                label="市场价"
              >
                {selectItem[0].marketPriceDisplay}元
              </Form.Item>
              <Form.Item
                label="平均运费"
              >
                {selectItem[0].wholesaleFreight}元
              </Form.Item>
              <ProFormDependency name={['freshCommission', 'price']}>
                {({ freshCommission, price }) => (
                  <>
                    <ProFormText
                      label="售价上浮比"
                      validateFirst
                      rules={[
                        { required: true, message: '请输入' },
                      ]}
                      name="settlePercent"
                      width={400}
                      fieldProps={{
                        addonAfter: `%`,
                        onBlur: (e) => {
                          editTableRef.current.update({
                            ...selectItem[0],
                            settlePercent: e.target.value,
                            freshCommission3: freshCommission,
                            freshCommission2: null,
                          })
                        }
                      }}
                    />
                    <ProFormText
                      label="集约价"
                      validateFirst
                      rules={[
                        { required: true, message: '请输入' },
                        () => ({
                          validator(_, value) {
                            if (+price > +selectItem[0].marketPriceDisplay) {
                              return Promise.reject(new Error('集约价不能大于市场价'));
                            }
                            return Promise.resolve();
                          },
                        })
                      ]}
                      fieldProps={{
                        addonAfter: `元/${selectItem[0].unit}`,
                        onBlur: (e) => {
                          editTableRef.current.update({
                            ...selectItem[0],
                            price: e.target.value,
                            freshCommission2: freshCommission,
                            freshCommission3: null,
                          })
                        }
                      }}
                      name="price"
                      width={400}
                    />
                  </>
                )}
              </ProFormDependency>

              <Form.Item
                label="实际盈亏"
              >
                <span style={{ color: selectItem[0].profit < 0 ? 'red' : '' }}>{selectItem[0].profit}元</span>
              </Form.Item>
              <ProFormRadio.Group
                label="平台额外奖励"
                name="isEditSubsidy"
                disabled={selectItem[0].fresh !== 0}
                required
                options={[
                  {
                    label: '不进行平台额外奖励',
                    value: 0,
                  },
                  {
                    label: '按集采阶梯量奖励(社区店+运营中心)',
                    value: 2,
                  },
                  {
                    label: '按采购量奖励社区店',
                    value: 1,
                  }
                ].filter((_, index) => !(selectItem[0].ladderData.length === 0 && index === 1))}
              />
              <ProFormDependency name={['isEditSubsidy']}>
                {
                  ({ isEditSubsidy }) => {
                    return (
                      <>
                        {isEditSubsidy === 1 && <><ProFormText
                          label=" "
                          colon={false}
                          fieldProps={{
                            addonBefore: '当店主采购订单金额达到',
                            addonAfter: '元时'
                          }}
                          placeholder="0.01-9999999.99,保留2位小数"
                          validateFirst
                          rules={[
                            { required: true, message: '请输入' },
                            () => ({
                              validator(_, value) {
                                if (!/^\d+\.?\d*$/g.test(value) || value <= 0 || value > 9999999.99 || `${value}`?.split?.('.')?.[1]?.length > 2) {
                                  return Promise.reject(new Error('请输入0.01-9999999.99,保留2位小数'));
                                }
                                return Promise.resolve();
                              },
                            })
                          ]}
                          name="orderAmount"
                          width={470}
                        />
                          <ProFormText
                            label=" "
                            colon={false}
                            fieldProps={{
                              addonBefore: '补贴社区店店主',
                              addonAfter: `元`
                            }}
                            placeholder="0.01-9999999.99,保留2位小数"
                            validateFirst
                            rules={[
                              { required: true, message: '请输入' },
                              () => ({
                                validator(_, value) {
                                  if (!/^\d+\.?\d*$/g.test(value) || value <= 0 || value > 9999999.99 || `${value}`?.split?.('.')?.[1]?.length > 2) {
                                    return Promise.reject(new Error('请输入0.01-9999999.99,保留2位小数'));
                                  }
                                  return Promise.resolve();
                                },
                              })
                            ]}
                            name="subsidy"
                            width={400}
                          /></>}
                        {
                          isEditSubsidy === 2 && selectItem[0].ladderData.length !== 0 && <>
                            <LadderDataEdit
                              data={ladderData || []}
                              setData={setLadderData}
                              batchNumber={selectItem?.[0]?.batchNumber}
                              unit={selectItem?.[0]?.unit}
                              wsUnit={selectItem?.[0]?.wsUnit}
                              skuData={selectItem?.[0]}
                            />
                            <div><InfoCircleOutlined />&nbsp;<PriceExplanation skuData={selectItem?.[0]} ladderData={ladderData} /></div>
                            <ProFormText
                              label="前端奖励展示需完成量"
                              fieldProps={{
                                addonAfter: `%`
                              }}
                              extra={<span style={{ color: '#b38806' }}>总商品活动集约量达到最低阶梯量的此百分比时才在前端（此商品的商品详情、下单页和待支付页面）展示奖励信息</span>}
                              rules={[
                                { required: true, message: '请输入前端奖励展示需完成量' },
                                () => ({
                                  validator(_, value) {
                                    if (!/^\d+$/g.test(value) || `${value}`.indexOf('.') !== -1 || value <= 0 || value > 99) {
                                      return Promise.reject(new Error('请输入1-99之间的整数'));
                                    }
                                    return Promise.resolve();
                                  },
                                })
                              ]}
                              name="ladderShowPercent"
                              width="lg"
                            />
                          </>
                        }
                      </>
                    )
                  }
                }
              </ProFormDependency></>
            }

            {
              selectItem?.[0]?.fresh === 1
              &&
              <>
                <ProFormDependency name={['freshSpecial', 'freshCommission']}>
                  {
                    ({ freshSpecial, freshCommission }) => {
                      return (
                        <>
                          <ProFormRadio.Group
                            label="生鲜总分佣类型"
                            name="freshSpecial"
                            required
                            options={[
                              {
                                label: '正常分佣（按分类分佣）',
                                value: 0,
                              },

                              {
                                label: '特殊分佣（单独指定分佣）',
                                value: 1,
                              }
                            ]}
                            fieldProps={{
                              onChange: (e) => {
                                if (e.target.value === 0) {
                                  editTableRef.current.update({
                                    ...selectItem[0],
                                    freshCommission2: amountTransform(selectItem[0].freshCommission),
                                    freshCommission3: null,
                                  })
                                } else {
                                  editTableRef.current.update({
                                    ...selectItem[0],
                                    freshCommission2: freshCommission,
                                    freshCommission3: null,
                                  })
                                }
                              }
                            }}
                          />
                          {
                            freshSpecial === 0
                              ? <Form.Item
                                label="总分佣比例"
                              >
                                {selectItem[0].gcId1Display} &gt; {selectItem[0].gcId2Display}：{amountTransform(selectItem[0].freshCommission)}%
                              </Form.Item>
                              :
                              <div
                                style={{ position: 'relative', zIndex: 1 }}
                              >
                                <ProFormText
                                  name="freshCommission"
                                  label="总分佣比例"
                                  width={150}
                                  fieldProps={{ addonAfter: '%' }}
                                  placeholder="总分佣比例"
                                  validateFirst
                                  fieldProps={{
                                    onBlur: (e) => {
                                      editTableRef.current.update({
                                        ...selectItem[0],
                                        freshCommission2: e.target.value,
                                        freshCommission3: null,
                                      })
                                    }
                                  }}
                                  rules={[
                                    { required: true, message: '请输入总分佣比例' },
                                    () => ({
                                      validator(_, value) {
                                        if (!/^((0)|([1-9][0-9]*))$/g.test(value) || value > 50) {
                                          return Promise.reject(new Error('请输入0-50之间的正整数'));
                                        }
                                        return Promise.resolve();
                                      },
                                    })
                                  ]}
                                />
                              </div>
                          }
                          <Form.Item
                            label="生鲜商品的各方分佣比例"
                          >
                            <div style={{ marginTop: '-10px' }}>
                              <Table
                                title={() => "以五星社区店为例"}
                                columns={[
                                  { title: '社区店', dataIndex: 'shopCommission', render: (_) => `${amountTransform(_)}%` },
                                  { title: '运营中心', dataIndex: 'operateCommission', render: (_) => `${amountTransform(_)}%` },
                                  { title: '推荐人', dataIndex: 'referrerCommission', render: (_) => `${amountTransform(_)}%` },
                                  { title: '平台额外收益', dataIndex: 'platForm', render: (_) => `${amountTransform(_)}%` },
                                ]}
                                dataSource={[selectItem[0].freshData[0]]}
                                pagination={false}
                              />
                            </div>
                          </Form.Item>

                          <Form.Item
                            label="预计生鲜食品的各方分佣金额"
                          >
                            <div style={{ marginTop: '-10px' }}>
                              <FreshIncome data={selectItem[0]} freshCommission={freshSpecial === 0 ? selectItem[0].freshCommission : amountTransform(freshCommission, '/')} />
                            </div>
                          </Form.Item>
                        </>
                      )
                    }
                  }
                </ProFormDependency>
              </>
            }

            {/* <ProFormCheckbox.Group value={'1'} label="可购买的社区店等级" disabled options={[{ label: '全部', value: 1 }]} />
            <ProFormCheckbox.Group value={'1'} label="可购买的会员等级" disabled options={[{ label: '全部', value: 1 }]} /> */}
            {!!selectItem[0]?.shipAddr?.length && <Form.Item
              label="商品发货地区"
            >
              {parseShipAddr(selectItem[0].shipAddr)}
            </Form.Item>}
            <Form.Item
              label="可集约店铺区域"
              name="area"
              required
              rules={[
                () => ({
                  validator(_, value) {
                    if (!value?.length) {
                      return Promise.reject(new Error('请选择可集约店铺区域'));
                    }
                    return Promise.resolve();
                  },
                })
              ]}
            >
              <AddressMultiCascader
                placeholder="请选择可参与集约活动的店铺所属省市区"
                data={areaData}
                style={{ width: '640px' }}
                pId={-1}
              // onCheck={() => {
              //   const data = window.yeahgo_area.filter(item => item.deep === 1);
              //   data.unshift({ name: '全国', id: -1, pid: 0 })
              //   formRef.current.setFieldsValue({
              //     'area': data.map(item => item.id)
              //   })
              // }}
              />
            </Form.Item>
            <Form.Item
              label="上传C端集约商品分享海报"
              name="shareImg"
            // rules={[
            //   { required: true, message: '请上传C端集约商品分享海报' },
            // ]}

            >
              <FromWrap
                content={(value, onChange) => {
                  return <>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: 105 }}>
                        <Upload value={value} onChange={onChange} accept=".png, .jpg, .jpeg" dimension={{ width: 750, height: 1352 }} size={2048} />
                      </div>
                      <dl>
                        <dd>大小：不超过2MB</dd>
                        <dd>尺寸：750px X 1352px</dd>
                        <dd>格式：png/jpg</dd>
                      </dl>
                    </div>
                    <div className={styles.example}>
                      <div style={{ width: 50 }}>示例:</div>
                      <img src="https://dev-yeahgo.oss-cn-shenzhen.aliyuncs.com/admin/intensive-poster.png" width={150} />
                      <dl>
                        <dd>务必在海报中留出用户二维码位置：</dd>
                        <dd>1、二维码宽和高都为148px；</dd>
                        <dd>2、二维码右上角展示，距海报上边缘50px，距海报右边缘60px;</dd>
                      </dl>
                    </div>
                  </>
                }}
              />
            </Form.Item>
            {/* <ProFormDigit name="canRecoverPayTimes" label="可恢复支付次数" min={0} max={3} placeholder="输入范围0-3" rules={[{ required: true, message: '请输入可恢复支付次数' }]} /> */}
            {/* <ProFormDigit name="recoverPayTimeout" label="每次恢复可支付时长" min={0} max={24} placeholder="输入范围0-24小时" rules={[{ required: true, message: '请输入每次恢复可支付时长' }]} /> */}
          </StepsForm.StepForm>
          <StepsForm.StepForm
            name="time"
            title="完成"
            {...formItemLayout}
            onFinish={() => {
              // history.push('')
              window.location.href = '/intensive-activity-management/old/intensive-activity-list'
              return true;
            }}
            className={styles.center}
          >
            <Result
              status="success"
              title={`活动${+params.id !== 0 ? '修改' : '创建'}成功`}
              subTitle={<div style={{ color: '#000', fontSize: 20, fontWeight: 'bold' }}>活动已进入待审核状态，请提醒主管尽快审核</div>}
            />
            {submitValue && <div
              style={{
                margin: '0 auto 30px',
                backgroundColor: 'rgba(247, 247, 247, 1)',
                padding: '20px',
                maxWidth: 600
              }}
            >
              <Descriptions labelStyle={{ textAlign: 'right', width: 150, display: 'inline-block' }} column={1}>
                <Descriptions.Item label="参与活动商品">
                  <div>
                    {
                      selectItem.map(item => (
                        <div>{item.goodsName}（skuID：{item.skuId}）</div>
                      ))
                    }
                  </div>
                </Descriptions.Item>
                {/* <Descriptions.Item label="所有全款结清可收款">{numFormat(submitValue.goodsInfos[0].totalPrice)} 元（{digitUppercase(submitValue.goodsInfos[0].totalPrice)}）</Descriptions.Item> */}
              </Descriptions>
            </div>}
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    </PageContainer>
  )
}

export default IntensiveActivityCreate
