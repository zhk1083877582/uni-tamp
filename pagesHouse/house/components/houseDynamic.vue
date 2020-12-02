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
			// this.buildingId ='1078';
			//动态
			// if( this.buildingId){this.initBuildingDynamicAndDate(this.buildingId)}
			let self =this,btnRightInfo=this.btnRightInfo;
			setTimeout(()=>{
				self.dateBaseInfoList = self.dongtaiInfo.dateBaseInfoList;
				self.dynamicBaseInfoList = self.dongtaiInfo.dynamicBaseInfoList;
			},1500)
			
		},
		methods: {
			//更多
			toMoreDynamic(){
				uni.navigateTo({
				   url: '../propertyDynamic/index?buildingId='+this.buildingId
				});
			},				
		}
	}
</script>

<style lang="scss" scoped>
	.house-dynamic{
		width: 100%;
		// height:300px;
		border-top: 10px solid #0B0704;
		padding: 0rpx 30rpx;
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
			  background: #211c16;
			  color: #9f7747;
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
		    border-top: 2px solid #9F7747;
		}
		.dynamic_actives_img {
		    width: 42rpx;
		    height:42rpx;
		    position: absolute;
		    border-radius: 50%;
		    background-color: #9F7747;
		    color: white;
		    text-align: center;
		    line-height: 38rpx;
		}
		.dynamic_actives_title {
		    margin: 12rpx 0 10rpx;
		    color: #827870;
		    font-size: 24rpx;
		}
		.dynamic_actives_name {
		    color: #827870;
		    font-size: 24rpx;
		}
		
		//list

		.houseShare_dynamic_timeing{
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
				background: #3e3731;
			}
			.right-title {
				font-size: 30rpx;
				color: #827870;
				margin: 30rpx 0 20rpx 18rpx;
				font-weight: 700;
			}
			.right-message {
				color: #827870;
				font-size: 26rpx;
				margin-left: 18rpx;
				margin-bottom: 20rpx;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				overflow: hidden;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
			}
		}		
	}
</style>
