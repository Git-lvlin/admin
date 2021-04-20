import React, { useState, useEffect } from 'react';
import { Upload as AntUpload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import upload from '@/utils/upload'

const Upload = (props) => {
  const { value, onChange, dirName = 'goods', ...rest } = props;
  const [fileList, setFileList] = useState([])

  const beforeUpload = async (file) => {
    await upload(file, dirName).then(res => {
      // eslint-disable-next-line no-param-reassign
      file.url = res
      return file;
    })
  }

  const uploadHandle = (e) => {
    onChange(rest.maxCount === 1 ? e?.fileList?.[0]?.url : e.fileList.map(item => item.url))
    setFileList(e.fileList)
  }

  useEffect(() => {
    if (Array.isArray(value)) {
      setFileList(value.map(item => {
        return {
          url: item.url,
          uid: item.uid
        }
      }))
      onChange(rest.maxCount === 1 ? value?.[0]?.url : value.map(item => item.url))
    } else if (value) {
      setFileList([{
        url: value,
        uid: 0
      }])
      onChange(value)
    }

  }, [])

  return (
    <AntUpload
      listType="picture-card"
      onChange={uploadHandle}
      fileList={fileList}
      beforeUpload={beforeUpload}
      {...rest}
    >
      {
        fileList.length < rest.maxCount
        &&
        <div>
          <UploadOutlined />
          <p>上传</p>
        </div>
      }
    </AntUpload>
  )
}

export default Upload;
