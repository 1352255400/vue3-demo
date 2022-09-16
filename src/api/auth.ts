import request from '@/utils/request';

// 加载模型实体
import types from '@/types/api/auth';

// 模块名：kpi
export default {
  // 获取用户权限
  getPermissions() {
    return request({
      url: '/openplatform/auth/getPermissionsCode',
      method: 'get'
    });
  },
  // 登出
  logout() {
    return request({
      url: '/openplatform/auth/logout',
      method: 'get'
    });
  },

  // 检查票据
  login(data: types.FormData) {
    return request({
      url: '/openplatform/auth/login',
      method: 'put',
      data
    });
  },

  // 检查票据
  checkSecret(data: types.FormData) {
    return request({
      url: '/openplatform/auth/checkSecret',
      method: 'put',
      data
    });
  },

  // 获取登录用户详情
  getLoginInfo() {
    return request({
      url: '/openplatform/auth/getLoginInfo',
      method: 'get'
    });
  },

  // 获取验证码
  getCaptcha() {
    return request({
      url: '/openplatform/auth/captcha',
      method: 'get'
    });
  }
};
