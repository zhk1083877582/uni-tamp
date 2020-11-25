<!-- 楼盘详情:户型 -->
<template>
	<view class="house-dynamic">
		<title-info text="楼盘动态" :btnRightInfo="btnRightInfo"></title-info>
		<view class="time-list houseShare_dynamic_active">
			<view class="time-item" v-for="(item,index) in dateBaseInfoList" :key="index">
				<view class="dynamic_actives" v-if="item.evidenceDate" >
					<view class="dynamic_actives_divs"> 
						<text class="dynamic_actives_line "></text> 
						<text class="dynamic_actives_img"> 
							<text class="iconfont iconicon_preSale"></text> 
						</text>
					</view> 
					<view class="dynamic_actives_title">预售证</view>
					<view class="dynamic_actives_name">{{item.evidenceDate}}</view>
				</view>
				<view class="dynamic_actives" v-if="item.identifyChipsDate">
					<view class="dynamic_actives_divs"> 
						<text class="dynamic_actives_line "></text> 
						<text class="dynamic_actives_img"> 
							<text class="iconfont iconicon_pledge"></text>
						</text>
					</view> 
					<view class="dynamic_actives_title">认筹</view>
					<view class="dynamic_actives_name">{{item.identifyChipsDate}}</view>
				</view>
				<view class="dynamic_actives" v-if="item.openTime">
					<view class="dynamic_actives_divs"> 
						<text class="dynamic_actives_line" v-if="index!=(dateBaseInfoList.length-1)"></text> 
						<text class="dynamic_actives_img"> 
							<text class="iconfont iconicon_opening"></text>
						</text>
					</view> 
					<view class="dynamic_actives_title">开盘</view>
					<view class="dynamic_actives_name">{{item.openTime}}</view>
				</view>
			</view>
		</view>
		
		<view class="content-list">
			<view  class="houseShare_dynamic_timeing" v-for="(item,index) in dynamicBaseInfoList" :key="index">
				<view class="clearfloat"> 
					<view class="leftTimes"> 
						<text class="leftTimes_title"></text> 
						<text class="leftTimes_line"></text> 
					</view>
					<view class="rightTimes">  
						 <view class="right_time">{{item.createTime}}</view>
						 <view class="right_title">{{item.title}}</view> 
						 <view class="right_message">{{item.content}}</view> 
					</view> 
				 </view>
			 </view>
		</view>
		<u-modal v-model="isShow" ref="uModal" :show-title="true" title="楼盘关注成功" confirm-text="知道了"  :content="modalMsg" 
			 @confirm="confirm" >
		</u-modal>
		<view  :class="!isCollection?'btn':'btn btn-gray' " @click.stop="changeCollection" >
			新动态提醒
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
				isCollection:false,
				isShow:false,
				modalMsg:'',
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
				self.isCollection = self.dongtaiInfo.isCollection;
				btnRightInfo.url= '../propertyDynamic/index?buildingId='+self.dongtaiInfo.buildingId;
			},1500)
			
		},
		watch:{
			// buildingId(newVal){
			// 	if(newVal){this.initBuildingDynamicAndDate(this.buildingId)}
				
			// },
		},
		methods: {
			//更多
			// toMoreDynamic(){
			// 	uni.navigateTo({
			// 	   url: '../propertyDynamic/index?buildingId='+this.buildingId
			// 	});
			// },
			//新动态提醒-收藏功能
			changeCollection() {
				if(this.isCollection){
					return 
				}
				// this.isShow =true;
				// this.modalMsg = '楼盘开盘、变价等相关动态信息将通过消息推送给您。';
				// return 
				let self=this;
				getData("/tospurWeb/pclogin/checkLogin", {
						// token: this.$tool.getToken()
						token: this.$cache.getCache("M-Token")
					})
					.then(res => {
						let url = '/building/api/pc/building/buildingCollection';
						let params = {
							buildingId:self.dongtaiInfo.buildingId,
							statue:0
						};
						getData(url, params).then(res => {
							this.isShow =true;
							this.modalMsg = '楼盘开盘、变价等相关动态信息将通过消息推送给您。';
						})
					})
					.catch(err => {
						console.log("未登录或登录过期", err);
						console.log(err.code);
						if (err.code == 1) {
							uni.navigateTo({
								url: '/pagesUser/login/login?topath=pagesHouse/house/house&buildingId='+self.dongtaiInfo.buildingId
							});
						}
					});
			},
			confirm(){
				console.log('收藏成功')
				this.isCollection=true;
				this.$emit('changeCollectionStatus',{isCollectionFlag:true,from:'houseDynamic'});
			},
			//动态
			// initBuildingDynamicAndDate(){
			// 	let params={
			// 		buildingId:this.buildingId
			// 	};
			// 	let self=this;
			// 	getBuildingDynamicAndDate('',params)
			// 		.then(res=>{
			// 			console.log('楼盘动态',res)
			// 			let dateBaseInfoList = res.dateBaseInfoList;
			// 			dateBaseInfoList.forEach(item=>{
			// 				item.evidenceDate = item.evidenceDate?self.formatDate(item.evidenceDate):'';
			// 				item.identifyChipsDate = item.identifyChipsDate?self.formatDate(item.identifyChipsDate):'';
			// 				item.openTime = item.openTime?self.formatDate(item.openTime):'';
			// 			});
			// 			self.dateBaseInfoList = dateBaseInfoList;
			// 			self.dynamicBaseInfoList = (res.dynamicBaseInfoList||[]).slice(0,2);
			// 		})
			// 		.catch(err=>{
			// 			console.log('动态-err',err)
			// 		})
			// },
			/*
			*格式化日期字符串
			*/
			// formatDate(time) {
			//    let date = new Date(time*1)
			//    let myyear = date.getFullYear();
			//    let mymonth = date.getMonth() + 1;
			//    let myweekday = date.getDate();
			//    if (mymonth < 10) {
			// 	   mymonth = "0" + mymonth;
			//    }
			//    if (myweekday < 10) {
			// 	   myweekday = "0" + myweekday;
			//    }
			//    return (myyear + "-" + mymonth + "-" + myweekday);
			// },
			
		}
	}
