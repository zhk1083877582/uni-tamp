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
	// baseURL: {
	// 	// target: 'http://172.16.9.58:8100', // 开发版接口
	// 	// target: 'https://tcwgwdev.tospur.com:18443', // 开发版本接 口
	// 	target: 'https://ztwgwtest.tospurhouse.net', // 测试版接口  
	// 	// target: 'https://tcwgwstag.tospurhouse.net', // 预发布接口
	// 	// target: 'https://tcwgwprod.tospurhouse.net', // 正式环境接口
	// }
	baseURL:{
		// target:'https://dtwgwprod.tospurhouse.net',//生产
		target:'https://dtwgwstag.tospurhouse.net',//预发布
		// target:'https://dtwgwtest.tospurhouse.net',//测试
		// target:'http://172.16.9.106:8100',//开发
		// target:'http://172.16.17.74:8100'
	}
}
