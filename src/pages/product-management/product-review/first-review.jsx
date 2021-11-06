import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Button, Form, Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons'
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormDependency,
} from '@ant-design/pro-form';
import Overrule from './overrule';
import EditTable from './edit-table';
import { amountTransform } from '@/utils/utils'
import styles from './first-review.less'
import * as api from '@/services/product-management/product-list';
import debounce from 'lodash/debounce';
import Look from './look';

export default (props) => {
  const { visible, setVisible, detailData, check, overrule } = props;
  const [overruleVisible, setOverruleVisible] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [tableHead, setTableHead] = useState([]);
  const [form] = Form.useForm()
  const [salePriceProfitLoss, setSalePriceProfitLoss] = useState(null);
  const [lookVisible, setLookVisible] = useState(false);
  const type = useRef(0)

  const { goods } = detailData;

  const formItemLayout = {
    labelCol: { span: 6 },
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

  useEffect(() => {
    if (detailData) {
      const { specName, specValues, specData } = detailData;

      if (detailData.isMultiSpec) {
        const specValuesMap = {};
        Object.values(specValues).forEach(element => {
          const obj = Object.entries(element);
          obj.forEach(item => {
            // eslint-disable-next-line prefer-destructuring
            specValuesMap[item[0]] = item[1];
          })

        });
        setTableHead(Object.values(specName))
        setTableData(Object.entries(specData).map(item => {
          const specDataKeys = item[0].substring(1).split('|');
          return {
            ...item[1],
            retailSupplyPrice: amountTransform(item[1].retailSupplyPrice, '/'),
            wholesaleSupplyPrice: amountTransform(item[1].wholesaleSupplyPrice, '/'),
            // suggestedRetailPrice: amountTransform(item[1].retailSupplyPrice, '/'),
            // wholesalePrice: amountTransform(item[1].retailSupplyPrice, '/'),
            salePrice: amountTransform(item[1].salePrice, '/'),
            marketPrice: amountTransform(item[1].marketPrice, '/'),
            salePriceFloat: amountTransform(item[1].salePriceFloat),
            salePriceProfitLoss: amountTransform(item[1].salePriceProfitLoss, '/'),
            wholesaleFreight: amountTransform(item[1].wholesaleFreight, '/'),
            batchNumber: item[1].batchNumber,
            isFreeFreight: item[1].isFreeFreight,
            freightTemplateId: item[1]?.freightTemplateName ? { label: item[1]?.freightTemplateName, value: item[1]?.freightTemplateId } : undefined,
            key: item[1].skuId,
            imageUrl: item[1].imageUrl,
            spec1: specValuesMap[specDataKeys[0]],
            spec2: specValuesMap[specDataKeys[1]],
          }
        }))
      }

      form.setFieldsValue({
        salePrice: amountTransform(detailData?.goods?.salePrice, '/'),
        marketPrice: amountTransform(detailData?.goods?.marketPrice, '/'),
        supplierHelperId: !detailData.supplierHelperId ? null : detailData.supplierHelperId,
        salePriceFloat: amountTransform(detailData?.goods?.salePriceFloat),
      })
    }

  }, [detailData]);

  return (
    <DrawerForm
      title="商品审核"
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1300,
      }}
      form={form}
      onFinish={() => {
        check(detailData.spuId);
      }}
      submitter={{
        render: (props) => {
          return [
            <Button key="1" type="primary" onClick={() => { props.submit(); }}>
              审核通过
            </Button>,
            <Button type="danger" key="3" danger onClick={() => { setOverruleVisible(true) }}>
              审核驳回
            </Button>,
            <Button key="4" onClick={() => { setVisible(false) }}>
              返回
            </Button>,
            <Button
              key="look"
              onClick={(_) => {
                if (detailData) {
                  setLookVisible(true)
                } else {
                  message.error('请上传图片后预览')
                }
              }}
            >
              预览
            </Button>,
          ];
        },
      }}
      visible={visible}
      initialValues={{
        settleType: 2,
      }}
      {...formItemLayout}
    >
      <Form.Item
        label="商品名称"
      >
        {goods.goodsName}
      </Form.Item>

      <Form.Item
        label="商品品类"
      >
        {`${goods.gcId1Display}/${goods.gcId2Display}`}
      </Form.Item>

      <Form.Item
        label="商品编号"
      >
        {goods.supplierSpuId}
      </Form.Item>

      {goods.brandIdDisplay &&
        <Form.Item
          label="商品品牌"
        >
          {goods.brandIdDisplay}
        </Form.Item>}

      <Form.Item
        label="供货类型"
      >
        {{ 0: '批发+零售', 1: '仅批发', 2: '零售' }[goods.goodsSaleType]}
      </Form.Item>

      {detailData?.goods?.goodsSaleType !== 2 && detailData?.isMultiSpec === 0 && <Form.Item
        label="平均运费(元)"
      >
        {amountTransform(goods.wholesaleFreight, '/')}
      </Form.Item>}
      <Form.Item
        label="商品开票税率(%)"
      >
        {amountTransform(goods.wholesaleTaxRate)}
      </Form.Item>
      {detailData?.goods?.goodsSaleType !== 1 && detailData?.isMultiSpec === 0 && <Form.Item
        label="是否包邮"
      >
        {{ 0: '不包邮', 1: '包邮', }[goods.isFreeFreight]}
      </Form.Item>}

      {detailData?.goods?.goodsSaleType !== 1 && detailData?.isMultiSpec === 0 && goods.isFreeFreight === 0 &&
        <Form.Item
          label="运费模板"
        >
          {detailData.freightTemplateName}
        </Form.Item>}
      {goods.goodsKeywords &&
        <Form.Item
          label="搜索关键字"
        >
          {goods.goodsKeywords}
        </Form.Item>
      }

      <Form.Item
        label="规格属性"
      >
        {{ 0: '单规格', 1: '多规格' }[detailData.isMultiSpec]}
      </Form.Item>

      {/* <ProFormRadio.Group
        name="settleType"
        label="结算模式"
        rules={[{ required: true }]}
        options={[
          // {
          //   label: '佣金模式',
          //   value: 1,
          // },
          {
            label: '底价模式',
            value: 2,
          },
        ]}
      /> */}

      {/* <ProFormSelect
        name="supplierHelperId"
        label="供应商家顾问"
        options={detailData?.supplierHelpList?.map(item => ({ label: item.companyName, value: item.id }))}
      /> */}

      {
        detailData.isMultiSpec === 1
          ?
          <>
            <ProFormDependency name={['settleType']}>
              {
                ({ settleType }) => (
                  <>
                    {!!tableData.length &&
                      <EditTable
                        settleType={settleType}
                        tableHead={tableHead}
                        tableData={tableData}
                        setTableData={setTableData}
                        wholesaleTaxRate={detailData?.goods?.wholesaleTaxRate}
                        goodsSaleType={detailData?.goods?.goodsSaleType}
                      />}
                  </>
                )
              }
            </ProFormDependency>

          </>
          :
          <>
            {
              detailData?.goods?.goodsSaleType !== 2
              &&
              <>
                <Form.Item
                  label="批发供货价(元)"
                >
                  {amountTransform(goods.wholesaleSupplyPrice, '/')}
                </Form.Item>
                <Form.Item
                  label="集采箱规单位量"
                >
                  {goods.batchNumber}
                </Form.Item>
                <Form.Item
                  label="最低批发量"
                >
                  {goods.wholesaleMinNum}
                </Form.Item>
              </>
            }

            {detailData?.goods?.goodsSaleType !== 1 && <Form.Item
              label="零售供货价(元)"
            >
              {amountTransform(goods.retailSupplyPrice, '/')}
            </Form.Item>}
          </>
      }
      <Form.Item
        label={`${detailData.isMultiSpec === 0 ? '' : '总'}可用库存`}
      >
        {goods.stockNum}
      </Form.Item>
      <Form.Item
        label="库存单位"
      >
        {goods.unit}
      </Form.Item>
      <Form.Item
        label="单SKU起售数量"
      >
        {goods.buyMinNum}
      </Form.Item>

      {/* <Form.Item
        label="单次最多零售购买数量"
      >
        {goods.buyMaxNum}
      </Form.Item> */}

      <Form.Item
        label="七天无理由退货"
      >
        {{ 0: '不支持', 1: '支持', }[goods.supportNoReasonReturn]}
      </Form.Item>

      {goods.goodsRemark
        &&
        <Form.Item
          label="特殊说明"
        >
          {goods.goodsRemark}
        </Form.Item>
      }

      <Form.Item
        label="商品主图"
        name="primaryImages"
      >
        {
          detailData.primaryImages.map(item => (
            <div
              style={{ marginRight: 10, display: 'inline-block' }}
              key={item.imageSort}
            >
              <Image width={100} height={100} src={item.imageUrl} />
            </div>
          ))
        }
      </Form.Item>
      <Form.Item
        label="商品详情"
      >
        {
          detailData.detailImages.map(item => (
            <div
              style={{ marginRight: 10, display: 'inline-block' }}
              key={item.imageSort}
            >
              <Image width={100} height={100} src={item.imageUrl} />
            </div>
          ))
        }
      </Form.Item>
      {!!detailData.advImages.length &&
        <Form.Item
          label="商品横幅"
        >
          {
            detailData.advImages.map(item => (
              <div
                style={{ marginRight: 10, display: 'inline-block' }}
                key={item.imageSort}
              >
                <Image width={100} height={100} src={item.imageUrl} />
              </div>
            ))
          }
        </Form.Item>
      }
      {detailData?.videoUrl &&
        <Form.Item
          label="商品视频"
          name="videoUrl"
        >
          <div className={styles.video_preview}>
            <video width="100%" height="100%" src={detailData.videoUrl} />
            <div>
              <EyeOutlined onClick={() => { window.open(detailData.videoUrl, '_blank') }} style={{ color: '#fff', cursor: 'pointer' }} />
            </div>
          </div>
        </Form.Item>}

      {/* <Form.Item
        label="创建时间"
      >
        {goods.createTimeDisplay}
      </Form.Item>

      <Form.Item
        label="审核状态"
      >
        {goods.goodsVerifyStateDisplay}
      </Form.Item>

      <Form.Item
        label="上架状态"
      >
        {goods.goodsStateDisplay}
      </Form.Item>

      {goods.goodsVerifyRemark && <Form.Item
        label="原因"
      >
        <span style={{ color: 'red' }}>{goods.goodsVerifyRemark}</span>
      </Form.Item>} */}
      {overruleVisible && <Overrule
        visible={overruleVisible}
        setVisible={setOverruleVisible}
        callback={(text) => { overrule([detailData.spuId].join(','), text) }}
      />}
      {lookVisible && <Look
        visible={lookVisible}
        setVisible={setLookVisible}
        dataList={detailData}
      />}
    </DrawerForm>
  );
};