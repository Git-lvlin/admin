import React, { useState, useRef } from 'react';
import { DatePicker, Input, Form, Divider, message,Button,Space,Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable,{ EditableProTable,ActionType } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';
import ProForm, {
    StepsForm,
    ProFormText,
    ProFormDatePicker,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormCheckbox,
    ProFormDigit,
  } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { couponList } from '@/services/coupon-management/coupon-list';
import DeleteModal from '@/components/DeleteModal'
import { history} from 'umi';


const waitTime = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

const TagList = ({ value, onChange }) => {
    const ref = useRef(null);
    const [newTags, setNewTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleInputConfirm = () => {
      let tempsTags = [...(value || [])];
      if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
        tempsTags = [...tempsTags, { key: `new-${tempsTags.length}`, label: inputValue }];
      }
      onChange?.(tempsTags);
      setNewTags([]);
      setInputValue('');
    };
  
    return (
      <Space>
        {(value || []).concat(newTags).map((item) => (
          <Tag key={item.key}>{item.label}</Tag>
        ))}
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      </Space>
    );
  };

export default (props) =>{
  const [visible, setVisible] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const ref=useRef()
  
  const columns= [
    {
      title: '选项',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: '30%',
    },
    {
      title: '范围',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '不包含',
          status: 'Error',
        },
        closed: {
          text: '包含',
          status: 'Success',
        },
      },
    },
    {
      title: '条件',
      dataIndex: 'labels',
      width: '20%',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      renderFormItem: (_, { isEditable }) => {
        return isEditable ? <TagList /> : <Input />;
      },
      render: (_, row) => row?.labels?.map((item) => <Tag key={item.key}>{item.label}</Tag>),
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a 
          key="editable"
          // onClick={() => {
          //   action?.startEditable?.(record.id);
          // }}
        >
          删除
        </a>
      ],
    },
  ];
  return (
      <>
        <ProCard
          title="基础设置"
          bordered
          headerBordered
          collapsible
          style={{
          minWidth: 800,
          maxWidth: '100%',
          }}
        >
          <ProFormText
            name="name"
            width="200px"
            label="群体名称"
            placeholder="请输入名称"
            rules={[
              { required: true, message: '请输入群体名称' },
              { validator:(rule,value,callback)=>{
                return new Promise(async (resolve, reject) => {
                if(value&&value.length>20){
                  await reject('群体名称不超过20个字符')
                }else {
                    await resolve()
                }
              })
              }}
            ]}
          />
        </ProCard>
        <ProCard
            title="选项设置"
            bordered
            headerBordered
            collapsible
            style={{
                minWidth: 800,
                maxWidth: '100%',
            }}
            >
            <h3 style={{background:'#fafafa',padding:'10px',color:'#ccc'}}>会员基本信息</h3>
            <Button 
              type="primary"  
              onClick={() => {
                ref.current?.addEditRecord?.({
                id: (Math.random() * 1000000).toFixed(0),
                title: '会员等级',
                });
                }} 
              style={{margin:"20px 0 20px 0"}}
              >
                会员等级
              </Button>
            <h3 style={{background:'#fafafa',padding:'10px',color:'#ccc'}}>会员消费情况</h3>
            <Button
             type="primary"
             onClick={() => {
                ref.current?.addEditRecord?.({
                id: (Math.random() * 1000000).toFixed(0),
                title: '消费次数',
                });
            }}
             >消费次数</Button>
            <Button 
            type="primary"
            style={{margin:"20px"}}
            onClick={() => {
                ref.current?.addEditRecord?.({
                id: (Math.random() * 1000000).toFixed(0),
                title: '累计消费',
                });
            }}
            >累计消费</Button>
        </ProCard>
        <ProCard
            title="群体设置"
            bordered
            headerBordered
            collapsible
            style={{
              minWidth: 800,
              maxWidth: '100%',
              marginTop:'20px'
            }}
          >
            <EditableProTable
                actionRef={ref}
                rowKey="id"
                options={false}
                recordCreatorProps={false}
                // params={{
                // status: 1,
                // }}
                value={dataSource}
                onChange={setDataSource}
                // request={async () => ({
                //     data: defaultData,
                //     total: 3,
                //     success: true,
                //   })}
                editable={{
                    form,
                    editableKeys,
                    onSave: async () => {
                        await waitTime(2000);
                    },
                    onChange: setEditableRowKeys,
                    actionRender: (row, config, dom) => [dom.save, dom.cancel],
                }}
                search={false}
                columns={columns}
            />
        </ProCard>
      
    </>
  )
}
