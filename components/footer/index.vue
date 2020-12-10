<!-- 底部按钮置业管家 -->
<template>
	<view class="report_bottom_warp">
		<view class="report_bottom">
			<view class="report_bottom_left" @click="tohouseKeeper()">
				<view class="keeper_avatar">
					<u-avatar class="avatarTou" :src="keeperUserInfo.headPortrait" size='76' mode="circle"></u-avatar>
				</view>
				<view class="keeper_message">
					<view class="name">
						<text>{{keeperUserInfo.name}}</text><text class="years">{{keeperUserInfo.year}}年</text>
					</view>
					<view class="num">
						<text>服务人数：</text><text>{{keeperUserInfo.num}}人</text>
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

export default {
	components: {},
	data() {
		return {
			
		};
	},
	props:{
		keeperUserInfo:{
			type:Object,
			default:()=>{
				return {
					headPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
					name:'赵杨',
					year:'10',
					num:'897'
				}
			}
		},
		istoDetail:{
			type:Boolean,
			default:true
		}
	},
	computed: {},
	watch: {},
	methods: {
		tellPhone(){
			console.log('拨打电话');
			uni.makePhoneCall({
				// 手机号
				phoneNumber: '114',
				// 成功回调
				success: (res) => {
					console.log('调用成功!') 
					// potentialCustomersInfo('',saveParams)
				},
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
				}
			});
		},
		tohouseKeeper(){
			console.log('跳转名片')
			if (!this.istoDetail) return
			uni.navigateTo({
				url: '/pagesHouse/adviserCard/index?buildingId=' + 1155//+ this.buildingId
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
					background: #f6e0bd;
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
