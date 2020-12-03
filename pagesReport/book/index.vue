<!-- 专属置业小蓝书 -->
<template>
	<view class='book_blue'>
		<view class="box">
			<view class="warp_border">
				<!-- <text class="top_left color_yel"></text>
				<text class="top_right color_yel"></text>
				<text class="bottom_left color_black"></text>
				<text class="bottom_right color_black"></text> -->
			</view>
			<view class="index_high">
				<view class="title">
					您的置业建议书
				</view>
				<view class="building_name">
					万科天空之城
				</view>
				<view class="card">
					置业计划书
				</view>
				<view class="qundai">
					<view class="HDJ">
						
					</view>
				</view>
			</view>
		</view>
		<u-button type="default" hover-class='none' class="btn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
			敬呈<text class="user_name">杨先生</text>亲启
		</u-button>
		<view class="bottom_text">
			温馨提示：授权查看您的置业计划书，获得完整服务
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
	.btn{
		
		/deep/.u-btn{
			margin: 0 auto;
			width: 398rpx;
			height: 80rpx;
			background: url(https://media.tongcehaofang.com/image/default/995B4F94B3A6481C93FD7F695FE1F64A-6-2.jpg) no-repeat;
			background-size: 100% 100%;
			margin-top: 72rpx;
			color: #593B1C;
			text-align: center;
			line-height: 80rpx;
			font-size: 32rpx;
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
		color: #edc687;
		line-height: 20rpx;
		margin-top: 38rpx;
	}
	.box{
		width: 610rpx;
		height: 758rpx;
		background: linear-gradient(180deg,#604729, #3b2815 99%);
		border-radius: 4rpx;
		box-shadow: 0px 4rpx 20rpx 0px rgba(0,0,0,0.5); 
		margin: 0 auto;
		margin-top: 105rpx;
		position: relative;
		.index_high{
			z-index: 10;
			position: absolute;
			top: 0;
			left: 0;
		}
		.title{
			font-size: 34rpx;
			text-align: left;
			color: #edc687;
			line-height: 48rpx;
			padding: 59rpx 0 0 67rpx;
		}
		.building_name{
			padding: 46rpx 0 0 68rpx;
			font-size: 60rpx;
			font-weight: 500;
			color: #ebc78e;
			line-height: 60rpx;
		}
		.card{
			margin: 34rpx 0 0 71rpx;
			width: 231rpx;
			height: 54rpx;
			background: #EDC687;
			border-radius: 2rpx;
			font-weight: 400;
			text-align: center;
			color: #322314;
			line-height: 54rpx;
			letter-spacing: 4rpx;
		}
		.qundai{
			margin-top: 196rpx;
			width: 610rpx;
			height: 21rpx;
			background: linear-gradient(180deg,#f7e5bc, #edc687);
			position: relative;
			.HDJ{
				width: 104rpx;
				height: 93rpx;
				background: url(https://media.tongcehaofang.com/image/default/9BA538EEA7424F2AB7BA242D1AFF2F0C-6-2.jpg) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				top: -19rpx;
				right: 72rpx;
			}
		}
		.warp_border{
			margin: 0 auto;
			width: 570rpx;
			height: 718rpx;
			position: absolute;
			top: 20rpx;
			left: 20rpx;
			z-index: 1;
			background: url(https://media.tongcehaofang.com/image/default/D7995969D6FE42C991B70F903502FC49-6-2.jpg) no-repeat;
			background-size: 100% 100%;
			/* .color_yel{
				
				background: transparent;
				width: 30rpx;
				height: 30rpx;
				border-radius: 50%;
			}
			.color_black{
				border: 2rpx solid #19130b;
				background: transparent;
				width: 20rpx;
				height: 20rpx;
				border-radius: 50%;
			}
			.top_left{
				border-bottom: 2rpx solid #edc687;
				border-right: 2rpx solid #edc687;
				position: absolute;
				left: -15rpx;
				top: -15rpx;
			}
			.top_right{
				position: absolute;
				right: 0;
				top: 0;
			}
			.bottom_left{
				position: absolute;
				left: 0;
				bottom: 0;
			}
			.bottom_right{
				position: absolute;
				right: 0;
				bottom: 0;
			} */
		}
	}
	/deep/.u-hairline-border:after{
		border: 0;
	}
}
	
</style>
