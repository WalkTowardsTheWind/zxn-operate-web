export enum taxLandStatus {
  "待启用",
  "启用中",
  "冻结",
  "预警",
}
export enum InvoiceType {
  "普通发票",
  "6%增值税发票",
  "普通发票/6%增值税发票",
}
export enum invoice_denomination {
  "万元版",
  "十万元版",
  "百万元版",
}
export enum calculationType {
  "内扣",
  "外扣",
}
export enum is_payment_api {
  "是",
  "否",
}
export enum tax_land_type {
  "自营税地",
  "采购税地",
}
export enum CertificationRules {
  "无（无身份证信息无法报税，慎选）",
  "个税申报二要素（人名，身份证）",
  "运营商三要素（姓名，手机号，身份证号）",
  "银行卡三要素（姓名，身份证，银行卡）",
}
export enum SigningRules {
  "无（无个人合同，税务可行否，慎选）",
  "静默签（下发后默认签约）",
  "有感签刷脸意愿校验签约",
  "有感短信校验签约",
}
export enum EntrustedCollectionPeriod {
  "一年",
}
export enum paymentType {
  "不限",
  "自动",
  "手动",
}
export enum balanceType {
  "向上取整" = 1,
  "向下取整",
  "四舍五入",
}
export enum commissionRule {
  "单笔扣除" = 1,
  "合计扣除",
}

// 新建

// taxLandManagementEnum
// proxy.$const['taxLandManagementEnum.contractTerm']
// proxy.$enumSet['taxLandManagementEnum.contractType']
// const { proxy } = getCurrentInstance() as any;
