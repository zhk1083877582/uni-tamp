<!-- 楼盘详情 -->
<template>
  <view>
  </view>
</template>

<script>
  export default {
    onLoad(opt) {
      let buildingId = '',
          userId = '',
          articleId = ''
      if (opt.scene) {
        const scene = decodeURIComponent(opt.scene)
        let obj = {}
        scene.split('&').forEach((item) => {
          const key = item.split('=')[0]
          obj[key] = item.split('=')[1]
        })
        userId = obj.uId || ''
        buildingId = obj.bId || ''
        articleId = obj.a
      } else {
        userId = opt.userId || ''
        buildingId = opt.buildingId || ''
        articleId = opt.articleId || ''
      }
      uni.redirectTo({
        url: `/pages_com/building/detail?buildingId=${buildingId}&userId=${userId}&articleId=${articleId}`
      })
    }
  }
</script>

<style>
</style>
