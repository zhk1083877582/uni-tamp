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
		padding: 40rpx 30rpx;
		border-top: 10px solid #f4f8f8;
		.img-container{
			margin-top: 40rpx;
			text-align: center;
			.img{
				width:240rpx;
				height: 180rpx;
			}
		}
		.des{
			margin-top: 30rpx;
			font-size: 12px;
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
