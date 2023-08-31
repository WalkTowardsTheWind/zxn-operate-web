/**
 * 关键字
 */
export interface selfOperatedTaxLandList {
  /**
   * 关键字
   */
  keywords?: string;
  tax_land_type?: string;
  start_time?: string;
  end_time?: string;
  invoice_type?: string;
  invoice_denomination?: string;
  calculation_type?: string;
  tax_manufacturer?: string;
  page?: string;
  limit?: string;
}
/**
 * 新建税地
 */
export interface selfOperatedTaxLandAdd {
  tax_land_head: string;
  head_mobile: string;
  tax_land_name: string;
  tax_land_type: string;
  tax_manufacturer: string;
  bank_account: string;
  tax_cost_point: string;
  calculation_type: string;
  min_employment_year: string;
  max_employment_year: string;
  tax_land_city_id: string;
  web_url: string;
  tax_land_license: Array<string>;
  company_qualifications: Array<string>;
  audit_web_url: string;
  audit_account: string;
  audit_password: string;
  industry_category_id: string;
  invoice_type: string;
  invoice_denomination: string;
  max_money: string;
  tax_point: string;
  payment_type: string;
  is_payment_api: string;
  payment_supplier: string;
  invoice_sample: Array<string>;
  certification_form: string;
  sign_form: string;
  industry_limit: string;
  tax_contract_term: string;
  incoming_materials: string;
  agreement_url: Array<string>;
}
/**
 * 编辑税地
 */
export interface selfOperatedTaxLandEditType {
  tax_land_head: string;
  head_mobile: string;
  tax_land_name: string;
  tax_land_type: string;
  tax_manufacturer: string;
  bank_account: string;
  tax_cost_point: string;
  calculation_type: string;
  min_employment_year: string;
  max_employment_year: string;
  tax_land_city_id: string;
  web_url: string;
  tax_land_license: Array<string>;
  company_qualifications: Array<string>;
  audit_web_url: string;
  audit_account: string;
  audit_password: string;
  industry_category_id: string;
  invoice_type: string;
  invoice_denomination: string;
  max_money: string;
  tax_point: string;
  payment_type: string;
  is_payment_api: string;
  payment_supplier: string;
  invoice_sample: Array<string>;
  certification_form: string;
  sign_form: string;
  industry_limit: string;
  tax_contract_term: string;
  incoming_materials: string;
  agreement_url: Array<string>;
}
/**
 * 获取税地详情
 */
export interface selfOperatedTaxLandDetailsType {
  tax_land_head: string;
  head_mobile: string;
  tax_land_source: string;
  tax_manufacturer: string;
  tax_cost_point: string;
  calculation_type: string;
  min_employment_year: string;
  max_employment_year: string;
  tax_land_city_id: string;
  web_url: string;
  tax_land_license: string;
  company_qualifications: string;
  audit_web_url: string;
  audit_account: string;
  audit_password: string;
  industry_category_id: string;
  invoice_denomination: string;
  max_money: string;
  tax_point: string;
  is_payment_api: string;
  payment_supplier: string;
  invoice_sample: string;
  certification_form: string;
  sign_form: string;
  industry_limit: string;
  tax_contract_term: string;
  incoming_materials: string;
  agreement_url: Array<string>;
}
/**
 * 修改税地状态
 */
export interface selfOperatedTaxLandUpdateStatusType {
  id: number;
  status: string;
}
