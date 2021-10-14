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
		if(option.url){
			let tmpUrl = decodeURIComponent(option.url)
			console.log('-------option数据',tmpUrl)
			let mWebSite = this.$tool.getOtherWebSite() //获取跳转域名
			this.url = mWebSite + tmpUrl
		}else{
			this.url = this.$cache.getCache('toMWebpath').toMWebpath + '&fromAppName=xcx11';
			if(this.url.indexOf('/housePhoto')>-1){
				uni.hideShareMenu()
			}
		}
		console.log(this.url,'webViewUrl')
	},
	computed: {},
}
</script>
<style lang='scss' scoped>
</style>
