import React, { useState, useEffect,useRef } from 'react';
import { Input, Form, Divider, message, Button,List, Space,Avatar } from 'antd';
import { ModalForm} from '@ant-design/pro-form';
import { saveOrUpdateArticleType,articleTypeAdd } from '@/services/business-school/save-or-update-article-type';
import { articleTop } from '@/services/cms/member/member';
import { ExclamationCircleFilled } from '@ant-design/icons';

export default props=>{
    const {earnestMoney,visible,setVisible,callback,onClose}=props
    return (
        <ModalForm
            title={
                <>
                <ExclamationCircleFilled style={{color:'#FBB936'}}/>
                <span> 确认要将XXX省XXX市XXX社区店的入驻保证金调整为XXXX.XX元么？</span>
                </>
            }
            key="model2"
            onVisibleChange={setVisible}
            visible={visible}
            modalProps={{
              forceRender: true,
              destroyOnClose: true,
              onCancel: () => {
                onClose();
              }
            }}
            submitter={{
              searchConfig: {
                submitText: '继续',
                resetText: '取消',
              },
            }}
            onFinish={async (values) => {
                  articleTypeAdd({ id: earnestMoney.id,isTop: !earnestMoney.isTop}).then((res) => {
                        if (res.code === 0) {
                          message.success(`设置保证金成功！`);
                          setVisible(false)
                          callback(true)
                        }
                      })
            }
               
            }
        >
          <p><span style={{color:'red'}}>修改后入驻店铺需缴纳XXXX.xx元</span>，你还要继续吗？</p>
    </ModalForm>
    )
}


