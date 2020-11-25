<!-- 楼盘详情:户型 -->
<template>
  <view class="house-recommend">
    <title-info text="推荐楼盘"></title-info>
    <view class="recommend-list">
      <view class="recommend-item" v-for="(item,index) in recommendList" :key="index" @click="goBuildingDetail(item)">
        <view class="main-info">
          <view class="img-container">
            <image :src="item.albumCoverPicture?item.albumCoverPicture+'?x-oss-process=image/resize,h_85,w_105':'/static/pic_default_small@2x.png'" class="img" mode=""></image>
          </view>
          <view class="info-text">
            <view class="text text1">
              <text class="text1-h2">{{item.buildingAlias}}</text>
              <!-- 售状态1:待售 2:在售 3:售罄  4:在租 -->
              <text class="color-yellow">{{item.salesStatusLabel}}</text>
              <text class="color-blue">{{item.propertyTypeLabel}}</text>
            </view>
            <view class="text text2">
              <text class="text2-num"> {{$formatter.AveragePrice(item.referenceAveragePriceType,item.referenceAveragePrice)}}</text>
            </view>
            <view class="text text3">
              <text class="text3-item">{{$formatter.formatArea(item.referenceTotalPriceMin,item.referenceTotalPriceMax)}} </text>
              <text class="text3-item">{{$formatter.formatTotalPrice(item.referenceBuildAreaMin,item.referenceBuildAreaMax)}} </text>
            </view>
            <view class="text text4">
              <text class="color-gray text4-item" v-for="(item1,index1) in item.buildingTags" :key="index1">{{item1}}</text>
            </view>
          </view>
        </view>
        <view class="item-footer-text">
          <view class="footer-text">
            <text class="iconfont iconexemption_details"></text>
            <text class="text-tip">{{item.buildingBrightSpot}}</text>
          </view>

        </view>
      </view>
    </view>
  </view>
</template>

<script>
import titleInfo from './titleInfo.vue';
// import {getBuildingRecommend} from '@/request/api';
export default {
  props: {
    recommendList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    buildingId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // recommendList: []
    }
  },
  components: {
    titleInfo
  },

  methods: {

    //调换到楼盘详情
    goBuildingDetail (item) {
      uni.navigateTo({
        url: '../../pagesHouse/house/house?buildingId=' + item.id
      });
    }

  }
}
</script>

<style lang="scss" scoped>
.house-recommend {
  border-top: 10px solid #f4f8f8;
  width: 100%;
  padding: 42rpx 30rpx;
  padding-bottom: 0;
  background-color: #ffffff;
  .recommend-list {
    padding: 30rpx 0;
  }
  .recommend-item {
    margin-top: 30rpx;
    // height:85px;
    // border: 1px solid red;
    .main-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .img-container {
      width: 210rpx;
      height: 170rpx;
      border: 1px solid #ebebeb;
    }
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .info-text {
    .color-yellow {
      margin-left: 16rpx;
      padding: 0 2px;
      color: #ffffff;
      font-size: 20rpx;
      background-color: #ff8252;
    }
    .color-blue {
      margin-left: 10rpx;
      padding: 0 4rpx;
      color: #ffffff;
      font-size: 20rpx;
      background-color: #00a4ff;
    }
    .color-gray {
      background-color: #f0f4f4;
      padding: 1px 8rpx;
      color: #929292;
      font-size: 20rpx;
      border-radius: 8rpx;
      margin-right: 10rpx;
      display: inline-block;
    }
    padding-left: 20rpx;
    .text {
      // margin-bottom:10px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .text1-h2 {
      font-size: 32rpx;
      font-weight: 700;
      color: #282828;
    }
    .text2-num {
      color: #ff4750;
      font-size: 32rpx;
      font-weight: 700;
    }
    .text2-unit {
      margin-left: 10rpx;
      color: #ff4750;
      font-size: 20rpx;
    }
    .text3-item {
      font-size: 24rpx;
      margin-right: 20rpx;
    }
    .text4 {
      display: flex;
      flex-wrap: wrap;
    }
    .text4-item {
      background-color: #f1f9ff;
      padding: 4rpx 20rpx;
      margin-top: 10rpx;
    }
  }

  .item-footer-text {
    margin-top: 20rpx;
    height: 50rpx;
    .footer-text {
      height: 36rpx;
	  line-height: 36rpx;
      padding: 0rpx 20rpx;
      border-radius: 20rpx;
      font-size: 20rpx;
      background-color: #fff9f3;
      display: inline-block;
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      .iconexemption_details {
        color: #ff8252;
		font-size: 12px;
      }
      .text-tip {
        margin-left: 10rpx;
        height: 28rpx;
        padding: 0;
      }
    }
  }
}
</style>
