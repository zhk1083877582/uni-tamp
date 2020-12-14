<!-- 问答 -->
<template>
	<view class='question'>
		<card title="置业问答" :isShowlittil="true">
			<view class="littil_title">
				<view class="text">
					<i class="iconfont iconyinhao-qian"></i>针对本次沟通，详细总结了您的疑问，并给予详细解答，具体如下<i class="iconfont iconyinhao-hou"></i>
				</view>
			</view>
			<view v-for="(item,index) in resData" :key="index">
				<view v-show="index<2||isShowAllQue">
					<view class="question_item">
						<view class="icon_wen">
							问
						</view>
						<view class="question_text">
							{{item.questionDesc}}
						</view>
					</view>
					<view class="answer_item">
						<i class="sanJ"></i>
						{{item.answerDesc}}
					</view>
				</view>
			</view>
			<view class="littil_title">
				<view class="text">
					<i class="iconfont iconyinhao-qian"></i>以上回答是否让您对该楼盘全面了解？如仍有疑 问，可点击下方电话联系我<i class="iconfont iconyinhao-hou"></i>
				</view>
			</view>
			<view class="upDown" @click.stop="showMore()"><text class="text">{{isShowAllQue?'收起':'展开'}}</text><text class="i iconfont iconbtn_arrow_top" :class="{up:isShowAllQue}"></text></view>
			
		</card>
	</view>
</template>

<script>
import card from '@/components/card/card.vue'
export default {
	components: {
		card
	},
	data() {
		return {
			isShowAllQue:false,
			questionArr:[]
		};
	},
	props:{
		resData:{
			type:Array,
			default:()=>{
				return []
			}
		}
	},
	computed: {},
	watch: {},
	methods: {
		//展开
		showMore(){
			this.isShowAllQue = !this.isShowAllQue
		}
	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
.question{
	.littil_title{
		padding-bottom: 40rpx;
		.text{
			padding: 16rpx 24rpx;
			border: 4rpx solid #f2f4f8;
			border-radius: 4rpx;
			font-size: 24rpx;
			color: #999999;
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
	.question_item{
		display: flex;
		.icon_wen{
			width: 32rpx;
			height: 32rpx;
			background: #062471;
			border-radius: 4rpx;
			font-size: 20rpx;
			line-height: 32rpx;
			color: #FFFFFF;
			text-align: center;
			margin-right: 10rpx;
		}
		.question_text{
			font-size: 26rpx;
			font-weight: 600;
			color: #131313;
			line-height: 32rpx;
			flex: 1;
			word-break:break-all;
		}
	}
	.answer_item{
		padding: 32rpx;
		margin-top: 20rpx;
		background-color: #F8F9FB;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #666666;
		line-height: 46rpx;
		position: relative;
		margin-bottom: 43rpx;
		word-break:break-all;
		.sanJ:before{
			content: "";
			position: absolute;
			top: -26rpx;
			left: 60rpx;
			border-width: 15rpx;
			border-style: solid;
			border-color: transparent transparent #F8F9FB transparent;
		}
	}
	.upDown {
			display: flex;
			font-size: 24rpx;
			font-weight: 400;
			color: #062471;
			line-height: 24rpx;
			justify-content: center;
			padding: 15rpx 0;
			.text{
				text-decoration: underline;
				margin-right: 10rpx;
			}
		}
		
		.upDown .i {
		    transition: all 0.5s;
		    font-size:20rpx;
		    color:#062471;
		    display: block;
		    transform: rotate(180deg);
		    -webkit-transform: rotate(180deg);
		    -moz-transform: rotate(180deg);
		}
		
		.upDown .curr {
		    transform: rotate(0deg);
		    -webkit-transform: rotate(0deg);
		    -moz-transform: rotate(0deg);
		}
		/deep/.upDown .up{
			transform: rotate(360deg) !important;
			-webkit-transform: rotate(360deg) !important;
			-moz-transform: rotate(360deg) !important;
		}
}
</style>
