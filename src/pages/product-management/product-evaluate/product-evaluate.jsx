import React, { useRef,useState,useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import { Button,Image,Tabs,Switch,message,Tooltip } from 'antd';
import ContentModel from './content-model';
import { ProFormSwitch} from '@ant-design/pro-form';
import AuditModel from './audit-model'
import styles from './style.less'
import { findByways,addCheck,check } from '@/services/product-management/product-evaluate';
import { Space } from 'antd';
const { TabPane } = Tabs

const EvaluateList= (props) => {
    const { type }=props
    const ref=useRef()
    const [visible,setVisible]=useState()
    const [visiblePopup,setVisiblePopup]=useState()
    const [commentId,setCommentId]=useState()
    const [commentSkuId,setCommentSkuId]=useState()
    const [pitch,setPitch]=useState()
    const columns = [
        {
            title: '用户ID',
            dataIndex: 'userId',
            hideInSearch: true,
        },
        {
            title: '用户头像',
            dataIndex: 'userImg',
            valueType: 'image',
            hideInSearch:true,
        },
        {
            title: '用户昵称',
            dataIndex: 'nickName',
            valueType: 'text',
        },
        {
            title: '用户打分',
            dataIndex: 'score',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '评价内容',
            dataIndex: 'content',
            hideInSearch: true,
            render:(text, record, _, action)=>[
                <div className={styles.line_feed} key='content'>
                  {
                    record.content?
                    <Tooltip  placement="leftTop" title={record.content}>
                      <a key='link' onClick={()=>{setVisible(true);setCommentSkuId(record.id)}}>{record.content}</a>
                    </Tooltip>
                    :
                    <p key='null'>无</p>
                  }
                </div>

            ],
        },
        {
            title: '评价时间',
            dataIndex: 'commentTime',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '订单编号',
            dataIndex: 'orderSn',
            valueType: 'text',
        },
        {
            title: '被评商品SKUid',
            dataIndex: 'skuId',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '被评商家ID',
            dataIndex: 'supplierId',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '被评商家名称',
            dataIndex: 'storeName',
            valueType: 'text',
        },
        {
            title: '操作',
            key: 'option',
            valueType: 'option',
            render: (_, data) => [
              <div key='audit' style={{display:type==1?'block':'none'}}>
                <a onClick={()=>passVerification(data,2)}>通过&nbsp;&nbsp;</a>
                <a onClick={()=>passVerification(data,3)}>屏蔽</a>
              </div>,
              <a key='eadit' style={{display:type==2?'block':'none'}} onClick={()=>passVerification(data,3,false)}>修改</a>,
              <a key='turn' style={{display:type==3?'block':'none'}} onClick={()=>passVerification(data,2,true)}>修改</a>
            ],
          },
    ];
  const passVerification=(data,type,status)=>{
    setVisiblePopup(true)
    setCommentId({id:data.id,state:type,status:status})
  }
  const auditSwitch=(off)=>{
         setPitch(off)
         addCheck({type:off?1:2}).then(res=>{
           if(res.code==0){
            ref.current?.reload()
            message.success('操作成功')
           }
        })
    }
  useEffect(()=>{
    check({}).then(res=>{
        setPitch(res.data)
      })
    },[])
  return (
      <>
        <ProTable
            rowKey="id"
            options={false}
            actionRef={ref}
            params={{
              state:type
            }}
            scroll={{ y: window.innerHeight - 750, scrollToFirstRowOnChange: true, }}
            request={findByways}
            search={{
                defaultCollapsed: false,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                    <ProFormSwitch
                      label="审核功能开关"
                      className='switchTop'
                      fieldProps={{
                          onChange:(bol)=>auditSwitch(bol),
                          checked:pitch
                      }}
                      key='switch'
                    />,
                    ...dom.reverse()
                ],
            }}
            columns={columns}
            pagination={{
                pageSize: 10,
                showQuickJumper: true,
            }}
            className={styles.product_evaluate}

        />
         {visible&&
            <ContentModel
                setVisible={setVisible}
                visible={visible}
                id={commentSkuId}
            />
        }
        {
          visiblePopup&&
          <AuditModel 
            visiblePopup={visiblePopup}
            setVisiblePopup={setVisiblePopup}
            record={commentId}
            boxref={ref}
            type={type}
        />
        }
    </>
  );
};

export default (props) =>{
    const [seleType,setSeleType]=useState(1)
    return (
      <PageContainer>
        <Tabs
          centered
          defaultActiveKey="1"
          style={{
            background: '#fff',
            padding: 25
          }}
          onChange={(val)=>{
            setSeleType(val)
          }}
        >
          <TabPane tab="待处理" key="1">
            {
              seleType==1&&<EvaluateList type={1}/>
            }
          </TabPane>
          <TabPane tab="已通过" key="2">
            {
              seleType==2&&<EvaluateList type={2}/>
            }
          </TabPane>
          <TabPane tab="已屏蔽" key="3">
            { 
              seleType==3&&<EvaluateList type={3}/> 
            }
          </TabPane>
        </Tabs>
        <div style={{background:'#fff',padding:'0 0 25px 25px'}}>
            <p>说明：</p>
            <p>1、用户没填写任何评价内容，只做评分的，不需要进行审核（直接通过）</p>
        </div>
      </PageContainer>
    )
  }