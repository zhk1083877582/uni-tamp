<!-- 公共卡片样式 -->
<template>
	<view class='card_warp'>
		
		<view class="content" :class="{'Pd60':isShowlittil}">
			<view class="top_title"><i class="shu"></i><text class="span">{{title}}</text></view>
			<!-- <view class="top_bg_img" v-if="isShowTopBg">
				<view class="littil_title" v-if="isShowlittil">
					<view class="text">
						<i class="iconfont iconyinhao-qian"></i>针对本次沟通，详细总结了您的疑问，并给予详细解答，具体如下<i class="iconfont iconyinhao-hou"></i>
					</view>
				</view>
			</view> -->
			<slot></slot>
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
		title: {
			type: String,
			default: ''
		},
		isShowTopBg:{
			type:Boolean,
			default: true
		},
		isShowlittil:{
			type:Boolean,
			default: false
		}
	},
	computed: {},
	watch: {},
	methods: {

	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
.card_warp{
	margin: 0 24rpx;
	margin-bottom: 20rpx;
	.content{
		background: #ffffff;
		border-radius: 20rpx;
		padding: 44rpx 32rpx 40rpx 32rpx;
		position: relative;
		overflow: hidden;
		.top_title {
			font-weight: bold;
			text-align: left;
			color: #062471;
			/* margin-top: 70rpx; */
			margin-bottom: 32rpx;
			display: flex;
			justify-content: start;
			.span{
				color: #062471;
				-webkit-background-clip: text;
				display: block;
				font-size: 34rpx;
				line-height: 34rpx;
			}
			.shu{
				width: 6rpx;
				margin-right: 8rpx;
				background-color: #062471;
				display: inline-block;
				height: 34rpx;
			}
		}
	}
	
}
</style>
