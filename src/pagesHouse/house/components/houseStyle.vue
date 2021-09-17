<!-- 楼盘详情:户型 -->
<template>
  <view class="house-style">
    <title-info :text="titleText" :btnRightInfo="btnRightInfo"></title-info>
    <view class="tabs">
      <text :class="{'tab-item':true,active:index==activeIndex}" v-for="(item,index) in houseTabs" :key="index" @click="doTabChange(item,index)"> {{`${item.bedroomName}(${item.count})`}} </text>
    </view>
    <view class="list houseStyleMess">
      <view class="houseStyleMess_all" v-for="(item,index) in styleList" :key="index" @click="toHouseStyleDetail(item)">
        <view class="houseStyleMess_imgDiv">
          <image class="houseStyleMess_img" :src="item.annexPath?item.annexPath :'/static/pic_default_small@2x.png'" mode=""></image>
          <view class="houseStyleMess_imgDivBottom">{{item.houseTypeName}}</view>
        </view>
        <view>
          <text class="houseStyleMess_style">{{item.houseType||'-'}}</text>
          <!-- (1:待售 2:在售 3:售罄) -->
          <text class="houseStyleMess_spans " v-if="item.salesStatus=='1'">待售</text>
          <text class="houseStyleMess_spans " v-else-if="item.salesStatus=='2'">在售</text>
          <text class="houseStyleMess_spans " v-else-if="item.salesStatus=='3'">售罄</text>
        </view>
        <view class="houseStyleMess_area">
          <text>建面约{{item.constructionArea}}㎡</text>
          <text class="houseStyleMess_area_span">{{item.orientedLabel?'朝向 '+item.orientedLabel:''}}</text>
        </view>
        <view class="houseStyleMess_price">{{item.totalPrice?'总价约'+item.totalPrice+'万':''}}</view>

        <view class="houBtn" @click.stop="toOtherPage()">
          咨询首付和贷款
        </view>
      </view>

    </view>

  </view>
</template>

<script>
import titleInfo from './titleInfo.vue'
import { getBuildingTypeCount, getBuildingTypeList } from '@/request/api'
export default {
  props: {
    buildingId: {
      type: String,
      default: '',
    },
    userId: {
      type: String,
      default: '',
    },
    houseTabs: {
      type: Array,
      default: () => {
        return []
      },
    },
    totalHouseStyleList: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      titleText: '户型介绍',
      btnType: 'houseStyle', //户型
      activeIndex: 0,
      styleList: [], //平面图
      //更多操作
      btnRightInfo: {
        text: '全部户型',
        routePath: '',
        routeParams: '',
      },
    }
  },
  components: {
    titleInfo,
  },

  mounted(option) {
    this.styleList = this.totalHouseStyleList.slice(0)
    this.changeBtnRightInfo()
  },
  methods: {
    //全部户型
    changeBtnRightInfo() {
      let { btnRightInfo } = this
      btnRightInfo.routePath = '/houseTypeList'
      btnRightInfo.routeParams = JSON.stringify({
        buildingId: this.buildingId,
        userId: this.userId,
      })
    },
    //咨询首付和贷款
    toOtherPage(item) {
      this.$emit('makePhone')
    },
    //去webview
    goWebView(routeName, routeParams, toPath) {
      let mWebSite = this.$tool.getOtherWebSite() //获取跳转域名
      let pathParams = '' //获取路由参数
      routeParams = routeParams || {}
      Object.keys(routeParams).forEach((keyStr) => {
        pathParams += `${keyStr}=${routeParams[keyStr]}`
      })
      if (this.$cache.getCache('toMWebpath')) {
        this.$cache.removeCache('toMWebpath')
      }
      this.$cache.setCache('toMWebpath', {
        toMWebpath:
          toPath ||
          `${mWebSite}#${routeName}?buildingId=${buildingId}&userId=${userId}&NetworkType=${NetworkType}`,
      })
      uni.navigateTo({
        url: '/pagesHouse/webView/webView',
      })
    },
    //户型切换
    doTabChange(item, index) {
      if (index == 0) {
        this.styleList = this.totalHouseStyleList.slice(0)
        return
      }
      let bedroom = item.bedroom
      this.activeIndex = index
      this.styleList = this.totalHouseStyleList.filter((item1) => {
        return item1.bedroom == bedroom
      })
    },
    // 户型详情
    toHouseStyleDetail(item) {
      let obj = {
        buildingId: this.buildingId,
        houseTypeId: item.houseTypeId,
        userId: this.userId,
      }
      this.goWebView('/houseTypeDetails', obj)
    },
    //去webview
    goWebView(routeName, routeParams, toPath) {
      let mWebSite = this.$tool.getOtherWebSite() //获取跳转域名
      let pathParams = '' //获取路由参数
      routeParams = routeParams || {}
      Object.keys(routeParams).forEach((keyStr, index) => {
        pathParams +=
          index > 0
            ? `&${keyStr}=${routeParams[keyStr]}`
            : `${keyStr}=${routeParams[keyStr]}`
      })
      if (this.$cache.getCache('toMWebpath')) {
        this.$cache.removeCache('toMWebpath')
      }
      this.$cache.setCache('toMWebpath', {
        toMWebpath: toPath || `${mWebSite}#${routeName}?${pathParams}`,
      })
      uni.navigateTo({
        url: '/pagesHouse/webView/webView',
      })
    },
    //销售类型转换
    salesStatusFlag(value) {
      let set = {
        1: '待售',
        2: '在售',
        3: '售罄',
        4: '在租',
      }
      return set.hasOwnProperty(value) ? set[value] : value
    },
  },
}
</script>

