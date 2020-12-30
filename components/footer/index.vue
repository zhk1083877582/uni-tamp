<!-- 底部按钮置业管家 -->
<template>
	<view class="report_bottom_warp">
		<view class="report_bottom">
			<view class="report_bottom_left" @click="tohouseKeeper()">
				<view class="keeper_avatar">
					<u-avatar class="avatarTou" :src="userInfo.avatarUrl" size='76' mode="circle"></u-avatar>
				</view>
				<view class="keeper_message">
					<view class="name">
						<text>{{userInfo.userName||'-'}}</text><text class="years">{{userInfo.workExperience||'-'}}年</text>
					</view>
					<view class="num">
						<text>服务人数：</text><text>{{userInfo.servedPeopleNum||'-'}}人</text>
					</view>
				</view>
			</view>
			<view class="report_bottom_right">
				<view class="div tell_consult" @click="tellPhone">电话咨询</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getData } from '@/request/api';
export default {
	components: {},
	data() {
		return {
			userInfo:{}
		};
	},
	props:{
		istoDetail:{
			type:Boolean,
			default:true
		},
		userId:{
			type:String,
			default:''
		},
		reportId:{
			type:String,
			default:''
		},
		modelType:{
			type:String,
			default:'3'
		},
		buildingId:{
			type:String,
			default:''
		}
	},
	computed: {},
	watch: {},
	methods: {
		tellPhone(){
			this.getUserInfo();
			let self = this
			if(!self.userInfo.fourPhone||!self.userInfo.extensionNumber){
				uni.showToast({
					title: '暂无顾问电话',
					icon: 'none',
					duration: 5000
				});
				return 
			}
			
			uni.makePhoneCall({
				// 手机号
				phoneNumber: String(self.userInfo.fourPhone) + String(self.userInfo.extensionNumber),
				// 成功回调
				success: (res) => {
					console.log('调用成功!') 
					this.buryingPoint.operationType = '6'
					this.buryingPoint.modelType = this.modelType
					this.buryingPoint.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
					this.buryingPoint.reportId = this.reportId
					this.buryingPoint.userId = this.userId
					this.ReportLog()
					// potentialCustomersInfo('',saveParams)
				},
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
				}
			});
		},
		tohouseKeeper(){
			if (!this.istoDetail) return
			this.buryingPoint.operationType = '7'
			this.buryingPoint.modelType = this.modelType
			this.buryingPoint.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
			this.buryingPoint.reportId = this.reportId
			this.buryingPoint.userId = this.userId
			this.ReportLog()
			uni.navigateTo({
				url: '/pagesHouse/adviserCard/index?userId=' + this.userInfo.userId
			});
		},
		getUserInfo(){
			let params = {
				userId: this.userId,
				buildingId: this.buildingId
			};
			let self =this;
			getData('/business/noToken/user/getUserCardDetail', params)
				.then(res => {
          console.log('管家信息',res)
          if(res.servedPeopleNum!=null){
            if(parseInt(res.servedPeopleNum) <99){
              res.servedPeopleNum = 99
            }
          }else{
              res.servedPeopleNum = 99
          }
					self.userInfo = res
          this.$emit('handelUserName',res);
				})
				.catch(err => {
					console.log('管家信息', err);
				});
		}
	},
	created() {

	},
	mounted() {
		this.getUserInfo();
	},
}
</script>
<style lang='scss' scoped>
.report_bottom{
	background-color: #FFFFFF;
	padding: 10rpx 24rpx;
	display: flex;
	justify-content: space-between;
	.report_bottom_left{
		display: flex;
		.keeper_avatar{
			margin-right: 12rpx;
		}
		.keeper_message{
			margin: 8rpx 0;
			.name{
				font-size: 28rpx;
				color: #141414;
				font-weight: 600;
				line-height: 28rpx;
				.years{
					background:#FF5835;
					border-radius: 16px 16px 16px 0px;
					font-size: 18rpx;
					text-align: center;
					color: #ffffff;
					line-height: 18rpx;
					padding: 2rpx 10rpx;
					margin-left: 6rpx;
					font-weight: 400;
					vertical-align: middle;
				}
			}
			.num{
				font-size: 24rpx;
				line-height: 24rpx;
				color: #999999;
				margin-top: 8rpx;
			}
		}
	}
	
	.report_bottom_right{
		display: flex;
		flex-direction: column;
		align-self: center;
		width: 368rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 8rpx;
		background: #4a6ddb;
		font-size: 32rpx;
		font-weight: 600;
		text-align: center;
		color: #FFFFFF;
		
	}
}
</style>
