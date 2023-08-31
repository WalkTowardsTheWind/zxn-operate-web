export enum businessType {
  "申请中" = 0,
  "未认证",
  "正常",
  "预警",
  "封停",
}

export enum personalType {
  "申请中" = 0,
  "未认证",
  "正常",
  "预警",
  "封停",
}

export enum taxpayerType {
  "小规模" = 1,
  "一般人",
}

export enum statusType {
  "关闭" = 0,
  "启用",
}

export enum taxLandStatusType {
  "禁用" = 0,
  "启用",
}

export enum taskType {
  "未到账" = 0,
  "已到账",
  "异常充值",
  "服务费退回",
}

export enum settleStatus {
  "结算中",
  "已结算",
  "部分结算",
  "结算失败",
  "冻结",
}

export enum taskStaus {
  "待申请",
  "申请中",
  "驳回",
  "报名中",
  "已验收",
  "封停",
  "关闭",
}

export enum signType {
  "静默签" = 1,
  "二维码签约",
  "短信签约",
}
export enum authType {
  "二要素（姓名、身份证）" = 1,
  "三要素（姓名、手机号、身份证）",
  "三要素（姓名、身份证、银行卡）",
  "四要素（姓名、手机号、身份证、银行卡）",
}
