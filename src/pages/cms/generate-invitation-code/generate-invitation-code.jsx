
import React, { useRef, useState, useEffect } from 'react';
import { Button, message, Spin } from 'antd';
import ProCard from '@ant-design/pro-card';
import ProForm, {
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { generateSubmit, generateIntData, generateUpdata, getGenerteUrl } from '@/services/cms/member/member';
import { Item } from 'gg-editor';


const GenerateInvitationCode = () => {
  const [loading, setLoading] = useState(false);
  const [upDataIsOk, setUpDataIsOk] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [taskId, setTaskId] = useState(null);
  // const [fileUrl, setFileUrl] = useState(null);
  const actionRef = useRef();
  const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      };
  const waitTime = ({number, mobiles}) => {
    setLoading(true)
    const param = {
      number,
      mobiles
    }
    return new Promise((resolve, reject) => {
      generateSubmit(param).then((res) => {
        console.log('generateSubmit-res', res);
        if (res.code === 0) {
          setInitialData(res.data);
          resolve(true);
        } else {
          reject(false);
        }
      })
    });
  }

  useEffect(() => {
    if (initialData) {
      getInitData(initialData)
    }
  }, [initialData])

  const getInitData = (initialData) => {
    console.log('initialData', initialData)
    const initData = initialData.map(({batchId, mobile}) => {
      return {
        batchId,
        mobile
      }
    })
    const json = {
      batchs: initData
    }
    const batchs = JSON.stringify(json);
    console.log('batchs', batchs)
    const timestamp = new Date().getTime();
    const param = {
      code: 'invitation-code-export',
      fileName: 'invitationCode' + timestamp + '.xlsx',
      queryParamStr: batchs
    }
    generateUpdata(param).then((res) => {
      console.log('generateUpdata-res', res)
      if (res.code === 0) {
        setTaskId(res?.data?.taskId)
      }
      setLoading(false)
      setUpDataIsOk(true)
    })
  }

  const upData = () => {
    console.log('taskId', taskId)
    taskId&&getGenerteUrl({id: taskId}).then(({data}) => {
      console.log('data', data)
      if (data.fileUrl) {
        window.open(data.fileUrl, "_blank");
        // setFileUrl(data.fileUrl)
      }
    })
  }

  return (
    <ProCard>
      {!upDataIsOk&&<Spin spinning={loading}>
        <ProForm
          {...formItemLayout}
          layout={'horizontal'}
          onFinish={async (values) => {
            console.log(values);
            await waitTime(values);
            message.success('提交成功');
          }}
        >
            <ProFormText
              width="md"
              name="number"
              label="内测码个数"
              tooltip="每个号码生成内测码个数"
              placeholder="请输入每个号码生成内测码个数"
            />
            <ProFormTextArea
              name="mobiles"
              label="手机号"
              tooltip="多个号码以逗号隔开"
              placeholder="请输入手机号"
              // fieldProps={inputTextAreaProps}
            />
        </ProForm>
      </Spin>}
      {upDataIsOk&&<Button onClick={() => {
        upData()
      }}>下载</Button>}
    </ProCard>
  );
};


export default GenerateInvitationCode