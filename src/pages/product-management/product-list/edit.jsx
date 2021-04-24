import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormDependency,
} from '@ant-design/pro-form';
import Upload from '@/components/upload'
import { uploadImageFormatConversion, amountTransform } from '@/utils/utils'
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
      specData[item.code] = {
        ...item,
        imageUrl: item?.imageUrl,
        wholesalePrice: amountTransform(item.wholesalePrice),
        retailSupplyPrice: amountTransform(item.retailSupplyPrice),
        suggestedRetailPrice: amountTransform(item.suggestedRetailPrice),
        salePrice: amountTransform(item.salePrice),
        marketPrice: amountTransform(item.marketPrice),
      }
    })
    const {
      videoUrl,
      gcId,
      primaryImages,
      detailImages,
      advImages,
      isMultiSpec,
      wholesalePrice,
      retailSupplyPrice,
      suggestedRetailPrice,
      salePrice,
      marketPrice,
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
      advImages: advImages ? urlsTransform(advImages) : undefined,
      videoUrl,
    };

    if (isMultiSpec) {
      obj.specName = specName;
      obj.specValues = specValues;
      obj.specData = specData;
    } else {
      obj.goods.wholesalePrice = amountTransform(wholesalePrice);
      obj.goods.retailSupplyPrice = amountTransform(retailSupplyPrice);
      obj.goods.suggestedRetailPrice = amountTransform(suggestedRetailPrice);
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
            spec1: item.name,
            spec2: item2.name,
            ...data,
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
          spec1: item.name,
          ...data,
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

  useEffect(() => {
    if (detailData) {
      const { goods, specName, specValues, specData } = detailData;
      form.setFieldsValue({
        goodsName: goods.goodsName,
        goodsDesc: goods.goodsDesc,
        supplierSpuId: goods.supplierSpuId,
        goodsKeywords: goods.goodsKeywords,
        isMultiSpec: detailData.isMultiSpec,
        stockNum: goods.stockNum,
        stockAlarmNum: goods.stockAlarmNum,
        wholesaleMinNum: goods.wholesaleMinNum,
        supportNoReasonReturn: goods.supportNoReasonReturn,
        buyMinNum: goods.buyMinNum,
        buyMaxNum: goods.buyMaxNum,
        goodsRemark: goods.goodsRemark,
        primaryImages: uploadImageFormatConversion(detailData.primaryImages, 'imageUrl', 'imageSort'),
        detailImages: uploadImageFormatConversion(detailData.detailImages, 'imageUrl', 'imageSort'),
        advImages: uploadImageFormatConversion(detailData.advImages, 'imageUrl', 'imageSort'),
        videoUrl: goods.videoUrl,
        gcId: [goods.gcId1, goods.gcId2],
      })

      if (detailData.isMultiSpec) {
        form.setFieldsValue({
          specName1: specName['1'],
          specName2: specName['2'],
          specValues1: Object.values(specValues['1']).map(item => ({ name: item })),
          specValues2: Object.values(specValues['2']).map(item => ({ name: item })),
        })
        const specValuesMap = {};
        Object.values(specValues).forEach(element => {
          const obj = Object.entries(element);
          // eslint-disable-next-line prefer-destructuring
          specValuesMap[obj[0][0]] = obj[0][1];
        });
        setTableHead(Object.values(specName))
        setTableData(Object.entries(specData).map(item => {
          const specDataKeys = item[0].substring(1).split('|');
          return {
            ...item[1],
            retailSupplyPrice: amountTransform(item[1].retailSupplyPrice, '/'),
            suggestedRetailPrice: amountTransform(item[1].suggestedRetailPrice, '/'),
            wholesalePrice: amountTransform(item[1].wholesalePrice, '/'),
            salePrice: amountTransform(item[1].salePrice, '/'),
            marketPrice: amountTransform(item[1].marketPrice, '/'),
            key: item[1].skuId,
            imageUrl: [{ url: item[1].imageUrl, uid: 1 }],
            spec1: specValuesMap[specDataKeys[0]],
            spec2: specValuesMap[specDataKeys[1]],
          }
        }))
      } else {
        form.setFieldsValue({
          wholesalePrice: amountTransform(goods.wholesalePrice, '/'),
          retailSupplyPrice: amountTransform(goods.retailSupplyPrice, '/'),
          suggestedRetailPrice: amountTransform(goods.suggestedRetailPrice, '/'),
          salePrice: amountTransform(goods.salePrice, '/'),
          marketPrice: amountTransform(goods.marketPrice, '/'),
        })
      }
    }

  }, [form, detailData]);

  return (
    <DrawerForm
      title="编辑商品"
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
      />
      <ProFormText
        name="goodsDesc"
        label="商品副标题"
        placeholder="请输入商品副标题"
        rules={[{ required: true, message: '请输入商品副标题' }]}
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
      />
      <ProFormText
        name="goodsKeywords"
        label="搜索关键字"
        placeholder="请输入搜索关键字"
      />
      <Form.Item
        label="商品品类"
        name="gcId"
        rules={[{ required: true, message: '请选择商品品类' }]}
      >
        <GcCascader />
      </Form.Item>
      <Form.Item
        name="brandId"
        label="商品品牌"
      >
        <BrandSelect />
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
          {
            label: '零售',
            value: 2,
          },
        ]}
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
                          <Input placeholder="请输入规格属性" maxLength={18} addonAfter={
                            key === 0 ?
                              <Button type="primary" onClick={() => { add() }}>添加</Button>
                              :
                              <Button type="primary" danger onClick={() => { remove(name) }}>删除</Button>
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
                          fieldProps={{
                            maxLength: 18,
                          }}
                        >
                          <Input placeholder="请输入规格属性" addonAfter={
                            key === 0 ?
                              <Button type="primary" maxLength={18} onClick={() => { add() }}>添加</Button>
                              :
                              <Button type="primary" danger onClick={() => { remove(name) }}>删除</Button>
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
                <Button type="primary" onClick={() => { setFormModalVisible(true) }}>填写批量规格参数 生成规格配置表</Button>
              </Form.Item>
              {!!tableData.length && <EditTable tableHead={tableHead} tableData={tableData} setTableData={setTableData} />}
            </>
            :
            <>
              <ProFormText
                name="stockNum"
                label="可用库存"
                placeholder="请输入可用库存"
                rules={[{ required: true, message: '请输入可用库存数量' }]}
              />
              <ProFormText
                name="stockAlarmNum"
                label="库存预警值"
                placeholder="请输入数字 可用库存小于等于此值时提醒"
              />
              <ProFormText
                name="wholesalePrice"
                label="批发价"
                placeholder="请输入批发价"
                rules={[{ required: true, message: '请输入供货价' }]}
              />
              <ProFormText
                name="wholesaleMinNum"
                label="批发起购量"
                placeholder="请输入批发起购量"
                rules={[{ required: true, message: '请输入数字 需大于可用库存' }]}
              />
              <ProFormText
                name="retailSupplyPrice"
                label="零售供货价"
                placeholder="请输入零售供货价"
                rules={[{ required: true, message: '请输入供货价' }]}
              />
              <ProFormText
                name="suggestedRetailPrice"
                label="建议零售价"
                placeholder="请输入建议零售价"
                rules={[{ required: true, message: '请输入建议零售价' }]}
              />
              <ProFormText
                name="salePrice"
                label="销售价"
                placeholder="请输入销售价"
                rules={[{ required: true, message: '请输入销售价' }]}
              />
              <ProFormText
                name="marketPrice"
                label="市场价"
                placeholder="请输入市场价"
                rules={[{ required: true, message: '请输入市场价' }]}
              />

            </>
        }}
      </ProFormDependency>
      <ProFormText
        name="buyMinNum"
        label="起售数量"
        placeholder="请输入起售数量"
        rules={[{ required: true, message: '请输入起售数量' }]}
      />
      <ProFormText
        name="buyMaxNum"
        label="单次最多零售购买数量"
        placeholder="请输入单次最多零售购买数量"
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
      />
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
      />
      <ProFormTextArea
        name="goodsRemark"
        label="特殊说明"
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
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小500kb以内</dd>
            <dd>2.图片比例1:1</dd>
            <dd>3.图片格式png/jpg/gif</dd>
            <dd>4.至少上传3张</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={10} accept="image/*" />
      </Form.Item>
      <Form.Item
        label="商品详情"
        name="detailImages"
        rules={[{ required: true, message: '请上传商品详情图片' }]}
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小2MB以内</dd>
            <dd>2.图片格式png/jpg/gif</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={10} accept="image/*" />
      </Form.Item>
      <Form.Item
        label="商品横幅"
        name="advImages"
        tooltip={
          <dl>
            <dt>图片要求</dt>
            <dd>1.图片大小500kb以内</dd>
            <dd>2.图片尺寸702*320px</dd>
            <dd>3.图片格式png/jpg/gif</dd>
            <dd>注：商品横幅用于VIP商品推广，非必填</dd>
          </dl>
        }
      >
        <Upload multiple maxCount={10} accept="image/*" />
      </Form.Item>
      <Form.Item
        label="商品视频"
        name="videoUrl"
        tooltip={
          <dl>
            <dt>视频要求</dt>
            <dd>1.视频大小20MB以内</dd>
            <dd>2.视频格式mp4</dd>
          </dl>
        }
      >
        <Upload maxCount={1} accept="video/mp4" />
      </Form.Item>
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