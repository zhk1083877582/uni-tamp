<!-- 楼盘详情 -->
<template>
  <view>
  </view>
</template>

<script>
  export default {
    onLoad(opt) {
      let params = ''
      if (opt.scene) {
        params = `scene=${opt.scene}`
      } else {
        for (let key in opt) {
          params = params ? `${params}&${key}=${opt[key]}` : `${key}=${opt[key]}`
        }
      }
      uni.redirectTo({
        url: `/pages_com/building/detail?${params}`
      })
    }
  }
</script>

<style>
</style>
