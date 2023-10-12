import ProForm,{ ModalForm } from '@ant-design/pro-form'
import Upload from './file-upload'
import { batchReport } from '@/services/product-performance-management/early-user-management'
import styles from './styles.less'

const UploadInspectionReport: React.FC<any> = ({callback, visible, setVisible}) => {

  const submit = (v: any) => {
    return new Promise<void>((resolve, reject) => {
      const arr: string[] = []
      v.list.map((res: {url: string}) => {
        arr.push(res.url)
      })
      batchReport({
        list: arr
      }).then(res => {
        if(res.code === 0) {
          resolve()
          callback(`共上传${res.data.success + res.data.fail}个文件，其中成功${res.data.success}个，失败${res.data.fail}个`)
        } else {
          reject('上传失败')
        }
      })
    })
  }

  return (
    <ModalForm
      title='上传检测报告'
      visible={visible}
      onVisibleChange={setVisible}
      width={500}
      labelCol={{span: 8}}
      onFinish={async (v)=> {
        await submit(v)
        return true
      }}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
    >
      <div className={styles.timelineWarp}>
        <ProForm.Item
          label='上传'
          name='list'
          extra='最多可上传30个文件'
        >
          <Upload 
            multiple
            maxCount='30' 
            accept='.pdf' 
            code={ 309 }
          />
        </ProForm.Item>
      </div>
    </ModalForm>
  )
}

export default UploadInspectionReport