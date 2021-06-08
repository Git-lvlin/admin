import React, { useState, useEffect, useRef } from 'react';
import { Upload as AntUpload, message } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { getImageSize } from '@/utils/utils';
import upload from '@/utils/upload'

const Upload = (props) => {
  const { value, onChange, dirName = 'goods', maxCount = 1, size, dimension, ...rest } = props;
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)
  const fileData = useRef([]);

  const beforeUpload = async (file) => {
    if (size && file.size / 1024 > size) {
      message.error('上传图片的大小不符合要求')
      return false;
    }
    if (dimension) {
      const { width, height } = await getImageSize(file);

      if (typeof dimension === 'string' && width !== height) {
        message.error('上传图片的尺寸不符合要求')
        return false;
      }

      if (typeof dimension === 'object' && (width !== dimension.width || height !== dimension.height)) {
        message.error('上传图片的尺寸不符合要求')
        return false;
      }
    }
    return true;
  }

  const onRemove = (file) => {
    fileData.current = fileList.filter(item => item.url !== file.url)
    setFileList(fileData.current);
    onChange(maxCount === 1 ? fileData.current?.[0]?.url : fileData.current.map(item => item.url))
    return true;
  }

  const customRequest = ({ file }) => {
    setLoading(true);
    upload(file, dirName)
      .then(res => {
        const arr = [...fileData.current];
        arr.push({
          ...file,
          url: res,
        })
        fileData.current = arr;
        setFileList(fileData.current);
        onChange(maxCount === 1 ? res : arr.map(item => item.url))
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (!fileList.length) {
      if (Array.isArray(value) && value?.length) {
        fileData.current = value.map((item, index) => {
          return {
            url: item,
            uid: index
          }
        })
        setFileList(fileData.current)
        onChange(maxCount === 1 ? value?.[0]?.url : value.map(item => item))
      } else if (value && typeof value === 'string') {
        fileData.current = [{
          url: value,
          uid: 0
        }]
        setFileList(fileData.current)
        onChange(value)
      }
    }
  }, [value])

  return (
    <AntUpload
      listType="picture-card"
      fileList={fileList}
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      onRemove={onRemove}
      {...rest}
    >
      {
        fileList.length < maxCount
        &&
        <div>
          {loading ? <LoadingOutlined /> : <UploadOutlined />}
          <p>上传</p>
        </div>
      }
    </AntUpload>
  )
}

export default Upload;
