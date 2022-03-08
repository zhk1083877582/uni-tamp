<template>
  <view class="page container">
    <view class="image">
      <!-- <image src="../images/layout.png" mode="aspectFill" style="display: block; width: 100%; height: 100%;"></image> -->
    </view>
    
    <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 36rpx 32rpx 30rpx;">
      <view class="dt-text-size-40" style="color: #333; font-weight: 500;">3室2厅1厨1卫（A户型）</view>
      <view style="margin-bottom: 16rpx;">
        <text class="tag" style="color: #fff; background-color: #4A6DDB;">在售</text>
        <text class="tag">南北通透</text>
        <text class="tag">采光充足</text>
        <text class="tag">户型方正</text>
      </view>
      <view class="dt-flex">
        <view class="dt-flex-1">
          <view class="dt-text-size-32" style="color: #333; font-weight: 500;">105㎡</view>
          <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">参考建面</view>
        </view>
        <view class="dt-flex-1">
          <view class="dt-text-size-32 dt-flex dt-flex-vertical-center">
            <text class="dt-text-size-24" style="color: #999; margin-right: 6rpx;">约</text>
            <text style="color: #F75736; font-weight: 500;">686.9万/套</text>
          </view>
          <view class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">参考总价</view>
        </view>
        <view class="dt-flex-1 dt-flex dt-flex-horizontal-center">
          <view class="dt-flex dt-flex-direction-column">
            <text class="dt-text-size-32" style="color: #333; font-weight: 500;">朝南</text>
            <text class="dt-text-size-24" style="color: #999; margin-top: 10rpx;">朝向</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 40rpx 32rpx 32rpx;">
      <view class="dt-text-size-32 dt-flex dt-flex-vertical-center dt-margin-b-20" style="color: #333; font-weight: 500;">
        <view class="title-line"></view>
        <view>户型点评</view>
      </view>
      <view class="dt-text-size-28" style="color: #666; line-height: 42rpx;">
        主卧畅享奢适空间，自成一方私密天地全明户型设计,室内清新怡人</br>
        主卧畅享奢适空间，自成一方私密天地全明户型设计,室内清新怡人
      </view>
    </view>
    
    <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 40rpx 32rpx 0;">
      <view class="dt-text-size-32 dt-flex dt-flex-vertical-center" style="color: #333; font-weight: 500;">
        <view class="title-line"></view>
        <view>其他住宅户型（3）</view>
      </view>
      <view class="dt-bg-color-white">
        <template v-for="(layout, index) in list">
          <layout-item :key="index" :info="layout" />
        </template>
      </view>
    </view>
    
    <view style="width: 140rpx; height: 140rpx; border-radius: 140rpx; position: fixed; right: 22rpx; bottom: 150rpx;">
      <!-- <image src="../images/share.png" style="display: block; width: 100%; height: 100%;"></image> -->
    </view>
  </view>
</template>

<script>
  import layoutItem from './components/layout-item.vue'
  
  export default {
    components: {
      layoutItem
    },
    data() {
      return {
        list: [
          {
            title: '4室2厅2卫（A户型）',
            price: '791',
            status: 1,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          },
          {
            title: '4室2厅2卫（A户型）',
            price: '791',
            status: 2,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          },
          {
            title: '4室2厅2卫（A户型）',
            price: '791',
            status: 3,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          }
        ]
      };
    },
    watch: {},
    onLoad(opt) {},
    onShareAppMessage(opt) {},
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .container {
    background-color: #F6F6F8;
  }
  
  .image {
    width: 100%;
    height: 500rpx;
  }
  
  .tag {
    padding: 0 6rpx;
    height: 32rpx;
    line-height: 32rpx;
    font-size: 20rpx;
    color: #666;
    background-color: #F6F6F8;
    border-radius: 4rpx;
    margin-right: 8rpx;
  }
  
  .title-line {
    width: 4rpx;
    height: 26rpx;
    background-color: #4A6DDB;
    margin-right: 12rpx;
  }
</style>
