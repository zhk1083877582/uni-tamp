<!-- 手机号登录 -->
<template>
	<view class='Phone_login'>
		<view class="login_warp">
			<!-- <m-head title="登录"></m-head> -->
			<view class="log_main">
				<view class="tel-info">
					<view class="tel-text1">
						您好，
					</view>
					<view class="tel-text2">
						欢迎开启窝记置业旅程
					</view>
				</view>
				<view class="log_form">
					<view class="from_warp phone_warp">
						<u-input 
							class='In_H phone' 
							v-model="phoneNum" 
							:type="type" 
							placeholder="请输入手机号" 
							:maxlength="11" 
							:clearable='false' 
							:placeholder-style="'color:#DEDEDE'" 
							@input='validatorPhoneNum' />
						<u-button 
							class='log_YZM' 
							type="primary" 
							:disabled='CodeBtndisabled' 
							size="small" 
							@click="runTimer"
						>
							<text :style="{'color':CodeColor}"> {{CodeText}}</text>
						</u-button>
					</view>
					<view class="from_warp code_warp">
						<u-input 
							class='In_H' 
							v-model="VerificationCode" 
							:type="type" 
							placeholder="请输入验证码" 
							:maxlength="6" 
							:clearable='false' 
							:placeholder-style="'color:#DEDEDE;'" 
							@input='validatorCode'/>
					</view>
					<view class="login_agreement">
						登录即同意
						<text class="agreement" @click="toAgreement">
							窝记用户服务及隐私协议
						</text>
					</view>
					<u-button class="submitBtn" :color="submitBg" :disabled='submitBtn' type="primary" @click='onSubmit'>
						<text :style="{'color':submitColor}">登录</text>
					</u-button>
					
				</view>
			</view>
		</view>
		<view class="btm_text">仅限接受线下置业顾问服务的用户使用</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { getData } from '@/request/api';
export default {
	components: {},
	data() {
		return {
			phoneNum:'',
			VerificationCode:'',
			CodeBtndisabled:true,
			submitBtn:true,
			CodeText:'获取验证码',
			CodeColor:'#999999',//#07c160
			submitColor:'#ffffff',
			submitBg:'#C1C1C1',
			time:60,
			propsData:{},
			type:'number',
			topath:'',
			pin:''
		};
	},
	computed: {},
	watch: {},
	onLoad(option){},
	methods: {
		onSubmit() {
			this.submitBtn = true
			let params={
				phone:this.phoneNum,
				loginType:1,
				code:this.VerificationCode,
			}
			console.log('----telParams',params)
			let api = '/userAuthServer/noToken/wx/wxLogin'
			getData(api,params).then((res)=>{
				console.log('---telLogin',res)
				this.$cache.setCache('M-Token', res['token']);
				this.$cache.setCache('Login-Data', res);
				console.log(this.$cache.getCache('LoginTopath'),'电话登录')
				if(this.$cache.getCache('LoginTopath')){
					uni.reLaunch({
					    url:'/'+this.$cache.getCache('LoginTopath')
					});
				}else{
					uni.navigateBack()
				}		
			}).catch(error=>{
				this.submitBtn = false
				this.$refs.uToast.show({
					title: `${error.msg}`,
				})
			})
		},
		validatorPhoneNum(){
			if(this.phoneNum){
				let reg = /^1[3456789]\d{9}$/
				if(!reg.test(this.phoneNum)){
					// Toast('请填写正确的手机号')
					this.CodeBtndisabled = true
					this.CodeColor = '#999999'
					this.submitBtn = true
					this.submitBg = '#C1C1C1'
					this.submitColor = '#ffffff'
				}else{
					this.CodeBtndisabled = false
					this.CodeColor = '#062471'
					if(this.VerificationCode){
						this.submitBtn = false
						this.submitColor = '#ffffff'
						this.submitBg = '#C1C1C1'
					}
				}
			}
		},
		validatorCode(){
			console.log(1)
			if(this.VerificationCode){
				if(this.phoneNum){
					let reg = /^1[3456789]\d{9}$/
					if(reg.test(this.phoneNum)){
						this.submitBtn = false
						this.submitColor = '#ffffff'
						this.submitBg = '#062471'
					}
				}
			}else{
				// Toast('请填写验证码')
				this.submitBtn = true
				this.submitColor = '#ffffff'
				this.submitBg = '#F2F3F7'
			}
		},
		runTimer(){
			console.log(123)
			this.getphoneCode()
			this.timer()
		},
		timer() {
			if (this.time >= 1) {
				this.time--;
				this.CodeText = `重新获取(${this.time}s)`;
				this.timeoutId = setTimeout(this.timer, 1000);
				this.CodeBtndisabled = true;
			} else {
				clearInterval(this.timeoutId);
				this.CodeText = "重新发送";
				this.CodeBtndisabled = false;
				this.time = 60
			}
		},
		getphoneCode(){
			let params={
				phone:this.phoneNum
			}
			getData('/userAuthServer/wx/sendMessage',params).then((res)=>{
				console.log('----tel',res)
			}).catch(error=>{
				this.$refs.uToast.show({
					title: `${error.msg}`,
				})
			})
		},
		toAgreement(){
			uni.navigateTo({
			    url: '/pagesUser/login/agreement' 
			});
		}
	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
	.Phone_login{
		.login_warp {
		    .log_main{
		        padding: 0 47rpx;
		        .log_top_text{
		            font-size: 56rpx;
		            line-height: 78rpx;
		            color: #222222;
		            font-weight: 500;
		            padding-top: 96rpx;
		        }
				.tel-info{
					margin-top:128rpx;
					.tel-text1{
						display: inline-block;
						font-size: 56rpx;
						font-weight: 600;
						color: #141414;
					}
					.tel-text2{
						margin-top:20rpx;
						font-size: 36rpx;
						font-weight: 400;
						color: #141414;
					}
				}
		
		        .log_form{
		            margin-top: 45px;
		            color: #C8CAD6;
					.from_warp{
						padding: 39rpx 0 37rpx 0;
						border-bottom: 1rpx solid #DEDEDE;
						.phone{
							line-height: 1;
							height: 100%;
							flex: 1;
						}
						/deep/.In_H{
							input{
								font-size: 34rpx;
								color: #333333;
							}
						}
					}
		            .phone_warp{
						display: flex;
						justify-content: space-between;
						
					}
		            .log_YZM{
						/deep/.u-btn{
							height: 100%;
							padding: 0;
							padding-left: 40rpx;
							background-color: transparent !important;
							font-size: 32rpx;
						}
		            }
		           .login_agreement{
					   font-size: 24rpx;
					   line-height: 24rpx;
					   padding: 36rpx 0 60rpx 0;
					   color: #666666;
					   .agreement{
						   color: #062471;
					   }
				   }
				   .submitBtn{
						/deep/.u-btn--primary--disabled{
							background-color: #C1C1C1 !important;
						}
				   }
		        }
		    }
		}
		.btm_text{
			width: 100%;
			font-size: 24rpx;
			font-weight: 400;
			text-align: center;
			color: #999999;
			line-height: 24rpx;
			position: fixed;
			bottom: 64rpx;
		}
	}
</style>
