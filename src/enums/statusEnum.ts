export enum TaskEnum {
  "申请中" = 1,
  "驳回" = 2,
  "报名中" = 3,
  "已验收" = 4,
  // "封停" = 6,
}

export enum IndustryType {
  "建筑业",
  "服务业",
}

export enum personalType {
  "未认证" = 0,
  "正常",
  "预警",
  "封停",
}

export enum channelAccountStatusType {
  "申请中",
  "未认证",
  "正常",
  "预警",
  "封停",
}

export enum contractType {
  "正常",
  "过期",
  "停用",
}
export enum settlementType {
  "已结算",
  "冻结",
  "异常",
}

export enum personnelType {
  "已报名",
  "驳回",
  "已录取",
  "已完结",
}

export enum invoiceStatus {
  "申请中",
  "已开票",
  "驳回",
  "冲红",
  "已收票" = 5,
}

export enum invoiceType {
  "普票",
  "专票",
}

export enum applyInvoiceType {
  "普票",
  "专票",
}
export enum invoiceRequire {
  "下发开票",
  "充值开票",
  "预开票",
}

export enum openStatus {
  "一个月",
  "三个月",
  "半年",
  "长期",
}

export enum settlementTypeStatus {
  "日结" = 1,
  "周结",
  "月结",
  "完工结",
}

export enum InvoiceType {
  "纸质发票" = 1,
  "电子发票",
}
