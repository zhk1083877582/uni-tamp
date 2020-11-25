<!-- 楼盘详情 -->
<template>
	<view class="building-detail">
		<!-- 锚点 -->
		<view class="scroll-tabs" v-show="isShowScrollTabs">
			<scroll-view scroll-x="true" :scroll-left="scrollActiveIndex * 60" show-scrollbar="true" scroll-with-animation="true" style="height: 100%;">
				<view v-for="(item, index) in scrollRealTabs" :key="index" :class="{ active: index === scrollActiveIndex }" class="tab-item" @click.stop="changeScrollTabs(index)">
					{{ item.label }}
				</view>
			</scroll-view>
		</view>

		<!-- 基本信息 -->
		<building-info class="base-info" :baseInfo="baseInfo" :baseAnnexs="baseAnnexs" :callCarMobile="callCarMobile" :buildingId="buildingId"></building-info>
		<!-- 优惠券 -->
		<coupon-info
			:class="scrollTabs['coupon']['cl']"
			v-if="couponFavourList.length > 0 || couponList.length > 0"
			:couponList="couponList"
			:couponFavourList="couponFavourList"
			:buildingId="buildingId"
			@changeCouponInfo="doChangeCouponInfo"
		></coupon-info>
		<!-- 楼盘简介 -->
		<house-describe :class="scrollTabs['introduce']['cl']" v-if="descriptionInfo.buildingDescription" :descriptionInfo="descriptionInfo"></house-describe>
		<!-- 楼盘动态 -->
		<house-dynamic
			:class="scrollTabs['dynamic']['cl']"
			v-if="dongtaiInfo.isShow"
			ref="houseDynamic"
			:dongtaiInfo="dongtaiInfo"
			@changeCollectionStatus="doChangeCollectionStatus"
		></house-dynamic>
		<!-- 户型 -->
		<house-style :class="scrollTabs['style']['cl']" v-show="isShowHouseStyle" :buildingId="buildingId" @chatMess="chatMessStyle"></house-style>
		<!-- 楼栋分布 -->
		<house-spread
			:class="scrollTabs['spread']['cl']"
			v-if="spreadAnnexPath"
			:buildingId="buildingId"
			:spreadAnnexPath="spreadAnnexPath"
			:pcBuildingUnitBaseInfoList="pcBuildingUnitBaseInfoList"
		></house-spread>
		<!-- 周边配套 -->
		<!-- #ifndef MP-TOUTIAO -->
		<house-periphery :class="scrollTabs['periphery']['cl']" v-if="baseInfo.lat && baseInfo.lng" :baseInfo="baseInfo" @chatMess="chatMess"></house-periphery>
		<!-- #endif -->
		<!-- #ifdef MP-TOUTIAO -->
		<house-periphery :class="scrollTabs['periphery']['cl']" v-show="baseInfo.lat && baseInfo.lng" :baseInfo="baseInfo" @chatMess="chatMess"></house-periphery>
		<!-- #endif -->
		<!-- 楼盘亮点 -->
		<house-highlights :class="scrollTabs['highlights']['cl']" v-if="isShowHighlights" :highlightsInfo="highlightsInfo"></house-highlights>
		<!-- 楼盘介绍 -->
		<!-- <house-introduce v-if="baseInfo.buildingIntroduce.length>0" :buildingIntroduce="baseInfo.buildingIntroduce"></house-introduce> -->
		<!-- 优秀管家 -->
		<house-manager :class="scrollTabs['manager']['cl']" v-if="managerList.length > 0" :mess="mess" :managerList="managerList" :buildingId="buildingId"></house-manager>
		<!-- 推荐楼盘 -->
		<house-recommend :class="scrollTabs['recommend']['cl']" v-if="recommendList.length" :recommendList="recommendList" :buildingId="buildingId"></house-recommend>
		<!-- 免责声明 -->
		<house-disclaimer></house-disclaimer>
		<consultation-foot :mess="mess" :workNo="workNo" :buildingId="buildingId" ref="consultationFoot" @changeCollectionStatus="doChangeCollectionStatus"></consultation-foot>
	</view>
</template>

