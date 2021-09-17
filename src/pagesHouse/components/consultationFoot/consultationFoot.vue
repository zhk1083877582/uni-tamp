<template>
	<view class="consultationBox">
		<view class="consultation_foot">
			<view class="consultation_icon" @click="changeCollection">
				<text class="iconfont iconfavorite_line iconHeight" v-if="!isCollectionFlag"></text>
				<text class="iconfont iconfavorite_surface iconHeight" v-else></text>
				<text class="concern">关注</text>
			</view>
			<view class="consultation_icon">
				<!-- <text class="concern">分享</text> -->
				<button class="shareBtn" data-name="shareBtn" open-type="share">
					<text class="iconfont iconfenxiang iconHeight"></text>
					分享
				</button>
			</view>
			<view class="online" @click="onlineConsultation()">在线咨询</view>
			<view class="myOnline" @click="callPhone">电话咨询</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import Vue from 'vue';
import { getData,getMoorInfoByWorkNo } from '@/request/api';
import { mapState } from 'vuex';
export default {
	props: {
		workNo:{
			type:String,
			default:''
		},
		buildingId:{
			type:String,
			default:''
		},
		mess:{
			type:Object,
			default:()=>{
				return {
					type: 'building'
				};
			}
		}
	},
	data() {
		return {
			messList: {},
			showdialog: false,
			name: '',
			telNum: '',
			houseInfoDetail: this.houseInfo,
			hotLineShow: false,
			isCollectionFlag: false
		};
	},
	computed: {
		...mapState(['saveCollection'])
	},
	created() {
		console.log(1100, this.mess);
		const self = this;
		// #ifndef MP-WEIXIN
		setTimeout(() => {
		// #endif
			let mess = self.mess;
			if (mess.buildingId && mess.type != 'houseType' && mess.type != 'building') {
				self.buildingId = mess.buildingId;
				self.messList = JSON.parse(JSON.stringify(mess));
				console.log(self.buildingId);
				self.buingingBaseInfo();
				self.getKeepList();
			}
			// #ifndef MP-WEIXIN
			self.messList = JSON.parse(JSON.stringify(mess));
			console.log(self.messList, '打印结果');
			self.isCollectionFlag = self.saveCollection;
			self.getNewValue(mess);
		}, 1000);
		// #endif
		
	},
	// #ifdef MP-WEIXIN
	watch: {
		mess:{
		  handler(newValue, oldValue) {
			  console.log("获取的值",newValue)
		  　　this.messList = JSON.parse(JSON.stringify(newValue));
		     if(newValue.type == "houseType"){
				 this.buildingId = newValue.buildingId;
				 this.isCollectionFlag = newValue.collect == 1?true:false
			 }else{
				  if(newValue.type == "building"){
					   this.buildingId = newValue.id;
					   this.isCollectionFlag = newValue.haveCollection == "false"?false:true
				  }else{
					   this.buildingId = newValue.buildingId;
					   console.log(this.buildingId)
					   this.buingingBaseInfo()
				  }
			 }
			 this.getKeepList();
		  },

		 deep: true
		},
		saveCollection(newValue){
			this.isCollectionFlag = newValue;
	            console.log("saveCollection新的值",newValue)
		}
	},
	// #endif
	methods: {
		
		getNewValue(mess) {
			console.log('走到这', mess);
			if (mess.type == 'houseType') {
				this.buildingId = mess.buildingId;
				this.isCollectionFlag = mess.collect == 1 ? true : false;
			} else {
				if (mess.type == 'building') {
					this.buildingId = mess.id;
					this.isCollectionFlag = mess.haveCollection == 'false' ? false : true;
				} else {
					this.buildingId = mess.buildingId;
					console.log(this.buildingId);
					this.buingingBaseInfo();
				}
			}
			this.getKeepList();
		},
		onlineConsultation(keeper, dataList) {
			if(this.workNo){//与分享楼盘的管家im聊天
				this.doMajWithShareKeeper('im');
				return 
			}
			console.log(keeper, '打印啥');
			let imBaseUserId, userName;
			if (keeper) {
				imBaseUserId = keeper.imBaseUserId;
				userName = keeper.userName;
			} else {
				imBaseUserId = this.keepList[0] ? this.keepList[0].imBaseUserId : '';
				userName = this.keepList[0] ? this.keepList[0].userName : '';
			}
			console.log(666222, imBaseUserId);
			if (!imBaseUserId)
				return this.$refs.uToast.show({
					title: '没有管家 请核对'
			});
			if (this.messList.type == 'houseType') {
				let { buildingName, totalPrice, areaName, streetName, constructionArea } = this.messList;
				this.messList.buildingAlias = buildingName;
				this.messList.price = totalPrice;
				this.messList.address = areaName + ' ' + streetName;
				this.messList.areaSize = constructionArea;
				this.messList.annexs = [];
				uni.setStorageSync('showSentHouseType', JSON.stringify(this.messList));
			} else if (dataList) {
				console.log(dataList);
				let { buildingName, totalPrice, areaName, streetName, constructionArea } = dataList;
				dataList.buildingAlias = buildingName;
				dataList.price = totalPrice;
				dataList.address = areaName + ' - ' + streetName;
				dataList.areaSize = constructionArea;
				dataList.annexs = [];
				uni.setStorageSync('showSentHouseType', JSON.stringify(dataList));
			} else {
				this.messList.annexs = [];
				uni.setStorageSync('showSentBuild', JSON.stringify(this.messList));
			}
			
			imBaseUserId = 'C2C' + imBaseUserId;
			if (!this.$cache.getCache('M-Token')) {
				uni.navigateTo({
					url: `/pagesUser/login/login?topath=pagesChat/chatDetail/chatDetail&id=${imBaseUserId}&title=${userName}`
				});
			} else {
				uni.navigateTo({
					url: `/pagesChat/chatDetail/chatDetail?id=${imBaseUserId}&title=${userName}`
				});
			}
		},
		changeCollection() {
			getData('/tospurWeb/pclogin/checkLogin', {
				// token: this.$tool.getToken()
				token: this.$cache.getCache('M-Token')
			})
				.then(res => {
					let params, url;
					if (this.messList.type != 'houseType') {
						url = '/building/api/pc/building/buildingCollection';
						params = {
							buildingId: this.messList.id,
							statue: 0
						};
					} else {
						url = '/building/api/buildingHouseType/collect';
						let userMess = this.$tool.getStorage('Login-Data');
						params = {
							customerId: userMess.customerInfo.id,
							houseTypeId: this.messList.houseTypeId,
							collect: this.isCollectionFlag == 0 ? 1 : 0
						};
					}
					getData(url, params).then(res => {
						this.isCollectionFlag = !this.isCollectionFlag;
						this.$emit('changeCollectionStatus', { isCollectionFlag: this.isCollectionFlag, from: 'consultationFoot' });
						this.$refs.uToast.show({
							title: this.isCollectionFlag ? '已收藏' : '您已取消收藏'
						});
						if (this.messList.type != 'houseType') {
							this.$store.dispatch('saveCollection', this.isCollectionFlag);
						}
					});
				})
				.catch(err => {
					console.log('未登录或登录过期', err);
					console.log(err.code);
					if (err.code == 1) {
						uni.navigateTo({
							url: '/pagesUser/login/login'
						});
					}
				});
		},
		buingingBaseInfo() {
			getData('/building/capp/building/buildingBaseInfo', { buildingId: this.buildingId })
				.then(res => {
					console.log(res);
					this.isCollectionFlag = res.haveCollection == 'false' ? false : true;
					this.messList = Object.assign(this.messList, res);
				})
				.catch();
		},
		getKeepList() {
			let buildingId = this.buildingId;
			getData('/tospurWeb/v1/capp/rongcloud/new/getHousekeeperList', {
				buildingId,
				type: 1
			})
				.then(res => {
					console.log(222222, this.keepList, res);
					this.keepList = res.list;

					this.tel = res.list[0] && res.list[0].phone;
				})
				.catch(err => {
					console.log('请求结果报错', err);
				});
		},

		callPhone() {
			// 是从B-app分享过来的管家
			if(this.workNo){////与分享楼盘的管家电话聊天
				this.doMajWithShareKeeper('tel')
				return 
			}
			
			if (this.tel) {
				this.getMaj(this.tel);
			} else {
				this.$refs.uToast.show({
					title: '暂无管家电话'
				});
			}
		},
		//是从B-app分享过来时-拨打电话|im聊天
		doMajWithShareKeeper(type){
			let params={
				workNo:this.workNo,
        buildingId:this.buildingId,
        source:19
      };
      // #ifdef  MP-BAIDU
        params.source = 22;
      // #endif
      // #ifdef MP-TOUTIAO
      params.source = 25
      // #endif
			getMoorInfoByWorkNo('/user/capp/user/getImAndSevenMoorInfoByWorkNo',params)
				.then(res=>{
					 console.log('拨打电话',params,res)
					let {phone,imAccount,userName} =res;
					if(type==='tel'&&phone){//拨打电话
						uni.makePhoneCall({
						    phoneNumber: res.phone
						});
						return 
					}else if(type==='tel'&&!phone){
						this.$refs.uToast.show({
							title:  '未查询到电话'
						});
						return 
					}
					// im咨询
					let imBaseUserId = 'C2C' + imAccount;
					if(!imAccount){
						this.$refs.uToast.show({
							title:  '暂无管家'
						});
						return 
					}
					this.messList.annexs = [];
					uni.setStorageSync('showSentBuild', JSON.stringify(this.messList));
					if (!this.$cache.getCache('M-Token')) {
						uni.navigateTo({
							url: `/pagesUser/login/login?topath=pagesChat/chatDetail/chatDetail&id=${imBaseUserId}&title=${userName}`
						});
					} else {
						uni.navigateTo({
							url: `/pagesChat/chatDetail/chatDetail?id=${imBaseUserId}&title=${userName}`
						});
					}
					
				})
			
		},
		//给 app 提供线索
		getMaj(val) {
				console.log(val);
				let params = {
						phone: val,
						source: 19,
						buildingId: this.buildingId,
					}
				     // #ifdef  MP-BAIDU
                     params.source = 22;
                     // #endif
					 // #ifdef  MP-TOUTIAO
					  params.source = 25;
					   // #endif
				if (this.$tool.getToken()) {
					console.log('登录了')
					console.log(val)
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
					getData("/tospurWeb/capp/v2/user/getUserPhone", params)
						.then(res => {							
							uni.makePhoneCall({
							    phoneNumber: res.mobile
							});
							
						})
						.catch(err => {
							console.log("请求结果报错", err);
						});
				}
			
		},
	},
}
</script>

