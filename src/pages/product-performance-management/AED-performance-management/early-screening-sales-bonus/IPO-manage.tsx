import { useState, useRef } from 'react'
import { Button, Dropdown, Menu, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import type { ProColumns, ActionType } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { ipoManagerList, ipoApply, ipoNotice } from '@/services/product-performance-management/early-screening-sales-bonus'
import Log from './log'
import RewardDetails from './reward-details'
import Apply from './apply'
import ExamOrder from './exam-order'
import Export from '@/components/export'

const IPOManage: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>()
  const [logVisible, setLogVisible] = useState(false)
  const [rewardDetailsVisible, setRewardDetailsVisible] = useState(false)
  const [applyVisible, setApplyVisible] = useState(false)
  const [examOrderVisible, setExamOrderVisible] = useState(false)
  const [data, setData] = useState()
  const [id, setId] = useState<React.Key[] | undefined>(undefined)
  const acf = useRef<ActionType>()
  const form = useRef<FormInstance>()

  const apply = (r: any) => {
    return new Promise<void>((resolve, reject) => {
      ipoApply({ids: [r.id]}, {showSuccess: true}).then(res => {
        if(res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  const notice = (r: any) => {
    return new Promise<void>((resolve, reject) => {
      ipoNotice({ids: [r.id]}, {showSuccess: true}).then(res => {
        if(res.code === 0) {
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  const menu = (r: any) => {
    return (
      <Menu>
        <Menu.Item key='1' disabled={r.process !== 8}>
          <a
            onClick={async ()=> {
              await apply(r)
              acf.current?.reload()
            }}
          >
            申请IPO奖
          </a>
        </Menu.Item>
        <Menu.Item key='2' disabled={!(r.ipoStatus === 1)}>
          <a
            onClick={()=> {
              setRewardDetailsVisible(true)
              setData(r)
            }}
          >
            奖励详情
          </a>
        </Menu.Item>
        <Menu.Item key='3'>
          <a
            onClick={()=> {
              setLogVisible(true)
              setData(r)
            }}
          >
            操作日志
          </a>
        </Menu.Item>
        <Menu.Item key='4' disabled={r.process !== 32}>
          <a
            onClick={async ()=> {
              await notice(r)
              acf.current?.reload()
            }}
          >
            通知领奖
          </a>
        </Menu.Item>
      </Menu>
    )
  }

  const columns: ProColumns[] = [
    {
      title: '本页',
      align: 'left',
      hideInSearch: true
    },
    {
      title: 'IPO奖领取状态',
      dataIndex: 'ipoStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖领取状态',
      dataIndex: 'ipoStatus',
      valueType: 'select',
      valueEnum: {
        1: '已领取',
        0: '未领取'
      },
      hideInTable: true
    },
    {
      title: '状态',
      dataIndex: 'processDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'process',
      valueType: 'select',
      valueEnum: {
        1: '未合格',
        2: '待完成',
        4: '待到期',
        8: '待申请',
        16: '待审核',
        32: '待通知',
        64: '待领取',
        128: '已领取',
      },
      hideInTable: true
    },
    {
      title: '所属月份',
      dataIndex: 'months',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属月份',
      dataIndex: 'months',
      valueType: 'dateMonth',
      hideInTable: true
    },
    {
      title: '销售人用户ID',
      dataIndex: 'memberId',
      align: 'center'
    },
    {
      title: '销售人手机号码',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '支付单数',
      dataIndex: 'orderNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.orderNum && r.orderNum > 0) {
          return <a onClick={()=> {setExamOrderVisible(true); setData(r)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '完成单数',
      dataIndex: 'finishNum',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => {
        if(r.finishNum && r.finishNum > 0) {
          return <a onClick={()=> {setExamOrderVisible(true); setData(r)}}>{_}</a>
        } else {
          return <span>{_}</span>
        }
      }
    },
    {
      title: '完成人数',
      dataIndex: 'directNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司ID',
      dataIndex: 'subId',
      align: 'center'
    },
    {
      title: '所属子公司名称',
      dataIndex: 'subName',
      align: 'center'
    },
    {
      title: 'IPO奖实名人姓名',
      dataIndex: 'realName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖实名人身份证号',
      dataIndex: 'idCard',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖金额',
      dataIndex: 'amountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '审核时间',
      dataIndex: 'auditTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '通知时间',
      dataIndex: 'noticeTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖领取时间',
      dataIndex: 'ipoTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, r) => (
        <Dropdown overlay={() => menu(r)}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              管理
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )
    },
  ]

  return (
    <>
      <ProTable
        rowKey='id'
        columns={columns}
        request={ipoManagerList}
        params={{}}
        formRef={form}
        search={{
          labelWidth: 120,
          optionRender: (search, props, dom) => [
            ...dom.reverse(),
            <Export 
              type='ipoManagerListAdm'
              key='1'
              conditions={form.current?.getFieldsValue()}
            />
          ]
        }}
        actionRef={acf}
        toolBarRender={()=> [
          <Button 
            type='primary'
            key='1'
            onClick={
              ()=> {setApplyVisible(true); setId(selectedRowKeys?.length as number > 0 ? selectedRowKeys: undefined)}
            }
          >
            {selectedRowKeys?.length as number > 0 ? '申请已勾选额外奖励' : '申请全部额外奖励'}
          </Button>
        ]}
        options={false}
        scroll={{x: 'max-content'}}
        rowSelection={{
          getCheckboxProps: r => ({ disabled: r.process !== 8 }),
          selectedRowKeys,
          preserveSelectedRowKeys: true,
          onChange: _ => {
            setSelectedRowKeys(_)
          }
        }}
      />
      {
        logVisible &&
        <Log
          visible={logVisible}
          setVisible={setLogVisible}
          data={data}
        />
      }
      {
        rewardDetailsVisible &&
        <RewardDetails
          visible={rewardDetailsVisible}
          setVisible={setRewardDetailsVisible}
          data={data}
        />
      }
      {
        applyVisible &&
        <Apply
          visible={applyVisible}
          setVisible={setApplyVisible}
          id={id}
          callback={()=> {setSelectedRowKeys([]); acf.current?.reload()}}
          type='apply'
        />
      }
      {
        examOrderVisible &&
        <ExamOrder
          visible={examOrderVisible}
          setVisible={setExamOrderVisible}
          dataSource={data}
        />
      }
    </>
  )
}

export default IPOManage