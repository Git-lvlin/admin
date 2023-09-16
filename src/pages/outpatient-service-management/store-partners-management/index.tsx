import { useState, useRef } from 'react'
import moment from 'moment'

import type { ProColumns, ActionType } from '@ant-design/pro-table'

import PageContainer from '@/components/PageContainer'
import ProTable from '@/components/pro-table'
import TimeSelect from '@/components/time-select'
import Export from '@/components/export'
import { shopPartnerPage } from '@/services/outpatient-service-management/store-partners-management'
import AddressCascader from '@/components/address-cascader'
import Update from './update'
import ImportHistory from '@/components/ImportFile/import-history'
import Import from '@/components/ImportFile/import'
import { Button } from 'antd'
import type { FormInstance } from 'antd'

const StorePartnersManagement: React.FC = () => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState()
  const [importVisit, setImportVisit] = useState<boolean>(false)
  const form = useRef<FormInstance>()
  const actRef = useRef<ActionType>()

  const columns: ProColumns[] = [
    {
      title: '合作商编号',
      dataIndex: 'houseFullName',
      align: 'center'
    },
    {
      title: '姓名',
      dataIndex: 'houseFullName',
      align: 'center'
    },
    {
      title: '服务商编号',
      dataIndex: 'areaProviderNo',
      hideInTable: true
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '下单用户ID',
      dataIndex: 'memberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人姓名', 
      dataIndex: 'contactName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系人手机号',
      dataIndex: 'contactPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合作商所在地',
      dataIndex: 'area',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '详细地址',
      dataIndex: 'area',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所在地',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => <AddressCascader changeOnSelect/>
    },
    {
      title: '订单金额(元)',
      dataIndex: 'payAmountYuan',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同签订时间',
      dataIndex: 'signTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签订时间',
      dataIndex: 'signTime',
      hideInTable: true,
      renderFormItem: () => <TimeSelect />
    },
    {
      title: '合同ID',
      dataIndex: 'contractId',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.contractUrl) {
          return <a href={r.contractUrl} target='_blank' referrerPolicy='no-referrer'>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '合同状态',
      dataIndex: 'contractStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '合同状态',
      dataIndex: 'contractStatus',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        1: '已签订',
        2: '未签订'
      }
    },
    {
      title: '所属服务商编号',
      dataIndex: 'areaProviderNo',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'inviterPhone',
      align: 'center' 
    },
    {
      title: '招募状态',
      dataIndex: 'recruitmentStatus',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '培训状态',
      dataIndex: 'trainingStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '培训状态',
      dataIndex: 'trainingStatus',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        1: '已培训',
        2: '未培训',
        3: '未录入'
      }
    },
    {
      title: '店铺编号',
      dataIndex: 'shopMemberAccount',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center', 
      render: (_, r) => <a onClick={()=> {setVisible(true); setData(r)}}>更新培训状态</a>
    },
  ]
  const getFieldValue2 = () => {
    const { area, signTime, ...rest }=form.current?.getFieldsValue()
    return {
      ...rest,
      provinceId: area && area?.[0].value,
      cityId: area && area?.[1].value,
      areaId: area && area?.[2].value,
      signTimeStart: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      signTimeEnd: signTime && moment(signTime?.[0]).format('YYYY-MM-DD HH:mm:ss')
    }
  }
  return (
    <PageContainer>
      <ProTable 
        rowKey='id'
        columns={columns}
        params={{}}
        actionRef={actRef}
        request={shopPartnerPage}
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom)=> [
            ...dom.reverse(),
            <Export 
              key='1'
              type=''
              conditions={{}}
            />
          ]
        }}
        toolBarRender={()=>[
          <Button key='allDele' type='primary'><a href='https://uat-yeahgo.oss-cn-shenzhen.aliyuncs.com/file/template/goods-provide-input.xlsx'>下单导入地址模板</a></Button>,
          <Import
           change={(e) => { 
            setImportVisit(e)
            actRef.current?.reload()
           }}
           key='import'
           code="goods-provide-input"
           conditions={getFieldValue2}
           title="导入地址"
          />,
          <ImportHistory key='importhist' show={importVisit} setShow={setImportVisit} type="goods-provide-input" />,
        ]}
        options={false}
      />
      {
        visible&&
        <Update
          visible={visible}
          setVisible={setVisible}
          data={data}
          callback={() => actRef.current?.reload()}
        />
      }
    </PageContainer>
  )
}

export default StorePartnersManagement