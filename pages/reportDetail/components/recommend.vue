<!-- 方案推荐 -->
<template>
	<view class='recommend'>
		<view class="title"><i class="iconfont icon370wanfuwuyonghu"></i><text class="span">方案推荐</text> <i class="iconfont icon370wanfuwuyonghu"></i> </view>
		<view class="content">
			<view class="top_bg_img"></view>
			<view class="list_item" @click="toDetail(building.buildingId)">
				<view class="list_item_warp">
					<view class="img_warp">
						<image class="tospur-image" :src="building.albumCoverPicture ? building.albumCoverPicture+'?x-oss-process=image/resize,h_200,w_200' : '/static/pic_default_small@2x.png'"></image>
					</view>
					<view class="item_details">
						<view class="details_title">
							{{building.buildingAlias}}
							<view class="label cl_B" v-if="!!building.propertyType">{{handlePropertyType(building.propertyType)}}</view>
							<view class="label cl_Y">{{building.salesStatus == 1?'待售':building.salesStatus == 2?'在售':building.salesStatus == 3?'售罄':building.salesStatus == 4?'在租':''}}</view>
						</view>
						<view class="price_details">{{$formatter.AveragePrice(building.referenceAveragePriceType,building.referenceAveragePrice,building.referenceAveragePriceMax)}}</view>
						<view class="address_details">{{$formatter.formatArea(building.referenceBuildAreaMin, building.referenceBuildAreaMax)}}<text class="mg_Lf_5">{{building.areaName}}<text v-if="building.streetName">-</text>{{building.streetName}}</text></view>
						<view class="classify">
							<view class="claWarp"><view class="claCon" v-for="(itemT,indexT) in building.buildingTagArr" :key="indexT">{{itemT}}</view></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

export default {
	components: {},
	data() {
		return {
			building:{
				"albumCoverPicture": "https://media.tongcehaofang.com/image/default/F51121C84D59490CA78132AEA616FCE7-6-2.jpg",
				"area": "310101000",
				"areaName": "黄浦区",
				"buildingAlias": "雅丽家院",
				"buildingBrightSpot": "阿斯蒂芬楼盘亮点",
				"buildingId": "1155",
				"buildingName": "雅丽家院",
				"buildingTagArr": ['位置','阳光','庭院','挑高','衣帽间','位置','阳光','庭院','挑高','衣帽间','位置','阳光','庭院','挑高','衣帽间'],
				"createTime": "2020-08-29 14:37:48",
				"detailAddress": "上海市黄浦区中山东二路367号阿斯蒂芬",
				"favourTitle": "阿斯蒂芬楼盘优惠",
				"haveCollection": "false",
				"houseTypeInfos": [],
				"lat": "31.235995",
				"lng": "121.501587",
				"mainPush": "1",
				"propertyType": "1,10,2",
				"referenceAveragePrice": "12000",
				"referenceAveragePriceMax": null,
				"referenceAveragePriceType": "1",
				"referenceBuildAreaMax": "200",
				"referenceBuildAreaMin": "100",
				"referenceTotalPriceMax": "200",
				"referenceTotalPriceMin": "100",
				"salesStatus": "1",
				"streetName": "黄浦滨江",
				"updateTime": "2020-11-12 10:08:27"
			},
		};
	},
	computed: {},
	watch: {},
	methods: {
		toDetail(){
		
		},
		handlePropertyType(key){
			let newKey = ''
			if(key.length>1){
				newKey = key.substring(0,1)
			}else{
				newKey = key
			}
			return this.$formatter.switchName('propertyType',newKey)
		},
	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
.recommend{
	margin: 0 40rpx;
	margin-bottom: 80rpx;
	.content{
		background: #ffffff;
		border-radius: 20rpx;
		padding: 50rpx 24rpx;
		padding-top: 70rpx;
		position: relative;
		overflow: hidden;
		.top_bg_img{
			height: 20rpx;
			width: 100%;
			background-color: #e6bb78;
			top: 0;
			left: 0;
			position: absolute;
		}
	}
	.title {
		font-size: 40rpx;
		line-height: 40rpx;
		font-weight: bold;
		text-align: center;
		color: #fff9ea;
		margin-top: 70rpx;
		margin-bottom: 30rpx;
		.span{
			background: linear-gradient(315deg,#e6bb78, #fdedd7 53%, #ebc382);
			-webkit-background-clip: text;
			color: transparent;
			padding: 0 20rpx;
		}
		.iconfont {
			width: 30rpx;
			height: 30rpx;
		}
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
			}
			.item_details{
				padding-left: 20rpx;
				flex: 1;
				.details_title{
					font-size: 32rpx;
					line-height: 40rpx;
					color: #333333;
					font-weight: 700;
					display: flex;
					.label{
						border-radius:4rpx;
						font-size: 22rpx;
						color: #ffffff;
						padding: 5rpx 9rpx;
						display: inline-block;
						text-align: center;
						line-height: 22rpx;
						margin-left: 6rpx;
						vertical-align: text-top;
						margin-top: 4rpx;
						display: flex;
						align-self: center;
					}
					.cl_B{
						margin-right: 8rpx;
						margin-left: 10rpx;
						background-color: #9F7747;
					}
					.cl_Y{
						border: 1px solid #9f7747;
						border-radius: 5px;
						color: #9f7747;
					}
				}

				.price_details{
					font-size: 32rpx;
					color: #F95424;
					line-height: 30rpx;
					padding:16rpx 0 14rpx 0;
					font-weight: 600;
					.price_unit{
						font-size: 20rpx;
						line-height: 30rpx;
						margin-left: 4rpx;
					}
				}

				.address_details{
					font-size: 24rpx;
					color: #C4C0C5;
					line-height: 24rpx;
					padding-bottom: 16rpx;
					.mg_Lf_5{
						margin-left: 20rpx;
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
						margin-right: 8rpx;
						height: 30rpx;
						line-height: 30rpx;
						padding: 0 6rpx;
						background-color: #F1F9FF;
						border-radius:4rpx;
						white-space: nowrap;
					}
				}    
			}
		}
	}
}
</style>
