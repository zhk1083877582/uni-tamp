<!-- 底部按钮置业管家 -->
<template>
	<view class="report_bottom_warp">
		<view class="report_bottom">
			<view class="report_bottom_left" @click="tochathouseKeeper()">
				<view class="keeper_avatar">
					<u-avatar class="avatarTou" :src="keeperUserInfo.headPortrait" size='80' mode="circle"></u-avatar>
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
		}
	},
	computed: {},
	watch: {},
	methods: {
		tellPhone(){
			console.log('拨打电话')
		},
		tochathouseKeeper(){
			console.log('跳转名片')
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
	padding: 32rpx;
	display: flex;
	justify-content: space-between;
	.report_bottom_left{
		display: flex;
		.keeper_avatar{
			margin-right: 16rpx;
		}
		.keeper_message{
			.name{
				font-size: 32rpx;
				color: #edc687;
				font-weight: 600;
				line-height: 32rpx;
				.years{
					background: #ff5835;
					border-radius: 16rpx 16rpx 16rpx 0rpx;
					font-size: 18rpx;
					text-align: center;
					color: #ffffff;
					line-height: 30rpx;
					padding: 0 10rpx;
					margin-left: 6rpx;
					font-weight: 400;
				}
			}
			.num{
				font-size: 24rpx;
				line-height: 24rpx;
				color: #9F7747;
				margin-top: 17rpx;
			}
		}
	}
	
	.report_bottom_right{
		width: 368rpx;
		height: 86rpx;
		border-radius: 8rpx;
		background: linear-gradient(270deg,#E6BB78, #FDEDD7 100%);
		font-size: 32rpx;
		font-weight: 600;
		text-align: center;
		color: #593b1c;
		line-height: 86rpx;
	}
}
</style>
