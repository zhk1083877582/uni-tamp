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
    // target:'http://172.16.9.106:8100',//开发
    // target:'https://dtwgwtest.tospurhouse.net',//测试
    // target: 'https://dtgwstag.tospurfang.com', //预发布
    target: 'https://dtgw.tospurfang.com', //生产
  },

}