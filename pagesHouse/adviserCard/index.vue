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
						<text class="year-num">从业{{adviserInfo.year}}年</text>
					</view>
					<view class="serve">
						<text class="iconfont iconjiankang"></text>
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
			<view class="top_title">
				<text class="iconfont iconbiaotiyangshi"></text>
				<text class="span">服务楼盘</text> 
				<text class="iconfont iconbiaotiyangshi"></text> 
			</view>
			<buildingInfo  ref="reBuildingInfo" :baseInfo="baseInfo"  :buildingId="buildingId">
			</buildingInfo>
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
	import buildingInfo from '@/pagesHouse/adviserCard/components/buildingInfo.vue'
	import footBottom from '@/components/footer/index.vue'
	
	export default {
		components:{
			buildingInfo,
			footBottom
		},
		data() {
			return {
				configPicture:'',//楼盘配置图，如果不存在取c-app的封面图
				adviserInfo:{
					adviserImg:'/static/house/adviser_default@2x.png',//管家默认图片
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
						uni.setNavigationBarTitle({ title: res.buildingAlias });
						// 视频 VR  图片
						self.$refs.reBuildingInfo.doFormatImgList(res.annexs);
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
	.configImg{
		// width:100%;
		height:450rpx;
		text-align: center;
		// border:1px solid red;
		img{
			width:100%;
			height: 450rpx;
		}
	}
	
	.adviser-info{
		width:702rpx;
		height: 350rpx;
		padding: 40rpx 50rpx;
		display: flex;
		// border: 1px solid #FFFFFF;
		background-image: url('https://media.tongcehaofang.com/image/default/FFC96882569F4FB585D622A5E241A8D2-6-2.jpg');
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
			color: #ebc78e;
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
			.year-num,.serve-num{
				font-size: 16rpx;
				height: 22rpx;
				padding:0 10px;
				margin-left: 10rpx;
				color: #645048;
				background: #f3d6ab;
				// 	background-image: url('https://media.tongcehaofang.com/image/default/FFC96882569F4FB585D622A5E241A8D2-6-2.jpg');
				// 	background-repeat: no-repeat;
				// 	background-size: cover;
			}
		}
		.datail-tag{
			margin-top: 28rpx;
			.tag-item{
				min-width: 80rpx;
				height: 30rpx;
				margin-right: 10rpx;
				padding: 0 10rpx;
				text-align: center;
				opacity: 0.6;
				background: #fae7cc;
				border-radius: 4px;
				font-size: 20rpx;
				color: #ebc78e;
			}
		}
		.datail-title{
			margin-top: 20rpx;
		}
		.datail-title_icon{
			display: inline-block;
			width: 4rpx;
			height: 17rpx;
			background: #ebc78e;
		}
		.datail-title_text{
			margin-left:6rpx;
			font-size: 20rpx;
			font-weight: 400;
			color: #ebc78e;
		}
		
		.datail-label{
			margin-top: 16rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #ebc78e;
		}
	}	
	.adviser-tag{
		width: 100%;
		font-size: 20rpx;
		color: #9f7747;
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
	.adviser-buildingInfo{
		width: 100%;
		margin-top:320rpx;
		padding-bottom:104rpx;
		.top_title {
			font-size: 40rpx;
			line-height: 40rpx;
			font-weight: bold;
			text-align: center;
			color: #fff9ea;
			/* margin-top: 70rpx; */
			margin-bottom: 30rpx;
			display: flex;
			justify-content: center;
			.span{
				background: linear-gradient(315deg,#e6bb78, #fdedd7 53%, #ebc382);
				-webkit-background-clip: text;
				color: transparent;
				padding: 0 20rpx;
			}
			.iconfont {
				width: 38rpx;
				height: 26rpx;
				color: #E6BB78;
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
