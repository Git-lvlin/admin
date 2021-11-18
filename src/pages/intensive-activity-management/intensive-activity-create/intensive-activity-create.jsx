import React, { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout';
import {
  StepsForm,
  ProFormText,
  ProFormCheckbox,
  ProFormDateTimeRangePicker,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import { Button, Result, message, Descriptions, Form } from 'antd';
import EditTable from './edit-table';
import styles from './index.less';
import { addWholesale } from '@/services/intensive-activity-management/intensive-activity-create'
import { getWholesaleDetail } from '@/services/intensive-activity-management/intensive-activity-list'
import AddressMultiCascader from '@/components/address-multi-cascader'
import Upload from '@/components/upload'
import { history, useParams, useLocation } from 'umi';
import moment from 'moment'
import { amountTransform } from '@/utils/utils'

const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    {/* <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div> */}
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

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const disabledRangeTime = (_, type) => {
  if (type === 'start') {
    return {
      disabledMinutes: () => range(1, 59),
      disabledSeconds: () => range(1, 59),
    };
  }
  return {
    disabledMinutes: () => range(0, 59),
    disabledSeconds: () => range(0, 59),
  };
}

const IntensiveActivityCreate = () => {
  const [selectItem, setSelectItem] = useState([]);
  const [areaData, setAreaData] = useState([]);
  // const [uncheckableItemValues, setUncheckableItemValues] = useState([]);
  const [submitValue, setSubmitValue] = useState(null);
  const formRef = useRef();
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
      wholesaleId: params.id
    }).then(res => {
      if (res.code === 0) {
        setDetailData(res.data);
        const wholesaleInfo = res.data.wholesale
        formRef.current.setFieldsValue({
          ...wholesaleInfo,
          wholesaleTime: [wholesaleInfo.wholesaleStartTime, wholesaleInfo.wholesaleEndTime],
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
    const { wholesaleTime, area, ...rest } = values;
    return new Promise((resolve, reject) => {
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
          wholesaleSupplyPrice: amountTransform(item.wholesaleSupplyPrice),
          fixedPrice: amountTransform(item.fixedPrice),
          settlePercent: amountTransform(item.settlePercent, '/'),
        })),
        allowArea: getSubmitAreaData(area),
        storeLevel: 'ALL',
        memberLevel: 'ALL',
        wholesaleStartTime: wholesaleTime[0],
        wholesaleEndTime: wholesaleTime[1],
        recoverPayTimeout: 0,
        canRecoverPayTimes: 0,
        wholesaleFlowType: selectItem[0].wholesaleFlowType,
        ...rest,
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

  useEffect(() => {
    getUncheckableItemValues();
    if (params.id && +params.id !== 0) {
      getDetail()
    } else {
      setLoading(false);
    }
  }, [])

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

              const { endTimeAdvancePayment, wholesaleTime } = values;
              if (endTimeAdvancePayment <= wholesaleTime[0] || endTimeAdvancePayment >= wholesaleTime[1]) {
                message.error('店主采购单下单截止时间必须大于活动开始时间且小于截至时间');
                return false;
              }
              await submit(values);
              return true;
            }}
            formRef={formRef}
            {...formItemLayout}
            initialValues={{
              // canRecoverPayTimes: 1,
              // recoverPayTimeout: 3
            }}
            className={styles.center}
          >
            {
              !loading &&
              <EditTable onSelect={setSelectItem} sku={detailData?.sku?.[0]} wholesaleFlowType={detailData?.wholesale?.wholesaleFlowType} />
            }
            <ProFormText name="name" label="活动名称" width="lg" placeholder="请输入活动名称" rules={[{ required: true, message: '请输入活动名称' }]} />
            <ProFormDateTimeRangePicker
              name="wholesaleTime"
              label="活动时间"
              width="lg"
              rules={[{ required: true, message: '请选择活动时间' }]}
              fieldProps={{
                // disabledDate: (currentDate) => { return +currentDate < +new Date() || new Date(+currentDate).getDate() === new Date().getDate() },
                // disabledTime: disabledRangeTime,
                showTime: {
                  defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:59:59', 'HH:mm:ss')]
                }
              }}
            />
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
            <ProFormText
              name="virtualSales"
              label="本次集约虚拟销量"
              width="lg"
              placeholder="请输入集约虚拟销量"
              validateFirst
              rules={[
                { required: true, message: '请输入集约虚拟销量' },
                () => ({
                  validator(_, value) {
                    if (!/^\d+$/g.test(value) || `${value}`.indexOf('.') !== -1 || value <= 0) {
                      return Promise.reject(new Error(`请输入大于零的正整数`));
                    }
                    return Promise.resolve();
                  },
                })
              ]} />
            <ProFormCheckbox.Group value={'1'} label="可购买的社区店等级" disabled options={[{ label: '全部', value: 1 }]} />
            <ProFormCheckbox.Group value={'1'} label="可购买的会员等级" disabled options={[{ label: '全部', value: 1 }]} />
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
                        <dd>1、二维码宽和高都为220px；</dd>
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
              history.push('/intensive-activity-management/intensive-activity-list')
              return true;
            }}
            className={styles.center}
          >
            <Result
              status="success"
              title={`活动${+params.id !== 0 ? '修改' : '创建'}成功`}
              subTitle={<div style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>活动已进入待审核状态，请提醒主管尽快审核</div>}
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
        </StepsForm >
      </ProCard >
    </PageContainer >
  )
}

export default IntensiveActivityCreate
