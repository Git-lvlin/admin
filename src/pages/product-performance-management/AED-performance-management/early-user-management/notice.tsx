import { useState, useRef, useEffect } from 'react'
import ProForm, { ModalForm, ProFormDateTimePicker, ProFormText } from '@ant-design/pro-form'
import { Button, Space, Checkbox, message } from 'antd'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'
import type { noticeProps } from './data'

import styles from './styles.less'
import { waitNoticeUser, smsNoticeUser } from '@/services/product-performance-management/early-user-management'
import AddressCascader from '@/components/address-cascader'

const Notice:React.FC<noticeProps> = ({ visible, setVisible, data, callback }) => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])
  const [checked, setChecked] = useState<boolean>(false)
  
  const form = useRef<FormInstance>()
  
  useEffect(()=> {
    form.current?.setFieldsValue({
      user: `${selectedKeys.length}名`
    })
  }, [selectedKeys])

  useEffect(()=> {
    if(data) {
      form.current?.setFieldsValue({
        name: data.signUser,
        phone: data?.signMemberPhone
      })
    }
  }, [data])
  
  const columns:ProColumns[] = [
    {
      title: '编号',
      dataIndex: 'subOrderSn',
      align: 'center'
    },
    {
      title: '报名人手机号',
      dataIndex: 'signMemberPhone',
      align: 'center'
    },
    {
      title: '报名时间',
      dataIndex: 'signTime',
      align: 'center'
    },
    {
      title: '通知状态',
      dataIndex: 'isNoticeDesc',
      align: 'center'
    }
  ]

  const submit = (value: any) => {
    const { noticeArea = []} = value
    return new Promise<void>((resolve, reject) => {
      if(checked) {
        smsNoticeUser({
          ...value,
          subOrderSn: !data ? selectedKeys : [data?.subOrderSn],
          noticeArea: noticeArea[0]?.label + noticeArea[1]?.label + noticeArea[2]?.label
        }, {
          showSuccess: true
        }).then(res => {
          if(res.code === 0) {
            callback()
            resolve()
          } else {
            reject()
          }
        })
      } else {
        message.error('请勾选并同意声明')
        reject()
      }
    })
  }
  
  return (
    <ModalForm
      title='通知采样 '
      layout='horizontal'
      labelCol={{span: 8}}
      wrapperCol={{span: 12}}
      width={data ? 600 : 800}
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={async(values)=> {
        await submit(values)
        return true
      }}
      formRef={form}
      modalProps={{
        destroyOnClose: true
      }}
      submitter={{
        render: (props) => {
          return [
            <div key='1' className={styles.footer}>
              <span>每天最多可操作通知2次，请确认清楚，谨慎操作。</span>
              <Space size='small'>
                <Button
                  onClick={() => setVisible(false)}
                >
                  取消
                </Button>
                <Button
                  type='primary'
                  onClick={() => {
                    props.submit()
                  }}
                >
                  确定
                </Button>
              </Space>
            </div>
          ]
        }
      }}
    >
      {
        data &&
        <ProFormText
          label='采样人姓名'
          name='name'
          readonly
        />
      }
      {
        data &&
        <ProFormText
          label='采样人手机'
          name='phone'
          readonly
        />
      }
      {
        !data &&
        <ProTable
          rowKey='subOrderSn'
          columns={columns}
          request={waitNoticeUser}
          pagination={{
            showQuickJumper: true, 
            pageSize: 5
          }}
          options={false}
          search={false}
          headerTitle='待采样列表'
          rowSelection={{
            selectedRowKeys: selectedKeys,
            preserveSelectedRowKeys: true,
            onChange: (e) => setSelectedKeys(e),
          }}
        />
      }
      {
        !data &&
        <ProFormText
          label='通知用户'
          name='user'
          readonly
        />
      }
      <ProFormDateTimePicker
        label='预约采样时间'
        name='noticeDate'
      />
      <ProForm.Item
        label='预约采样地址'
        name='noticeArea'
      >
        <AddressCascader/>
      </ProForm.Item>
      <ProFormText
        label='预约采样详细地址'
        name='noticeAddress'
        fieldProps={{
          placeholder: '请输入详细地址'
        }}
      />
      <Space size='small' className={styles.checkBox}>
        <Checkbox
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        <span>请确认已准备好足够的采样耗材工具包及相关服务</span>
      </Space>
    </ModalForm>
  )
}

export default Notice