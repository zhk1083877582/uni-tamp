<!-- 跳转M站 -->
<template>
	<view class='webview'>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>

export default {
	components: {},
	data () {
	  return {
	    url: '',
	  };
	},
	onLoad (option) {
		// console.log('toMWebpath',this.$cache.getCache('toMWebpath'))
		this.url =this.$cache.getCache('toMWebpath').toMWebpath + '&fromAppName=xcx';
		console.log('toMWebpath1111',this.url)
		if(this.url.indexOf('/housePhoto')>-1){
			uni.hideShareMenu()
		}
	},
	computed: {},
}
</script>
<style lang='scss' scoped>

</style>
