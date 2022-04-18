import React, { useState, useRef,useEffect } from 'react';
import { Button,Tabs,Image,Form,Modal,Select,Switch, Input,InputNumber,message} from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { amountTransform } from '@/utils/utils'
import ProTable from '@ant-design/pro-table';
import { productList } from '@/services/intensive-activity-management/intensive-activity-create'
import { ModalForm,ProFormText } from '@ant-design/pro-form';
import Upload from '@/components/upload';



export default (props) => {
  const { visible, setVisible, callback,id} = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectItems, setSelectItems] = useState([]);
  const [keys,setKeys]=useState()
  const [goosList,setGoosList]=useState()
  const [dataList,setDataList]=useState([])

  const formItemLayout = {
    labelCol: { span: 6 },
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


  const onsubmit = (values) => {
    setVisible(false)
  };
  useEffect(()=>{

  },[])

  return (
    <ModalForm
      title={<p>添加现金红包 <span style={{color:'#929292',fontSize:'10px'}}>完善红包信息</span></p>}
      modalProps={{
      }}
      onVisibleChange={setVisible}
      visible={visible}
      onFinish={async (values) => {
        await onsubmit(values);
      }}
      labelAlign="right"
      {...formItemLayout}
    >
      <ProFormText
        width={300}
        label="名称"
        placeholder="输入名称"
        name="name"
        readonly={id&&falg}
        rules={[
        { required: true, message: '请输入名称' },
        ]}
      />
      <ProFormText
        width={300}
        label="面额"
        placeholder="输入面额"
        name="name"
        readonly={id&&falg}
        rules={[
        { required: true, message: '请输入面额' },
        ]}
      />
      <Form.Item
          label="图片"
          name="imgUrl"
          rules={[{ required: true, message: '请上传图片' }]}
        >
           <Upload multiple  disabled={id&&falg}  maxCount={1} accept="image/*"  proportion={{width: 670,height: 284,}} />
        </Form.Item>
      <ProFormText
        width={300}
        label="库存数"
        placeholder="输入库存数"
        name="name"
        readonly={id&&falg}
        rules={[
        { required: true, message: '请输入库存数' },
        ]}
      />
      <ProFormText
        width={300}
        label="中奖概率"
        placeholder="输入中奖概率"
        name="name"
        readonly={id&&falg}
        rules={[
        { required: true, message: '请输入中奖概率' },
        ]}
      />
    </ModalForm>
  );
};