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
				<view class="qundai"></view>
			</view>
		</view>
		<view class="btn">
			敬呈<text class="user_name">杨先生</text>亲启
		</view>
		<view class="bottom_text">
			温馨提示：授权查看您的置业计划书，获得完整服务
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
	computed: {},
	watch: {},
	methods: {

	},
	onLoad(option){
		console.log(option,'传过来的置业报告ID')
		
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
		margin: 0 auto;
		width: 398rpx;
		height: 80rpx;
		background: linear-gradient(360deg,#E6BB78, #FDE2BD 99%);
		margin-top: 72rpx;
		color: #593B1C;
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
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
		}
		.warp_border{
			margin: 0 auto;
			width: 570rpx;
			height: 718rpx;
			border: 1px solid;
			border-image: linear-gradient(180deg, #edc687, #3e2a16 68%, #19130b) 1 1;
			position: absolute;
			top: 20rpx;
			left: 20rpx;
			z-index: 1;
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
}
	
</style>
