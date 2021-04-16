
import Vue from 'vue'
import App from './App'
import './static/icon/iconfont.css'
import axios from 'axios'
import uView from "uview-ui";
import tool from './request/tool'
import cache from './request/cache'
import store from './store'
import mixin from './utils/mixins/base.js'
Vue.use(uView);
Vue.mixin(mixin)
Vue.prototype.$store = store  
Vue.config.productionTip = false
//字段对照
import switchFormatter from './utils/formatter'

Vue.prototype.$formatter = switchFormatter;

Vue.prototype.$tool = tool;
Vue.prototype.$cache = cache;

// if (uni.getSystemInfoSync().platform !== "devtools") {
// 	console.log = () => {}
// }

// 解决微信小程序adapter
axios.defaults.adapter = function(config) {
    return new Promise((resolve, reject) => {
        var settle = require('axios/lib/core/settle');
        var buildURL = require('axios/lib/helpers/buildURL');
        uni.request({
            method: config.method.toUpperCase(),
            url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
            header: config.headers,
            data: config.data,
            dataType: config.dataType,
            responseType: config.responseType,
            sslVerify: config.sslVerify,
            complete: function complete(response) {
                response = {
                    data: response.data,
                    status: response.statusCode,
					request: response.data,
                    errMsg: response.errMsg,
                    header: response.header,
                    config: config
                };

                settle(resolve, reject, response);
            }
        })
    })
}
App.mpType = 'app'


const app = new Vue({
	...App,
	 store
})
app.$mount()
