import { orderTypes } from '@/services/financial-management/common'

export const tradeType = () => {
  orderTypes({}).then(res=> {
    return res.data
  })
}
// {
  // 'goodsAmount': '货款',
  // 'goodsAmountReturn': '货款回退',
  // 'commission': '店主收益',
  // 'commissionReturn': '店主收益回退',
  // 'platformCommission': '平台收益',
  // 'platformCommissionReturn': '平台收益回退',
  // 'fee': '交易通道费',
  // 'feeReturn': '交易通道费回退',
  // 'recharge': '充值',
  // 'giveOut': '划扣',
  // 'withdraw': '提现',
  // 'refundRecharge': '售后款',
  // 'debt': '欠款',
  // 'debtReturn': '欠款偿还',
  // 'unfreeze': '解冻',
  // 'freeze': '冻结',
  // 'suggestCommission': '推荐店主收益',
  // 'suggestCommissionReturn': '推荐店主收益回退',
  // 'agentCompanyCommission': '运营中心收益',
  // 'agentCompanyCommissionReturn': '运营中心收益回退',
  // 'freight': '运费',
  // 'freightReturn': '运费回退',
  // 'yeahCardRecharge': '约卡充值',
  // 'deposit': '保证金',
  // 'depositReturn': '保证金回退'
// }