import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Tree, message, Checkbox, Typography, Divider } from 'antd';
import {
  DrawerForm,
  ProFormText,
  ProFormRadio,
  ProFormSelect,
  ProFormDigit,
} from '@ant-design/pro-form';
import { supplierAdd, supplierEdit, categoryAll, searchUniName, getOnlineList } from '@/services/supplier-management/supplier-list';
import md5 from 'blueimp-md5';
import { arrayToTree, computedChildCount } from '@/utils/utils'
import FormModal from './form';

const { Title } = Typography;


const CTree = (props) => {
  const { value, onChange, treeData, data, keys, selectData, ...rest } = props;
  const [selectKeys, setSelectKeys] = useState(keys);
  const [selectAll, setSelectAll] = useState(false);
  const onSelectAll = ({ target }) => {
    const { checked } = target;
    if (checked) {
      setSelectKeys(data.map(item => item.id));
      onChange(data.map(item => item.id))

    } else {
      setSelectKeys([]);
      onChange([])
    }
    setSelectAll(checked);
  }

  const onCheck = (checkedKeys) => {
    setSelectKeys(checkedKeys)
    onChange(checkedKeys)
    setSelectAll(!treeData.some(item => {
      return !checkedKeys.includes(item.key);
    }))
  }

  useEffect(() => {
    onChange(keys)
    setSelectKeys(keys)
    return () => {
      setSelectKeys([])
    }
  }, [keys])

  useEffect(() => {
    setSelectAll(selectData?.length === data?.length)
    return () => {
      setSelectAll(false)
    }
  }, [selectData, data])

  return (
    <div style={{ flex: 1 }}>
      <Checkbox
        onChange={onSelectAll}
        checked={selectAll}
        style={{ marginLeft: 23, marginBottom: 5 }}
      >
        全部分类
      </Checkbox>
      <Tree
        treeData={treeData}
        onCheck={onCheck}
        checkedKeys={selectKeys}
        titleRender={({ gcName, fresh }) => {
          return (
            <>{gcName}{fresh !== 0 && <span style={{ color: 'green' }}>({{ 1: '精装生鲜', 2: '散装生鲜' }[fresh]})</span>}</>
          )
        }}
        {...rest}
      />
    </div>

  )
}
export default (props) => {
  const { visible, setVisible, detailData, callback = () => { }, onClose = () => { } } = props;
  const [form] = Form.useForm()
  const [formVisible, setFormVisible] = useState(false)
  const [selectData, setSelectData] = useState([]);
  const [treeData, setTreeData] = useState([])
  const [contractList, setContractList] = useState([])
  const [selectKeys, setSelectKeys] = useState([]);
  const originData = useRef([])

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
    layout: {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    }
  };

  const submit = (values) => {
    const {
      password,
      gc,
      ...rest
    } = values;
    return new Promise((resolve, reject) => {
      const apiMethod = detailData ? supplierEdit : supplierAdd;

      let gcArr = []
      let hasError = ''
      if (gc?.length) {
        const parentIds = [];

        gc.forEach(element => {
          originData.current.forEach(it => {
            if (it.id === element) {
              const pid = it.gcParentId
              parentIds.push(pid)
              if (pid !==0) {
                const findItem = originData.current.find(it => pid === it.id);
                parentIds.push(findItem.gcParentId)
              }
            }
          })
        });

        const gcData = [...new Set([...gc, ...parentIds].filter(item => item !== 0))]
        gcData.forEach(item => {
          const findItem = originData.current.find(it => item === it.id);
          if (findItem.level === 1) {
            gcArr.push({
              id: item,
              children: []
            })
          }
        })


        gcData.forEach(item => {
          const findItem = originData.current.find(it => item === it.id);
          if (findItem.level === 2) {
            gcArr.forEach((it, index) => {
              if (it.id === findItem.gcParentId) {
                gcArr[index].children.push({
                  id: item,
                  children: []
                })
              }
            })
          }
        })


        gcData.forEach(item => {
          const findItem = originData.current.find(it => item === it.id);
          if (findItem.level === 3) {
            gcArr.forEach((it, index) => {
              it.children.forEach((it2, i) => {
                if (it2.id === findItem.gcParentId) {
                  gcArr[index].children[i].children.push({
                    id: item,
                    children: []
                  })
                }
              })
              
            })
          }
        })

        // if (hasError) {
        //   message.error('选择的一级分类下无二级分类，请到分类管理添加二级分类');
        //   reject()
        //   return;
        // }

      } else {
        gcArr = ''
      }

      if (gcArr) {
        gcArr.forEach(item => {
          if (item.children.length === 0) {
            hasError = true
          }
        })
      }

      if (hasError) {
        message.error('选择的一级分类下无二级分类，请到分类管理添加二级分类');
        reject()
        return;
      }

      const params = {
        ...rest,
        supplierId: detailData?.supplierId,
        bindSupplierIds: selectData.map(item => item.id).join(','),
        gcInfo: gcArr,
      }

      if (password) {
        params.password = md5(password)
      }

      if (detailData) {
        params.contractId = detailData.contractId
      }

      apiMethod(params, { showSuccess: true, showError: true, noFilterParams: true, paramsUndefinedToEmpty: true }).then(res => {
        if (res.code === 0) {
          resolve();
          callback();
        } else {
          reject();
        }
      })
    });
  }

  useEffect(() => {
    if (!detailData) {
      getOnlineList({
        page: 1,
        size: 9999
      })
        .then(res => {
          if (res.code === 0) {
            setContractList(res.data.records.map(item => ({ label: item.name, value: item.contractId })))
          }
        })
    }
    categoryAll()
      .then(res => {
        if (res.code === 0) {
          originData.current = res.data.records;
          const tree = arrayToTree(res.data.records.map(item => ({
            ...item,
            pid: item.gcParentId,
            title: item.gcName,
            key: item.id,
            value: item.id,
            selectable: false
          })))
          setTreeData(tree)
          if (detailData) {
            const allCount = computedChildCount(originData.current, 'gcParentId')
            const selfCount = computedChildCount(detailData.gcInfo, 'gcParentId')
            const { warrantyRatioDisplay, defaultWholesaleTaxRateDisplay } = detailData

            form.setFieldsValue({
              warrantyRatio: warrantyRatioDisplay,
              defaultWholesaleTaxRate: defaultWholesaleTaxRateDisplay,
            })

            setSelectData(detailData.supplierIds)
            const gcInfo = detailData.gcInfo.filter(item => allCount[item.id] === selfCount[item.id])
            const ids = [];
            gcInfo.forEach(item => {
              ids.push(item.id)
            })
            form.setFieldsValue({
              ...detailData,
              gcInfo,
              warrantyRatio: warrantyRatioDisplay,
              defaultWholesaleTaxRate: defaultWholesaleTaxRateDisplay,
            })
            setSelectKeys(ids)
          }
        }
      })
    return () => {
      setSelectKeys([])
    }
  }, [form, detailData]);

  return (
    <DrawerForm
      title={`${detailData ? '编辑' : '新建'}供应商家`}
      onVisibleChange={setVisible}
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
        width: 1300,
        onClose: () => {
          onClose();
        }
      }}
      form={form}
      onFinish={async (values) => {
        try {
          await submit(values);
          return true;
        } catch (error) {
          console.log('error', error);
        }
      }}
      visible={visible}
      initialValues={{
        accountSwitch: 1,
        status: 1,
        defaultWholesaleTaxRate: 13,
        warrantyRatio: 10,
        isSendSms: 1,
      }}
      {...formItemLayout}
    >
      <Title level={4}>基本信息</Title>
      <Divider />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          {!detailData && <ProFormSelect
            name="contractId"
            label="签电子合同供应商"
            fieldProps={{
              showSearch: true,
              optionFilterProp: 'label',
              placeholder: '请输入已签电子合同的供应商名称或名称给关键字',
              onChange: (e) => {
                form.setFieldsValue({
                  companyName: contractList.find(item => item.value === e).label,
                })
              }
            }}
            options={contractList}
          />}
          <ProFormText
            name="companyName"
            label="供应商家名称"
            placeholder="请输入供应商家名称"
            rules={[
              { required: true, message: '请输入供应商家名称' },
              () => ({
                required: true,
                validator(_, value) {
                  return new Promise((resolve, reject) => {
                    searchUniName({
                      companyName: value
                    }, { showError: false }).then(res => {
                      if (res.code === 0) {
                        if (res.data.records?.id && value !== detailData?.companyName) {
                          reject(new Error('供应商家名称已存在'));
                        } else {
                          resolve();
                        }
                      }
                    })
                  });
                },
              })]}
            fieldProps={{
              maxLength: 30,
            }}
            disabled={detailData?.bankAccountInfo?.auditStatus === 1}
          />
          <ProFormText
            name="accountName"
            label="供应商家登录账号"
            placeholder="请输入供应商家登录账号"
            rules={[{ required: true, message: '请输入供应商家登录账号' }]}
            fieldProps={{
              maxLength: 18,
            }}
            disabled={detailData?.bankAccountInfo?.auditStatus === 1}
          />
          <ProFormText.Password
            name="password"
            label="供应商家登录密码"
            placeholder="请输入供应商家登录密码"
            validateFirst
            rules={[
              { required: !detailData, message: '请输入供应商家登录密码' },
              { required: !detailData, message: '密码应不少于6个字符，不超过18个字符', min: 6, max: 18 }
            ]}
            fieldProps={{
              visibilityToggle: false,
              maxLength: 18,
              autoComplete: 'new-password',
            }}
          />
          <ProFormText
            name="companyUserName"
            label="负责人"
            placeholder="请输入负责人"
            rules={[{ required: true, message: '请输入负责人' }]}
            fieldProps={{
              maxLength: 10,
            }}
          />
          <ProFormText
            name="companyUserPhone"
            label="负责人手机号"
            placeholder="请输入负责人手机号"
            rules={[{ required: true, message: '请输入负责人手机号' }]}
            fieldProps={{
              maxLength: 11,
            }}
            extra="此手机号会用做平台联系和对绑定的银行卡解绑确认"
          />
          <ProFormText
            name="orderTipPhone"
            label="提醒手机号"
            placeholder="请输入手机号码 产生待发货订单时自动发送短信"
            fieldProps={{
              maxLength: 11,
            }}
          />
          <ProFormRadio.Group
            name="status"
            label="状态"
            rules={[{ required: true }]}
            options={[
              {
                label: '启用',
                value: 1,
              },
              {
                label: '禁用',
                value: 0,
              },
            ]}
          />
          <ProFormRadio.Group
            name="isSendSms"
            label="发送短信状态"
            rules={[{ required: true }]}
            options={[
              {
                label: '开启',
                value: 1,
              },
              {
                label: '关闭',
                value: 2,
              },
            ]}
          />
          <ProFormRadio.Group
            name="accountSwitch"
            label="是否需要开户认证"
            rules={[{ required: true }]}
            options={[
              {
                label: '需要',
                value: 1,
              },
              {
                label: '不需要',
                value: 0,
              },
            ]}
          />

        </div>
        <div style={{ flex: 1 }}>
          <Form.Item
            label="主营商品类型"
            name="gc"
          >
            {!!treeData.length &&<CTree
              checkable
              style={{
                width: '100%',
              }}
              treeData={treeData}
              multiple
              height={200}
              data={originData.current}
              virtual={false}
              keys={selectKeys}
              selectData={detailData?.gcInfo}
            />}
          </Form.Item>

          <Form.Item
            label="可关联顾问"
          >
            <Button type="primary" onClick={() => { setFormVisible(true) }}>选择顾问</Button>
            <div>
              {!!selectData.length && <div>已选择顾问</div>}
              {
                selectData.map(item => (<div key={item.id}>{item.companyName}</div>))
              }
            </div>
          </Form.Item>
          <ProFormSelect
            name="defaultWholesaleTaxRate"
            label="商品开票税率(%)"
            fieldProps={{
              allowClear: false,
            }}
            required
            options={[
              {
                label: '0%',
                value: 0
              },
              {
                label: '1%',
                value: 1
              },
              {
                label: '3%',
                value: 3
              },
              {
                label: '6%',
                value: 6
              },
              {
                label: '9%',
                value: 9
              },
              {
                label: '13%',
                value: 13
              }
            ]}
          />
          <ProFormDigit
            placeholder="请输入商品质保金比例"
            label={
              <div style={{ position: 'relative', top: 10 }}>
                <div>商品质保金比例</div>
                <div style={{ fontSize: 12, color: '#888' }}>此部分金额需商品</div>
                <div style={{ fontSize: 12, color: '#888' }}>过售后期才可提现</div>
              </div>
            }
            name="warrantyRatio"
            min={0}
            max={50}
            fieldProps={{
              // stringMode: true,
              // formatter: value => value ? +new Big(value).toFixed(2) : value
            }}
            extra={<><span style={{ position: 'absolute', right: 30, top: 5 }}>%</span></>}
            step
            validateFirst
            rules={[
              { required: true, message: '请输入商品质保金比例' },
              () => ({
                validator(_, value) {
                  if (!/^\d+\.?\d*$/g.test(value) || value < 0) {
                    return Promise.reject(new Error('请输入大于零或等于零的数字'));
                  }
                  return Promise.resolve();
                },
              })
            ]}
          />
          <div style={{ marginTop: '-20px' }}>
            <ProFormText
              name="stockWarn"
              label="商品预警量"
              placeholder="请输入需要预警的商品数量"
              validateFirst
              rules={[
                { required: true, message: '请输入需要预警的商品数量' },
                () => ({
                  validator(_, value) {
                    if (!/^\d+\.?\d*$/g.test(value) || value < 0) {
                      return Promise.reject(new Error('请输入大于零或等于零的数字'));
                    }
                    return Promise.resolve();
                  },
                })
              ]}
            />
          </div>
          {detailData?.contract?.url && <Form.Item
            label="入驻合同"
          >
            <a style={{ textDecoration: 'underline' }} href={detailData?.contract?.url} target="_blank">查看合同</a>
          </Form.Item>}
          {!detailData?.contract?.url && <Form.Item
            label="入驻合同"
          >
            <a href="/setting/contract-management" target="_blank">去创建</a>
          </Form.Item>}

        </div>
      </div>
      {formVisible && <FormModal
        visible={formVisible}
        setVisible={setFormVisible}
        callback={(v) => { setSelectData(v) }}
        selectData={selectData}
      />}
    </DrawerForm>
  );
};
