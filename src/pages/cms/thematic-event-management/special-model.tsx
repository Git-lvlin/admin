import { useState } from 'react'
import moment from 'moment'
import { formatMessage } from 'umi';
import { Button, Space, Typography,Skeleton, Form, InputNumber } from 'antd'
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

export default props => {
  const { visible, setVisible, callback, id, onClose } = props;
  const [form] = Form.useForm();
  const [picture, setPicture] = useState<number>()
  const onSubmit = (values) => {
    console.log('values', values)
  }
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  }
  const limitDecimalsF = (value) => {
    return value && parseInt(value)
  };
  return (
    <DrawerForm
      onVisibleChange={setVisible}
      title='活动详情'
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
      className={styles?.thematic_event_management}
      {...formItemLayout}
    >
      <div className={styles?.three_column_layout}>
        <div className={styles?.border_box}>
          <Title style={{ marginBottom: 10 }} level={5}>基础设置</Title>
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
            name="bannerImage1"
            style={{ display: picture == 1 ? 'block' : 'none' }}
          >
            <FromWrap
              content={(value, onChange) => <Upload multiple value={value} proportion={{ width: 750 }} onChange={onChange} size={2 * 1024} maxCount={1} accept="image/*" />}
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
                    name="radio-vertical1"
                    label="X轴"
                    options={[
                      {
                        label: '左',
                        value: 1,
                      },
                      {
                        label: '中',
                        value: 2,
                      },
                      {
                        label: '右',
                        value: 3,
                      }
                    ]}
                  />
                  <ProFormRadio.Group
                    name="radio-vertical"
                    label="Y轴"
                    options={[
                      {
                        label: '上',
                        value: 1,
                      },
                      {
                        label: '中',
                        value: 2,
                      },
                      {
                        label: '下',
                        value: 3,
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
                      name="tierEnd1"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>左侧</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="tierEnd2"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>顶部</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="tierEnd3"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>右侧</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="tierEnd4"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>底部</p>
                  </div>
                </Space>
              }}
            />
            <Form.Item label='透明遮罩' name='color'>
              <ReactColor onChange={(val) => { console.log('val', val) }} />
            </Form.Item>
          </div>
          <div style={{ display: picture == 3 ? 'block' : 'none' }}>
            <ProFormSwitch name="switch2" label="开关控制" />
            <Form.Item
              label="选择图片"
              name="bannerImage2"
            >
              <FromWrap
                content={(value, onChange) => <Upload multiple value={value} onChange={onChange} size={2 * 1024} maxCount={1} accept="image/*" />}
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
              name="radio-vertical"
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
              name="radio-vertical"
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
                    <Form.Item>
                      <ReactColor onChange={(val) => { console.log('val', val) }} />
                    </Form.Item>
                    <p>颜色</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="tierEnd2"
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
                    <Form.Item>
                      <ReactColor onChange={(val) => { console.log('val', val) }} />
                    </Form.Item>
                    <p>颜色</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="bannerImage1"
                    >
                      <Upload multiple proportion={{ width: 750 }} size={2 * 1024} maxCount={1} accept="image/*" />
                    </Form.Item>
                    <p>图片</p>
                  </div>
                </Space>
              }}
            />
            <Form.Item
              name="tierEnd2"
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
                    <Form.Item>
                      <ReactColor onChange={(val) => { console.log('val', val) }} />
                    </Form.Item>
                    <p>颜色</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="tierEnd2"
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
                    <Form.Item>
                      <ReactColor onChange={(val) => { console.log('val', val) }} />
                    </Form.Item>
                    <p>颜色</p>
                  </div>
                  <div className={styles.measure}>
                    <Form.Item
                      name="tierEnd2"
                    >
                      <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
                    </Form.Item>
                    <p>线宽</p>
                  </div>
                </Space>
              }}
            />
            <Form.Item
              name="tierEnd2"
              label='商品圆角'
            >
              <InputNumber min="0" formatter={limitDecimalsF} placeholder="_______" bordered={false} />
            </Form.Item>
          </div>
        </div>
      </div>
      <Associated0Goods />
    </DrawerForm>
  )
}