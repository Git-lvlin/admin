import React, { useState } from 'react';
import { Button } from 'antd';
import {
  DrawerForm,
} from '@ant-design/pro-form';
import ProductDetail from '@/components/product-detail'
import Overrule from './overrule';

export default (props) => {
  const { visible, setVisible, detailData, check, overrule } = props;
  const [overruleVisible, setOverruleVisible] = useState(false);
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

  return (
    <DrawerForm
      title="商品审核"
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1200,
      }}
      submitter={{
        render: () => {
          return [
            <Button key="1" type="primary" onClick={() => { check(1, 1, detailData.spuId) }}>
              通过并上架
            </Button>,
            <Button key="2" onClick={() => { check(2, 1, detailData.spuId) }}>
              通过但不上架
            </Button>,
            <Button type="primary" key="3" danger onClick={() => { setOverruleVisible(true) }}>
              驳回
            </Button>,
            <Button key="4" onClick={() => { setVisible(false) }}>
              返回
            </Button>,
          ];
        },
      }}
      visible={visible}
      {...formItemLayout}
    >
      <ProductDetail detailData={detailData} />
      {overruleVisible && <Overrule
        visible={overruleVisible}
        setVisible={setOverruleVisible}
        callback={(text) => { overrule(3, 2, detailData.spuId, text) }}
      />}
    </DrawerForm>
  );
};