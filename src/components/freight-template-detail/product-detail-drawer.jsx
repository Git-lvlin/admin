import React, { useState, useEffect } from 'react';
import Form from '@/pages/product-management/freight-template/form'
import { postageDetail } from '@/services/product-management/freight-template';

export default (props) => {
  const { setVisible, id } = props;
  const [data, setData] = useState(null)

  const getDetail = () => {
    postageDetail({
      id,
    }).then(res => {
      if (res.code === 0) {
        setData({
          ...res.data,
          view: true
        });
      }
    })
  }

  useEffect(() => {
    getDetail()
  }, [])

  return (
    <>
      {
        data && <Form
          visible
          setVisible={setVisible}
          onClose={() => { setVisible(false) }}
          detailData={data}
          callback={() => { setVisible(false) }}
        />
      }
    </>

  );
};