// 企业
export enum settlementCenterList {
  "结算中",
  "结算成功",
  "部分结算成功",
  "结算失败",
  "冻结",
}
export enum settlementCenterTaskEnum {
  "待结算",
  "已成功",
  "失败",
}
export enum invoiceStatusEnum {
  "未申请",
  "申请中",
  "已发票",
}
// 渠道
// 渠道佣金结算
export enum channelCommissionSettlementList {
  "待确认",
  "待下发",
  "已下发",
  "驳回",
}
// 渠道分成结算
export enum channelSharingSettlementList {
  "待确认",
  "待下发",
  "已下发",
  "驳回",
}
export enum distributeStatusEnum {
  "待下发",
  "已下发",
  "下发异常",
}
export enum incomeType {
  "企业",
  "渠道",
}
// 渠道结算状态
export enum channelSettlementStatus {
  "未结算",
  "待确认",
  "待下发",
  "已下发",
  "驳回",
}
