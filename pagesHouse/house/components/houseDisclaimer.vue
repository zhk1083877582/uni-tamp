<!-- 楼盘详情:免责声明 -->
<template>
	<view class="house-disclaimer">
		<view class="title">
			<text class="iconfont iconmianzeshengming"></text>
			<text>免责声明</text>
		</view>
		<view class="discripe">
			楼盘信息来源于政府公示网站、开发商、第三方公众平台，最终以政府部 门登记备案为准，请谨慎核查。
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		computed: {
	
		},
		onLoad(option) {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.house-disclaimer{
		height:184rpx;
		padding: 17rpx 0 17rpx 30rpx;
		// border: 1px solid red;
		font-size: 20rpx;
		border-top: 10px solid #0B0704;
		color: #56514D;
		background-color: #0B0704;
		.title{
			display: flex;
			align-items: center;
			// .img{
			// 	width:26rpx;
			// 	height:26rpx;
			// 	margin-right: 10rpx;
			// }
			.iconmianzeshengming{
				margin-right: 10rpx;
				font-size: 12px;
			}
		}
		.discripe{
			margin-top: 20rpx;
			padding-left:20rpx;
			padding-right: 46rpx;
			font-size: 10px;
		}
	}
</style>
