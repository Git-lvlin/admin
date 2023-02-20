import ProForm, { ModalForm } from '@ant-design/pro-form'
import {
  Button,
  message
} from 'antd'

import Upload from '../upload'
import { createImportTask } from '@/services/import-file/import-file'

const Import = ({ code, change, operatorSource = 2, show, url = '', title = '导入' }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const uploadExcel = (v) => {
    createImportTask({
      code,
      ...v,
      param: JSON.stringify({ operatorSource, operatorId: user.id, operatorName: user.username })
    }).then(res => {
      if (res.success) {
        message.success("表格导入成功")
        change(true)
      }
    })
  }

  return (
    <ModalForm
      title="表导入"
      trigger={
        <Button type="primary">{title}</Button>
      }
      width={500}
      submitter={{
        searchConfig: {
          submitText: '确认',
          resetText: '取消'
        }
      }}
      modalProps={{
        destroyOnClose: true
      }}
      onFinish={async (values) => {
        await uploadExcel(values)
        return true
      }}
      layout="inline"
    >
      {
        show&&
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ProForm.Item
            name="template"
            label="导入模板"
          >
            <a href={url}>点击下载导入模板</a>
          </ProForm.Item>
        </div>
      }
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ProForm.Item
          name="fileUrl"
          label="表单导入"
        >
          <Upload
            maxCount={1}
            code={206}
            accept=".xlsx,.xls"
          />
        </ProForm.Item>
      </div>
    </ModalForm>
  )
}

export default Import
