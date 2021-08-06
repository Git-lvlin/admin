import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import ProCard from '@ant-design/pro-card';
import { contentVersionList } from '@/services/cms/member/member';
const ContentVersionTab = ({setVerifyVersionId}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    contentVersionList()
      .then(res => {
        setData(res.data)
      })
    return () => {
      setData([])
    }
  }, [])

  const setId = (id) => {
    return setVerifyVersionId(id)
  }

  return (
    data.length?<ProCard>
      {
        data.map((item, index) => {
          return <Button key={index} onClick={() => setId(item.id)}>{item.title}</Button>
        })
      }
    </ProCard>:''
  )
}

export default ContentVersionTab;