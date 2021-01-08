<!-- 楼盘详情:户型 -->
<template>
	<view class="house-dynamic">
		<title-info text="楼盘动态" ></title-info>
		<view class="time-list houseShare_dynamic_active">
			<view class="time-item" v-for="(item,index) in dateBaseInfoList" :key="index">
				<view class="dynamic_actives" v-if="item.evidenceDate" >
					<view class="dynamic_actives_divs"> 
						<text class="dynamic_actives_line"></text> 
						<text class="dynamic_actives_img"> 
							<text class="iconfont iconyushouzheng"></text> 
						</text>
					</view> 
					<view class="dynamic_actives_title">预售证</view>
					<view class="dynamic_actives_name">{{item.evidenceDate}}</view>
				</view>
				<view class="dynamic_actives" v-if="item.identifyChipsDate">
					<view class="dynamic_actives_divs"> 
						<text class="dynamic_actives_line "></text> 
						<text class="dynamic_actives_img"> 
							<text class="iconfont iconjiage"></text>
						</text>
					</view> 
					<view class="dynamic_actives_title">认筹</view>
					<view class="dynamic_actives_name">{{item.identifyChipsDate}}</view>
				</view>
				<view class="dynamic_actives" v-if="item.openTime">
					<view class="dynamic_actives_divs"> 
						<text class="dynamic_actives_line" v-if="index!=(dateBaseInfoList.length-1)"></text> 
						<text class="dynamic_actives_img"> 
							<text class="iconfont iconkaipan"></text>
						</text>
					</view> 
					<view class="dynamic_actives_title">开盘</view>
					<view class="dynamic_actives_name">{{item.openTime}}</view>
				</view>
			</view>
		</view>
		
		<view class="content-list">
			<view  class="houseShare_dynamic_timeing" v-for="(item,index) in dynamicBaseInfoList" :key="index">
				<view class="right-time">
					<text class="time-circle"></text>
					<text class="leftTimes_line"></text>
					<text >{{item.createTime}}</text>
				</view>
				<view class="right-title">{{item.title}}</view> 
				<view class="right-message">{{item.content}}</view>
			</view>
		</view>
		<view  class="btn" @click.stop="toMoreDynamic" >
			更多动态
		</view>
	</view>
</template>

<script>
	import titleInfo from './titleInfo.vue';
	import {getData,getBuildingDynamicAndDate} from '@/request/api';
	import { mapState } from 'vuex';
	export default {
		props:{
			dongtaiInfo:{
				type:Object,
				default:{
					buildingId:'',
					isCollection:false,
					dateBaseInfoList:[],
					dynamicBaseInfoList:[]
				}
			},
			userId:{
				type: String,
				default: ''
			}
		},
		data() {
			return {
				//更多操作
				btnRightInfo:{
					text:'全部动态',
					url:''
				},
				numList: [{
						name: '预售证'
					}, {
						name: '认筹'
					}, {
						name: '开盘'
					}, 
				],
				dateBaseInfoList:[],//时间内容
				dynamicBaseInfoList:[],//动态消息内容
			}
		},
		components: {
			titleInfo
		},
		computed: {
	
		},
		mounted() {
			let self =this,btnRightInfo=this.btnRightInfo;
			setTimeout(()=>{
				self.dateBaseInfoList = self.dongtaiInfo.dateBaseInfoList;
				self.dynamicBaseInfoList = self.dongtaiInfo.dynamicBaseInfoList;
			},1000)
			
		},
		methods: {
			//更多
			toMoreDynamic(){
				let routeParams={buildingId:this.dongtaiInfo.buildingId};
				if(this.userId){
					routeParams['userId'] = this.userId;
				}
				this.goWebView('/propertyDynamic',routeParams)
			},
			//去webview
			goWebView(routeName,routeParams,toPath){
				let mWebSite = this.$tool.getOtherWebSite();//获取跳转域名
				let pathParams='';//获取路由参数
				routeParams=routeParams||{};
				Object.keys(routeParams).forEach((keyStr,index)=>{
					pathParams+= index>0?`&${keyStr}=${routeParams[keyStr]}`:`${keyStr}=${routeParams[keyStr]}`;				
				})
				if( this.$cache.getCache('toMWebpath')){
					this.$cache.removeCache('toMWebpath');
				}
				this.$cache.setCache('toMWebpath',{
					toMWebpath:toPath||`${mWebSite}#${routeName}?${pathParams}`
				})
				uni.navigateTo({
				  url: '/pagesHouse/webView/webView'
				});
			},	
		}
	}
</script>

<style lang="scss" scoped>
	.house-dynamic{
		width: 100%;
		// height:300px;
		border-top: 10rpx solid #999999;
		padding: 40rpx 30rpx;
		padding-bottom:20rpx;
		.tabs{
			margin-top: 50rpx;
			overflow-y: auto;
			white-space: nowrap;
		}
		.tab-item {
		    font-size: 32rpx;
		    color: #A9A8AE;
		    margin-right: 28rpx;
		}
		
		.list{
			height:440rpx;
			margin-top:40rpx;
			overflow: hidden;
			border: 1px solid red;
		}
		.btn{
			  width:100%;
			  height:68rpx;
			  line-height: 68rpx;
			  margin:30rpx 0;
			  text-align: center;
			  background-color:#f1f5fd;
			  color: #4a6ddb;
			  font-weight: 500;
		}
		
		//时间list
		.time-list{
			margin: 40rpx 0;
		}
		.time-item{
			display: flex;
		}
		.iconfont {
		    font-size: 24rpx;
		}
		.houseShare_dynamic_active {
		    width: 100%;
		    display: flex;
		    overflow-y: auto;
		}
		.dynamic_actives {
		    width: 180rpx;
		}
		.dynamic_actives_divs {
		    height: 42rpx;
		    position: relative;
		    width: 180rpx;
		}
		// .dynamic_actives_divs:last-child{
		// 	width:0;
		// }
		
		.dynamic_actives_line {
		    width: 100%;
		    display: inline-block;
		    position: absolute;
		    left: 0;
		    top: 22rpx;
		    border-top: 2px solid #4a6ddb;
		}
		.dynamic_actives_img {
		    width: 42rpx;
		    height:42rpx;
		    position: absolute;
		    border-radius: 50%;
		    background-color: #4A6DDB;
		    color: white;
		    text-align: center;
		    line-height: 38rpx;
		}
		.dynamic_actives_title {
		    margin: 12rpx 0 10rpx;
			color: #141414;
		    font-size: 24rpx;
		}
		.dynamic_actives_name {
		    color: #666666;
		    font-size: 24rpx;
		}
		
		//list

		.houseShare_dynamic_timeing{
			position: relative;
			padding-bottom: 20rpx;
			// overflow: hidden;
			.right-time {
				// width: 210rpx;
				height: 24rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #827870;
				display: flex;
				align-items: center;
			}
			.time-circle{
				width: 16rpx;
				height: 16rpx;
				margin-right: 18rpx;
				border-radius: 50% 50%;
				background: #d8d8d8;
			}
			.leftTimes_line{
				position: absolute;
				height: 100%;
				left: 4px;
				border-left: 1px solid #d8d8d8;
				top: 4rpx;
			}
			.right-title {
				font-size: 30rpx;
				color: #141414;
				margin: 30rpx 0 20rpx 18rpx;
				font-weight: 700;
			}
			.right-message {
				color: #666666;
				font-size: 26rpx;
				margin-left: 18rpx;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
			}
		}		
	}
</style>
