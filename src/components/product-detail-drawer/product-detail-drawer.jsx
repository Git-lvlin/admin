import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import ProductDetail from '@/components/product-detail'
import * as api from '@/services/product-management/product-list';

export default (props) => {
  const { visible, setVisible, spuId } = props;
  const [data, setData] = useState(null)

  const getDetail = (id) => {
    api.getDetail({
      spuId: id
    }).then(res => {
      if (res.code === 0) {
        setData({
          ...res.data,
          settleType: 2,
        });
      }
    })
  }

  useEffect(() => {
    getDetail(spuId)
  }, [])

  return (
    <>
      {
        data && <Drawer
          width={1200}
          visible={visible}
          title="商品详情"
          onClose={() => { setVisible(false) }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => { setVisible(false) }} style={{ marginRight: 8 }}>
                返回
              </Button>
            </div>
          }
        >
          <ProductDetail detailData={data} />
        </Drawer>
      }
    </>

  );
};