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
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子：
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	
	DateFormat: function (fmt,date) { // author: meizz
	    var o = {
	        "M+": date.getMonth() + 1, // 月份
	        "d+": date.getDate(), // 日
	        "h+": date.getHours(), // 小时
	        "m+": date.getMinutes(), // 分
	        "s+": date.getSeconds(), // 秒
	        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
	        "S": date.getMilliseconds() // 毫秒
	    };
	    if (/(y+)/.test(fmt))
	        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	            return fmt;
	},
	DataFormatIos:function(date){
		if(!date) return '-'
		return date.split(' ')[0]
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
  //得到二级嵌套页面路由
  getOtherWebSite(otherUrl){
	  console.log(otherUrl,'11111')
	 let baseURL = config.baseURL.target,url="";
	 switch(baseURL){
		case 'https://ztwgwtest.tospur.com':
			url='https://zttest.tospurhouse.net/';
			break;
		case 'https://tcwgwstag.tospurhouse.net':
			url='https://tcwebstag.tospurhouse.net/';
			break;
		case 'https://tcwgwprod.tospurhouse.net':
			url='https://ztweb.tospurhouse.net/';
			break;
		 default:
			url="https://zttest.tospurhouse.net/"
	 }
	 return otherUrl||url;
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
    },
	//阿拉伯数字转换为简写汉字
	Arabia_To_SimplifiedChinese(Num) {
	    for (let i = Num.length - 1; i >= 0; i--) {
	        Num = Num.replace(",", "")//替换Num中的“,”
	        Num = Num.replace(" ", "")//替换Num中的空格
	    }    
	    if (isNaN(Num)) { //验证输入的字符是否为数字
	        //alert("请检查小写金额是否正确");
	        return;
	    }
	    //字符处理完毕后开始转换，采用前后两部分分别转换
	    let part = String(Num).split(".");
	    let newchar = "";
	    //小数点前进行转化
	    for (let i = part[0].length - 1; i >= 0; i--) {
	        if (part[0].length > 10) {
	            //alert("位数过大，无法计算");
	            return "";
	        }//若数量超过拾亿单位，提示
	        let tmpnewchar = ""
	        let perchar = part[0].charAt(i);
	        switch (perchar) {
	            case "0":  tmpnewchar = "零" + tmpnewchar;break;
	            case "1": tmpnewchar = "一" + tmpnewchar; break;
	            case "2": tmpnewchar = "二" + tmpnewchar; break;
	            case "3": tmpnewchar = "三" + tmpnewchar; break;
	            case "4": tmpnewchar = "四" + tmpnewchar; break;
	            case "5": tmpnewchar = "五" + tmpnewchar; break;
	            case "6": tmpnewchar = "六" + tmpnewchar; break;
	            case "7": tmpnewchar = "七" + tmpnewchar; break;
	            case "8": tmpnewchar = "八" + tmpnewchar; break;
	            case "9": tmpnewchar = "九" + tmpnewchar; break;
	        }
	        switch (part[0].length - i - 1) {
	            case 0: tmpnewchar = tmpnewchar; break;
	            case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
	            case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
	            case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
	            case 4: tmpnewchar = tmpnewchar + "万"; break;
	            case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
	            case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
	            case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
	            case 8: tmpnewchar = tmpnewchar + "亿"; break;
	            case 9: tmpnewchar = tmpnewchar + "十"; break;
	        }
	        newchar = tmpnewchar + newchar;
	    }   
	    //替换所有无用汉字，直到没有此类无用的数字为止
	    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
	        newchar = newchar.replace("零亿", "亿");
	        newchar = newchar.replace("亿万", "亿");
	        newchar = newchar.replace("零万", "万");
	        newchar = newchar.replace("零零", "零");      
	    }
	    //替换以“一十”开头的，为“十”
	    if (newchar.indexOf("一十") == 0) {
	        newchar = newchar.substr(1);
	    }
	    //替换以“零”结尾的，为“”
	    if (newchar.lastIndexOf("零") == newchar.length - 1) {
	        newchar = newchar.substr(0, newchar.length - 1);
	    }
	    return newchar;
	},
	//[{"start":"55","end":"333"}]数据转换
	changeArrayToNum(arr,unit){
		if(arr==null||arr == '') return '不详'
		if(arr == '3') return '不限'
		console.log(arr)
		let arrR = []
		arr.map((item,index)=>{
			if(item.start == ''||item.start == '0'){
				let str = item.end + unit + '以下'
				arrR.push(str) 
			}else if(item.end == ''||item.end > 99999){
				let str = item.start + unit + '以上'
				arrR.push(str)
			}else{
				let str = item.start+'~'+item.end + unit
				arrR.push(str)
			}
		})
		return arrR.join('、')
	},
	//意向户型转换
	intentionHouseType(value){
	  if(!value) return;
	  let valuetmp = ''
	  let valueArr = []
	  let set = {
		1:'一室',
		2:'两室',
		3:'三室',
		4:'四室',
		5:'五室及以上'
	  };
	  if(value.length>1){
		valuetmp = value.split(',')
	  }else{
		return  set.hasOwnProperty(value) ? set[value] : value
	  }
	  valuetmp.forEach(element => {
		let newvalue = set.hasOwnProperty(element) ? set[element] : element;
		valueArr.push(newvalue)
	  });
	  return valueArr.join(',')
	},
	
}
export default TOOL;


// export const WB = new wb(["router", "progress"]);