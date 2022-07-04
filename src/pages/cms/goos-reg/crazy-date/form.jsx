import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ProFormText,
  ProFormRadio,
  DrawerForm,
  ProFormDateTimePicker
} from '@ant-design/pro-form';
import CrazyAddActivityReg from '@/components/crazy-add-activity-reg';
import { seckillingClassSub, seckillingClassDetail, seckillingClassEdit } from '@/services/cms/member/goos-reg';
import Associated0Goods from './associated0-goods'
import moment from 'moment';
import { amountTransform } from '@/utils/utils'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
  layout: {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 14,
    },
  }
};

export default (props) => {
  const { setVisible, setFlag, visible,callBack,onClose,id,copy } = props;
  const formRef = useRef();
  const [form] = Form.useForm()
  const [detailList,setDetailList]=useState()
  const [detailData,setDetailData]=useState()

  const waitTime = (values) => {
    const { ...rest } = values
    const param = {
      goodsInfo:detailList.map(ele=>{
        return {spuId:ele?.spuId,skuId:ele?.skuId,activityPrice:amountTransform(ele?.activityPrice,'*'),sort:ele?.sort}
      }),
      ...rest
    }
    if(id&&!copy){
      return new Promise((resolve, reject) => {
        seckillingClassEdit({...param,id:id}).then((res) => {
          if (res.code === 0) {
            callBack()
            resolve(true);
          } else {
            reject(false);
          }
        })
      });
    }else{
      return new Promise((resolve, reject) => {
        seckillingClassSub(param).then((res) => {
          if (res.code === 0) {
            callBack()
            resolve(true);
          } else {
            reject(false);
          }
        })
      });
    }

  };

  useEffect(() => {
    if (id) {
      seckillingClassDetail({id}).then(res=>{
        if(res.code==0){
          setDetailList(res.data?.skuList?.records.map(ele=>({...ele,activityPrice:amountTransform(ele?.activityPrice,'/')})))
          setDetailData(res.data)
          form.setFieldsValue({
            ...res.data
          })
        }
      })
    }
  }, [])
  
  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }

  return (
    <DrawerForm
      key="add"
      width={1400}
      title={`${id && !copy ? '编辑活动' : copy ? '复制活动' : '新建活动'}`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose:()=>{
          onClose()
        }
      }}
      submitter={{
        searchConfig:{
          submitText:id && !copy? '确认编辑' : copy ? '确认复制' : '确认新建',
          resetText:'返回'
        }
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success(id?'编辑成功':'提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
      {...formItemLayout}
    >
      <ProFormText
        name="activityName"
        width='md'
        label="活动名称"
        placeholder="请输入活动名称"
        rules={[{ required: true, message: '请输入活动名称' }]}
      />
      <ProFormDateTimePicker
        label='开始时间'
        width='md'
        rules={[{ required: true, message: '请选择开始时间' }]}
        name="activityStartTime"
        fieldProps={{
            disabledDate:(current)=>disabledDate(current),
            format:"YYYY-MM-DD HH:mm:ss"
        }}
        disabled={detailData?.status==2&&!copy}
      />
      <ProFormDateTimePicker
        label='结束时间'
        width='md'
        rules={[{ required: true, message: '请选择结束时间' }]}
        name="activityEndTime"
        fieldProps={{
            disabledDate:(current)=>disabledDate(current),
            format:"YYYY-MM-DD HH:mm:ss"
        }}
        disabled={detailData?.status==2&&!copy}
      />
      <ProFormRadio.Group
          name="limitBuyType"
          label="限购"
          required
          fieldProps={{
            direction:"vertical"
          }}
          options={[
            {
              label: '不限购',
              value: 1,
            },
            {
              label: <ProForm.Group>每人每种商品限购 <ProFormText name="limitBuyNum" width={100} initialValue={0}/>件</ProForm.Group>,
              value: 2,
            },
          ]}
        />
      <Associated0Goods detailList={detailList}  callback={(data)=>{
        setDetailList(data)
      }}/>
    </DrawerForm>
  );
};