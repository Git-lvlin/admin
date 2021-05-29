import React, { useState, useRef } from 'react';
import { Form, Button,Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import '../style.less'
import { couponWholesaleList } from '@/services/coupon-construction/coupon-wholesaleList';

export default (props)=>{
    let {onWholesaleIds}=props
    const columns = [
        {
            title: '活动类型',
            dataIndex: 'useType',
            valueType: 'select',
            valueEnum: {
                1: '全部',
                2: '指令集约',
            },
            hideInSearch: true,
        },
        {
            title: '活动名称',
            dataIndex: 'name',
            valueType: 'text',
        },
        {
            title: '活动编号',
            dataIndex: 'recoverPayTimeout',
            hideInSearch: true,
        },
        {
            title: '活动时段',
            dataIndex: 'wholesaleStartTime',
            hideInSearch: true,
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
        },
        {
            title: '操作',
            render: () => <a>删除</a>,
        },
    ];
    const actionRef = useRef();
    const [rowobjs,setRowobjs]=useState([])
    const [loading,setLoading]=useState(true)


    const close = () => {
           setLoading(false)
    };
     //拼接wholesaleIds
    const onIpute=(res)=>{
        setRowobjs(res.selectedRows)
        console.log('res.selectedRows',res.selectedRows)
        let wholesaleIds=''
        rowobjs.map(ele=>{
            wholesaleIds+=ele.wholesaleId+','
        })
        wholesaleIds=wholesaleIds.substring(0,wholesaleIds.length-1)
        onWholesaleIds&&onWholesaleIds(wholesaleIds)
    }
    return(
        <Form.Item name="collect">
              
                    <ProTable
                        rowKey="wholesaleId"
                        options={false}
                        params={{
                            status: 1,
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
                        columns={columns}
                        dataSource={rowobjs}
                        style={{display:loading?'none':'block'}}
                    />
                    <div style={{ marginBottom: 16 }}>
                        <Button type="primary" onClick={close} style={{display:loading?'block':'none'}}>
                            确定
                        </Button>
                    </div>
        </Form.Item>
    )
}