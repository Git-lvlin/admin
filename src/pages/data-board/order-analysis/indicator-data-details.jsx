import { useState, useEffect } from 'react'
import ProTable from '@/components/pro-table'
import { Table } from 'antd'

import { indexDataDetail } from "@/services/data-board/order-analysis"
import Export from "@/components/export"

const IndicatorDataDetails = ({dateTimeRange, type, index, dataType}) => {
  const [sumaryData, setSumaryData] = useState(null)

  const columns = [
    {
      title: '日期',
      dataIndex: 'dateTime',
      align: 'center',
      width: '20%'
    },
    {
      title: dataType,
      align: 'center',
      width: '80%',
      children: [
        {
          title: 'B端新集约',
          dataIndex: 'bSnValue',
          align: 'center',
          sorter: (a, b) => a.bPsValue - b.bPsValue
        },
        {
          title: 'B端普适品',
          dataIndex: 'bPsValue',
          align: 'center',
          sorter: (a, b) => a.bPsValue - b.bPsValue
        },
        {
          title: 'B端精品生鲜',
          dataIndex: 'bSxValue',
          align: 'center',
          sorter: (a, b) => a.bSxValue - b.bSxValue
        },
        {
          title: 'B端散装生鲜',
          dataIndex: 'bSzValue',
          align: 'center',
          sorter: (a, b) => a.bSzValue - b.bSzValue
        },
        {
          title: '秒约订单',
          dataIndex: 'cMiaoValue',
          align: 'center',
          sorter: (a, b) => a.cMiaoValue - b.cMiaoValue
        },
        {
          title: '拼团订单',
          dataIndex: 'cPinValue',
          align: 'center',
          sorter: (a, b) => a.cPinValue - b.cPinValue
        },
        {
          title: '盲盒订单',
          dataIndex: 'cMangValue',
          align: 'center',
          sorter: (a, b) => a.cMangValue - b.cMangValue
        },
        {
          title: '签到订单',
          dataIndex: 'cQianValue',
          align: 'center',
          sorter: (a, b) => a.cQianValue - b.cQianValue
        },
        {
          title: '样品订单',
          dataIndex: 'cYangValue',
          align: 'center',
          sorter: (a, b) => a.cYangValue - b.cYangValue
        },
        {
          title: '1688订单',
          dataIndex: 'c1688Value',
          align: 'center',
          sorter: (a, b) => a.c1688Value - b.c1688Value
        }
      ]
    }
  ]

  return (
    <ProTable
      rowKey="dateTime"
      columns={columns}
      params={{
        dateTimeRange, 
        type, 
        index
      }}
      bordered
      request={indexDataDetail}
      postData={v=> {
        setSumaryData(v.find(item=> item.dateTime === '合计'))
        return v.filter(item=> item.dateTime !== '合计')
      }}
      toolBarRender={()=>(
        <Export
          type="orderDetail-indexDeatilData"
          conditions={{
            startTime: dateTimeRange[0]?.format('YYYY-MM-DD HH:mm:ss'),
            endTime: dateTimeRange[1]?.format('YYYY-MM-DD HH:mm:ss'),
            type, 
            index,
            types: 'export'
          }}
        />
      )}
      scroll={{x: 'max-content', y: 500}}
      pagination={false}
      search={false}
      options={false}
      revalidateOnFocus={false}
      summary={()=>(
        <ProTable.Summary fixed>
          <ProTable.Summary.Row align='center'>
            <ProTable.Summary.Cell index={0}>{sumaryData?.dateTime}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={1}>{sumaryData?.bSnValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={2}>{sumaryData?.bPsValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={3}>{sumaryData?.bSxValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={4}>{sumaryData?.bSzValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={5}>{sumaryData?.cMiaoValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={6}>{sumaryData?.cPinValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={7}>{sumaryData?.cMangValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={8}>{sumaryData?.cQianValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={9}>{sumaryData?.cYangValue}</ProTable.Summary.Cell>
            <ProTable.Summary.Cell index={10}>{sumaryData?.c1688Value}</ProTable.Summary.Cell>
          </ProTable.Summary.Row>
        </ProTable.Summary>
      )}
    />
  )
}

export default IndicatorDataDetails
