import { useState,useEffect } from 'react'
import moment from 'moment'
import { formatMessage } from 'umi';
import { Button, Space, Typography,Skeleton, Form, InputNumber,message } from 'antd'
import ProForm, {
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
  const { visible, setVisible, callback, id, onClose,copy } = props;
  const [form] = Form.useForm();
  const [picture, setPicture] = useState<number>()
  const [detailList,setDetailList]=useState<DetailListItem>()
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
    saveSubjectActiveConfig(params).then(res=>{
      if(res.code==0){
        setVisible(false)
        callback()
        if(id&&!copy){
          message.success('编辑成功')
        }else if(copy){
          message.success('复制成功')
        }else{
          message.success('新增成功')
        }
      }
    })
  }
  useEffect(()=>{
    if(id){
      getActiveConfigById({id}).then(res=>{
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
  },[id])
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  }
  const limitDecimalsF = (value) => {
    return value && parseInt(value)
  };
  return (
    <DrawerForm
      onVisibleChange={setVisible}
      title={!id?'新建活动':copy?'复制活动':'活动详情'}
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
        <div className={styles?.border_box}>
          <Title style={{ marginBottom: 10 }} level={5}>基础设置</Title>
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
            id&&!copy&&<ProFormText
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
        </div>
        <div className={styles?.border_box}>
          <Title style={{ marginBottom: 10 }} level={5}>组件设置</Title>
          <div className={styles?.topic_page}>
            <header className={styles?.header} onClick={() => { setPicture(1) }}>
              <p>点击配置图片</p>
              <Button onClick={(e) => { setPicture(2); e.stopPropagation() }}>倒计时控件</Button>
            </header>
            <figure className={styles?.figure} onClick={() => { setPicture(3) }}>
              副标题图
            </figure>
            <aside className={styles?.aside} onClick={() => { setPicture(5) }}>
              <section className={styles?.section}>
                <Skeleton.Image />
                <div className={styles?.section_goos}>
                  <p>商品名称商品名称<br />商品名称</p>
                  <figure className={styles?.figure} onClick={(e) => { setPicture(4); e.stopPropagation() }}> 价格标签 </figure>
                </div>
              </section>
              <article className={styles?.article}>
                <div className={styles?.article_goos}>
                  <Skeleton.Image />
                  <p>商品名称商品名称<br />商品名称</p>
                  <Button onClick={(e) => { setPicture(4); e.stopPropagation() }}> 价格标签 </Button></div>
                <div className={styles?.article_goos}>
                  <Skeleton.Image />
                  <p>商品名称商品名称<br />商品名称...</p>
                </div>
              </article>
            </aside>
          </div>
        </div>
        <div className={styles?.border_box}>
          <Title style={{ marginBottom: 10 }} level={5}>{{ 1: '头图', 2: '倒计时控件', 3: '副标题', 4: '价格标签1', 5: '商品卡片' }[picture]}</Title>
          <Form.Item
            label="选择图片"
            name="bannerImgUrl"
            style={{ display: picture == 1 ? 'block' : 'none' }}
          >
            <FromWrap
              content={(value, onChange) => <Upload multiple value={value}  onChange={onChange} size={2 * 1024} dimension={{ width: 750 ,height:'*'}} maxCount={1} accept="image/png" />}
              right={(value) => {
                return (
                  <dl>
                    <dd>支持jpg/png，2M以内，宽度750</dd>
                  </dl>
                )
              }}
            />
          </Form.Item>
          <div style={{ display: picture == 2 ? 'block' : 'none' }}>
            <ProFormSwitch name="switch1" label="开关控制" />
            <ProFormText
              label="控件位置"
              readonly
              fieldProps={{
                value: <>
                  <ProFormRadio.Group
                    name="xL"
                    label="X轴"
                    options={[
                      {
                        label: '左',
                        value: 'L',
                      },
                      {
                        label: '中',
                        value: 'M',
                      },
                      {
                        label: '右',
                        value: 'R',
                      }
                    ]}
                  />
                  <ProFormRadio.Group
                    name="yL"
                    label="Y轴"
                    options={[
                      {
                        label: '上',
                        value: 'T',
                      },
                      {
                        label: '中',
                        value: 'M',
                      },
                      {
                        label: '下',
                        value: 'B',
                      }
                    ]}
                  />
                </>
              }}
            />
            <ProFormText
              label="边距"
              readonly
              fieldProps={{
                value: <Space>
                  <div className={styles.measure}>
                    <Form.Item
                      name="l"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>左侧</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="t"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>顶部</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="r"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>右侧</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="b"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>底部</p>
                  </div>
                </Space>
              }}
            />
            <Form.Item label='透明遮罩' name='alphaMasked'>
              <ReactColor/>
            </Form.Item>
          </div>
          <div style={{ display: picture == 3 ? 'block' : 'none' }}>
            <ProFormSwitch name="switch2" label="开关控制" />
            <Form.Item
              label="选择图片"
              name="imgUrl1"
            >
              <FromWrap
                content={(value, onChange) => <Upload multiple value={value} onChange={onChange} size={2 * 1024} maxCount={1} accept="image/png" />}
                right={(value) => {
                  return (
                    <dl>
                      <dd>支持jpg/png，2M以内</dd>
                    </dl>
                  )
                }}
              />
            </Form.Item>
          </div>
          <div style={{ display: picture == 4 ? 'block' : 'none' }}>
            <ProFormRadio.Group
              name="priceStyle"
              layout="vertical"
              label="标签样式"
              options={[
                {
                  label: '风格1：明黄箭头',
                  value: 1,
                },
                {
                  label: '风格2：大红',
                  value: 2,
                },
                {
                  label: '风格3：3C电子风',
                  value: 3,
                },
                {
                  label: '风格4：黄色圆角',
                  value: 4,
                },
              ]}
            />
          </div>
          <div style={{ display: picture == 5 ? 'block' : 'none' }}>
            <ProFormRadio.Group
              name="showType"
              layout="horizontal"
              label="展示形式"
              options={[
                {
                  label: '一行一个',
                  value: 1,
                },
                {
                  label: '一行两个',
                  value: 2,
                }
              ]}
            />
            <ProFormText
              label="卡片边框"
              readonly
              fieldProps={{
                value: <Space>
                  <div className={styles.measure}>
                    <Form.Item name='color1'>
                      <ReactColor/>
                    </Form.Item>
                    <p>颜色</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="lineWidth1"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>线宽</p>
                  </div>
                </Space>
              }}
            />
            <ProFormText
              label="卡片背景"
              readonly
              fieldProps={{
                value: <Space>
                  <div className={styles.measure}>
                    <Form.Item name='color2'>
                      <ReactColor/>
                    </Form.Item>
                    <p>颜色</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="imgUrl2"
                    >
                      <Upload multiple  size={2 * 1024} maxCount={1} accept="image/png" />
                    </Form.Item>
                    {/* <p>图片</p> */}
                  </div>
                </Space>
              }}
            />
            <Form.Item
              name="radius"
              label='卡片圆角'
            >
              <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
            </Form.Item>
            <ProFormText
              label="文字样式"
              readonly
              fieldProps={{
                value: <Space>
                  <div className={styles.measure}>
                    <Form.Item name='color3'>
                      <ReactColor/>
                    </Form.Item>
                    <p>颜色</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="fontSize"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>字号</p>
                  </div>
                </Space>
              }}
            />
            <ProFormText
              label="商品边框"
              readonly
              fieldProps={{
                value: <Space>
                  <div className={styles.measure}>
                    <Form.Item name='color4'>
                      <ReactColor/>
                    </Form.Item>
                    <p>颜色</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="lineWidth2"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>线宽</p>
                  </div>
                </Space>
              }}
            />
            <Form.Item
              name="goodsRadius"
              label='商品圆角'
            >
              <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
            </Form.Item>
          </div>
        </div>
      </div>
      <Associated0Goods detailList={detailList} id={id} callback={(data)=>{
        setDetailList(data)
      }}/>
    </DrawerForm>
  )
}