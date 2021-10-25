import React, { useRef, useEffect, useState } from 'react';
import { message, Form,Transfer } from 'antd';
import ProForm, { ModalForm } from '@ant-design/pro-form';
import { settingRecommend,recommendArticleList } from '@/services/business-school/find-admin-article-list';




export default (props) => {
  const { setVisible, visible,callback } = props;
  const formRef = useRef();
  const [form] = Form.useForm()
  const [mockData,setMockData]=useState([])
  const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    recommendArticleList().then(res=>{
      setMockData(res.data.map(ele=>(
        {key:ele.id,title:ele.articleTitle,description:ele.isRecommend}
      )))
    })
    
  }, [form])


    const onChange = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
    };
    
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };
  
    const onsubmit = () => {
      return new Promise((resolve,reject) => {
        if(targetKeys.length<=6){
          settingRecommend({ids:targetKeys}).then((res) => {
            if (res.code === 0) {
              resolve(true);
              callback(true)
            }
          })
        }else{
          message.error('首页最多6篇')
              reject(false);
        }
      });
    };

  return (
    <ModalForm
      title={<p>设置展示到店铺管理页<span style={{color:"#CACACA",fontSize:'10px'}}>将要展示到店铺管理页的文章加入右侧</span></p>}
      onVisibleChange={setVisible}
      formRef={formRef}
      visible={visible}
      form={form}
      onFinish={async () => {
        await onsubmit();
        message.success('设置成功');
        // 不返回不会关闭弹框
        return true;
      }}
    >
      <Transfer
        dataSource={mockData}
        titles={['文章列表', '首页文章']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={onChange}
        showSelectAll={false}
        onSelectChange={onSelectChange}
        operations={['加入右侧 ', '加入左侧']}
        render={item => item.title}
      />
      {
        targetKeys.length>6&&<p style={{color:'red',paddingLeft:'390px'}}>首页最多6篇</p>
      }
    </ModalForm>
  );
};