import { ModalForm } from '@ant-design/pro-form'
import { Row, Col, Space, Divider, Tooltip, message } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'

import ProTable from '@/components/pro-table'
import { amountTransform } from '@/utils/utils'
import { saveConfig } from '@/services/transaction-sharing-management/allocation-management'

type previewProps = {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  data?: any,
  callback: () => void
  tableCallback: () => void
  selectData: any
}

const Preview:React.FC<previewProps> = ({visible, setVisible, data, callback, tableCallback, selectData}) => {

  const submit = () => {
    return new Promise<void>((resolve, reject) => {
      if(data?.goods.length > 0) {
        if(data?.platformLeastFee >= 0) {   
          saveConfig(data, {showSuccess: true}).then(res => {
            if(res.code === 0) {
              callback()
              tableCallback()
              resolve()
            } else {
              reject('提交失败')
            }
          })
        } else {
          message.error('平台最少结余金额不能为负数')
          reject('平台最少结余金额不能为负数')
        }
      } else {
        message.error('请选择分成商品')
        reject('请选择分成商品')
      }
    })
  }
  
  const roleCode = (code: string) => {
    const arr = selectData?.find((res: {roleCode: string}) => res?.roleCode === code)
    return arr?.roleName
  }
  
  const valueDesc = (code: string, type: string, value: string, text = 'name') => {
    
    const arr = selectData?.find((res: {roleCode: string}) => res?.roleCode === code)
    const arr1 = arr?.[type]?.find((res: {code: string})=> res?.code == value)
    return arr1?.[text]
  }

  const columns:ProColumns[] = [
    {
      title: '分成角色',
      dataIndex: 'roleCode',
      align: 'center',
      render: (_, r) => {
        return roleCode(r.roleCode)
      }
    },
    {
      title: '分成金额（元）',
      dataIndex: 'billVal',
      align: 'center',
      hideInTable: data?.billType == 1,
      render: (_, r) => {
        if(r.roleCode === 'goodsAmount') {
          return r.billVal == 1 ? '批发供货价' : '零售供货价'
        } if(r.roleCode === 'platform') {
          return amountTransform(data?.platformLeastFee, '/')
        } else if(r.roleCode === 'hyCityAgent' && r.scope === 'nation'){
          return `${amountTransform(_)} * 5`
        } else {
          return amountTransform(_, '/')
        }
      }
    },
    {
      title: '分成比例(%)',
      dataIndex: 'billVal',
      align: 'center',
      hideInTable: data?.billType != 1,
      render: (_, r) => {
        if(r.roleCode === 'goodsAmount') {
          return r.billVal == 1 ? '批发供货价' : '零售供货价'
        } if(r.roleCode === 'platform') {
          return amountTransform(data?.platformLeastFee, '/')
        } else if(r.roleCode === 'hyCityAgent' && r.scope === 'nation'){
          return `${amountTransform(_)} * 5`
        } else {
          return amountTransform(_)
        }
      }
    },
    {
      title: '费用名称',
      dataIndex: 'name',
      align: 'center'
    },
    {
      title: '是否承担通道费',
      dataIndex: 'isChannelFee',
      align: 'center',
      render: (_, r) => {
        return valueDesc(r.roleCode, 'isChannelFee', r.isChannelFee)
      }
    },
    {
      title: '结算方式',
      dataIndex: 'settleType',
      align: 'center',
      render: (_, r) => {
        return valueDesc(r.roleCode, 'settleType', r.settleType)
      }
    },
    {
      title: '实际资金解冻时机',
      dataIndex: 'trueUnfrezeeType',
      align: 'center',
      render: (_, r) => {
        return valueDesc(r.roleCode, 'trueUnfrezeeType', r.trueUnfrezeeType)
      }
    },
    {
      title: '业绩记账解冻时机',
      dataIndex: 'businessUnfrezeeType',
      align: 'center',
      render: (_, r) => {
        return valueDesc(r.roleCode, 'businessUnfrezeeType', r.businessUnfrezeeType)
      }
    },
    {
      title: '业绩范围',
      dataIndex: 'scope',
      align: 'center',
      render: (_, r) => {
        return valueDesc(r.roleCode, 'scope', r.scope)
      }
    },
    {
      title: '分账条件',
      dataIndex: 'billCond',
      align: 'center',
      render: (_, r) => {
        return valueDesc(r.roleCode, 'cond', r.billCond, 'title')
      }
    },
    {
      title: '备注',
      dataIndex: 'remark',
      align: 'center'
    },
    {
      title: '角色状态',
      dataIndex: 'status',
      align: 'center',
      render: (_, r) => {
        if(r.status) {
          return '已开启'
        } else {
          return '已停用'
        }
      }
    }
  ]

  const columnsGoods:ProColumns[] = [
    {
      title: 'spuID',
      dataIndex: 'spuId',
      align: 'center'
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      align: 'center'
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      align: 'center'
    },
    {
      title: '可用库存',
      dataIndex: 'stockNum',
      align: 'center'
    },
    {
      title: '市场价',
      dataIndex: 'marketPrice',
      align: 'center',
      render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '售价',
      dataIndex: 'salePrice',
      align: 'center',
      render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '零售供货价',
      dataIndex: 'retailSupplyPrice',
      align: 'center',
      render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '批发供货价',
      dataIndex: 'wholesaleSupplyPrice',
      align: 'center',
      render: (_) => amountTransform(_, '/').toFixed(2)
    },
    {
      title: '供应商ID',
      dataIndex: 'supplierId',
      align: 'center'
    },
  ]

  return (
    <ModalForm
      visible={visible}
      onVisibleChange={setVisible}
      width={900}
      title='预览'
      onFinish={async()=> {
        await submit()
        return true
      }}
      modalProps={{
        destroyOnClose: true
      }}
      layout='horizontal'
    >
      <div style={{fontWeight: 600}}>基本信息</div>
      <Row gutter={[8, 16]}>
        <Col span={8}>
          业务名称: {data?.name}
        </Col>
        <Col span={8}>
          <Space>
            <div>法大大合同：</div>
            <div>
              <div>
                {data?.contractIsSign ? '需要签署' : '不需签署'}
                {
                  data?.contractIsSign ?
                  <Tooltip title={data?.contractCode}>
                    (<a>查看合同配置</a>)
                  </Tooltip>:
                  ''
                }
              </div>
              <div>
                {
                  data?.contractFeeBear === 'platform' ? '平台承担5元合同费' : data?.contractFeeBear === 'supplier' ? '供应商承担5元合同费' : ''
                }
              </div>
            </div>
          </Space>
        </Col>
        <Col span={8}>
          备注：{data?.remark}
        </Col>
      </Row>
      <Divider />
      <div>
        <span style={{fontWeight: 600}}>分账配置</span>
        <span>（通道费：0.65%）</span>
      </div>
      <Row gutter={[8, 16]}>
        <Col span={8}>
          计算类型：{data?.billType === 1 ? '比例' : '金额'}
        </Col>
        <Col span={8}>
          <Space>
            <div>分账时间：</div>
            <div>
              <div>{data?.startTime}</div>
              <div>{data?.endTime}</div>
            </div>
          </Space>
        </Col>
      </Row>
      <Divider />
      <ProTable
        rowKey='roleCode'
        paginationProps={false}
        search={false}
        headerTitle='分成明细'
        options={false}
        columns={columns}
        dataSource={data?.divideInfoList}
      />
      <ProTable
        rowKey='skuId'
        paginationProps={false}
        search={false}
        headerTitle='分成商品'
        options={false}
        columns={columnsGoods}
        dataSource={data?.goods}
      />
      <div>业务商品 {data?.goods.length} 款 参与分成角色：{data?.divideInfoList.length} 位，交易金额：{amountTransform(data?.platformLeastAmount, '/')} 元    平台结余金额：{amountTransform(data?.platformLeastFee, '/')} 元（剔除通道费后）</div>
    </ModalForm>
  )
}

export default Preview