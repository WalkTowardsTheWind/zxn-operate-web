/**
 * 新建企业合同
 */
export interface enterpriseContractAddType {
  /**
   * 企业合同名称
   */
  contract_name: string;
  /**
   * 企业合同编号
   */
  contract_no: string;
  /**
   *线上类型 0=线上 1=线下
   */
  online_type: number;
  /**
   * 合同种类:
   * 1业务拓展协议(个人)
   * 2业务拓展协议(企业)
   * 3共享经济服务协议
   * 4自由职业者服务协议
   */
  contract_kind: string;
  /**
   * 合同期限
   */
  contract_term: string;
  /**
   * 签约时间
   */
  sign_time: string;
  /**
   * 到期时间
   */
  end_time: string;
  /**
   * 附件
   */
  annex_url: Array<string>;
  /**
   * 点位
   */
  tax_location: string;
  /**
   * 备注
   */
  remarks: string;
  /**
   * 合同文件
   */
  file_url: Array<string>;
  /**
   * 甲方名称
   */
  party_a: string;
  /**
   * 乙方名称
   */
  party_b: string;
}
/**
 * 关键字
 */
export interface enterpriseContractListType {
  /**
   * 关键字
   */
  keywords: string;
  start_time: string;
  end_time: string;
  contract_kind: string;
  page: string;
  limit: string;
  status: string;
}

/**
 * 修改企业合同
 */
export interface enterpriseContractEditType {
  /**
   * 企业合同名称
   */
  contract_name: string;
  /**
   *线上类型 0=线上 1=线下
   */
  contract_no: string;
  /**
   *线上类型 0=线上 1=线下
   */
  online_type: number;
  /**
   * 合同种类:
   * 1业务拓展协议(个人)
   * 2业务拓展协议(企业)
   * 3共享经济服务协议
   * 4自由职业者服务协议
   */
  contract_kind: string;
  /**
   * 合同期限
   */
  contract_term: string;
  /**
   * 签约时间
   */
  sign_time: string;
  /**
   * 到期时间
   */
  end_time: string;
  /**
   * 附件
   */
  annex_url: Array<string>;
  /**
   * 点位
   */
  tax_location: string;
  /**
   * 备注
   */
  remarks: string;
  /**
   * 合同文件
   */
  file_url: Array<string>;
  /**
   * 甲方名称
   */
  party_a: string;
  /**
   * 乙方名称
   */
  party_b: string;
}
/**
 * 企业详情合同
 */
export interface enterpriseContractDetailsType {
  /**
   * 企业合同名称
   */
  contract_name: string;
  /**
   *线上类型 0=线上 1=线下
   */
  contract_no: string;
  /**
   * 合同种类:
   * 1业务拓展协议(个人)
   * 2业务拓展协议(企业)
   * 3共享经济服务协议
   * 4自由职业者服务协议
   */
  contract_kind: string;
  /**
   * 合同期限
   */
  contract_term: string;
  /**
   * 签约时间
   */
  sign_time: string;
  /**
   * 到期时间
   */
  end_time: string;
  /**
   * 附件
   */
  annex_url: Array<string>;
  /**
   * 点位
   */
  tax_location: string;
  /**
   * 备注
   */
  remarks: string;
  /**
   * 合同文件
   */
  file_url: Array<string>;
  /**
   * 甲方名称
   */
  party_a: string;
  /**
   * 乙方名称
   */
  party_b: string;
}
