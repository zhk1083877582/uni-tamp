export default {
  method: 'post',
  // 基础url前缀
  baseURL: '',
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // 参数
  data: {},

  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: false,
  // 返回数据类型
  responseType: 'json',
  baseURL: {
    target: 'http://172.16.1.126:8100', // 开发环境
    // target: 'https://dtwgwtest.tospur.com', // 测试环境
    // target: 'https://dtgwstag.tospurfang.com', // uat环境
    // target: 'https://dtgw.tospurfang.com', //DT正式生产环境
  },

}