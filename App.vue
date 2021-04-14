<script>
	import { getData } from '@/request/api';
export default {
	onLaunch: function() {
		console.log('进入App Launch');
			if(this.$cache.getCache('M-Token')){
				let params={
					phone:this.$cache.getCache('Login-Data').customerInfo.phone,
				}
				let api = '/dt-business/customer/manager/getAppletsCustomerIdByPhone'
				getData(api,params).then((res)=>{
					if(res.customerInfo.phone){
						this.$cache.setCache('Login-Data', res);
					}
				}).catch(error=>{
					console.log(error,'小程序使用根据手机号码查询客户id')
				})
			}
	},
	onShow: function() {
		// console.log('App Show');
		// // #ifdef MP-BAIDU
		// let cityList = this.$cache.getCache('storageCity')
		// let city = cityList.title||'上海市'
		// console.log(city,'app.vue')
		// let keywords =  city+'新房'+','+city+'新楼盘'+','+city+'新开楼盘'+','+'置业笔记'
		//  swan.setPageInfo({
		//             title: '置业笔记，新房,新楼盘,新开楼盘',
		//             keywords:keywords,
		//             description: keywords,
		// 			image: 'https://media.tongcehaofang.com/image/default/616DCC531C714EC29C237697590BB5FC-6-2.jpg',       
		//             success: res => {
		//                 console.log('setPageInfo success', res);
		//             },
		//             fail: err => {
		//                 console.log('setPageInfo fail', err);
		//             }
		//         })
		// // #endif
		
	},
	onHide: function() {
		// console.log('关闭App Hide');
	}
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
uni-page-body,html,body{  
        height: 100%;  
    }  
</style>
