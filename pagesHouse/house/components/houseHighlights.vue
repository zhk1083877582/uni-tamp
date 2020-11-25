<!-- 楼盘详情:楼盘亮点 -->
<template>
	<view class="house-highlights">
		<title-info text="楼盘亮点" ></title-info>
		
		
		<view class="img-container" v-if="highlightsInfo.type==1">
			<view class="img-item">
				<image class="img" v-for="(item,index) in highlightsInfo.list" :key="index" :src="item.annexPath" mode=""></image>
			</view>
		</view>
		<view class="img-container" v-if="highlightsInfo.type==2">
			<view class="highlights-list" v-if="highlightsInfo.list.length>1">
				<u-swiper  :list="highlightsInfo.list" name="annexPath" mode="rect" 
				 indicator-pos="bottomCenter" @change="doSwiper"></u-swiper>
			</view>
			<view v-else class="img-item">
				<image  v-for="(item,index) in highlightsInfo.list" :key="index" :src="item.annexPath" mode=""></image>
			</view>
			<view class="des">
				<view class="des-title">{{highlightsInfo['list'][active].title}}</view>
				<view class="des-text">
					{{highlightsInfo['list'][active].content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import titleInfo from './titleInfo.vue';
	export default {
		props:{
			highlightsInfo:{
				type:Object,
				default:()=>{
					return {
						type:'',
						list:[]
					};
				}
			}
		},
		data(){
			return{
				active:0
			}
		},
		components: {
			titleInfo
		},
		methods:{
			doSwiper(index){
				this.active =index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.house-highlights{
		width: 100%;
		padding: 40rpx 30rpx;
		border-top: 10px solid #f4f8f8;
		.img-container{
			margin-top: 30rpx;
			.img-item{
				width:100%;
				text-align: center;
			}
			// .img{
			// 	display: block;
			// }
		}
		.des{
			margin-top: 20rpx;
			.des-title{
				font-size: 15px;
				font-weight: 700;
				text-align: center;
			}
			.des-text{
				margin-top: 20rpx;
				font-size: 13px;
				color: #999999;
			}
		}
		/deep/.u-indicator-item-rect-active{
			background-color: #225CD3;
		}
	}
</style>
