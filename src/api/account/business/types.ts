export interface IGetBusinessAccountList {
  /**
   * 企业名查询
   */
  company_name?: string;
  /**
   * 企业状态  0申请中 1未认证 2正常 3预警 4封停
   */
  status?: number | string;
  /**
   * 创建起始时间
   */
  start_time?: string;
  /**
   * 创建截止时间
   */
  end_time?: string;
  /**
   * 当前页
   */
  page?: number;
  /**
   * 每页条数
   */
  limit?: number;
}

export interface ICreateBusinessAccount {
  /**
   * 账户名
   */
  account: string;
  /**
   * 密码
   */
  pwd: string;
  /**
   * 确认密码
   */
  conf_pwd: string;
  /**
   * 联系人姓名
   */
  contacts: string;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 企业名
   */
  company_name: string;
  /**
   * 营业执照图片
   */
  license?: string[];
  /**
   * 法人身份证图片
   */
  idcard_img?: string[];
  /**
   * 行业id
   */
  category_id?: string;
  /**
   * 统一社会信用代码
   */
  credit_code?: string;
  /**
   * 营业执照有效期开始时间
   */
  license_start_date?: string;
  /**
   * 营业执照有效期截止时间
   */
  license_end_date?: string;
  /**
   * 法人
   */
  legal_person?: string;
  /**
   * 法人身份证号
   */
  legal_person_idcard?: string;
  /**
   * 法人电话
   */
  legal_person_mobile?: string;
  /**
   * 营业地址
   */
  company_address?: string;
  /**
   * 开户行
   */
  bank?: string;
  /**
   * 银行账号
   */
  bank_account?: string;
  /**
   * 纳税人识别号
   */
  taxpayer_number?: string;
  /**
   * 纳税人类型:1自然人;2个体工商户;3法人
   */
  taxpayer_type?: string;
  /**
   * 开户许可证图片
   */
  permit_img?: string[];
  /**
   * 纳税人类型证明图片
   */
  taxpayer_type_img?: string[];
  /**
   * 公司门头照片
   */
  header_img?: string[];
  /**
   * 办公地点照片
   */
  office_img?: string[];
  /**
   * 是否申请为渠道
   */
  is_channel?: number;
  /**
   * 企业邮箱
   */
  company_email?: string;
  /**
   * 收件人姓名
   */
  consignee?: string;
  /**
   * 收件人电话
   */
  consignee_mobile?: string;
  /**
   * 收件地址
   */
  address?: string;
  /**
   * 企业来源
   */
  company_source?: number | string;
  /**
   * 渠道管理员姓名
   */
  channel_admin_name?: string;
  /**
   * 父级渠道id
   */
  parent_channel_id?: string;
  /**
   * 父级渠道类型 1个人 2企业
   */
  channel_type?: number | string;
  /**
   * 子渠道id数组
   */
  child_channel_id?: string[];
  /**
   * 税地id
   */
  tax_land_id?: number | string;
  /**
   * 客户点位
   */
  tax_point?: number | string;
  /**
   * 合同图片
   */
  contract_img?: string[];
  /**
   * 合伙人业务拓展协议
   */
  agreement_img?: string[];
  /**
   * 产品列表 product_type产品类型  invoice_type票面种类及税点 cooperate_pointnt价格
   */
  product?: string[];
  is_active?: number;
}

export interface IEditBusinessAccount {
  /**
   * 企业id
   */
  company_id: number;
  /**
   * 账户名
   */
  account?: string;
  /**
   * 密码
   */
  pwd?: string;
  /**
   * 确认密码
   */
  conf_pwd?: string;
  /**
   * 联系人姓名
   */
  contacts?: string;
  /**
   * 手机号
   */
  mobile?: string;
  /**
   * 企业名
   */
  company_name?: string;
  /**
   * 营业执照图片
   */
  license?: [];
  /**
   * 法人身份证图片
   */
  idcard_img?: [];
  /**
   * 行业id
   */
  category_id?: string;
  /**
   * 统一社会信用代码
   */
  credit_code?: string;
  /**
   * 营业执照有效期开始时间
   */
  license_start_date?: string;
  /**
   * 营业执照有效期截止时间
   */
  license_end_date?: string;
  /**
   * 法人
   */
  legal_person?: string;
  /**
   * 法人身份证号
   */
  legal_person_idcard?: string;
  /**
   * 法人电话
   */
  legal_person_mobile?: string;
  /**
   * 营业地址
   */
  company_address?: string;
  /**
   * 开户行
   */
  bank?: string;
  /**
   * 银行账号
   */
  bank_account?: string;
  /**
   * 纳税人识别号
   */
  taxpayer_number?: string;
  /**
   * 纳税人类型:1自然人;2个体工商户;3法人
   */
  taxpayer_type?: string;
  /**
   * 开户许可证图片
   */
  permit_img?: [];
  /**
   * 纳税人类型证明图片
   */
  taxpayer_type_img?: [];
  /**
   * 公司门头照片
   */
  header_img?: [];
  /**
   * 办公地点照片
   */
  office_img?: [];
  /**
   * 是否申请为渠道
   */
  is_channel?: number;
  /**
   * 企业邮箱
   */
  company_email?: string;
  /**
   * 收件人姓名
   */
  consignee?: string;
  /**
   * 收件人电话
   */
  consignee_mobile?: string;
  /**
   * 收件地址
   */
  address?: string;
  /**
   * 企业来源
   */
  company_source?: string | number;
  /**
   * 渠道管理员姓名
   */
  channel_admin_name?: string;
  /**
   * 父级渠道id
   */
  parent_channel_id?: string;
  /**
   * 父级渠道类型 1个人 2企业
   */
  channel_type?: number;
  /**
   * 子渠道id数组
   */
  child_channel_id?: [];
  /**
   * 税地id
   */
  tax_land_id?: number;
  /**
   * 客户点位
   */
  tax_point?: number;
  /**
   * 合同图片
   */
  contract_img?: [];
  /**
   * 合伙人业务拓展协议
   */
  agreement_img?: [];
  /**
   * 产品列表 product_type产品类型  invoice_type票面种类及税点 cooperate_pointnt价格
   */
  product?: [];
  /**
   * 佣金结算时间类型 1按周结 2按月结
   */
  commission_settlement_type?: number;
}

export interface ICheckBusinessAccount {
  /**
   * 企业id
   */
  id: number;
  /**
   * 审核状态 1通过 2驳回
   */
  audit_status: number;
  /**
   * 驳回原因
   */
  reason?: string;
}
