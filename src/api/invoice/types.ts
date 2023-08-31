import { getInvoiceExcel } from "@/api/invoice/index";

/**
 * 角色查询参数
 */
export interface invoiceQuery extends PageQuery {
  invoice_name?: string;
  tax_land_id?: string;
  invoice_type?: string;
  category_id?: string;
  start_time?: string;
  end_time?: string;
  status?: number;
}

/**
 * 上传企业发票
 */
export interface uploadQuery {
  express_id: string;
  express_no: string;
  invoice_sample_url: string;
  express_url: string;
}

export interface invoiceStatus {
  ids: string[];
  status: number;
}

/**
 * 角色查询参数
 */
export interface invoiceExcel extends PageQuery {
  ids: number[];
}
