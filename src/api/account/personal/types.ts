export interface IGetPersonalAccountList {
  /**
   * 名字查询
   */
  name?: string;
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

export interface IEditPersonalAccount {
  /**
   * 用户id
   */
  id?: number;
  /**
   * 用户名
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
   * 真实姓名
   */
  real_name?: string;
  /**
   * 身份证号
   */
  idcard?: string;
  /**
   * 身份证图片
   */
  idcard_img?: [];
  /**
   * 开户行
   */
  bank?: string;
  /**
   * 银行卡号
   */
  bank_account?: string;
  /**
   * 开户地址
   */
  address?: string;
  /**
   * 银行卡照片
   */
  bank_card_img?: [];
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 个人签字照片
   */
  sign_img?: [];
  /**
   * 认证视频
   */
  attestation_video_url?: string;
  /**
   * 是否是渠道
   */
  is_channel?: string;
  /**
   * 渠道管理员姓名
   */
  channel_admin_name?: string;
}
