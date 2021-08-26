import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Button, Space, Modal } from 'antd';
import { getCommonList, statusSwitch, detailExt, delSupplier, resetPwd } from '@/services/supplier-management/supplier-list'
import { history } from 'umi';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import BasicInfo from './basic-info';
import AccountInfo from './account-info';
import DisableModal from './disable-modal';
import BankCard from './bind-card';

const { confirm } = Modal;

const TableList = () => {
  const [basicInfoVisible, setBasicInfoVisible] = useState(false);
  const [accountInfoVisible, setAccountInfoVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bandCardVisible, setBandCardVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [disableModalVisible, setDisableModalVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const actionRef = useRef();

  const switchStatus = (reason) => {
    statusSwitch({
      supplierId: selectItem.id,
      type: selectItem.status === 1 ? 2 : 1,
      reason,
    }, { showSuccess: true, }).then(res => {
      if (res.code === 0) {
        actionRef.current.reload();
      }
    })
  }

  const getDetail = (id, type) => {
    detailExt({
      supplierId: id
    }).then(res => {
      if (res.code === 0) {
        setDetailData({
          ...res.data.records,
        })
        if (type === 1) {
          setBasicInfoVisible(true)
        } else if (type === 2) {
          setAccountInfoVisible(true)
        } else {
          setBandCardVisible(true)
        }
      }
    })
  }

  const deleteSup = (supplierId) => {
    confirm({
      title: '确认要删除已创建的供应商么？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        delSupplier({
          supplierId
        }, { showSuccess: true, }).then(res => {
          if (res.code === 0) {
            actionRef.current.reload();
          }
        })
      }
    });
  }

  const pwdReset = () => {
    resetPwd({
      supplierId: selectItem.id
    }, { showSuccess: true }).then(res => {
      if (res.code === 0) {
        setIsModalVisible(false);
        setSelectItem(null)
      }
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      width: 70,
    },
    {
      title: '供应商家名称',
      dataIndex: 'companyName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商家名称'
      },
      width: 200,
    },
    {
      title: '供应商家ID',
      dataIndex: 'supplierId',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入供应商家ID'
      },
      hideInTable: true,
    },
    {
      title: '登录账号',
      dataIndex: 'accountName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入登录账号'
      },
      width: 200,
    },
    {
      title: '负责人',
      dataIndex: 'companyUserName',
      valueType: 'text',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: '禁用',
        1: '启用'
      },
      width: 50,
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      valueType: 'text',
      hideInSearch: true,
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      hideInSearch: true,
      width: 150,
    },
    {
      title: '子账号',
      dataIndex: 'subAccountTotal',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return <a onClick={() => { history.push(`/supplier-management/supplier-sub-account/${data.bindAccountId}`) }}>{_}</a>
      },
      width: 80,
    },
    {
      title: '资金账户审核状态',
      dataIndex: 'auditStatus',
      valueType: 'text',
      hideInTable: true,
      valueEnum: {
        0: '待提交',
        1: '开户成功',
        2: '待审核',
        3: '开户失败',
        4: '待开户',
        5: '审核拒绝'
      },
      width: 200,
      ellipsis: true,
    },
    {
      title: '审核开户状态',
      dataIndex: 'auditStatus',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        return (
          <>
            <div>
              {
                {
                  0: '待提交',
                  1: '开户成功',
                  2: '待审核',
                  3: '开户失败',
                  4: '待开户',
                  5: '审核拒绝'
                }[_]
              }
            </div>
            {!!data.auditReason && <div style={{ color: 'red' }}>{data.auditReason}</div>}
          </>
        )
      }
    },
    {
      title: '绑卡状态',
      dataIndex: 'bankStatus',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => {
        if (_ === 1) {
          return '已绑卡'
        }

        if (_ !== 1 && data.auditStatus === 1) {
          return <a onClick={() => { getDetail(data.id, 3) }}>未绑卡</a>
        }

        if (_ === 0) {
          return '未绑卡'
        }
      },
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, data) => (
        <Space>
          {data.status === 1 && <a onClick={() => { setSelectItem(data); setDisableModalVisible(true) }}>禁用</a>}
          {data.status === 0 && <a onClick={() => { setSelectItem(data); setDisableModalVisible(true) }}>启用</a>}
          {/* <a onClick={() => { history.push(`/supplier-management/supplier-detail/${data.id}`) }}>详情</a> */}
          <a onClick={() => { getDetail(data.id, 1) }}>基本信息</a>
          {data.accountSwitch === 1 && <a onClick={() => { getDetail(data.id, 2) }}>开户信息</a>}
          {data.isAllowDel === 1 && <a onClick={() => { deleteSup(data.id) }}>删除</a>}
          <a onClick={() => { history.push(`/supplier-management/after-sale-address/${data.id}`) }}>售后地址</a>
          <a onClick={() => { setSelectItem(data); setIsModalVisible(true) }}>重置密码</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        request={getCommonList}
        style={{
          minWidth: '1400px'
        }}
        search={{
          defaultCollapsed: false,
          labelWidth: 130,
          optionRender: ({ searchText, resetText }, { form }) => [
            <Button
              key="search"
              type="primary"
              onClick={() => {
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            <Button
              key="rest"
              onClick={() => {
                form?.resetFields();
              }}
            >
              {resetText}
            </Button>,
            <Button key="out" type="primary" onClick={() => { setBasicInfoVisible(true) }}>新建</Button>,
          ],
        }}
        columns={columns}
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
        }}
        scroll={{ x: '85vw' }}
      />
      {basicInfoVisible && <BasicInfo
        visible={basicInfoVisible}
        setVisible={setBasicInfoVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { setDetailData(null) }}
      />}
      {accountInfoVisible && <AccountInfo
        visible={accountInfoVisible}
        setVisible={setAccountInfoVisible}
        detailData={detailData}
        callback={() => { actionRef.current.reload(); setDetailData(null) }}
        onClose={() => { setDetailData(null) }}
      />}

      {disableModalVisible &&
        <DisableModal
          visible={disableModalVisible}
          setVisible={setDisableModalVisible}
          data={selectItem}
          callback={(v) => { switchStatus(v) }}
        />}

      {
        bandCardVisible
        &&
        <BankCard
          detailData={detailData}
          setVisible={setBandCardVisible}
          callback={() => { actionRef.current.reload(); setDetailData(null) }}
        />
      }

      <Modal
        title={`请确认要重置供应商家：${selectItem?.companyName}（账号：${selectItem?.accountName}）的登录密码？`}
        visible={isModalVisible}
        onOk={() => { pwdReset() }}
        onCancel={() => { setIsModalVisible(false) }}
      >
        <p>注意：重置密码后，新密码将立即生效，原密码无法继续使用！</p>
        <p style={{ fontSize: 12 }}>重置密码将同步发送给供应商</p>
      </Modal>
    </>

  );
};

export default TableList;
