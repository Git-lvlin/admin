import React,{useEffect,useRef,useState} from 'react';
import {Form,DatePicker,Button,Modal,Select} from 'antd';
import {formatMessage,connect} from 'umi';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ProFormText } from '@ant-design/pro-form';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const validity=(props)=>{
    let {id,DetailList,choose,dispatch,UseScopeList}=props
    const actionRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading,setLoading]=useState(true)
    const [spuIdsArr,setSpuIdsArr]=useState([])
    const [onselect,setOnselect]=useState([])
    const [spuIds,setSpuIds]=useState('')
    const columns = [
        {
            title: '群体名称',
            dataIndex: 'spuId',
            valueType: 'text',
        },
        {
            title: '选项',
            dataIndex: 'goodsImageUrl',
            valueType: 'image',
            hideInSearch: true,
        },
        {
            title: '范围',
            dataIndex: 'goodsName',
            valueType: 'select',
            valueEnum: {
                1: '包含',
                2: '不包含',
            },
            hideInSearch: true,
        },
        {
            title: '条件',
            dataIndex: 'gcId1',
            valueType: 'text',
            hideInSearch: true,
        }
    ];
    const columns3= [
        {
            title: '群体名称',
            dataIndex: 'spuId',
            valueType: 'text',
        },
        {
            title: '选项',
            dataIndex: 'goodsImageUrl',
            valueType: 'image',
            hideInSearch: true,
        },
        {
            title: '范围',
            dataIndex: 'goodsName',
            valueType: 'select',
            valueEnum: {
                1: '包含',
                2: '不包含',
            },
            hideInSearch: true,
        },
        {
            title: '条件',
            dataIndex: 'gcId1',
            valueType: 'text',
            hideInTable:true
        },
        {
            title: '操作',
            valueType: 'text',
            render:(text, record, _, action)=>[
                <a onClick={()=>delGoods(record.spuId)}>删除</a>
            ]
         }
    ];
     // 删除商品
     const  delGoods=val=>{
        const arr =  UseScopeList.UseScopeObje.spuIds.split(',')
        dispatch({
            type:'UseScopeList/fetchLookSpuIds',
            payload:{
                spuIds:arr.filter(ele=>(
                            ele!=val
                        )).toString()
            }
        })
        dispatch({
            type:'UseScopeList/fetchLookSpuIdsArr',
            payload:{
                spuIdsArr:UseScopeList.UseScopeObje.spuIdsArr.filter(ele=>(
                            ele.id!=val
                ))
            }
        })
        if(UseScopeList.UseScopeObje.spuIdsArr.length==1){
            setLoading(true)
        }
       
    }
    const showModal = () => {
        setIsModalVisible(true);
        setLoading(true)
    };
    const handleOk = () => {
        setIsModalVisible(false);
        setLoading(false)
        dispatch({
            type:'UseScopeList/fetchLookSpuIds',
            payload:{
                spuIds
            }
        })
        dispatch({
            type:'UseScopeList/fetchLookSpuIdsArr',
            payload:{
                spuIdsArr
            }
        })
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
     // 拼接spuIds
     const onIpute=(res)=>{
        let spuIds=''
        res.selectedRows.map(ele=>{
            spuIds+=`${ele.spuId},`
        })
        spuIds=spuIds.substring(0,spuIds.length-1)
       setSpuIds(spuIds)
       setSpuIdsArr(res.selectedRows)
    }
    return (
        <>
        {
            choose==2||(parseInt(id)==id )&&DetailList.data?.activityEndDay?
            <>
                {
                (parseInt(id)==id)&&DetailList.data?
                <ProTable
                    toolBarRender={false}
                    search={false}
                    rowKey="spuId"
                    columns={columns}
                    dataSource={DetailList.data?.spuInfo}
                />
                :
                <>
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
                        style={{display:loading?'block':'none'}}
                        // request={commonSpuList}
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
                    />
                </Modal>
                <ProTable
                    toolBarRender={false}
                    search={false}
                    rowKey="spuId"
                    columns={columns3}
                    dataSource={UseScopeList.UseScopeObje.spuIdsArr}
                    style={{display:loading?'none':'block'}}
                />
                </>
               }
            </>
            :null
         }
        </>
    )
}
export default connect(({ UseScopeList,DetailList}) => ({
    UseScopeList,
    DetailList,
  }))(validity);