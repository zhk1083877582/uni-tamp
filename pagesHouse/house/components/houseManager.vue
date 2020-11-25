<!-- 优秀管家 -->
<template>
	<view class="house_manager">
		<title-info text="优秀管家" :tipList="tipList" :btnRightInfo="btnRightInfo" ></title-info>
		<view class="list">
			<view class="list-item" v-for="(item,index) in managerList" :key="index">
				<view class="item-img">
					<image class="img" :src="item.avatarUrl? item.avatarUrl+'?x-oss-process=image/resize,h_60,w_60': '../../static/photo_default@2x.png'" mode=""></image>
				</view>
				<view class="item-info">
					<view class="item-nameInfo">
						<view class="user-name">{{item.userName}}</view>
						<view>满意度{{item.satisfaction}}</view>
					</view>
					<view class="item-flags">
						 <text class="flags-item" v-for="(item1,index1) in item.expertiseFieldList" :key="index1">{{item1.paraValue}}</text>
					</view>
				</view>
				<view class="item-icons">
					<view class="icon-message" @click="chatMess(item)"></view>
					<view class="icon-tel" @click="chatTell(item)"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import titleInfo from './titleInfo.vue';
	import {getData} from '@/request/api';
	// import {getHousekeeperList} from '@/request/api';
	export default {
		props:{
			managerList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			buildingId:{
				type:String,
				default:''
			},
			mess:{
				type:Object,
				default:()=>{
					return {}
				}
			}
		},
		data() {
			return {
				// managerList: [],
				tipList:{
					serve:{text:'专业服务'},
					ask:{text:'免费咨询'},
					accompany:{text:'全程带看'},
				},
				//更多操作
				btnRightInfo:{
					text:'更多',
					url:''
				}
			}
		},
		watch:{
			mess:{
				handler(newValue, oldValue){
                 console.log("获取的值1",newValue)
				 this.messList = newValue;
				 this.buildingId = newValue.id;
				},
			 deep: true  
			 },
			buildingId(newVal){
				if(newVal){this.changeBtnRightInfo(newVal)}
				
			},
		},
		components:{
			titleInfo
		},
			
		mounted(){
			//更多操作：
			if(this.buildingId){
				this.changeBtnRightInfo(this.buildingId)
			}
			if(this.mess && this.mess.id){
              this.messList = this.mess;
			}
		},
		methods: {
			changeBtnRightInfo(buildingId){
				let {btnRightInfo} =this;
				let url="../majordomoList/index?buildingId="+buildingId;
				btnRightInfo.url = url;
			},
			//聊天 
			chatMess(data){
				let {imBaseUserId, userName} = data;
				this.messList.annexs = [];
				uni.setStorageSync("showSentBuild",JSON.stringify(this.messList));
				
				imBaseUserId = 'C2C'+imBaseUserId;
				console.log("给管家发信息",imBaseUserId)
				if(!this.$cache.getCache("M-Token")){
				  uni.navigateTo({
					  url: `/pagesUser/login/login?topath=pagesChat/chatDetail/chatDetail&id=${imBaseUserId}&title=${userName}`
				    });
				}else{
					uni.navigateTo({
					   url: `/pagesChat/chatDetail/chatDetail?id=${imBaseUserId}&title=${userName}`
					});
				}
			},
			//打电话
			chatTell(data){
				let {phone } =data;
				let params ={
					phone,
					source:19,
					buildingId: this.buildingId,
				}
				// #ifdef MP-BAIDU
                 params.source = 22;
			   // #endif
			   // #ifdef MP-TOUTIAO
			     params.source = 25
				 // #endif
				if (this.$tool.getToken()) {
					getData("/tospurWeb/api/capp/v1/user/getUserPhone", params)
						.then(res => {
							console.log("登录");
							console.log(res);
							uni.makePhoneCall({
							    phoneNumber: res.mobile
							});
						})
						.catch(err => {
							console.log("请求结果报错", err);
						});
				} else {
					console.log('没登录')
					getData("/tospurWeb/capp/v2/user/getUserPhone",params)
						.then(res => {							
							uni.makePhoneCall({
							    phoneNumber: res.mobile
							});
							
						})
						.catch(err => {
							console.log("请求结果报错", err);
						});
				}
			}
			//管家列表
			// initHousekeeperList(){
			// 	let params={
			// 		buildingId:this.buildingId,
			// 		type:'1',//1:楼盘  2:户型
			// 	};
			// 	let self=this;
			// 	getHousekeeperList('',params)
			// 		.then(res=>{
			// 			console.log('管家',res)
			// 			self.managerList =res.list||[];
			// 		})
			// 		.catch(err=>{
			// 			console.log('管家列表-err',err)
			// 		})
			// }
		
		}
	}
</script>

<style lang="scss" scoped>
	.house_manager{
		border-top: 10px solid #f4f8f8;
		padding:42rpx 30rpx 0 30rpx;
		.list{
			padding:40rpx 0;
			
		}
		.list-item{
			width:100%;
			height:180rpx;
			padding-bottom: 30rpx;
			padding-top: 30rpx;
			border-bottom: 1px solid #EDEDED;
			display: flex;
			justify-content: flex-start;
			&:last-child{
				border-bottom:none;
			}
		}
		.item-img{
			width:120rpx;
			height: 120rpx;
			box-sizing: border-box;
			border-radius: 50%;
			overflow: hidden;
			border: 1px solid #ebebeb;
			.img{
				width:100%;
				height: 100%;
			}
		}
		.item-info{
			width:45%;
			margin-left: 20rpx;
		}
		.item-nameInfo{
			display: flex;
		}
		.evaluate {
		  font-size: 16rpx;
		  color: #666;
		  padding: 4rpx 12rpx;
		  background: #B7B8C0;
		  border-radius: 18rpx;
		}
		.user-name {
		  margin-right: 20rpx;
		  font-size: 32rpx;
		  color: #333;
		  font-weight: 700;
		}
		.item-flags{
			margin-top:10rpx;
		}
		.flags-item{
			color:#999999;
			margin-right: 10rpx;
			font-size: 20rpx;
		}
		.item-icons{
			margin-left:50rpx;
			display: flex;
		}
		.icon-message{
			background: url(../../static/live_advisory.png);
			background-repeat: no-repeat;
			background-size:100% 100%;
			// background-position: -207px -32px;
			width: 54rpx;
			height: 54rpx;
		}
		.icon-tel{
			margin-left: 30rpx;
			background: url(../../static/phone.png);
			background-repeat: no-repeat;
			background-size:100% 100%;
			// background-position: -207px -32px;
			width: 54rpx;
			height:54rpx;
		}
	}
</style>
