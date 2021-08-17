import React, { useState,useEffect,useRef } from 'react';
import { getDynamicDetail } from '@/services/community-management/dynamic-get-dynamic-detail';
import { Divider, Form, Spin,Button,Image,Menu, Dropdown,Space,List, Avatar } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import { CaretRightFilled } from '@ant-design/icons';
import styles from './style.less'
import ReplyModel from './reply-model'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: { span: 2 },
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
  const id=props.location.query.id
  const byid=props.location.query.byid
  const name=props.location.query.name
  const [form] = Form.useForm()
  const [detailData,setDetailData]=useState([])
  const [loading, setLoading] = useState(false);
  const ref=useRef()
  const listData = []
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: 'https://ant.design',
      title: `张三 ${i}`,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        '2021-07-15 15:32:28',
      content:
        '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
      chat:[
        '李四：这是回复...这是回复...',
        '王五：兄弟顶你....',
        '小鸭蛋：专业补刀20年'
      ]
    });
  }
  useEffect(()=>{
    setLoading(true);
    getDynamicDetail({id}).then(res=>{
      setDetailData(res.data)
    }).finally(() => {
      setLoading(false);
    })
  },[])

  const menu = (
    <Menu>
      <Menu.Item>
          <ReplyModel 
            state={1}  
            label={'发布评论'}  
            // InterFace={auditDynamic} 
            boxref={ref}
          />
      </Menu.Item>
      <Menu.Item>
          置顶
      </Menu.Item>
      <Menu.Item>
          隐藏帖子
      </Menu.Item>
    </Menu>
  );

  return (
    <>
        <Form
          form={form}
          {...formItemLayout}
          className={styles.detailform}
        >
           <h2 className={styles.head}><CaretRightFilled /> 帖子详情</h2>
           <Dropdown overlay={menu} placement="bottomCenter" arrow>
            <Button style={{marginLeft:'1400px'}} type='primary'>帖子管理</Button>
          </Dropdown>
          <Form.Item
            label="内容ID"
          >
            {detailData.id}
          </Form.Item>

          <Form.Item
            label="发布时间"
          >
            {moment(Number(detailData.createTime)).format('YYYY-MM-DD HH:mm:ss')}
          </Form.Item>

          <Form.Item
            label="定位"
          >
            {detailData.address}
          </Form.Item>

          <Form.Item
              label="内容"
            >
              {detailData.content}
              <div className={styles.content}>
                {
                  detailData.images?.map(ele=>(
                    <Image className={styles.detailimg}  width={100} height={100} src={ele} alt="" />
                  ))
                }
              </div>
              <Space>
                {/* <Image width={100} src={detailData.sourceData.goodsImageUrl} /> */}
                {/* <div>
                <p>{detailData.sourceData.goodsName}</p>
                <p>{detailData.sourceData.specName}</p>
                <p>￥ {detailData.sourceData.goodsSaleMinPrice}</p>
                </div> */}
            </Space>
            <hr style={{marginTop:'70px'}}/>
            <p style={{marginTop:'20px'}}>共（{listData.length}）条评论</p>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={listData}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <ReplyModel 
                      state={1}  
                      label={'回复'}  
                      // InterFace={auditDynamic} 
                      boxref={ref}
                    />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                  <div style={{background:'#F2F2F2',padding:'20px'}}>
                        {
                          item.chat.map((ele)=>(
                            <p>{ele}</p>
                          ))
                        }
                  </div>
                </List.Item>
              )}
            />
          </Form.Item>
      

          {/* {
           detailData.sourceType==1&&detailData.sourceData?
            <Form.Item
              label="商品快照"
            >
             <h3>{detailData.sourceData.subtitle}</h3>
             <h4>{detailData.sourceData.title}</h4>
             <Image src={detailData.sourceData.icon} width={100} height={100} alt="" />
            </Form.Item>
            :null
          }
         
         {
           detailData.sourceType==3&&detailData.sourceData?
           <Form.Item
            label="转发内容快照"
          >
            <h3>{detailData.sourceData.subtitle}</h3>
            <h4>{detailData.sourceData.title}</h4>
            <Image src={detailData.sourceData.icon} width={100} height={100} alt="" />
          </Form.Item>
          :null
         }
          <Form.Item
            className={styles.formbutton}
          >
              {
                  name?
                  <Button className={styles.button}  type="primary" onClick={()=>history.push('/community-management/circle-management/circleinterior-management?id='+byid+'&name='+name)}>返回</Button>
                  :<Button className={styles.button} type="primary" onClick={()=>history.goBack()}>返回</Button>
              }
         
          </Form.Item> */}
          
        </Form>
    </>
  );
};
