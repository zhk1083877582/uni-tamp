<!-- 公共卡片样式 -->
<template>
	<view class='card_warp'>
		<view class="top_title"><i class="iconfont iconbiaotiyangshi"></i><text class="span">{{title}}</text> <i class="iconfont iconbiaotiyangshi"></i> </view>
		<view class="content" :class="{'Pd60':isShowlittil}">
			<view class="top_bg_img" v-if="isShowTopBg">
				<view class="littil_title" v-if="isShowlittil">
					<view class="text">
						<i class="iconfont iconyinhao-qian"></i>针对本次沟通，详细总结了您的疑问，并给予详细解答，具体如下<i class="iconfont iconyinhao-hou"></i>
					</view>
				</view>
			</view>
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
	margin: 0 40rpx;
	margin-bottom: 80rpx;
	.Pd60{
		padding-top: 149rpx !important;
	}
	.content{
		background: #ffffff;
		border-radius: 20rpx;
		padding: 50rpx 24rpx;
		padding-top: 70rpx;
		position: relative;
		overflow: hidden;
		.top_bg_img{
			width: 100%;
			background: url(../../static/report-img/header-bg.png) no-repeat;
			background-size: 100% 20rpx;
			top: 0;
			left: 0;
			position: absolute;
			padding-top: 20rpx;
			.littil_title{
				background: linear-gradient(270deg,#e6bb78, #fdedd7);
				padding: 0rpx 32rpx;
				padding-bottom: 20rpx;
				.text{
					padding: 4rpx 24rpx;
					opacity: 0.6;
					border: 4rpx solid #815c30;
					border-radius: 4rpx;
					font-size: 24rpx;
					color: #815c30;
					line-height: 36rpx;
					.iconfont{
						font-size: 24rpx;
						display: inline-block;
					}
					.iconyinhao-qian{
						margin-right: 10rpx;
					}
					.iconyinhao-hou{
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.top_title {
		font-size: 40rpx;
		line-height: 40rpx;
		font-weight: bold;
		text-align: center;
		color: #fff9ea;
		/* margin-top: 70rpx; */
		margin-bottom: 30rpx;
		display: flex;
		justify-content: center;
		.span{
			background: linear-gradient(315deg,#e6bb78, #fdedd7 53%, #ebc382);
			-webkit-background-clip: text;
			color: transparent;
			padding: 0 20rpx;
		}
		.iconfont {
			width: 38rpx;
			height: 26rpx;
			color: #E6BB78;
		}
	}
}
</style>
