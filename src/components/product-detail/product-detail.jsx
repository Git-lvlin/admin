import React, { useState, useEffect } from 'react';
import { Form, Image, Tag } from 'antd';
import { amountTransform } from '@/utils/utils'
import EditTable from './table';
import styles from './edit.less'
import { EyeOutlined } from '@ant-design/icons'

export default (props) => {
  const { detailData } = props;
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);

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
          const specValue = {};
          specDataKeys.forEach(it => {
            const index = it.slice(0, 1)
            specValue[index] = it
          })
          return {
            ...item[1],
            code: item[0],
            retailSupplyPrice: amountTransform(item[1].retailSupplyPrice, '/'),
            wholesaleSupplyPrice: amountTransform(item[1].wholesaleSupplyPrice, '/'),
            wholesaleMinNum: item[1].wholesaleMinNum,
            salePriceFloat: amountTransform(item[1].salePriceFloat),
            salePriceProfitLoss: amountTransform(item[1].salePriceProfitLoss, '/'),
            // suggestedRetailPrice: amountTransform(item[1].suggestedRetailPrice, '/'),
            // wholesalePrice: amountTransform(item[1].wholesalePrice, '/'),
            salePrice: amountTransform((detailData.settleType === 1 || detailData.settleType === 0) ? item[1].retailSupplyPrice : item[1].salePrice, '/'),
            marketPrice: amountTransform(item[1].marketPrice || item[1].retailSupplyPrice, '/'),
            wholesaleFreight: amountTransform(item[1].wholesaleFreight, '/'),
            batchNumber: item[1].batchNumber,
            isFreeFreight: item[1].isFreeFreight,
            freightTemplateId: item[1]?.freightTemplateName ? { label: item[1]?.freightTemplateName, value: item[1]?.freightTemplateId } : undefined,
            key: item[1].skuId,
            imageUrl: item[1].imageUrl,
            spec1: specValuesMap[specDataKeys[0]],
            spec2: specValuesMap[specDataKeys[1]],
            specValue,
          }
        }))
      }
    }

  }, [detailData]);

  return (
    <Form
      {...formItemLayout}
      style={{ backgroundColor: '#fff', padding: 20, paddingTop: 50, paddingBottom: 100 }}
    >
      <Form.Item
        label="商品名称"
      >
        {detailData?.goods.goodsName}
      </Form.Item>
      <Form.Item
        label="发票税率(%)"
      >
        {amountTransform(detailData?.goods.wholesaleTaxRate)}
      </Form.Item>
      <Form.Item
        label="商品副标题"
      >
        {detailData?.goods.goodsDesc}
      </Form.Item>
      <Form.Item
        label="搜索关键字"
      >
        {detailData?.goods.goodsKeywords}
      </Form.Item>
      <Form.Item
        label="商品品类"
      >
        {`${detailData?.goods.gcId1Display}/${detailData?.goods.gcId2Display}`}
      </Form.Item>
      <Form.Item
        label="商品编号"
      >
        {detailData?.goods.supplierSpuId}
      </Form.Item>
      <Form.Item
        label="商品品牌"
      >
        {detailData?.goods.brandIdDisplay}
      </Form.Item>
      <Form.Item
        label="供货类型"
      >
        {{ 0: '批发+零售', 1: '仅批发', 2: '仅零售' }[detailData?.goods.goodsSaleType]}
      </Form.Item>
      <Form.Item
        label="结算模式"
      >
        {{ 1: '佣金模式', 2: '底价模式' }[detailData?.settleType]}
      </Form.Item>
      <Form.Item
        label="规格属性"
      >
        {{ 0: '单规格', 1: '多规格' }[detailData?.isMultiSpec]}
      </Form.Item>
      {
        detailData?.goods?.goodsSaleType !== 2 && detailData?.isMultiSpec === 0 &&
        <Form.Item
          label="平均运费(元)"
        >
          {amountTransform(detailData?.goods.wholesaleFreight, '/')}
        </Form.Item>
      }
      {
        detailData?.isMultiSpec === 1
          ?
          <>
            {!!tableData.length && <EditTable tableHead={tableHead} tableData={tableData} goodsSaleType={detailData?.goods?.goodsSaleType} settleType={detailData?.settleType} />}
            <Form.Item
              label="总可用库存"
            >
              {detailData?.goods?.totalStock}
            </Form.Item>
            <Form.Item
              label="单SKU起售数量"
            >
              {detailData?.goods?.buyMinNum}
            </Form.Item>
          </>
          :
          <>
            <Form.Item
              label="货号"
            >
              {detailData?.goods?.supplierSkuId}
            </Form.Item>

            {
              detailData?.goods?.goodsSaleType !== 2 &&
              <>
                <Form.Item
                  label="批发供货价(元)"
                >
                  {amountTransform(detailData?.goods?.wholesaleSupplyPrice, '/')}
                </Form.Item>
                <Form.Item
                  label="集采箱柜单位量"
                >
                  {detailData?.goods?.batchNumber}
                </Form.Item>
                <Form.Item
                  label="最低批发量"
                >
                  {detailData?.goods?.wholesaleMinNum}
                </Form.Item>
              </>
            }
            {
              detailData?.goods?.goodsSaleType !== 1 &&
              <>
                <Form.Item
                  label="零售供货价(元)"
                >
                  {amountTransform(detailData?.goods?.retailSupplyPrice, '/')}
                </Form.Item>
              </>
            }
            <Form.Item
              label="秒约价"
            >
              {amountTransform(detailData?.goods?.salePrice, '/')}
            </Form.Item>
            <Form.Item
              label="市场价"
            >
              {amountTransform(detailData?.goods?.marketPrice, '/')}
            </Form.Item>
            <Form.Item
              label="可用库存"
            >
              {detailData?.goods?.totalStock}
            </Form.Item>
            <Form.Item
              label="库存预警值"
            >
              {detailData?.goods?.stockAlarmNum}
            </Form.Item>
            <Form.Item
              label="单SKU起售数量"
            >
              {detailData?.goods?.buyMinNum}
            </Form.Item>
            <Form.Item
              label="单SKU单次最多零售购买数量"
            >
              {detailData?.goods?.buyMaxNum}
            </Form.Item>
          </>
      }
      {detailData?.goods?.goodsSaleType !== 1 && detailData?.isMultiSpec === 0 &&<Form.Item
        label="是否包邮"
      >
        {{ 0: '不包邮', 1: '包邮', }[detailData?.goods?.isFreeFreight]}
      </Form.Item>}
      {detailData?.goods?.goodsSaleType !== 1 && !detailData?.goods?.isFreeFreight && detailData?.isMultiSpec === 0 &&
        <Form.Item
          label="运费模板"
        >
          {detailData?.freightTemplateName}
        </Form.Item>}
      <Form.Item
        label="七天无理由退货"
      >
        {{ 0: '不支持', 1: '支持', }[detailData?.goods?.supportNoReasonReturn]}
      </Form.Item>
      <Form.Item
        label="特殊说明"
      >
        {detailData?.goods.goodsRemark}
      </Form.Item>
      <Form.Item
        label="商品主图"
        name="primaryImages"
      >
        {
          detailData?.primaryImages.map(item => (
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
          detailData?.detailImages.map(item => (
            <div
              style={{ marginRight: 10, display: 'inline-block' }}
              key={item.imageSort}
            >
              <Image width={100} height={100} src={item.imageUrl} />
            </div>
          ))
        }
      </Form.Item>
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

      <Form.Item
        label="创建时间"
      >
        {detailData?.goods.createTimeDisplay}
      </Form.Item>

      <Form.Item
        label="审核状态"
      >
        {detailData?.goods.goodsVerifyStateDisplay}
      </Form.Item>

      <Form.Item
        label="上架状态"
      >
        {detailData?.goods.goodsStateDisplay}
      </Form.Item>

      {detailData?.goods.goodsVerifyRemark && <Form.Item
        label="原因"
      >
        <span style={{ color: 'red' }}>{detailData?.goods.goodsVerifyRemark}</span>
      </Form.Item>}

      {/* 
          <ProFormSelect
            name="supplierHelperId"
            label="供应商家顾问"
            options={detailData?.supplierHelpList?.map(item => ({ label: item.companyName, value: item.id }))}
          />
           */}

    </Form>
  );
};