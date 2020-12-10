<!-- 置业旅程 -->
<template>
	<view class="journey_ownership_warp">
		
	<!-- 搜索小程序进入 -->
		<view class="home_banner" v-if="!HasToken">
			<u-swiper :list="bannerList" height="813" mode="dot" img-mode='aspectFit' border-radius='24'></u-swiper>
			<view class="login_btn">
				<u-button shape="circle">开启购房旅程</u-button>
			</view>
		</view>
		
	<!-- 置业旅程主体 -->
		<view class='journey_ownership' v-else :style="ishowbuilding ? 'padding-bottom: 57rpx;' : ''">
			<view v-if="ishowbuilding">
				<view class="user_msg">
					<!-- <u-avatar class="" :src="headPortrait" size='100' mode="circle"></u-avatar> -->
					<view class="user_msg_left">
						<view class="avatarTou">
							<open-data type="userAvatarUrl"></open-data>
						</view>
						<view class="name_phone">
							<view class="name" v-show="authorize">
								<open-data type="userNickName"></open-data>
							</view>
							<view class="phone" :class="{'authorize_Y':authorize!=true}">
								{{userPhone}}
							</view>
						</view>
					</view>
					<view class="get_out" @click="showGetOut = true">
						退出登录
					</view>
				</view>
				<swiper :style="{height:swiperHeight}" class="swiper" :current='curr' :next-margin='swiperMargin' :previous-margin='swiperMargin' :indicator-dots="indicatorDots" :autoplay="autoplay" circular='true' @change="changeSwipe" :effect3d="true">
					<swiper-item v-for="(item,index) in buildingArr" :key="index">
						<view class="swiper-item uni-bg-red">
							<view class="swiper_item_H">
								<view class="list_item">
									<view class="list_item_warp" @click="toDetail(item.buildingId)">
										<view class="img_warp">
											<image class="tospur-image" :src="item.albumCoverPicture ? item.albumCoverPicture+'?x-oss-process=image/resize,h_200,w_200' : '/static/pic_default_small@2x.png'"></image>
										</view>
										<view class="item_details">
											<view class="details_title">
												{{item.buildingAlias}}
												<view class="label cl_B">{{item.salesStatus == 1?'待售':item.salesStatus == 2?'在售':item.salesStatus == 3?'售罄':item.salesStatus == 4?'在租':''}}</view>
												<view class="label cl_Y" v-if="!!item.propertyType">{{handlePropertyType(item.propertyType)}}</view>
											</view>
											<view class="price_details">{{$formatter.AveragePrice(item.referenceAveragePriceType,item.referenceAveragePrice,item.referenceAveragePriceMax)}}</view>
											<view class="address_details">{{$formatter.formatArea(item.referenceBuildAreaMin, item.referenceBuildAreaMax)}}<text class="mg_Lf_5">{{item.areaName}}<text v-if="item.streetName">-</text>{{item.streetName}}</text></view>
											<view class="classify">
												<view class="claWarp"><view class="claCon" v-for="(itemT,indexT) in item.buildingTagArr" :key="indexT">{{itemT}}</view></view>
											</view>
										</view>
									</view>
								
									<!-- 方案 -->
									<view class='demand' v-if="isShowPlan">
										<view class="LX_home">
											<view class="top_title"><i class="shu"></i><text class="span">我的理想家</text></view>
												<view class="rows">
													<view class="col">
														<view class="title">置业目的</view>
														<view class="content_text">
															自住
														</view>
													</view>
													<view class="col col_L">
														<view class="title">总价预算</view>
														<view class="content_text">
															800万
														</view>
													</view>
												</view>
												<view class="rows">
													<view class="col">
														<view class="title">意向区域</view>
														<view class="content_text">
															嘉定区、青浦区、青浦区、青浦区
														</view>
													</view>
													<view class="col col_L">
														<view class="title">意向户型</view>
														<view class="content_text">
															800万
														</view>
													</view>
												</view>
												<view class="rows">
													<view class="col col_bottom">
														<view class="title">考虑因素</view>
														<view class="content_text">
															学区、周边配套、现房、车位充足
														</view>
													</view>
												</view>
												<view>
													<view class="check_all" @click="toIdealHome()">查看完整理想家 >></view>
												</view>
										</view>
										<!-- 方案 -->
										<view class="recommend_warp">
											<view class="top_title"><i class="shu"></i><text class="span">看房旅程</text></view>
											<u-tabs
												name='cate_name' 
												:list="tablist" 
												:is-scroll="true" 
												:current="currentPlan" 
												@change="change" 
												active-color="#062471" 
												inactive-color="#999999" 
												font-size="30"
												bar-width='40'
												bar-height='6'
												bg-color='transparent'
												>
												</u-tabs>
											<view class="change_box" @click="toDetail(item.buildingId)">
												<image class="change_image" src="https://media.tongcehaofang.com/image/default/49349F25A6A64438887A037521A164E9-6-2.jpg" mode=""></image>
												<view class="rows">
													<i class="iconfont iconhuxing"></i><text class="lable">户型</text><text class="text">A户型</text>
												</view>
												<view class="rows">
													<i class="iconfont icongeju"></i><text class="lable">格局</text><text class="text">A户型</text>
												</view>
												<view class="rows">
													<i class="iconfont iconfanghao"></i><text class="lable">房号</text><text class="text">A户型</text>
												</view> 
												<view class="rows">
													<i class="iconfont iconmianji"></i><text class="lable">面积</text><text class="text">A户型</text>
												</view> 
												<view class="rows">
													<i class="iconfont iconjiage"></i><text class="lable">价格</text><text class="text" style="color: #FE3A07;">A户型</text>
												</view>
												<view class="rows">
													<i class="iconfont iconshoufu"></i><text class="lable">首付</text><text class="text">A户型</text>
												</view>
												<view class="rows">
													<i class="iconfont iconyuegong"></i><text class="lable">月供</text><text class="text">29000元，每月递减30元</text>
													<view class="tool_tip_warp">
														<i class="iconfont iconwenhao question" @click.stop="showTooltip()"></i>
														<view class="tool_tip" v-show="isShowTooltip">
															<i class="sanJ"></i>
															<view>
																首付35% 贷款30年
															</view>
															<view>
																年贷款利率4.9% 等额本息
															</view>
														</view>
													</view>
												</view>
											</view>
											
											<view class="reason">
												<view class="sanJ"></view>
												<view class="reason_title">
													<i class="iconfont icontuijianliyou"></i><text class="text">推荐理由</text>
												</view>
												<view class="reason_content">
													三室两厅适合一家三口居住，户型正气南北通透。主卧畅享奢适空间，自成一方私密天地全明户型设计室内清新怡人，总价790元符合预算。
												</view>
											</view>
										</view>
										
										<!-- 置业报告列表 -->
										<view class="report_list">
											<view class="mian">
												<view class="timeline-item" v-for="(itemL, index) in dynamicList" :key="index">
													<view class="time">
														<text class="georama"></text>
														<view class="list_top_title">
															<view class="time_text">
																看房时间：{{itemL.time}}
															</view>
															<view class="keeper_msg" @click="tohouseKeeper">
																<view class="keeper_portrait">
																	<image class="img" :src="itemL.avatarTou" mode="circle"></image>
																</view>
																<view class="keeper_name">
																	<text class="keeper_name_text">{{itemL.workName}}</text> <i class="iconfont icondianhua" @click.stop="tellPhone"></i>
																</view>
															</view>
														</view>
														
													</view>
													<view class="status u-line-2">{{itemL.status}}</view>
													<view class="content" @click="toReportDetail">
														<view class="report_title">
															<i class="iconfont iconzhiyebaogao"></i>{{itemL.reportTitle}}<i class="iconfont iconjiantou"></i>
														</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								
									<view v-else>
										<view class="no-data-plan">
											<image class="img" src="https://media.tongcehaofang.com/image/default/A92894D89E954C9198EDDA3349607E4D-6-2.jpg" mode=""></image>
											<view class="text">
												您的置业报告正在定制中，
											</view> 
											<view class="text">
												敬请期待~
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view v-else>
				<view class="no-data-plan no-data-build">
					<image class="img" src="https://media.tongcehaofang.com/image/default/A92894D89E954C9198EDDA3349607E4D-6-2.jpg" mode=""></image>
					<view class="text">
						您的置业报告正在定制中，
					</view> 
					<view class="text">
						敬请期待~
					</view>
				</view>
			</view>
			<u-modal 
				v-model="showGetOut" 
				:content="GetOutcontent" 
				:mask-close-able="true" 
				title='确定退出？' 
				:show-cancel-button="true"
				confirm-color="#062471"
				:title-style="GetOutTitleStyle"
				:content-style="GetOutContentStyle"
				:confirm-style="GetOutConfirmStyle"
				@confirm="GetOutClick">
			</u-modal>
		</view>
	</view>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
			HasToken:true,//搜索小程序进入主页判断是否登录，登录展示置业报告首页，未登录展示banner图
			isShowPlan:true,
			ishowbuilding:true,
			headPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
			swiperMargin:'30rpx',
			swiperHeight: '1000px',
			indicatorDots: false,
			autoplay: false,
			curr:0,
			authorize:true,
			buildingArr:[
				{
					"albumCoverPicture": "https://media.tongcehaofang.com/image/default/F51121C84D59490CA78132AEA616FCE7-6-2.jpg",
					"area": "310101000",
					"areaName": "黄浦区",
					"buildingAlias": "雅丽家院",
					"buildingBrightSpot": "阿斯蒂芬楼盘亮点",
					"buildingId": "1155",
					"buildingName": "雅丽家院",
					"buildingTagArr": ['位置','阳光','庭院','挑高','衣帽间','位置','阳光','庭院','挑高','衣帽间','位置','阳光','庭院','挑高','衣帽间'],
					"createTime": "2020-08-29 14:37:48",
					"detailAddress": "上海市黄浦区中山东二路367号阿斯蒂芬",
					"favourTitle": "阿斯蒂芬楼盘优惠",
					"haveCollection": "false",
					"houseTypeInfos": [],
					"lat": "31.235995",
					"lng": "121.501587",
					"mainPush": "1",
					"propertyType": "1,10,2",
					"referenceAveragePrice": "12000",
					"referenceAveragePriceMax": null,
					"referenceAveragePriceType": "1",
					"referenceBuildAreaMax": "200",
					"referenceBuildAreaMin": "100",
					"referenceTotalPriceMax": "200",
					"referenceTotalPriceMin": "100",
					"salesStatus": "1",
					"streetName": "黄浦滨江",
					"updateTime": "2020-11-12 10:08:27"
				},
				{
					"albumCoverPicture": "https://media.tongcehaofang.com/image/default/F51121C84D59490CA78132AEA616FCE7-6-2.jpg",
					"area": "310101000",
					"areaName": "黄浦区",
					"buildingAlias": "雅丽家院2",
					"buildingBrightSpot": "阿斯蒂芬楼盘亮点",
					"buildingId": "1155",
					"buildingName": "雅丽家院",
					"buildingTagArr": ['位置','阳光','庭院','挑高','衣帽间','位置','阳光','庭院','挑高','衣帽间','位置','阳光','庭院','挑高','衣帽间'],
					"createTime": "2020-08-29 14:37:48",
					"detailAddress": "上海市黄浦区中山东二路367号阿斯蒂芬",
					"favourTitle": "阿斯蒂芬楼盘优惠",
					"haveCollection": "false",
					"houseTypeInfos": [],
					"lat": "31.235995",
					"lng": "121.501587",
					"mainPush": "1",
					"propertyType": "1,10,2",
					"referenceAveragePrice": "12000",
					"referenceAveragePriceMax": null,
					"referenceAveragePriceType": "1",
					"referenceBuildAreaMax": "200",
					"referenceBuildAreaMin": "100",
					"referenceTotalPriceMax": "200",
					"referenceTotalPriceMin": "100",
					"salesStatus": "1",
					"streetName": "黄浦滨江",
					"updateTime": "2020-11-12 10:08:27"
				},
				{
					"albumCoverPicture": "https://media.tongcehaofang.com/image/default/F51121C84D59490CA78132AEA616FCE7-6-2.jpg",
					"area": "310101000",
					"areaName": "黄浦区",
					"buildingAlias": "雅丽家院3",
					"buildingBrightSpot": "阿斯蒂芬楼盘亮点",
					"buildingId": "1155",
					"buildingName": "雅丽家院",
					"buildingTagArr": ['位置','阳光','庭院','挑高','衣帽间','位置','阳光','庭院','挑高','衣帽间','位置','阳光','庭院','挑高','衣帽间'],
					"createTime": "2020-08-29 14:37:48",
					"detailAddress": "上海市黄浦区中山东二路367号阿斯蒂芬",
					"favourTitle": "阿斯蒂芬楼盘优惠",
					"haveCollection": "false",
					"houseTypeInfos": [],
					"lat": "31.235995",
					"lng": "121.501587",
					"mainPush": "1",
					"propertyType": "1,10,2",
					"referenceAveragePrice": "12000",
					"referenceAveragePriceMax": null,
					"referenceAveragePriceType": "1",
					"referenceBuildAreaMax": "200",
					"referenceBuildAreaMin": "100",
					"referenceTotalPriceMax": "200",
					"referenceTotalPriceMin": "100",
					"salesStatus": "1",
					"streetName": "黄浦滨江",
					"updateTime": "2020-11-12 10:08:27"
				}
			],
		
			// 方案
			tablist:[
				{
					cate_name: '方案一'
				}, {
					cate_name: '方案二'
				}, {
					cate_name: '方案三'
				}, {
					cate_name: '方案四'
				}, {
					cate_name: '方案五'
				}, {
					cate_name: '方案六',
					cate_count: 5
				},
			],
			currentPlan: 0,
			isShowTooltip:false,
			
			dynamicList:[
				{
					time: '2020.11.08',
					status:'复看',
					reportTitle:'王先生的置业报告201030',
					workName:'张学友11',
					avatarTou:'https://media.tongcehaofang.com/image/default/DD4DE4B73E4442DEB124D19C702105C0-6-2.jpg?x-oss-process=image/resize,h_120,w_120'
				},
				{
					time: '2020.12.09',
					status:'首次带看',
					reportTitle:'王先生的置业报告201020',
					workName:'张学友',
					avatarTou:'https://media.tongcehaofang.com/image/default/DD4DE4B73E4442DEB124D19C702105C0-6-2.jpg?x-oss-process=image/resize,h_120,w_120'
				}
			],
			userPhone:'',
			
			//退出登录参数
			showGetOut:false,
			GetOutcontent:'退出登录后将无法查看订单，重新登录即可查看',
			GetOutTitleStyle:{
				fontWeight:'600',
				color:'#141414',
			},
			GetOutContentStyle:{
				fontSize: '34rpx',
				color: '#999999',
				lineHeight: '48rpx'
			},
			GetOutConfirmStyle:{
				borderLeft:'1px solid #EBEEF4',
				fontWeight:'600'
			},
			
			// 未登录时首页banner数据
			bannerList: [{
					image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
					title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
					title: '身无彩凤双飞翼，心有灵犀一点通'
				},
				{
					image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
					title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				}
			],
		};
	},
	computed: {},
	watch: {},
	methods: {
		// 退出登录
		GetOutClick(){
			console.log('退出')
		},
		// 跳转楼盘详情
		toDetail(){
			console.log('跳转楼盘详情')
		},
		changeSwipe(val){
			console.log(val)
		},
		//气泡显示
		showTooltip(){
			this.isShowTooltip = !this.isShowTooltip
		},
		// 去管家名片
		tohouseKeeper(){
			uni.navigateTo({
				url: '/pagesHouse/adviserCard/index?buildingId=' + 1155//+ this.buildingId
			});
		},
		// 拨打电话
		tellPhone(){
			console.log('拨打电话')
			uni.makePhoneCall({
				// 手机号
				phoneNumber: '114',
				// 成功回调
				success: (res) => {
					// potentialCustomersInfo('',saveParams)
				},
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
				}
			});
		},
		handlePropertyType(key){
			let newKey = ''
			if(key.length>1){
				newKey = key.substring(0,1)
			}else{
				newKey = key
			}
			return this.$formatter.switchName('propertyType',newKey)
		},
		change(index) {
			this.currentPlan = index;
		},
		toReportDetail(){
			uni.navigateTo({
				url: '../../pagesReport/reportDetail/index?buildingId=' + 123//+ this.buildingId
			});
		},
		toIdealHome(){
			uni.navigateTo({
				url: '../../pagesReport/idealHome/index?buildingId=' + 123//+ this.buildingId
			  });
		}
	},
	created() {
	
	},
	mounted() {
		let self = this;
		uni.getSystemInfo({
		　　success: function(res) { // res - 各种参数
		// 　　   console.log(res,res.windowHeight); // 屏幕的高度 
				
		　　    let info = uni.createSelectorQuery().select(".swiper_item_H");
		　　　  　info.boundingClientRect(function(data) { //data - 各种参数
		// 　　　  　console.log(data,data.height)  // 获取元素高度
					self.swiperHeight = data.height +'px'
		　　    }).exec()
		       }
		});
	},
	onLoad(option){
		// this.getUserInfo();
		let loginData = this.$cache.getCache('Login-Data').customerInfo
		this.userPhone = loginData.phone;
		this.HasToken = this.$cache.getCache('M-Token')?true:false;
	},
	onReady(){
		
	},
	onShow(){
		
	}
}
</script>
<style lang='scss' scoped>
.journey_ownership_warp{
	background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
	height: 100%;
	.home_banner{
		height: 813rpx;
		width: 610rpx;
		margin: 0 auto;
		background-color: #FFFFFF;
		position: absolute;
		top: 90rpx;
		left: 70rpx;
		.login_btn{
			display: flex;
			justify-content: center;
			padding-top: 72rpx;
			/deep/.u-btn{
				background: linear-gradient(180deg,#ffeda8, #ffce89);
				padding: 31rpx 113rpx;
				color: #062471;
				font-size: 36rpx;
				font-weight: 600;
				height: auto;
				line-height: 36rpx;
			}
		}
	}
	.journey_ownership{
		background: linear-gradient(181deg, #0A2056, #0D255F, #062471 99%);
		.user_msg{
			display: flex;
			justify-content: space-between; 
			padding: 40rpx;
			.user_msg_left{
				display: flex;
				.avatarTou{
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 10rpx solid #123489;
				}
				.name_phone{
					margin-left: 20rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 32rpx;
					.name{
						margin-top: 18rpx;
						margin-bottom: 16rpx;
					}
					.phone{
						font-size: 28rpx;
						font-weight: 400;
						font-weight: 400;
					}
					.authorize_Y{
						line-height: 100rpx;
					}
				}
			}
			.get_out{
				padding: 13rpx 20rpx;
				font-size: 24rpx;
				line-height: 24rpx;
				background: linear-gradient(0deg,#113389, #2b53b8 93%);
				border-radius: 4rpx;
				color: #FFFFFF;
				display: flex;
				flex-direction: column;
				align-self: center;
			}
		}
		.swiper{
			/* padding-top: 20rpx; */
			height: 232rpx;
			.list_item{
				padding: 30rpx 32rpx;
				position: relative;
				background-color: #FFFFFF;
				margin: 0 10rpx;
				border-radius: 20rpx;
				.list_item_warp{
					display:flex;
					overflow: hidden;
					.img_warp{
						width: 210rpx;
						height: 170rpx;
						border-radius: 10rpx;
						overflow: hidden;
						position: relative;
						.tospur-image{
							height: 100%;
							width: 100%;
							border-radius: 8rpx;
						}
					}
					.item_details{
						padding-left: 20rpx;
						flex: 1;
						.details_title{
							font-size: 32rpx;
							line-height: 40rpx;
							color: #333333;
							font-weight: 700;
							display: flex;
							.label{
								border-radius:5rpx;
								font-size: 22rpx;
								color: #ffffff;
								padding: 5rpx 9rpx;
								display: inline-block;
								text-align: center;
								line-height: 22rpx;
								margin-left: 6rpx;
								vertical-align: text-top;
								margin-top: 4rpx;
								display: flex;
								align-self: center;
							}
							.cl_B{
								margin-right: 8rpx;
								margin-left: 10rpx;
								background-color: #2951B8;
								border: 1px solid #2951B8;
							}
							.cl_Y{
								border: 1px solid #2951B8;
								color: #2951B8;
							}
						}
			
						.price_details{
							font-size: 32rpx;
							color: #F95424;
							line-height: 30rpx;
							padding:16rpx 0 14rpx 0;
							font-weight: 600;
							.price_unit{
								font-size: 20rpx;
								line-height: 30rpx;
								margin-left: 4rpx;
							}
						}
			
						.address_details{
							font-size: 24rpx;
							color: #C4C0C5;
							line-height: 24rpx;
							padding-bottom: 16rpx;
							.mg_Lf_5{
								margin-left: 20rpx;
							}
						}
			
						.classify{
							font-size: 20rpx;
							color: #999999;
							overflow-y: hidden;
							overflow-x: scroll;
							height: 30rpx;
							&::-webkit-scrollbar {display:none}
							.claWarp{
								height: 100%;
								width: 200rpx;
								display: flex;
							}
							.claCon{
								display: block;
								float: left;
								margin-right: 8rpx;
								height: 30rpx;
								line-height: 30rpx;
								padding: 0 6rpx;
								background-color: #F1F9FF;
								border-radius:4rpx;
								white-space: nowrap;
							}
						}    
					}
				}
			}
		}


		.demand{
			background-color: #FFFFFF;
			border-radius: 20rpx;
			.top_title {
				font-weight: bold;
				text-align: left;
				color: #062471;
				/* margin-top: 70rpx; */
				padding: 56rpx 0;
				display: flex;
				justify-content: start;
				.span{
					color: #062471;
					-webkit-background-clip: text;
					display: block;
					font-size: 34rpx;
					line-height: 34rpx;
				}
				.shu{
					width: 6rpx;
					margin-right: 8rpx;
					background-color: #062471;
					display: inline-block;
					height: 34rpx;
				}
			}
			/* 理想家 */
			.LX_home{
				.text_title{
					text-align: center;
					font-weight: 600;
					margin-bottom: 30rpx;
				}
				.rows{
					border-top: 2rpx solid #EBEEF4;
					display: flex;
					text-align: center;
					justify-content: space-between;
					/* margin: 0 24rpx; */
					border: 1px solid #EBEEF4;
					border-bottom:0;
					/* background: #FCF7EE; */
					.col_L{ border-left: 2rpx solid #EBEEF4;}
					/* .col_R{flex: 1.5 !important;} */
					.col_bottom{
						border-bottom: 2rpx solid #EBEEF4;
					}
					.col{
						flex: 1;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;
						padding: 24rpx 10rpx;
						.title{
							font-size: 24rpx;
							font-weight: 500;
							color: #999999;
							line-height: 33rpx;
							margin-bottom: 16rpx;
						}
						.content_text{
							font-size: 28rpx;
							font-weight: 600;
							color: #141414;
							line-height: 28rpx;
							overflow:hidden;
							text-overflow:ellipsis;
							white-space:nowrap
						}
					}
				}
				.check_all{
					text-align: center;
					font-size: 24rpx;
					font-weight: 400;
					text-decoration: underline;
					color: #062471;
					line-height: 33rpx;
					padding: 20rpx  0 28rpx 0;
				}
			}
			
			
			/* 方案 */
			.recommend_warp{
				.title{
					font-size: 34rpx;
					font-weight: 600;
					color: #2b2014;
					line-height: 34rpx;
					margin: 30rpx 0 20rpx 0;
					.title_icon{
						display: inline-block;
						width: 6rpx;
						height: 34rpx;
						background: #ecce9e;
						margin-right: 6rpx;
						vertical-align: bottom;
					}
				}
				.change_box{
					/* overflow: hidden; */
					border: 2rpx solid #EBEEF4;
					margin-top: 30rpx;
					.change_image{
						width: 100%;
						height: 342rpx;
					}
					/deep/uni-image{
						display: block;
					}
					.rows{
						padding: 28rpx;
						padding-left: 25rpx;
						border-top: 2rpx solid #EBEEF4;
						display: flex;
						.iconfont{
							width: 28rpx;
							height: 28rpx;
							margin-right: 15rpx;
							color: #999999;
						}
						.lable{
							font-size: 28rpx;
							color: #999999;
							line-height: 30rpx;
						}
						.text{
							font-size: 28rpx;
							font-weight: 400;
							color: #141414;
							line-height: 30rpx;
							margin-left: 55rpx;
						}
						.question{
							margin-left: 10rpx;
							width: 32rpx;
							height: 32rpx;
							color: #333333;
						}
						.tool_tip_warp{
							position: relative;
							.tool_tip{
								z-index:100;
								width: 331rpx;
								position: absolute;
								opacity: 0.9;
								background: #0B2056;
								padding: 18rpx 24rpx;
								font-size: 24rpx;
								color: #FFFFFF;
								line-height: 36rpx;
								top: 50rpx;
								left: -250rpx;
								.sanJ{
									content: "";
									position: absolute;
									top: -30rpx;
									left: 257rpx;
									border-width: 20rpx;
									border-style: solid;
									border-color: transparent transparent #0B2056 transparent;
								}
							}
						}
					}
				}
				.reason{
					background: #ffffff;
					box-shadow: 0px 0px 8px 0px rgba(6,36,113,0.1);
					border: 1px solid #EBEEF4;
					border-radius: 0px 2px 4px 2px;
					padding: 32rpx 32rpx 32rpx 32rpx;
					margin-top: 32rpx;
					position: relative;
					.reason_title{
						display: flex;
						margin-bottom: 23rpx;
						.text{
							font-size: 28rpx;
							text-align: left;
							color: #999999;
							line-height: 28rpx;
							margin-left: 13rpx;
						}
						.icontuijianliyou{
							color: #999999
						}
					}
					.reason_content{
						font-size: 28rpx;
						font-weight: 400;
						text-align: justify;
						color: #2b2014;
						line-height: 52rpx;
						text-indent: 50rpx;
					}
					.sanJ:after{
						content: "";
						position: absolute;
						top: -43rpx;
						left: 116rpx;
						border-width: 24rpx;
						border-style: solid;
						border-color: transparent transparent #FFFFFF transparent;
					}
					.sanJ:before{
						content: "";
						position: absolute;
						top: -45rpx;
						left: 118rpx;
						border-width: 22rpx;
						border-style: solid;
						border-color: transparent transparent #EBEEF4 transparent;
					}
				}
			}
			
		}
		
		.report_list {
				position: relative;
				padding-bottom: 31rpx;
				&:before {
					content: "";
					position: absolute;
					display: block;
					width: 2px;
					background: #EBEEF4;
					top: 40rpx;
					left: 7rpx;
					height: 84%;
				}
		
			.mian {
				padding-bottom: 78rpx;
				margin-bottom: 98rpx;
			}
		
			.timeline-item {
				padding: 32rpx 0rpx 20rpx 0rpx;
				.time {
					position: relative;
					.georama {
						position: absolute;
						top: 10rpx;
						left: 0px;
						box-sizing: border-box;
						width: 18rpx;
						height: 18rpx;
						background-color: #062471;
						border-radius: 18rpx;
						z-index: 700;
					}
					.list_top_title{
						display: flex;
						justify-content: space-between;
						.time_text{
							color: #999999;
							font-size: 24rpx;
							padding-left: 36rpx;
							padding-top: 4rpx;
						}
						.keeper_msg{
							display: flex;
							.keeper_portrait{
								.img{
									width: 40rpx;
									height: 40rpx;
									border-radius: 50%;
								}
							}
							.keeper_name{
								font-size: 24rpx;
								color: #424d5d;
								line-height: 33rpx;
								padding-top: 4rpx;
								.keeper_name_text{
									padding: 0 15rpx;
								}
								.iconfont{
									font-size: 24rpx;
									color: #062471;
									display: inline-block;
								}
							}
						}
					}
				}
		
				.status {
					padding: 18rpx 0px 30rpx 36rpx;
					font-size: 30rpx;
					color: #25252D;
					font-weight: 700;
					line-height: 46rpx;
				}
		
				.content {
					padding: 4rpx 0px 0px 36rpx;
					.report_title{
						padding: 26rpx 19rpx 26rpx 32rpx;
						font-size: 28rpx;
						color: #666666;
						line-height: 28rpx;
						background: #F8F9FB;
						position: relative;
						.iconfont{
							vertical-align: middle;
							display: inline-block;
							color: #666666;
						}
						.iconzhiyebaogao{
							font-size: 38rpx;
							margin-right: 22rpx;
						}
						.iconjiantou{
							font-size: 20rpx;
							position: absolute;
							right: 19rpx;
						}
					}
				}
			}
		}
		.no-data-build{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -75%);
		}
		.no-data-plan{
			padding-top: 80rpx;
			padding-bottom: 135rpx;
			.img{
				padding-bottom: 49rpx;
				margin: 0 auto;
				display: flex;
				width: 278rpx;
				height: 330rpx;
			}
			.text{
				text-align: center;
				font-size: 28rpx;
				color: #062471;
				line-height: 44rpx;
			}
		}
	}
}
</style>
