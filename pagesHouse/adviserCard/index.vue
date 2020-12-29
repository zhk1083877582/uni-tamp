<!-- 顾问卡片 -->

<template>
	<view class="adviser-card">
		<!-- 楼盘配置图 -->
		<view class="configImg">
			<image class="img" :src="configPicture" mode=""></image>
		</view>
		<!-- 管家名片 -->
		<view class="adviser-info">
			<view class="info-img">
				<view class="img" :style="{backgroundImage:`url(${adviserInfo.avatarUrl?adviserInfo.avatarUrl+'?x-oss-process=image/resize,h_60,w_60':'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png'})`}">
				</view>
			</view>
			<view class="info-datail">
				<view class="datail-name">
					<text class="name">{{adviserInfo.userName||'--'}}</text>
					<text class="role">{{adviserInfo.roleName||'--'}}</text>
				</view>
				<view class="datail-count">
					<view class="year">
						<text class="iconfont iconxingzhuangjiehe"></text>
						<text class="count-flag"></text>
						<text class="year-num">从业{{adviserInfo.workExperience||'--'}}年</text>
					</view>
					<view class="serve">
						<text class="iconfont iconren"></text>
						<text class="count-flag"></text>
						<text class="serve-num">服务{{adviserInfo.servedPeopleNum||'-'}}人</text>
					</view>
				</view>
				<view class="datail-tag">
					<text class="tag-item" v-for="(item,index) in adviserInfo.personalityTags" :key="index">{{item.paraValue}}</text>
				</view>
				<view class="datail-title">
					<text class="datail-title_icon"></text>
					<text class="datail-title_text">擅长领域</text>
				</view>
				<view class="datail-label">
					<text  v-for="(item,index) in adviserInfo.expertiseFields" :key="index">{{item.paraValue}}</text>
				</view>
			</view>
		</view>
		<!-- 楼盘标记 -->
		<view class="adviser-tag">
			<view class="adviser-tag_item">
				<text class="iconfont iconicon_opening"></text>
				<text>楼盘前线一手资料</text>
			</view>
			<view class="adviser-tag_item">
				<text class="iconfont iconicon_experience"></text>
				<text>专业咨询品质服务</text>
			</view>
			<view class="adviser-tag_item">
				<text class="iconfont iconwodelixiangjia"></text>
				<text>信息真实误导必赔</text>
			</view>
		</view>
		<!-- 服务楼盘 -->
		<view class="adviser-buildingInfo">
			<view class="title">
				<text class="title-icon"></text> 
				<text class="title-text">服务楼盘</text> 
			</view>
			<view class="adviser-building">
				<swiper class="swiper" :style="{height:swiperInfo.itemHeight}" 
					:next-margin="swiperInfo.swiperMargin" :previous-margin="swiperInfo.swiperMargin"  
					:current="swiperInfo.current" :indicator-dots="swiperInfo.indicatorDots" :autoplay="swiperInfo.autoplay"
					:effect3d="true"  circular='true' @change="doChangeSwipe">
					<swiper-item v-for="(item,index) in baseInfo" :key="index" >
						<view class="building-item uni-bg-red" :class="index!=swiperInfo.current?'scale_swiper':''">
							<buildingCard :baseInfo="item" :userId="userId" :buildingId="item.buildingId">
							</buildingCard>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="adviser-bottom">
			<footBottom :istoDetail='false' :userId='userId' v-if="userId"></footBottom>
		</view>
		<u-mask :show="showAuthorize" mask-click-able="false">
			<view class="showAuthorize_warp" @tap.stop>
				<view class="authorize_title">
					授权提醒
				</view>
				<view class="authorize_text">
					您好，为了更好得为您提供服务 请您授权登录
				</view>
				<u-button type="default" class="authorize_btn" hover-class="none" plain="true" :hair-line='false' open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
					确定
				</u-button>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {
		getBuildingBaseInfo
	} from '@/request/api';
	import { getData } from '@/request/api';
	import buildingCard from '@/pagesHouse/adviserCard/components/buildingCard.vue'
	import footBottom from '@/components/footer/index.vue'
	
	export default {
		components:{
			buildingCard,
			footBottom
		},
		data() {
			return {
				userId:'',
				listArr:['1111','222','333'],
				configPicture:'',//楼盘配置图，如果不存在取c-app的封面图
				adviserInfo:{},
				//滑动信息
				swiperInfo:{
					itemHeight:'850rpx',
					swiperMargin:'17rpx',
					current:'1',
					indicatorDots:false,
					autoplay:false
				},
				baseInfo:[],
				beginTime:'',
				showAuthorize:false
			}
		},
		onLoad(option){
			console.log('-------进入管家名片')
			if (option.scene) {
				const scene = decodeURIComponent(option.scene);
				let obj = {};
				scene.split('&').forEach(item => {
					const key = item.split('=')[0];
					obj[key] = item.split('=')[1];
				});
				this.userId = obj.userId;
			} else {
				this.userId = option.userId;
			}
			this.initUserInfo();//管家信息
			this.initBaseInfo();//楼盘信息
			
			
			if(!this.$cache.getCache('M-Token')){
				this.showAuthorize = true;
				this.getPhone()
				// uni.navigateTo({
				// 	url: '/pagesUser/login/login?topath=pagesUser/article/article&articleId=' + option.articleId + '&userId=' + option.userId
				// });
			}else{
				this.showAuthorize = false;
			}
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
		onReady(){
			//设置页面导航条颜色
			uni.setNavigationBarColor({
			    frontColor: '#141414',
			    backgroundColor:'#ffffff',
			})
		},
		methods: {
			// 获取jsCode openid session_key
			getPhone() {
				const self = this;
				uni.login({
					success: res => {
						console.log('---jsCode',res);
						if (res.code) {
							//微信登录成功 已拿到code
							self.jsCode = res.code; //保存获取到的code
							let params = {
								jsCode: res.code,
							};
							let api = '/userAuthServer/noToken/wx/wxAuth' 
							getData(api, params)
								.then(res => {
									console.log('----openid||session_key', res);
									self.openid = res.openid; //openid 用户唯一标识
									self.session_key =res.session_key; //session_key  会话密钥
								})
								.catch(err => {
									console.log('请求结果报错', err);
								});
						} else {
							console.log('登录失败！' + res.errMsg);
						}
					}
				});
			},
			onGetPhoneNumber(e) {
				console.log('-----login-btn', e);
				if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
					//用户决绝授权
					//拒绝授权后弹出一些提示
				} else {
					//允许授权
					let params = {
						iv: e.detail.iv,
						encryData: e.detail.encryptedData,
						sessionKey: this.session_key,
						openId: this.openid,
						loginType: 0
					};
					let api = '/userAuthServer/noToken/wx/wxLogin';
					getData(api, params)
						.then(res => {
							this.$cache.setCache('M-Token', res['token']);
							this.$cache.setCache('Login-Data', res);
							this.showAuthorize = false;
							this.initUserInfo();//管家信息
							this.initBaseInfo();//楼盘信息
						})
						.catch(err => {
							console.log('请求结果报错', err);
						});
				}
			},
			
			doChangeSwipe(val){
				console.log('----swiper',val)
				this.swiperInfo.current = val.detail.current;
				this.currentPlan = 0;
				let item = this.baseInfo[val.detail.current];
				//设置标题
				uni.setNavigationBarTitle({ 
					title: item.buildingAlias||item.buildingName,
				});
				//封面图
				this.configPicture = item.albumCoverPicture;
			},
			
			//获取顾问信息
			initUserInfo(){
				//埋点
				this.buryingPoint.modelType = '4'//前端添加modelType = 4 代表管家名片
				this.buryingPoint.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
				this.buryingPoint.userId = this.userId
				
				//客户足迹埋点
				this.beginTime = (new Date()).getTime()
				this.CustomerTrack.buildingId = ''
				this.CustomerTrack.operateType = '3'
				this.CustomerTrack.createrId = this.userId
				this.CustomerTrack.userId = this.userId
				this.CustomerTrack.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
				this.CustomerTrack.dataId = ''
				let params = {
					userId: this.userId
				};
				let self =this;
				getBuildingBaseInfo('/business/noToken/user/getUserCardDetail', params)
					.then(res => {
						console.log('管家信息',res);
						this.share.title = `置业顾问【${res.userName?res.userName:'-'}】`
						let {expertiseFields=[]} = res;
						for(let i=0,fieldsLen=expertiseFields.length;i<fieldsLen;i++){
							if(i<(fieldsLen-1)){
								expertiseFields[i] +='、';
							}
						}
						res.expertiseFields= expertiseFields;
						if(res.servedPeopleNum!=null){
						  if(parseInt(res.servedPeopleNum) <99){
						    res.servedPeopleNum = 99
						  }
						}else{
						    res.servedPeopleNum = 99
						}
						self.adviserInfo = res
						
					})
					.catch(err => {
						console.log('管家信息', err);
					});
			},
			// 楼盘-图片信息|基本信息
			initBaseInfo(){
				let params = {
					userId: this.userId
				};
				let self =this;
				getBuildingBaseInfo('/business/noToken/home/userServedBuilding', params)
					.then(res => {
						console.log('----楼盘信息', res);
						
						let arr = (res||[]).map(item=>{
							item.referenceAveragePrice = item.referenceAveragePrice?parseInt(item.referenceAveragePrice):item.referenceAveragePrice;
							item.referenceTotalPriceMin = item.referenceTotalPriceMin?parseInt(item.referenceTotalPriceMin):item.referenceTotalPriceMin;
							item.referenceTotalPriceMax = item.referenceTotalPriceMax?parseInt(item.referenceTotalPriceMax):item.referenceTotalPriceMax;
							item.referenceBuildAreaMin = item.referenceBuildAreaMin?parseInt(item.referenceBuildAreaMin):item.referenceBuildAreaMin;
							item.referenceBuildAreaMax = item.referenceBuildAreaMax?parseInt(item.referenceBuildAreaMax):item.referenceBuildAreaMax;
						
							let annexVOS = item.annexVOS||[];
							// console.log('====annexVOS',annexVOS)
							let mp4Arr = annexVOS.filter(item1=>{
								return item1.annexType=='109'
							})
							// console.log('====mp4Arr',mp4Arr)
							let vrArr = annexVOS.filter(item1=>{
								return item1.annexType=='110'||item1.annexType=='302'
							})
							// console.log('====vrArr',vrArr)
							let imgArr = [annexVOS[0]];
							console.log('====imgArr',imgArr)
							item.mp4Picture = mp4Arr[0]?mp4Arr[0].annexPath:'';
							item.vrPicture =  vrArr[0]?vrArr[0].annexPath:'';
							item.imgPicture = imgArr[0]?imgArr[0].annexPath:'';
							item.realImgPath = item.mp4Picture|| item.vrPicture ||item.imgPicture;
							return item
						})
						
						self.baseInfo = arr;
						console.log('----楼盘信息1',arr)
						//设置标题
						uni.setNavigationBarTitle({ 
							title: arr[0].buildingAlias||arr[0].buildingName,
						});
						//封面图
						self.configPicture = arr[0].albumCoverPicture;
					})
					.catch(err => {
						console.log('基本信息-err', err);
					});
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.adviser-card{
	position: relative;
	padding-bottom: 140rpx;
	background-color:#f3f3f3;
	overflow: hidden;
	//封面图
	.configImg{
		height:453rpx;
		text-align: center;
		background:linear-gradient(180deg,#001944, rgba(0,25,68,0) 97%);
		overflow: hidden;
		border-radius: 0 0 25% 25%;
		.img{
			width:100%;
			height: 100%;
		}
	}
	//顾问信息
	.adviser-info{
		width:702rpx;
		height: 350rpx;
		padding: 40rpx 50rpx;
		display: flex;
		// border: 1px solid #FFFFFF;
		background: url('https://media.tongcehaofang.com/image/default/F8EF2B9B78C44DEF9A0C1185C12EF525-6-2.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		top:284rpx;
		left:24rpx;
		.info-img{
			width:180rpx;
			height: 100%;
			// border: 1px solid red;
			.img{
				width:180rpx;
				height: 180rpx;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 50% 50%;
			}
		}
		.info-datail{
			margin-left: 40rpx;
			color: #FFFFFF;
			.name{
				font-size: 40rpx;
				font-weight: 500;
			}
			.role{
				margin-left: 10rpx;
				font-size: 20rpx;
				font-weight: 400;
			}
		}
		
		.datail-count{
			margin-top: 24rpx;
			
			display: flex;
			.year,.serve{
				display: flex;
				align-items: center;
			}
			.serve{
				margin-left: 8rpx;
			}
			.count-flag{
				width:10rpx;
				height: 22rpx;
				display: inline-block;
				background: url('/static/house/circle2x.png');
				background-repeat: no-repeat;
				background-size: cover;
			}
			.year-num,.serve-num{
				font-size: 16rpx;
				height: 22rpx;
				line-height: 22rpx;
				padding:0 10rpx;
				margin-left: 0rpx;
				border-top-right-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
				color: #062471;
				background: #FFFFFF;
				
			}
		}
		.datail-tag{
			margin-top: 24rpx;
			.tag-item{
				min-width: 80rpx;
				margin-right: 10rpx;
				padding: 5rpx 10rpx;
				text-align: center;
				color: #062471;
				font-size: 20rpx;
				background: #FFFFFF;
				border-radius: 4px;
				
				
			}
		}
		.datail-title{
			margin-top: 16rpx;
		}
		.datail-title_icon{
			display: inline-block;
			width: 4rpx;
			height: 17rpx;
			background: #FFFFFF;
		}
		.datail-title_text{
			margin-left:6rpx;
			font-size: 20rpx;
			font-weight: 400;
			color: #FFFFFF;
		}
		
		.datail-label{
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #FFFFFF;
		}
	}	
	
	

	
	// 楼盘tag
	.adviser-tag{
		width: 100%;
		font-size: 20rpx;
		color: #000000;
		display: flex;
		position: absolute;
		top:660rpx;
		left:24rpx;
		.adviser-tag_item{
			flex:1;
		}
		.iconfont{
			font-size: 18rpx;
			margin-right: 8rpx;
		}
		
	}
	
	// 服务楼盘
	.adviser-buildingInfo{
		width: 100%;
		margin-top:270rpx;
		//头部信息
		.title {
			display: flex;
			align-items: center;
			padding-left:24rpx;
			// justify-content: center;
			.title-icon {
				width: 6rpx;
				height: 34rpx;
				background: #062471;
			}
			.title-text{
				width: 136rpx;
				height: 34rpx;
				line-height: 34rpx;
				margin-left: 8rpx;
				font-size: 34rpx;
				font-weight: 600;
				color: #000000;
			}
			
		}
		.adviser-building{
			// border:1px solid red;
		}
		//顾问名片-item
		.adviser-building{
			margin-top: 40rpx;
			background: #f3f3f3;
			.building-item{
				display: inline-block;
				width:702rpx;
				border-radius:10rpx 10rpx;
				overflow: hidden;
				// border:1px solid pink;
				margin: 0 7rpx;
			}
		}
		.scale_swiper{
			transform:scaleY(0.85);
			// opacity: 0.5;
		}
	}
	
	.adviser-bottom{
		width:100%;
		// height: 114rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		position: fixed;
		bottom:0;
		left:0;
	}
}
</style>
