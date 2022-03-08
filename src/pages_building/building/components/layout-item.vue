<template>
  <view class="dt-bg-color-white" style="margin-bottom: 16rpx; padding: 40rpx 32rpx 32rpx;">
    <view class="dt-flex dt-flex-horizontal-between dt-flex-vertical-center">
      <view class="dt-text-size-32 dt-flex dt-flex-vertical-center" style="color: #333; font-weight: 500;">
        <view class="title-line"></view>
        <view>户型介绍</view>
      </view>
      <view class="dt-flex dt-flex-vertical-center">
        <text class="dt-text-size-24" style="color: #999;">全部户型</text>
        <image src="../images/arrow.png" style="display: block; width: 12rpx; height: 20rpx; margin-left: 8rpx;"></image>
      </view>
    </view>
    
    <view class="dt-bg-color-white" style="margin: 30rpx 0 34rpx;">
      <dt-tab :tabs="roomOptions" v-model="roomIndex" isScroll tab-class="text-tab-class" tab-class-active="text-tab-class text-tab-active-class" line-style="display: none;" />
    </view>
    
    <scroll-view scroll-x scroll-with-animation="true">
      <view class="dt-flex">
        <view v-for="(item, index) in list" :key="index" class="dt-margin-r-30">
          <view style="width: 400rpx; height: 300rpx; border: 1rpx dashed #999;"></view>
          <view class="dt-text-size-30 dt-margin-t-40" style="color: #333; font-weight: 500;">
            {{ item.title }}
          </view>
          <view class="dt-text-size-26" style="color: #666; margin: 10rpx 0;">
            <text class="dt-margin-r-20">建面约135㎡</text>
            <text>朝向南</text>
          </view>
          <view class="dt-text-size-30" style="color: #F75736; font-weight: 500;">约791万</view>
        </view>
    	</view>
    </scroll-view>
  </view>
</template>

<script>
  import comTab from './tab.vue'
  
  export default {
    components: {
      comTab
    },
    data() {
      return {
        roomIndex: 0,
        roomOptions: [
          { title: '全部', key: '1' },
          { title: '四居(2)', key: '2' },
          { title: '三居(2)', key: '3' },
          { title: '二居(2)', key: '4' }
        ],
        list: [
          {
            title: '4室2厅2卫',
            price: '791',
            status: 1,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          },
          {
            title: '4室2厅2卫',
            price: '791',
            status: 2,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          },
          {
            title: '4室2厅2卫',
            price: '791',
            status: 3,
            area: '135',
            orientation: '南',
            floor: '2.83',
            tags: ['南北通透', '动静分离', '衣帽间']
          }
        ]
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
