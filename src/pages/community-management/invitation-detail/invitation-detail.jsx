import React, { useState,useEffect,useRef } from 'react';
import { getDynamicDetail,findAdminCommentList,insertComment,insertReply } from '@/services/community-management/dynamic-get-dynamic-detail';
import { Divider, Form, Spin,Button,Image,Menu, Dropdown,Space,List, Avatar,message } from 'antd';
import moment from 'moment';
import { history } from 'umi';
import { CaretRightFilled } from '@ant-design/icons';
import styles from './style.less'
import ReplyModel from './reply-model'
import { circleHide } from '@/services/community-management/circle-hide';
import { circleTop } from '@/services/community-management/circle-top';
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
  const [listData,setListData] =useState()
  const ref=useRef()
  const commentList=[]

  listData&&listData.map(ele=>{
    commentList.push({
      href: ele.userHeadUrl,
      title: ele.userName,
      avatar: ele.userHeadUrl,
      description:moment(Number(ele.createTime)).format('YYYY-MM-DD HH:mm:ss'),
      content:ele.content,
      replys:ele.replys,
      dynamicCommentId:ele.id,
      ...ele
    });
  })
  
  useEffect(()=>{
    setLoading(true);
    getDynamicDetail({id}).then(res=>{
      setDetailData(res.data)
    }).finally(() => {
      setLoading(false);
    })
    findAdminCommentList({dynamicId:id}).then(res=>{
      setListData(res.data)
    })
  },[])
  const oncircleTop=()=>{
    circleTop({id}).then(res=>{
      if(res.code==0){
        message.success('置顶成功')
        return true;
    }
    })
  }
  const oncircleHide=()=>{
    circleHide({id}).then(res=>{
      if(res.code==0){
        message.success('隐藏成功')
        return true;
    }
  })
  }

  const menu = (
    <Menu>
      <Menu.Item>
          <ReplyModel 
            dynamicId={id}
            label={'发布评论'}  
            InterFace={insertComment} 
            boxref={ref}
          />
      </Menu.Item>
      <Menu.Item>
          <p  onClick={()=>oncircleTop()}>置顶</p>
      </Menu.Item>
      <Menu.Item>
          <p  onClick={()=>oncircleHide()}>隐藏帖子</p>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
        <Form
          form={form}
          {...formItemLayout}
          className={styles.detailform}
          actionRef={ref}
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
              <div style={{background:'#F2F2F2',padding:'20px',marginTop:'20px', display:detailData.sourceData?'block':'none'}}>
              <Space>
                <Image width={100} src={detailData.sourceData&&detailData.sourceData.icon} />
                <div>
                <p>{detailData.sourceData&&detailData.sourceData.title}</p>
                {/* <p>{detailData.sourceData.specName}</p> */}
                <p>￥ {detailData.sourceData&&detailData.sourceData.amount}</p>
                </div>
            </Space>
            </div>
            <hr style={{marginTop:'70px'}}/>
            <p style={{marginTop:'20px'}}>共（{listData&&listData.length}）条评论</p>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource={commentList}
              renderItem={item => {
                return <List.Item
                key={item.title}
                actions={[  
                  <ReplyModel 
                    dynamicCommentId={item.dynamicCommentId}
                    // parentId={}
                    label={'回复'}  
                    InterFace={insertReply} 
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
                        item.replys.length>0&&item.replys.map((ele)=>(
                          <>
                           <div style={{display:'flex'}}>
                              <p>{ele.userName}{ele.beUserName?` 回复 ${ele.beUserName} ：`:' ： '}</p>
                              <p>{ele.content}</p>
                            </div>
                          </>
                        ))
                      }
                </div>
              </List.Item>
              }}
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
