import { useState, useRef,useEffect } from 'react';
import { Button,Descriptions} from 'antd';
import { getActiveConfigList} from '@/services/intensive-activity-management/penny-activity';
import { PageContainer } from '@ant-design/pro-layout';


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
  const [detailList,setDetailList]=useState<{}>()
  useEffect(()=>{
  
  },[])
    return (
      <PageContainer>
        <Descriptions labelStyle={{fontWeight:'bold'}} column={9} layout="vertical" bordered>
            <Descriptions.Item  label="采购店主数">{detailList?.totalMemberNum}  </Descriptions.Item>
            <Descriptions.Item  label="B端采购订单数">{detailList?.totalNum}  </Descriptions.Item>
            <Descriptions.Item  label="B端采购份数">{detailList?.restNum}  </Descriptions.Item>
            <Descriptions.Item  label="C端零售份数">{detailList?.useNum}  </Descriptions.Item>
            <Descriptions.Item  label="零售新用户数">{detailList?.reclaimNum}  </Descriptions.Item>
            <Descriptions.Item  label="C端转化率">{detailList?.prizeNum}  </Descriptions.Item>
            <Descriptions.Item  label="活动分享人数">{detailList?.noPrizeNum}  </Descriptions.Item>
            <Descriptions.Item  label="活动分享次数">{detailList?.noPrizeNum}  </Descriptions.Item>
            <Descriptions.Item  label="受邀注册数（绑定关系）">{detailList?.noPrizeNum}  </Descriptions.Item>
        </Descriptions>
      </PageContainer>
    );
  };