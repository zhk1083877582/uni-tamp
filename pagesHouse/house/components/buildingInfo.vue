<!-- 楼盘详情:轮播图和基本信息 -->
<template>
<view class="building-info">
	<view class="luobo">
		  <!-- 轮播区域 -->
		<view :class="{'luobo-container':true,'luobo-border':baseInfo.favourTitle}">
			<view class="luobo-imglist" v-if="imgList.length>0">
			  <u-swiper :list="imgList" :current="activeNo" height="686" duration="0" :circular="false" :autoplay="false" mode="none" @change="doSwiperChange" @click="toMp4OrImg('img')"></u-swiper>
			</view>
			<view class="luobo-imglist" v-else>
				<image class="img1" :src="defaultImg" mode=""></image>
			</view>
		</view>	
		<!-- 轮播区域-底部文字 -->
		<view class="luobo-text_bottom">
		  <text class="luobo-text_span  mp4" v-if="mp4Num>0" :class="{spanColor: activeNo<VRStart}" @click="changeSwiperImg(mp4Start)">
		    视频
		  </text>
		  <text class="luobo-text_span VR" v-if="VRNum>0" :class="{spanColor:activeNo>=VRStart&&activeNo<ImgStart}" @click="changeSwiperImg(VRStart)">
		    VR
		  </text>
		  <text class="luobo-text_span img" v-if="ImgNum>0" :class="{spanColor: activeNo>=ImgStart }" @click="changeSwiperImg(ImgStart)">
		    图片
		  </text>
		  <text class=" lunbo_img_num" v-if=" ImgNum>0&&activeNo>=ImgStart">
		    共<text class="img_num_c">{{activeNo+1-VRNum-mp4Num}}</text>
		    /<text class="img_num_t">{{ImgNum}}</text>张
		  </text>
		</view>
		<!-- 轮播区域-图片跳转出发按钮 -->
		<view v-if="mp4Num>0&&activeNo<VRStart" class="luobo-type-flag luobo-type-mp4" @click="toMp4OrImg"></view>
		<view v-if="VRNum>0&&activeNo>=VRStart&&activeNo<ImgStart" class="luobo-type-flag luobo-type-VR" @click="toMp4OrImg"></view>
		<div class="luobo-text_top" v-if="baseInfo.favourTitle">{{baseInfo.favourTitle}}</div>
	</view>
	
	<view class="base-info">
		<view class="baseInfo-flag1">
			<view class="flag1-alias">
				{{baseInfo.buildingAlias}}
			</view>
			<view class="flag1-propertytypeAndstatus">
				<text class=" flag1-item flag1-propertytype" v-for="(item,index) in baseInfo.propertyTypeList" :key="index">
					{{item}}
				</text>
				<text class="flag1-item flag1-status " :style="{color:baseInfo.salesStatusItem.color}">{{baseInfo.salesStatusItem.label}}</text>
			</view>
		</view>
		<view class="baseInfo-flag2">
			<text class="flag2-tag" v-for="(item,index) in baseInfo.buildingTags" :key="index">
				{{item}}
			</text>
		</view>
	</view>
	<view class="baseInfo-characteristic">
		<view class="characteristic-item characteristic-price">
			<view class="characteristic-text">
				参考均价
			</view>
			<view class="characteristic-value price-value" v-if="baseInfo">
				{{doFormatAveragePrice(baseInfo.referenceAveragePriceType,baseInfo.referenceAveragePrice)}}
			</view>
		</view>
		<view class="characteristic-item characteristic-area">
			<view class="characteristic-text">
				建筑面积
			</view>
			<view class="characteristic-value" v-if="baseInfo">
				{{doFormatArea(baseInfo.referenceBuildAreaMin,baseInfo.referenceBuildAreaMax)}}
			</view>
		</view>
		<view class="characteristic-item characteristic-totalPrice">
			<view class="characteristic-text">
				参考总价
			</view>
			<view class="characteristic-value" v-if="baseInfo">
				{{doFormatTotalPrice(baseInfo.referenceTotalPriceMin,baseInfo.referenceTotalPriceMax)}}
			</view>
		</view>
	</view>
	<view class="baseInfo-other">
		
		<view class="other-houseType">
			<text class="other-item">
				在售户型:{{baseInfo.houseType?baseInfo.houseType+'室':'待定'}}
			</text>
			<text class="other-item">
				开盘时间:{{baseInfo.openTime||'开盘待定'}}
			</text>
		</view>
	</view>
	<view class="baseInfo-address">
	  <text class="baseInfo-address_text">地址:{{baseInfo.detailAddress}}</text>
	  <text class="iconfont iconpoint_s1" @click="toMap"></text>
	</view>
	<view class="baseInfo-detail_btn" @click="goBuildingDetailMore">
	  查看详情
	</view>
	<view class="baseInfo-update">
	  本楼盘消息更新于{{baseInfo.updateTime||''}}
	</view>
	<!-- <view class="baseInfo-req">
	  <image class="img" src="/static/house/info-req.png" mode=""></image>
	</view> -->
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
		type: String,
		default: ''
	}
  },
  data () {
    return {
	  defaultImg:'/static/pic_default_small@2x.png',//默认图片
      imgList: [],
      activeNo: 0,//当前轮播的是第几张图片
      mp4Start: 0,//mp4
      mp4Num: 0,
      VRStart: 0,
      VRNum: 0,
      ImgStart: 0,
      ImgNum: 0,
      NetworkType: ''
    }
  },
  created () {
	  let self = this
	  uni.getNetworkType({
		success: function (res) {
		  console.log(res.networkType, 'networkTypenetworkType');
		  self.NetworkType = res.networkType
		}
	  });
  },
  mounted(){
	
  },
  
  methods:{
	// 处理图片-得到MP4 VR 图片
	doFormatImgList(annexs){
		let {defaultImg} =this;
		if(!annexs.length){
			return
		}
		let aliaOss = '?x-oss-process=image/resize,h_750,w_750';//限制图片大小
		let mp4Arr = [],VRArr = [],imgArr=[];
		annexs.forEach(item=>{
			let {annexType,annexPath} = item;
			if(annexPath&&annexType =='109'){
				mp4Arr.push({
					isShow:false,
					image1:annexPath+aliaOss,
					image:defaultImg
				})
			}else if(annexPath&&(annexType =='110'||annexType =='302')){
				VRArr.push({
					isShow:false,
					image1:annexPath+aliaOss,
					image:defaultImg
				})
			}else if(annexPath){
				imgArr.push({
					isShow:false,
					image1:annexPath+aliaOss,
					image:defaultImg
				})
			}
		})
		
		//只取1张mp4图片 和1张VR图片
		if (mp4Arr.length > 1) {
		  mp4Arr.splice(1, mp4Arr.length);
		}
		if (VRArr.length > 1) {
		  VRArr.splice(1, VRArr.length);
		}
		
		//VR是外部链接，微信小程序无法配置域名
		// #ifndef H5
		   VRArr=[];
		// #endif
		// 先加载前三张图片，其余的稍后加载（由于图片数目较多）
		let imgList = [...mp4Arr, ...VRArr, ...imgArr];
		imgList.forEach((item, index) => {
		  if (index < 3) {
		    item.image = item.image1;
			 item.isShow =true;
		  }
		})
		this.imgList = imgList;
		//统计视频 VR 图片的数目和位置
		this.mp4Num = mp4Arr.length;
		this.mp4Start = 0;
		this.VRNum = VRArr.length;
		this.VRStart = this.mp4Num > 0 ? this.mp4Num : 0;
		this.ImgNum = imgArr.length;
		this.ImgStart = (this.mp4Num > 0 || this.VRNum > 0) ? this.mp4Num + this.VRNum : 0;
	},
	//轮播图切换
	doSwiperChange (index) {
	  this.activeNo = index < 0 ? 1 : index;
	  let { imgList } = this, len = imgList.length;
	  let lastItem = imgList[len - 1];
	  if(lastItem&&!lastItem.isShow){
		  this.loadImg(index + 1, 3);
	  }
	  // console.log(9999,index)
	},
	// 滑动时加载后面的img
	loadImg (start, num) {
		console.log(77777,start,num)
	  let { imgList } = this, len = imgList.length;
	  let i = start, total = start + num;
	  for (let i = start; i < total; i++) {
	    if (i > len - 1) {
	      break;
	    } else {
	      imgList[i].image = imgList[i].image1;
		   imgList[i].isShow =true;
	    }
	
	  }
	},
	
	//MP4 vr img之间的切换
	changeSwiperImg (no) {
	  this.activeNo = no;
	},
	
	//跳转 MP4或者图片区域
	toMp4OrImg (type) {
		let routeParams={buildingId:this.buildingId,userId:this.userId,NetworkType:this.NetworkType}
		if(type==='img'){//楼盘相册
			this.goWebView('/housePhoto')
		}else{
			this.goWebView('/videoPlayer')
		}	
	},
	
	//地图
	toMap () {
		let routeParams={buildingId:this.buildingId,userId:this.userId};
		this.goWebView('/peripheral',routeParams)
	},
	//查看详情
	goBuildingDetailMore () {
		let routeParams={buildingId:this.buildingId,userId:this.userId};
		this.goWebView('/moreBuildDetail',routeParams)
	},
	//去webview
	goWebView(routeName,routeParams,toPath){
		let mWebSite = this.$tool.getOtherWebSite();//获取跳转域名
		let pathParams='';//获取路由参数
		routeParams=routeParams||{};
		Object.keys(routeParams).forEach(keyStr=>{
			pathParams+=`${keyStr}=${routeParams[keyStr]}`				})
		if( this.$cache.getCache('toMWebpath')){
			this.$cache.removeCache('toMWebpath');
		}
		this.$cache.setCache('toMWebpath',{
			toMWebpath:toPath||`${mWebSite}#${routeName}?${pathParams}`
		})
		uni.navigateTo({
		  url: '/pagesHouse/webView/webView'
		});
	},	
	  
	//参考总价
	doFormatTotalPrice(min,max){ //总价格式化
	  if(min==null && max==null){
	    return '待定'
	  }else{
	      if(min==null){
	          return `${max}万元`
	      }else if(max==null){
	          return `${min}万元`
	      }else{
	          return `${min}-${max}万元`
	      }
	  }
	},
	doFormatArea(min,max){ //建面格式化
	  if(min==null && max==null){
	    return '待定'
	  }else{
	      if(min==null){
	          return `约${max}㎡`
	      }else if(max==null){
	          return `约${min}㎡`
	      }else{
	          return `${min}-${max}㎡`
	      }
	  }
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
	}
  }
  
}
</script>

