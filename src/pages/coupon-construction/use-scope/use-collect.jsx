import React, { useState, useRef,useEffect } from 'react';
import { Form, Button,Table,Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import { ModalForm,ProFormSelect,ProFormRadio} from '@ant-design/pro-form';
import styles from '../style.less'
import { connect } from 'umi';
import { couponWholesaleList } from '@/services/coupon-construction/coupon-wholesale-list';

const  useCollect=(props)=>{
    let {id,dispatch,DetailList,UseScopeList}=props
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
    const columns3 = [
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
        },
        {
            title: '操作',
            valueType: 'text',
            render:(text, record, _, action)=>[
                <a onClick={()=>delType(record.key)}>删除</a>
            ]
         }
    ];
    const actionRef = useRef();
    const [loading,setLoading]=useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [wholesaleIds,setWholesaleIds]=useState('')
    const [wholesaleArr,setWholesaleArr]=useState()
    const [position,setPosition]=useState()
    const onIpute=(res)=>{
        setWholesaleIds(res.selectedRowKeys.toString())
        setWholesaleArr(res.selectedRows)
    }
    const showModal = () => {
        setIsModalVisible(true);
        setLoading(true)
    };
    useEffect(()=>{
        setTimeout(()=>{
            if(id){
                dispatch({
                    type:'UseScopeList/fetchWholesaleIds',
                    payload:{
                        wholesaleIds:DetailList.data&&DetailList.data?.wsIds
                    }
                })
                dispatch({
                    type:'UseScopeList/fetchWholesaleArr',
                    payload:{
                        wholesaleArr:DetailList.data&&DetailList.data?.wsInfo
                    }
                })
            }
        },1000) 
    },[])
    const handleOk = () => {
        dispatch({
            type:'UseScopeList/fetchWholesaleIds',
            payload:{
                wholesaleIds
            }
        })
        dispatch({
            type:'UseScopeList/fetchWholesaleArr',
            payload:{
                wholesaleArr
            }
        })
        setIsModalVisible(false);
        setLoading(false)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return(
        <Form.Item className={styles.unfold} name="collect">
            <ProFormRadio.Group
                name="wholesaleType"
                label="商品范围"
                rules={[{ required: true, message: '请选择商品范围' }]}
                fieldProps={{
                value: (parseInt(id)==id )&&DetailList.data?.wholesaleType||position,
                onChange: (e) => setPosition(e.target.value),
                }}
                options={[
                {
                    label:'全部集约',
                    value: 1,
                },
                {
                    label: '指定集约',
                    value: 2,
                },
                ]}
            />
            {
                position==2||(parseInt(id)==id )&&DetailList.data?.wholesaleType==2?
                // (parseInt(id)==id)?
                // <Table
                //     rowKey='wholesaleId'
                //     columns={columns2}
                //     dataSource={DetailList.data?.wsInfo}
                // />
                <>
                <Button type="primary" className={styles.popupBtn} onClick={showModal}>
                            选择商品
                </Button>
                  <Modal key="id" width={1200}  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <ProTable
                                rowKey="wholesaleId"
                                options={false}
                                params={{
                                    pageSize:3,
                                    wholesaleType:5
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
                    </Modal>
                    <Table
                        rowKey='wholesaleId'
                        columns={columns3}
                        dataSource={UseScopeList.UseScopeObje.wholesaleArr}
                        // style={{display:loading?'none':'block'}}
                    />
                </>
                :null
            }
        </Form.Item>
    )
}
export default connect(({ DetailList,UseScopeList}) => ({
    DetailList,
    UseScopeList
  }))(useCollect);