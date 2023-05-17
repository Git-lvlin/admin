import React, { useState, useEffect, useRef } from 'react'
import { PageContainer } from '@/components/PageContainer';
import ProTable from '@ant-design/pro-table'
import { ModalForm } from '@ant-design/pro-form'
import { ProFormTextArea } from '@ant-design/pro-form'
import { Space, message, Form, Button} from 'antd'
import { history } from 'umi'

import { amountTransform } from '@/utils/utils'
import { platforms, enabledDisabledSubmit, subtotal } from '@/services/financial-management/supplier-fund-management'
import styles from './styles.less'
import { Export, ExportHistory } from '@/pages/export-excel'
import Detailed from '../payment-details'
import Detail from '../details'

const MemberStoreFundManagement = () => {
  const actionRef = useRef()
  const formRef = Form.useForm()
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState({})
  const [data, setData] = useState({})
  const [visit, setVisit] = useState(false)
  const [detailedVisible, setDetailedVisible] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)
  const [query, setQuery] = useState(null)

  useEffect(()=> {
    subtotal({
      accountType: 'store',
      ...search,
      page,
      settleTimeBegin: search?.settleTime?.[0].format('YYYY-MM-DD'),
      settleTimeEnd: search?.settleTime?.[1].format('YYYY-MM-DD'),
      registTimeBegin: search?.registTime?.[0].format('YYYY-MM-DD'),
      registTimeEnd: search?.registTime?.[1].format('YYYY-MM-DD')
    }).then(res=> {
      if(res.success) {
        setTotal(res.data)
      }
    })
  }, [search])

  const skipToDetail = ({accountType, accountId}) => {
    setQuery({accountType, accountId})
    setDetailedVisible(true)
  }
  const toDetails = ({accountType, accountId}) => {
    setQuery({accountType, accountId})
    setDetailVisible(true)
  }
  const disable = data =>{
    return new Promise((resolve, reject) => {
      enabledDisabledSubmit({...data}).then(res=> {
        if(res?.success){
          resolve()
          actionRef.current.reload()
          message.success('操作成功')
        } else {
          reject()
        }
      })
    })
  }
  const restore = data => {
    enabledDisabledSubmit({...data}).then(res=> {
      if(res?.success){
        actionRef.current.reload()
        message.success('操作成功')
      }
    })
  }

  const getValues = (form) => {
    return {
      ...form?.getFieldValue(),
      accountType: "store",
      settleTimeBegin: form?.getFieldValue()?.settleTime?.[0].format('YYYY-MM-DD'),
      settleTimeEnd: form?.getFieldValue()?.settleTime?.[1].format('YYYY-MM-DD'),
      registTimeBegin: form?.getFieldValue()?.registTime?.[0].format('YYYY-MM-DD'),
      registTimeEnd: form?.getFieldValue()?.registTime?.[1].format('YYYY-MM-DD')
    }
  }

  const PopModal = props => {
    const {accountType, accountId} = props
    return(
      <ModalForm
        width={400}
        title="是否需要停用该账户？"
        layout="inline"
        trigger={
          <a>停用</a>
        }
        onFinish={async (values) => {
          await disable({accountType: accountType, accountId: accountId, isEnabled: 0, ...values})
          return true
        }}
      >
        <ProFormTextArea
          name="reason"
          label="禁用理由"
          rules={[{ required: true, message: '请输入禁用理由'}]}
          fieldProps={{
            showCount: true,
            maxLength:120
          }}
        />
      </ModalForm>
    )
  }

  const columns = [
    {
      title: '序号',
      dataIndex:'id',
      valueType: 'borderIndex',
      hideInSearch: true,
      valueType: 'indexBorder'
    },
    {
      title: '社区店ID',
      dataIndex: 'accountId'
    },
    {
      title: '账号类型',
      dataIndex: 'accountType',
      valueType: 'select',
      valueEnum: {
        'member': '会员',
        'store': '店主'
      }
    },
    {
      title: '虚拟子账户',
      dataIndex: 'sn'
    },
    {
      title: '注册手机',
      dataIndex: 'registMobile'
    },
    {
      title: '用户ID',
      dataIndex: 'memberId'
    },
    {
      title: '注册日期',
      dataIndex: 'registTime',
      hideInSearch: true
    },
    {
      title: '注册日期',
      dataIndex: 'registTime',
      hideInTable: true,
      valueType: 'dateRange'
    },
    {
      title: '货款',
      dataIndex: 'balance',
      hideInSearch: true,
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '佣金',
      dataIndex: 'commission',
      hideInSearch: true,
      render: (_) => `￥${amountTransform(_, '/')}`
    },
    {
      title: '账户名称',
      dataIndex: 'realname',
      hideInSearch: true
    },
    {
      title: '银行账户',
      dataIndex: 'cardNo',
      hideInSearch: true
    },
    {
      title: '所属银行',
      dataIndex: 'bankName',
      valueType: 'select',
      hideInSearch: true

    },
    {
      title: '入驻时间',
      dataIndex: 'settleTime',
      hideInSearch: true
    },
    {
      title: '入驻时间',
      dataIndex: 'settleTime',
      hideInTable: true,
      valueType: 'dateRange'
    },
    {
      title: '收支明细',
      dataIndex:'balancePay',
      hideInSearch: true,
      render: (_, records)=><a onClick={()=>{skipToDetail({accountType: records.accountType, accountId: records?.accountId})}}>明细</a>
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, records)=>(
        <Space size='large'>
          <a onClick={
              ()=>{
                toDetails({
                  accountType: records?.accountType,
                  accountId: records?.accountId
                })
              }
            }
          >
            详情
          </a>
            {
              records?.status === 'normal' ?
              <PopModal 
                accountType={records?.accountType}
                accountId={records?.accountId}
              />:
              <a 
                onClick={
                  ()=>{
                    restore({
                      isEnabled:1,
                      accountType: records?.accountType,
                      accountId: records?.accountId 
                    })
                  }
                }
              >
                恢复
              </a>
            }
        </Space>
      )
    }
  ]
  return (
    <PageContainer title={false}>
      <ProTable
        actionRef={actionRef}
        formRef={formRef}
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
          onChange: (e) => {
            setPage(e)
          }
        }}
        onSubmit={()=> {
          setSearch(formRef.current?.getFieldValue())
        }}
        scroll={{x: "max-content"}}
        postData={
          (e)=>{
            setData(e)
            return e
          }
        }
        rowKey='sn'
        toolBarRender={false}
        columns={columns}
        params={{accountTypes: ['store', 'member']}}
        request={platforms}
        search={{
          optionRender: ({searchText, resetText}, {form}) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit()
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields()
                form?.submit()
              }}
            >
              {resetText}
            </Button>,
            <Export
              change={(e)=> {setVisit(e)}}
              key="export"
              type="financial-account-page-store-export"
              conditions={() => getValues(form)}
            />,
            <ExportHistory
              key="exportHistory"
              show={visit}
              setShow={setVisit}
              type="financial-account-page-store-export"
            />
          ],
        }}
        tableRender={(_, dom) => (
          <>
            {dom}
            {
              data?.length !== 0 &&
              <div className={styles.summary}>
                账户余额总合计：
                <span>￥{amountTransform(Number(total.total),'/')}</span>
              </div>
            }
          </>
        )}
      />
      {
        detailedVisible &&
        <Detailed
          query={query}
          visible={detailedVisible}
          setVisible={setDetailedVisible}
          title='社区店'
        />
      }
      {
        detailVisible &&
        <Detail
          query={query}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
    </PageContainer>
  )
}

export default MemberStoreFundManagement