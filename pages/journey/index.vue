<!-- 置业旅程 -->
<template>
	<view class='journey_ownership'>
		<view v-if="ishowbuilding">
			<view class="user_msg">
				<u-avatar class="avatarTou" :src="headPortrait" size='100' mode="circle"></u-avatar>
				<view class="name_phone">
					<view class="name" v-show="authorize">
						李多多
					</view>
					<view class="phone" :class="{'authorize_Y':authorize!=true}">
						15793802730
					</view>
				</view>
			</view>
			<swiper :style="{height:swiperHeight}" class="swiper" :current='curr' :next-margin='swiperMargin' :previous-margin='swiperMargin' :indicator-dots="indicatorDots" :autoplay="autoplay" circular='true' @change="changeSwipe">
				<swiper-item v-for="(item,index) in buildingArr" :key="index">
					<view class="swiper-item uni-bg-red">
						<view class="swiper_item_H">
							<view class="list_item" @click="toDetail(item.buildingId)">
								<view class="list_item_warp">
									<view class="img_warp">
										<image class="tospur-image" :src="item.albumCoverPicture ? item.albumCoverPicture+'?x-oss-process=image/resize,h_200,w_200' : '/static/pic_default_small@2x.png'"></image>
									</view>
									<view class="item_details">
										<view class="details_title">
											{{item.buildingAlias}}
											<view class="label cl_B" v-if="!!item.propertyType">{{handlePropertyType(item.propertyType)}}</view>
											<view class="label cl_Y">{{item.salesStatus == 1?'待售':item.salesStatus == 2?'在售':item.salesStatus == 3?'售罄':item.salesStatus == 4?'在租':''}}</view>
										</view>
										<view class="price_details">{{$formatter.AveragePrice(item.referenceAveragePriceType,item.referenceAveragePrice,item.referenceAveragePriceMax)}}</view>
										<view class="address_details">{{$formatter.formatArea(item.referenceBuildAreaMin, item.referenceBuildAreaMax)}}<text class="mg_Lf_5">{{item.areaName}}<text v-if="item.streetName">-</text>{{item.streetName}}</text></view>
										<view class="classify">
											<view class="claWarp"><view class="claCon" v-for="(itemT,indexT) in item.buildingTagArr" :key="indexT">{{itemT}}</view></view>
										</view>
									</view>
								</view>
							</view>
							
							<!-- 方案 -->
							<view class='demand' v-if="isShowPlan">
								<view class="LX_home">
									<view class="top_title">
										<view class="avatarTou">
											<i class="iconfont iconwodelixiangjia"></i>
										</view>
									</view>
									<view class="text_title">
										<text>我的理想家</text>
									</view>
									
									<view class="rows">
										<view class="col col_L">
											<view class="title">意向户型</view>
											<view class="content_text">
												三室、四室
											</view>
										</view>
										<view class="col col_R">
											<view class="title">意向区域</view>
											<view class="content_text">
												嘉定区、青浦区、青浦区、青浦区
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
									<view class="title">
										<i class="title_icon"></i>
										看房旅程
									</view>
									<u-tabs
										name='cate_name' 
										:list="tablist" 
										:is-scroll="true" 
										:current="currentPlan" 
										@change="change" 
										active-color="#ECCE9E" 
										inactive-color="#928B94" 
										font-size="30"
										bar-width='40'
										bar-height='6'
										bg-color='transparent'
										>
										</u-tabs>
									<view class="change_box">
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
											<i class="iconfont iconjiage"></i><text class="lable">价格</text><text class="text" style="color: #FF5835;">A户型</text>
										</view>
										<view class="rows">
											<i class="iconfont iconshoufu"></i><text class="lable">首付</text><text class="text">A户型</text>
										</view>
										<view class="rows">
											<i class="iconfont iconyuegong"></i><text class="lable">月供</text><text class="text">29000元，每月递减30元</text>
											<view class="tool_tip_warp">
												<i class="iconfont iconwenhao question" @click="showTooltip()"></i>
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
													<view class="keeper_msg">
														<view class="keeper_portrait">
															<image class="img" :src="itemL.avatarTou" mode="circle"></image>
														</view>
														<view class="keeper_name">
															<text class="keeper_name_text">{{itemL.workName}}</text> <i class="iconfont icondianhua"></i>
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
									<image class="img" src="https://media.tongcehaofang.com/image/default/A1A8C78B5F8D447E90632C0198BBDC8A-6-2.jpg" mode=""></image>
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
				</swiper-item>
			</swiper>
		</view>
		<view v-else>
			<view class="no-data-plan no-data-build">
				<image class="img" src="https://media.tongcehaofang.com/image/default/A1A8C78B5F8D447E90632C0198BBDC8A-6-2.jpg" mode=""></image>
				<view class="text">
					您的置业报告正在定制中，
				</view> 
				<view class="text">
					敬请期待~
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {
	},
	data() {
		return {
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
			tablist:[{
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
			}],
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
			]
		};
	},
	onLoad(){
		uni.navigateTo({
		   url: '/pagesHouse/house/house'
		});

	},
	computed: {},
	watch: {},
	methods: {
		changeSwipe(val){
			console.log(val)
		},
		//气泡显示
		showTooltip(){
			console.log(123)
			this.isShowTooltip = !this.isShowTooltip
		},
		toDetail(){
			uni.navigateTo({
			   url: '/pagesHouse/house/house'
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
			console.log(this.currentPlan)
		},
		getUserInfo(){
			uni.login({
			  provider: 'weixin',
			  success: function (loginRes) {
			    console.log(loginRes);
			    // 获取用户信息
			    uni.getUserInfo({
			      provider: 'weixin',
			      success: function (infoRes) {
			        console.log('用户昵称为：' + infoRes.userInfo.nickName);
			      },
				  fail:function(err){
					  console.log(err)
				  }
			    });
			  }
			});
		},
		toReportDetail(){
			console.log(123)
			uni.navigateTo({
				url: '../../pagesReport/reportDetail/index?buildingId=' + 123//+ this.buildingId
			});
		},
		toIdealHome(){
			console.log(123123)
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
		　　   console.log(res,res.windowHeight); // 屏幕的宽度 
				
		　　    let info = uni.createSelectorQuery().select(".swiper_item_H");
		　　　  　info.boundingClientRect(function(data) { //data - 各种参数
		　　　  　console.log(data,data.height)  // 获取元素宽度
					self.swiperHeight = data.height +'px'
		　　    }).exec()
		       }
		});
	},
	onLoad(option){
		// this.getUserInfo();
		console.log(123123)
	},
	onReady(){
		console.log(789789)
	},
	onShow(){
		console.log(456456)
	}
}
</script>
<style lang='scss' scoped>
.journey_ownership{
	padding-bottom: 57rpx;
	.user_msg{
		display: flex;
		padding: 40rpx;
		.name_phone{
			margin-left: 20rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #edc687;
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
	.swiper{
		padding-top: 20rpx;
		height: 232rpx;
		.list_item{
			padding: 30rpx 0;
			padding-left: 16rpx;
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
							border-radius:4rpx;
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
							background-color: #9F7747;
						}
						.cl_Y{
							border: 1px solid #9f7747;
							border-radius: 5px;
							color: #9f7747;
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
		margin: 80rpx 10rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		
		/* 理想家 */
		.LX_home{
			.top_title{
				display: flex;
				justify-content: center;
				padding: 40rpx 0 20rpx 0;
				background: url(https://media.tongcehaofang.com/image/default/64AF86C0446F40AFB7F07635306C60D7-6-2.jpg) no-repeat;
				background-position: top center;
				background-size: 100% 85rpx;
				.avatarTou{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					font-size: 46rpx;
					background: #382C1F;
					position: relative;
					.iconfont{
						background: linear-gradient(135deg, #E6BB78, #FDEDD7 33%, #EBC382);
						-webkit-background-clip: text;
						color: transparent;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%,-50%);
					}
				}
			}
			.text_title{
				text-align: center;
				font-weight: 600;
				margin-bottom: 30rpx;
			}
			.rows{
				border-top: 2rpx solid #F6F4F9;
				display: flex;
				text-align: center;
				justify-content: space-between;
				margin: 0 24rpx;
				border: 1px solid #F6F4F9;
				border-bottom:0;
				background: #FCF7EE;
				.col_L{border-right: 2rpx solid #F6F4F9; border-left: 2rpx solid #F6F4F9;}
				.col_R{flex: 1.5 !important;}
				.col{
					flex: 1;
					padding: 24rpx 0;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					word-break: break-all;
					.title{
						font-size: 24rpx;
						font-weight: 500;
						color: #928b94;
						line-height: 33rpx;
						margin-bottom: 16rpx;
					}
					.content_text{
						font-size: 28rpx;
						font-weight: 600;
						color: #2b2014;
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
				color: #a0a1a9;
				line-height: 33rpx;
				padding: 20rpx  0 28rpx 0;
			}
		}
		
		
		/* 方案 */
		.recommend_warp{
			padding: 0 24rpx;
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
				border: 2rpx solid #f6f4f9;
				.change_image{
					width: 622rpx;
					height: 342rpx;
				}
				/deep/uni-image{
					display: block;
				}
				.rows{
					padding: 28rpx;
					padding-left: 25rpx;
					border-top: 2rpx solid #f6f4f9;
					display: flex;
					.iconfont{
						width: 28rpx;
						height: 28rpx;
						margin-right: 15rpx;
					}
					.lable{
						font-size: 28rpx;
						color: #ae9d8a;
						line-height: 30rpx;
					}
					.text{
						font-size: 28rpx;
						font-weight: 400;
						color: #2b2014;
						line-height: 30rpx;
						margin-left: 55rpx;
					}
					.question{
						margin-left: 10rpx;
						width: 32rpx;
						height: 32rpx;
					}
					.tool_tip_warp{
						position: relative;
						.tool_tip{
							z-index:100;
							width: 331rpx;
							position: absolute;
							opacity: 0.9;
							background: #251b11;
							padding: 18rpx 24rpx;
							font-size: 24rpx;
							color: #b2a18f;
							line-height: 36rpx;
							top: 60rpx;
							left: -250rpx;
							.sanJ{
								content: "";
								position: absolute;
								top: -38rpx;
								left: 255rpx;
								border-width: 20rpx;
								border-style: solid;
								border-color: transparent transparent #251b11 transparent;
							}
						}
					}
				}
			}
			.reason{
				border: 1px solid #f6f4f9;
				border-radius: 0px 2px 4px 2px;
				padding: 54rpx 24rpx 17rpx 24rpx;
				margin-top: 34rpx;
				position: relative;
				box-shadow: 0px 0px 8px 0px rgba(208,182,134,0.44); 
				.reason_title{
					display: flex;
					margin-bottom: 23rpx;
					.text{
						font-size: 28rpx;
						text-align: left;
						color: #ae9d8a;
						line-height: 28rpx;
						margin-left: 13rpx;
					}
					.icontuijianliyou{
						color: #FFC97E
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
					border-width: 25rpx;
					border-style: solid;
					border-color: transparent transparent #FFFFFF transparent;
				}
				.sanJ:before{
					content: "";
					position: absolute;
					top: -45rpx;
					left: 118rpx;
					border-width: 24rpx;
					border-style: solid;
					border-color: transparent transparent #f6f4f9 transparent;
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
				background: #F6F4F9;
				top: 40rpx;
				left: 46rpx;
				height: 85%;
			}
	
		.mian {
			padding-bottom: 78rpx;
			margin-bottom: 98rpx;
		}
	
		.timeline-item {
			padding: 32rpx 40rpx 20rpx 40rpx;
			.time {
				position: relative;
				.georama {
					position: absolute;
					top: 10rpx;
					left: 0px;
					box-sizing: border-box;
					width: 18rpx;
					height: 18rpx;
					background-color: #B2A18F;
					border-radius: 18rpx;
					z-index: 700;
				}
				.list_top_title{
					display: flex;
					justify-content: space-between;
					.time_text{
						color: #b2a18f;
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
								color: #dda042;
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
					color: #796650;
					line-height: 28rpx;
					background: #FCF7EE;
					position: relative;
					.iconfont{
						vertical-align: middle;
						display: inline-block;
						color: #402506;
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
			color: #b2a18f;
			line-height: 44rpx;
		}
	}
}
</style>
