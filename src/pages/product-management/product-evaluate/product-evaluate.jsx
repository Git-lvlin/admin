import React, { useRef,useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { history } from 'umi';
import { Button,Image,Tabs,Switch } from 'antd';
import ContentModel from './content-model';
import { ProFormSwitch} from '@ant-design/pro-form';
import AuditModel from './audit-model'
import styles from './style.less'
const { TabPane } = Tabs

const EvaluateList= (props) => {
    const ref=useRef()
    const [visible,setVisible]=useState()
    const columns = [
        {
            title: '用户ID',
            dataIndex: 'spuid',
            hideInSearch: true,
        },
        {
            title: '用户头像',
            dataIndex: 'images',
            valueType: 'image',
            hideInSearch:true,
            render:(_,data)=>{
                return <Image src={data.images[0]} alt="" width='50px' height='50px' />
            }
        },
        {
            title: '用户昵称',
            dataIndex: 'userName',
            valueType: 'text',
        },
        {
            title: '用户打分',
            dataIndex: 'hitsNum',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '评价内容',
            dataIndex: 'likesNum',
            valueType: 'text',
            hideInSearch: true,
            render:(text, record, _, action)=>[
                <a onClick={()=>setVisible(true)}>{record.likesNum}</a>
            ],
        },
        {
            title: '评价时间',
            dataIndex: 'commentNum',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '订单编号',
            dataIndex: 'commentNum',
            valueType: 'text',
        },
        {
            title: '被评商品SKUid',
            dataIndex: 'SKUid',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '被评商家ID',
            dataIndex: 'ID',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '被评商家名称',
            dataIndex: 'SKUid',
            valueType: 'text',
        },
        {
            title: '操作',
            key: 'option',
            valueType: 'option',
            render: (_, data) => [
                <AuditModel 
                  record={data}
                //   type={type} 
                  state={1}  
                  label={'通过'}  
                  text={'确认要通过该帖子的发布吗？'} 
                //   InterFace={auditDynamic} 
                  title={'审核确认'}
                  boxref={ref}
                />,
                <AuditModel 
                  record={data}
                //   type={type} 
                  state={2}  
                  label={'拒绝'}  
                  text={'确认要拒绝该帖子的通过吗？'} 
                //   InterFace={auditDynamic} 
                  title={'审核确认'}
                  boxref={ref}
                />,
            ],
            // hideInTable:type==0?false:true
          },
    ];
  const auditSwitch=(off)=>{
        // updateAuditDynamicSwitch({}).then(res=>{
        // })
    }
  return (
      <>
        <ProTable
            rowKey="id"
            options={false}
            actionRef={ref}
            // request={adminList}
            search={{
                defaultCollapsed: false,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                    <ProFormSwitch
                      label="审核功能开关"
                      className='switchTop'
                      fieldProps={{
                          onChange:(bol)=>auditSwitch(bol)
                      }}
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
            />
        }
    </>
  );
};

export default (props) =>{
    const [seleType,setSeleType]=useState(0)
    return (
      <PageContainer>
        <Tabs
          centered
          defaultActiveKey="0"
          style={{
            background: '#fff',
            padding: 25
          }}
          onChange={(val)=>{
            setSeleType(val)
          }}
        >
          <TabPane tab="待处理" key="0">
            {
              seleType==0&&<EvaluateList type={0}/>
            }
          </TabPane>
          <TabPane tab="已通过" key="1">
            {
              seleType==1&&<EvaluateList type={1}/>
            }
          </TabPane>
          <TabPane tab="已屏蔽" key="2">
            { 
              seleType==2&&<EvaluateList type={2}/> 
            }
          </TabPane>
        </Tabs>
        <div style={{background:'#fff',padding:'25px'}}>
            <p>说明：</p>
            <p>1、用户没填写任何评价内容，只做评分的，不需要进行审核（直接通过）</p>
        </div>
      </PageContainer>
    )
  }