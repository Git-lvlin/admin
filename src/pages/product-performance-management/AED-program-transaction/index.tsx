import { useState, useRef, useEffect } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'
import ProForm, { ProFormDependency, ProFormText } from '@ant-design/pro-form'
import { Button, Space } from 'antd'
import moment from 'moment'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'
import type { detailDataProps } from './data'

import { 
  aedCoursesTradeStats, 
  aedCoursesTradeStatsSave,
  aedCoursesTradeList 
} from '@/services/product-performance-management/AED-program-transaction'
import styles from './styles.less'
import { amountTransform ,numberTransform } from '@/utils/utils'
import Export, { ExportHistory } from '@/components/export'
import ExportLog from './export-log'

const AEDTable: React.FC<{search?: FormInstance<any> | any}> = ({search}) => {
  
  const [detailData, setDetailData] = useState<detailDataProps>()
  const [visible, setVisible] = useState<boolean>(false)
  const [exportVisible, setExportVisible] = useState<boolean>(false)
  const form = useRef<FormInstance>()

  useEffect(()=> {
    aedCoursesTradeStats().then(res => {
      if(res.code === 0) {
        setDetailData(res.data)
      }
    })
  }, [])

  useEffect(()=> {
    if(detailData) {
      form.current?.setFieldsValue({
        onlineDopSimpleNum: detailData?.onlineDopSimpleNum,
        onlineDopSimpleAmount: amountTransform(parseInt(detailData?.onlineDopSimpleAmount), '/'),
        onlineCourseNum: detailData?.onlineCourseNum,
        onlineCourseAmount: amountTransform(parseInt(detailData?.onlineCourseAmount), '/'),
        onlineDcNum: detailData?.onlineDcNum,
        onlineDcAmount: amountTransform(parseInt(detailData?.onlineDcAmount), '/'),
        onlineDopNum: detailData?.onlineDopNum,
        onlineDopMustNoNum: detailData?.onlineDopMustNoNum,
        onlineDopNoNum: detailData?.onlineDopNoNum,
        onlineContractNum: detailData?.onlineContractNum,
        noSignContractNum: detailData?.noSignContractNum,
      })
    }
  }, [detailData])

  const orderNum1 = [
    {name: 'onlineDopSimpleNum', type: true},
    {name: 'offlineDopSimpleNum', type: false},
    {name: 'onlineCourseNum', type: true},
    {name: 'offlineCourseNum', type: false},
    {name: 'onlineDcNum', type: true}, 
    {name: 'offlineDcNum', type: false}, 
  ]

  const orderNum2 = [
    {name: 'onlineDopNum', type: true},
    {name: 'offlineDopNum', type: true},
    {name: 'onlineDopMustNoNum', type: true},
    {name: 'offlineDopMustNoNum', type: false},
    {name: 'onlineDopNoNum', type: true},
    {name: 'offlineDopNoNum', type: false},
    {name: 'offlineContractNum', type: false},
    {name: 'onlineContractNum', type: true}
  ]
  const subTotal = [
    {name: 'onlineDopAmount', type: true},
    {name: 'offlineDopAmount', type: true},
    {name: 'onlineDopMustNoAmount', type: true},
    {name: 'offlineDopMustNoAmount', type: true},
    {name: 'onlineDopNoAmount', type: true},
    {name: 'offlineDopNoAmount', type: true},
    {name: 'offlineContractAmount', type: true},
    {name: 'onlineContractAmount', type: true},
    {name: 'signContractAmount', type: true},
    {name: 'noSignContractAmount', type: true},
  ]
  const totalAmount = [
    {name: 'courseTotal', type: true},
    {name: 'onlineDopTotal', type: true},
    {name: 'offlineDopTotal', type: true},
    {name: 'onlineDopMustNoTotal', type: true},
    {name: 'offlineDopMustNoTotal', type: true},
    {name: 'onlineDopNoTotal', type: true},
    {name: 'offlineDopNoTotal', type: true},
    {name: 'offlineContractTotal', type: true},
    {name: 'onlineContractTotal', type: true},
    {name: 'signContractTotal', type: true},
    {name: 'noSignContractTotal', type: true},
  ]

  const submit = (type: number) => {
    const {onlineDopSimpleAmount, onlineCourseAmount, offlineCourseAmount, onlineDcAmount, ...rest} = form.current?.getFieldsValue()
    const { depositPayTime, aedPayTime, dcPayTime, ...r } = search
    return new Promise<void>((_resolve, _reject) => {
      aedCoursesTradeStatsSave({
        ...rest,
        onlineDopSimpleAmount: amountTransform(onlineDopSimpleAmount, '*'),
        onlineCourseAmount: amountTransform(onlineCourseAmount, '*'),
        offlineCourseAmount: amountTransform(offlineCourseAmount, '*'),
        onlineDcAmount: amountTransform(onlineDcAmount, '*'),
        exportType: type,
        scope: {
          startDcPayTime: dcPayTime && moment(dcPayTime[0]).format('YYYY-MM-DD'),
          endDcPayTime: dcPayTime && moment(dcPayTime[1]).format('YYYY-MM-DD'),
          startAedPayTime: aedPayTime && moment(aedPayTime[0]).format('YYYY-MM-DD'),
          endAedPayTime: aedPayTime && moment(aedPayTime[1]).format('YYYY-MM-DD'),
          startDepositPayTime: depositPayTime && moment(depositPayTime[0]).format('YYYY-MM-DD'),
          endDepositPayTime: depositPayTime && moment(depositPayTime[1]).format('YYYY-MM-DD'),
          ...r
        }
      }, 
      {showSuccess: true}).then(res => {
        if(res.code === 0) {
          if(type === 2) setVisible(true)
          _resolve()
        } else {
          _reject()
        }
      })
    })
  }

  return (
    <div className={styles.mTable}>
      <ProForm
        layout='vertical'
        formRef={form}
        submitter={{
          render: () => [
            <Space size='middle' className={styles.mTableSave}>
              <Button type='primary' onClick={()=> {submit(1)}} key="submit">
                确认保存
              </Button>
              <Button type='primary' onClick={()=> {submit(2)}} key="export">
                确认保存并导出
              </Button>
              <ExportHistory
                key='exportHistory'
                show={visible}
                setShow={setVisible}
                type='exportAedStats'
              />
            </Space>
          ]
        }}
      >
        <Space>
          <div>明细汇总说明：线上订单汇总统计数据根据筛选结果得来，与下面明细数据的合计一致；线下订单数据由管理员手工编辑录入，查询后线下数据置0。</div>
          <a onClick={()=>{setExportVisible(true)}}>查看历史录入记录</a>
        </Space>
        <h2>AED销售明细汇总</h2>
        <table>
          <thead>
            <tr>
              <th>业务项</th>
              <th colSpan={2}>单独SPU保证金</th>
              <th colSpan={5 }>销售课程数</th>
              <th colSpan={6 }>课程的保证金</th>
              <th colSpan={4}>保证金的合同：合同签署情况</th>
            </tr> 
          </thead>
          <tbody>
            <tr>
              <th>订单项</th>
              <th>线上已交10000元保证金订单</th>
              <th>线下已交10000元保证金订单</th>
              <th>线上 5&3800&13800&14300&4300订单</th>
              <th>线下 5&3800&13800&14300&4300订单</th>
              <th>线上4800区县订单</th>
              <th>线下4800区县订单</th>
              <th>课程订单总计</th>
              <th>线上已交保证金订单</th>
              <th>线下已交保证金订单</th>
              <th>线上需交未交保证金订单</th>
              <th>线下需交未交保证金订单</th>
              <th>线上无需交保证金订单</th>
              <th>线下无需交保证金订单</th>
              <th>线下已签纸质合同数</th>
              <th>线上已签电子合同数</th>
              <th>已签合同数</th>
              <th>未签合同数 </th>
            </tr>
            <tr>
              <th>订单数量</th>
              {
                orderNum1.map(res => (
                  <td key={res.name}>
                    <ProFormText 
                      name={res.name} 
                      fieldProps={{
                        bordered: false,
                        allowClear: false
                      }}
                      readonly={res.type}
                    />
                  </td>
                ))
              }
              <td>
                <ProFormDependency name={['onlineCourseNum', 'offlineCourseNum', 'onlineDcNum', 'offlineDcNum']}>
                  {
                    ({onlineCourseNum, offlineCourseNum, onlineDcNum, offlineDcNum}) => (
                      <div>{numberTransform(onlineCourseNum) + numberTransform(offlineCourseNum) + numberTransform(onlineDcNum) + numberTransform(offlineDcNum)}</div>
                    )
                  }
                </ProFormDependency>
              </td>
              {
                orderNum2.map(res => (
                  <td key={res.name}>
                    <ProFormText 
                      name={res.name} 
                      fieldProps={{
                        bordered: false,
                        allowClear: false
                      }}
                      readonly={res.type}
                    />
                  </td>
                ))
              }
              <td>
                <ProFormDependency name={['offlineContractNum', 'onlineContractNum']}>
                  {
                    ({offlineContractNum, onlineContractNum}) => (
                      <div>{numberTransform(offlineContractNum) + numberTransform(onlineContractNum)}</div>
                    )
                  }
                </ProFormDependency>
              </td>
              <td>
                <ProFormText 
                  name='noSignContractNum'
                  readonly
                />
              </td>
            </tr>
            <tr>
              <th>小计金额</th>
              <td>
                <ProFormText 
                  name='onlineDopSimpleAmount'
                  readonly
                />
              </td>
              <td>
                <ProFormDependency name={['offlineDopSimpleNum']}>
                  {
                    ({offlineDopSimpleNum}) => <div>{offlineDopSimpleNum ? offlineDopSimpleNum * 10000 : '-'}</div>
                  }
                </ProFormDependency>
              </td>
              <td>
                <ProFormText 
                  name='onlineCourseAmount'
                  readonly
                />
              </td>
              <td>
                <ProFormText
                  name='offlineCourseAmount'
                  fieldProps={{
                    bordered: false,
                    allowClear: false
                  }}
                />
              </td>
              <td>
                <ProFormText 
                  name='onlineDcAmount'
                  readonly
                />
              </td>
              <td>
                <ProFormDependency name={['offlineDcNum']}>
                  {
                    ({offlineDcNum}) => (
                      <div>{offlineDcNum ? offlineDcNum * 4800 : '-'}</div>
                    )
                  }
                </ProFormDependency>
              </td>
              <td>
                <ProFormDependency name={['onlineCourseAmount', 'offlineCourseAmount', 'onlineDcAmount', 'offlineDcNum']}>
                  {
                    ({onlineCourseAmount, offlineCourseAmount, onlineDcAmount, offlineDcNum}) => (
                      <div>{numberTransform(onlineCourseAmount) + numberTransform(offlineCourseAmount) + numberTransform(onlineDcAmount) + (numberTransform(offlineDcNum) *4800)}</div>
                    )
                  }
                </ProFormDependency>
              </td>
              {
                subTotal.map(res => (
                  <td key={res.name}>
                    <ProFormText 
                      name={res.name} 
                      fieldProps={{
                        bordered: false,
                        allowClear: false
                      }}
                      readonly={res.type}
                    />
                  </td>
                ))
              }
            </tr>
            <tr>
              <th>总计金额</th>
              <td colSpan={6}>
                <ProFormDependency name={['onlineDopSimpleAmount', 'offlineDopSimpleNum', 'onlineCourseAmount', 'offlineCourseAmount', 'onlineDcAmount', 'offlineDcNum']}>
                  {
                    ({onlineDopSimpleAmount, offlineDopSimpleNum, onlineCourseAmount, offlineCourseAmount, onlineDcAmount, offlineDcNum}) => (
                      <div>{ numberTransform(onlineDopSimpleAmount) + numberTransform(offlineDopSimpleNum * 10000) + numberTransform(onlineCourseAmount) + numberTransform(offlineCourseAmount) + numberTransform(offlineDcNum * 4800) + numberTransform(onlineDcAmount)}</div>
                    )
                  }
                </ProFormDependency>
              </td>
              {
                totalAmount.map(res => (
                  <td key={res.name}>
                    <ProFormText 
                      name={res.name}
                      fieldProps={{
                        bordered: false,
                        allowClear: false
                      }}
                      readonly={res.type}
                    />
                  </td>
                ))
              }
            </tr>
          </tbody>
        </table>
      </ProForm>
      <div>线上订单数据明细</div>
      {
        exportVisible &&
        <ExportLog 
          visible={exportVisible}
          setVisible={setExportVisible}
        />
      }
    </div>
  )
}

