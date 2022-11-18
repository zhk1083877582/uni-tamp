import dt from '@dt/dt';

export default {
  method: 'post',
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
    target: dt.env.dtUrl,
  },

}