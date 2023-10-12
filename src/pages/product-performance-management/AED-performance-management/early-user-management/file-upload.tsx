import { useState, useRef } from 'react'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'

import type { UploadProps } from 'antd'

import upload from '@/utils/upload'

const FileUpload: React.FC<any> = ({value, onChange, code, text = '上传', ...rest}) => {
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<any[]>([])
  const fileData = useRef<any[]>([])

  const customRequest = ({ file }: any) => {
    setLoading(true)
    upload(file, code)
      .then(res => {
        let arr = [...fileData.current]
        arr.push({
          ...file,
          name: file.name,
          url: res
        })
        fileData.current = arr
        setFileList(fileData.current)
        onChange(fileData.current)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  

  const onRemove = (file: any) => {
    fileData.current = fileList.filter(item => item.url !== file.url)
    setFileList(fileData.current)
    onChange(fileData.current.map(item => item.url))
    return true
  }


  const props: UploadProps = {
    customRequest: customRequest,
    onRemove: onRemove,
    ...rest
  }
  
  return (
    <Upload {...props} fileList={fileList}>
      <Button>
        {loading ? <LoadingOutlined /> : <UploadOutlined />}
        <span>{text}</span>
      </Button>
    </Upload>
  )
}

export default FileUpload