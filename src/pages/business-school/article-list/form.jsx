import React, { useRef, useEffect, useState } from 'react';
import { message, Form,Space,Button} from 'antd';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-form';
import Upload from '@/components/upload';
import { bannerAdd,findAdminArticleTypeList } from '@/services/cms/member/member';
import { adminArticleDetail } from '@/services/business-school/find-admin-article-list';
import  ReactQuill,{ Quill }  from 'react-quill';
import { history } from 'umi';
import 'react-quill/dist/quill.snow.css';




const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  }
};



export default (props) => {
  const { detailData, setVisible, onClose, visible,callback } = props;
  const formRef = useRef();
  const [onselect,setOnselect]=useState([])
  const [form] = Form.useForm()
  const [values1, setValues1] = useState('');

  const onsubmit = (values) => {
    const { ...rest } = values
    const param = {
      articleType:1,
      articleContent:values1,
      ...rest
    }
    if(detailData?.id&&detailData?.edtil){
        return setVisible(false)
    }
    if (detailData?.id&&detailData?.edit) {
      param.id = detailData?.id
    }
    if(!values1){
      message.error('请填写文章内容！！');
      return false
    }else{
        bannerAdd(param).then((res) => {
          if (res.code === 0) {
            message.success(detailData?.id ?'编辑成功':'提交成功');
            callback(true)
            setVisible(false)
          }
        })
    }

  };

  useEffect(() => {
    if (detailData?.id) {
      adminArticleDetail({id:detailData?.id}).then(res=>{
        if(res.data.articleContent){
          setValues1(res.data.articleContent)
        }
        form.setFieldsValue({
          ...res.data
        })
      })
    }
    findAdminArticleTypeList({}).then(res=>{
      setOnselect(res.data.map(ele=>(
        {label:ele.typeName,value:ele.id}
      )))
    })
  }, [form, detailData])

  const checkConfirm=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value.length>0&&!/^[0-9]*[1-9][0-9]*$/.test(value)&&value!=0) {
        await reject('只能输入整数')
    } else {
        await resolve()
    }
    })
  }

  const numMinLength=(rule, value, callback)=>{
    return new Promise(async (resolve, reject) => {
    if (value&&value.length<4) {
        await reject('不少于4个字符')
    } else {
        await resolve()
    }
    })
  }
  

  const modules={
    toolbar:[
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image','video'],
  
      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean']                                         // remove formatting button
  ]
  }
  

  return (
    <DrawerForm
      title={`${detailData?.id ? detailData?.edtil?'详情':'编辑图文' : '新建图文'}`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      width={1500}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={
        {
          render: (props, defaultDoms) => {
            return [
              <Button type="primary" key="submit" onClick={() => {
                props.form?.submit?.()
              }}>
                提交
              </Button>,
              <Button type="default" onClick={() => setVisible(false)}>
                返回
              </Button>
            ];
          }
        }
      }
      onFinish={async (values) => {
        await onsubmit(values);
        // 不返回不会关闭弹框
        // return true;
      }}
      {...formItemLayout}
    >
        <ProFormText 
          width="md"
          name="articleTitle"
          label="标题"
          placeholder="请输入文章标题"
          rules={[
            { required: true, message: '请输入文章标题' },
            {validator: numMinLength}
          ]}
          readonly={detailData?.id&&detailData?.edtil}
          fieldProps={{
            minLength:4,
            maxLength: 60,
          }}
        />

        <ProFormText 
          width="md"
          name="authorNickName"
          label="发布人昵称"
          placeholder="请输入当前登录账户昵称"
          rules={[
            { required: true, message: '请输入当前登录账户昵称' },
            {validator: numMinLength}
          ]}
          readonly={detailData?.id&&detailData?.edtil}
          fieldProps={{
            minLength:4,
            maxLength: 20,
          }}
        />

        <Form.Item
          label="封面图片"
          name="coverPicture"
          rules={[{ required: true, message: '请上传图片!' }]}
          tooltip={
            <dl>
              <dt>图片要求</dt>
              <dd>1.图片大小500kb以内</dd>
              <dd>2.图片尺寸为 360 x 100</dd>
              <dd>3.图片格式png/jpg/gif</dd>
            </dl>
          }
          extra="图片要求 1.图片大小500kb以内 2.图片尺寸为 360 x 100 3.图片格式png/jpg/gif"
          readonly={detailData?.id&&detailData?.edtil} 
        >
          <Upload multiple dimension={{width:360,height:100}}   maxCount={1} accept="image/*"  size={(1*1024)/2} />
        </Form.Item>

        <ProFormSelect
          width="md"
          name="storeType"
          label="可展示店铺"
          options={[
            {
                value: 1,
                label: '所有店铺',
            },
            {
                value: 2,
                label: '社区店',
            },
            {
                value: 3,
                label: '内部店',
            },
            {
                value: 4,
                label: '自营店',
            },
          ]}
          placeholder="请选择可展示的店铺"
          rules={[{ required: true, message: '请选择店铺!' }]}
          readonly={detailData?.id&&detailData?.edtil} 
        />
        <ProFormSelect
          width="md"
          name="articleTypeId"
          label="所属分类"
          options = {onselect}
          placeholder="请选择所属文章分类"
          rules={[{ required: true, message: '请选择位置!' }]}
          readonly={detailData?.id&&detailData?.edtil}
          extra={detailData?.id&&detailData?.edtil?null:<a onClick={()=>{history.push('/business-school/article-category-list')}}>管理分类</a>}
        />

       
      <ProFormRadio.Group
          name="isTop"
          label="是否置顶"
          rules={[{ required: true, message: '请设置是否置顶!' }]}
          options={[
            {
              label: '置顶',
              value: 1,
            },
            {
              label: '不置顶',
              value: 0,
            },
          ]}
          initialValue={1}
          readonly={detailData?.id&&detailData?.edtil} 
        />

      <ProFormRadio.Group
          name="isShow"
          label="状态"
          rules={[{ required: true, message: '请设置是否显示隐藏!' }]}
          options={[
            {
              label: '显示',
              value: 1,
            },
            {
              label: '隐藏',
              value: 0,
            },
          ]}
          readonly={detailData?.id&&detailData?.edtil} 
        />
        <ProFormText 
          width="md"
          name="virtualClickNum"
          label="虚拟浏览量"
          placeholder="请输入虚拟浏览量，8位以内整数"
          rules={[
            { required: true, message: '请输入虚拟浏览量,8位以内整数' },
            {validator: checkConfirm}
          ]}
          fieldProps={{
            maxLength: 8,
          }}
          readonly={detailData?.id&&detailData?.edtil}  
        />

        {
          onselect.length>0&&
          <Form.Item
            label="文章详情"
          //  name="articleContent"
            readonly={detailData?.id&&detailData?.edtil}
            // rules={[{ required: true, message: '请设置文章详情!' }]} 
          >
            <ReactQuill value={values1} onChange={(value)=>{
              setValues1(value)
            }}  modules={modules}/>
          </Form.Item>
        }

    </DrawerForm>
  );
};