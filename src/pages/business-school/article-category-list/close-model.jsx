import React, { useState, useEffect,useRef } from 'react';
import { Input, Form, Divider, message, Button,List, Space,Avatar } from 'antd';
import { ModalForm} from '@ant-design/pro-form';
import { saveOrUpdateArticleType } from '@/services/business-school/save-or-update-article-type';

export default props=>{
    const {formControl,boxref,visible,setVisible}=props
    return (
        <ModalForm
            title={
                formControl.isShow?
                '确认关闭么？'
                :'确认启用么？'
            }
            key="model2"
            onVisibleChange={setVisible}
            visible={visible}
            submitter={{
            render: (props, defaultDoms) => {
                return [
                ...defaultDoms
                ];
            },
            }}
            onFinish={async (values) => {
              saveOrUpdateArticleType({id: formControl.id, isShow: !formControl.isShow}).then((res) => {
                  if (res.code === 0) {
                    message.success(`操作成功`);
                    boxref.current.reset();
                    setVisible(false)
                  }
                })
            }
               
            }
        >
            {
                 formControl.isShow?
                 <p><span style={{color:'red'}}>关闭后店主无法查看</span>，你还要继续吗？</p>
                 :<p><span style={{color:'red'}}>开启后店主即可查看</span>，你还要继续吗？</p>
            }
    </ModalForm>
    )
}


