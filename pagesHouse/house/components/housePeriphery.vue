<!-- 楼盘详情:周边配套 -->
<template>
  <view class="house-periphery">
    <title-info text="周边配套"></title-info>
    <view class="map_container" @click="toMap">
	 <image class="img" :src="mapPicUrl" mode=""></image>
	 <!-- <view class="img" :style="{}"></view> -->
	  <view class="map-text" >
	  			<view class="map-text-aliasName">{{baseInfo.buildingAlias}}</view>
	  			<view class="map-text-img"></view>
	  </view>
	</view>
    <u-tabs :list="styleList" :is-scroll="true"
	 :current="current" @change="change" :show-bar="false"
	 active-color="#4a6ddb" inactive-color="#141414">
	</u-tabs>
    <view v-for="(item, index) in styleList[current].currentMess" :key="index">
      <view class="tab-facility">
        <view class="text-left">
          <text class="title">{{item.title }}</text>

          <text class="address">({{ item.address }})</text>
        </view>
        <view class="text-right">
          <text class="iconfont iconpoint_s1"></text>
          <text class="text-right_text">{{Math.round(distance(baseInfo.lat, baseInfo.lng, item.latitude, item.longitude))  }}米</text>
        </view>
      </view>
    </view>
    <view class="btn-chat" @click="toOtherPage">
      咨询配套和规划
    </view>
  </view>
</template>

<script>
import bmap from '../../../utils/bmap-wx.min.js';
import titleInfo from './titleInfo.vue';
export default {
  components: {
    titleInfo
  },
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
	// isIos:{
	// 	type: Boolean,
	// 	default: false
	// }
  },
  data () {
    return {
	  mapPicUrl:'',
	  isAndroid:false,
      markers: [],
      latitude: '',
      longitude: '',
      styleList: [
        {
          name: '公交',
          icon: 'iconicon_bus',
          currentMess: []
        },
        {
          name: '地铁',
          icon: 'iconicon_subway',
          currentMess: []
        },
        {
          name: '教育',
          icon: 'iconicon_education',
          currentMess: []
        },
        {
          name: '银行',
          icon: 'iconicon_bank',
          currentMess: []
        },
        {
          name: '医院',
          icon: 'iconicon_hospital',
          currentMess: []
        },
        {
          name: '购物',
          icon: 'iconicon_shop',
          currentMess: []
        },
        {
          name: '美食',
          icon: 'iconicon_food',
          currentMess: []
        },
        {
          name: '健身',
          icon: 'iconicon_fitness',
          currentMess: []
        }
      ],
      current: 0
    };
  },

 created () {
    const self = this;
    setTimeout(function () {
	  self.isAndroid = !self.isIos?true:false;
	  let ak ='onBnxFbt0v7s9fmhaEpgUktrhyK7duY0';
	  let lat = self.baseInfo.lat?(+self.baseInfo.lat).toFixed(2):'';
	  let lng = self.baseInfo.lng?(+self.baseInfo.lng).toFixed(2):'';
	 
	  self.mapPicUrl = `http://api.map.baidu.com/staticimage/v2?ak=${ak}&center=${lng},${lat}&zoom=11`;
	   console.log(lat,lng,self.mapPicUrl,'打印百度图片')
      self.search();
    }, 1500);
  },

  methods: {
    //咨询配套和规划
    toOtherPage () {
		this.toMap();
    },
    //跳转地图
    toMap () {
		let {baseInfo} =this;
		let routeParams={
			lng:baseInfo.lng,
			lat:baseInfo.lat,
			buildingAlias:baseInfo.buildingAlias,
			buildingUrl:baseInfo.buildingUrl,
		}
		this.goWebView('/peripheral',routeParams)
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
    change (index) {
      this.current = index;
    },
    distance (latA, lngA, latB, lngB) {
      if (latA * 1 && lngA * 1 && latB * 1 && lngB * 1) {
        var pk = 180 / 3.14169;
        var a1 = latA / pk,
          a2 = lngA / pk,
          b1 = latB / pk,
          b2 = lngB / pk;

        var t1 = Math.cos(a1) * Math.cos(a2) * Math.cos(b1) * Math.cos(b2);
        var t2 = Math.cos(a1) * Math.sin(a2) * Math.cos(b1) * Math.sin(b2);
        var t3 = Math.sin(a1) * Math.sin(b1);
        var tt = Math.acos(t1 + t2 + t3);

        return 6366000 * tt;
      }

      return 0;
    },
    unique (arr) {
      const res = new Map();
      return arr.filter(arr => !res.has(arr.address) && res.set(arr.address, 1));
    },
    search (e) {
      const self = this;
      const BMap = new bmap.BMapWX({
        ak: 'onBnxFbt0v7s9fmhaEpgUktrhyK7duY0'
      });
      let lat = self.baseInfo.lat;
      let lon = self.baseInfo.lng;
      let location = lat + ',' + lon;
      console.log(location, '最后的结果');
      BMap.search({
        query: '公交',
        location: location,
        success (res) {
          self.styleList[0].name = '公交' + '(' + res.originalData.total + ')';
          let data = res.wxMarkerData;
          self.styleList[0].currentMess = data.slice(0, 3);
        }
      });
      BMap.search({
        query: '地铁',
        location: location,
        success (res) {
          console.log(res, '地铁');
          self.styleList[1].name = '地铁' + '(' + res.originalData.total + ')';
          let data = res.wxMarkerData;
          self.styleList[1].currentMess = data.slice(0, 3);
        }
      });
      BMap.search({
        query: '教育',
        location: location,
        success (res) {
          console.log(res, '教育');
          self.styleList[2].name = '教育' + '(' + res.originalData.total + ')';
          let data = res.wxMarkerData;
          self.styleList[2].currentMess = data.slice(0, 3);
        }
      });
      BMap.search({
        query: '银行',
        location: location,
        success (res) {
          console.log(res, '银行');
          self.styleList[3].name = '银行' + '(' + res.originalData.total + ')';
          let data = res.wxMarkerData;
          self.styleList[3].currentMess = data.slice(0, 3);
        }
      });
      BMap.search({
        query: '医院',
        location: location,
        success (res) {
          console.log(res, '医院');
          self.styleList[4].name = '医院' + '(' + res.originalData.total + ')';
          let data = res.wxMarkerData;
          self.styleList[4].currentMess = data.slice(0, 3);
        }
      });
      BMap.search({
        query: '购物',
        location: location,
        success (res) {
          console.log(res, '购物');
          self.styleList[5].name = '购物' + '(' + res.originalData.total + ')';
          let data = res.wxMarkerData;
          self.styleList[5].currentMess = data.slice(0, 3);
        }
      });
      BMap.search({
        query: '美食',
        location: location,
        success (res) {
          console.log(res, '美食');
          self.styleList[6].name = '美食' + '(' + res.originalData.total + ')';
          let data = res.wxMarkerData;
          self.styleList[6].currentMess = data.slice(0, 3);
        }
      });
      BMap.search({
        query: '健身',
        location: location,
        success (res) {
          console.log(res, '健身');
          self.styleList[7].name = '健身' + '(' + res.originalData.total + ')';
          let data = res.wxMarkerData;
          self.styleList[7].currentMess = data.slice(0, 3);
        }
      });
    }
  },
  // created () { }
};
</script>

