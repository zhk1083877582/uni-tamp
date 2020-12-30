<!-- 置业需求 || 我的理想家 -->
<template>
	<view>
		<card title="置业需求">
			<view class='demand'>
				<view class="rows">
					<view class="col">
						<view class="title">置业目的</view>
						<view class="content_text">
							{{$formatter.switchName('intentionPurpose',resData.intentionPurpose)}}
						</view>
					</view>
					<view class="col col_L">
						<view class="title">总价预算</view>
						<view class="content_text">
							{{$tool.changeArrayToNum(resData.totalBudget,'万')}}</text>
						</view>
					</view>
				</view>
				<view class="rows">
					<view class="col">
						<view class="title">意向区域</view>
						<view class="content_text">
							{{resData.intentionCityRegionName||'-'}}
						</view>
					</view>
					<view class="col col_L">
						<view class="title">意向户型</view>
						<view class="content_text">
							{{resData.intentionHouseType?$tool.intentionHouseType(resData.intentionHouseType):'-'}}
						</view>
					</view>
				</view>
				<view class="rows">
					<view class="col col_bottom">
						<view class="title">关注重点</view>
						<view class="content_text">
							{{resData.customerFocusText||'-'}}
						</view>
					</view>
				</view>
				<view>
					<view class="check_all" @click="toIdealHome()">查看完整理想家 >></view>
				</view>
			</view>
		</card>
	</view>
</template>

<script>
import card from '@/components/card/card.vue';
export default {
	components: {
		card
	},
	data() {
		return {
			headPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
		};
	},
	props:{
		title:{
			type:String,
			default:''
		},
		resData:{
			type:Object,
			default:()=>{
				return {}
			}
		},
		logData:{
			type:Object,
			default:()=>{
				return {
					beginTime:'',
					reportId:'',
					userId:''
				}
			}
		}
	},
	computed: {},
	watch: {},
	methods: {
		toIdealHome(){
			//埋点
			this.buryingPoint.beginTime = this.logData.beginTime
			this.buryingPoint.endTime = ''
			this.buryingPoint.operationType = '8'
			this.buryingPoint.modelType = '3'
			this.buryingPoint.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
			this.buryingPoint.reportId = this.logData.reportId
			this.buryingPoint.userId = this.logData.userId
			this.ReportLog()
			uni.navigateTo({
				url: '../idealHome/index?resData=' + JSON.stringify(this.resData)
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
	/* margin: 20rpx 24rpx; */
	background-color: #FFFFFF;
	border-radius: 20rpx;
	.text_title{
		text-align: center;
		font-weight: 600;
		margin-bottom: 30rpx;
	}
	.rows{
		border-top: 1rpx solid #EBEEF4;
		display: flex;
		text-align: center;
		justify-content: space-between;
		/* margin: 0 24rpx; */
		border: 1rpx solid #EBEEF4;
		border-bottom:0;
		/* background: #FCF7EE; */
		.col_L{ border-left: 1rpx solid #EBEEF4;}
		/* .col_R{flex: 1.5 !important;} */
		.col_bottom{
			border-bottom: 1rpx solid #EBEEF4;
		}
		.col{
			flex: 1;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			word-break: break-all;
			padding: 24rpx 10rpx;
			.title{
				font-size: 24rpx;
				font-weight: 500;
				color: #999999;
				line-height: 33rpx;
				margin-bottom: 16rpx;
			}
			.content_text{
				font-size: 28rpx;
				font-weight: 600;
				color: #141414;
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
		color: #062471;
		line-height: 33rpx;
		padding: 20rpx  0 28rpx 0;
	}
}
</style>
