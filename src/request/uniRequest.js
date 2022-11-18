import axios from 'axios' // 注意先安装哦
import config from './config.js' // 倒入默认配置
import tool from "@/request/tool.js"
import dt from "@dt/dt"
//import qs from "qs"
 const instance = axios.create({
      // baseURL: config.baseURL,
     // baseURL:process.env.NODE_ENV =="production"?config.baseURL.target:'',
      baseURL:config.baseURL.target,
      headers: {'Content-Type': 'application/json;charset=UTF-8','appId':'36'},
      transformResponse: [function(data) {
          // console.log(data)
      }]
    })

    // request 拦截器
  instance.interceptors.request.use(
      config => {
        // Tip: 1
        // 请求开始的时候可以结合 vuex 开启全屏的 loading 动画

        // Tip: 2
        if (tool.isPhoneLogin()) {
            // config.headers['token'] = tool.isPhoneLogin() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
			// config.headers['appId'] = tool.getStorage('Login-Data').customerInfo.appId||'36'
			// console.log(tool.isPhoneLogin(),'token  token')
        } else {
            // 重定向到登录页面
        }

        // Tip: 3
        // 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        // if (
        //   config.method.toLocaleLowerCase() === 'post' ||
        //   config.method.toLocaleLowerCase() === 'put' ||
        //   config.method.toLocaleLowerCase() === 'delete'
        // ) {
        
          //config.data = config.data
        //}
        //config.data = qs.stringify(config.data);
        // config.url = config.url.replace(/\/api/,'');
        return config
      },
      error => {
        // 请求错误时做些事(接口错误、超时等)
        // Tip: 4
        // 关闭loadding
        console.log('request:', error)

        //  1.判断请求超时
        if (
          error.code === 'ECONNABORTED' &&
          error.message.indexOf('timeout') !== -1
        ) {
          console.log('根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案')
         showToast("请求超时");
          // return service.request(originalRequest);//例如再重复请求一次
        }
        //  2.需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          // error =errorInfo.data//页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          // const errorStatus = errorInfo.status // 404 403 500 ... 等
          // router.push({
          //   path: `/error/${errorStatus}`
          // })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
		 let data = response.request;
		 data = data.response?(typeof data.response==='string'?data.response:data.response):data;
		 // // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
		 // if (response.data === undefined) {
		 //   data = response.request?typeof(response.request)=='string'?JSON.parse(response.request):response.request:''
		 // } else {
		 //   data = response.request?typeof(response.request)=='string'?JSON.parse(response.request):response.request:''
		 // }
		 // 根据返回的code值来做不同的处理（和后端约定）
		 if(data.code == 200){
		   data = data.data;
		   if(data && !instance.prototype.ifEncrypt)data = data
		   return data
		 }else{
		   return Promise.reject(data) 
		 }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.description)

        // err.data = data
        // err.response = response

        // throw err
        
      },
      err => {
		  console.log(err.response,444555)
		  console.log(err.response.errMsg,'报错信息')
        if (err && err.response) {
			
          switch (err.response.status) {
			
            case 400:
              err.message = '请求错误'
              break

            case 401:
              // Dialog.alert({
              //   title: '请求报错',
              //   message: '未授权，请登录',
              // }).then(() => {
              //   let name = window.location.hash.split("#/")[1] || '';
              //   window.location.href = "/#/login?topath="+name
              // });
							// uni.navigateTo({
							// 	url: '/pages/journey/index'
							// });
							// showToast("未授权，请登录");
				dt.storage.remove('isPhoneLogin');
				dt.storage.remove('Login-Data');
				return Promise.reject(err.response) // 返回接口返回的错误信息
              err.message = false;
              break

            case 403:
              err.message = '拒绝访问'
              break

            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break

            case 405:
              err.message = '请求超时'
              break

            case 500:
              err.message = '服务器内部错误'
              break

            case 501:
              err.message = '服务未实现'
              break

            case 502:
              err.message = '网关错误'
              break

            case 503:
              err.message = '服务不可用'
              break

            case 504:
              err.message = '网关超时'
              break

            case 505:
              err.message = 'HTTP版本不受支持'
              break
           case undefined:
		    err.message = '网络错误'
			 showToast('网络错误');
			 err.message = false;
			 break
			
            default:
          }
        }
        if(err.message == "Network Error"){//网络出现问题
           err.message = "网络异常 请切换网络环境"
          }else{
            err.message && showToast(err.message);
          return Promise.reject(err) // 返回接口返回的错误信息
          }
          
      
        }
    )
const commonParams= {
	    appName: 'DT-XCX',
	    appVersion: '2.0.0',
	    appId: 36
	  }
let apiRequest =function(instance){
  this.instance = instance;

  this.handleDate = function(data,ifEncrypt){
    let l = tool.extend({},data,commonParams);
    ifEncrypt?this.instance.prototype.ifEncrypt = true:this.instance.prototype.ifEncrypt = false;
    return l;
  }
}
apiRequest.prototype.$post = function(url,data={},ifEncrypt){
  data =  this.handleDate(data,ifEncrypt)
 return this.instance.post(url,data)
}


apiRequest.prototype.$postForm = function(url,data={},ifEncrypt){
  data =  this.handleDate(data,ifEncrypt)
	// return this.instance.post(url,data)
	return this.instance.post(url, data, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  })
}


apiRequest.prototype.$get = function(url,data={}){
  data =  this.handleDate(data)
  return this.instance.get(url,data)
}
export const apiRequestList = new apiRequest(instance);

function showToast(data) {
	uni.showToast({
		title: data,
		icon: 'none',
		duration: 5000
	});
}
