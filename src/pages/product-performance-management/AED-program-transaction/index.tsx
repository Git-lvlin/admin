import { PageContainer } from '@ant-design/pro-layout'
import ProTable from '@ant-design/pro-table'

import type { ProColumns } from '@ant-design/pro-table'

import styles from './styles.less'

const AEDProgramTransaction = () => {

  const columns: ProColumns[] = [
    {
      title: '下单人用户ID',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '下单人手机号',
      dataIndex: '',
      align: 'center'
    },
    {
      title: '收货人姓名',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货电话',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '推荐人用户ID',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长ID',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '团长手机号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司类型',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属子公司名称',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '保证金订单号 ',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
     {
      title: '保证金订单金额',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    }, {
      title: '保证金订单支付时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '培训课程订单号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '培训课程订单金额',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '培训课程订单支付时间 ',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '签法大大合同状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '视频学习状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '考试状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '线下培训状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '培训课程订单业绩解冻状态',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '区县课程订单号',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '区县课程订单金额',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '区县课程订单数量',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '区县课程订单最近支付时间',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货省份',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '收货城市',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '备注',
      dataIndex: '',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <PageContainer title={false}>
      <div className={styles.mTable}>
        <h2>AED销售明细汇总</h2>
        <table>
          <thead>
            <tr>
              <th>业务项</th>
              <th>单独SPU保证金</th>
              <th colSpan={2}>销售课程数</th>
              <th colSpan={3}>课程的保证金</th>
              <th colSpan={3}>保证金的合同：合同签署情况</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>订单项</th>
              <th>线上10000元保证金订单</th>
              <th>线上 5&3800&13800&14300&4300订单</th>
              <th>线上4800区县订单</th>
              <th>线上已交保证金订单</th>
              <th>线上需交未交保证金订单</th>
              <th>线上无需交保证金订单</th>
              <th>已签电子合同订单</th>
              <th>线上需签未签合同订单</th>
              <th>线上无需签合同订单</th>
            </tr>
            <tr>
              <th>订单数量</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>小计金额</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <th>总计金额</th>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <ProTable
        columns={columns}
        options={false}
        pagination={{
          showQuickJumper: true,
          pageSize: 10
        }}
        params={{}}
        // request={}
        search={{
          labelWidth: 100,
          optionRender: (search, props, dom) => [
            ...dom.reverse()
          ]
        }}
        scroll={{x: 'max-content'}}
      />
    </PageContainer>
  )
}

export default AEDProgramTransaction