import React, { useState, useEffect } from 'react';
import { Upload as AntUpload, message } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { getImageSize } from '@/utils/utils';
import upload from '@/utils/upload'

const Upload = (props) => {
  const { value, onChange, dirName = 'goods', maxCount, size, dimension, ...rest } = props;
  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)

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
    // return await upload(file, dirName).then(res => {
    //   // eslint-disable-next-line no-param-reassign
    //   file.url = res
    // })
    return true;
  }

  const onRemove = (file) => {
    setFileList(fileList.filter(item => item.url !== file.url));
    return true;
  }

  const customRequest = ({ file }) => {
    setLoading(true);
    upload(file, dirName)
      .then(res => {
        const arr = [...fileList];
        arr.push({
          ...file,
          url: res,
        })
        setFileList(arr);
        onChange(maxCount === 1 ? res : arr.map(item => item.url))
      })
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (Array.isArray(value)) {
      setFileList(value.map(item => {
        return {
          url: item.url,
          uid: item.uid
        }
      }))
      onChange(maxCount === 1 ? value?.[0]?.url : value.map(item => item.url))
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
