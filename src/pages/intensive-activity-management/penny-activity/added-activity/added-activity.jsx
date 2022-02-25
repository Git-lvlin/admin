import React, { useState, useEffect,useRef } from 'react';
import { Input, Form, Divider, message, Button,Space } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import ProTable from '@ant-design/pro-table';
import { couponSub } from '@/services/coupon-construction/coupon-coupon-sub';
import { couponEdit } from '@/services/coupon-construction/coupon-edit';
import ProForm, { ProFormText,ProFormDateTimeRangePicker,ProFormTextArea,ProFormCheckbox,ProFormRadio,ModalForm } from '@ant-design/pro-form';
import { history, connect } from 'umi';
import { amountTransform } from '@/utils/utils'
import moment from 'moment';
import styles from './style.less'

const formItemLayout = {
  labelCol: { span: 3 },
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

const GoosModel=(props)=>{
    const {visible,setVisible,onClose}=props
    const actionRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [spuIdsArr,setSpuIdsArr]=useState([])
    const [loading,setLoading]=useState(true)
    const [spuIds,setSpuIds]=useState('')
    const columns = [
        {
            title: 'spuID',
            dataIndex: 'spuId',
        },
        {
            title: 'skuid',
            dataIndex: 'skuid',
        },
        {
            title: '商品名称',
            dataIndex: 'goodsName',
            valueType: 'text',
            ellipsis:true,
            hideInSearch:true
        },
        {
            title: '集约活动名称',
            dataIndex: 'goodsName',
            valueType: 'text',
            ellipsis:true,
            hideInSearch:true
        },
        {
            title: '集约活动ID',
            dataIndex: 'gcId1Display',
            valueType: 'text',
            hideInSearch:true
        },
        {
            title: '选择集约活动',
            dataIndex: 'brandName',
            valueType: 'select',
            hideInTable:true,
            valueEnum: {
                0: '全部',
                1: '待开始',
                2: '进行中',
            },
        },
        {
            title: '集约活动状态',
            dataIndex: 'brandName',
            valueType: 'text',
            hideInSearch: true,
        },
        {
            title: '集约价(元)',
            dataIndex: 'goodsSalePrice',
            hideInSearch: true,
            render: (_)=> amountTransform(_, '/').toFixed(2)
        },
        {
            title: '集约库存',
            dataIndex: 'stockNum',
            hideInSearch: true,
        },
    ];
    const onsubmit = (values) => {
    };
    return (
        <ModalForm
            onVisibleChange={setVisible}
            visible={visible}
            width={1000}
            modalProps={{
            forceRender: true,
            destroyOnClose: true,
            onCancel: () => {
                onClose();
            }
            }}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                    <Button type="primary" key="submit" onClick={() => {
                        props.form?.submit?.()
                    }}>
                     提交
                    </Button>,
                    <Button type="primary" key="cancel" onClick={() =>{setVisible(false)}}>
                     返回
                    </Button>
                ];
            },
            }}
            onFinish={async (values) => {
                await onsubmit(values);
            }}
            {...formItemLayout}
        >
        <ProTable
            rowKey="id"
            options={false}
            // request={commonSpuList}
            actionRef={actionRef}
            search={{
                defaultCollapsed: false,
                labelWidth: 100,
                optionRender: (searchConfig, formProps, dom) => [
                    ...dom.reverse(),
                ],
            }}
            columns={columns}
            rowSelection={{
                preserveSelectedRowKeys: true,
                onChange: (_, val) => {
                    setSpuIds(_.toString())
                    setSpuIdsArr(val)
                }
            }}
        />
        </ModalForm>
    )
}

