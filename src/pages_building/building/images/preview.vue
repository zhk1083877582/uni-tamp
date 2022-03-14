<template>
  <view class="page" style="background-color: #000;">
    <view class="dt-width-100" style="border-bottom: 1rpx solid rgba(238, 238, 238, .2);">
      <dt-tab v-model="tabIndex" :tabs="tabs" @change="onClick" isScroll tab-class="dt-line-tab-class" tab-class-active="dt-line-tab-class preview-line-tab-active-class"
        lineStyle="display: block; width: 60rpx; background-color: #fff;"></dt-tab>
    </view>
    
    <view class="dt-text-size-30 dt-text-color-white dt-text-align-center" style="margin-top: 50rpx;">
      {{ current + 1 }}/{{ tabs[tabIndex].images.length }}
    </view>
    
    <swiper :current="current" interval="5000" duration="500" style="width: 100%; height: calc(100vh - 200rpx);">
      <swiper-item v-for="(item, index) in tabs[tabIndex].images" :key="item.attachId">
        <view @touchstart="onTouchstart($event, index)" @touchend="onTouchend($event, index)" style="height: 100%;">
          <image :src="item.attachAddress" mode="aspectFit" style="display: block; width: 100%; height: 100%;"></image>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
  let touchstartX = 0
  export default {
    data() {
      return {
        tabIndex: 0,
        tabs: [],
        current: 0,
      }
    },
    onLoad(opt) {
      this.tabIndex = Number(opt.tabIndex)
      this.current = Number(opt.current)
      this.tabs = JSON.parse(opt.tabs)
    },
    methods: {
      onClick() {
        this.current = 0
      },
      // 记录滑动开始的位置
      onTouchstart(e, index) {
        touchstartX = e.touches[0].clientX
      },
      onTouchend(e, index) {
        // 滑动结束的位置
        let touchendX = e.changedTouches[0].clientX
        let touchX = touchendX - touchstartX
        if (touchX < -50) { // 向右滑动
          // 当前类型下图片的下标
          this.current = index < this.tabs[this.tabIndex].images.length - 1 ? index + 1 : this.tabs[this.tabIndex].images.length - 1
          // 当滑动到最后一张并且不是最后一个类型时，跳到下一个类型，从下个类型第一张图片开始
          if (index == this.tabs[this.tabIndex].images.length - 1 && this.tabIndex < this.tabs.length - 1) {
            this.tabIndex ++
            this.current = 0
          }
        } else if (touchX > 50) { // 向左滑动
          // 当前类型下图片的下标
          this.current = index > 0 ? index - 1 : 0
          // 当滑动到第一张并且不是第一个类型时，跳到前一个类型，从前个类型最后一张图片开始
          if (index == 0 && this.tabIndex > 0) {
            this.tabIndex --
            this.current = this.tabs[this.tabIndex].images.length - 1
          }
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
</style>
