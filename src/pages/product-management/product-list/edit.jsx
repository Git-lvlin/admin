import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormDependency,
} from '@ant-design/pro-form';
import Upload from '@/components/upload'
import { uploadImageFormatConversion, amountTransform } from '@/utils/utils'
import { EyeOutlined } from '@ant-design/icons';
import * as api from '@/services/product-management/product-list';
import styles from './edit.less'
import FormModal from './form';
import EditTable from './edit-table';
import GcCascader from '@/components/gc-cascader'
import BrandSelect from '@/components/brand-select'

export default (props) => {
  const { visible, setVisible, detailData, callback, onClose } = props;
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [form] = Form.useForm()
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

  const urlsTransform = (urls) => {
    return urls.map((item, index) => {
      return {
        imageUrl: item,
        imageSort: index,
      }
    })
  }

  const submit = (values) => {
    const { specValues1, specValues2 } = form.getFieldsValue(['specValues1', 'specValues2']);
    const specName = {};
    const specValues = {};
    const specData = {};
    tableHead.forEach((item, index) => {
      if (item) {
        specName[index + 1] = item;
        if (!specValues[index + 1]) {
          specValues[index + 1] = {};
        }
        [specValues1, specValues2][index].forEach((item2, index2) => {
          specValues[index + 1][`${index + 1}0${index2 + 1}`] = item2.name
        })
      }
    })

    tableData.forEach(item => {
      const { code, key, spec1, spec2, specValue, ...rest } = item;
      specData[code] = {
        ...rest,
        specValue,
        imageUrl: item?.imageUrl,
        // wholesalePrice: amountTransform(item.wholesalePrice),
        retailSupplyPrice: amountTransform(item.retailSupplyPrice),
        // suggestedRetailPrice: amountTransform(item.suggestedRetailPrice),
        salePrice: amountTransform(item.salePrice),
        marketPrice: amountTransform(item.marketPrice),
      }
    })
    const {
      videoUrl,
      gcId,
      primaryImages,
      detailImages,
      // advImages,
      isMultiSpec,
      // wholesalePrice,
      retailSupplyPrice,
      // suggestedRetailPrice,
      salePrice,
      marketPrice,
      freightTemplateId,
      ...rest } = values;

    const obj = {
      isMultiSpec,
      goods: {
        ...rest,
        gcId1: gcId[0],
        gcId2: gcId[1],
      },
      primaryImages: urlsTransform(primaryImages),
      detailImages: urlsTransform(detailImages),
      // advImages: advImages?.length ? urlsTransform(advImages) : null,
      videoUrl,
    };

    if (freightTemplateId) {
      obj.goods.freightTemplateId = freightTemplateId.value;
      obj.goods.freightTemplateName = freightTemplateId.label;
    }

    if (isMultiSpec) {
      obj.specName = specName;
      obj.specValues = specValues;
      obj.specData = specData;
    } else {
      // obj.goods.wholesalePrice = amountTransform(wholesalePrice);
      obj.goods.retailSupplyPrice = amountTransform(retailSupplyPrice);
      // obj.goods.suggestedRetailPrice = amountTransform(suggestedRetailPrice);
      obj.goods.salePrice = amountTransform(salePrice);
      obj.goods.marketPrice = amountTransform(marketPrice);
    }

    if (detailData) {
      obj.supplierId = detailData.supplierId
      obj.storeNo = detailData.storeNo
      obj.goodsFromType = detailData.goodsFromType
      obj.spuId = detailData.spuId
      obj.goods.skuId = detailData.goods.skuId
    }

    return new Promise((resolve, reject) => {
      const apiMethod = detailData ? api.editGoods : api.addGoods
      apiMethod(obj, { showSuccess: true, showError: true }).then(res => {
        if (res.code === 0) {
          resolve();
          callback();
        } else {
          reject();
        }
      })
    });
  }

  const createEditTableData = (data) => {
    const { specName1, specName2, specValues1, specValues2 } = form.getFieldsValue(['specName1', 'specName2', 'specValues1', 'specValues2']);

    const specArr = [];
    specValues1.forEach((item, index) => {
      if (specValues2[0].name) {
        specValues2.forEach((item2, index2) => {
          specArr.push({
            ...data,
            skuId: 0,
            spec1: item.name,
            spec2: item2.name,
            key: `${index}-${index2}`,
            specValue: {
              1: `10${index + 1}`,
              2: `20${index2 + 1}`,
            },
            code: `i_10${index + 1}20${index2 + 1}`
          })
        })
      } else {
        specArr.push({
          ...data,
          skuId: 0,
          spec1: item.name,
          key: index,
          specValue: {
            1: 100 + index + 1,
          },
          code: `i_10${index + 1}`
        })
      }

    })
    setTableHead([specName1, specName2])
    setTableData([])
    setTimeout(() => {
      setTableData(specArr)
    })
  }

  const settleTypeChange = (e) => {
    const { goods } = detailData;

    if (e.target.value === 1) {
      form.setFieldsValue({
        salePrice: amountTransform(goods.retailSupplyPrice, '/'),
        marketPrice: amountTransform(goods.retailSupplyPrice, '/'),
      })
    } else {
      form.setFieldsValue({
        salePrice: amountTransform(goods.salePrice || goods.retailSupplyPrice, '/'),
        marketPrice: amountTransform(goods.marketPrice || goods.retailSupplyPrice, '/'),
      })
    }
  }

  useEffect(() => {
    if (detailData) {
      const { goods, specName, specValues, specData, freightTemplateId, freightTemplateName, settleType } = detailData;
      form.setFieldsValue({
        goodsName: goods.goodsName,
        goodsDesc: goods.goodsDesc,
        supplierSpuId: goods.supplierSpuId,
        supplierSkuId: goods.supplierSkuId,
        goodsKeywords: goods.goodsKeywords,
        goodsSaleType: goods.goodsSaleType,
        isFreeFreight: goods.isFreeFreight,
        isMultiSpec: detailData.isMultiSpec,
        stockNum: goods.stockNum,
        stockAlarmNum: goods.stockAlarmNum,
        freightTemplateId: +goods.freightTemplateId,
        // wholesaleMinNum: goods.wholesaleMinNum,
        supportNoReasonReturn: goods.supportNoReasonReturn,
        buyMinNum: goods.buyMinNum,
        buyMaxNum: goods.buyMaxNum,
        goodsRemark: goods.goodsRemark,
        primaryImages: uploadImageFormatConversion(detailData.primaryImages, 'imageUrl'),
        detailImages: uploadImageFormatConversion(detailData.detailImages, 'imageUrl'),
        // advImages: uploadImageFormatConversion(detailData.advImages, 'imageUrl'),
        videoUrl: goods.videoUrl,
        brandId: goods.brandId,
        settleType: settleType || 1,
        gcId: [goods.gcId1, goods.gcId2],
      })

      if (freightTemplateId && freightTemplateName) {
        form.setFieldsValue({
          freightTemplateId: { label: freightTemplateName, value: freightTemplateId }
        })
      }

      if (detailData.isMultiSpec) {
        form.setFieldsValue({
          specName1: specName['1'],
          specValues1: Object.values(specValues['1']).map(item => ({ name: item })),
        })

        if (specName['2']) {
          form.setFieldsValue({
            specName2: specName['2'],
            specValues2: Object.values(specValues['2']).map(item => ({ name: item })),
          })
        }

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
            // suggestedRetailPrice: amountTransform(item[1].suggestedRetailPrice, '/'),
            // wholesalePrice: amountTransform(item[1].wholesalePrice, '/'),
            salePrice: amountTransform((settleType === 1 || settleType === 0) ? item[1].retailSupplyPrice : item[1].salePrice, '/'),
            marketPrice: amountTransform((settleType === 1 || settleType === 0) ? item[1].retailSupplyPrice : item[1].marketPrice, '/'),
            key: item[1].skuId,
            imageUrl: item[1].imageUrl,
            spec1: specValuesMap[specDataKeys[0]],
            spec2: specValuesMap[specDataKeys[1]],
            specValue,
          }
        }))
      } else {
        form.setFieldsValue({
          // wholesalePrice: amountTransform(goods.wholesalePrice, '/'),
          retailSupplyPrice: amountTransform(goods.retailSupplyPrice, '/'),
          // suggestedRetailPrice: amountTransform(goods.suggestedRetailPrice, '/'),
          salePrice: amountTransform((settleType === 1 || settleType === 0) ? goods.retailSupplyPrice : goods.salePrice, '/'),
          marketPrice: amountTransform((settleType === 1 || settleType === 0) ? goods.retailSupplyPrice : goods.marketPrice, '/'),
        })
      }
    }

  }, [form, detailData]);

  return (
    <DrawerForm
      title={`${detailData ? '编辑' : '新建'}商品`}
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1200,
        className: styles.drawer_form,
        onClose: () => {
          onClose();
        }
      }}
      form={form}
      onFinish={async (values) => {
        await submit(values);
        return true;
      }}
      visible={visible}
      initialValues={{
        isMultiSpec: 0,
        goodsSaleType: 0,
        isFreeFreight: 1,
        buyMinNum: 1,
        buyMaxNum: 200,
        supportNoReasonReturn: 1,
        specValues1: [{}],
        specValues2: [{}],
      }}
      {...formItemLayout}
    >
      <div>
        {formModalVisible &&
          <FormModal
            visible={formModalVisible}
            setVisible={setFormModalVisible}
            getData={createEditTableData}
          />
        }
      </div>
      <ProFormText
        name="goodsName"
        label="商品名称"
        placeholder="请输入商品名称"
        rules={[{ required: true, message: '请输入商品名称' }]}
        fieldProps={{
          maxLength: 50,
        }}
        disabled
      />
      <ProFormText
        name="goodsDesc"
        label="商品副标题"
        placeholder="请输入商品副标题"
        fieldProps={{
          maxLength: 20,
        }}
      />
      <ProFormText
        name="supplierSpuId"
        label="商品编号"
        placeholder="请输入商品编号"
        fieldProps={{
          maxLength: 32,
        }}
        disabled
      />
      <ProFormText
        name="goodsKeywords"
        label="搜索关键字"
        placeholder="请输入搜索关键字"
        fieldProps={{
          maxLength: 30,
        }}
      />
      <Form.Item
        label="商品品类"
        name="gcId"
        rules={[{ required: true, message: '请选择商品品类' }]}
      >
        <GcCascader disabled />
      </Form.Item>
      <Form.Item
        name="brandId"
        label="商品品牌"
      >
        <BrandSelect disabled />
      </Form.Item>

      <ProFormRadio.Group
        name="goodsSaleType"
        label="供货类型"
        rules={[{ required: true }]}
        options={[
          {
            label: '批发+零售',
            value: 0,
          },
          {
            label: '仅批发',
            value: 1,
          },
        ]}
        disabled
      />
      <ProFormRadio.Group
        name="settleType"
        label="结算模式"
        rules={[{ required: true }]}
        options={[
          {
            label: '佣金模式',
            value: 1,
          },
          {
            label: '底价模式',
            value: 2,
          },
        ]}
        fieldProps={{
          onChange: settleTypeChange
        }}
      />
      <ProFormRadio.Group
        name="isMultiSpec"
        label="规格属性"
        rules={[{ required: true }]}
        options={[
          {
            label: '单规格',
            value: 0,
          },
          {
            label: '多规格',
            value: 1,
          },
        ]}
        disabled
      />
      <ProFormDependency name={['isMultiSpec']}>
        {({ isMultiSpec }) => {
          return isMultiSpec === 1 ?
            <>
              <ProFormText
                name="specName1"
                label="规格一"
                placeholder="请输入规格名称"
                rules={[{ required: true, message: '请输入规格名称' }]}
                fieldProps={{
                  maxLength: 18,
                }}
                disabled
              />
              <Form.List name="specValues1">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => {
                      return (
                        <Form.Item
                          key={key}
                          label=" "
                          name={[name, 'name']}
                          colon={false}
                        >
                          <Input disabled placeholder="请输入规格属性" maxLength={18} addonAfter={
                            key === 0 ?
                              <Button disabled type="primary" onClick={() => { add() }}>添加</Button>
                              :
                              <Button disabled type="primary" danger onClick={() => { remove(name) }}>删除</Button>
                          } />
                        </Form.Item>
                      )
                    })}
                  </>
                )}
              </Form.List>
              <ProFormText
                name="specName2"
                label="规格二"
                placeholder="请输入规格名称"
                disabled
              />
              <Form.List name="specValues2">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }) => {
                      return (
                        <Form.Item
                          key={key}
                          label=" "
                          name={[name, 'name']}
                          colon={false}
                        >
                          <Input disabled maxLength={18} placeholder="请输入规格属性" addonAfter={
                            key === 0 ?
                              <Button disabled type="primary" onClick={() => { add() }}>添加</Button>
                              :
                              <Button disabled type="primary" danger onClick={() => { remove(name) }}>删除</Button>
                          } />
                        </Form.Item>
                      )
                    })}
                  </>
                )}
              </Form.List>
              <Form.Item
                label=" "
                colon={false}
              >
                <Button disabled type="primary" onClick={() => { setFormModalVisible(true) }}>填写批量规格参数 生成规格配置表</Button>
              </Form.Item>
              {!!tableData.length && <ProFormDependency name={['settleType']}>
                {
                  ({ settleType }) => (
                    <>
                      {!!tableData.length && <EditTable settleType={settleType} tableHead={tableHead} tableData={tableData} setTableData={setTableData} />}
                    </>
                  )
                }
              </ProFormDependency>}
            </>
            :
            <>
              <ProFormText
                name="supplierSkuId"
                label="货号"
                placeholder="请输入货号"
              />
              <ProFormText
                name="retailSupplyPrice"
                label="供货价"
                placeholder="请输入供货价"
                rules={[{ required: true, message: '请输入供货价' }]}
                disabled
              />
              {/* <ProFormText
                name="suggestedRetailPrice"
                label="建议零售价"
                placeholder="请输入建议零售价"
                rules={[{ required: true, message: '请输入建议零售价' }]}
              /> */}
              <ProFormDependency name={['settleType']}>
                {({ settleType }) => (
                  <>
                    <ProFormText
                      name="salePrice"
                      label="秒约价"
                      placeholder="请输入秒约价"
                      validateFirst
                      rules={[
                        { required: true, message: '请输入秒约价' },
                        () => ({
                          validator(_, value) {
                            if (!/^\d+\.?\d*$/g.test(value) || value <= 0) {
                              return Promise.reject(new Error('请输入大于零的数字'));
                            }
                            return Promise.resolve();
                          },
                        })
                      ]}
                      disabled={settleType === 1}
                    />
                    
                  </>
                )}
              </ProFormDependency>
              <ProFormText
                name="marketPrice"
                label="市场价"
                placeholder="请输入市场价"
                validateFirst
                rules={[
                  { required: true, message: '请输入市场价' },
                  () => ({
                    validator(_, value) {
                      if (!/^\d+\.?\d*$/g.test(value) || value <= 0) {
                        return Promise.reject(new Error('请输入大于零的数字'));
                      }
                      return Promise.resolve();
                    },
                  })
                ]}
              />
              <ProFormText
                name="stockNum"
                label="可用库存"
                placeholder="请输入可用库存"
                rules={[{ required: true, message: '请输入可用库存数量' }]}
                disabled
              />
              <ProFormText
                name="stockAlarmNum"
                label="库存预警值"
                placeholder="请输入数字 可用库存小于等于此值时提醒"
                disabled
              />
              {/* <ProFormText
                name="wholesalePrice"
                label="批发价"
                placeholder="请输入批发价"
                rules={[{ required: true, message: '请输入供货价' }]}
              /> */}
              {/* <ProFormText
                name="wholesaleMinNum"
                label="批发起购量"
                placeholder="请输入批发起购量"
                rules={[{ required: true, message: '请输入数字 需大于可用库存' }]}
              /> */}


            </>
        }}
      </ProFormDependency>
      <ProFormText
        name="buyMinNum"
        label="单SKU起售数量"
        placeholder="请输入单SKU起售数量"
        rules={[{ required: true, message: '请输入单SKU起售数量' }]}
        disabled
      />
      <ProFormText
        name="buyMaxNum"
        label="单SKU单次最多零售购买数量"
        placeholder="请输入单SKU单次最多零售购买数量"
        disabled
      />

      <ProFormRadio.Group
        name="isFreeFreight"
        label="是否包邮"
        rules={[{ required: true }]}
        options={[
          {
            label: '包邮',
            value: 1,
          },
          {
            label: '不包邮',
            value: 0,
          },
        ]}
        disabled
      />
      <ProFormDependency name={['freightTemplateId']}>
        {({ freightTemplateId }) => (
          !!freightTemplateId &&
          <Form.Item
            name="freightTemplateId"
            label="选择运费模板"
          >
            <Select labelInValue allowClear disabled />
          </Form.Item>
        )}
      </ProFormDependency>
      <ProFormRadio.Group
        name="supportNoReasonReturn"
        label="七天无理由退货"
        rules={[{ required: true }]}
        options={[
          {
            label: '支持',
            value: 1,
          },
          {
            label: '不支持',
            value: 0,
          },
        ]}
        disabled
      />
      <ProFormTextArea
        name="goodsRemark"
        label="特殊说明"
        disabled
        fieldProps={{
          placeholder: ''
        }}
      />
      <Form.Item
        label="商品主图"
        name="primaryImages"
        required
        rules={[() => ({
          validator(_, value) {
            if (value && value.length >= 3) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('至少上传3张商品主图'));
          },
        })]}
      >
        <Upload code={218} disabled multiple maxCount={10} accept="image/*" dimension="1:1" size={500} />
      </Form.Item>
      <Form.Item
        label="商品详情"
        name="detailImages"
        rules={[{ required: true, message: '请上传商品详情图片' }]}
      >
        <Upload code={218} disabled multiple maxCount={10} accept="image/*" size={500 * 4} />
      </Form.Item>
      {/* {detailData.advImages && <Form.Item
        label="商品横幅"
        name="advImages"
      >
        <Upload disabled multiple maxCount={10} accept="image/*" dimension={{ width: 702, height: 320 }} size={500} />
      </Form.Item>} */}
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
      {detailData && <>
        <Form.Item
          label="创建时间"
        >
          {detailData.goods.createTimeDisplay}
        </Form.Item>

        <Form.Item
          label="审核状态"
        >
          {detailData.goods.goodsVerifyStateDisplay}
        </Form.Item>

        <Form.Item
          label="上架状态"
        >
          {detailData.goods.goodsStateDisplay}
        </Form.Item>

        {detailData.goods.goodsVerifyRemark && <Form.Item
          label="原因"
        >
          <span style={{ color: 'red' }}>{detailData.goods.goodsVerifyRemark}</span>
        </Form.Item>}
      </>}
    </DrawerForm>
  );
};