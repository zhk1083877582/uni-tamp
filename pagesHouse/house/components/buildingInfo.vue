<!-- 楼盘详情:轮播图和基本信息 -->
<template>
  <view class="building-info">
    <view class="luobo">
      <!-- 轮播图片 -->
      <view :class="{'luobo-container':true,'luobo-border':baseInfo.favourTitle}">
        <view class="luobo-imglist" v-if="imgList.length>0">
          <u-swiper :list="imgList" :current="activeNo" height="686" duration="0" :circular="false" :autoplay="false" mode="none" @change="doSwiperChange" @click="toMp4OrImg('img')"></u-swiper>
        </view>
		<view class="luobo-imglist" v-else>
			<image class="img1" :src="defaultImg" mode=""></image>
		</view>
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
        <!-- mp4和VR 播放按钮 -->
        <view v-if="mp4Num>0&&activeNo<VRStart" class="luobo-type-flag luobo-type-mp4" @click="toMp4OrImg"></view>
        <view v-if="VRNum>0&&activeNo>=VRStart&&activeNo<ImgStart" class="luobo-type-flag luobo-type-VR" @click="toMp4OrImg"></view>
        <!-- <view class="luobo-type-flag"  @click="toMp4OrImg" v-if="activeNo<otherNum"
					:class="{'luobo-type-mp4':activeNo<(mp4No+1),'luobo-type-VR':activeNo>mp4No}">
				</view> -->
        <div class="luobo-text_top" v-if="baseInfo.favourTitle">{{baseInfo.favourTitle}}</div>
      </view>
      <!-- 价格区域 -->
      <view :class="['building-price',baseInfo.favourTitle?'building-price-active':'building-price-unactive']">
        <view class="building_price_text">
          <text class="building_price_mess">参考均价</text>
          <view class="ml3">
            <text class="building_price_num"> {{$formatter.AveragePrice(baseInfo.referenceAveragePriceType,baseInfo.referenceAveragePrice)}} </text>
          </view>
        </view>
      </view>
    </view>
    <view class="baseMess">
      <view class="baseMess-info1">
        <view class="baseMess_spanDiv clearfloat">
          <view class="baseMess_span1">{{baseInfo.buildingAlias}}</view>
          <view class="baseMess_rightspan">
            <text class="baseMess_span2 color-yellow f1">{{getSalesStatus(baseInfo.salesStatus)}}</text>
            <text class="baseMess_span2 color-blue f1" v-for="(item,index) in baseInfo.propertyTypeList" :key="index">
              {{item}}
            </text>
          </view>
        </view>
      </view>
      <view class="baseMess_spanDiv1 " v-if="baseInfo.buildingTag">
        <view class="spanList color-gray" v-for="(item,index) in baseInfo.buildingTaglabel" :key="index">{{item}}</view>
      </view>
      <view class="baseMess_spanMess">
        <image class="spanMessStar" src="./../../static/diamond@2x.png" mode=""></image>
        <text class="spanMessIntroduce">{{baseInfo.buildingBrightSpot}}</text>
      </view>
      <view class="baseMess_house">
        <view class="baseMess_house_item">
          <text class="houseSpan">参考总价: {{$formatter.formatTotalPrice1(baseInfo.referenceTotalPriceMin,baseInfo.referenceTotalPriceMax)}} </text>
          <text class="houseSpan1">建筑面积: {{$formatter.formatArea1(baseInfo.referenceBuildAreaMin,baseInfo.referenceBuildAreaMax)}} </text>
        </view>
        <view class="baseMess_house_item">
          <text class="houseSpan">在售户型: {{baseInfo.houseType?baseInfo.houseType+'室':'待定'}} </text>
          <text class="houseSpan1">开盘时间: {{baseInfo.openTime||'开盘待定'}} </text>
        </view>
      </view>
      <view class="detail-btn" @click="goBuildingDetailMore">
        查看详情
      </view>
      <view class="baseMess_footer">
        <view>{{baseInfo.detailAddress}}</view>
        <!-- 链接加 经纬度 -->
        <!-- <img class="footerImg" src="./../../static/detail_map@2x.png" alt="地图" lng="121.539" lat="31.263" onclick="urlPush('map')" /> -->
        <image class="footerImg" src="../../static/detail_map@2x.png" mode="" @click="toMap"></image>
      </view>
    </view>
    <view class="time-update">
      本楼盘消息更新于{{baseInfo.updateTime}}
    </view>
    <view class="building-footImg">
      <image class="img" v-if="!callCarMobile" src="../../static/info-req.png" mode=""></image>
      <image class="img" @click="chatTell({phone:callCarMobile})" v-else src="../../static/make_appointment.png" mode=""></image>
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
    baseAnnexs: {
      type: Object,
      default: () => {
        return {}
      }
    },
    buildingId: {
      type: String,
      default: ''
    },
    callCarMobile: {
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
  mounted(){
	const self = this;
	setTimeout(()=>{
		if(self.imgList.length===0){
			self.doSortImg(self.baseAnnexs);
		}
	},1500)
  },
  watch: {
    'baseAnnexs': {
      handler (newVal) {
        // console.log(2222,newVal)
        this.doSortImg(newVal);
      },
      deep: true
    }
  },
  methods: {
    // 对返回的图片进行整理
    doSortImg (annexs) {
      /**
       * 附件类型(101:效果图 102:样板间 103:环境规划图 104:配套实景图 105:楼盘实景图 106:楼栋分布图 107:户型 108:预售证
       * 109:视频,110:楼盘VR, 113:首屏周边, 114:楼盘介绍, 115:楼盘logo, 116:pc封面图
       * 201:预售证管理附件,301:户型图,302户型VR,112:发现主题,304:测评图,305:样板间)
       */
	  if(Object.keys(annexs).length===0){
		return 
	  }
      let aliaOss = '?x-oss-process=image/resize,h_750,w_750';//图片阿里标识
      //mp4
      let mp4Arr = [], arr109 = annexs['109'] || [];
      arr109.forEach(item => {
        if (item.annexPath) {
          item.image1 = item.smallAnnexPath + aliaOss;
          mp4Arr.push(item);
        }
      })
      // console.log(8888,mp4Arr.length);
      if (mp4Arr.length > 1) {
        mp4Arr.splice(1, mp4Arr.length);
      }
      //VR
	   
      let VRArr = [], arr110 = annexs['110'] || [], arr302 = annexs['302'] || [];
      arr110.forEach(item => {
        if (item.annexPath) {
          item.image1 = item.smallAnnexPath + aliaOss;
          VRArr.push(item);
        }
      });
      arr302.forEach(item => {
        if (item.annexPath) {
			item.image1 = item.annexPath + aliaOss;
          // item.annexPath += aliaOss;
          VRArr.push(item);
        }
      });
      if (VRArr.length > 1) {
        VRArr.splice(1, VRArr.length);
      }
	   // #ifndef H5
	     VRArr=[];
	  // #endif
      // console.log('VRArr',VRArr);
      delete annexs['110'];
      delete annexs['109'];
      delete annexs['302'];
	  
	   	
      // console.log('newAnnexs',annexs);
      let imgArr = [], newAnnexs = annexs || [];
      for (let key in annexs) {
        let item = annexs[key];
        if (item.length) {
          item.forEach(item1 => {
            if (item1.annexPath) {
              item1.image1 = item1.annexPath ? item1.annexPath + aliaOss : '/static/pic_default_small@2x.png';
              imgArr.push(item1);
            }
          })
        }
      }
      // console.log('imgArr',imgArr)
      let imgList = [...mp4Arr, ...VRArr, ...imgArr];
      //提前加载前三张图片
      imgList.forEach((item, index) => {
        if (index < 3) {
          item.image = item.image1;
        } else {
          item.image = '';
        }

      })
      this.imgList = imgList;

      // this.loadImg(0,3)
      this.mp4Num = mp4Arr.length;
      this.mp4Start = 0;
      this.VRNum = VRArr.length;
      this.VRStart = this.mp4Num > 0 ? this.mp4Num : 0;
      this.ImgNum = imgArr.length;
      this.ImgStart = (this.mp4Num > 0 || this.VRNum > 0) ? this.mp4Num + this.VRNum : 0;


    },
    //轮播图切换
    doSwiperChange (index) {
      // console.log(999,index)
      this.activeNo = index < 0 ? 1 : index;
      let { imgList } = this, len = imgList.length;
      // if (imgList[len - 1].image1 == imgList[len - 1].image) {
      //   return
      // }
	  let lastItem = imgList[len - 1];
	  console.log('lastItem',lastItem);
	  if(lastItem&&lastItem.image1 != lastItem.image){
		  this.loadImg(index + 1, 3);
	  }
      // console.log(9999,index)
    },
    // 加载img
    loadImg (start, num) {
      let { imgList } = this, len = imgList.length;
      let i = start, total = start + num;
      for (let i = start; i < total; i++) {
        if (i > len - 1) {
          break;
        } else {
          imgList[i].image = imgList[i].image1;
        }

      }
    },
    //图片之间切换
    changeSwiperImg (no) {
      this.activeNo = no;
    },
    getSalesStatus (salesStatus) {
      // salesStatus:销售状态(1:待售 2:在售 3:售罄  4:在租)
      let label = '';
      switch (salesStatus) {
        case '1':
          label = '待售';
          break;
        case '2':
          label = '在售';
          break;
        case '3':
          label = '售罄';
          break;
        case '4':
          label = '在租';
          break;
      }
      return label
    },

    //跳转 MP4或者图片区域
    toMp4OrImg () {
      // activeNo:0,//当前轮播的是第几张图片
      // mp4Start:0,//mp4
      // mp4Num:0,
      // VRStart:0,
      // VRNum:0,
      // ImgStart:0,
      // ImgNum:0,
      let { activeNo, mp4Start, mp4Num, VRStart, VRNum, ImgStart, ImgNum, NetworkType, buildingId, imgList } = this;
      let url = '';
      if (mp4Num > 0 && activeNo < VRStart) {//视频
        let path = this.$tool.returnWebviewconfigUrl('videoPlayback');
		    console.log(path,'videoPlaybackPath')
        url = '../webView/webView?toMWebpath='+ path +'&fromAppName=xcx&buildingId=' + buildingId + '&NetworkType=' + NetworkType;
      } else if (VRNum > 0 && activeNo >= VRStart && activeNo < ImgStart) {//VR
        // https://www.123kanfang.com/houseClient/?hid=tongce_90c229bb-dd07-4e07-9dc9-8f3cbff66954"
        let item = imgList[activeNo];
        this.$cache.setCache('urlVR', item.annexPath);
        url = '../VR/index';
      } else {
      let path = this.$tool.returnWebviewconfigUrl('propertyAlbum');
		  console.log(path,'propertyAlbumPath')
        url = '../webView/webView?toMWebpath='+ path + buildingId + '&fromAppName=xcx' + '&NetworkType=' + NetworkType;
      }
      // return 
      uni.navigateTo({
        url: url
      });
    },
    //跳转地图
    toMap () {
		  let path = this.$tool.returnWebviewconfigUrl('peripheralSupporting');
		  console.log(path,'pathpathpath')
      let { baseInfo } = this;
      uni.navigateTo({
        url: '../webView/webView?toMWebpath='+ path + baseInfo.lng + '-' + baseInfo.lat + '&buildingName=' + baseInfo.buildingAlias + '&buildingUrl=' + baseInfo.detailAddress
        // url:`../webView/webView?toMWebpath=housePhoto/1141`
      });
    },

    //查看详情
    goBuildingDetailMore () {
      // console.log(this.buildingId)
      uni.navigateTo({
        url: '../moreBuildDetail/index?buildingId=' + this.buildingId
      });
    },
    //打电话
    chatTell (data) {
      let { phone } = data;
      let params = {
          phone,
          source: 17,
          buildingId: this.buildingId,
      }
      // #ifdef MP-BAIDU
       params.source = 20;
      // #endif
	  // #ifdef MP-TOUTIAO
	  params.source = 23
	  // #endif
      if (this.$tool.getToken()) {
        getData("/tospurWeb/api/capp/v1/user/getUserPhone",params)
          .then(res => {
            console.log("登录");
            console.log(res);
            uni.makePhoneCall({
              phoneNumber: res.mobile
            });
          })
          .catch(err => {
            console.log("请求结果报错", err);
          });
      } else {
        console.log('没登录')
        getData("/tospurWeb/capp/v2/user/getUserPhone", params)
          .then(res => {
            uni.makePhoneCall({
              phoneNumber: res.mobile
            });

          })
          .catch(err => {
            console.log("请求结果报错", err);
          });
      }
    }
  },
  created () {
    let that = this
    uni.getNetworkType({
      success: function (res) {
        console.log(res.networkType, 'networkTypenetworkType');
        that.NetworkType = res.networkType
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.building-info {
  width: 100%;
  background: #ffffff;
  //轮播

  .luobo {
    height: 750rpx;
    position: relative;
  }
  .luobo-container {
    box-sizing: border-box;
    width: 100%;
    height: 686rpx;
    // z-index:99;
    position: relative;
  }
  //轮播图加边框
  .luobo-border {
    border: 6px solid transparent;
    background: linear-gradient(
      100deg,
      rgb(254, 113, 30) 100%,
      rgb(255, 79, 13) 100%
    );
  }
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
    background: #fe711e;
    border-radius: 0px 0px 40rpx 0px;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 32rpx;
    font-weight: 700;
    line-height: 68rpx;
    color: #ffffff;
    text-align: center;
    // z-index: 10;
  }
  .luobo-text_bottom {
    height: 44rpx;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 72rpx;
  }

  .luobo-text_span {
    width: 88rpx;
    height: 100%;
    margin-right: 16rpx;
    background-color: white;
    border-radius: 10px;
    display: inline-block;
    font-size: 22rpx;
    line-height: 44rpx;
  }
  .spanColor {
    background-color: #00a4ff;
    color: white;
  }
  .lunbo_img_num {
    width: 130rpx;
    line-height: 44rpx;
    color: #ffffff;
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

  //====================基本信息
  //楼盘价格
  .building-price {
    height: 104rpx;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .building-price-active {
    background-image: url(../../static/basePriceActive.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .building-price-unactive {
    background-image: url(./../../static/basePrice@2x.png);
    background-repeat: no-repeat;
    background-size: cover;
  }
  .building_price_img {
    width: 100%;
    height: 100%;
  }
  .building_price_text {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .building_price_mess {
    display: inline-block;
    color: #a9a8ae;
    font-size: 24rpx;
    margin: 20rpx 0 0 30rpx;
  }
  .building_price_num {
    font-size: 48rpx;
    font-weight: 600;
    color: #f12224;
    margin-left: 30rpx;
  }

  //基本信息
  .baseMess {
    width: 100%;
    /* height: 264px; */
    padding: 20rpx 30rpx;
    padding-bottom: 0;
    position: relative;
    box-sizing: border-box;
  }
  .baseMess-info1 {
    margin: 28rpx 0;
    // padding-bottom: 40rpx;
  }
  .baseMess_spanDiv {
    //   display: flex;
    // flex-wrap: nowrap;
    //   justify-content: flex-start;
  }
  .baseMess_rightspan {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .color-yellow {
    background-color: #ff8252;
  }
  .color-blue {
    background-color: #00a4ff;
  }
  .color-gray {
    background-color: #f1f9ff;
    padding: 4rpx 6rpx;
    color: #929292;
    font-size: 24rpx;
    border-radius: 8rpx;
    margin-right: 6rpx;
    margin-bottom: 6rpx;
    display: inline-block;
  }
  .baseMess_span1 {
    color: #3d3e3f;
    font-size: 40rpx;
    float: left;
    margin-right: 10rpx;
  }
  .baseMess_span2 {
    display: inline-block;
    width: 80rpx;
    height: 32rpx;
    line-height: 32rpx;
    border-radius: 2px;
    padding: 0px 12rpx;
    font-size: 20rpx;
    color: #ffffff;
    margin-right: 4rpx;
    margin-top: 8rpx;
    text-align: center;
  }
  .fl {
    float: left;
  }

  .baseMess_spanDiv1 {
    margin: 20rpx 0 10rpx 0;
    font-size: 10px;
    // display: flex;
    .spanList {
      display: inline-block;
      padding: 4rpx 14rpx;
    }
  }
  .baseMess_spanMess {
    padding-bottom: 36rpx;
    margin-bottom: 10rpx;
    font-size: 12px;
    border-bottom: 1px solid #efefef;
  }
  .spanMessStar {
    width: 26rpx;
    height: 22rpx;
    margin-right: 10rpx;
    vertical-align: middle;
  }
  .spanMessIntroduce {
    color: #6d6d6d;
    font-size: 24rpx;
  }

  .baseMess_house {
    width: 100%;
    .baseMess_house_item {
      width: 100%;
      display: flex;
      justify-content: flex-start;
    }
    .houseSpan,
    .houseSpan1 {
      display: inline-block;
      color: #6d6d6d;
      font-size: 26rpx;
      margin-bottom: 20rpx;
      font-weight: 400;
    }
    .houseSpan {
      // border: 1px solid red;
      width: 55%;
    }
    .houseSpan1 {
      width: 45%;
    }
  }
  .detail-btn {
    width: 100%;
    height: 68rpx;
    line-height: 68rpx;
    text-align: center;
    margin: 30rpx 0;
    background-color: #f1f9ff;
    // border:1px solid #F4F8F8;
    color: #00a4ff;
    font-size: 28rpx;
    font-weight: 600;
  }
  /deep/.detail-btn:after {
    border: 0;
  }

  .baseMess_footer {
    margin: 30rpx 0;
    color: #6d6d6d;
    font-size: 26rpx;
    // border:1px solid red;
    position: relative;
    .footerImg {
      position: absolute;
      width: 64rpx;
      height: 44rpx;
      right: 40rpx;
      bottom: 0rpx;
    }
  }

  .building-footImg {
    // padding: 20rpx 0;
    // padding-bottom: 20rpx;
    background-color: #f4f8f8;
    .img {
      width: 100%;
      height: 120rpx;
    }
  }

  .time-update {
    height: 60rpx;
    line-height: 60rpx;
    text-align: center;
    font-size: 10px;
    color: #6d6d6d;
    background-color: #f4f8f8;
  }
}
</style>
