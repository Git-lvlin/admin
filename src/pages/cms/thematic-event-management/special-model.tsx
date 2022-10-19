import { useState,useEffect } from 'react'
import moment from 'moment'
import { formatMessage } from 'umi';
import { Button, Space, Typography, Form, InputNumber,message } from 'antd'
import {
  DrawerForm,
  ProFormText,
  ProFormDateTimeRangePicker,
  ProFormSwitch,
  ProFormRadio
} from '@ant-design/pro-form';
import styles from './style.less'
import Associated0Goods from './associated0-goods'
import Upload from '@/components/upload';
import ReactColor from '@/components/react-color'
import {saveSubjectActiveConfig,getActiveConfigById} from '@/services/cms/member/thematic-event-management'
import type { DetailListItem,PropsItem } from './data'
import { amountTransform } from '@/utils/utils'
const { Title } = Typography;

const FromWrap = ({ value, onChange, content, right }) => (
  <div style={{ display: 'flex' }}>
    <div>{content(value, onChange)}</div>
    <div style={{ flex: 1, marginLeft: 10, minWidth: 180 }}>{right(value)}</div>
  </div>
)

const formItemLayout = {
  labelCol: { span: 5 },
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

export default (props:PropsItem) => {
  const { visible, setVisible, callback, record, onClose,copy } = props;
  const [form] = Form.useForm();
  const [detailList,setDetailList]=useState<DetailListItem>()
  const [savePrevie,setSavePrevie]=useState<number>(0)
  const [savePrevie2,setSavePrevie2]=useState<boolean>(false)
  const onSubmit = (values) => {
    if(detailList?.length==0) return message.error('请选择商品')
    const params={
      status:1,
      id:values?.id,
      name:values?.name,
      startTime:moment(values.dateRange[0]).valueOf()/1000,
      endTime:moment(values.dateRange[1]).valueOf()/1000,
      bannerImgUrl:values.bannerImgUrl,
      bannerTime:{
        switch:values.switch1,
        xL:values.xL,
        yL:values.yL,
        edgeDistance:{
          l:values?.l,
          t:values?.t,
          r:values?.r,
          b:values?.b
        },
        alphaMasked:values?.alphaMasked
      },
      subImage:{
        switch:values?.switch2,
        imgUrl:values?.imgUrl1
      },
      goodsCards:{
        showType:values?.showType,
        border:{
          color:values?.color1,
          lineWidth:values?.lineWidth1
        },
        background:{
          color:values?.color2,
          imgUrl:values?.imgUrl2
        },
        radius:values?.radius,
        textStyle:{
          color:values?.color3,
          fontSize:values?.fontSize
        },
        priceStyle:values?.priceStyle,
        goodsBorder:{
          color:values?.color4,
          lineWidth:values?.lineWidth2
        },
        goodsRadius:values?.goodsRadius
      },
      goods:detailList?.map((ele:DetailListItem)=>({
        spuId:ele?.spuId,
        sort:ele?.sort,
        actPrice:amountTransform(ele?.actPrice,'*'),
        skuId:ele?.skuId,
        id:ele.id==ele.skuId||copy?0:ele.id
      }))
    }
    if(savePrevie){
      saveSubjectActiveConfig(params).then(res=>{
        if(res.code==0){
          if(record?.id&&!copy){
            message.success('编辑成功')
          }else if(copy){
            message.success('复制成功')
          }else{
            message.success('新增成功')
          }
          setSavePrevie2(!savePrevie2)
          setSavePrevie(0)
        }
      })
    }else{
      saveSubjectActiveConfig(params).then(res=>{
        if(res.code==0){
          setVisible(false)
          callback()
          if(record?.id&&!copy){
            message.success('编辑成功')
          }else if(copy){
            message.success('复制成功')
          }else{
            message.success('新增成功')
          }
        }
      })
    }
    
  }
  useEffect(()=>{
    if(record?.id){
      getActiveConfigById({id:record?.id}).then(res=>{
        if(res.code==0){
          setDetailList(res.data?.content?.goods.map(ele=>({...ele,actPrice:amountTransform(ele?.actPrice,'/')})))
          form.setFieldsValue({
            dateRange:[res.data?.startTime*1000,res.data?.endTime*1000],
            bannerImgUrl:res.data?.content?.bannerImgUrl,
            switch1:res.data?.content?.bannerTime?.switch,
            xL:res.data?.content?.bannerTime?.xL,
            yL:res.data?.content?.bannerTime?.yL,
            l:res.data?.content?.bannerTime?.edgeDistance?.l,
            t:res.data?.content?.bannerTime?.edgeDistance?.t,
            r:res.data?.content?.bannerTime?.edgeDistance?.r,
            b:res.data?.content?.bannerTime?.edgeDistance?.b,
            alphaMasked:res.data?.content?.bannerTime?.alphaMasked,
            switch2:res.data?.content?.subImage?.switch,
            imgUrl1:res.data?.content?.subImage?.imgUrl,
            showType:res.data?.content?.goodsCards?.showType,
            color1:res.data?.content?.goodsCards?.border?.color,
            lineWidth1:res.data?.content?.goodsCards?.border?.lineWidth,
            color2:res.data?.content?.goodsCards?.background?.color,
            imgUrl2:res.data?.content?.goodsCards?.background?.imgUrl,
            radius:res.data?.content?.goodsCards?.radius,
            color3:res.data?.content?.goodsCards?.textStyle?.color,
            fontSize:res.data?.content?.goodsCards?.textStyle?.fontSize,
            priceStyle:res.data?.content?.goodsCards?.priceStyle,
            color4:res.data?.content?.goodsCards?.goodsBorder?.color,
            lineWidth2:res.data?.content?.goodsCards?.goodsBorder?.lineWidth,
            goodsRadius:res.data?.content?.goodsCards?.goodsRadius,
            ...res.data
          })
        }
      })
    }
  },[record?.id,savePrevie2])

  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  }
  const limitDecimalsF = (value) => {
    return value && parseInt(value)
  };
  return (
    <DrawerForm
      onVisibleChange={setVisible}
      // title={!record?.id?'新建活动':copy?'复制活动':'活动详情'}
      visible={visible}
      width={1500}
      form={form}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        onClose: () => {
          onClose();
        }
      }}
      submitter={{
        render: (props, defaultDoms) => {
          return [
            <Button type='primary' key='savePrevie' onClick={()=>{ props.form?.submit?.();setSavePrevie(savePrevie+1) }}>保存并预览</Button>,
            ...defaultDoms
          ];
        },
      }}
      onFinish={async (values) => {
        await onSubmit(values)
      }}
      className={styles?.special_model}
      {...formItemLayout}
    >
      <div className={styles?.three_column_layout}>
        <div className={styles?.border_box2}>
          <Title style={{ marginBottom: 10 }} level={5}>页面DIY设置</Title>
          <ProFormRadio.Group
              name="status"
              hidden
              options={[
                {
                  label: '开启',
                  value: 1,
                },
                {
                  label: '禁止',
                  value: 0,
                }
              ]}
            />
          {
            record?.id&&!copy&&<ProFormText
            name="id"
            hidden
          />
          }

          <ProFormText
            label="专题标题"
            name="name"
            rules={[{ required: true, message: '请输入专题名称' }]}
            placeholder='请输入专题名称'
          />
          <ProFormDateTimeRangePicker
            label='活动时间'
            rules={[{ required: true, message: '请选择活动时间' }]}
            name="dateRange"
            fieldProps={{
              disabledDate: (current) => disabledDate(current)
            }}
            placeholder={[
              formatMessage({
                id: 'formandbasic-form.placeholder.start',
              }),
              formatMessage({
                id: 'formandbasic-form.placeholder.end',
              }),
            ]}
          />
          <Title style={{ marginBottom: 10 }} level={5}>页面预览</Title>
          {
            !savePrevie2&&<iframe src={record?.copyUrl} style={{width:'375px',height:'667px'}}></iframe>
          }
          {
            savePrevie2&&<iframe src={record?.copyUrl} style={{width:'375px',height:'667px'}}></iframe>
          }
        </div>
        <div className={styles?.border_box}>
          <div className={styles?.interval}>
            <Form.Item
              label="页面主图"
              name="bannerImgUrl"
              rules={[{ required: true, message: '请上传页面主图' }]}
            >
              <FromWrap
                content={(value, onChange) => <Upload multiple value={value}  onChange={onChange} size={2 * 1024} dimension={{ width: 750 ,height: 500}} maxCount={1} accept="image/png" />}
                right={(value) => {
                  return (
                    <dl>
                      <dd>支持jpg/png，2M以内，宽度750px，高度500px</dd>
                    </dl>
                  )
                }}
              />
            </Form.Item>
          </div>
          <div className={styles?.interval}>
            <ProFormSwitch name="switch1" label={<span style={{fontWeight:'bolder'}}>活动倒计时显示</span>}/>
            <ProFormText
              label="倒计时控件位置"
              readonly
              fieldProps={{
                value: <>
                  <ProFormRadio.Group
                    name="xL"
                    label="X轴"
                    options={[
                      {
                        label: <div className={styles.measure}>
                                <Form.Item
                                  name="l"
                                  label={<span>左 左边距</span>}
                                >
                                  <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                                </Form.Item>
                                <span>px</span>
                              </div>,
                        value: 'L',
                      },
                      {
                        label: '中',
                        value: 'M',
                      },
                      {
                        label: <div className={styles.measure}>
                                <Form.Item
                                  name="r"
                                  label={<span>右 右边距</span>}
                                >
                                  <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                                </Form.Item>
                                <span>px</span>
                              </div>,
                        value: 'R',
                      }
                    ]}
                  />
                  <ProFormRadio.Group
                    name="yL"
                    label="Y轴"
                    options={[
                      {
                        label: <div className={styles.measure}>
                                <Form.Item
                                  name="t"
                                  label={<span>上 顶边距</span>}
                                >
                                  <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                                </Form.Item>
                                <span>px</span>
                              </div>,
                        value: 'T',
                      },
                      {
                        label: '中',
                        value: 'M',
                      },
                      {
                        label: <div className={styles.measure}>
                                <Form.Item
                                  name="b"
                                  label={<span>下 底边距</span>}
                                >
                                  <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                                </Form.Item>
                                <span>px</span>
                              </div>,
                        value: 'B',
                      }
                    ]}
                  />
                </>
              }}
              extra='画布宽度基于375px'
            />
            <Form.Item label='倒计时控件背景颜色' name='alphaMasked'>
              <ReactColor/>
            </Form.Item>
          </div>
          <div className={styles?.interval}>
            <ProFormSwitch name="switch2" label={<span style={{fontWeight:'bolder'}}>显示副标题</span>}/>
            <Form.Item
              label="副标题图片"
              name="imgUrl1"
            >
              <FromWrap
                content={(value, onChange) => <Upload multiple value={value} onChange={onChange} size={2 * 1024} dimension={{ width: 750,height: 500 }} maxCount={1} accept="image/png" />}
                right={(value) => {
                  return (
                    <dl>
                      <dd>支持jpg/png，2M以内，宽度750</dd>
                    </dl>
                  )
                }}
              />
            </Form.Item>
          </div>
          <div style={{ paddingTop:'10px' }}>
            <Title style={{ marginLeft: 100 }} level={5}>商品列表设置：</Title>
            <ProFormRadio.Group
              name="showType"
              layout="horizontal"
              label="展示形式"
              initialValue={1}
              options={[
                {
                  label: '单排',
                  value: 1,
                },
                {
                  label: '双排',
                  value: 2,
                }
              ]}
            />
            <Space style={{marginLeft:'110px'}}>
              <Form.Item labelCol={3} wrapperCol={10} name='color1' label="卡片边框颜色">
                <ReactColor/>
              </Form.Item>
              <Form.Item labelCol={3} wrapperCol={10} name="lineWidth1" label="卡片边框线宽">
                <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
              </Form.Item>
              <Form.Item labelCol={3} wrapperCol={10} name="radius" label='卡片圆角'>
                <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
              </Form.Item>
            </Space>
            <div className={styles.measure} style={{marginLeft:'110px'}}>
              <Form.Item labelCol={3} wrapperCol={10} name='color2' label="卡片背景颜色">
                <ReactColor/>
              </Form.Item>
              <Form.Item
                name="imgUrl2"
                style={{marginLeft:'50px'}}
              >
                <FromWrap
                  content={(value, onChange) => <Upload multiple value={value}  onChange={onChange} size={2 * 1024} dimension={{ width: 750,height: 500 }} maxCount={1} accept="image/png" />}
                  right={(value) => {
                    return (
                      <dl>
                        <dd>支持jpg/png，2M以内，宽度750</dd>
                      </dl>
                    )
                  }}
                />
              </Form.Item>
            </div>
            <Space style={{marginLeft:'140px'}}>
              <Form.Item labelCol={3} wrapperCol={10} name='color3' label="文字颜色">
                <ReactColor/>
              </Form.Item>
              <Form.Item labelCol={3} wrapperCol={10} name="fontSize" label="文字大小" style={{marginLeft:'10px'}}>
                <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
              </Form.Item>
            </Space>
            <Space style={{marginLeft:'140px'}}>
              <Form.Item name="goodsRadius" label='商品圆角' labelCol={3} wrapperCol={10}>
                <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
              </Form.Item>
              <Form.Item name="lineWidth2" label='边框'>
                  <FromWrap
                    content={(value, onChange) => <Upload multiple value={value}  onChange={onChange} size={2 * 1024} dimension={{ width: 750,height: 500 }} maxCount={1} accept="image/png" />}
                    right={(value) => {
                      return (
                        <dl>
                          <dd>支持jpg/png，2M以内，宽度750</dd>
                        </dl>
                      )
                    }}
                  />
              </Form.Item>
            </Space>
            <Form.Item name='color4' label='页面背景颜色'>
              <ReactColor/>
            </Form.Item>
          </div>
        </div>
      </div>
      <Associated0Goods detailList={detailList} id={record?.id} callback={(data)=>{
        setDetailList(data)
      }}/>
    </DrawerForm>
  )
}