<template>
  <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 36rpx 32rpx 30rpx;">
    <view class="dt-flex dt-flex-vertical-center">
      <view class="dt-text-size-40" style="color: #333; font-weight: 500; margin-right: 24rpx;">万科天空之城</view>
      <view class="tag">待售</view>
    </view>
    
    <view class="dt-text-size-28" style="color: #999999; margin-top: 14rpx;">
      <text>万科新产品系  健康的未来之城</text>
    </view>
    
    <view class="dt-flex dt-flex-horizontal-between dt-line-b" style="padding: 28rpx 0 24rpx;">
      <view>
        <view class="dt-text-size-32" style="color: #333; font-weight: 500;">2/3/4室</view>
        <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">参考户型</view>
      </view>
      <view>
        <view class="dt-text-size-32 dt-flex dt-flex-vertical-center">
          <text class="dt-text-size-24" style="color: #999; margin-right: 6rpx;">约</text>
          <text style="font-weight: 500;">439.5-714.9万/套</text>
        </view>
        <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">参考总价</view>
      </view>
      <view>
        <view class="dt-text-size-32" style="color: #333; font-weight: 500;">75-122㎡</view>
        <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">参考建面</view>
      </view>
    </view>
    
    <view class="dt-text-size-28" style="padding-top: 24rpx;">
      <view>
        <text style="color: #999;">参考均价：</text>
        <text style="color: #F75736;">58600-60000元/㎡</text>
      </view>
      
      <!-- 住宅 -->
      <template>
        <view class="dt-flex dt-flex-horizontal-between" style="margin-top: 12rpx;">
          <view>
            <text style="color: #999;">绿化率：</text>
            <text style="color: #333;">35%</text>
          </view>
          <view>
            <text style="color: #999;">容积率：</text>
            <text style="color: #333;">2.99</text>
          </view>
        </view>
        <view class="dt-flex dt-flex-horizontal-between" style="margin-top: 12rpx;">
          <view>
            <text style="color: #999;">物业费：</text>
            <text style="color: #333;">3.95元/㎡/月</text>
          </view>
          <view>
            <text style="color: #999;">车位比：</text>
            <text style="color: #333;">1:1.09</text>
          </view>
        </view>
      </template>
      
      <!-- 车位 -->
      <!-- <template>
        <view style="margin-bottom: 12rpx;">
          <text style="color: #999;">装修情况：</text>
          <text style="color: #333;">环氧地坪、水泥、花岗岩石</text>
        </view>
        <view style="margin-bottom: 12rpx;">
          <text style="color: #999;">车位类型：</text>
          <text style="color: #333;">标准、微型、子母、机械</text>
        </view>
        <view class="dt-flex dt-flex-horizontal-between" style="margin-bottom: 12rpx;">
          <view>
            <text style="color: #999;">车位数：</text>
            <text style="color: #333;">500</text>
          </view>
          <view>
            <text style="color: #999;">充电桩：</text>
            <text style="color: #333;">有(100个)</text>
          </view>
        </view>
      </template> -->
      
      <!-- 商铺 -->
      <!-- <template>
        <view class="dt-flex dt-flex-horizontal-between" style="margin-bottom: 12rpx;">
          <view>
            <text style="color: #999;">所属商圈：</text>
            <text style="color: #333;">虹桥枢纽</text>
          </view>
          <view>
            <text style="color: #999;">物业费：</text>
            <text style="color: #333;">3.95元/㎡/月</text>
          </view>
        </view>
        <view style="margin-bottom: 12rpx;">
          <text style="color: #999;">车位数：</text>
          <text style="color: #333;">500</text>
        </view>
      </template> -->
      
      <!-- 办公楼 -->
      <!-- <template>
        <view class="dt-flex dt-flex-horizontal-between" style="margin-bottom: 12rpx;">
          <view>
            <text style="color: #999;">所属商圈：</text>
            <text style="color: #333;">虹桥枢纽</text>
          </view>
          <view>
            <text style="color: #999;">装修情况：</text>
            <text style="color: #333;">毛坯</text>
          </view>
        </view>
        <view class="dt-flex dt-flex-horizontal-between" style="margin-bottom: 12rpx;">
          <view>
            <text style="color: #999;">物业费：</text>
            <text style="color: #333;">3.95元/㎡/月</text>
          </view>
          <view>
            <text style="color: #999;">车位数：</text>
            <text style="color: #333;">500</text>
          </view>
        </view>
      </template> -->
      
      <view class="dt-flex dt-flex-horizontal-between dt-flex-vertical-center" style="margin: 28rpx 0 36rpx;">
        <view>
          <text style="color: #999;">地址：</text>
          <text style="color: #333;">嘉定-嘉定新城  海波路1155弄</text>
        </view>
        <view class="dt-flex dt-flex-vertical-center">
          <text class="dt-text-size-24" style="color: #4A6DDB;">周边</text>
          <image src="../images/arrow_blue.png" style="display: block; width: 12rpx; height: 20rpx; margin-left: 8rpx;"></image>
        </view>
      </view>
      
      <view class="dt-text-size-28 dt-text-align-center" style="color: #4A6DDB; line-height: 80rpx; background-color: #F1F5FD; border-radius: 16rpx;">
        查看楼盘完整信息
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {}
    },
    watch: {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .tag {
    padding: 0 6rpx;
    height: 32rpx;
    line-height: 32rpx;
    font-size: 20rpx;
    color: #fff;
    background-color: #FF8242;
    border-radius: 4rpx;
  }
</style>
