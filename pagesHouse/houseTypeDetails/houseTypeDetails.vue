<template>
	<view class="houseTypeDetailsAll">
		<view class="swiperBox" :class="{'swiperBox1': tanFlag}">
			<u-icon name="close" color="#fff" v-if="tanFlag" size="32" class="tanClose" @click="tanclose"></u-icon>
			<view class="swiperNum" v-if="tanFlag">
				{{curr+1}}/{{houseBan.length}}
			</view>
			<swiper class="swiper" @change='swipeChange' :current='curr'>
				<swiper-item v-for="(item,index) in houseBan" :key='index' @click="swipeClick(item, index)">
					<image :src="item.path" class="infoTu"></image>
					<image v-if="item.type == 1" class="icon" src="/static/VrIcon.png"></image>
				</swiper-item>
			</swiper>

			<view class="custom-indicator" v-if="!tanFlag">
				<!-- <text class="biao" v-if="tanFlag" @click="spanSwipeClick(item)" :class="{'active': item.type == currentType}" v-for="(item, index) in houseBan1"
				 :key="index">
					{{item.type==1 ? 'VR' : item.type==2 ? '户型图('+ item.imgTotal+')' : item.type==3 ? '样板间('+ item.imgTotal+')' : '-'}}
				</text> -->
				<text class="biao"  @click="spanSwipeClick(item)" :class="{'active': item.type == currentType}"
				 v-for="(item, index) in houseBan1" :key="index">
					{{item.type==1 ? 'VR' : item.type==2 ? '户型图' : item.type==3 ? '样板间' : '-'}}
				</text>
			</view>
		</view>



		<view class="room-des">
			<view class="title">
				<view class="h3">
					{{houseInfo.houseType}}
					<text class="iconfont iconhuo"></text>
				</view>
				<view class="priceDetail">
					<!--两种状态  有价格  第二无价格-->
					<view class="price1" v-if="houseInfo.totalPrice">
						总价约
						<text>{{houseInfo.totalPrice}}万</text>
					</view>
					<view class="price1" v-else><text>总价待定</text></view>
				</view>
			</view>

			<view class="description">
				<text class="desSale" :class="'sale'+houseInfo.salesStatus">{{$tool.salesStatusFlag(houseInfo.salesStatus)}}</text>
				<view class="houTag">
					<text v-for="(item,index) of houseInfo.houseTypeTag" :key="index">{{item}}</text>
				</view>
				
			</view>
			<view class="introduction">
				<!-- <span>建面约{{houseInfo.constructionArea}} ㎡</span>
				<span>朝向{{houseInfo.oriented | orientedFlag}}</span>-->
				<text v-if="'houseInfo.constructionArea'">建面约{{houseInfo.constructionArea}}㎡</text>
				<text v-else>建面待定</text>
				<text v-if="'houseInfo.oriented'">朝向{{$tool.orientedFlag(houseInfo.oriented)}}</text>
				<text v-else>朝向待定</text>
				{{houseInfo.houseTypeName}}
			</view>
			<view class="address">
				<text class="addressSuo">所属楼盘：</text>
				<text class="adressLou" @click="buildingClick">
					{{houseInfo.buildingName}}
				</text>
				<text class="iconfont iconarrow_more"></text>
			</view>
			<!-- <view class="address">
				<span>首付咨询：</span>
				<em @click="chatMess(houseInfo)">
						一键咨询首付情况
					<i class="iconfont iconarrow_right"></i>
				</em>
			</view> -->
			<view class="priceDisplay" v-if="houseInfo.totalPrice">
				<view class="priceDisplayCont">
					<!--(data.totalPrice*0.35).toFixed(2)-->
					<view class="title">首付3.5成约{{(houseInfo.totalPrice*0.35).toFixed(2)}}万 · 商贷30年 · 等额本息</view>
					<view class="priceShow">
						<view class="priceShow1">
							<view>贷款总额</view>
							<!--this.loanData.loanTotal = (data.totalPrice*0.65).toFixed(2)-->
							<view>{{(houseInfo.totalPrice*0.65).toFixed(2)}}万元</view>
						</view>
						<!-- var obj = calculate(this.loanData) -->
						<view class="priceShow1">
							<view>利息总额</view>
							<!-- totalRepayment = (Number(obj.interest.left.replace(/,/g, ""))/10000).toFixed(2)-->
							<view>{{totalRepayment}}万元</view>

						</view>
						<view class="priceShow1">
							<view>每月应还</view>
							<!--  monthPrice = obj.repayments.left+'.'+obj.repayments.right -->
							<view>{{monthPrice}}元</view>
						</view>
					</view>
				</view>
				<view class="priceDisplay_link" @click="linkJump">编辑条件</view>
			</view>
			<view class="loanCalculation" v-else @click="linkJump">贷款计算</view>
		</view>

		<!--户型点评-->
		<view class="unitReviews" v-if="viewsFlag">
			<view class="unitReviewsCont">
				<view class="dianPing">户型点评</view>
				<view class="dianDl" v-for="(itemHou,index) in houseInfo.houseTypeReviews" :key="index">
					<view class="dianDt">{{itemHou.reviewTitle}}</view>
					<view class="dianDd">{{itemHou.reviewContent}}</view>
				</view>
			</view>
		</view>

		<!--推荐户型-->
		<view class="recommendType" v-if="houseTypeLength">
			<view class="unitReviewsCont">
				<view class="unitReviewsContH3">推荐户型</view>
				<view class="typeListCont">
					<view class="typeListContLi" v-for="item in houseInfo.houseTypeListVOS" :key="item.id">
						<view class="aBox" @click="goHouseTypeDetails(item.id)">
							<view class="left">
								<image class="leftImg" :src="item.annexPath+'?x-oss-process=image/resize,h_113,w_138'"></image>
								<view class="title">{{item.houseTypeName}}</view>
							</view>
							<view class="right">
								<view class="rightH3">
									{{item.houseType}}
									<text class="iconfont iconhuo"></text>
								</view>
								<view class="rightP">
									<text v-if="item.constructionArea">建面约{{item.constructionArea}}㎡</text>
									<text v-else>建面待定</text>
									<text v-if="item.oriented">朝向{{$tool.orientedFlag(item.oriented)}}</text>
									<text v-else>朝向待定</text>
								</view>
								<view class="price">
									总价约
									<text class="priceSpan" v-if="item.totalPrice">
										{{item.totalPrice}}万
									</text>
									<text class="priceSpan" v-else>总价待定</text>
								</view>
								<view class="lable">
									<text :class="'sale'+item.salesStatus">{{$tool.salesStatusFlag(item.salesStatus)}}</text>
									<view class="houTag1">
										<text v-for="(itemC,index) of item.houseTagChild" :key="index">{{itemC}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<consultation-foot  :mess='mess'></consultation-foot>
	</view>
</template>

<script>
	import consultationFoot from "../components/consultationFoot/consultationFoot.vue";
	import {
		getData
	} from '@/request/api';
	import {
		calculate
	} from "../calculator/toolCalc.js";
	export default {
		components: {
			consultationFoot
		},
		data() {
			return {
				buildingId: 0,
				houseTypeId: 0,
				curr: 0,
				houseBan: [],
				houseBan1: [],
				houseInfo: {},
				annexPaths: [],
				modelHouses: [],
				vrUrl: "http://test.shhxfyl.com/image/default/E64A4AD4E0414EE5B54ABAA7B4A927D3-6-2.png",
				vrImg: "",
				imagePaths: [],
				currentType: 0,
				tanFlag: false,



				// houseInfo: {},
				loanData: {
					comprise: 1, // 贷款方式： 1商业贷款；2公积金贷款；3组合贷款
					loanType: 1, // 1为等额本息   2为等额本金
					total: "", // 房屋总价
					ratio: 4.9, // 贷款比例
					loanTotal: "", // 贷款总额
					year: 30, // 贷款年限
					fundRate: 3.25, // 公积金年利率
					fundTotal: "", // 公积金贷款金额
					rate: 4.9, // 商贷年利率
					rateTotal: "" // 商业贷款金额
				},

				totalRepayment: "", //利息总额
				monthPrice: "", //月供
				houseTag: [], //房屋标签
				houseTagChild: [], //房屋标签

				show: false,

				// currentType: 1,
				imgIndex: 1,
				imgTotal: 1,
				previewTitle: false,
				vanActive: 2,
				// imagePaths: [],
				startPosition: 0,

				//收藏
				token: "",
				isCollection: 0,
				tel: "", //底部中间点击获取管家电话
				tel400: "", //获取到的400
				workNo: "",
				viewsFlag: 0,
				copyFlag: false,

				userInfo: {},
        mess:{
					type:'houseType',
				},
				houseTypeLength:''

			}

		},
		onLoad(option) {
			this.mess.buildingId = this.buildingId = option.buildingId;
			this.mess.houseTypeId = this.houseTypeId = option.houseTypeId;
			console.log(this.buildingId)
			console.log(this.houseTypeId)

			this.userInfo = this.$cache.getCache('Login-Data');
			console.log('this.userInfo')
			console.log(this.userInfo)

			this.getHouseTypeDetail();
		},
		methods: {
      linkJump(){
		  let path = this.$tool.returnWebviewconfigUrl('calculator');
		  console.log(path,'pathpathpath')
				uni.navigateTo({
						url: '../webView/webView?toMWebpath='+ path +'&loanTotal='+(this.houseInfo.totalPrice*0.65).toFixed(2)
				})
			},
			buildingClick(){
				uni.navigateTo({
					url: '/pagesHouse/house/house?buildingId='+this.buildingId
				});
			},
			goHouseTypeDetails(val) {
				console.log(val)
				uni.navigateTo({
					url: '/pagesHouse/houseTypeDetails/houseTypeDetails?buildingId=' + this.buildingId + '&&houseTypeId=' + val
				});
			},
			getHouseTypeDetail() {
				getData("/building/buildingHouseType/detail", {
						id: this.houseTypeId,
						buildingId: this.buildingId
					})
					.then(res => {
						console.log(6699, res);
						this.houseInfo = res;
						this.mess =Object.assign(res,this.mess) 
						this.annexPaths = this.houseInfo.annexPaths;
						this.modelHouses = this.houseInfo.modelHouses;

						this.isCollection = this.houseInfo.collect;
						
						
						this.houseTypeLength=this.houseInfo.houseTypeListVOS.length;
						
						console.log('this.houseInfo.collect')
						console.log(this.houseInfo.collect)
						console.log('this.isCollection')
						console.log(this.isCollection)

						this.vrUrl = this.houseInfo.vrUrl;
						this.vrImg = this.houseInfo.vrImg;
						
						this.$cache.setCache('urlVR', this.houseInfo.vrUrl);
						
						
						
						
						// this.houseInfo.houseTypeTag = '大阳台,天台,大院子'
						if (this.houseInfo.houseTypeTag) {
							if(this.houseInfo.houseTypeTag.indexOf(',')==-1){
								this.houseInfo.houseTypeTag = [this.houseInfo.houseTypeTag]
							}else{
								this.houseInfo.houseTypeTag = this.houseInfo.houseTypeTag.split(",");
							}
							
						}
						// this.houseInfo.houseTypeReviews = [{
						// 		reviewTitle: '户型不错哦',
						// 		reviewContent: '户型不错哦户型不错哦户型不错哦户型不错哦'
						// 	},
						// 	{
						// 		reviewTitle: '户型不错哦',
						// 		reviewContent: '户型不错哦户型不错哦户型不错哦户型哦户型不错哦户型不错哦户型不错哦户型不错哦户型不错哦户型不错哦户型不错哦户型不错哦户型不错哦户型不错哦'
						// 	}
						// ]
						this.viewsFlag = this.houseInfo.houseTypeReviews.length;

						if (this.houseInfo.houseTypeListVOS) {
							this.houseInfo.houseTypeListVOS.forEach(item => {
								if (item.houseTypeTag) {
									item.houseTagChild = item.houseTypeTag.split(",");
								}
							});
						}

						this.loanData.loanTotal = (this.houseInfo.totalPrice * 0.65).toFixed(
							2
						);
						this.totalRepayment = (
							Number(calculate(this.loanData).interest.left.replace(/,/g, "")) /
							10000
						).toFixed(2);
						this.monthPrice =
							calculate(this.loanData).repayments.left +
							"." +
							calculate(this.loanData).repayments.right;
						
						
						// #ifndef MP-BAIDU				
						if (this.vrUrl) {
							this.houseBan.push({
								type: 1,
								path: this.vrImg+'?x-oss-process=image/resize,h_285,w_378'
							});
						}
						// #endif
						
						// #ifdef MP-BAIDU						
						this.vrUrl = ''
						// #endif
						
						
						if (this.annexPaths.length > 0) {
							for (let i = 0; i < this.annexPaths.length; i++) {
								this.houseBan.push({
									type: 2,
									path: this.annexPaths[i] +
										"?x-oss-process=image/resize,h_294,w_393" +
										"&imgIndex=" +
										(i + 1) +
										"&imgTotal=" +
										this.annexPaths.length +
										"&imgType=" +
										2,
									imgTotal: this.annexPaths.length
								});
							}
						}
						if (this.modelHouses.length) {
							for (let i = 0; i < this.modelHouses.length; i++) {
								this.houseBan.push({
									type: 3,
									path: this.modelHouses[i] +
										"?x-oss-process=image/resize,h_294,w_393" +
										"&imgIndex=" +
										(i + 1) +
										"&imgTotal=" +
										this.modelHouses.length +
										"&imgType=" +
										3,
									imgTotal: this.modelHouses.length
								});
							}
						}
						for (let i = 0; i < this.houseBan.length; i++) {
							this.houseBan[i].numIndex = i;
							if (this.houseBan[i].type != 1) {
								this.imagePaths.push(this.houseBan[i].path);
							}
						}
						this.houseBan1 = this.houseBan.reduce((all, next) => all.some((item) => item['type'] == next['type']) ? all : [
							...all, next
						], []);
						this.currentType = this.houseBan1[0].type;
					})
					.catch(err => {
						console.log("请求结果报错", err);
					});
			},
			tanclose() {
				if (this.tanFlag) {
					this.tanFlag = false;
				}
			},
			// ban 切换
			swipeChange(val) {
				console.log('切换')
				console.log(val)
				console.log()
				let _index = val.detail.current
				this.currentType = this.houseBan[_index].type;
				this.curr = val.detail.current
			},
			spanSwipeClick(item) {
				if (this.tanFlag) {
					this.curr = item.numIndex;
				} else {
					this.curr = item.numIndex;
					this.currentType = item.type;
				}


			},

			swipeClick(item) {
				if (item.type == 1) {					
					uni.navigateTo({
							url: '../VR/index'
					})			
				} else {
					this.tanFlag = true
				}
			},
		},
		
	}
</script>

<style lang="scss" scoped>
	.swiperBox {
		position: relative;
	}

	.houseTypeDetailsAll {
		background: #F4F8F8;
	}

	swiper {
		height: 560rpx !important;
	}

	.infoTu {
		display: block;
		height: 560rpx;
		width: 100%;

		image {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	.icon {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 128rpx;
		height: 128rpx;
		transform: translate(-50%, -50%);
		z-index: 2;
	}


	.custom-indicator {
		position: absolute;
		left: 50%;
		bottom: 28rpx;
		transform: translate(-50%, 0);
		z-index: 2;
		display: flex;
	}

	.biao {
		text-align: center;
		min-width: 88rpx;
		margin: 0 8rpx;
		height: 44rpx;
		padding: 0 12rpx;
		line-height: 44rpx;
		display: inline-block;
		color: #333333;
		font-size: 22rpx;
		background-color: #f5f5f5;
		border-radius: 20rpx;
	}

	.biao.active {
		background-color: #00a4ff;
		color: #ffffff;
	}


	.swiperBox1 {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000;
		z-index: 99;

		.swiper {
			position: absolute;
			top: 50%;
			width: 100%;
			transform: translateY(-50%);
			z-index: 111;
		}

		.custom-indicator {
			position: absolute;
			left: 0;
			bottom: 28rpx;
			transform: translate(0, 0);
			z-index: 2;
			display: flex;
		}
	}

	.tanClose {
		position: absolute;
		top: 32rpx;
		left: 32rpx;
	}

	.swiperNum {
		position: absolute;
		top: 32rpx;
		left: 50%;
		color: #fff;
		font-size: 32rpx;
		transform: translateX(-50%);

	}



	.iconhuo {
		color: #FF382F;
		display: inline-block;
		margin-left: 10rpx;
	}

	//楼盘描述
	.room-des {
		padding: 40rpx 30rpx 36rpx 30rpx;
		background-color: #fff;



		.title {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.h3 {
				color: #3d3e3f;
				font-size: 18px;
				font-weight: 700;
				vertical-align: center;
			}

			.priceDetail {
				color: #666666;
				font-size: 24rpx;

				text {
					margin-left: 8rpx;
					color: #F12224;
					font-size: 36rpx;
					font-weight: 700;
				}
			}
		}

		.description {
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;
			
			.houTag{
				margin-left: 10rpx;
				width:560rpx;
				display:flex;
				overflow-x:scroll;
				overflow-y: hidden;
				text{
					white-space: nowrap;
					float:left;
				}
			}

			text {
				display: inline-block;
				padding: 4rpx 12rpx;
				// height: 32rpx;
				// line-height: 32rpx;
				color: #999999;
				font-size: 20rpx;
				background-color: #f1f9ff;
				margin-right: 8rpx;
				border-radius: 4rpx;
				margin-bottom: 10rpx;
			}

			.sale1 {
				background-color: #3bd0a0;
				color: #ffffff;
			}

			.sale2 {
				background-color: #ff8353;
				color: #ffffff;
			}

			.sale3 {
				background-color: #c7cbd3;
				color: #ffffff;
			}

			.sale4 {
				background-color: #f6b638;
				color: #ffffff;
			}
		}

		.introduction {
			color: #333333;
			font-size: 13px;
			margin-top: 13px;
			font-weight: 700;

			text {
				color: #666666;
				margin-right: 15px;
				font-weight: normal;
			}
		}

		.address {
			font-size: 26rpx;
			color: #00a4ff;
			margin-top: 26rpx;

			text.addressSuo {
				color: #666;
				margin-right: 4rpx;
			}

		}



		.loanCalculation {
			margin-top: 16rpx;
			width: 100%;
			height: 68rpx;
			background-color: #f1f9ff;
			line-height: 68rpx;
			text-align: center;
			font-size: 28rpx;
			color: #00a4ff;
		}

		.priceDisplay {
			.priceDisplayCont {
				background-color: #f1f9ff;
				margin-top: 28rpx;
				padding: 15px 13px 20px 22px;

				.title {
					color: #666666;
					font-size: 28rpx;
					position: relative;

					&:before {
						content: "";
						position: absolute;
						left: -14rpx;
						top: 6rpx;
						width: 4rpx;
						height: 26rpx;
						background-color: #00a4ff;
					}
				}

				.priceShow {
					display: flex;
					justify-content: space-between;

					.priceShow1 {
						text-align: center;
						margin-top: 32rpx;

						view {
							color: #333333;
							font-size: 32rpx;
							font-weight: bold;

							&:first-child {
								font-weight: normal;
								color: #666666;
								font-size: 28rpx;
								margin-bottom: 16rpx;
							}
						}
					}
				}
			}

			.priceDisplay_link {
				width: 100%;
				height: 68rpx;
				line-height: 68rpx;
				text-align: center;
				background-color: #f1f9ff;
				margin-top: 10rpx;
				font-size: 28rpx;
				color: #00a4ff;
			}
		}
	}

	.unitReviews {
		background-color: #fff;
		margin: 20rpx 0;

		.unitReviewsCont {
			padding: 40rpx 34rpx 30rpx 44rpx;

			.dianPing {
				color: #333333;
				font-size: 32rpx;
				font-weight: bold;
				position: relative;
				margin-bottom: 50rpx;

				&:before {
					content: "";
					position: absolute;
					left: -12rpx;
					top: 8rpx;
					width: 4rpx;
					height: 26rpx;
					background-color: #00a4ff;
				}
			}

			.dianDl {
				font-size: 28rpx;
				padding-left: 28rpx;

				.dianDt {
					color: #333333;
					font-weight: bold;
					margin-bottom: 12rpx;
					position: relative;

					&:after {
						content: "";
						position: absolute;
						left: -32rpx;
						top: 6rpx;
						width: 14rpx;
						height: 14rpx;
						border-radius: 14rpx;
						border: 4rpx solid #fa784a;
						background-color: #fff;
					}
				}

				.dianDd {
					color: #666666;
					line-height: 40rpx;
					margin-bottom: 28rpx;
				}
			}
		}
	}


	.iconarrow_more {
		font-size: 24rpx;
		display: inline-block;
		margin-left: 10rpx;
	}

	.recommendType {
		background-color: #fff;
		padding-bottom:100rpx;

		.unitReviewsCont {
			padding: 40rpx 0px 0px 28rpx;

			.unitReviewsContH3 {
				margin-left: 12rpx;
				color: #333333;
				font-size: 32rpx;
				font-weight: bold;
				position: relative;

				&:before {
					content: "";
					position: absolute;
					left: -12rpx;
					top: 8rpx;
					width: 4rpx;
					height: 26rpx;
					background-color: #00a4ff;
				}
			}

			.typeListCont {
				margin-top: 30rpx;

				>.typeListContLi:last-child {
					border-bottom: none;
					margin-bottom: 0;
				}

				>.typeListContLi {
					padding-bottom: 30rpx;
					margin-bottom: 30rpx;
					border-bottom: 1px solid #efefef;

					.aBox {
						display: flex;
						flex-direction: row;

						.left {
							position: relative;
							width: 250rpx;
							height: 206rpx;

							.leftImg {
								width: 250rpx;
								height: 206rpx;
							}

							.title {
								font-size: 20rpx;
								text-align: center;
								width: 100%;
								height: 46rpx;
								line-height: 46rpx;
								position: absolute;
								left: 0;
								bottom: 0;
								z-index: 1;
								background: rgba(0, 0, 0, 0.3);
								color: #ffffff;
							}
						}

						.right {
							margin-left: 20rpx;

							.rightH3 {
								font-size: 32rpx;
								font-weight: bold;
								color: #333333;
							}

							.rightP {
								margin-top: 11rpx;
								margin-bottom: 16rpx;
								font-size: 24rpx;
								color: #666666;

								text {
									margin-right: 30rpx;
								}
							}

							.price {
								font-size: 24rpx;
								color: #666666;

								.priceSpan {
									font-size: 32rpx;
									color: #ff664f;
									margin-left: 12rpx;
									font-weight: bold;
								}
							}

							.lable {
								display: flex;
								flex-direction: row;
								flex-wrap: wrap;
								margin-top: 16rpx;
								.houTag1{
									margin-left: 10rpx;
									width:350rpx;
									display:flex;
									overflow-x:scroll;
									overflow-y: hidden;
									&::-webkit-scrollbar {display:none}
									text{
										white-space: nowrap;
										float:left;
									}
								}

								text {
									background: rgba(241, 249, 255, 1);
									border-radius: 8rpx;
									padding: 4rpx 12rpx 4rpx;
									font-size: 10px;
									color: #999999;
									margin-left: 6rpx;
									margin-bottom: 18rpx;
								}

								.sale1 {
									background-color: #3bd0a0;
									color: #ffffff;
								}

								.sale2 {
									background-color: #ff8353;
									color: #ffffff;
								}

								.sale3 {
									background-color: #c7cbd3;
									color: #ffffff;
								}

								.sale4 {
									background-color: #f6b638;
									color: #ffffff;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
