<template>
  <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 40rpx 32rpx 32rpx;">
    <view class="dt-text-size-32 dt-flex dt-flex-vertical-center" style="color: #333; font-weight: 500;">
      <view class="title-line"></view>
      <view>位置及周边配套</view>
    </view>
    
    <view class="map-container"></view>
    
    <view class="dt-bg-color-white" style="margin: 36rpx 0 26rpx;">
      <dt-tab :tabs="tabs" v-model="current" isScroll tab-class="dt-text-tab-class" tab-class-active="dt-text-tab-class dt-text-tab-active-class" line-style="display: none;" />
    </view>
    
    <view>
      <view class="dt-flex dt-flex-horizontal-between dt-flex-vertical-center" style="margin-bottom: 16rpx;">
        <view class="dt-text-size-26" style="color: #333;">徐盈路</view>
        <view class="dt-text-size-26" style="color: #666;">地铁17号线</view>
      </view>
      <view class="dt-flex dt-flex-horizontal-between dt-flex-vertical-center">
        <view class="dt-text-size-26" style="color: #333;">徐泾北城</view>
        <view class="dt-text-size-26" style="color: #666;">地铁17号线</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        current: 0,
        tabs: [
          { title: '地铁(2)' },
          { title: '公交(64)' },
          { title: '教育(11)' },
          { title: '医院(8)' },
          { title: '银行(15)' },
          { title: '购物(80)' },
        ],
      }
    },
    watch: {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .title-line {
    width: 4rpx;
    height: 26rpx;
    background-color: #4A6DDB;
    margin-right: 12rpx;
  }
  
  .map-container {
    width: 100%;
    height: 360rpx;
    background-color: #eee;
    border-radius: 10rpx;
    margin-top: 32rpx;
  }
  
  ::v-deep .room-tab-class {
  	font-size: 32rpx;
  	color: #666;
    margin-right: 48rpx;
    font-weight: 400;
    transition: all 300ms;
  }
  
  ::v-deep .room-tab-active-class {
  	color: #4A6DDB;
    font-weight: 500;
  }
</style>
