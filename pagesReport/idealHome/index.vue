<!-- 我的理想家 -->
<template>
<view class="ideal_home_warp">
	<view class='ideal_home'>
		<view class="top_title"><i class="shu"></i><text class="span">我的理想家</text></view>
		<view class="main">
			<view class="main_content">
				<view class="box">
					<view class="lable">
						置业目的：
					</view>
					<view class="content">
						自住
					</view>
				</view>
			</view>
			
			<view class="main_content">
				<view class="box">
					<view class="lable">
						购房资质：
					</view>
					<view class="content">
						0套
					</view>
				</view>
				<view class="box">
					<view class="lable">
						贷款资质：
					</view>
					<view class="content">
						1次
					</view>
				</view>
			</view>
			
			<view class="main_content">
				<view class="box">
					<view class="lable">
						资金情况：
					</view>
					<view class="content column">
						<view class="item_view">
							<text>总价预算</text><text class="color_red">800万元</text>
						</view>
						<view class="item_view">
							<text>单价预算</text><text class="color_red">50000/㎡</text>
						</view>
						<view class="item_view">
							<text>首付区间</text><text class="color_red">300～500万元</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="main_content">
				<view class="box">
					<view class="lable">
						考虑因素：
					</view>
					<view class="content column">
						<view class="item_view">
							<view class="second_label">区域</view>
							<view class="right_text"><text>嘉定区</text><text>嘉定区</text><text>嘉定区</text><text>嘉定区</text><text>嘉定区</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">环线</view><view class="right_text"><text>50000/㎡</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">地铁</view><view class="right_text"><text>300～500万元</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">学区</view><view class="right_text"><text>300～500万元</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">配套</view><view class="right_text"><text>300～500万元</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">面积</view><view class="right_text"><text>300～500万元</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">户型</view><view class="right_text"><text>300～500万元</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>

export default {
	components: {},
	data() {
		return {
			headPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png'
		};
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
.ideal_home_warp{
	background-color: #062471;
	position: relative;
	width: 100%;
	height: 100%;
	.ideal_home{
		position: absolute;
		top: 60rpx;
		width: 686rpx;
		left: 50%;
		transform: translate(-50%);
		background-color: #FFFFFF;
		border-radius: 20rpx;
		.top_title {
			font-weight: bold;
			text-align: left;
			color: #062471;
			padding: 48rpx 0 0 32rpx;
			/* margin-top: 70rpx; */
			margin-bottom: 64rpx;
			display: flex;
			justify-content: start;
			.span{
				color: #062471;
				-webkit-background-clip: text;
				display: block;
				font-size: 34rpx;
				line-height: 28rpx;
			}
			.shu{
				width: 6rpx;
				margin-right: 8rpx;
				background-color: #062471;
				display: inline-block;
				height: 34rpx;
			}
		}
		.text_title{
			text-align: center;
			font-size: 34rpx;
			font-weight: 600;
			color: #2b2014;
			line-height: 34rpx;
			margin-bottom: 56rpx;
		}
		
		
		.main{
			padding: 0 52rpx;
			/* padding-bottom: 14rpx; */
			.main_content{
				display: flex;
				justify-content: space-between;
				margin-bottom: 56rpx;
				.box{
					display: flex;
					.lable{
						font-size: 28rpx;
						color: #999999;
						line-height: 28rpx;
					}
					.content{
						font-size: 28rpx;
						color: #141414;
						line-height: 28rpx;
					}
					.column{
						display: flex;
						flex-direction: column;
						flex: 1;
						.item_view{
							margin-bottom: 32rpx;
							color: #928b94;
							display: flex;
							.color_red{
								margin-left: 24rpx;
								font-size: 28rpx;
								font-weight: 400;
								color: #FE3A07;
								line-height: 28rpx;
							}
							.second_label{
								flex: none;
							}
							.right_text{
								margin-left: 24rpx;
								font-size: 28rpx;
								font-weight: 400;
								line-height: 32rpx;
								color: #2b2014;
							}
						}
					}
				}
			}
		}
		
	}
}
</style>
