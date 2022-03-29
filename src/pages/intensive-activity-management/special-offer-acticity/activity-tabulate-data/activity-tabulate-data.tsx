import { useState, useRef } from 'react';
import { Button,Descriptions} from 'antd';
import ProTable from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { getActiveConfigList} from '@/services/intensive-activity-management/penny-activity';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import moment from 'moment'
import type { ProColumns,ActionType } from '@ant-design/pro-table';


// type activityItem={
//   id:number;
//   name:string;
//   startTime:number;
//   endTime:number;
//   shoperLimitAll:number;
//   buyerLimit:number;
//   joinShopType:number;
//   joinBuyerType:number;
//   goodsCount:number;
//   actStatus:number;
//   statusDisplay:string
// }

// interface ItemProps {
//   id:number;
//   statusDisplay:string;
//   status: number;
// }

export default () => {
   
    return (
      <PageContainer>
        <Descriptions labelStyle={{fontWeight:'bold'}} column={7} layout="vertical" bordered>
            <Descriptions.Item  label="参与总人数">{detailList?.totalMemberNum}  </Descriptions.Item>
            <Descriptions.Item  label="已发放次数">{detailList?.totalNum}  </Descriptions.Item>
            <Descriptions.Item  label="未使用次数">{detailList?.restNum}  </Descriptions.Item>
            <Descriptions.Item  label="已使用次数">{detailList?.useNum}  </Descriptions.Item>
            <Descriptions.Item  label="已回收">{detailList?.reclaimNum}  </Descriptions.Item>
            <Descriptions.Item  label="已兑奖数">{detailList?.prizeNum}  </Descriptions.Item>
            <Descriptions.Item  label="未兑奖数">{detailList?.noPrizeNum}  </Descriptions.Item>
        </Descriptions>
      </PageContainer>
    );
  };