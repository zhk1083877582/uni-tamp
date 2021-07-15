<!-- 楼盘详情:轮播图和基本信息 -->
<template>
<view class="building-card" @click.stop="doToBulidingInfo">
	<view class="building_title_name">
		<view class="build_name">
			{{baseInfo.buildingAlias}}
		</view>
		<!-- <view class="building_bright_spot">
			{{baseInfo.buildingBrightSpot}}
		</view> -->
		<view class="build_stickers">
			{{baseInfo.salesStatus == 1?'待售':baseInfo.salesStatus == 2?'在售':baseInfo.salesStatus == 3?'售罄':baseInfo.salesStatus == 4?'在租':''}}
		</view>
	</view>
	<!-- 图片 -->
	<view class="img-container">
		<view class="img" :style="{'background-image':`url(${baseInfo.realImgPath||'https://media.tongcehaofang.com/image/default/B8A86CAEE12C4158AA9CBE9C7C1E57C3-6-2.jpg'})`}">
		</view>
		<view class="play-flag" v-if="baseInfo.mp4Picture||baseInfo.vrPicture">
			<view class="triangle"></view>
		</view>
		<view class="img-flag">
			<text class="flag-item" v-if="baseInfo.vrPicture " :class="baseInfo.vrPicture?'flag-item-active':''">VR</text>
			<text class="flag-item" v-if="baseInfo.mp4Picture" :class="!baseInfo.vrPicture?'flag-item-active':''">视频</text>
			<text class="flag-item" v-if="baseInfo.imgPicture" :class="!baseInfo.vrPicture&&!baseInfo.mp4Picture?'flag-item-active':''">图片</text>
		</view>
	</view>
	
	<view class="baseInfo-other">
		<view class="other_warp">
			<view class="other-area">
				<view class="other-item average_price">
					<view class="red">
						{{doFormatAveragePrice(baseInfo.referenceAveragePriceType,baseInfo.referenceAveragePrice,baseInfo.referenceAveragePriceMax)}}
						<text class="unit" v-if="baseInfo.referenceAveragePriceType!=3&&(baseInfo.referenceAveragePrice||baseInfo.referenceAveragePriceMax)">万元/㎡</text>
						<text class="unit" v-if="baseInfo.referenceAveragePriceType==3&&(baseInfo.referenceAveragePrice||baseInfo.referenceAveragePriceMax)">万元/㎡起</text>
					</view>
					<view class="label">参考均价</view>
				</view>
				<view class="other-item bord">
					<view class="red">{{$formatter.formatTotalPrice1(baseInfo.referenceTotalPriceMin,baseInfo.referenceTotalPriceMax)}}<text class="unit" v-if="baseInfo.referenceTotalPriceMin||baseInfo.referenceTotalPriceMax">万</text></view>
					<view class="label">参考总价</view>
				</view>
				<view class="other-item">
					<view class="red">{{$formatter.formatArea1(baseInfo.referenceBuildAreaMin,baseInfo.referenceBuildAreaMax)}}<text class="unit" v-if="baseInfo.referenceBuildAreaMin||baseInfo.referenceBuildAreaMax">㎡</text></view>
					<view class="label">参考建面</view>
				</view>
			</view>
			<view class="other-houseType">
				<view class="other-item">
					在售户型:<text class="black MR_R bed_room" v-for="(item,index) in baseInfo.houseTypeVOS">{{item.bedroom?item.bedroom+'室':'待定'}}</text>
				</view>
			</view>
			<view class="other-address">
				楼盘地址:<view class="MR_R detail_address"><text>{{baseInfo.cityName}}</text><text v-if="baseInfo.cityName&&baseInfo.areaName">-</text><text>{{baseInfo.areaName}}</text><text class="MR_R detail_address">{{baseInfo.detailAddress}}</text></view>
			</view>
		</view>
		
		<view class="to_detaile">
			查看楼盘完整信息
		</view>
		<view class="Tips">
			本信息仅供参考，准确信息请以开发商所披露的信息为准，客户需根据自身情况进行购买决策。
		</view>
	</view>
</view>
</template>

<script>
import { getData } from '@/request/api';
export default {
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
	buildingId:{
		type: String,
		default: ''
	},
	userId:{
		type:String,
		default:''
	}
  },
  data () {
    return {
	  defaultImg:'/static/pic_default_small@2x.png',//默认图片
      imgList: []
    }
  },
  mounted(){
	console.log('楼盘信息11',this.baseInfo)
  },
  
  methods:{
	//跳转楼盘详情
	doToBulidingInfo () {
		uni.navigateTo({
		   url: '/pagesHouse/house/house?buildingId='+ this.buildingId + '&userId='+ this.userId
		});
	},
	doFormatAveragePrice(type,averagePriceMin,averagePriceMax){ //均价格式化
	  if(!averagePriceMin){
	    return '待定'
	  }else{
	      if(type==1){
	          return `${this.unitChange(averagePriceMin)}`
	      }else if(type==2){
	          return `${this.unitChange(averagePriceMin)}-${this.unitChange(averagePriceMax)}`
	      }else{
	          return `${this.unitChange(averagePriceMin)}`
	      }
	  }
	},
	unitChange(num){
		if(!num){
			return 
		}
		return ((num-0)/10000).toFixed(2)
	},
	// 销售状态
	getSalesStatus (salesStatus) {
	  // salesStatus:销售状态(1:待售 2:在售 3:售罄  4:在租)
	  let item = {
		  lebel:'',
		  color:''
	  };
	  switch (salesStatus) {
	    case '1':
	      // label = '待售';
		  item={
			  label:'待售',
			  color:'#ffffff'
		  }
	      break;
	    case '2':
	      // label = '在售';
		  item={
			  label:'在售',
			  color:'#ffffff'
		  }
	      break;
	    case '3':
	      // label = '售罄';
		  item={
			  label:'售罄',
			  color:'#ffffff'
		  }
	      break;
	    case '4':
	      // label = '在租';
		  item={
			  label:'在租',
			  color:'#ffffff'
		  }
	      break;
	  }
	  return item
	},
	
	// 物业类型
	getPropertyType(type){
		// type = type*1-1;
		// return this.$formatter.cache.propertyType[type].value;
		let newKey = ''
		if(!type) return
		return this.$formatter.switchName('propertyType',type)
	},
	
  }
  
}
</script>

