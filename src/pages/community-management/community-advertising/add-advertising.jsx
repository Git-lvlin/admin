import React, { useState, useEffect,useRef } from 'react';
import { getDetailById } from '@/services/community-management/adsense-get-detail-byid';
import { saveAdsense } from '@/services/community-management/adsense-save-adsense';
import { findAdsensePositionList } from '@/services/community-management/adsense-position-list';
import ProForm, { ProFormText,ProFormRadio,ProFormSelect} from '@ant-design/pro-form';
import { history } from 'umi';
import SelectProductModal from '@/components/select-product-modal'
import { message, Form,Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import Upload from '@/components/upload';

export default props => {
 const id = props.location.query.id
 const [onselect,setOnselect]=useState([])
 const [position,setPosition]=useState()
 const [visible, setVisible] = useState(false);
 const [goods,setGoods]=useState([])
 const [form] = Form.useForm()
 useEffect(()=>{
   if(id){
    getDetailById({id}).then(res=>{
      form.setFieldsValue(res.data)
    })
   }
   findAdsensePositionList({}).then(res=>{
    setOnselect(res.data.map(ele=>(
        {label:ele.title,value:ele.id}
        )))
    })
    console.log('onselect',onselect)
 },[])
 const Termination=()=>{
    setVisible(true)
  }
 const deleGoods=()=>{
  setGoods([])
 }
 const columns=[
  {
     title: '商品图片',
     dataIndex: 'imageUrl',
     render:(_, data)=>[
       <a href={data.imageUrl}>{data.imageUrl}</a>
     ],
     ellipsis:true
  },
  {
      title: '商品名称',
      dataIndex: 'goodsName',
  },
  {
    title: '操作',
    render:(_, data)=>[
      <a onClick={()=>deleGoods()}>删除</a>
    ],
    ellipsis:true
  },
]
  //标题验证规则
  const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value.length > 20) {
          await reject('标题名称不超过20个字符')
      }
      else if (/[%&',;=?$\x22]/.test(value)) {
          await reject('标题不可以含特殊字符')
      } 
      else {
          await resolve()
      }
    })
  }
  return (
    <ProForm
        onFinish={async (values) => {
          console.log(values);
          console.log('goods',goods);
          if(id){
            values.id=id
          }
          values.linkId=goods.length?goods[0].id:null
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
        submitter={{
          // 完全自定义整个区域
          render: (props, doms) => {
            console.log(props);
            return [
              <Button type="primary" key="submit" onClick={() => props.form?.submit?.()}>
                保存
              </Button>,
              <Button type="default" onClick={()=>history.push('/community-management/community-advertising')}>
                返回
              </Button>,
              
            ];
          }
        }}
      >
         <ProFormText
            width="md"
            name="title"
            label="广告标题"
            tooltip="最长为 24 位"
            placeholder="请输入广告标题"
            rules={[
              { required: true, message: '请输入标题' },
              { validator: checkConfirm}
            ]}
        />
         <ProFormSelect
            name="position"
            width="md"
            label="广告位置"
            options = {onselect}
            placeholder="请选择广告位置"
            rules={[
              { required: true, message: '请选择广告位置' },
            ]}
        />
        <Form.Item  rules={[{ required: true, message: '请上传图片' }]} label="上传图片" name="images">
            <Upload code={204} multiple maxCount={1} accept="image/*"/>
        </Form.Item>
        <ProFormRadio.Group
            name="linkType"
            label="链接类型"
            rules={[
              { required: true, message: '请选择链接类型' },
            ]}
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
            <>
              <Button type="primary" onClick={Termination} style={{margin:'0 0 20px 20px'}}>
                  <PlusOutlined />
                  添加商品
              </Button>
              <SelectProductModal 
                title={'添加商品'}  
                visible={visible} 
                setVisible={setVisible} 
                callback={(v) => { 
                  setGoods(v)
                  console.log('v',v)
                 }}
              />
              <ProTable
                rowKey="id"
                search={false}
                toolBarRender={false}
                columns={columns}
                dataSource={goods}
                style={{display:visible?'none':'block'}}
              />
            </>
            :null
          }
        <ProFormRadio.Group
            name="state"
            label="状态"
            rules={[
              { required: true, message: '请选择状态' },
            ]}
            initialValue={1}
            options={[
                {
                  label: '禁用',
                  value: 0
                },
                {
                  label: '启用',
                  value: 1
                },
                
            ]}
        />
        <ProFormText
            width="md"
            name="order"
            rules={[
              { required: true, message: '请输入排名' },
            ]}
            label="排序"
            tooltip="最长为 24 位"
        />
        <p>备注：同一个广告位置，序号1-100，1为最前。</p>
      </ProForm>
  );
};
