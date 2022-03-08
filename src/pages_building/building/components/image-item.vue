<template>
  <view class="image-item">
    <swiper interval="5000" duration="500" style="height: 100%;">
      <swiper-item v-for="(item, index) in list" :key="index">
        <view @touchstart="onTouchstart($event, index)" @touchend="onTouchend($event, index)" class="dt-text-size-40 dt-flex dt-flex-horizontal-center dt-flex-vertical-center" style="height: 100%;">
          {{ item.content }}
        </view>
      </swiper-item>
    </swiper>
    
    <view class="img-count">共24张</view>
  </view>
</template>

<script>
  let touchstartX = 0, touchstartY = 0
  export default {
    data() {
      return {
        list: [
          { content: 'AAA' },
          { content: 'BBB' },
          { content: 'CCC' },
          { content: 'DDD' },
          { content: 'EEE' },
        ]
      }
    },
    methods: {
      onTouchstart(e, index) {
      	if (index == this.list.length - 1) {
          touchstartX = e.touches[0].clientX
          touchstartY = e.touches[0].clientY
        }
      },
      onTouchend(e, index) {
        if (index == this.list.length - 1) {
          let touchendX = e.changedTouches[0].clientX,
              touchendY = e.changedTouches[0].clientY
          let touchX = touchendX - touchstartX,
              touchY = touchendY - touchstartY
          if ((Math.abs(touchX) > Math.abs(touchY)) && touchX < -50) {
            this.$emit('jump')
          }
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .image-item {
    width: 100%;
    height: 500rpx;
    position: relative;
    .img-count {
      position: absolute;
      right: 0;
      bottom: 40rpx;
      font-size: 20rpx;
      color: #fff;
      background-color: #000;
      opacity: 0.6;
      line-height: 40rpx;
      padding: 0 8rpx 0 16rpx;
      border-radius: 200rpx 0rpx 0rpx 200rpx;
    }
  }
</style>
