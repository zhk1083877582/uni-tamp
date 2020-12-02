<!-- 我的理想家 -->
<template>
	<view class='ideal_home'>
		<view class="top_title">
			<u-avatar class="avatarTou" :src="headPortrait" size='71' mode="circle"></u-avatar>
		</view>
		<view class="text_title">
			<text>我的理想家</text>
		</view>
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
	.ideal_home{
		position: absolute;
		top: 40rpx;
		width: 670rpx;
		left: 50%;
		transform: translate(-50%);
		background-color: #FFFFFF;
		border-radius: 20rpx;
		.top_title{
			display: flex;
			justify-content: center;
			padding: 0rpx 0 20rpx 0;
			background: url(https://media.tongcehaofang.com/image/default/64AF86C0446F40AFB7F07635306C60D7-6-2.jpg) no-repeat;
			background-position: top center;
			background-size: 100% 85rpx;
			.avatarTou{
				margin: 39rpx 0 21rpx 0;
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
			padding: 0 40rpx;
			/* padding-bottom: 14rpx; */
			.main_content{
				display: flex;
				justify-content: space-between;
				margin-bottom: 56rpx;
				.box{
					display: flex;
					.lable{
						font-size: 28rpx;
						color: #928b94;
						line-height: 28rpx;
					}
					.content{
						font-size: 28rpx;
						color: #2b2014;
						line-height: 28rpx;
					}
					.column{
						display: flex;
						flex-direction: column;
						flex: 1;
						.item_view{
							margin-bottom: 28rpx;
							color: #928b94;
							display: flex;
							.color_red{
								margin-left: 24rpx;
								font-size: 28rpx;
								font-weight: 400;
								color: #f95424;
								line-height: 28rpx;
							}
							.second_label{
								flex: none;
							}
							.right_text{
								margin-left: 24rpx;
								font-size: 28rpx;
								font-weight: 400;
								line-height: 28rpx;
								color: #2b2014;
							}
						}
					}
				}
			}
		}
		
	}
</style>