</script>

<style lang="scss" scoped>
	.house-dynamic{
		width: 100%;
		// height:300px;
		border-top: 10px solid #f4f8f8;
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
			  text-align: center;
			  margin:30rpx 0;
			  background-color: #F1F9FF;
			  color: #00A4FF;
			  font-size: 28rpx;
			  // font-weight: 600;
		}
		/deep/.btn:after {
		    border: 0;
		}
		.btn-gray{
			font-weight: 400;
			color: #999999;
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
		    border-top: 2px solid #00A4FF;
		}
		.dynamic_actives_img {
		    width: 42rpx;
		    height:42rpx;
		    position: absolute;
		    border-radius: 50%;
		    background-color: #00A4FF;
		    color: white;
		    text-align: center;
		    line-height: 38rpx;
		}
		.dynamic_actives_title {
		    margin: 12rpx 0 10rpx;
		    color: #000000;
		    font-size: 12px;
		}
		.dynamic_actives_name {
		    color: #686868;
		    font-size: 24rpx;
		}
		
		//list

		.clearfloat{
			display: flex;
			
        .leftTimes {
		
		  width: 5%;
		    position: relative;
		    height:220rpx;
			.leftTimes_title {
		    width: 18rpx;
		    height: 18rpx;
		    border-radius: 16rpx;
		    position: absolute;
		    background-color: #D8D8D8;
		}
		.leftTimes_line {
		    position: absolute;
		    height: 100%;
		    left: 8rpx;
		    border-left: 1px solid #D8D8D8;
		}
		}
		.rightTimes{
			 width: 95%;
			 .right_time {
		    color: #CBCBCB;
		    font-size: 24rpx;
		}
		.right_title {
		    font-size: 32rpx;
		    color: #282828;
		    margin: 30rpx 0 20rpx;
		    font-weight: 700;
		}
		.right_message {
		    color: #6A6F70;
		    font-size: 28rpx;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    -webkit-box-orient: vertical;
		}
		} 
		}
		
		
		
		
	}
</style>
