import React, { useState, useEffect,useRef } from 'react';
import { getDetailById } from '@/services/community-management/adsense-get-detail-byid';
import { saveAdsense } from '@/services/community-management/adsense-save-adsense';
import ProForm, { ProFormText,ProFormRadio,DrawerForm,ProFormDateRangePicker,ProFormSelect} from '@ant-design/pro-form';
import { history } from 'umi';
import { message, Form,Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import Upload from '@/components/upload';

export default props => {
 const formRef = useRef();
 const id = props.location.query.id
 const [position,setPosition]=useState(1)
 const [form] = Form.useForm()
 useEffect(()=>{
   if(id){
    getDetailById({id}).then(res=>{
      form.setFieldsValue(res.data)
    })

   }
   return undefined
 })
 const columns=[
  {
     title: '商品图片',
     dataIndex: 'unit',
  },
  {
    title: '商品名称',
    dataIndex: 'unit',
 },
//   {
//    title: '操作',
//    valueType: 'text',
//    render:(text, record, _, action)=>[
//        <a onClick={()=>delType(record.key)}>删除</a>
//    ]
// }
]
  //标题验证规则
  const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value.length > 20) {
          await reject('标题名称不超过20个字符')
      }
      // else if (/^[^('"\\?)]+$/.test(value)) {
      //     await reject('标题不可以含特殊字符')
      // } 
      else {
          await resolve()
      }
    })
  }
  return (
    <ProForm
        onFinish={async (values) => {
          console.log(values);
          saveAdsense(values).then(res=>{
            if(res.code==0){
              history.push('/community-management/community-advertising')
              message.success('提交成功');
            }
          })
        }}
        form={form}
        params={{}}
        style={{ width: '1000px', margin: '0 auto' }}
      >
        <ProFormText
            width="md"
            name="id"
            label="广告ID"
            tooltip="最长为 24 位"
            placeholder="请输入广告ID"
        />
         <ProFormText
            width="md"
            name="title"
            label="广告标题"
            tooltip="最长为 24 位"
            placeholder="请输入广告标题"
            rules={[
              { required: true, message: '请输入标题' },
              {validator: checkConfirm}
            ]}
        />
        
         <ProFormRadio.Group
            name="position"
            label="广告位置"
            options={[
                {
                  label: 'SQ01',
                  value: '1'
                },
                {
                  label: 'SQ02',
                  value: '2'
                },
                {
                  label: 'SQ03',
                  value: '3'
                },
            ]}
            />
        <Form.Item label="圈子ICON" name="images">
            <Upload multiple maxCount={1} accept="image/*" dimension="1:1" />
        </Form.Item>
        <ProFormRadio.Group
            name="linkType"
            label="链接类型"
            fieldProps={{
              onChange: (e) => setPosition(e.target.value),
            }}
            options={[
                {
                  label: 'URL链接',
                  value: 1
                },
                {
                  label: '商品链接',
                  value: 2
                },
                {
                  label: '无链接',
                  value: 3
                },
            ]}
        />
          {
            position=='1'?
            <ProFormText
                width="md"
                name="url"
                label="URL跳转"
                tooltip="最长为 24 位"
            />
            :null
          }
          {
            position=='2'?
            <DrawerForm
              title="添加商品"
              formRef={formRef}
              trigger={
                <Button type="primary">
                  <PlusOutlined />
                  添加商品
                </Button>
              }
              drawerProps={{
                forceRender: true,
                destroyOnClose: true,
              }}
              onFinish={async (values) => {
                await waitTime(2000);
                console.log(values.name);
                message.success('提交成功');
                // 不返回不会关闭弹框
                return true;
              }}
            >
               <ProTable
                  toolBarRender={false}
                  search={false}
                  rowKey="spuId"
                  columns={columns}
                  rowSelection={{}}
                  // dataSource={DetailList.data?.spuInfo}
                />
            </DrawerForm>
            :null
          }
        <ProFormRadio.Group
            name="state"
            label="状态"
            options={[
                {
                  label: '启用',
                  value: 1
                },
                {
                  label: '禁用',
                  value: 0
                }
            ]}
        />
        <ProFormText
            width="md"
            name="order"
            label="排序"
            tooltip="最长为 24 位"
        />
        <p>备注：同一个广告位置，序号1-100，1为最前。</p>
      </ProForm>
  );
};