const AEDProgramTransaction: React.FC = () => {
  const [searchConfig, setSearchConfig] = useState<FormInstance>()
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { depositPayTime, aedPayTime, dcPayTime, ...rest } = form.current?.getFieldsValue()
    return {
      startDcPayTime: dcPayTime && moment(dcPayTime[0]).format('YYYY-MM-DD'),
      endDcPayTime: dcPayTime && moment(dcPayTime[1]).format('YYYY-MM-DD'),
      startAedPayTime: aedPayTime && moment(aedPayTime[0]).format('YYYY-MM-DD'),
      endAedPayTime: aedPayTime && moment(aedPayTime[1]).format('YYYY-MM-DD'),
      startDepositPayTime: depositPayTime && moment(depositPayTime[0]).format('YYYY-MM-DD'),
      endDepositPayTime: depositPayTime && moment(depositPayTime[1]).format('YYYY-MM-DD'),
      ...rest
    }
  }

  const columns: ProColumns[] = [
    {
      title: '下单人用户ID',
      dataIndex: 'memberId',
      align: 'center'
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center'
    },
    {
      title: '收货人姓名',
      dataIndex: 'receiveName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货电话',
      dataIndex: 'receivePhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人用户ID',
      dataIndex: 'recomMemberId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人手机号',
      dataIndex: 'recomMemberPhone',
      hideInTable: true
    },
    {
      title: '团长ID',
      dataIndex: 'teamId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长手机号',
      dataIndex: 'teamPhone',
      align: 'center'
    },
    {
      title: '所属子公司类型',
      dataIndex: 'subTypeDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '子公司类型',
      dataIndex: 'subType',
      valueType: 'select',
      valueEnum: {
        1: '子公司',
        2: '非子公司'
      },
      hideInTable: true
    },
    {
      title: '所属子公司名称',
      dataIndex: 'subName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '保证金订单号',
      dataIndex: 'depositOrderSn',
      align: 'center'
    },
     {
      title: '保证金订单金额',
      dataIndex: 'depositAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(r.depositAmount, '/')
    }, 
    {
      title: '保证金订单支付时间',
      dataIndex: 'depositPayTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '保证金订单支付时间',
      dataIndex: 'depositPayTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '已下保证金单状态',
      dataIndex: 'depositStatus',
      valueType: 'select',
      valueEnum: {
        1: '已下保证金订单',
        2: '未下保证金订单'
      },
      hideInTable: true
    },
    {
      title: '培训课程订单号',
      dataIndex: 'aedOrderSn',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '课程订单号', 
      dataIndex: 'aedOrderSn',
      hideInTable: true
    },
    {
      title: '培训课程订单金额',
      dataIndex: 'aedAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(r.aedAmount, '/')
    },
    {
      title: '培训课程订单支付时间 ',
      dataIndex: 'aedPayTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '课程订单支付时间 ',
      dataIndex: 'aedPayTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '签法大大合同状态',
      dataIndex: 'contractStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签合同状态',
      dataIndex: 'contractStatus',
      valueType: 'select',
      valueEnum: {
        1: '已签订',
        2: '未签订'
      },
      hideInTable: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: 'learnStatus',
      valueType: 'select',
      valueEnum: {
        1: '已学习',
        2: '未学习'
      },
      hideInTable: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '考试状态',
      dataIndex: 'examStatus',
      valueType: 'select',
      valueEnum: {
        1: '已通过',
        2: '未通过',
        3: '未考试'
      },
      hideInTable: true
    },
    {
      title: '线下培训状态',
      dataIndex: 'examStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '培训课程订单业绩解冻状态',
      dataIndex: 'freezeStatusDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '单业绩解冻状态',
      dataIndex: 'freezeStatus',
      valueType: 'select',
      valueEnum: {
        1: '已解冻',
        2: '未解冻'
      },
      hideInTable: true
    },
    {
      title: '区县课程订单号',
      dataIndex: 'dcOrderSn',
      align: 'center'
    },
    {
      title: '区县课程订单金额',
      dataIndex: 'dcAmount',
      align: 'center',
      hideInSearch: true,
      render: (_, r) => amountTransform(r.dcAmount, '/')
    },
    {
      title: '区县课程订单数量',
      dataIndex: 'dcOrderNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '区县课程订单最近支付时间',
      dataIndex: 'dcPayTime',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '区县订单支付时间',
      dataIndex: 'dcPayTime',
      valueType: 'dateRange',
      hideInTable: true
    },
    {
      title: '收货省份',
      dataIndex: 'receiveProvince',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货城市',
      dataIndex: 'receiveCity',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <ProTable
        rowKey='id'
        columns={columns}
        options={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        formRef={form}
        headerTitle={<AEDTable search={searchConfig}/>}
        params={{}} 
        onSubmit={()=>{
          setSearchConfig(form.current?.getFieldsValue())
        }}
        onReset={()=> {
          setSearchConfig(undefined)
        }}
        request={aedCoursesTradeList}
        search={{
          labelWidth: 140,
          optionRender: (_search, _props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='aedCoursesTradeList'
              conditions={getFieldsValue}
            />
          ]
        }}
        scroll={{x: 'max-content'}}
      />
    </PageContainer>
  )
}

export default AEDProgramTransaction