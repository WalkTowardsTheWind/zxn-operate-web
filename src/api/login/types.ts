/**
 * 登录请求参数
 */
export interface LoginData {
  /**
   * 用户名
   */
  account: string;
  /**
   * 密码
   */
  pwd: string;
  /**
   * 验证码
   */
  imgcode: string;
}
/**
 * 忘记密码请求参数
 */
export interface RegisterData {
  /**
   *手机号
   */
  mobile: string;
  /**
   * 密码
   */
  pwd: string;
  /**
   * 确认密码
   */
  conf_pwd: string;
  /**
   *  手机验证码
   */
  code: string;
}
/**
 * 获取验证码
 */
export interface GetPhone {
  phone: string;
}
