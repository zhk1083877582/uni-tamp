<template>
	   <view class="hot_recommend">
	   	<view class="hot_recommend_label" v-if="HotRecommendList.length>0">热门推荐</view>
	   	<view class="list_item" v-for="item in HotRecommendList" :key="item.buildingId" @click="handelToHouse(item.buildingId)">
	   		<view class="list_item_warp">
	   			<view class="img_warp">
	   				<image class="tospur-image" :src="item.albumCoverPicture ? item.albumCoverPicture : '/static/pic_default_small@2x.png'"></image>
	   				<view class="house_cover" v-if="item.favourTitle != ''">
	   					{{item.favourTitle}}
	   				</view>
	   			</view>
	   			<view class="item_details">
	   				<view class="details_title">
	   					{{item.buildingAlias}}
	   					<view class="label cl_B" v-if="!!item.propertyType">{{handlePropertyType(item.propertyType)}}</view>
	   					<view class="label cl_Y">{{item.salesStatus == 1?'待售':item.salesStatus == 2?'在售':item.salesStatus == 3?'售罄':item.salesStatus == 4?'在租':''}}</view>
	   				</view>
	   				<view class="price_details">{{$formatter.AveragePrice(item.referenceAveragePriceType,item.referenceAveragePrice,item.referenceAveragePriceMax)}}</view>
	   				<view class="address_details"><text class="mg_rt_5">{{item.areaName}} <text v-if="item.streetName">-</text>{{item.streetName}}</text>{{$formatter.formatArea(item.referenceBuildAreaMin, item.referenceBuildAreaMax)}}</view>
	   				<view class="classify">
	   					<view class="claWarp"><view class="claCon" v-for="(itemT,indexT) in item.buildingTagArr" :key="indexT">{{itemT}}</view></view>
	   				</view>
	   			</view>
	   		</view>
	   		<view  class="recommend_mess"><image class="recommend_mess_img" src="/static/advantage.png" alt="楼盘卡片"></image>{{item.buildingBrightSpot}}</view>
	   	</view>
	   </view>
</template>

<script>
	import { getData } from '@/request/api';
export default {

    data(){
        return {
			HotRecommendList:[],
        }
    },
	methods:{
		handlePropertyType(key) {
			let newKey = '';
			if (key.length > 1) {
				newKey = key.substring(0, 1);
			} else {
				newKey = key;
			}
			return this.$formatter.switchName('propertyType', newKey);
		},
		gethotBuilding() {
			let city =this.$cache.getCache('storageCity')
		let params = {
			cityCode:city.code||310100000,
		};
			getData("/building/pc/building/hotBuildingRecommendByAreaCode", params).then(res => {
				console.log(res,'热门推荐')
					res.list && res.list.forEach((itemT, indexT) => {
						let buildingTagArr = []
						itemT.buildingTag && itemT.buildingTag.split(",").forEach((item, index) => {
							buildingTagArr.push(item)
							itemT.buildingTagArr = buildingTagArr
						})
					})
					
					this.HotRecommendList = res.list.length!=0?res.list:[]
				})
				.catch(err => {
					console.log("请求结果报错", err);
				});
		},
		handelToHouse(id){
			uni.navigateTo({
				url: "/pagesHouse/house/house?buildingId="+id
			});
			
		},
	},
    created(){
      this.gethotBuilding()
    }
}
</script>

<style lang='scss' scoped>
.hot_recommend{
	        padding-bottom:100rpx;
			padding-left: 24rpx;
			.hot_recommend_label{
				padding-top: 30rpx;
				font-size: 32rpx;
				color: #282828;
			}
			.list_item{
				padding: 30rpx 0;
				padding-left: 16rpx;
				position: relative;
				&:not(:last-child)::after{
					position: absolute;
					box-sizing: border-box;
					content: ' ';
					pointer-events: none;
					top: -50%;
					right: -50%;
					bottom: -50%;
					left: -50%;
					border-bottom: 2rpx solid #ebedf0;
					-webkit-transform: scale(0.5);
					transform: scale(0.5);
				}
				.list_item_warp{
					display:flex;
					overflow: hidden;
					.img_warp{
						width: 210rpx;
						height: 170rpx;
						border-radius: 10rpx;
						overflow: hidden;
						position: relative;
						.tospur-image{
							height: 100%;
							width: 100%;
							border-radius: 8rpx;
						}
						.house_cover{
							width: 100%;
							height: 38rpx;
							background: linear-gradient(270deg,#ff4e0c, #fe711e);
							position: absolute;
							top: 0;
							font-size: 20rpx;
							font-weight: 700;
							line-height: 2;
							color: #ffffff;
							text-align: center;
						}
					}
					.item_details{
						padding-left: 20rpx;
						flex: 1;
						.details_title{
							font-size: 32rpx;
							line-height: 40rpx;
							color: #333333;
							font-weight: 700;
							.label{
								border-radius:4rpx;
								font-size: 20rpx;
								color: #ffffff;
								// width: 24px;
								padding: 0 4rpx;
								height: 26rpx;
								display: inline-block;
								text-align: center;
								line-height: 30rpx;
								margin-left: 6rpx;
								vertical-align: text-top;
								margin-top: 4rpx;
							}
							.cl_B{
								background-color: #00A4FF;
								margin-right: 8rpx;
								margin-left: 10rpx;
							}
							.cl_Y{
								background-color: #FF8252;
							}
						}
				
						.price_details{
							font-size: 32rpx;
							color: #FF664F;
							line-height: 30rpx;
							padding:16rpx 0 14rpx 0;
							.price_unit{
								font-size: 20rpx;
								line-height: 30rpx;
								margin-left: 4rpx;
							}
						}
				
						.address_details{
							font-size: 24rpx;
							color: #666666;
							line-height: 24rpx;
							padding-bottom: 16rpx;
							.mg_rt_5{
								margin-right: 20rpx;
							}
						}
				
						.classify{
							font-size: 20rpx;
							color: #999999;
							overflow-y: hidden;
							overflow-x: scroll;
							height: 30rpx;
							&::-webkit-scrollbar {display:none}
							.claWarp{
								height: 100%;
								width: 200rpx;
								display: flex;
							}
							.claCon{
								display: block;
								float: left;
								margin-right: 4rpx;
								height: 30rpx;
								line-height: 34rpx;
								padding: 0 6rpx;
								background-color: #F1F9FF;
								border-radius:4rpx;
								white-space: nowrap;
							}
						}    
					}
				}
				
				.recommend_mess{
					margin: 20rpx 0 0 0;
					background-color: #FFF9F3;
					color: #ED9371;
					font-size: 20rpx;
					height: 36rpx;
					line-height: 36rpx;
					display: inline-block;
					margin-right: 20rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					border-radius: 20rpx;
					padding-right: 20rpx;
					max-width: 95%;
					&_img{
						width: 28rpx;
						height: 28rpx;
						float: left;
						margin: 4rpx 8rpx 0 4rpx;
					}
				}
			}
		}
</style>
