<!-- 楼盘详情:轮播图和基本信息 -->
<template>
<view class="building-card" @click.stop="doToBulidingInfo">
	<!-- 图片 -->
	<view class="img-container">
		<!-- <image class="img" :src="baseInfo.img?baseInfo.img:defaultImg" mode=""></image> -->
		<view class="img" :style="{'background-image':`url(${baseInfo.realImgPath||'https://media.tongcehaofang.com/image/default/F8EF2B9B78C44DEF9A0C1185C12EF525-6-2.jpg'})`}">
		</view>
		<view class="play-flag">
			<view class="triangle"></view>
		</view>
		<view class="img-flag">
			<text class="flag-item flag-item-active" v-if="baseInfo.mp4Picture == baseInfo.realImgPath">VR</text>
			<text class="flag-item " v-if="baseInfo.vrPicture==baseInfo.realImgPath">视频</text>
			<text class="flag-item " v-if="baseInfo.imgPicture== baseInfo.realImgPath">图片</text>
		</view>
	</view>
	<!-- 名称 特色 -->
	<view class="base-info">
		<view class="baseInfo-flag1">
			<view class="flag1-alias">
				{{baseInfo.buildingAlias||baseInfo.buildingName}}
			</view>
			<view class="flag1-propertytypeAndstatus">
				<text class="flag1-item flag1-status " :style="{color:baseInfo.salesStatusItem.color}">{{baseInfo.salesStatus == 1?'待售':baseInfo.salesStatus == 2?'在售':baseInfo.salesStatus == 3?'售罄':baseInfo.salesStatus == 4?'在租':''}}</text>
				<text class=" flag1-item flag1-propertytype" v-for="(item,index) in baseInfo.propertyTypes" :key="index">
					{{getPropertyType(item)}}
				</text>
			</view>
		</view>
		<view class="baseInfo-flag2">
			<text class="flag2-tag" v-for="(item,index) in baseInfo.buildingTags" :key="index">
				{{item}}
			</text>
		</view>
	</view>
	
	<!-- 楼盘价格 -->
	<view class="building-price">
	    <text class="price-title">参考均价</text>
	    <view class="price-content">
			{{doFormatAveragePrice(baseInfo.referenceAveragePriceType,baseInfo.referenceAveragePrice)}}
	    </view>
	</view>
	<!-- 楼盘亮点 -->
	<view class="baseInfo-bright">
		<text class="iconfont iconicon_experience"></text>
	    <text class="bright-text">{{baseInfo.buildingBrightSpot}}</text>
	</view>
	
	<view class="baseInfo-other">
		<view class="other-area">
			<text class="other-item">
				参考总价:{{$formatter.formatTotalPrice1(baseInfo.referenceTotalPriceMin,baseInfo.referenceTotalPriceMax)}}
			</text>
			<text class="other-item">
				建筑面积:{{$formatter.formatArea1(baseInfo.referenceBuildAreaMin,baseInfo.referenceBuildAreaMax)}}
			</text>
		</view>
		<view class="other-houseType">
			<text class="other-item">
				在售户型:{{baseInfo.houseType?baseInfo.houseType+'室':'待定'}}
			</text>
			<text class="other-item">
				开盘时间:{{baseInfo.openTime||'开盘待定'}}
			</text>
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
	
  },
  
  methods:{
	//跳转楼盘详情
	doToBulidingInfo (buildingId) {
		uni.navigateTo({
		   url: '/pagesHouse/house/house?buildingId='+ buildingId + '&userId='+ this.userId
		});
	},
	doFormatAveragePrice(type,averagePrice){ //均价格式化
	  if(!averagePrice){
	    return '待定'
	  }else{
	      if(type==1){
	          return `${averagePrice}元/㎡`
	      }else {
	          return `${averagePrice}元/㎡起`
	      }
	  }
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
		type = type*1-1;
		return this.$formatter.cache.propertyType[type].value;
	},
	
  }
  
}
</script>

<style lang="scss" scoped>
.building-card {
	width:100%;
	// width:702rpx;
	height:842rpx ;
	background-color: #FFFFFF;
	// background-color: green;
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
			background: #062471;
			color: #FFFFFF;
		}
	}
	  
	//楼盘名称  标签
	.base-info{
		margin-top:20rpx;
	}
	
	.flag1-alias,.flag1-propertytypeAndstatus{
		display: inline-block;
	}
	.flag1-alias{
		font-size: 40rpx;
		min-width: 210rpx;
		height: 40px;
		padding: 0 30rpx;
		font-weight: 500;
		text-align: left;
		color: #2b2014;
	}
	.flag1-item{
		display: inline-block;
		min-width: 62rpx;
		height: 32rpx;
		padding:0 4rpx;
		margin-right: 8rpx;
		font-size:22rpx;
		border-radius: 5rpx;
		text-align: center;
	}
	.flag1-status{
		color: #FFFFFF;
		background: #2951b8;
	}
	.flag1-propertytype{
		color:#2951B8;
		border: 1rpx solid #2951b8;
	}
	.baseInfo-flag2{
		padding-left: 30rpx;
	}
	.flag2-tag{
		min-width: 84rpx;
		height: 32rpx;
		padding: 5rpx 12rpx;
		margin-right:20rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: #827870;
		background: #f2f4f8;
		border-radius: 4rpx;
	}
	
	
	// 楼盘价格
	.building-price {
	  width: 100%;
	  padding: 0 24rpx;
	  padding-left: 30rpx;
	  margin-top:15rpx;
	  display: flex;
	  align-items: center;
	  .price-title{
		  font-weight: 400;
		  color: #928b94;
	  }
	  .price-content{
		  margin-left: 10rpx;
		  font-size: 42rpx;
		  font-weight: 500;
		  color: #f95424;
	  }
	}
	
	//楼盘亮点
	.baseInfo-bright{
		// border: 1px solid red;
		width:100%;
		// height: 48rpx;
		padding-left: 30rpx;
		margin-top:15rpx;
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #827870;
		display: flex;
		align-items: center;
		.iconfont{
			width:28rpx;
			height: 23rpx;
			margin-top:-5rpx;
			margin-right: 10rpx;
		}
	}
	.bright-icon{
		width:30rpx;
		height: 28rpx;
	}

	
	
	//参考总价 建筑面积 户型 开盘时间
	.baseInfo-other{
		width:642rpx;
		margin: 0 auto;
		margin-top:20rpx;
		// padding-left: 30rpx;
		padding-bottom: 50rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #827870;
		border-top: 1rpx solid #efefef;
		.other-area,.other-houseType{
			margin-top: 20rpx;
			display: flex;
		}
		.other-item{
			width: 50%;
		}
	}
	
	
}
</style>
