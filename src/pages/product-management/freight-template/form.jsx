import React from 'react';
import ProCard from '@ant-design/pro-card';
import { Select, Form, Input, Drawer, Button } from 'antd';
import styles from './style.less';

const { Option } = Select;


const children = [];

for (let i = 10; i < 36; i += 1) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}

export default (props) => {

  const { onClose, visible } = props;

  const change = (changedValues, allValues) => {
    console.log(changedValues)
    console.log(allValues)
  }

  return (
    <Drawer
      title="模板编辑"
      width={1200}
      placement="right"
      onClose={onClose}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }}>
            返回
          </Button>
          <Button type="primary">
            确定
          </Button>
        </div>
      }
    >
      <Form
        onValuesChange={change}
        initialValues={{
          users: [
            {
              area1: 1,
              area2: 2,
            },
          ],
        }}
      >
        <Form.Item
          name="name"
          label="模板名称"
          placeholder="请输入模板名称"
          rules={[{ required: true, message: '请输入模板名称' }]}
        >
          <Input style={{ width: 300 }} />
        </Form.Item>
        <Form.Item
          name="name"
          label="运费设置"
          rules={[{ required: true }]}
        />
        <ProCard split="horizontal" bordered headerBordered>
          <ProCard split="vertical" className={styles.header}>
            <ProCard colSpan="85px" className={styles.card}>配送类型</ProCard>
            <ProCard colSpan="140px" className={styles.card}>运费应用地区</ProCard>
            <ProCard className={styles.card}>运费配置</ProCard>
            <ProCard colSpan="140px" className={styles.card}>包邮条件</ProCard>
            <ProCard colSpan="140px" className={styles.card}>操作</ProCard>
          </ProCard>
          <ProCard split="vertical" className={styles.normal}>
            <ProCard colSpan="85px" className={styles.card}>除指定地区外，其余地区的运费采用“默认运费”</ProCard>
            <ProCard className={styles.normal} split="horizontal">
              <Form.List name="users">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => {
                      return (
                        <ProCard
                          key={key}
                          className={styles.normal}
                          split="vertical"
                          style={{ flex: 1, borderBottom: key !== fields.length - 1 ? '1px solid #f0f0f0' : '' }}
                        >
                          <ProCard colSpan="140px" className={styles.card}>
                            {
                              key === 0
                                ?
                                '默认'
                                :
                                <Form.Item
                                  style={{ marginBottom: 0, width: '100%' }}
                                  {...restField}
                                  name={[name, 'area1']}
                                  fieldKey={[fieldKey, 'area1']}
                                >
                                  <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="选择指定地区"
                                    onChange={handleChange}
                                  >
                                    {children}
                                  </Select>
                                </Form.Item>
                            }
                          </ProCard>
                          <ProCard className={styles.normal} split="horizontal">
                            <ProCard className={styles.card} style={{ flex: 1 }}>
                              <Form.Item
                                style={{ marginBottom: 0 }}
                                {...restField}
                                name={[name, 'area1']}
                                fieldKey={[fieldKey, 'area1']}
                              >
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;件内运费共&nbsp;
                              <Form.Item
                                style={{ marginBottom: 0 }}
                                {...restField}
                                name={[name, 'area2']}
                                fieldKey={[fieldKey, 'area2']}
                              >
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;元，每增加&nbsp;
                              <Form.Item name="area3" style={{ marginBottom: 0 }}>
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;件，增加运费&nbsp;
                              <Form.Item name="area4" style={{ marginBottom: 0 }}>
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;元
                            </ProCard>
                            <ProCard className={styles.card} style={{ flex: 1 }}>
                              金额在&nbsp;
                              <Form.Item name="area5" style={{ marginBottom: 0 }}>
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;元内运费共&nbsp;
                              <Form.Item name="area6" style={{ marginBottom: 0 }}>
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;元，每增加&nbsp;
                              <Form.Item name="area7" style={{ marginBottom: 0 }}>
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;元，增加运费&nbsp;
                              <Form.Item name="area8" style={{ marginBottom: 0 }}>
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;元
                            </ProCard>
                          </ProCard>
                          <ProCard colSpan="140px" className={styles.normal} split="horizontal">
                            <ProCard className={styles.card} style={{ flex: 1 }}>
                              满&nbsp;
                              <Form.Item name="area9" style={{ marginBottom: 0 }}>
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;件包邮
                            </ProCard>
                            <ProCard className={styles.card} style={{ flex: 1 }}>
                              满&nbsp;
                              <Form.Item name="area10" style={{ marginBottom: 0 }}>
                                <Input style={{ width: 50 }} />
                              </Form.Item>
                              &nbsp;元包邮
                            </ProCard>
                          </ProCard>
                          <ProCard colSpan="140px" className={styles.card}>
                            {
                              key === 0 ? <a onClick={() => { add() }}>为指定地区设置<br />运费和指定包邮条件</a> : <a onClick={() => { remove(name) }}>删除</a>
                            }
                          </ProCard>
                        </ProCard>
                      )
                    })}
                  </>
                )}
              </Form.List>

            </ProCard>

          </ProCard>

          <ProCard split="vertical" className={styles.normal}>
            <ProCard colSpan="85px" className={styles.card}>不配送地区</ProCard>
            <ProCard className={styles.card}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '50%' }}
                placeholder="选择指定不配送地区"
                onChange={handleChange}
              >
                {children}
              </Select>
            </ProCard>
          </ProCard>

          <ProCard split="vertical" className={styles.normal}>
            <ProCard colSpan="85px" className={styles.card}>用户说明</ProCard>
            <ProCard className={styles.card}>
              XXX地区不配送；<br />
              YYY地区满M件/元包邮，不满M件/元时Q件/元内H元，每增加P件/元增加/减少L元；<br />
              其他地区满N件/元包邮，不满M件/元时Q件/元内H元，每增加P件/元增加/减少L元；<br />
            </ProCard>
          </ProCard>
        </ProCard>
      </Form>
    </Drawer>

  );
};