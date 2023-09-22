import TimeSelect from '@/components/time-select'
import { useRef,useEffect, useState } from "react"
import { Space } from 'antd'
import type { FormInstance } from 'antd';
import {
  DrawerForm
} from '@ant-design/pro-form';
import ProTable from '@/components/pro-table'
import { provinceAgentProviderStoreGoods, provinceAgentProviderStoreGoodsSt } from '@/services/great-health-province/health-supply-order-performance'
import { amountTransform } from '@/utils/utils'
import type { ProColumns } from "@ant-design/pro-table"
import styles from './styles.less'
import moment from "moment";
import Export from '@/components/export'


export default (props: any) => {
  const { visible, setVisible, msgDetail} = props;
  const form = useRef<FormInstance>();
  const [orderSum, setOrderSum]=useState<any>()
  const [change, setchange] = useState(0)

  useEffect(()=> {
    let date
    let obj = {}
    if(form.current?.getFieldsValue()) {
      const { dateRange, ...rest } = form.current?.getFieldsValue()
      date = dateRange,
      obj = rest
    }
    provinceAgentProviderStoreGoodsSt({
      agencyId: msgDetail?.agencyId,
      ...obj,
      startTime:date&&moment(date?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:date&&moment(date?.[1]).format('YYYY-MM-DD HH:mm:ss'),
    }).then(res=> {
      if(res.code === 0) {
        setOrderSum(res.data?.[0])
      }
    })
  }, [change])

  const Columns: ProColumns[] = [
    {
      title: '订单日期',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单日期',
      dataIndex: 'dateRange',
      renderFormItem: () => <TimeSelect />,
      align: 'center',
      hideInTable: true,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      valueType: 'text',
      ellipsis:true,
      hideInSearch:true,
    },
    {
      title: '下单人手机号',
      dataIndex: 'memberPhone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: 'skuID',
      dataIndex: 'skuId',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '订单号',
      dataIndex: 'orderSn',
      align: 'center',
    },
    {
      title: '门店所在地',
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch:true,
    },
    {
      title: '订单金额',
      dataIndex: 'payAmount',
      align: 'center',
      render: (_,data)=>{
        if(_){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
      hideInSearch: true,
    },
    {
      title: '收益',
      dataIndex: 'commission',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
    },
    {
      title: '扣除通道费后收益',
      dataIndex: 'trueCommission',
      align: 'center',
      hideInSearch: true,
      render: (_,data)=>{
        if(_){
          return <span>￥{amountTransform(_,'/').toFixed(2)}</span>
        }else{
          return '-'
        }
      },
    },
    {
      title: '业绩范围',
      dataIndex: 'scope',
      align: 'center',
      hideInSearch: true,
    },
  ]

  const getFieldValue = () => {
    const {dateRange,...rest}= form.current?.getFieldsValue()
    return {
      agencyId:msgDetail?.agencyId,
      startTime:dateRange&&moment(dateRange?.[0]).format('YYYY-MM-DD HH:mm:ss'),
      endTime:dateRange&&moment(dateRange?.[1]).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    }
  }
  return (
    <DrawerForm
      title={`${msgDetail?.name} 供应链系统订单提成 （ID:${msgDetail?.agencyId}）`}
      onVisibleChange={setVisible}
      visible={visible}
      layout='horizontal'
      width={1300}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        footer: false
      }}
      className={styles.store_information}
      submitter={{
        render:()=> []
      }}
    >
      <ProTable
        rowKey="orderSn"
        columns={Columns}
        formRef={form}
        request={provinceAgentProviderStoreGoods}
        params={{ agencyId: msgDetail?.agencyId}}
        options={false}
        onSubmit={()=> {setchange(change + 1)}}
        onReset={()=> setchange(0)}
        search={{
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Export
              key='export'
              type='provinceAgentProviderStoreGoodsDetail'
              conditions={getFieldValue}
            />
          ],
        }}
        tableRender={(_, dom) => {
          return <>
            { dom }
            <div className={styles.summary}>
              <Space size='large'>
                <div>
                  累计收益
                  <span>￥{amountTransform(orderSum?.amount,'/').toFixed(2)}</span>
                </div>
                <div>
                  累计金额
                  <span>￥{amountTransform(orderSum?.payAmount,'/').toFixed(2)}</span>
                </div>
              </Space>
            </div>
          </>
        }}
      />
    </DrawerForm >
  );
};
