<script>
export default {
	onLaunch: function() {
		// console.log('进入App Launch');
	},
	onShow: function() {
		// console.log('App Show');
		// // #ifdef MP-BAIDU
		// let cityList = this.$cache.getCache('storageCity')
		// let city = cityList.title||'上海市'
		// console.log(city,'app.vue')
		// let keywords =  city+'新房'+','+city+'新楼盘'+','+city+'新开楼盘'+','+'同策好房'
		//  swan.setPageInfo({
		//             title: '同策好房，新房,新楼盘,新开楼盘',
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
