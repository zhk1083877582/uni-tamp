<!-- 管家 -->
<template>
	<view class='keeper'>
		<view class="tou"><view class="span" @click="tochathouseKeeper(keeperUserInfo)"> <image class="img" :src="keeperUserInfo.avatarUrl != '' ? keeperUserInfo.avatarUrl : '../../static/photo_default@2x.png'" alt=""></image> </view></view>
		<view class="touName" @click="tochathouseKeeper(keeperUserInfo)">{{keeperUserInfo.cardName}}</view>
		<view class="satisfied">
			<view class="span">满意度 <text class="satisfaction">{{keeperUserInfo.satisfaction}}</text></view>
			<view class="span">响应率 <text class="responseRatio">{{keeperUserInfo.responseRatio * 100}}</text>%</view>
		</view>
		<view class="knowledge"><text class="span" v-for="(item,index) in keeperUserInfo.expertiseFieldList" :key="index">{{item.paraValue}}</text></view>
		<view class="my">
			我是您的专属置业管家
			<text class="span"> </text>
		</view>
		<view class="houseKeeperText">
			{{endContent}}
		</view>
	</view>
</template>

<script>
import { getData } from '@/request/api';
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default {
	components: {},
	data() {
		return {
			
		};
	},
	props:{
		endContent:{
			type:String,
			default:''
		},
		keeperUserInfo:{
			type:Object,
			default:()=>{
				return {}
			}
		}
	},
	computed: {},
	watch: {},
	methods: {
		//管家名片
		tochathouseKeeper(obj){
		    let { imBaseUserId,userName} = obj;
			imBaseUserId = "C2C"+imBaseUserId;
			uni.navigateTo({
			    url: '/pagesChat/chatDetail/houseKeeper?id='+imBaseUserId+"&title="+userName
			});
			
		},
	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
.keeper{
	width: 100%;
	background: #3B383A;
	border-radius: 20rpx;
	margin-top: 134rpx;
	padding: 0 40rpx 70rpx;
	.tou {
	    width: 200rpx;
	    height: 200rpx;
	    border-radius: 50%;
	    background: #0e0e0e;
	    padding-top: 10rpx;
	    padding-left: 10rpx;
	    margin: 0 auto;
	    position: relative;
	    top: -100rpx;
	}
	
	.tou .span {
	    width: 180rpx;
	    height: 180rpx;
	    display: block;
	    border-radius: 50%;
	    border: 1px solid #7e705f;
	    padding-top: 8rpx;
	    padding-left: 8rpx;
		.img {
			width: 160rpx;
			height: 160rpx;
			display: block;
			border-radius: 50%;
		}
	}
	
	.touName {
	    color: #FFF4D7;
	    font-size: 36rpx;
	    text-align: center;
	    margin: -74rpx 0 18rpx;
	}
	
	.satisfied {
	    text-align: center;
		.span {
			display: inline-block;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			background: linear-gradient(135deg, #f2e1b5, #fff3d6 33%, #e8ce91);
			font-size: 24rpx;
			padding: 0 18rpx;
			color: #000;
			border-radius: 40rpx;
		}
		.span:last-child {
		    margin-left: 10rpx;
		}
	}
	.knowledge {
	    text-align: center;
	    margin-top: 28rpx;
		.span {
		    display: inline-block;
		    font-size: 26rpx;
		    color: #D7CAB7;
		}
		.span:nth-child(n+1) {
			margin-left: 20rpx;
		}
	}
	
	.my {
	    font-size: 26rpx;
	    color: #FFEEC6;
	    margin-top: 70rpx;
	    padding-left: 16rpx;
	    position: relative;
	    padding-bottom: 4rpx;
		.span {
		    position: absolute;
		    bottom: 0;
		    left: 0;
		    display: block;
		    width: 65%;
		    height: 18rpx;
		    opacity: 0.6;
		    background: linear-gradient(270deg, rgba(247, 232, 205, 0), #edcd9e);
		}
	}
	
	.houseKeeperText {
	    font-size: 28rpx;
	    line-height: 28rpx;
	    color: #FFF2E0;
	    margin-top: 30rpx;
	}
	
}
</style>
