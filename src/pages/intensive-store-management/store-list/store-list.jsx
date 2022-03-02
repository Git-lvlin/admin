import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Tooltip } from 'antd';
import ProTable from '@ant-design/pro-table';
import ProCard from '@ant-design/pro-card';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-layout';
import { getStoreList } from '@/services/intensive-store-management/store-list';
import { history } from 'umi';
import AddressCascader from '@/components/address-cascader';
import Auth from '@/components/auth';
import Form from './form';
import Create from './create';
import Return from './return';
import ExcelModal from './excel-modal'
import GradeChange from './grade-change'
import Export from '@/pages/export-excel/export'
import ExportHistory from '@/pages/export-excel/export-history'
import { amountTransform } from '@/utils/utils'
import Detail from './detail';
import AuditInfo from './audit-info';

const StoreList = (props) => {
  const { storeType } = props
  const [formVisible, setFormVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [returnVisible, setReturnVisible] = useState(false);
  const [excelVisible, setExcelVisible] = useState(false);
  const [selectItem, setSelectItem] = useState(null);
  const [visit, setVisit] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false);
  const [auditInfoVisible, setAuditInfoVisible] = useState(false);
  const actionRef = useRef();
  const formRef = useRef();

  const columns = [
    {
      title: '店铺ID',
      dataIndex: 'id',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺ID'
      }
    },
    // {
    //   title: '店铺图片',
    //   dataIndex: 'storeLogo',
    //   valueType: 'text',
    //   hideInSearch: true,
    //   render: (_) => <img src={_} width="50" height="50" />
    // },
    {
      title: '店主手机号',
      dataIndex: 'memberPhone',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店主手机号'
      },
      hideInTable: true,
    },
    {
      title: '店主',
      dataIndex: 'phone',
      valueType: 'text',
      hideInSearch: true,
      render: (_, data) => <div><div>{data.memberPhone}</div><div>{data.nickname === data.memberPhone ? '' : data.nickname}</div></div>
    },
    {
      title: '店铺名称',
      dataIndex: 'storeName',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入店铺名称'
      }
    },
    {
      title: '等级',
      dataIndex: ['level', 'levelName'],
      valueType: 'text',
      hideInSearch: true,
    },
    // {
    //   title: '积分',
    //   dataIndex: 'score',
    //   valueType: 'text',
    //   hideInSearch: true,
    // },
    {
      title: '提货点所在地区',
      dataIndex: '',
      valueType: 'text',
      hideInSearch: true,
      render: (_, details) => {
        return (
          <>
            {details?.areaInfo?.[details?.provinceId]}{details?.areaInfo?.[details?.cityId]}{details?.areaInfo?.[details?.regionId]}
          </>)
      }
    },
    {
      title: '提货点详细地址',
      dataIndex: 'address',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '申请类型',
      dataIndex: 'applyType',
      valueType: 'select',
      valueEnum: {
        10: '正常申请',
        20: '绿色通道申请',
      },
      hideInTable: true,
      order: -2,
    },
    {
      title: '申请类型',
      dataIndex: storeType === 'freshStores' ?'applyType':['applyType', 'code'],
      valueType: 'text',
      width: 100,
      render: (_) => _ === 10 ? '正常申请' : '绿色通道申请',
      hideInSearch: true,
    },
    {
      title: '店主收件号',
      dataIndex: 'phone',
      fieldProps: {
        placeholder: '请输入店主收件手机号'
      },
      order: -1
    },
    {
      title: '集约任务',
      dataIndex: 'wholeTotal',
      valueType: 'text',
      hideInSearch: true,
      width: 80,
      render: (_, data) => {
        return _ > 0
          ?
          <a
            onClick={() => {
              history.push({
                pathname: `/intensive-store-management/intensive-task/${data.storeNo}`,
                query: {
                  storeName: data.storeName,
                  phone: data.phone,
                  linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
                  memberId: data.memberId,
                }
              })
            }}>
            {_}
          </a>
          : _
      }
    },
    {
      title: '店内订单',
      dataIndex: 'saleOrderTotal',
      valueType: 'text',
      hideInSearch: true,
      width: 80,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shopkeeper-order/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
              }
            })
          }}>
            {_}
          </a>
          :
          _
      }
    },
    {
      title: '商品',
      dataIndex: 'productTotal',
      valueType: 'text',
      hideInSearch: true,
      width: 80,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/product-management/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
              }
            })
          }}>{_}</a>
          :
          _
      }
    },
    {
      title: '订单用户',
      dataIndex: 'userTotal',
      valueType: 'text',
      hideInSearch: true,
      width: 80,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shop-user/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
              }
            })
          }}>{_}</a>
          :
          _
      }
    },
    {
      title: '直推用户',
      dataIndex: 'shopkeeperInvitedTotal',
      valueType: 'text',
      hideInSearch: true,
      width: 80,
      render: (_, data) => {
        return _ > 0
          ?
          <a onClick={() => {
            history.push({
              pathname: `/intensive-store-management/shopkeeper-user/${data.storeNo}`,
              query: {
                storeName: data.storeName,
                phone: data.phone,
                linkman: data.nickname === data.memberPhone ? '未设置昵称' : data.nickname,
                memberId: data.memberId,
              }
            })
          }}>{_}</a>
          :
          _
      }
    },
    {
      title: '所在地区',
      dataIndex: 'area',
      hideInTable: true,
      renderFormItem: () => (<AddressCascader changeOnSelect />)
    },
    {
      title: '详情地址',
      dataIndex: 'address',
      valueType: 'text',
      fieldProps: {
        placeholder: '请输入详情地址'
      },
      hideInTable: true,
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatus',
      valueType: 'select',
      hideInSearch: storeType == 'cancelled',
      hideInTable: true,
      valueEnum: {
        "normal": '全部',
        "11": '正常-已退部分保证金',
        "12": '正常-已退全部保证金',
        "13": '正常-未退保证金',
      },
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatusDesc',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'cancelled',
      render: (_, data) => {
        const { depositRefendList } = data;
        return (
          <>
            <p>{_}</p>
            {depositRefendList && depositRefendList.map(ele => {
              return <p>{amountTransform(Number(ele.refendAmount), '/')}元（{ele.optAdminName}/{ele.refendTime}）</p>
            })}
          </>
        )
      }
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatus',
      valueType: 'select',
      hideInSearch: storeType == 'normal',
      hideInTable: true,
      valueEnum: {
        "cancelled": '全部',
        "20": '已注销-未退保证金',
        "21": '已注销-已退全部保证金',
        "22": '已注销-已退部分保证金',
      },
    },
    {
      title: '保证金状态',
      dataIndex: 'depositStatusDesc',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'normal',
      render: (_, data) => {
        const { depositRefendList } = data;
        return (
          <>
            <p>{_}</p>
            {depositRefendList && depositRefendList.map(ele => {
              return <p>{amountTransform(Number(ele.refendAmount), '/')}元（{ele.optAdminName}/{ele.refendTime}）</p>
            })}
          </>
        )
      }
    },
    {
      title: '营业状态',
      dataIndex: 'status',
      valueType: 'select',
      hideInSearch: storeType == 'cancelled',
      hideInTable: true,
      valueEnum: {
        1: '已启用',
        3: '已关闭'
      },
    },
    {
      title: '营业状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'cancelled',
      render: (_, data) => {
        return (
          <>
            {_.desc}
          </>
        )
      }
    },
    {
      title: '店铺等级',
      dataIndex: 'level',
      valueType: 'select',
      hideInTable: true,
      valueEnum: {
        1: '一星店主',
        2: '二星店主',
        3: '三星店主',
        4: '四星店主',
        5: '五星店主',
      },
    },
    // {
    //   key: 'status',
    //   title: '集约任务',
    //   dataIndex: 'asdas',
    //   width: 100,
    //   valueType: 'checkbox',
    //   valueEnum: {
    //     all: { text: '参与过集约任务', status: 'Default' },

    //   },
    //   hideInTable: true,
    // },
    // {
    //   key: 'status',
    //   title: '用户关系',
    //   dataIndex: 'asdas',
    //   width: 100,
    //   valueType: 'checkbox',
    //   valueEnum: {
    //     all: { text: '已有直推用户', status: 'Default' }
    //   },
    //   hideInTable: true,
    // },
    {
      title: '注销原因',
      dataIndex: 'remark',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: storeType == 'normal',
      render: (_, data) => {
        return (
          <>
            <p>{_}</p>
            <p>（{data.updateTime}）</p>
          </>
        )
      }
    },
    {
      title: '改价记录',
      dataIndex: 'isChangePrice',
      valueType: 'select',
      valueEnum: {
        0: '没有改价记录',
        1: '有改价记录',
      },
      hideInTable: true,
      order: -1,
    },
    {
      title: '操作',
      dataIndex: '',
      valueType: 'option',
      width: storeType == 'normal' ? 300 : 500,
      fixed: 'right',
      render: (_, data) => (
        <Space>
          <a onClick={() => { setSelectItem(data); setDetailVisible(true) }}>详情</a>
          {data.status.code === 2 && <a onClick={() => { setSelectItem({ ...data, type: 1 }); setReturnVisible(true) }}>线下退保证金登记</a>}
          {data.status.code === 2 && <a onClick={() => { setSelectItem({ ...data, type: 2 }); setReturnVisible(true) }}>线上原路退回保证金</a>}
          {data.status.code === 1 && <a onClick={() => { setSelectItem({ ...data, toStatus: 3 }); setFormVisible(true) }}>关闭</a>}
          {data.status.code === 3 && <a onClick={() => { setSelectItem({ ...data, toStatus: 1 }); setFormVisible(true) }}>开启</a>}
          {data.status.code === 3 && <a onClick={() => { setSelectItem({ ...data, toStatus: 2 }); setFormVisible(true) }}>注销</a>}
          <a onClick={() => { setSelectItem(data); setAuditInfoVisible(true) }}>审核资料</a>
          <Auth
            name="store/member_shop/grade"
          >
            <GradeChange
              callback={() => { actionRef.current.reload() }}
              storeNo={data.storeNo}
            />
          </Auth>

        </Space>
      )
    },
  ];

  const getFieldValue = () => {
    if (formRef?.current?.getFieldsValue) {
      const { current, pageSize, area = [], ...rest } = formRef?.current?.getFieldsValue?.();
      return {
        operation: storeType,
        provinceId: area[0]?.value,
        cityId: area[1]?.value,
        regionId: area[2]?.value,
        ...rest
      }
    }
    return {}
  }

  return (
    <>
      <ProTable
        rowKey="id"
        options={false}
        actionRef={actionRef}
        formRef={formRef}
        params={{
          operation: storeType
        }}
        request={getStoreList}
        scroll={{ x: '100vw', y: window.innerHeight - 680, scrollToFirstRowOnChange: true, }}
        search={{
          defaultCollapsed: false,
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <Button
              key="new"
              onClick={() => {
                setCreateVisible(true);
              }}
            >
              新建
            </Button>,
            <Export
              change={(e) => { setVisit(e) }}
              key="export"
              type={storeType == 'normal' ? "community-shopkeeper-export" : "community-shopkeeper-cancelled-export"}
              conditions={getFieldValue}
            />,
            <ExportHistory key="exportHistory" show={visit} setShow={setVisit} type={storeType == 'normal' ? "community-shopkeeper-export" : "community-shopkeeper-cancelled-export"} />
            // <Button
            //   key="new2"
            //   onClick={() => {
            //     setExcelVisible(true);
            //   }}
            // >
            //   批量新建
            // </Button>,
            // <Button key="out" onClick={() => { exportExcel(form) }}>导出</Button>,
          ],
        }}
        columns={columns}
        pagination={{
          pageSize: 10,
        }}
      />
      {
        auditInfoVisible &&
        <AuditInfo
          storeNo={selectItem?.storeNo}
          visible={auditInfoVisible}
          setVisible={setAuditInfoVisible}
        />
      }
      {
        detailVisible &&
        <Detail
          storeNo={selectItem?.storeNo}
          visible={detailVisible}
          setVisible={setDetailVisible}
        />
      }
      {formVisible && <Form
        visible={formVisible}
        setVisible={setFormVisible}
        data={selectItem}
        callback={() => { actionRef.current.reload() }}
      />}
      {returnVisible && <Return
        visible={returnVisible}
        setVisible={setReturnVisible}
        data={selectItem}
        callback={() => { actionRef.current.reload() }}
      />}
      {createVisible && <Create
        visible={createVisible}
        setVisible={setCreateVisible}
        callback={() => { actionRef.current.reload() }}
      />}
      {excelVisible && <ExcelModal
        visible={excelVisible}
        setVisible={setExcelVisible}
        callback={() => { actionRef.current.reload() }}
      />}
    </>
  );
};


const OverallStore = () => {
  const [activeKey, setActiveKey] = useState('normal')

  return (
    <PageContainer>
      <ProCard
        tabs={{
          type: 'card',
          activeKey,
          onChange: setActiveKey
        }}
      >
        <ProCard.TabPane key="normal" tab="正常店铺">
          {
            activeKey == 'normal' && <StoreList storeType={activeKey} />
          }
        </ProCard.TabPane>
        <ProCard.TabPane key="cancelled" tab="已注销店铺">
          {
            activeKey == 'cancelled' && <StoreList storeType={activeKey} />
          }
        </ProCard.TabPane>
      </ProCard>
    </PageContainer>
  )
}

export default OverallStore;
