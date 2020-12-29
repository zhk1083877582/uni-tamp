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
						{{$formatter.switchName('intentionPurpose',resData.intentionPurpose)}}
					</view>
				</view>
			</view>
			
			<view class="main_content">
				<view class="box">
					<view class="lable">
						购房资质：
					</view>
					<view class="content">
						{{resData.housePurchaseCondition==1?'有':resData.housePurchaseCondition==2?'无':'-'}}
					</view>
				</view>
				<view class="box">
					<view class="lable">
						贷款资质：
					</view>
					<view class="content">
						{{getformatloanCondition(resData.loanCondition)}}
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
							<text>总价预算</text><text class="color_red">{{$tool.changeArrayToNum(resData.totalBudget,'万')}}</text>
						</view>
						<view class="item_view">
							<text>单价预算</text><text class="color_red">{{$tool.changeArrayToNum(resData.unitPriceBudget,'元/㎡')}}</text>
						</view>
						<view class="item_view">
							<text>首付区间</text><text class="color_red">{{$tool.changeArrayToNum(resData.downPaymentBudget,'万')}}</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="main_content" style="margin-bottom: 0;">
				<view class="box">
					<view class="lable">
						考虑因素：
					</view>
					<view class="content column">
						<view class="item_view">
							<view class="second_label">区域</view>
							<view class="right_text">{{resData.intentionCityRegionName || '-'}}</view>
						</view>
						<view class="item_view">
							<view class="second_label">环线</view><view class="right_text"><text>{{resData.intentionLoopLine || '-'}}</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">地铁</view><view class="right_text"><text>{{resData.intentionSubway || '-'}}</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">学区</view><view class="right_text"><text>{{resData.intentionSchoolDistrict || '不限'}}</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">配套</view><view class="right_text"><text>{{resData.intentionSet || '不限'}}</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">面积</view><view class="right_text"><text>{{$tool.changeArrayToNum(resData.intentionArea,'㎡')}}</text></view>
						</view>
						<view class="item_view">
							<view class="second_label">户型</view><view class="right_text"><text>{{resData.intentionHouseType?$tool.intentionHouseType(resData.intentionHouseType):'-'}}</text></view>
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
			headPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
			resData:null
		};
	},
	computed: {
		
	},
	watch: {},
	methods: {
		getformatloanCondition(type){
			
			let loanConditionStr = '';
			switch (type){
				case '1':
					loanConditionStr = '有'
					break;
				case '2':
					loanConditionStr = '无'
					break;
				case '3':
					loanConditionStr = '首套'
					break;
				case '4':
					loanConditionStr = '二套'
					break;
				default:
					loanConditionStr = '-'
					break;
			}
			console.log(type,loanConditionStr,'loanConditionStrloanConditionStr')
			return loanConditionStr
		}
	},
	created() {

	},
	mounted() {

	},
	onLoad(option){
		this.resData = JSON.parse(option.resData)
	}
}
</script>
<style lang='scss'>
	page{
		background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
	}
</style>
<style lang='scss' scoped>
.ideal_home_warp{
	/* background-color: #062471; */
	/* position: relative; */
	background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
	width: 100%;
	display: flex;
	justify-content: center;
	/* height: 100%; */
	padding: 56rpx 0;
	.ideal_home{
		/* position: absolute;
		top: 6%;
		left: 50%;
		transform: translate(-50%); */
		width: 91%;
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
				line-height: 32rpx;
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
				margin-bottom: 50rpx;
				.box{
					display: flex;
					.lable{
						font-size: 28rpx;
						color: #999999;
						line-height: 32rpx;
					}
					.content{
						font-size: 28rpx;
						color: #141414;
						line-height: 32rpx;
					}
					.column{
						display: flex;
						flex-direction: column;
						flex: 1;
						.item_view{
							margin-bottom: 30rpx;
							color: #928b94;
							display: flex;
							.color_red{
								margin-left: 24rpx;
								font-size: 28rpx;
								font-weight: 400;
								color: #FE3A07;
								line-height: 32rpx;
								display: flex;
								flex: 1;
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
