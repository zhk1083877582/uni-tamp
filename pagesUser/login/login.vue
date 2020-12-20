<!-- 登录 -->
<template>
	<view class="login_warp">
		<image src="/static/login/login.png" class="login_log"></image>
		<view class="btn_warp">
			<!-- #ifdef MP-WEIXIN -->
			<u-button type="primary" class="WX_btn" open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
				<i class="iconfont icondenglu-weixin"></i>
				微信授权登录
			</u-button>
			<!-- #endif -->
			<u-button @click="doTelLogin">
				<i class="iconfont icondenglu-shouji"></i>
				手机号码登录
			</u-button>
		</view>
	</view>
</template>

<script>
import { getData } from '@/request/api';
export default {
	components: {},
	data() {
		return {
			topath: '',
	        option: '',
			pin:'',
			pinWx:'',
			jsCode: '',
			openid: '',
			unionid: '',
			session_key: ''
		};
	},
	computed: {},
	watch: {},
	methods: {
		//手机号码登录
		doTelLogin() {
			uni.redirectTo({
				url: '/pagesUser/login/telLogin?topath=pages/journey/index'
			});
		},
		// 获取jsCode openid session_key
		getPhone() {
			const self = this;
			uni.login({
				success: res => {
					console.log('---jsCode',res);
					if (res.code) {
						//微信登录成功 已拿到code
						self.jsCode = res.code; //保存获取到的code
						let params = {
							jsCode: res.code,
						};
						let api = '/userAuthServer/noToken/wx/wxAuth' 
						getData(api, params)
							.then(res => {
								console.log('----openid||session_key', res);
								self.openid = res.openid; //openid 用户唯一标识
								self.session_key =res.session_key; //session_key  会话密钥
							})
							.catch(err => {
								console.log('请求结果报错', err);
							});
					} else {
						console.log('登录失败！' + res.errMsg);
					}
				}
			});
		},
		bindgetphonenumber(e){
			// console.log(123)
			if (e.detail.encryptedData) {
				uni.showModal({
					title: '获取成功',
					content: JSON.stringify(e)
				});
			}
			else {
				uni.showModal({
					title: '获取失败',
					content: JSON.stringify(e)
				});
			}
		},
			
		onGetPhoneNumber(e) {
			console.log('-----login-btn', e);
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
				let api = '/userAuthServer/noToken/wx/wxLogin';
				getData(api, params)
					.then(res => {
						this.$cache.setCache('M-Token', res['token']);
						this.$cache.setCache('Login-Data', res);
						if(this.$cache.getCache('LoginTopath')){
							uni.reLaunch({
							    url:'/'+this.$cache.getCache('LoginTopath')
							});
						}else{
							uni.navigateBack()
						}
						
					})
					.catch(err => {
						console.log('请求结果报错', err);
					});
			}
		},
		getWXAudit(){
			console.log(123)
			getData('/business/noToken/home/WXAudit').then(res=>{
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
		}
	},
    onLoad(option) {
		this.getPhone();
		let pinStr1='',pinStr2='';
		for(let key in option){
			if(key=='topath'){
				pinStr1 += `${option[key]}?` 
			}else{
				pinStr2 += `${key}=${option[key]}&`
			}
		}
		setTimeout(()=>{				
			if(pinStr2){
				pinStr2 = pinStr2.substring(0,pinStr2.length-1);
			}else{	
				pinStr1= pinStr1.substring(0,pinStr1.length-1)
			}					
			this.pinWx =  pinStr1 + pinStr2;
			this.$cache.setCache('LoginTopath', this.pinWx);
			console.log('LoginTopath',this.pinWx)
		},400)
		this.getWXAudit();
	},
};
</script>
<style lang="scss" scoped>
.login_warp {
	background-color: #FFFFFF;
	height:100%;
	.login_log {
		width: 215rpx;
		height: 210rpx;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		top: 198rpx;
	}

	.btn_warp {
		padding: 0 48rpx;
		position: absolute;
		bottom: 331rpx;
		width: 100%;

		/deep/button {
			font-size: 36rpx;
			height: 98rpx;
			line-height: 98rpx;
			color: #00A4FF;
			font-weight: 500;
		}

		.WX_btn {
			margin-bottom: 34rpx;
			display: block;

			/deep/button {
				color: #FFFFFF;
			}
		}

		.icondenglu-shouji {
			margin-right: 24rpx;
			font-size: 40rpx;
		}
	   .baidu{
		   margin-right: 24rpx;
	   }
		.icondenglu-weixin {
			margin-right: 16rpx;
		}
	}
}
</style>