<style lang="scss" scoped>
.building-card {
	width:100%;
	// height:842rpx ;
	// background-color: #FFFFFF;
	border-radius: 16rpx;
	.building_title_name{
		height: 166rpx;
		background: #324877;
		position: relative;
		overflow: hidden;
		text-align: center;
		padding: 34rpx 0;
		.build_name{
			background: linear-gradient(270deg,#e2cca8 97%, #f4e6cf);
			-webkit-background-clip: text;
			font-size: 56rpx;
			font-weight: 600;
			text-align: center;
			color: transparent;
			line-height: 56rpx;
			text-shadow: 0px 2rpx 14rpx 0px rgba(0,0,0,0.09); 
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap
		}
		.building_bright_spot{
			margin-top: 18rpx;
			background: linear-gradient(270deg,#ddceb5, #f4e6cf 2%);
			-webkit-background-clip: text;
			font-size: 24rpx;
			text-align: center;
			color: transparent;
			line-height: 24rpx;
			text-shadow: 0px 2rpx 14rpx 0px rgba(0,0,0,0.09);
			overflow:hidden;
			text-overflow:ellipsis;
			white-space:nowrap;
			padding: 0 30rpx;
		}
		.build_stickers{
			font-size: 24rpx;
			text-align: center;
			color: #4c3612;
			line-height: 50rpx;
			width: 220rpx;
			opacity: 1;
			background: #f1e3cb;
			-webkit-transform: rotate(-45deg);
			transform: rotate(-45deg);
			position: absolute;
			top: 10rpx;
			left: -70rpx;
		}
	}
   //图片
	.img-container{
		width:100%;
		height: 426rpx;
		box-sizing: border-box;		
		overflow: hidden;
		position: relative;
		.img{
			width:100%;
			height:100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			// border: 1px solid red;
		}
		//播放标识
		.play-flag{
			width: 120rpx;
			height: 120rpx;
			border-radius: 50% 50%;
			background-color: #1B1B1B;
			opacity: 0.6;
			position: absolute;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.triangle{
			width: 40rpx;
			height: 45rpx;
			background-image: url(../../../static/house/triangle.png);
			background-repeat: no-repeat;
			background-size: 100% 100%;
		}
		//图片类型
		.img-flag{
			width: 100%;
			position: absolute;
			bottom:24rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.flag-item{
			display: inline-block;
			width: 100rpx;
			height: 44rpx;
			line-height: 44rpx;
			text-align: center;
			margin-right: 10rpx;
			font-size: 22rpx;
			font-weight: 500;
			color: #666666;
			background: #ffffff;
			border-radius: 22rpx;
		}
		.flag-item-active{
			background: #324877;
			color: #FFFFFF;
		}
	}
	
	//参考总价 建筑面积 户型 开盘时间
	.baseInfo-other{
		// width:642rpx;
		// margin-top:20rpx;
		// padding-left: 30rpx;
		padding-bottom: 50rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
		background: transparent;
		.other_warp{
			border-left: 2rpx solid #cccccc;
			border-right: 2rpx solid #cccccc;
			border-top: 0;
			padding: 0 24rpx;
			background: #fff;
		}
		.other-area,.other-houseType,.other-address{
			padding-top: 20rpx;
			display: flex;
		}
		.other-area {
			display: flex;
			justify-content: space-between;
			.other-item{
				display: flex;
				flex-direction: column;
				.unit{
					font-size: 20rpx;
					font-weight: 500;
					text-align: left;
					color: #ff5824;
					line-height: 20rpx;
				}
			}
			.red{ 
				color: #ff5824;
				font-size: 32rpx;
				.label{
					font-size: 26rpx;
					color: #999999;
				}
			}
		}
		.other-houseType{
			.bord{
				padding: 0 20rpx;
				border-left: 1px solid #eeeeee;
				border-right: 1px solid #eeeeee;
			}
			.bed_room{
				display: inline-block;
				font-size: 22rpx;
				color: #5973b3;
				background: #eeeff1;
				border-radius: 4rpx;
				padding: 6rpx 10rpx;
			}
		}
		.black{ color: #141414; }
		.MR_R{ margin-left: 8rpx; }
		.other-address{
			padding-bottom: 20rpx;
			border-bottom: 2rpx solid #efefef;
			.detail_address{
				display: flex;
				flex: 1;
			}
		}
		
		.to_detaile{
			font-size: 30rpx;
			font-weight: 400;
			text-align: center;
			color: #072978;
			line-height: 30rpx;
			padding: 24rpx 0;
			border: 2rpx solid #cccccc;
			border-top: 0;
			border-radius: 0 0 16rpx 16rpx;
			overflow: hidden;
			background: #fff;
		}
	}
	.Tips{
		font-size: 20rpx;
		font-weight: 400;
		padding: 30rpx 10rpx;
		text-align: left;
		color: #6275a2;
		line-height: 28rpx;
	}
	
}
</style>
