import config from './config'
import cache from './cache.js'
Function.prototype.method = function (name, fn) {
  this.prototype[name] = fn;
  return this;
}

if (!String.prototype.trim) {
  String.method("trim", function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  })
}
var isType = function (type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) == '[object ' + type + ']';
  };
};
var isArray = isType("Array");
var isStr = isType("String");
var isObject = isType("Object");
var isFun = isType("Function");
var isRegExp = isType("RegExp");
const TOOL = {
  isArray: isArray,
  isStr: isStr,
  isObject: isObject,
  isFun: isFun,
  isRegExp: isRegExp,
  extend: function () {
    var options, copyIsArray,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (let name in options) {
          let clone,
            src = target[name],
            copy = options[name];
          if (target === copy) continue;
          if (deep && copy && (isObject(copy) ||
              (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isObject(src) ? src : {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  },

  // openLoading() {
  //   store.dispatch('saveIsLoading', true)
  // },
  // closeLoading() {
  //   store.dispatch('saveIsLoading', false)
  // },

  getStorage(item) {
	return  uni.getStorageSync(item)
    // var value;
    // value =uni.setStorage.getItem(item)
    // return (value ? this.decrypt(value) : '')
  },
  setStorage(obj){
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	       uni.setStorageSync(key, obj[key]);
	    }
	  }
  },
  encrypt(value) {
    var encryptValue = ''
    var mask
    var maskValue
    for (var i = 0, len = value.length; i < len; i++) {
      mask = Math.round(Math.random() * 111) + 77
      maskValue = value.charCodeAt(i) + mask
      mask += i
      encryptValue += String.fromCharCode(maskValue, mask)
    }
    return encryptValue
  },
  decrypt(value) {
    var decryptValue = ''
    var k = 0
    var v
    var m
    var decrypt = function (v, m, i) {
      v = v.charCodeAt(0)
      m = m.charCodeAt(0)
      m -= i
      v -= m
      return String.fromCharCode(v)
    }
    for (var i = 0, len = value.length; i < len; i++) {
      if (!(i % 2)) {
        v = value[i]
      } else {
        m = value[i]
        decryptValue += decrypt(v, m, k)
        k++
      }
    }
    return decryptValue
  },
  getToken() {
    return  uni.getStorageSync("M-Token") || ''
  },
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  setCookie: function (name, value, day) {
    if (day !== 0) { //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      var expires = day * 24 * 60 * 60 * 1000;
      var date = new Date(+new Date() + expires);
      document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
    } else {
      document.cookie = name + "=" + escape(value);
    }
  },
  delCookie: function (name) {
    this.setCookie(name, ' ', -1);
  },
  copy: function (source) {
    let result = Array.isArray(source) ? [] : {};
    for (var key in source) {
      result[key] = source[key] != null && typeof source[key] === 'object' ? this.copy(source[key]) : source[key];
    }
    return result;
  },
  getTime: function (t) {
    if (!t) return new Date().getTime();
    return new Date(String(t).replace(/-/g, "/")).getTime();
  },
  dateFtt: function (fmt, date) {
    if (typeof date === "string" || typeof date === "number") {
      date = new Date(date);
    }
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },

  getUrlParams(name) {
    var url='';
    if(window.location.search==''){
      url = window.location.hash;
    }else{
      url = window.location.search;
    }

    // var url = window.location.search;
    // var url = window.location.hash;
    var n =url.indexOf('?');
    console.log("n")
    console.log(n)
    // if (url.indexOf('?') == 1) {
    //   return false;
    // }
    url = url.substr(n+1);
    url = url.split('&');
    var name = name || '';
    var nameres;
    for (var i = 0; i < url.length; i++) {
      var info = url[i].split('=');
      var obj = {};
      obj[info[0]] = decodeURI(info[1]);
      url[i] = obj;
    }
    if (name) {
      for (var i = 0; i < url.length; i++) {
        for (const key in url[i]) {
          if (key == name) {
            nameres = url[i][key];
          }
        }
      }
    } else {
      nameres = url;
    }
    return nameres;
  },

  //数组对象深拷贝
  deepClone: function (obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          //判断ojb子元素是否为对象，如果是，递归复制
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = deepClone(obj[key]);
          } else {
            //如果不是，简单复制
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  },
  //propertyType物业类型转换
  propertyTypeFlag(value) {
    let set = {
      1: "住宅",
      2: "别墅",
      3: "商铺",
      4: "写字楼",
      5: "酒店式公寓",
      6: "车位",
      7: "动迁房",
      8: "其他",
      9: "洋房",
      10: "公寓"
    };
    return set.hasOwnProperty(value) ? set[value] : value;
  },
  //朝向转换
  orientedFlag(value) {
    let set = {
      1: "正南",
      2: "正北",
      3: "正东",
      4: "正西",
      5: "东南",
      6: "西南",
      7: "东北",
      8: "西北"
    };
    return set.hasOwnProperty(value) ? set[value] : value;
  },
  //销售类型转换
  salesStatusFlag(value) {
    let set = {
      1: "待售",
      2: "在售",
      3: "售罄",
      4: "在租"
    };
    return set.hasOwnProperty(value) ? set[value] : value;
  },
  /** 抖动消除函数封装 截流执行, 例子：
  *   绑定监听query，截流执行，延迟200ms派发事件
  *   this.$watch('query', debounce((newQuery) => {
  *       this.$emit('query', newQuery);
  *   }, 200));
  **/
  debounce(func, delay) {
      let timer;
      return function (...args) {
          if (timer) {
              clearTimeout(timer);
          }
          timer = setTimeout(() => {
              func.apply(this, args);
          }, delay);
      };
  },
  returnWebviewUrl(){
    let baseURL = config.baseURL.target,url="";
    baseURL.indexOf("https://tcwgwtest.tospur.com")>-1
     ? url="https://mtest.tospur.com/"
     : baseURL.indexOf("https://tcwgwstag.tospur.com")>-1
       ? url="https://mstag.tospur.com/"
       : baseURL.indexOf("https://tcwgwprod.tospurhf.com")>-1
         ?url = "https://m.tongcehaofang.com/"
         :'';
    console.log(url)
    return url;
  },
  returnWebviewconfigUrl(path){
  	    let AllConfigPath = cache.getCache('ConfigPath'),url='';
  	  	Object.getOwnPropertyNames(AllConfigPath).forEach(function(key){
  			if(path==key){
  				url = AllConfigPath[key]
  			}
  			console.log(url,222)
  	  	})
		return url
    }
}
export default TOOL;


// export const WB = new wb(["router", "progress"]);