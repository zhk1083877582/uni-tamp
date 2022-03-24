<!-- 楼盘详情 -->
<template>
  <view>
  </view>
</template>

<script>
  export default {
    onLoad(opt) {
      uni.redirectTo({
        url: `/pages_com/building/detail?buildingId=${opt.buildingId}&userId=${opt.userId}`
      })
    }
  }
</script>

<style>
</style>
