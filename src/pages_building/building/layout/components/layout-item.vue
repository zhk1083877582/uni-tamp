<template>
  <view class="layout-item">
    <view class="image"></view>
    
    <view class="dt-flex-1">
      <view class="dt-flex dt-flex-horizontal-between dt-flex-vertical-center">
        <view class="dt-text-size-30" style="color: #333;">{{ info.title }}</view>
        <view v-if="info.status == '1'" class="tag" style="background-color: #4A6DDB;">在售</view>
        <view v-if="info.status == '2'" class="tag" style="background-color: #FF8242;">待售</view>
        <view v-if="info.status == '3'" class="tag" style="background-color: #BBBBBB;">售罄</view>
      </view>
      
      <view style="margin-top: 2rpx;">
        <view class="info">
          <text>建面{{ info.area }}㎡</text>
          <text>
            <text style="color: #EDEDED; margin-right: 16rpx;">|</text>
            <text>朝向{{ info.orientation }}</text>
            <!-- <text>层高{{ info.floor }}m</text> -->
          </text>
        </view>
        <!-- <view class="info">
          <text>开间5m</text>
          <text>
            <text style="color: #EDEDED; margin-right: 16rpx;">|</text>
            <text>允许搭建二层</text>
          </text>
        </view> -->
      </view>
      
      <view class="dt-flex dt-flex-vertical-center" style="margin: 6rpx 0;">
        <text style="font-size: 22rpx; color: #999; margin-right: 6rpx;">约</text>
        <text style="font-size: 30rpx; color: #F75736;">{{ info.price }}万/套</text>
      </view>
      
      <view class="dt-flex">
        <view v-for="(item, index) in info.tags" class="tag" style="color: #666; background-color: #F6F6F8; margin-right: 8rpx;">
          {{ item }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {},
    props: {
      info: Object
    },
    data() {
      return {}
    },
    watch: {},
    onLoad(opt) {},
    onShareAppMessage(opt) {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .layout-item {
    padding: 40rpx 0;
    border-bottom: 1px solid #EEEEEE;
    display: flex;
  }
  
  .image {
    width: 216rpx;
    height: 162rpx;
    background-color: #F6F6F8;
    border-radius: 8rpx;
    margin-right: 30rpx;
  }
  
  .tag {
    padding: 0 6rpx;
    height: 32rpx;
    line-height: 32rpx;
    font-size: 20rpx;
    color: #fff;
    border-radius: 4rpx;
  }
  
  .info {
    font-size: 24rpx;
    color: #666;
    > * {
      margin-right: 16rpx;
    }
  }
</style>
