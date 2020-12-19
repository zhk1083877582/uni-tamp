<!-- 跳转M站 -->
<template>
	<view class='webview'>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>

export default {
	components: {},
	data () {
	  return {
	    src: this.$cache.getCache('toMWebpath'),
	  };
	},
	onLoad (option) {
		console.log('toMWebpath',this.$cache.getCache('toMWebpath'))
		this.src =this.$cache.getCache('toMWebpath');
	},
	computed: {},
}
</script>
<style lang='scss' scoped>

</style>
