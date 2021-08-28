import React, { useState, useEffect } from 'react';
import { Form, Image, Tag } from 'antd';
import { amountTransform } from '@/utils/utils'
import EditTable from './table';
import MultiCascader from 'rsuite/lib/MultiCascader';
import 'rsuite/lib/MultiCascader/styles';
import { arrayToTree } from '@/utils/utils'
import styles from './edit.less'
import { EyeOutlined } from '@ant-design/icons'

export default (props) => {
  const { detailData } = props;
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);

  const { goods } = detailData;
  const [selectAreaKey, setSelectAreaKey] = useState([]);
  const [areaData, setAreaData] = useState([]);
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

  const renderMultiCascaderTag = (selectedItems) => {
    const titleArr = [];
    selectedItems.forEach(item => {
      const arr = [];
      let node = item.parent;
      arr.push(item.label)
      while (node) {
        arr.push(node.label)
        node = node.parent;
      }
      titleArr.push({
        label: arr.reverse().join('-'),
        value: item.value
      })
    })

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          titleArr.map(item => (
            <Tag
              key={item.value}
              // closable
              style={{ marginBottom: 10 }}
              onClose={() => {
                setSelectAreaKey(selectAreaKey.filter(it => it !== item.value))
              }}
            >
              {item.label}
            </Tag>
          ))
        }
      </div>
    );
  }

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
            key: item[1].skuId,
            imageUrl: item[1].imageUrl,
            spec1: specValuesMap[specDataKeys[0]],
            spec2: specValuesMap[specDataKeys[1]],
            specValue,
          }
        }))
      }

      if (detailData?.refuseArea?.length) {
        const areaArr = [];
        for (let index = 0; index < detailData.refuseArea.length; index++) {
          const refuseArea = detailData.refuseArea[index];
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
        setSelectAreaKey([...new Set(areaArr)])
      }
    }

  }, [detailData]);

  useEffect(() => {
    const arr = arrayToTree(window.yeahgo_area || [])
    let str = JSON.stringify(arr)
    str = str.replace(/name/g, 'label').replace(/id/g, 'value')
    setAreaData(JSON.parse(str))
  }, [])

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
      {detailData?.goods.goodsDesc &&
        <Form.Item
          label="商品副标题"
        >
          {detailData?.goods.goodsDesc}
        </Form.Item>
      }
      {detailData?.goods.goodsKeywords &&
        <Form.Item
          label="搜索关键字"
        >
          {detailData?.goods.goodsKeywords}
        </Form.Item>
      }
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
      {detailData?.goods.brandIdDisplay &&
        <Form.Item
          label="商品品牌"
        >
          {detailData?.goods.brandIdDisplay}
        </Form.Item>}
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
      <Form.Item
        label="单位运费(元)"
      >
        {amountTransform(detailData?.goods.wholesaleFreight, '/')}
      </Form.Item>
      {
        detailData?.isMultiSpec === 1
          ?
          <>
            {!!tableData.length && <EditTable tableHead={tableHead} tableData={tableData} goodsSaleType={detailData?.goods?.goodsSaleType} settleType={detailData?.settleType} />}
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
              {detailData?.goods?.activityStockNum}
            </Form.Item>
            <Form.Item
              label="单SKU起售数量"
            >
              {detailData?.goods?.buyMinNum}
            </Form.Item>
          </>
      }
      <Form.Item
        label="是否包邮"
      >
        {{ 0: '不包邮', 1: '包邮', }[detailData?.goods?.isFreeFreight]}
      </Form.Item>
      {detailData?.freightTemplateName &&
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
      {detailData?.goods.goodsRemark
        &&
        <Form.Item
          label="特殊说明"
        >
          {detailData?.goods.goodsRemark}
        </Form.Item>
      }
      {selectAreaKey.length !== 0 && <Form.Item
        label="不发货地区"
      >
        <MultiCascader
          value={selectAreaKey}
          data={areaData}
          style={{ width: '100%' }}
          placeholder="请选择不发货地区"
          renderValue={(a, b) => renderMultiCascaderTag(b)} locale={{ searchPlaceholder: '输入省市区名称' }}
          onChange={setSelectAreaKey}
          cleanable={false}
        />
      </Form.Item>}
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