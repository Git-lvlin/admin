import { useEffect, useRef, useState } from 'react'
import ProForm, { 
  DrawerForm,
} from "@ant-design/pro-form"

import type { FC } from 'react'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { saveAedUserInfo } from '@/services/user-management/AED-volunteer-ID-info'
import RangeNumberInput from '@/components/range-number-input'
import type { ProColumns } from '@ant-design/pro-table'
import Export from '@/components/export'
import moment from 'moment'

type editProps = {
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    msgId?: string;
    callback: () => void,
    activeKey: string;
  }

const Edit: FC<editProps> = ({visible, setVisible, msgId, callback, activeKey}) => {
  const [imgVisible, setImgVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {

  }, [])

  const submit = (values: any) => {
    return new Promise<void>((resolve, reject) => {
      saveAedUserInfo(values, {showSuccess: true}).then(res => {
        if(res.code === 0) {
          callback()
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  const getFieldsValue = () => {
    const { serviceArea, signTime, ...rest } = form.current?.getFieldsValue()
    return {
      ...rest,
      signStartTime: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signEndTime: signTime && moment(signTime?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      provinceId: serviceArea && serviceArea?.[0].value,
      cityId: serviceArea && serviceArea?.[1].value,
      areaId: serviceArea && serviceArea?.[2].value,
    }
  }

  const columns: ProColumns[] = [
    {
      title: '序号',
      dataIndex: 'sort',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '领取时间',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true,
      hideInTable: activeKey=='2'
    },
    {
      title: '所属月份',
      dataIndex: 'month',
      align: 'center',
      hideInTable: true,
      hideInSearch: activeKey=='1',
      valueType: 'dateTime'
    },
    {
      title: '所属月份',
      dataIndex: 'month',
      align: 'center',
      hideInSearch: true,
      hideInTable: activeKey=='1',
    },
    {
      title: 'IPO奖金额(元)',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖金额',
      dataIndex: 'memberId',
      align: 'center',
      renderFormItem: () => <RangeNumberInput beforePlaceholder='最低金额' afterPlaceholder='最高金额'/>,
      hideInTable: true
    },
  ]

  return (
    <DrawerForm
      title='首页/产品业绩管理/AED业绩管理/大健康IPO额外奖领取统计/大健康IPO额外奖领取统计明细'
      visible={visible}
      onVisibleChange={setVisible}
      layout='horizontal'
      width={1000}
      labelCol={{span: 6}}
      formRef={form}
      submitter={{
        render: (props, defaultDoms) => {
            return [];
        },
        }}
    >
    <ProTable
        headerTitle={`领取人用户ID：26    领取人手机号码：15098766676    领取IPO奖明细`}
        columns={columns}
        options={false}
        params={{}}
        formRef={form}
        // request={providerList}
        search={{
        //   labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export
              key='1'
              type='providerList'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </DrawerForm>
  )
}

export default Edit
