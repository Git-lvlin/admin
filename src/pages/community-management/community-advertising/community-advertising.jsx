import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { adsenseAdminList } from '@/services/community-management/adsense-admin-list';
import { deleteById } from '@/services/community-management/adsense-delete-byid';
import { ModalForm} from '@ant-design/pro-form';
import { history } from 'umi';
import { Button,message } from 'antd';

export default props => {
    const [visible, setVisible] = useState(false);
    const [byid,setByid]=useState()
    const Termination=(record)=>{
        setByid(record.id)
        setVisible(true)
    }
    const columns = [
        {
            title: '广告ID：',
            dataIndex: 'id',
        },
        {
            title: '广告标题',
            dataIndex: 'title',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '所处位置',
            dataIndex: 'position',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '排序',
            dataIndex: 'order',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '链接类型',
            dataIndex: 'linkType',
            valueType:'select',
            valueEnum: {
              0: '全部',
              1: 'URL',
              2: '商品',
              3: '销售活动',
            },
            hideInTable:true
        },
        {
            title: '链接类型',
            dataIndex: 'linkType',
            valueType:'text',
            hideInSearch:true,
        },
        {
            title: '状态',
            dataIndex: 'state',
            valueType:'select',
            valueEnum: {
              1: '启用',
              2: '停用',
            },
            hideInTable:true
        },
        {
            title: '状态',
            dataIndex: 'state',
            valueType: 'text',
            hideInSearch:true
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '操作',
            render: (text, record, _, action) => [
              <Button onClick={()=>history.push('/community-management/community-advertising/add-advertising?id='+record.id)}>编辑</Button>,
              <DeleteModal record={record} boxref={ref} text={'确认要删除所选内容吗？'} InterFace={deleteById} title={'操作确认'}/>,
                <ModalForm
                    title="操作确认"
                    key="model2"
                    onVisibleChange={setVisible}
                    visible={visible}
                    trigger={<Button onClick={()=>Termination(record)}>删除</Button>}
                    submitter={{
                    render: (props, defaultDoms) => {
                        return [
                        ...defaultDoms
                        ];
                    },
                    }}
                    onFinish={async (values) => {
                        console.log('values',values);
                        deleteById({id:byid}).then(res=>{
                            if(res.code==0){
                                setVisible(false)
                                message.success('提交成功');
                                return true;
                            }
                        })
                       
                    }}
                >
                <p>确认要删除所选广告吗？</p>
                </ModalForm>
            ],
            hideInSearch: true,
        },
    ];
  return (
    <PageContainer>
        <ProTable
          rowKey="id"
          options={false}
          params={{}}
          request={adsenseAdminList}
          rowSelection={{}}
          search={{
              defaultCollapsed: false,
              labelWidth: 100,
              optionRender: (searchConfig, formProps, dom) => [
                  ...dom.reverse(),
                  <Button
                      key="primary"
                      type="primary"
                      onClick={() => {
                          history.push('/community-management/community-advertising/add-advertising')
                      }}
                      >
                      添加
                  </Button>,
              ],
          }}
          columns={columns}
        />
  </PageContainer>
  );
};
