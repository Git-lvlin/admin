import React,{useEffect,useRef,useState} from 'react';
import {Form,DatePicker,Button,Modal,Select} from 'antd';
import {formatMessage,connect} from 'umi';
import ProTable from '@ant-design/pro-table';
import ProForm,{ ProFormText } from '@ant-design/pro-form';
import { couponCrowdList } from '@/services/crowd-management/coupon-crowd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const validity=(props)=>{
    let {id,DetailList,choose,dispatch,UseScopeList}=props
    const actionRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading,setLoading]=useState(true)
    const [CrowdIdsArr,setCrowdIdsArr]=useState([])
    const [onselect,setOnselect]=useState([])
    const [CrowdIds,setCrowdIds]=useState('')
    const columns = [
        {
            title: '群体名称',
            dataIndex: 'name',
            valueType: 'text',
        }
    ];
    const columns3= [
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
    const SubTable = (props) => {
        const [data, setData] = useState([])
        const {name}=props
        const columns = [
          {
            title: '选项',
            dataIndex: 'type',
            valueType: 'select',
            valueEnum: {
              1: '会员等级',
              2: '消费次数',
              3: '累计消费'
            },
            hideInSearch: true,
        },
          {
              title: '范围',
              dataIndex: 'isContain',
              valueType: 'select',
              valueEnum: {
                1: '包含',
                2: '不包含',
              },
              hideInSearch: true,
          },
          {
              title: '条件',
              dataIndex: 'msgDisplay',
              hideInSearch: true,
          }
        ];
        useEffect(() => {
          couponCrowdList({
            name:name
          }).then(res => {
            if (res.code === 0) {
              setData(res?.data?.[0].crowdInfo)
            }
          })
        }, [])
        return (
          <ProTable search={false} key="type" columns={columns} dataSource={data} pagination={false} />
        )
      };
     // 删除商品
     const  delGoods=val=>{
        const arr =  UseScopeList.UseScopeObje.CrowdIds.split(',')
        dispatch({
            type:'UseScopeList/fetchCrowdIds',
            payload:{
                CrowdIds:arr.filter(ele=>(
                            ele!=val
                        )).toString()
            }
        })
        dispatch({
            type:'UseScopeList/fetchCrowdIdsArr',
            payload:{
                CrowdIdsArr:UseScopeList.UseScopeObje.CrowdIdsArr.filter(ele=>(
                            ele.id!=val
                ))
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
                    columns={columns3}
                    dataSource={UseScopeList.UseScopeObje.CrowdIdsArr}
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