import { useRef } from 'react'
import { Drawer } from 'antd'

import type { ProColumns } from '@ant-design/pro-table'
import type { FormInstance } from 'antd'

import ProTable from '@/components/pro-table'
import { awardCountPageDetail } from '@/services/product-performance-management/early-screening-statistics'
import styles from './styles.less'
import RangeNumberInput from '@/components/range-number-input'
import Export from '@/components/export'

const Detail: React.FC<any> = ({visible, setVisible, id}) => {
  const form = useRef<FormInstance>()

  const getFieldsValue = () => {
    const { ipoAmount, ...rest } = form.current?.getFieldsValue()
    return {
      ipoStartAmount: ipoAmount?.min,
      ipoEndAmount: ipoAmount?.max,
      ...rest
    }
  }
 
  const columns: ProColumns[] = [
    {
      title: '序号',
      valueType: 'indexBorder',
      align: 'center',
      hideInSearch: true
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
      title: 'IPO奖金额（元）',
      dataIndex: 'ipoAmountDesc',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'IPO奖金额',
      dataIndex: 'ipoAmount',
      hideInTable: true,
      renderFormItem: () => <RangeNumberInput />
    },
    {
      title: '红酒（箱）',
      dataIndex: 'wineNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '书籍(本)',
      dataIndex: 'bookNum',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'VIP权益(个月)',
      dataIndex: 'vipMonths',
      align: 'center',
      hideInSearch: true
    }
  ]

  return (
    <Drawer
      width={1200}
      title={false}
      visible={visible}
      onClose={()=> setVisible(false)}
      className={styles.desc}
    >
      <ProTable
        rowKey='months'
        columns={columns}
        params={{memberId: id.memberId}}
        request={awardCountPageDetail}
        options={false}
        formRef={form}
        headerTitle={`销售人用户ID：${id.memberId}销售人手机号码：${id.memberPhone} 领取IPO奖明细`}
        scroll={{x: 'max-content'}}
        search={{
          labelWidth: 120,
          optionRender: (searchConfig, props, dom) => [
            ...dom.reverse(),
            <Export 
              key='export'
              type='awardCountPageDetail'
              conditions={getFieldsValue}
            />
          ]
        }}
      />
    </Drawer>
  )
}

export default Detail