<style lang="scss" scoped>
.consultationBox {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 10000;
}

.consultation_foot {
	background: #fff;

	box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
	padding: 5px 15px;
	display: flex;
	justify-content: space-between;
	max-width: 750px;
	margin: 0 auto;

	.consultation_icon {
		width: 44px;

		text {
			display: block;
			text-align: center;
		}

		// .iconfont {
		//   font-size: 25px;
		// }
		.iconfavorite_surface {
			color: #ff714b;
		}
	}

	.online,
	.myOnline {
		width: 240rpx;
		height: 76rpx;
		background-color: #00a4ff;
		font-size: 28rpx;
		color: #fff;
		text-align: center;
		line-height: 76rpx;
	}
	.myOnline {
		background-color: #ff714b;
	}
}

.M_popup {
	width: 320px;
	border-radius: 12px;
	overflow-y: hidden;

	.popup_main {
		padding-bottom: 20px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);

		::v-deep .van-cell::after {
			border-bottom: 0px;
		}

		.title {
			font-size: 17px;
			color: #000;
			line-height: 24px;
			text-align: center;
			padding: 25px 0;
			font-weight: 700;
		}

		.van-cell {
			padding: 0;
		}

		.popup_input {
			width: 239px;
			border: 1px solid #dcdcdc;
			border-radius: 44px;
			height: 44px;
			line-height: 44px;
			margin: 0 40px;
			margin-bottom: 10px;

			.van-field__control {
				height: 28px;
				line-height: 28px;
			}
		}
	}

	.popup_btn {
		display: flex;
		justify-content: space-between;

		.van-button {
			height: 55px;
			flex: 1;
			border: 0;
			font-weight: 700;
			font-size: 17px;
		}

		.left_btn {
			border-right: 1px solid rgba(0, 0, 0, 0.1);
		}

		.right_btn {
			color: #00a4ff;
		}
	}
}
.shareBtn {
	border: none;
	width: auto;
	height: auto;
	background-color: #fff !important;
	padding: 0;
	font-size: 28rpx;
	color: #333;
	line-height: 1.4;
}
.concern {
	font-size: 28rpx;
	color: #333;
	line-height: 1.4;
}
button::after {
	border: none;
	width: auto;
	height: auto;
	background-color: none;
}
.iconHeight {
	height: 36rpx;
}
</style>
