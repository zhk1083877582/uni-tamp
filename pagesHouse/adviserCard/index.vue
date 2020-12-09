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
				<view class="img" :style="{backgroundImage:`url(${adviserInfo.adviserImg})`}">
				</view>
			</view>
			<view class="info-datail">
				<view class="datail-name">
					<text class="name">{{adviserInfo.name}}</text>
					<text class="role">{{adviserInfo.role}}</text>
				</view>
				<view class="datail-count">
					<view class="year">
						<text class="iconfont iconxingzhuangjiehe"></text>
						<text class="count-flag"></text>
						<text class="year-num">从业{{adviserInfo.year}}年</text>
					</view>
					<view class="serve">
						<text class="iconfont iconjiaoyu"></text>
						<text class="count-flag"></text>
						<text class="serve-num">服务{{adviserInfo.serveNum}}人</text>
					</view>
				</view>
				<view class="datail-tag">
					<text class="tag-item" v-for="(item,index) in adviserInfo.tags" :key="index">{{item}}</text>
				</view>
				<view class="datail-title">
					<text class="datail-title_icon"></text>
					<text class="datail-title_text">擅长领域</text>
				</view>
				<view class="datail-label">
					<text>{{adviserInfo.flag}}</text>
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
				<scroll-view scroll-x="true"  show-scrollbar="true" 
					scroll-with-animation="true" style="height: 100%;white-space: nowrap;">
					<view class="building-item" v-for="(item,index) in listArr" :key="index">
						<buildingCard  ref="reBuildingInfo" :baseInfo="baseInfo"  :buildingId="buildingId">
						</buildingCard>
					</view>
				</scroll-view>
			</view>
			<!-- <buildingCard  ref="reBuildingInfo" :baseInfo="baseInfo"  :buildingId="buildingId">
			</buildingCard> -->
		</view>
		<view class="adviser-bottom">
			<footBottom :istoDetail='false'></footBottom>
		</view>
	</view>
</template>

<script>
	import {
		getBuildingBaseInfo
	} from '@/request/api';
	import buildingCard from '@/pagesHouse/adviserCard/components/buildingCard.vue'
	import footBottom from '@/components/footer/index.vue'
	
	export default {
		components:{
			buildingCard,
			footBottom
		},
		data() {
			return {
				listArr:['1111','222','333'],
				configPicture:'',//楼盘配置图，如果不存在取c-app的封面图
				adviserInfo:{
					adviserImg:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',//管家默认图片
					name:'张晓萌',
					role:'置业顾问',
					year:'5',
					serveNum:'99',
					tags:['气质佳','颜值高','了解投资'],
					flag:'市场分析、热情专业、金融地产'
				},
				baseInfo:{
					favourTitle: '', //图片顶部广告
					referenceAveragePriceType:'',//楼盘价格
					referenceAveragePrice:'',//楼盘价格
					referenceAveragePriceMax:'',//楼盘价格
					buildingAlias:'',//名称
					salesStatusItem:'',//销售状态
					propertyTypeList:[],
					buildingTags:[],
					buildingBrightSpot: '',//介绍
					referenceTotalPriceMin:'',//参考价格
					referenceTotalPriceMax:'',//参考价格
					referenceBuildAreaMin:'',//建筑面积
					referenceBuildAreaMax:'',//建筑面积
					houseType:'',//户型
					openTime:'',//开盘时间
					detailAddress:'',//地址
					updateTime:'',//更新时间
					lat:'',
					lng:'',
					
				},
			}
		},
		onLoad(option){
			console.log('-------进入builddingInfo')
			this.buildingId = option.buildingId||'1155';
			this.initBaseInfo();
		},
		onReady(){
			//设置页面导航条颜色
			uni.setNavigationBarColor({
			    frontColor: '#141414',
			    backgroundColor:'#ffffff',
			})
		},
		methods: {
			// 楼盘-图片信息|基本信息
			initBaseInfo(){
				let params = {
					buildingId: this.buildingId
				};
				let self =this;
				getBuildingBaseInfo('', params)
					.then(res => {
						console.log('----基本信息', res);
						//设置标题
						uni.setNavigationBarTitle({ 
							title: res.buildingAlias,
						});
						
						// 视频 VR  图片
						// self.$refs.reBuildingInfo.doFormatImgList(res.annexs);
						self.configPicture = res.albumCoverPicture;
						let {baseInfo} =self;
						Object.keys(baseInfo).forEach(key => {
							baseInfo[key] = res[key];
						});
						baseInfo['salesStatusItem'] = self.getSalesStatus(res.salesStatus);
						baseInfo['propertyTypeList']=[];
						(res.propertyType||'').split(',').forEach(key=>{
							baseInfo['propertyTypeList'].push( self.getPropertyType(key))
						})
						baseInfo['buildingTags']=(res['buildingTag'] ||'').split(',');
						
					})
					.catch(err => {
						console.log('基本信息-err', err);
					});
			},
			// 销售状态
			getSalesStatus (salesStatus) {
			  // salesStatus:销售状态(1:待售 2:在售 3:售罄  4:在租)
			  let item = {
				  lebel:'',
				  color:''
			  };
			  switch (salesStatus) {
			    case '1':
			      // label = '待售';
				  item={
					  label:'待售',
					  color:'#ffffff'
				  }
			      break;
			    case '2':
			      // label = '在售';
				  item={
					  label:'在售',
					  color:'#ffffff'
				  }
			      break;
			    case '3':
			      // label = '售罄';
				  item={
					  label:'售罄',
					  color:'#ffffff'
				  }
			      break;
			    case '4':
			      // label = '在租';
				  item={
					  label:'在租',
					  color:'#ffffff'
				  }
			      break;
			  }
			  return item
			},
			
			// 物业类型
			getPropertyType(type){
				type = type*1-1;
				return this.$formatter.cache.propertyType[type].value;
			},
		}
	}
</script>

<style lang="scss" scoped>
.adviser-card{
	position: relative;
	padding-bottom: 160rpx;
	background-color:#f3f3f3;
	//封面图
	.configImg{
		height:450rpx;
		text-align: center;
		background:linear-gradient(180deg,#001944, rgba(0,25,68,0) 97%);
		img{
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
		background: url('https://media.tongcehaofang.com/image/default/1BE7B025E8614BAA99A4688F84CCF36D-6-2.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		position: absolute;
		top:330rpx;
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
				// height: 30rpx;
				margin-right: 10rpx;
				padding: 5rpx 10rpx;
				text-align: center;
				// opacity: 0.6;
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
		top:700rpx;
		left:24rpx;
		.adviser-tag_item{
			flex:1;
		}
		.iconfont{
			font-size: 18rpx;
			margin-right: 8rpx;
		}
		
	}
	//顾问名片-item
	.adviser-building{
		margin-top: 40rpx;
		background: #f3f3f3;
		.building-item{
			display: inline-block;
			width:672rpx;
			margin-right: 10rpx;
		}
	}
	// 服务楼盘
	.adviser-buildingInfo{
		width: 100%;
		margin-top:320rpx;
		padding-bottom:50rpx;
		padding-left:24rpx;
		// border: 1px solid red;
		.title {
			display: flex;
			align-items: center;
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
	}
	
	.adviser-bottom{
		width:100%;
		height: 140rpx;
		background: #1e150c;
		position: fixed;
		bottom:0;
		left:0;
	}
}
</style>
