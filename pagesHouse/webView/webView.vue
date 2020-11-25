<!-- 跳转M站 -->
<template>
	<view class='webview'>
		<web-view :src="srcOption"></web-view>
	</view>
</template>

<script>

export default {
	components: {},
	data() {
		return {
			//configStr:'https://mtest.tospur.com',
			// configStr:this.$tool.returnWebviewUrl(),
			srcOption:'',
		};
	},
	onLoad(option){
		console.log(option);
		let pinStr = '',pinStr1='',pinStr2=''
		for(let key in option){
			if(key=='toMWebpath'){
				pinStr1 += `${option[key]}?` 
			}else{
				pinStr2 += `${key}=${option[key]}&`
			}
			
		}
		// pinStr2 = pinStr2.substring(0,pinStr.length-1)
		// pinStr1 = pinStr1.substring(11,pinStr.length)
		setTimeout(()=>{
			// this.srcOption = this.configStr + pinStr1 + pinStr2 + 'fromAppName=xcx'
			this.srcOption = pinStr1 + pinStr2 + 'fromAppName=xcx'
			console.log(4545,this.srcOption)
		},1000)
		
	},
	computed: {},
	watch: {},
	methods: {

	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>

</style>
