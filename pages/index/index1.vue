<template>
	<view class="wrap">
		<view class="to">
			<view class="banner">
				<view class="search">
					<view class="search-city" @click="handelCityCut">
						<view class="city-title">{{ title }}</view>
						<u-icon name="arrow-down-fill" size="16" class="bd-icon"></u-icon>
						<text class="city-line">|</text>
					</view>
					<view class="search-input"><u-search placeholder="请输入楼盘名称或区域" :show-action="false" bg-color="#fff" disabled @click="handelToSearch"></u-search></view>
				</view>
				<u-swiper :list="listImg" name="advertImage" v-if="listImg.length" height="312" border-radius="0"></u-swiper>
				<image src="https://media.tongcehaofang.com/image/default/616DCC531C714EC29C237697590BB5FC-6-2.jpg" v-else></image>
			</view>
			<view class="introduce">
				<view class="icon-text">
					<text class="iconfont icon21nianhangyejingyan"></text>
					21年行业经验
				</view>
				<view class="icon-text">
					<text class="iconfont icon370wanfuwuyonghu"></text>
					370万服务用户
				</view>
				<view class="icon-text">
					<text class="iconfont iconqianyuejine2qianyi"></text>
					年签约金额超2千亿
				</view>
				<view class="icon-text">
					<text class="iconfont iconzhenshiyifangyijia"></text>
					真实一房一价
				</view>
			</view>
			<view class="buildingTools">
				<view class="title">房屋工具</view>
				<view class="building">
					<view class="count count-one" @click="handelToCount">
						<view>
							<view class="view1">房贷计算</view>
							<view class="view2">想看月供还款</view>
							
								<view class="view3">
									立即计算
									<u-icon name="arrow-right" size="18"></u-icon>
								</view>
							
						</view>
						<view><image class="img1" src="../../static/count.png" mode=""></image></view>
					</view>
					<view class="count" @click="handelToAffordability">
						<view>
							<view class="view1">购房能力</view>
							<view class="view2">想查买房资源</view>
							
								<view class="view3">
									立即查询
									<u-icon name="arrow-right" size="18"></u-icon>
								</view>
							
						</view>
						<view><image class="img2" src="../../static/coin.png" mode=""></image></view>
					</view>
				</view>
				<view class="choiceness">
					<view class="houses">精选楼盘</view>
					<view class="allHouses" @click="handelToHouseList">
						全部楼盘
						<u-icon name="arrow-right" size="18" color="#999999"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-BAIDU -->
		<view  :class="{baidu:scrollTop>baiduTop}">
		<!-- #endif -->
		<u-sticky :offset-top="scrollTop < topHight ? 0 : 0" >
			<Screen class="Screen" @screenChoose="screenChoose" @changeTab="changeTab" ></Screen>
		</u-sticky>
		<!-- #ifdef MP-BAIDU -->
		</view>
		<!-- #endif -->
		<view class="detail_list" v-if="flowListLeft.length > 0 || flowListRight.length > 0">
			<view class="load-bg">
				<view class="tospur-left">
					<view class="tospur-warter" v-for="(item, index) in flowListLeft" :key="index">
						<view @click="handelToleftHouse(item.id)">
						<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
						<!-- #ifndef MP-WEIXIN -->
						<view class="tospur-img-wrap">
							<u-lazy-load
								
								border-radius="12"
								:image="item.albumCoverPicture ? item.albumCoverPicture+'?x-oss-process=image/resize,h_570,w_756' : noImage"
								:index="index"
								:loading-img="noImage"
							></u-lazy-load>
							<view class="house_cover" v-if="item.favourTitle != ''">{{ item.favourTitle }}</view>
							<view class="img-play">
									<!-- #ifdef H5 -->
								<view class="btn img-btn" v-if="item.vr != 0"><image src="../../static/detail_VR.png"></image></view>
								<!-- #endif -->
								<view class="btn play-btn" v-if="item.video != 0"><image src="../../static/index_video.png"></image></view>
							</view>
							<view class="project-label">
								<text class="label cl-B" v-if="!!item.propertyType">{{ handlePropertyType(item.propertyType) }}</text>
								<text class="label cl-Y" v-if="!!item.salesStatus">
									{{ item.salesStatus == 1 ? '待售' : item.salesStatus == 2 ? '在售' : item.salesStatus == 3 ? '售罄' : item.salesStatus == 4 ? '在租' : '' }}
								</text>
							</view>
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="tospur-img-wrap">
							<image class="tospur-image" mode="aspectFill" :src="item.albumCoverPicture ? item.albumCoverPicture+'?x-oss-process=image/resize,h_560,w_756' : '../../static/pic_default_small@2x.png'"></image>
							<view class="house_cover" v-if="item.favourTitle != ''">{{ item.favourTitle }}</view>
							<view class="img-play">
								<!-- <view class="btn img-btn" v-if="item.vr != 0"><image src="../../static/detail_VR.png"></image></view> -->
								<view class="btn play-btn" v-if="item.video != 0"><image src="../../static/index_video.png"></image></view>
							</view>
							<view class="project-label">
								<text class="label cl-B" v-if="!!item.propertyType">{{ handlePropertyType(item.propertyType) }}</text>
								<text class="label cl-Y" v-if="!!item.salesStatus">
									{{ item.salesStatus == 1 ? '待售' : item.salesStatus == 2 ? '在售' : item.salesStatus == 3 ? '售罄' : item.salesStatus == 4 ? '在租' : '' }}
								</text>
							</view>
						</view>
						<!-- #endif -->
						<view class="tospur-msg">
							<view class="tospur-title">
								<image src="../../static/icon_fire@2x.png" v-if="item.mainPush != 0"></image>
								{{ item.buildingAlias }}
							</view>
							<view class="tospur-street">{{ item.streetName ? item.areaName + '-' + item.streetName : item.areaName }}</view>
							<view class="tospur-tag">
								<view class="scroll-view_H">
									<view  class="scroll-view-item_H" v-for="(childItem, index) in item.buildingTag" :key="index">{{ childItem }}</view>
								</view>
							</view>

							<view class="tospur-price">
								{{
									item.referenceAveragePrice == null
										? '均价待定'
										: item.referenceAveragePriceType == 1
										? item.referenceAveragePrice + '元/㎡'
										: item.referenceAveragePrice + '元/㎡起'
								}}
							</view>

							<view class="tospur-shop">
								{{
									item.referenceTotalPriceMin == null && item.referenceTotalPriceMax == null
										? '总价待定'
										: item.referenceTotalPriceMin == null
										? '总价约' + item.referenceTotalPriceMax + '万'
										: item.referenceTotalPriceMax == null
										? '总价约' + item.referenceTotalPriceMin + '万'
										: '总价' + item.referenceTotalPriceMin + '-' + item.referenceTotalPriceMax + '万'
								}}
							</view>
							<view class="tospur-shop">
								{{
									item.referenceBuildAreaMin == null && item.referenceBuildAreaMax == null
										? '建面待定'
										: item.referenceBuildAreaMin == null
										? '建面约' + item.referenceBuildAreaMax + '㎡'
										: item.referenceBuildAreaMax == null
										? '建面约' + item.referenceBuildAreaMin + '㎡'
										: '建面' + item.referenceBuildAreaMin + '-' + item.referenceBuildAreaMax + '㎡'
								}}
							</view>
						</view>
						</view>
					</view>
				</view>
				<view class="tospur-right">
					<view class="tospur-warter" v-for="(item, index) in flowListRight" :key="index">
						<view  @click="handelToHouse(item.id)">
							<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
							<!-- #ifndef MP-WEIXIN -->
							<view class="tospur-img-wrap">
								<u-lazy-load
									
									border-radius="12"
									:image="item.albumCoverPicture ? item.albumCoverPicture+'?x-oss-process=image/resize,h_570,w_756' : noImage"
									:index="index"
									:loading-img="noImage"
								></u-lazy-load>
								<view class="house_cover" v-if="item.favourTitle != ''">{{ item.favourTitle }}</view>
								<view class="img-play">
										<!-- #ifdef H5 -->
									<view class="btn img-btn" v-if="item.vr != 0"><image src="../../static/detail_VR.png"></image></view>
									<!-- #endif -->
									<view class="btn play-btn" v-if="item.video != 0"><image src="../../static/index_video.png"></image></view>
								</view>
								<view class="project-label">
									<text class="label cl-B" v-if="!!item.propertyType">{{ handlePropertyType(item.propertyType) }}</text>
									<text class="label cl-Y" v-if="!!item.salesStatus">
										{{ item.salesStatus == 1 ? '待售' : item.salesStatus == 2 ? '在售' : item.salesStatus == 3 ? '售罄' : item.salesStatus == 4 ? '在租' : '' }}
									</text>
								</view>
							</view>
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							<view class="tospur-img-wrap">
								<image class="tospur-image" :src="item.albumCoverPicture ? item.albumCoverPicture+'?x-oss-process=image/resize,h_570,w_756' : '../../static/pic_default_small@2x.png'"></image>
								<view class="house_cover" v-if="item.favourTitle != ''">{{ item.favourTitle }}</view>
								<view class="img-play">
									<!-- <view class="btn img-btn" v-if="item.vr != 0"><image src="../../static/detail_VR.png"></image></view> -->
									<view class="btn play-btn" v-if="item.video != 0"><image src="../../static/index_video.png"></image></view>
								</view>
								<view class="project-label">
									<text class="label cl-B" v-if="!!item.propertyType">{{ handlePropertyType(item.propertyType) }}</text>
									<text class="label cl-Y" v-if="!!item.salesStatus">
										{{ item.salesStatus == 1 ? '待售' : item.salesStatus == 2 ? '在售' : item.salesStatus == 3 ? '售罄' : item.salesStatus == 4 ? '在租' : '' }}
									</text>
								</view>
							</view>
							<!-- #endif -->
							<view class="tospur-msg">
								<view class="tospur-title">
									<image src="../../static/icon_fire@2x.png" v-if="item.mainPush != 0"></image>
									{{ item.buildingAlias }}
								</view>
								<view class="tospur-street">{{ item.streetName ? item.areaName + '-' + item.streetName : item.areaName }}</view>
								<view class="tospur-tag">
									<view class="scroll-view_H" >
										<view class="scroll-view-item_H" v-for="(childItem, index) in item.buildingTag" :key="index">{{ childItem }}</view>
									</view>
								</view>

								<view class="tospur-price">
									{{
										item.referenceAveragePrice == null
											? '均价待定'
											: item.referenceAveragePriceType == 1
											? item.referenceAveragePrice + '元/㎡'
											: item.referenceAveragePrice + '元/㎡起'
									}}
								</view>

								<view class="tospur-shop">
									{{
										item.referenceTotalPriceMin == null && item.referenceTotalPriceMax == null
											? '总价待定'
											: item.referenceTotalPriceMin == null
											? '总价约' + item.referenceTotalPriceMax + '万'
											: item.referenceTotalPriceMax == null
											? '总价约' + item.referenceTotalPriceMin + '万'
											: '总价' + item.referenceTotalPriceMin + '-' + item.referenceTotalPriceMax + '万'
									}}
								</view>
								<view class="tospur-shop">
									{{
										item.referenceBuildAreaMin == null && item.referenceBuildAreaMax == null
											? '建面待定'
											: item.referenceBuildAreaMin == null
											? '建面约' + item.referenceBuildAreaMax + '㎡'
											: item.referenceBuildAreaMax == null
											? '建面约' + item.referenceBuildAreaMin + '㎡'
											: '建面' + item.referenceBuildAreaMin + '-' + item.referenceBuildAreaMax + '㎡'
									}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" v-if="flowListLeft.length > 0 || flowListRight.length > 0" margin-top="20"></u-loadmore>
		</view>
		<view v-else class="noList">
			<view class="noList_span">没有符合条件的楼盘，更多楼盘拓展中~</view>
			<hot-list></hot-list>
		</view>
	</view>
</template>

<script>
import { getData, getDataGet } from '@/request/api';
import Screen from '../../components/screen/screen';
import HotList from '../../components/hotList/index';
import bmap from '../../utils/bmap-wx.min.js';
export default {
	components: {
		Screen,
		HotList
	},
	data() {
		return {
			noImage: require('../../static/pic_default_small@2x.png'),
			loadStatus: 'loadmore',
			flowList: [],
			flowListLeft: [],
			flowListRight: [],
			scrollTop: 0,
			list: [],
			cityList: [],
			isStyle: false,
			showChangeCity: false,
			GpsaddressData: null,
			ischangeCity: this.$cache.getCache('ischangeCity') || false,
			crrentAddress: '上海市',
			textList: [],
			HotRecommendList: [],
			listImg: [],
			articleTitleList: [],
			title: '上海市',
			topHight: '',
			homeFrom: {
				city: '310100000',
				page: 1,
				rows: 10
			},
			nextPage: 1,
			total: 0,
			endRow: 10,
			isShowPopup: '',
			baiduTop:''
		};
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	
		// #ifdef MP-BAIDU
		const query = uni.createSelectorQuery().in(this);
		query
			.select('.to')
			.boundingClientRect(data => {
				this.baiduTop = data.height;
				
			})
			.exec();
			// #endif
	},
	onReady(){
		// #ifndef H5
		this.getAuthorizeInfo();
		// #endif
		
	},
	onLoad() {
		this.getonlineCity();
		this.getCityCode();
		this.getConfigPath();
		
	},
	onShow() {
		
	},
	onReachBottom() {
		this.loadStatus = 'loading';
		if (this.total != this.endRow) {
			this.homeFrom.page = this.nextPage;
			this.getHomeList();
		} else {
			this.loadStatus = 'nomore';
		}
	},
	computed: {},
	methods: {
		getConfigPath(){
			getDataGet("/user/configPath/getAllConfigPath/M")
			.then(res => {
				console.log(res,'getConfigPath')
				let AllConfigPath = res.mConfigPathVO
				this.$cache.setCache('ConfigPath',AllConfigPath)
			})
			.catch(err => {
				console.log("请求结果报错", err);
			});
		},
		screenChoose(data) {
			this.getHomeList(data, 'new');
		},
		//点击筛选条件页面滚动
		changeTab() {
			//得到向上卷起的高度
			const query = uni.createSelectorQuery().in(this);
			query
				.select('.to')
				.boundingClientRect(data => {
				
					this.topHight = data.height;
					uni.pageScrollTo({
						scrollTop: data.height,
						duration: 200
					});
					
					
				})
				.exec();
		},
		
		// 位置授权
		getAuthorizeInfo() {
			const self = this;
			uni.authorize({
				scope: 'scope.userLocation',
				success(res) {
					console.log(res, '授权了');
					// 允许授权
					if(self.$cache.getCache('ischangeCity')){
						self.ischangeCity = self.$cache.getCache('ischangeCity')
					}
					if (!self.ischangeCity) {
						self.getCutCity();
						console.log('走到切换城市了');
						if (self.crrentAddress == self.title) {
							self.$cache.setCache('ischangeCity', true);
						}
					}
				},
				fail() {
					// 拒绝授权
					self.openConfirm();
					console.log('你拒绝了授权，无法获得所在城市和附近的房源');
				}
			});
		},
		// 获取地理位置
		getLocationInfo() {
			const self = this;
			uni.getLocation({
				type: 'wgs84',
				success(res) {}
			});
		},
		// 再次获取授权
		// 当用户第一次拒绝后再次请求授权
		openConfirm() {
			uni.showModal({
				title: '请求授权当前位置',
				content: '需要获取您的地理位置，请确认授权',
				success: res => {
					if (res.confirm) {
						console.log(1111);
						uni.openSetting(); // 打开地图权限设置
					} else if (res.cancel) {
						this.cancelChangeCity();
						// uni.showToast({
						// 	title: '你拒绝了授权，无法获得所在城市和附近的房源',
						// 	icon: 'none',
						// 	duration: 1000
						// });
					}
				}
			});
		},
		// 同意授权之后的操作
		getCutCity() {
			const self = this;
			const BMap = new bmap.BMapWX({
				ak: 'onBnxFbt0v7s9fmhaEpgUktrhyK7duY0'
			});
			BMap.regeocoding({
				success(res) {
					let city = res.originalData.result.addressComponent.city;
					self.crrentAddress = city;
					self.$cache.setCache('locationCity', city);
					console.log(self.crrentAddress, '百度地图的城市');
					if (city) {
						if (city != self.title) {
							self.cityList.forEach(item => {
								if (city == item.title) {
									self.GpsaddressData = { ...item };
									if (self.GpsaddressData !== null) {
										self.changeCity();
									}
								}
							});
						}
					}
				}
			});
		},
		// 拿到城市code切换城市
		getCityCode() {
			let cityList = this.$cache.getCache('storageCity')||''
			if (cityList) {
				this.homeFrom.city = cityList.code;
				this.title = cityList.title;
				this.$store.dispatch('saveCity',cityList);
			} else {
				this.homeFrom.city = '310100000';
				this.title = '上海市';
				let data = { code: '310100000', pinyinInitial: 'S', title: '上海市' };
				this.$cache.setCache('storageCity',data)
			    this.$store.dispatch('saveCity',data);
			}
			
			this.getHomeList();
			this.getHomeBannerList();
		},
		getHomeList(data = {}, flag) {
			flag ? (this.currentDate = data) : (data = this.currentDate);
			let params = Object.assign({}, data, {
				city: this.homeFrom.city,
				page: flag ? 1 : this.homeFrom.page,
				rows: this.homeFrom.rows
			});
			getData('/building/capp/building/buildingSearchBuildingListResult', params)
				.then(res => {
					console.log('res---------',res)
					res.list.forEach((val, index) => {
						if (val.buildingTag) {
							val.buildingTag = val.buildingTag.split(',');
						}
					});
					if (res.list.length < 1) {
						this.flowListLeft = [];
						this.flowListRight = [];
						return;
					}
					let l = [],
						r = [];
					res.list.forEach((item, index) => {
						if (index % 2 == 0) {
							l.push(item);
						} else {
							r.push(item);
						}
					});
					if (flag) {
						this.flowListLeft = l;
						this.flowListRight = r;
						if (!params.listSort) {
							uni.showToast({
								title: '为你找到' + res.total + '个楼盘',
								icon: 'none',
								duration: 1000
							});
						}
					} else {
						this.flowListLeft = this.flowListLeft.concat(l);
						this.flowListRight = this.flowListRight.concat(r);
					}
					this.nextPage = res.nextPage;
					this.total = res.total;
					this.endRow = res.endRow;
				})
				.catch(err => {
					console.log(err);
				});
		},

		getHomeBannerList() {
			let params = {
				cityCode: this.homeFrom.city,
				pertainProduct: '3',
				pertainAddress: '7'
			};
			getData('/base/capp/appStart/banner/list', params)
				.then(res => {
					console.log('获取首页banner', res);
					this.listImg = res.result;
				})
				.catch(err => {
					console.log(err);
				});
		},
		//切换城市
		changeCity() {
			console.log(this.GpsaddressData, 111111);
			const self = this;
			if (self.GpsaddressData !== null) {
				self.$store.dispatch('saveCity', self.GpsaddressData);
				self.$cache.setCache('storageCity', self.GpsaddressData);
				self.$cache.setCache('ischangeCity', true);
				self.getCityCode();
			}
		},
		cancelChangeCity() {
			this.$cache.setCache('ischangeCity', true);
		},
		handlePropertyType(key) {
			let newKey = '';
			if (key.length > 1) {
				newKey = key.substring(0, 1);
			} else {
				newKey = key;
			}
			return this.$formatter.switchName('propertyType', newKey);
		},
		getonlineCity() {
			let self = this;
			let params = {
				clientType:5
			}
			getData('/building/capp/building/onlineCityV2', params)
				.then(res => {
					Object.getOwnPropertyNames(res).forEach(function(key) {
						self.cityList.push(...res[key]);
					});
				})
				.catch(err => {
					console.log('请求上线城市列表结果报错', err);
				});
		},
		handelCityCut() {
			console.log(1111);
			uni.navigateTo({
				url: '/pagesHome/cityList/cityList'
			});
		},
		handelToSearch() {
			uni.navigateTo({
				url: '/pagesHome/Search/index'
			});
		},
		handelToHouseList() {
			uni.navigateTo({
				url: '/pagesHome/houseList/index'
			});
		},
		handelToCount(){
		let path = this.$tool.returnWebviewconfigUrl('calculator');
	
		console.log(path,'pathpathpath')
						uni.navigateTo({
								url: '/pagesHouse/webView/webView?toMWebpath='+ path,
						})
		},
		
		handelToAffordability(){
			let path = this.$tool.returnWebviewconfigUrl('buyingCapacity');
				console.log(path,'pathpathpath')
			     let url = path.split('?')[0];
			    let qIndex = path.split('?')[1];
				console.log(qIndex,'路径')
		
			uni.navigateTo({
					url: '/pagesHouse/webView/webView?toMWebpath='+ url +'&'+ qIndex
			})
		},
		handelToHouse(id){
			uni.navigateTo({
				url: "/pagesHouse/house/house?buildingId="+id
			});
			
		},
		handelToleftHouse(id){
			uni.navigateTo({
				url: "/pagesHouse/house/house?buildingId="+id
			});
			
		},
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	background-color: #fff;
}
/deep/.u-column {
	width: 50%;
}
/deep/.u-lazy-item {
	height: 180px !important;
	img {
		width: 100%;
	}
}
/* #ifdef MP-BAIDU */
.baidu{
	position: fixed;
	top:0;
	width: 100%;
	z-index: 99999;
}
.noBaidu{
	position: sticky;
}
/*  #endif  */
.detail_list {
	overflow: hidden;
	position: relative;
	/* 	#ifndef H5   */
	padding-bottom: 20rpx;
	/* 	#endif   */
	/* #ifdef H5 */
	padding-bottom: 120rpx;
	/*  #endif  */
}
.load-bg {
	background-color: #f8f8f8;
	display: flex;
	.tospur-right {
		width: 50%;
		padding:0 12rpx 0 6rpx;
	}
	.tospur-left {
		width: 50%;
		padding:0 6rpx 0 12rpx;
		
	}
}
.tospur-warter {
	margin: 0 0 12rpx 0;
	border-radius:12rpx;
	background-color: #ffffff;
}

.u-close {
	position: absolute;
	top: 32rpx;
	right: 32rpx;
}

.tospur-image {
	width: 100%;
	border-radius:12rpx;
	height: 100%;
}
.tospur-msg {
	padding: 0 20rpx 30rpx 20rpx;
	width: 100%;
	height: 100%;
}

.tospur-title {
	font-size: 30rpx;
	margin-top: 5px;
	color: $u-main-color;
	image {
		width: 11px;
		height: 15px;
		margin-right: 3px;
	}
}

.tospur-tag {
	
	width: 100%;
	.scroll-view_H {
		white-space: nowrap;
		overflow-y: hidden;
		 overflow-x: scroll;
	   &::-webkit-scrollbar {
	      display:none}
		  .scroll-view-item_H {
		  	margin-top:14rpx;
		  	display: inline-block;
		  	background-color: #f1f9ff;
		  	margin-right: 4rpx;
		  	border-radius: 6rpx;
		  	text-align: left;
		  	font-size: 10px;
		  	color: #999;
			padding: 2px 4px;

		  }
		  
	   }
}


	

.tospur-price {
	font-size: 30rpx;
	color: #ff664f;
	margin-top: 5px;
	font-weight: 700;
}

.tospur-shop {
	font-size: 22rpx;
	color: $u-tips-color;
	margin-top: 10rpx;
}
.tospur-street {
	font-size: 22rpx;
	color: #666;
	margin-top: 10rpx;
}
.tospur-layout {
	.btn_arrow_top {
		border: 0;
		border-color: transparent transparent transparent transparent;
		transform: rotate(0);
		opacity: 0.8;
		font-size: 12px;
		color: #d1d1d1;
		transition: all 0.5s ease-out;
		padding-left: 2px;
		vertical-align: top;
	}
	.arrow {
		color: #1989fa;
		transform: rotate(180deg);
	}
}

.banner {
	position: relative;
	image {
		width: 100%;
		height: 312rpx;
	}
}

.search {
	position: absolute;
	margin: 16rpx 0rpx;
	background-color: #fff;
	opacity: 0.8;
	display: flex;
	line-height: 82rpx;
	width: 92%;
	left: 30rpx;
	border-radius: 60rpx;
	padding: 0 40rpx;
	z-index: 9;
	.search-city {
		width: 27%;
		display: flex;

		.point_s2 {
			font-size: 14px;
		}
		.city-title {
			padding-right: 8rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}
		text {
			padding-left: 30rpx;
			color: #d8d8d8;
		}
		.bd-icon{
			/* #ifdef MP-BAIDU */
			/deep/view{
			vertical-align: middle;
			}
			/*  #endif  */
		
		}
	}
	.search-input {
		width: 73%;
	}
}

.introduce {
	display: flex;
	background-color: #fff;
	padding: 20rpx 20rpx 0 20rpx;
	text-align: center;
	.icon-text {
		font-size: 20rpx;
		color: #6a6f70;
		margin-top: 10rpx;
		padding: 0 6rpx;
		/* #ifdef H5 */
		-webkit-text-size-adjust: 100%;
		/*  #endif  */
		.iconfont {
			font-size: 20rpx;
			padding-right: 6rpx;
			color: #6a6f70;
		}
	}
}
.notice {
	border: 1px solid #ebebeb;
	margin: 40rpx 20rpx 0 20rpx;
	border-radius: 10rpx;
	display: flex;
	.notice-img {
		height: 80rpx;
		line-height: 80rpx;
		width: 62px;
		background: rgba(0, 164, 255, 0.03);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		.headlines-img {
			width: 68rpx;
			height: 36rpx;
		}
		.img {
			position: absolute;
			height: 100%;
			width: 30rpx;
			right: -30rpx;
		}
	}

	.notice-text {
		width: 100%;
	}
}

.areaTag {
	padding: 0 0 20rpx 40rpx;
	background-color: #fff;
	margin-right: 10rpx;
}

.tospur-img-wrap {
	position: relative;
	height: 180px;
	width: 100%;
	image {
		width: 100%;
		height: 100%;
	}

	.project-label {
		position: absolute;
		bottom: 4px;
		right: 4px;
		.label {
			border-radius: 2px;
			font-size: 10px;
			color: #ffffff;
			// width: 24px;
			padding: 0 2px;
			height: 15px;
			display: inline-block;
			text-align: center;
			line-height: 15px;
		}
		.cl-B {
			background-color: #00a4ff;
			margin-right: 4px;
		}
		.cl-Y {
			background-color: #ff8252;
		}
	}
	.house_cover {
		// width: 260rpx;
		height: 48rpx;
		background: #ff672d;
		border-radius: 12rpx 0px 30rpx 0px;
		position: absolute;
		top: 0;
		left:0;
		font-size: 24rpx;
		font-weight: 700;
		line-height: 48rpx;
		color: #ffffff;
		text-align: left;
		z-index: 9;
		padding:0 14rpx;
	}
}
.img-play {
	position: absolute;
	left: 4px;
	bottom: 0;
	.btn {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.2);
	}
	.img-btn {
		margin-right: 6px;
	}
	image {
		width: 100%;
		height: 100%;
	}
}
.slot-content {
	padding: 30px 35px;
	line-height: 30px;
	color: #666666;
	text-align: center;
	.font_W_600 {
		font-weight: 700;
		color: #000000;
	}
}
.noList {
	background-color: white;

	.noList_img {
		height: 240rpx;
		width: 400rpx;
	}
	.noList_span {
		text-align: center;
		color: #cccccc;

		padding: 100rpx 0;
	}
}
.buildingTools {
	padding: 40rpx 12rpx 20rpx 24rpx;
	color: #333333;

	.title {
		font-size: 40rpx;
	}
	.building {
		padding-top: 32rpx;
		display: flex;
		.count {
			width: 50%;
			display: flex;
			line-height: 46rpx;
			margin: 0 20rpx 0 0;
			padding: 20rpx 0 0 20rpx;
			border: 2rpx solid #f2f2f2;
			border-radius: 8rpx;
			&.count-one{
				    margin-left: 12rpx;
			}
			image {
				padding-left: 10rpx;
			}
			.img1 {
				max-width: 124rpx;
				max-height: 130rpx;
				margin-top: 20rpx;
			}
			.img2 {
				max-width: 154rpx;
				max-height: 114rpx;
				margin-top: 30rpx;
			}
			.view1 {
				font-size: 32rpx;
			}
			.view2 {
				font-size: 22rpx;
				color: #999999;
			}
			.view3 {
				font-size: 22rpx;
			}
		}
	}
	.choiceness {
		display: flex;
		line-height: 40rpx;
		margin-top: 48rpx;
		.houses {
			font-size: 40rpx;
			width: 70%;
		}
		.allHouses {
			width: 30%;
			text-align: right;
			font-size: 24rpx;
		}
	}
}
</style>
