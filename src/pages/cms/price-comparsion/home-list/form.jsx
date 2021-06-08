import React, { useRef, useState, useEffect  } from 'react';
import { Button, message, Form, Space } from 'antd';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import MemberReg from '@/components/member-reg';
import Upload from '@/components/upload';
import { hotGoosAdd } from '@/services/cms/member/member';
import {spaceInfoList, hotGoosList, goosAllList} from '@/services/cms/member/member';
import Edit from './list-form'

export default (props) => {
  const [formVisible, setFormVisible] = useState(false);
  const { detailData, setVisible, onClose, visible } = props;
  const [arr, setArr] = useState(null)
  const formRef = useRef();
  const columns = [
    {
      title: '图片',
      key: 'goodsImageUrl',
      dataIndex: 'goodsImageUrl',
      render: (text) => <img src={text} width={90} height={90} />,
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      search: false,
    },
    {
      title: '排序',
      dataIndex: '',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      dataIndex: 'option',
      render: (text, record, _, action) => {
        return (
          <>
            &nbsp;&nbsp;{record.status===1&&<a key="editable" onClick={() => {}}>修改</a>}
            &nbsp;&nbsp;{record.status===1&&<a key="d">删除</a>}
          </>
        )
      }
    },
  ];

  const waitTime = (values) => {
    const { ...rest } = values
  
    const param = {
      spuIds: arr,
      ...rest
    }
    return new Promise((resolve) => {
      hotGoosAdd(param).then((res) => {
        if (res.code === 0) {
          resolve(true);
        }
      })
  
    });
  };

  useEffect(() => {

  }, [])

  return (
    <DrawerForm
      title={`选择比较商品`}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      submitter={{
        searchConfig: {
          submitText: '保存',
          resetText: '取消',
        },
      }}
      onFinish={async (values) => {
        await waitTime(values);
        message.success('提交成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
<ProTable
      rowKey="id"
      options={false}
      columns={columns}
      request={goosAllList}
      editable={{
        type: 'multiple',
      }}
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
      dateFormatter="string"
      search={false}
      toolBarRender={(_,record) => [
        <Button key="button" type="primary" onClick={() => { setFormVisible(true) }}>
          选择比价商品
        </Button>,
      ]}
    />
{formVisible && <Edit
      visible={formVisible}
      setVisible={setFormVisible}
      // detailData={detailData}
      callback={() => { actionRef.current.reload() }}
      onClose={() => { actionRef.current.reload() }}
    />}

    </DrawerForm>
  );
};