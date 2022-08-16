<!-- 专属置业报告 -->
<template>
  <view>
  </view>
</template>

<script>
  export default {
    onLoad(option) {
      uni.redirectTo({
        url: '/pages_com/report/detail?sn=' + option.sn
      })
    }
  }
</script>

<style>
</style>
