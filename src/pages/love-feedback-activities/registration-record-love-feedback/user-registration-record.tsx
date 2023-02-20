import { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import { Image } from 'antd'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import { getApplyListByParams, getDonateUrl } from '@/services/love-feedback-activities/registration-record-love-feedback'
import { amountTransform } from '@/utils/utils'
import Export from '@/components/export'

const UserRegistrationRecord = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [imgUrl, setImgUrl] = useState<string>()
  const [url, setUrl] = useState<string>()
  const form = useRef<FormInstance>()

  useEffect(()=> {
    if(url) {
      getDonateUrl({
        url
      }).then(res=> {
        if(res.success) {
          setImgUrl(res.data)
        }
      })
    }
  }, [url])

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '捐赠时间',
      dataIndex: 'actTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '捐赠手机号',
      dataIndex: 'memberMobile',
      align: 'center',
      hideInSearch: true
    },
    {
      dataIndex: 'memberMobile',
      align: 'center',
      fieldProps: {
        placeholder: '请输入手机号'
      },
      hideInTable: true
    },
    {
      title: '付款银行卡号',
      dataIndex: 'bankNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '捐赠人姓名',
      dataIndex: 'memberName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '捐赠金额（元）',
      dataIndex: 'amount',
      align: 'center',
      hideInSearch: true,
      render: _ => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '捐赠凭证',
      dataIndex: 'certificateUrl',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => <a onClick={()=> {setVisible(true); setUrl(r.certificateUrl)}}>查看捐款凭证截图</a>
    },
    {
      title: '登记时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => moment(r.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        request={getApplyListByParams}
        params={{}}
        bordered
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={form}
        options={false}
        search={{
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              type='donate-apply'
              conditions={{...form.current?.getFieldsValue()}}
              key='export'
            />
          ]
        }}
      />
      <Image
        width={200}
        style={{ display: 'none' }}
        src={imgUrl}
        preview={{
          visible,
          src: imgUrl,
          onVisibleChange: (value) => {
            setVisible(value)
          },
        }}
      />
    </PageContainer>
  )
}

export default UserRegistrationRecord
