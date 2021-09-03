import React,{useEffect,useRef,useState} from 'react';
import {Form,Button,Modal,message} from 'antd';
import {connect} from 'umi';
import ProTable from '@ant-design/pro-table';
import { couponCrowdList } from '@/services/crowd-management/coupon-crowd';
import SubTable from '@/pages/coupon-construction/coupon-subtable'



const validity=(props)=>{
    let {id,DetailList,choose,dispatch,UseScopeList}=props
    const actionRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading,setLoading]=useState(true)
    const [CrowdIdsArr,setCrowdIdsArr]=useState([])
    const [CrowdIds,setCrowdIds]=useState('')
    const columns = [
        {
            title: '群体名称',
            dataIndex: 'name',
            valueType: 'text',
        }
    ];
    const columns2= [
        {
            title: '群体名称',
            dataIndex: 'name',
            valueType: 'text',
        },
        {
            title: '操作',
            valueType: 'text',
            render:(text, record, _, action)=>[
                <a onClick={()=>delGoods(record.id)}>删除</a>
            ]
         }
    ];
    useEffect(()=>{
       
        setTimeout(()=>{
            if(id){
                dispatch({
                    type:'UseScopeList/fetchCrowdIds',
                    payload:{
                        CrowdIds:DetailList.data&&DetailList.data?.crowdList?.id
                    }
                })
                dispatch({
                    type:'UseScopeList/fetchCrowdIdsArr',
                    payload:{
                        CrowdIdsArr:DetailList.data&&DetailList.data?.crowdList.length==0?[]:[DetailList.data?.crowdList]
                    }
                })
            }
        },1000) 
    },[])
     // 删除商品
     const  delGoods=val=>{
        dispatch({
            type:'UseScopeList/fetchCrowdIds',
            payload:{
                CrowdIds:''
            }
        })
        dispatch({
            type:'UseScopeList/fetchCrowdIdsArr',
            payload:{
                CrowdIdsArr:[]
            }
        })
       
    }
    const showModal = () => {
        setIsModalVisible(true);
        setLoading(true)
    };
    const handleOk = () => {
        setIsModalVisible(false);
        setLoading(false)
        dispatch({
            type:'UseScopeList/fetchCrowdIds',
            payload:{
                CrowdIds
            }
        })
        dispatch({
            type:'UseScopeList/fetchCrowdIdsArr',
            payload:{
                CrowdIdsArr
            }
        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
     const onIpute=(res)=>{
       setCrowdIds(res.selectedRowKeys.toString())
       setCrowdIdsArr(res.selectedRows)
       if(res.selectedRows.length>1){
        message.error('只能选择一个商品');
       }
    }
    return (
        <>
        {
            choose==2||(parseInt(id)==id )&&DetailList.data?.memberType==2?
            <div style={{display:choose==1||choose==4?'none':'block'}}>
                <Button type="primary" style={{margin:"0 0 20px 20px"}} onClick={showModal}>
                    选择群体
                </Button>
                <Modal key="id" width={1200}  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <ProTable
                        rowKey="id"
                        options={false}
                        params={{
                            pageSize: 3,
                        }}
                        hideAll={true}
                        style={{display:loading?'block':'none'}}
                        request={couponCrowdList}
                        actionRef={actionRef}
                        expandable={{ expandedRowRender: (_) => <SubTable name={_.name}/> }}
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
                    />
                </Modal>
                <ProTable
                    toolBarRender={false}
                    expandable={{ expandedRowRender: (_) => <SubTable name={_.name}/> }}
                    search={false}
                    rowKey="spuId"
                    columns={columns2}
                    dataSource={UseScopeList.UseScopeObje.CrowdIdsArr}
                    style={{display:isModalVisible?'none':'block'}}
                />
            </div>
            :null
         }
        </>
    )
}
export default connect(({ UseScopeList,DetailList}) => ({
    UseScopeList,
    DetailList,
  }))(validity);