<style lang="scss" scoped>
.house-periphery {
  border-top: 10rpx solid #999999;
  width: 100%;
  padding: 40rpx 30rpx;
  .map_container {
    height: 400rpx;
    margin-top: 30px;
    position: relative;
	.img{
		width:100%;
		height: 100%;
	}
  }  
  .map-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .map-text-img {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    // background-image: url(../../static/Surrounding@2x.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .map-text-aliasName {
    display: inline-block;
    height: 50rpx;
    line-height: 50rpx;
    border-radius: 5rpx;
    background-color: #ffffff;
    padding: 0 20rpx;
    // margin-left:-30%;
    margin-bottom: 10rpx;
  }
}
.tab-facility {
  display: flex;
  padding-top: 30rpx;
  .text-left {
    width: 80%;
    text-align: left;
	color: #666666;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    .title {
      color: #141414;
    }
  }
  .text-right {
    width: 20%;
    color: #666666;
    font-size: 22rpx;
    text-align: right;

    .iconfont {
      font-size: 20rpx;
      vertical-align: middle;
      padding-right: 8rpx;
    }
	.text-right_text{
		color: #666666;
	}
  }
}
.btn-chat {
  height: 68rpx;
  line-height: 68rpx;
  text-align: center;
  margin-top: 30rpx;
  background-color:#f1f5fd;
  color: #4a6ddb;
  font-size: 28rpx;
  // font-weight: 600;
}
</style>
