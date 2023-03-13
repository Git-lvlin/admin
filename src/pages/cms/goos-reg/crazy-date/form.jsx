import React, { useRef, useEffect, useState } from 'react';
import { message, Form } from 'antd';
import ProForm, {
  ProFormText,
  ProFormRadio,
  DrawerForm,
  ProFormDateTimePicker,
  ProFormCheckbox
} from '@ant-design/pro-form';
import CrazyAddActivityReg from '@/components/crazy-add-activity-reg';
import { seckillingClassSub, seckillingClassDetail, seckillingClassEdit } from '@/services/cms/member/goos-reg';
import Associated0Goods from './associated0-goods'
import moment from 'moment';
import { amountTransform } from '@/utils/utils'
import ProCard from '@ant-design/pro-card';

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
  const [detailList1,setDetailList1]=useState()
  const [detailList2,setDetailList2]=useState()
  const [detailList3,setDetailList3]=useState()
  const [detailList4,setDetailList4]=useState()
  const [detailList5,setDetailList5]=useState()
  const [detailList6,setDetailList6]=useState()
  const [detailList7,setDetailList7]=useState()
  const [detailData,setDetailData]=useState()
  const [activeKey, setActiveKey] = useState('monday')

  const waitTime = (values) => {
    const { ...rest } = values
    const param = {
      goodsInfo:detailList1.map(ele=>{
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
      seckillingClassDetail({id:id,pageSize:10}).then(res=>{
        if(res.code==0){
          setDetailList1(res.data?.skuList?.records.map(ele=>({...ele,activityPrice:amountTransform(ele?.activityPrice,'/')})))
          setDetailData(res.data)
          pageSum({page:res.data?.skuList?.totalPage,total:res.data?.skuList?.total})
          form.setFieldsValue({
            ...res.data
          })
        }
      })
    }
  }, [])

  const pageSum=(data)=>{
    const arr=[]
    for (let index = 1; index <= data?.page; index++) {
      seckillingClassDetail({id:id,pageSize:10,page:index}).then(res=>{
        if(res.code==0){
          arr.push(...res.data?.skuList?.records.map(ele=>({...ele,activityPrice:amountTransform(ele?.activityPrice,'/')})))
          if(arr.length==data?.total){
            setDetailList1(arr)
          }
        }
      })
    }

  
  }
  
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
      <div style={{ marginLeft:'225px' }}>
        <ProFormCheckbox.Group
          name="checkbox"
          options={[
            {
              label: '有效期内循环秒杀（第七天过后，自动从第一天的商品开始秒杀,过了活动结束时间，活动自动结束）',
              value: 1,
            }
          ]}
        />
      </div>
       <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="monday" tab="星期一">
          {
            activeKey == 'monday' && <Associated0Goods  detailList={detailList1}  id={id}  callback={(data)=>{ setDetailList1(data) }}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="tuesday" tab="星期二">
          {
            activeKey == 'tuesday' && <Associated0Goods  detailList={detailList2}  id={id}  callback={(data)=>{ setDetailList2(data) }}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="wednesday" tab="星期三">
          {
            activeKey == 'wednesday' && <Associated0Goods  detailList={detailList3}  id={id}  callback={(data)=>{ setDetailList3(data) }}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="thursday" tab="星期四">
          {
            activeKey == 'thursday' && <Associated0Goods  detailList={detailList4}  id={id}  callback={(data)=>{ setDetailList4(data) }}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="friday" tab="星期五">
          {
            activeKey == 'friday' && <Associated0Goods  detailList={detailList5}  id={id}  callback={(data)=>{ setDetailList5(data) }}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="saturday" tab="星期六">
          {
            activeKey == 'saturday' && <Associated0Goods  detailList={detailList6}  id={id}  callback={(data)=>{ setDetailList6(data) }}/>
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="sunday" tab="星期日">
          {
            activeKey == 'sunday' && <Associated0Goods  detailList={detailList7}  id={id}  callback={(data)=>{ setDetailList7(data) }}/>
          }
        </ProCard.TabPane>
      </ProCard>
    </DrawerForm>
  );
};