import React, { useState, useRef } from 'react';
import { Form, Button,Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import '../style.less'
import { history,connect } from 'umi';
import { couponWholesaleList } from '@/services/coupon-construction/coupon-wholesale-list';

const  useCollect=(props)=>{
    let {id,dispatch,DetailList}=props
    const columns = [
        {
            title: '活动类型',
            dataIndex: 'wholesaleType',
            valueType: 'select',
            valueEnum: {
                1:'指令集约',
                2:'主动集约'
            },
            hideInTable: true
        },
        {
            title: '活动编号',
            dataIndex: 'wholesaleId',
            hideInSearch: true,
        },
        {
            title: '活动名称',
            dataIndex: 'name',
            valueType: 'text',
        },
        {
            title: '活动时段',
            dataIndex: 'wholesaleStartTime',
            hideInSearch: true,
            render:(text, record, _, action)=>[
                <p>{record.wholesaleStartTime}至{record.wholesaleEndTime}</p>
            ]
        },
        {
            title: '可购买的会员店等级',
            dataIndex: 'storeLevel',
            hideInSearch: true,
        },
        {
            title: '可购买的会员用户',
            dataIndex: 'memberLevel',
            hideInSearch: true,
        }
    ];
    const columns2 = [
        {
            title: '活动编号',
            dataIndex: 'wsId',
        },
        {
            title: '活动名称',
            dataIndex: 'name',
            valueType: 'text',
        },
        {
            title: '活动时段',
            dataIndex: 'wholesaleStartTime',
            render:(text, record, _, action)=>[
                <p>{record.wholesaleStartTime}至{record.wholesaleEndTime}</p>
            ]
        },
        {
            title: '可购买的会员店等级',
            dataIndex: 'storeLevel',
        },
        {
            title: '可购买的会员用户',
            dataIndex: 'memberLevel',
        }
    ];
    const columns3 = [
        {
            title: '活动编号',
            dataIndex: 'wholesaleId',
        },
        {
            title: '活动名称',
            dataIndex: 'name',
            valueType: 'text',
        },
        {
            title: '活动时段',
            dataIndex: 'wholesaleStartTime',
            hideInSearch: true,
            render:(text, record, _, action)=>[
                <p>{record.wholesaleStartTime}至{record.wholesaleEndTime}</p>
            ]
        },
        {
            title: '可购买的会员店等级',
            dataIndex: 'storeLevel',
        },
        {
            title: '可购买的会员用户',
            dataIndex: 'memberLevel',
        }
    ];
    const actionRef = useRef();
    const [rowobjs,setRowobjs]=useState([])
    const [loading,setLoading]=useState(true)
    const [wholesaleIds,setWholesaleIds]=useState('')
    const close = () => {
           setLoading(false)
           dispatch({
            type:'UseScopeList/fetchWholesaleIds',
            payload:{wholesaleIds}
          })
    };
     //拼接wholesaleIds
    const onIpute=(res)=>{
        setRowobjs(res.selectedRows)
        let wholesaleIds=''
        rowobjs.map(ele=>{
            wholesaleIds+=ele.wholesaleId+','
        })
        wholesaleIds=wholesaleIds.substring(0,wholesaleIds.length-1)
        setWholesaleIds(wholesaleIds)
    }
    return(
        <Form.Item name="collect">
            {
                (parseInt(id)==id)?
                <Table
                    rowKey='wholesaleId'
                    columns={columns2}
                    dataSource={DetailList.data?.wsInfo}
                />
                :<>
                  <ProTable
                        rowKey="wholesaleId"
                        options={false}
                        params={{
                            pageSize:3,
                        }}
                        request={couponWholesaleList}
                        actionRef={actionRef}
                        search={{
                            defaultCollapsed: false,
                            labelWidth: 100,
                            optionRender: (searchConfig, formProps, dom) => [
                                ...dom.reverse(),
                            ],
                        }}
                        columns={columns}
                        rowSelection={{}}
                        tableAlertOptionRender={onIpute}
                        style={{display:loading?'block':'none'}}
                    />
                    <Table
                        rowKey='wholesaleId'
                        columns={columns3}
                        dataSource={rowobjs}
                        style={{display:loading?'none':'block'}}
                    />
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={close} style={{display:loading?'block':'none'}}>
                            确定
                        </Button>
                    </div>
                </>
            }
        </Form.Item>
    )
}
export default connect(({ DetailList,UseScopeList}) => ({
    DetailList,
    UseScopeList
  }))(useCollect);