<!--  -->
<template>
	<view class='article_page'>
		<view class="detail">
			<view class="detailTit">{{articleData.articleTitle}}</view>
			<view class="avatar">
				<img :src="articleData.articleImage" class="avatarImg">
				<text class="Nickname">{{articleData.creater}}</text>
				<text class="dataTime">
						{{articleData.createTime}}
				</text>
			</view>
			<view class="artCon">
				<jyf-parser :html="articleData.articleContent" ref="article"></jyf-parser>
			</view>
		</view>	
	</view>
</template>

<script>
import { getData } from '@/request/api';
import jyfParser from "@/components/jyf-parser/jyf-parser.vue";
export default {
	components: {
		jyfParser
	},
	data() {
		return {
			articleId:'',
			articleData:{},
			beginTime:''
		};
	},
	computed: {},
	watch: {},
	methods: {
		getArticle(id){
			let params = {
				articleId:id
			}
			getData('/business/article/manager/info/get',params).then((res)=>{
				console.log(res)
				this.articleData = res
				
			})
		}
	},
	created() {

	},
	mounted() {
	},
	onLoad(option){
		console.log(option.articleId)
		if(!this.$cache.getCache('M-Token')){
			uni.navigateTo({
				url: '/pagesUser/login/login?topath=pagesUser/article/article&articleId=' + option.articleId
			});
		}else{
			this.getArticle(option.articleId)
		}
		this.beginTime = (new Date()).getTime()
		//客户足迹埋点
		this.CustomerTrack.buildingId = ''
		this.CustomerTrack.operateType = '4'
		this.CustomerTrack.createrId = ''
		this.CustomerTrack.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
		this.CustomerTrack.dataId = option.articleId
	},
	onHide(){
		console.log('onHide 222')
		//客户足迹埋点
		this.CustomerTrack.stayTime = (new Date()).getTime() - this.beginTime
		this.addCustomerTrack()
	},
	onUnload(){
		console.log('onUnload 333')
		//客户足迹埋点
		this.CustomerTrack.stayTime = (new Date()).getTime() - this.beginTime
		this.addCustomerTrack()
	},
}
</script>
<style lang='scss' scoped>
.detail {
    background-color: #fff;
    padding: 20px;
}

.detailTit{
	font-size: 16px;
	color: #333;
	font-weight: bold;
	line-height: 1.5;
}
.avatar {
    margin-top: 22px;
    display: flex;
    flex-direction: row;
}

.avatarImg {
    width: 40px;
    height: 40px;
}

.Nickname {
    font-size: 14px;
    color: #333;
    line-height: 40px;
    margin-left: 10px;
}

.dataTime {
    font-size: 14px;
    color: #333;
    text-align: right;
    flex: 1;
    line-height: 40px;
}

.detailCon {
    font-size: 14px;
    color: #333;
    line-height: 21px;
    margin: 20px 0;
}
</style>