<style lang="scss" scoped>
.house-style {
  width: 100%;
  // height:300px;
  border-top: 10rpx solid #999999;
  padding: 40rpx 30rpx;
  padding-bottom: 20rpx;
  .tabs {
    margin-top: 50rpx;
    overflow-y: auto;
    white-space: nowrap;
  }
  .tab-item {
    font-size: 32rpx;
    color: #999999;
    margin-right: 28rpx;
  }
  .active {
    color: #4a6ddb !important;
  }

  .btn {
    width: 100%;
    height: 68rpx;
    margin: 30rpx 0;
    background-color: #f4f8f8;
    color: #00a4ff;
    font-size: 28rpx;
    font-weight: 600;
  }
  ::v-deep .btn:after {
    border: 0;
  }
  .houseStyleMess {
    margin-top: 40rpx;
    display: flex;
    width: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    margin-bottom: 10rpx;
    height: 620rpx;
  }
  .houseStyleMess_all {
    float: left;
    margin-right: 26rpx;
    display: inline-block;
    min-width: 404rpx;
  }

  .houseStyleMess_imgDiv {
    // border:1rpx solid #ebebeb;
    width: 400rpx;
    position: relative;
  }
  .houseStyleMess_img {
    width: 404rpx;
    height: 332rpx;
    margin-bottom: 18rpx;
  }
  .houseStyleMess_imgDivBottom {
    position: absolute;
    width: 100%;
    height: 56rpx;
    bottom: 28rpx;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    text-align: center;
    line-height: 56rpx;
    font-size: 24rpx;
  }
  .houseStyleMess_style {
    font-size: 30rpx;
    color: #141414;
    font-weight: 700;
  }
  .houseStyleMess_spans {
    color: white;
    border-radius: 4rpx;
    background-color: #ff8242;
    display: inline-block;
    text-align: center;
    margin-left: 10rpx;
    padding: 2rpx 8rpx;
    font-size: 20rpx;
  }
  .bg-color-red2 {
    background-color: #ff8242;
  }
  .bg-color-green2 {
    background-color: #00a4ff;
  }
  .bg-color-gray2 {
    background-color: #c1c1c1;
  }
  .houseStyleMess_area {
    margin: 16rpx 0 20rpx 0;
    color: #827870;
    font-size: 26rpx;
  }
  .houseStyleMess_area_span {
    margin-left: 10rpx;
  }
  .houseStyleMess_price {
    height: 40rpx;
    color: #ff4e32;
    font-size: 30rpx;
    font-weight: 700;
    margin-bottom: 30rpx;
  }
  .houBtn {
    height: 68rpx;
    line-height: 68rpx;
    font-size: 28rpx;
    background-color: #f1f5fd;
    color: #4a6ddb;
    display: block;
    text-align: center;
  }
}
</style>
