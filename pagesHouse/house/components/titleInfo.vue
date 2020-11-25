<!-- 楼盘详情:标题 -->
<template>
	<view class="title-info">
		<view class="title-left">
			<view class="flag"></view>
			<view class="text">
				{{text}}
			</view>
			<view class="more-tip" v-if="tipList">
				<view v-for="item in tipList" :key="item.text"  class="tip-item">
					<image class="icon-check" src="../../static/icon-check2x.png" mode=""></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<!-- 右侧更多按钮 -->
		<view class="bn-text" v-if="btnRightInfo.text" @click.stop="toOtherPage">
			<text>{{btnRightInfo.text}}</text>
			<u-icon name="arrow-right" size="28" color="#999999"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			text:{
			  type:String,
			  default:''
			},
			tipList:{
			  type:Object,
			  default:function(){
				  return null
			  }
			},
			/**
			 * text:文案
			 * url：跳转路径
			 */
			btnRightInfo:{
				type:Object,
				default:function(){
					 return {
						 text:'',
						 url:''
					 }
				}
			},
			
		},

		methods:{
			//更多操作
			toOtherPage(){
				let url=this.btnRightInfo.url;
				console.log('获取到的地址url:'+url)
				if(!url){
					return 
				}
				uni.navigateTo({
				    url: url
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title-info{
		width: 100%;
		height:32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title-left{
			display: flex;
			justify-content: flex-start;
		}
		.flag{
			margin-top:6rpx;
			display: inline-block;
			width:6rpx;
			height:32rpx;
			background-color:  #00A4FF;
		}
		.text{
			margin-left: 10rpx;
			color: #333333;
			font-size: 32rpx;
			font-weight: 700;
		}
		
		.more-tip{
			display: flex;
			margin-right: 20rpx;
			font-size: 20rpx;
			.tip-item{
				margin-left: 20rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}
			.icon-check{
				width:20rpx;
				height: 20rpx;
				margin-right: 10rpx;
			}
		}
		   
	}
</style>
