<!-- 置业需求 || 我的理想家 -->
<template>
	<view class='demand'>
		<view class="top_title">
			<view class="avatarTou">
				<i class="iconfont iconwodelixiangjia"></i>
			</view>
		</view>
		<view class="text_title">
			<text>{{title}}</text>
		</view>
		
		<view class="rows">
			<view class="col col_L">
				<view class="title">意向户型</view>
				<view class="content_text">
					三室、四室
				</view>
			</view>
			<view class="col col_R">
				<view class="title">意向区域</view>
				<view class="content_text">
					嘉定区、青浦区、青浦区、青浦区
				</view>
			</view>
			<view class="col col_L">
				<view class="title">总价预算</view>
				<view class="content_text">
					800万
				</view>
			</view>
		</view>
		<view class="rows">
			<view class="col">
				<view class="title">考虑因素</view>
				<view class="content_text">
					学区、周边配套、现房、车位充足
				</view>
			</view>
		</view>
		<view>
			<view class="check_all" @click="toIdealHome()">查看完整理想家 >></view>
		</view>
	</view>
</template>

<script>

export default {
	components: {},
	data() {
		return {
			headPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
		};
	},
	props:{
		title:{
			type:String,
			default:''
		}
	},
	computed: {},
	watch: {},
	methods: {
		toIdealHome(){
			console.log(123123)
			uni.navigateTo({
				url: '../idealHome/index?buildingId=' + 123//+ this.buildingId
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
.demand{
	margin: 80rpx 40rpx;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	.top_title{
		display: flex;
		justify-content: center;
		padding: 40rpx 0 20rpx 0;
		background: url(../../../static/report-img/yuanhu.png) no-repeat;
		background-position: top center;
		background-size: 100% 85rpx;
		.avatarTou{
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			font-size: 46rpx;
			background: #382C1F;
			position: relative;
			.iconfont{
				background: linear-gradient(135deg, #E6BB78, #FDEDD7 33%, #EBC382);
				-webkit-background-clip: text;
				color: transparent;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
		}
	}
	.text_title{
		text-align: center;
		font-weight: 600;
		margin-bottom: 30rpx;
	}
	.rows{
		border-top: 2rpx solid #F6F4F9;
		display: flex;
		text-align: center;
		justify-content: space-between;
		margin: 0 24rpx;
		border: 1px solid #F6F4F9;
		border-bottom:0;
		background: #FCF7EE;
		.col_L{border-right: 2rpx solid #F6F4F9; border-left: 2rpx solid #F6F4F9;}
		.col_R{flex: 1.5 !important;}
		.col{
			flex: 1;
			padding: 24rpx 0;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			word-break: break-all;
			.title{
				font-size: 24rpx;
				font-weight: 500;
				color: #928b94;
				line-height: 33rpx;
				margin-bottom: 16rpx;
			}
			.content_text{
				font-size: 28rpx;
				font-weight: 600;
				color: #2b2014;
				line-height: 28rpx;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap
			}
		}
	}
	.check_all{
		text-align: center;
		font-size: 24rpx;
		font-weight: 400;
		text-decoration: underline;
		color: #a0a1a9;
		line-height: 33rpx;
		padding: 20rpx  0 28rpx 0;
	}
}
</style>
