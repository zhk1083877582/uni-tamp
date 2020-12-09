<!-- 专属置业小蓝书 -->
<template>
	<view class='book_blue'>
		<view class="box">
			<view class="index_high">
				<view class="warp_border">
				</view>
				<view class="title">
					张小萌女士：
				</view>
				<view class="text">
					请查收您的
				</view>
				<view class="card">
					置业计划书
				</view>
				<view class="building_name">
					万科天空之城
				</view>
				
			</view>
			
			<view class="qundai">
				<view class="HDJ">
					<u-button type="default" hover-class='none' class="btn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
						尊享开启
					</u-button>
					<view class="bottom_text">
						温馨提示：授权查看您的置业计划书，获得完整服务
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getData } from '@/request/api.js'
export default {
	components: {},
	data() {
		return {
			jsCode:'',
			openid:'',
			session_key:'',
		};
	},
	computed: {},
	watch: {},
	methods: {
		onGetPhoneNumber(e) {
			console.log(e, 1);
			if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
				//用户决绝授权
				//拒绝授权后弹出一些提示
			} else {
				//允许授权
				let params = {
					iv: e.detail.iv,
					encryData: e.detail.encryptedData,
					sessionKey: this.session_key,
					openId: this.openid,
					loginType: 0,
					registerCity:this.$cache.getCache('storageCity')||''
				};
				// #ifdef MP-BAIDU
				let api =  '/tospurWeb/baiduapp/baiduLogin'
				// #endif
				// #ifdef MP-WEIXIN
				let api = '/tospurWeb/wxapp/wxLogin'
				// #endif
				// #ifdef MP-TOUTIAO
				let api = '/tospurWeb/toutiaoApp/toutiaoLogin'
				// #endif
				getData(api, params)
					.then(res => {
						console.log(res)
						this.$cache.setCache('M-Token', res['X-Token']);
						this.$cache.setCache('Login-Data', res);
						this.$cache.setCache('loginFlag', true);
						this.$cache.setCache('loginFlag1', true);
						uni.reLaunch({
							url:'../reportDetail/index'
						});
						// if(this.$cache.getCache('LoginTopath')){
						// 	uni.reLaunch({
						// 		url:'/'+this.$cache.getCache('LoginTopath')
						// 	});
						// }else{
						// 	uni.navigateBack()
						// }
						
					})
					.catch(err => {
						console.log('请求结果报错', err);
					});
			}
		},
		getPhone() {
			console.log(11111111)
			const self = this;
			uni.login({
				success: res => {
					console.log(res, 123);
					if (res.code) {
						//微信登录成功 已拿到code
						self.jsCode = res.code; //保存获取到的code
						console.log(self.jsCode, 456);
						let params = {
							jsCode: res.code,
						};
						// #ifdef MP-WEIXIN
						let api = '/tospurWeb/wxapp/wxAuth' 
						// #endif
						// #ifdef MP-BAIDU
						let api =  '/tospurWeb/baiduapp/baiduAuth'
						 params.type =1
						// #endif
						// #ifdef MP-TOUTIAO
						let api = '/tospurWeb/toutiaoApp/toutiaoAuth'
						// #endif
						getData(api, params)
							.then(res => {
								console.log(res, 111111);
								self.openid = res.openid; //openid 用户唯一标识
								self.session_key =res.session_key; //session_key  会话密钥
								console.log(self.openid, 12);
							})
							.catch(err => {
								console.log('请求结果报错', err);
							});
					} else {
						console.log('登录失败！' + res.errMsg);
					}
				}
			});
		}
	},
	onLoad(option){
		console.log(option,'传过来的置业报告ID')
		this.getPhone();
	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
.book_blue{
	background: #062471;
	height: 100%;
	width: 100%;
	padding-top: 16%;
	.btn{
		
		/deep/.u-btn{
			background: linear-gradient(180deg,#ffeda8, #ffce89);
			border-radius: 49rpx;
			width: 443rpx;
			height: 98rpx;
			font-size: 36rpx;
			line-height: 98rpx;
			text-align: center;
			font-weight: 600;
			color: #062471;
		}
		.user_name{
			font-weight: 600;
			color: #593b1c;
			padding: 0 6px;
		}
	}
	.bottom_text{
		font-size: 20rpx;
		font-weight: 400;
		text-align: center;
		color: #B2935A;
		line-height: 20rpx;
		margin-top: 38rpx;
	}
	.box{
		padding: 0 30rpx;
		height: 717rpx;
		border-radius: 4rpx;
		box-shadow: 0px 4rpx 20rpx 0px rgba(0,0,0,0.5); 
		position: relative;
		.index_high{
			width: 690rpx;
			margin: 0 auto;
			z-index: 10;
			background: #FEF7E4;
			height: 100%;
			position: relative;
		}
		.title{
			font-size: 28rpx;
			font-weight: 600;
			text-align: left;
			color: #062471;
			line-height: 48rpx;
			padding: 64rpx 0 0 64rpx;
		}
		.text{
			font-size: 28rpx;
			text-align: center;
			color: #b89960;
			line-height: 28px;
			margin-top:95rpx;
		}
		.building_name{
			margin-top: 32rpx;
			font-size: 32rpx;
			font-weight: 600;
			text-align: center;
			color: #062471;
			line-height: 32rpx;
		}
		.card{
			margin-top: 48rpx;
			font-weight: 700;
			text-align: center;
			color: #322314;
			font-size: 80rpx;
			line-height: 80rpx;
			color: #062471;
		}
		.warp_border{
			margin: 0 auto;
			width: 650rpx;
			height: 687rpx;
			position: absolute;
			top: 20rpx;
			left: 20rpx;
			z-index: 1;
			background: url(https://media.tongcehaofang.com/image/default/EAB52B7623624AF3B225B49024D161EF-6-2.jpg) no-repeat;
			background-size: 100% 100%;
		}
		.qundai{
			width: 100%;
			height: 560rpx;
			background: url(https://media.tongcehaofang.com/image/default/6D95DE18F74A4D6986E1D7A37EE300B1-6-2.jpg) no-repeat;
			background-size: 100% 100%;
			position: absolute;
			left: 0;
			top: 75%;
			z-index: 10;
			.HDJ{
				width: 100%;
				height: 100%;
				background: url(https://media.tongcehaofang.com/image/default/A068A1C25FC74588869BB73405F9EF6F-6-2.jpg) no-repeat;
				background-size: 100% 100%;
				padding-top: 30%;
				margin-top: 10%;
			}
		}
	}
	/deep/.u-hairline-border:after{
		border: 0;
	}
	
}
	
</style>
