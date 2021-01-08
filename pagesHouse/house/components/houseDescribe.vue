<!-- 楼盘详情:楼盘简介 -->
<template>
	<view class="house-describe">
		<title-info text="楼盘简介" ></title-info>
		<view class="img-container" v-if="descriptionInfo.annexPath">
			<image class="img" :src="descriptionInfo.annexPath+'?x-oss-process=image/resize,h_90,w_120'" mode=""></image>
		</view>
		<view class="des">
			<u-read-more :toggle="true" :show-height="220"  :shadow-style="shadowStyle"  open-text="收起" close-text="全文">
				<rich-text   :nodes="descriptionInfo.buildingDescription"></rich-text>
			</u-read-more>
		</view>
	</view>
</template>

<script>
	import titleInfo from './titleInfo.vue';
	export default {
		props:{
			descriptionInfo:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		data(){
			return{
				shadowStyle: {
					color:"#9F7747",
					backgroundImage: "none",
					paddingTop: "0",
					justifyContent:"left"
				}
			};
		},
		components: {
			titleInfo
		},
	}
</script>

<style lang="scss" scoped>
	.house-describe{
		width: 100%;
		color: #141414;
		padding: 40rpx 30rpx;
		border-top: 10rpx solid #999999;
		.img-container{
			margin-top: 60rpx;
			text-align: center;
			.img{
				width:240rpx;
				height: 180rpx;
			}
		}
		.des{
			
			margin-top: 28rpx;
			
		}
		/deep/.u-icon__icon {
				display: none;
		}
		/deep/.u-content__showmore-wrap {
			justify-content: left;
		}

		
	}
	/deep/.u-content{
		line-height: 1.9;
	}
		
</style>
