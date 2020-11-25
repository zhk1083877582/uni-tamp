<!-- 楼盘详情:楼盘介绍 -->
<template>
	<view class="house-introduce">
		<title-info text="楼盘介绍" ></title-info>
		<view class="introduce-container" >
			<view class="img" v-for="(item,index) in buildingIntroduce" :key="index">
				<image class="img" :src="item" mode=""></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	import titleInfo from './titleInfo.vue';
	export default {
		props:{
			buildingIntroduce:{
				type:Array,
				default:()=>{
					return []
				}
			}
		},
		components: {
			titleInfo
		},
		
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.house-introduce{
		border-top: 10px solid #f4f8f8;
		width: 100%;
		padding: 40rpx 30rpx;
		.introduce-container{
			margin-top: 30rpx;
		}
		.img{
			margin:0;
			width:100%;
		}
	}
</style>