<style lang="scss" scoped>
.building-info {
  width: 100%; 
  // background-color: #999999;
   //轮播
    .luobo {
      height: 690rpx;
      position: relative;
    }
    .luobo-container {
      box-sizing: border-box;
      width: 100%;
      height: 686rpx;
	  // border:1px solid red;
      // z-index:99;
      position: relative;
    }
    //轮播图加边框
    // .luobo-border {
    //   border: 6px solid transparent;
    //   background: #150F09;
    // }
    .luobo-imglist {
      width: 100%;
      height: 686rpx;
      .img1 {
        width: 100%;
        height: 686rpx;
      }
    }
    .luobo-text_top {
      width: 338rpx;
      height: 68rpx;
	  padding-left: 12rpx;
	  color: #FFFFFF;
	  background: #ff4e32;
	  border-radius: 0px 0px 30rpx 0px;
	  font-size: 30rpx;
	  font-weight: 500;
	  line-height: 68rpx;
	  text-align: left;
      position: absolute;
      top: 0;
      left: 0;
    }
    .luobo-text_bottom {
      height: 44rpx;
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 60rpx;
    }
  
    .luobo-text_span {
      width: 88rpx;
      height: 100%;
      margin-right: 16rpx;
      background-color: white;
	  color: #333333;
      border-radius: 10px;
      display: inline-block;
      font-size: 22rpx;
      line-height: 44rpx;
    }
    .spanColor {
      background-color: #4A6DDB;
      color: white;
    }
    .lunbo_img_num {
      min-width: 140rpx;
      line-height: 44rpx;
      background-color: #000000;
	  color: #FFFFFF;
      opacity: 0.6;
      font-size: 20rpx;
      text-align: left;
      padding-left: 14rpx;
      background-color: #000000;
      border-radius: 20rpx 0 0 20rpx;
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .img_num_t {
      margin-right: 10rpx;
    }
  
    // mp4 和VR播放按钮
    .luobo-type-flag {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      left: 50%;
      top: 133px;
      position: absolute;
      transform: translateX(-50%);
      background: url(https://m.tongcehaofang.com/img/sprint.png);
      background-size: 185px 201px;
    }
    .luobo-type-mp4 {
      background-position: 0px -273px;
    }
    .luobo-type-VR {
      background-position: 0 0;
    }	  
	//楼盘名称  标签
	.base-info{
		margin-top:40rpx;
	}
	
	// .baseInfo-flag1{
	// }
	
	.flag1-alias,.flag1-propertytypeAndstatus{
		display: inline-block;
	}
	.flag1-alias{
		font-size: 40rpx;
		min-width: 210rpx;
		height: 40px;
		padding-left: 30rpx;
		font-weight: 600;
		text-align: left;
		color: #222222;
	}
	.flag1-item{
		min-width: 62rpx;
		height: 32rpx;
		padding:0 8rpx;
		margin-right: 8rpx;
		font-size:22rpx;
		background: #ff8242;
		border-radius: 5rpx;
		text-align: center;
	}
	.flag1-propertytype{
		color:#FFFFFF;
		background: #4a6ddb;
		// border: 1px solid #9f7747;
		border-radius: 5rpx;
	}
	.baseInfo-flag2{
		// border:1px solid red;
		padding-left: 30rpx;
	}
	.flag2-tag{
		min-width: 84rpx;
		height: 32rpx;
		padding: 5rpx 10rpx;
		margin-right:20rpx;
		font-size: 20rpx;
		font-weight: 400;
		color: #141414;
		background: #f2f2f2;
		opacity: 0.5;
		border-radius: 4rpx;
	}
	
	.baseInfo-bright{
		// border: 1px solid red;
		width:100%;
		// height: 48rpx;
		padding-left: 30rpx;
		margin-top:36rpx;
		font-size: 24rpx;
		font-weight: 400;
		text-align: left;
		color: #827870;
		// background: #ffffff;
		opacity: 0.5;
		display: flex;
		align-items: center;
		.iconfont{
			width:28rpx;
			height: 23rpx;
			margin-right: 10rpx;
		}
	}
	.bright-icon{
		width:30rpx;
		height: 28rpx;
	}
	//参考总价 建筑面积
	.baseInfo-characteristic{
		// border:1px solid #ededed;
		margin:32rpx 0;
		padding: 0 32rpx;
		display: flex;
		.characteristic-item{
			flex:1;
		}
		.characteristic-text{
			font-size: 24rpx;
			font-weight: 400;
			color: #666666;
		}
		.characteristic-value{
			margin-top:10rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #141414;
		}
		.price-value{
			color: #ff714b;
		}
		
	}
	// 户型 开盘时间
	.baseInfo-other{
		// padding-left: 30rpx;
		width:690rpx;
		margin:0 auto;
		padding-top: 5rpx;
		font-size: 26rpx;
		font-weight: 400;
		color: #827870;
		border-top:1px solid #ededed;
		.other-area,.other-houseType{
			margin-top: 20rpx;
			display: flex;
		}
		.other-item{
			width: 50%;
		}
	}
	
	
	//地址
	.baseInfo-address{
		padding-left: 30rpx;
		margin-bottom: 40rpx;
		margin-top: 20rpx;
		font-size: 26rpx;
		font-weight: 400;
		text-align: left;
		color: #827870;
		position: relative;
		.iconfont{
			font-size: 32rpx;
			color: #4A6DDB;
			position: absolute;
			right:32rpx;
			top:5rpx;
		}
	}
	.baseInfo-address_text{
		max-width: 600rpx;
		display: flex;
		flex-wrap: wrap;
	}
	//查看详情
	.baseInfo-detail_btn{
		width: 690rpx;
		height: 68rpx;
		line-height: 68rpx;
		// border: 1px solid red;
		text-align: center;
		margin: 10rpx auto;
		background-color:#f1f5fd;
		color: #4a6ddb;
		font-size: 28rpx;
		font-weight: 500;
		
	}
	//更新时间
	.baseInfo-update{
		height:70rpx;
		line-height: 70rpx;
		padding-left: 32rpx;
		// padding-bottom: 30rpx;
		font-size: 22rpx;
		font-weight: 400;
		text-align: left;
		color: #999999;
	}
	
	//立即约车
	.baseInfo-req{
		width:100%;
		height: 130rpx;
		background-color: #999999;
		padding-top:10rpx;
		.img {
		  width: 100%;
		  height: 120rpx;
		}
	}
	
}
</style>
