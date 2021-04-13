import React, { useState, useEffect } from 'react';
import { Upload as AntUpload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import upload from '@/utils/upload'

const Upload = (props) => {
  const { value, onChange, ...rest } = props;
  const [fileList, setFileList] = useState([])

  const beforeUpload = async (file) => {
    await upload(file, 'goods').then(res => {
      // eslint-disable-next-line no-param-reassign
      file.url = res
      return file;
    })
  }

  const uploadHandle = (e) => {
    onChange(e.fileList.map(item => item.url))
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
    }

  }, [])

  return (
    <AntUpload
      {...rest}
      listType="picture-card"
      onChange={uploadHandle}
      fileList={fileList}
      beforeUpload={beforeUpload}
    >
      <div>
        <UploadOutlined />
        <p>上传</p>
      </div>
    </AntUpload>
  )
}

export default Upload;