export default (props) => {
  const [choose, setChoose] = useState()
  const [submitType, setSubmitType] = useState()
  const [publishType,setPublishType]=useState()
  const [visible, setVisible] = useState(false);
  let id = props.location.query.id
  const [form] = Form.useForm()
  useEffect(() => {
    if (id) {
        form.setFieldsValue({
        //   dateRange: [moment(DetailList.data?.limitStartTime).valueOf(), moment(DetailList.data?.limitEndTime).valueOf()],
        //   dateTimeRange: DetailList.data?.activityStartTime?[moment(DetailList.data?.activityStartTime).valueOf(), moment(DetailList.data?.activityEndTime).valueOf()]:null,
        //   ...DetailList.data
        })
    }
  }, [])
  //红包名称验证规则
  const checkConfirm = (rule, value, callback) => {
    return new Promise(async (resolve, reject) => {
      if (value && value.length > 50) {
        await reject('红包名称不超过50个字符')
      } else if (value&&/[^\u4e00-\u9fa5\0-9]/.test(value)) {
        await reject('只能输入汉字')
      } else {
        await resolve()
      }
    })
  }
  const onsubmit = (values) => {

  }

  const disabledDate=(current)=>{
    return current && current < moment().startOf('day');
  }
  return (
    <>
      <ProForm
        form={form}
        {...formItemLayout}
        submitter={
          {
            render: (props, defaultDoms) => {
              return [
                <Button style={{marginLeft:'250px'}} type="primary" key="submit" onClick={() => {
                  props.form?.submit?.()
                }}>
                  确定
                </Button>,
              ];
            }
          }
        }
        onFinish={async (values) => {
            await onsubmit(values);
            return true;
        }
        }
        className={styles.discountFrom}
      >
        <ProFormText
          width="md"
          name="name"
          label='活动名称'
          rules={[
            { required: true, message: '请输入活动名称' },
            { validator: checkConfirm }
          ]}
        />

        <ProFormText
          width="md"
          name="price"
          label='活动价'
          rules={[
            { required: true, message: '请输入活动价' },
            { validator: checkConfirm }
          ]}
        />
        <ProFormText
          width="md"
          name="shoperLimitAll"
          label='每位店主总限量'
          rules={[
            { required: true, message: '请输入每位店主总限量' },
            { validator: checkConfirm }
          ]}
        />
        <ProFormText
          width="md"
          name="shoperLimitOnece"
          label='每位店主单次限量'
          rules={[
            { required: true, message: '请输入每位店主单次限量' },
            { validator: checkConfirm }
          ]}
        />
        <ProFormText
          width="md"
          name="buyerLimit"
          label='每位消费者限量'
          rules={[
            { required: true, message: '请输入每位消费者限量' },
            { validator: checkConfirm }
          ]}
        />
        <ProFormText
          width="md"
          name="joinAgainPercent"
          label='店主再次参与活动条件'
          rules={[
            { required: true, message: '请输入店主再次参与活动条件' },
            { validator: checkConfirm }
          ]}
        />
        <ProFormRadio.Group
          name="radio-button"
          label="活动商品"
          radioType="button"
          options={[
            {
              label: '选择活动商品',
              value: 'a',
            }
          ]}
          fieldProps={{
              onChange:()=>{
                setVisible(true)
              }
          }}
          rules={[{ required: true, message: '请选择活动商品' }]}
        />
        <ProFormDateTimeRangePicker
            label='活动时间'
            rules={[{ required: true, message: '请选择活动时间' }]}
            name="dateRange"
            fieldProps={{
            disabledDate:(current)=>disabledDate(current)
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
        <ProFormCheckbox.Group
          name="joinShopType"
          label="参与活动的店铺"
          options={[
            {
              label: '生鲜店铺',
              value: 1,
            },
          ]}
          rules={[{ required: true, message: '请选择参与活动的店铺' }]}
        />
         <ProFormCheckbox.Group
          name="joinBuyerType"
          label="参与活动的消费者"
          options={[
            {
              label: '全部消费者',
              value: 1,
            },
            {
              label: '从未下过单的消费者（新人）',
              value: 2,
            },
          ]}
          rules={[{ required: true, message: '请选择参与活动的消费者' }]}
        />
        <ProFormTextArea
          label='活动规则'
          name="ruleText"
          style={{ minHeight: 32, marginTop: 15 }}
          placeholder='请输入5-1000个字符'
          rules={[{ required: true, message: '请备注使用规则' }]}
          rows={4}
          fieldProps={{
            maxLength:1000
          }}
        />
      </ProForm >
      {visible&&<GoosModel 
        visible={visible}
        setVisible={setVisible}
        onClose={()=>{setVisible(false)}}
      />
      }
    </>
  );
};
