/**
 * 渠道结算列表
 */
export interface keywords {
  keywords: string;
}

/**
 * 修改渠道结算状态
 */
export interface updateStatus {
  id: string;
  status: string;
  transfer_certificate: string;
}
