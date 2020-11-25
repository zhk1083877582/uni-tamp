<!-- 跳转VR -->
<template>
  <view class='webview'>
    <web-view  :src='src'></web-view>
  </view>
</template>

<script>

export default {
  components: {},
  data () {
    return {
      src: this.$cache.getCache('urlVR'),
      // src:'https://m.tongcehaofang.com/?sp=3#/calculator',
    };
  },
  onLoad (option) {
	this.src =this.$cache.getCache('urlVR')
  },
  methods: {

  },
}
</script>
<style lang='scss' scoped>
</style>