<script>
import bmap from '../../utils/bmap-wx.min.js';
import buildingInfo from './components/buildingInfo.vue'; //基本信息
import couponInfo from './components/couponInfo.vue'; //优惠券
import houseStyle from './components/houseStyle.vue'; //户型
import houseDynamic from './components/houseDynamic.vue'; //动态
import houseSpread from './components/houseSpread.vue'; //楼栋分布
import housePeriphery from './components/housePeriphery.vue'; //周边配套
import houseHighlights from './components/houseHighlights.vue'; //楼盘亮点
import houseDescribe from './components/houseDescribe.vue'; //楼盘简介
// import houseIntroduce from './components/houseIntroduce.vue';//楼盘介绍
import houseManager from './components/houseManager.vue'; //优秀管家
import houseRecommend from './components/houseRecommend.vue'; //推荐楼盘
import houseDisclaimer from './components/houseDisclaimer.vue'; //免责声明
import consultationFoot from '../components/consultationFoot/consultationFoot.vue';
import {
	getData,
	getBuildingBaseInfo,
	getCarPhone,
	getBuildingCouponInfo,
	getBuildingDescription,
	getBuildingDynamicAndDate,
	getBuildingTypeCount,
	getBuildingBrightSpotListByBuildingId,
	getBuildingUnitList,
	getHousekeeperList,
	getBuildingRecommend,
	saveCustomerTrack
} from '@/request/api';
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	data() {
		return {
			// isIos:false,
			share: {
				title: ''
			},
			workNo:'',//路由带过来的workNo
			buildingId: '',
			baseInfo: {
				haveCollection: '',
				buildingIntroduce: [],
				lat: '', ///纬度
				lng: '', //经度
				updateTime: '',
				referenceTotalPriceMin: '',
				referenceTotalPriceMax: '',
				referenceBuildAreaMin: '',
				referenceBuildAreaMax: '',
				referenceAveragePrice: '',
				buildingAlias: '',
				salesStatus: '',
				propertyType: '',
				buildingTag: '',
				buildingTaglabel: [],
				buildingBrightSpot: '',
				detailAddress: '',
				houseType: '',
				openTime: '',
				favourTitle: '', //图片顶部广告
				referenceAveragePriceType: '' //价格类型 1：仅均价 2：均价区间 3：均价起
			},
			callCarMobile: '', //专车带看
			baseAnnexs: null, //基本信息图片列表
			// 优惠券
			couponFavourList: [], //优惠信息展示
			couponList: [], //优惠券
			//户型
			isShowHouseStyle: true,
			//楼盘介绍
			descriptionInfo: {
				annexPath: '', //图片
				buildingDescription: '' //描述
			},
			// 动态信息
			dongtaiInfo: {
				isShow: false,
				isCollection: false,
				buildingId: '',
				dateBaseInfoList: [],
				dynamicBaseInfoList: []
			},
			//楼盘亮点
			isShowHighlights: false,
			highlightsInfo: {
				type: 0,
				list: []
			},

			// 楼栋分布
			spreadAnnexPath: '',
			pcBuildingUnitBaseInfoList: [],
			//管家
			managerList: [],
			//推荐列表
			recommendList: [],
			mess: {
				type: 'building'
			},
			//锚点
			isShowScrollTabs: false,
			scrollActiveIndex: 0,
			scrollTabs: {
				coupon: { label: '优惠', cl: 'part1', isShow: false },
				introduce: { label: '简介', cl: 'part2', isShow: false },
				dynamic: { label: '动态', cl: 'part3', isShow: false },
				style: { label: '户型', cl: 'part4', isShow: false },
				spread: { label: '楼栋', cl: 'part5', isShow: false },
				periphery: { label: '周边', cl: 'part6', isShow: false },
				highlights: { label: '亮点', cl: 'part7', isShow: true },
				manager: { label: '管家', cl: 'part8', isShow: false },
				recommend: { label: '推荐', cl: 'part9', isShow: false }
			}
		};
	},
	components: {
		buildingInfo,
		couponInfo,
		houseStyle,
		houseDynamic,
		houseSpread,
		housePeriphery,
		houseHighlights,
		// houseIntroduce,
		houseDescribe,
		houseManager,
		houseRecommend,
		houseDisclaimer,
		consultationFoot
	},
	computed: {
		scrollRealTabs() {
			let { scrollTabs } = this,
				arr = [];
			for (let key in scrollTabs) {
				scrollTabs[key].isShow && arr.push(scrollTabs[key]);
			}
			return arr;
		}
	},
	onLoad(option) {
		console.log(11111111111,option)
		if (option.scene) {
			const scene = decodeURIComponent(option.scene);
			let obj = {};
			scene.split('&').forEach(item => {
				const key = item.split('=')[0];
				obj[key] = item.split('=')[1];
			});
			this.buildingId = obj.buildingId;
			this.workNo = obj.workNo;
		} else {
			this.buildingId = option.buildingId;
			this.workNo = option.workNo;
		}
		this.initBaseInfo();
		//专车带看
		this.initCallCar();
		//优惠券
		this.initCouponInfo();

		//楼栋分布
		this.initBuildingUnitList();
		//户型
		this.initBuildingTypeCount();
		//楼盘介绍
		this.initgetBuildingDescription();
		//楼盘动态
		this.initBuildingDynamicAndDate();
		//楼盘亮点
		this.initBuildingBrightSpotList();
		//管家
		this.initHousekeeperList();
		//推荐楼盘列表
		this.initBuildingRecommendList();
		//浏览记录
		this.CustomerTrack();
	},
	//针对百度小程序增加seo
	onShow() {
		// let curPage = this.getCurPage();
		// //在微信小程序或是app中，通过curPage.options；如果是H5，则需要curPage.$route.query（H5中的curPage.options为undefined，所以刚好就不需要条件编译了）
		// let curParam = curPage.options || curPage.$route.query;
		// this.workNo = curParam.workNo;
		// console.log(55555,curParam)
		// #ifdef MP-BAIDU
		let self = this;
		setTimeout(() => {
			let { baseInfo = {}, descriptionInfo = {} } = self;
			swan.setPageInfo({
				title: baseInfo.buildingAlias,
				keywords: baseInfo.buildingAlias,
				description: descriptionInfo.buildingDescription,
				image: descriptionInfo.annexPath || 'https://media.tongcehaofang.com/image/default/616DCC531C714EC29C237697590BB5FC-6-2.jpg'
			});
		}, 2000);
		// #endif
	},
	onPageScroll(e) {
		// console.log(77,e)
		if (e.scrollTop > 600) {
			this.isShowScrollTabs = true;
		} else {
			this.isShowScrollTabs = false;
		}
		let self = this;

		//监听下面每块内容滚动
		// #ifndef MP-TOUTIAO
		const query = uni.createSelectorQuery().in(this);
		// #endif
		// #ifdef MP-TOUTIAO
		const query = uni.createSelectorQuery(); 
		// #endif
		let scrollRealTabs = this.scrollRealTabs,
			len = scrollRealTabs.length;
		for (let i = 0; i <= len; i++) {
			let cl = scrollRealTabs[i] && scrollRealTabs[i]['cl'];
			query
				.select(`.${cl}`)
				.boundingClientRect(data => {
					// console.log(9898, data);
					if (data && data.top <= 90 && data.bottom >= 90) {
						self.scrollActiveIndex = i;
					}
				})
				.exec();
		}
	},
	methods: {
		// 获取当前页面的路由信息
		getCurPage(){
		    let pages = getCurrentPages();
		    let curPage = pages[pages.length-1];
		    return curPage
		},
		// tabs切换
		changeScrollTabs(index) {
			this.scrollActiveIndex = index;
			let item = this.scrollRealTabs[index];
			uni.createSelectorQuery()
				.select(`.${item.cl}`)
				.boundingClientRect(data => {
					//目标节点
					uni.createSelectorQuery()
						.select('.building-detail')
						.boundingClientRect(res => {
							//最外层盒子节点
							uni.pageScrollTo({
								duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
								scrollTop: data.top - res.top - 45 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
							});
						})
						.exec();
				})
				.exec();
		},
		// 楼盘动态-新动态提醒
		doChangeCollectionStatus({ isCollectionFlag, from }) {
			// debugger
			if (from == 'houseDynamic') {
				this.dongtaiInfo.isCollection = false;
				this.$refs.consultationFoot.isCollectionFlag = true;
				// this.initBaseInfo();
			} else if (from == 'consultationFoot') {
				this.dongtaiInfo.isCollection = isCollectionFlag;
				if (this.$refs.houseDynamic) {
					this.$refs.houseDynamic.isCollection = isCollectionFlag;
				}
			}
		},
		doChangeCouponInfo() {
			this.initCouponInfo();
		},
		// 基本信息
		initBaseInfo() {
			let self = this;
			let params = {
				buildingId: this.buildingId
			};
			getBuildingBaseInfo('', params)
				.then(res => {
					console.log('基本信息', res);
					if (res.buildingAlias) {
						uni.setNavigationBarTitle({ title: res.buildingAlias });
						self.share.title = res.buildingAlias;
					}
					this.mess = Object.assign(res, this.mess);
					console.log(this.mess, '打印');
					let { baseInfo } = self;
					self.baseAnnexs = res.annexs || {};
					Object.keys(baseInfo).forEach(key => {
						baseInfo[key] = res[key];
					});
					baseInfo.salesStatusLabel = self.getSalesStatus(res.salesStatus);
					self.baseInfo.propertyTypeList = (res.propertyType || '').split(',').map(item => {
						return self.getBuildType(item);
					});
					//楼盘标签
					baseInfo.buildingTaglabel = (baseInfo.buildingTag || '').split(',');
					//收藏
					self.dongtaiInfo.isCollection = res.haveCollection === 'true' ? true : false;
					//周边配套
					self.scrollTabs.periphery.isShow = res.lat && res.lng ? true : false;

					// //价格区间
					// if(!res.referenceTotalPriceMin&&!res.referenceTotalPriceMax){
					// 	baseInfo.priceArea ='待定'
					// }else{
					// 	baseInfo.priceArea = '约'+(res.referenceTotalPriceMin||'')+(res.referenceTotalPriceMax?'-'+res.referenceTotalPriceMax:'')+'万';
					// }
					// //建筑面积
					// if(!res.referenceBuildAreaMin&&!res.referenceBuildAreaMax){
					// 	baseInfo.buildingArea ='待定'
					// }else{
					// 	baseInfo.buildingArea ='约'+(res.referenceBuildAreaMin||'')+(res.referenceBuildAreaMax?'-'+res.referenceBuildAreaMax:'')+'㎡'
					// }
					// 对视频 VR 图片进行处理
					// self.doSortImg(res.annexs);
				})
				.catch(err => {
					console.log('基本信息-err', err);
				});
		},

		//专车带看
		initCallCar() {
			let params = {
				buildingId: this.buildingId
			};
			getCarPhone('', params)
				.then(res => {
					this.callCarMobile = res.mobile || '';
					console.log('专车带看', res);
				})
				.catch(err => {
					console.log('专车带看-err', err);
				});
		},

		//优惠券
		initCouponInfo() {
			let params = {
				buildingId: this.buildingId
			};
			let self = this;
			self.couponFavourList = [];
			self.couponList = [];
			getBuildingCouponInfo('', params)
				.then(res => {
					console.log('优惠券', res);
					self.couponFavourList = res.favourList; //优惠信息展示
					let result = res.result || [];
					result.forEach(item => {
						item.received = JSON.parse(item.received);
					});
					self.couponList = result; //优惠券
					self.scrollTabs.coupon.isShow = self.couponFavourList.length > 0 || self.couponList.length > 0 ? true : false;
				})
				.catch(err => {
					console.log('err-couponInfo', err);
				});
		},
		//户型-tabs
		initBuildingTypeCount(buildingId) {
			let params = {
				buildingId: this.buildingId
			};

			getBuildingTypeCount('', params)
				.then(res => {
					console.log(res, '户型');
					let result = res.result || [];
					this.isShowHouseStyle =result[0].count != 0?true:false 
					this.scrollTabs.style.isShow = this.isShowHouseStyle;
				})
				.catch(err => {
					console.log('户型-err', err);
				});
		},
		//楼盘介绍
		initgetBuildingDescription() {
			let params = {
				buildingId: this.buildingId
			};
			let self = this;
			getBuildingDescription('', params)
				.then(res => {
					console.log('楼盘介绍', res);
					let { descriptionInfo } = self;
					Object.keys(descriptionInfo).forEach(key => {
						descriptionInfo[key] = res[key];
					});
					self.scrollTabs.introduce.isShow = self.descriptionInfo.buildingDescription ? true : false;
				})
				.catch(err => {
					console.log('err-Description', err);
				});
		},
		// 楼盘动态
		initBuildingDynamicAndDate() {
			let params = {
				buildingId: this.buildingId
			};
			let self = this;
			getBuildingDynamicAndDate('', params)
				.then(res => {
					console.log('楼盘动态', res);
					let dateBaseInfoList = res.dateBaseInfoList;
					dateBaseInfoList.forEach(item => {
						item.evidenceDate = item.evidenceDate ? self.$tool.dateFtt('yyyy-MM-dd', new Date(item.evidenceDate * 1)) : '';
						item.identifyChipsDate = item.identifyChipsDate ? self.$tool.dateFtt('yyyy-MM-dd', new Date(item.identifyChipsDate * 1)) : '';
						item.openTime = item.openTime ? self.$tool.dateFtt('yyyy-MM-dd', new Date(item.openTime * 1)) : '';
					});
					self.dongtaiInfo.isShow = (res.dateBaseInfoList || []).length > 0 || (res.dynamicBaseInfoList || []).length > 0 ? true : false;
					self.dongtaiInfo.dateBaseInfoList = dateBaseInfoList;
					self.dongtaiInfo.dynamicBaseInfoList = (res.dynamicBaseInfoList || []).slice(0, 2);
					self.dongtaiInfo.buildingId = self.buildingId;
					self.scrollTabs.dynamic.isShow = self.dongtaiInfo.isShow;
				})
				.catch(err => {
					console.log('动态-err', err);
				});
		},
		//楼盘亮点
		initBuildingBrightSpotList() {
			let params = {
				buildingId: this.buildingId
			};
			let self = this;
			self.isShowHighlights = false;
			self.highlightsInfo.list = [];
			self.highlightsInfo.type = '';
			getBuildingBrightSpotListByBuildingId('', params)
				.then(res => {
					console.log('楼盘亮点', res);
					let { brightSpotAnnexList = [], brightSpotTemplateList = [], brightSpotDefaultType } = res || {};
					//楼盘亮点 APP展示选择 1 图片 2 模板 0不选择(即APP不展示楼盘亮点)'
					if (brightSpotDefaultType == 0) {
						self.isShowHighlights = false;
						self.scrollTabs.highlights.isShow = self.isShowHighlights;
						return;
					}
					brightSpotAnnexList.forEach(item => {
						item.annexPath = item.annexPath;
					});
					brightSpotTemplateList.forEach(item => {
						item.annexPath = item.annexPath;
					});
					self.isShowHighlights = true;
					self.highlightsInfo.type = brightSpotDefaultType;
					self.highlightsInfo.list = brightSpotDefaultType == 1 ? brightSpotAnnexList : brightSpotTemplateList;
					self.scrollTabs.highlights.isShow = self.isShowHighlights;
				})
				.catch(err => {
					console.log('楼盘亮点-err', err);
				});
		},
		//楼栋分布
		initBuildingUnitList() {
			let params = {
				buildingId: this.buildingId
			};
			let self = this;
			getBuildingUnitList('', params).then(res => {
				console.log('楼栋分布-res', res);
				self.spreadAnnexPath = res.annexPath || '';
				self.pcBuildingUnitBaseInfoList = res.cAppBuildingUnitBaseInfoList || [];
				self.scrollTabs.spread.isShow = self.spreadAnnexPath ? true : false;
			});
		},
		chatMessStyle(mess) {
			mess.buildingName = this.mess.buildingAlias;
			mess.areaName = this.mess.areaName;
			mess.streetName = this.mess.streetName;
			this.$refs.consultationFoot.onlineConsultation('', mess);
		},
		chatMess() {
			this.$refs.consultationFoot.onlineConsultation();
		},
		//管家列表
		initHousekeeperList() {
			let params = {
				buildingId: this.buildingId,
				type: '1' //1:楼盘  2:户型
			};
			let self = this;
			getHousekeeperList('', params)
				.then(res => {
					console.log('管家', res);
					
					if(self.workNo){//B-app分享过来，进入到详情页
						let arr = (res.list || []).filter(item=>{
							return item.workNo== self.workNo
						})
						self.managerList = arr;
						self.scrollTabs.manager.isShow = arr.length>0?true:false;
						
					}else{//从小程序其他页面进入
						self.managerList = (res.list || []).slice(0, 3);
						self.scrollTabs.manager.isShow = self.managerList.length > 0 ? true : false;
					}
					
				})
				.catch(err => {
					console.log('管家列表-err', err);
				});
		},
		//推荐楼盘列表
		initBuildingRecommendList() {
			let params = {
				buildingId: this.buildingId,
				cityCode: this.$cache.getCache('storageCity').code //城市CODE
			};
			let self = this;
			getBuildingRecommend('', params)
				.then(res => {
					console.log('推荐楼盘列表', res);
					let list = res.result || [];
					self.scrollTabs.recommend.isShow = list.length > 0 ? true : false;
					if (!list.length) {
						return;
					}
					list.forEach(item => {
						item.salesStatusLabel = self.getSalesStatus(item.salesStatus);
						let typeList = (item.propertyType || '').split(',')[0];
						item.propertyTypeLabel = self.getBuildType(typeList);
						//价格区间
						item.referenceTotalPriceMin = res.referenceTotalPriceMin;
						item.referenceTotalPriceMax = res.referenceTotalPriceMax;
						item.priceAreaLabel = '约' + (res.referenceTotalPriceMin || '') + (res.referenceTotalPriceMax ? '-' + res.referenceTotalPriceMax : '') + '万';
						//建筑面积
						item.referenceBuildAreaMin = res.referenceBuildAreaMin;
						item.referenceBuildAreaMax = res.referenceBuildAreaMax;
						item.buildingAreaLabel = '约' + (res.referenceBuildAreaMin || '') + (res.referenceBuildAreaMax ? '-' + res.referenceBuildAreaMax : '') + '㎡';
						item.buildingTags = (item.buildingTag || '').split(',');
					});
					self.recommendList = list;
				})
				.catch(err => {
					console.log('推荐楼盘列表-err', err);
				});
		},

		getSalesStatus(salesStatus) {
			// salesStatus:销售状态(1:待售 2:在售 3:售罄  4:在租)
			let label = '';
			switch (salesStatus) {
				case '1':
					label = '待售';
					break;
				case '2':
					label = '在售';
					break;
				case '3':
					label = '售罄';
					break;
				case '4':
					label = '在租';
					break;
			}
			return label;
		},
		getBuildType(type) {
			//物业类型(1:住宅，2:别墅，3:商铺，4:写字楼，5:酒店式公寓，6:车位，7:动迁房，8:其他, 9:洋房,10:公寓)
			let label = '';
			switch (type) {
				case '1':
					label = '住宅';
					break;
				case '2':
					label = '别墅';
					break;
				case '3':
					label = '商铺';
					break;
				case '4':
					label = '写字楼';
					break;
				case '5':
					label = '酒店式公寓';
					break;
				case '6':
					label = '车位';
					break;
				case '7':
					label = '动迁房';
					break;
				case '8':
					label = '其他';
					break;
				case '9':
					label = '洋房';
					break;
				case '10':
					label = '公寓';
					break;
			}
			return label;
		},
		//浏览记录
		// CustomerTrack(){
		// 	if (this.$tool.getToken()){
		// 		 saveCustomerTrack('',{
		// 		 	 dataId:this.buildingId,
		// 		      uniqueId: ''
		// 		 })
		// 	}

		// },
		CustomerTrack() {
			getData('/tospurWeb/pclogin/checkLogin', {
				// token: this.$tool.getToken()
				token: this.$cache.getCache('M-Token')
			})
				.then(res => {
					console.log('我是浏览记录的');
					saveCustomerTrack('', {
						dataId: this.buildingId,
						uniqueId: ''
					});
				})
				.catch(err => {
					console.log('未登录或登录过期', err);
					// console.log(err.code);
					// if (err.code == 1) {
					// 	uni.navigateTo({
					// 		url: '/pagesUser/login/login'
					// 	});
					// }
				});

			// if (this.$tool.getToken()){
			// 	 saveCustomerTrack('',{
			// 	 	 dataId:this.buildingId,
			// 	      uniqueId: ''
			// 	 })
			// }
		}
	}
};
</script>
<style lang="scss" scoped>
.building-detail {
	box-sizing: border-box;
	// border: 1px solid red;
	padding-bottom: 100rpx;
}
.scroll-tabs {
	width: 100%;
	height: 44px;
	line-height: 44px;
	white-space: nowrap;
	box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
	background-color: #ffffff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	.tab-item {
		display: inline-block;
		min-width: 60px;
		font-size: 16px;
		font-weight: 600;
		text-align: center;
	}
	.active {
		color: #00a4ff;
	}
}
</style>
