
<!-- 楼盘详情 -->
<template>
	<view class="pageHouse-buildingInfo">
		<!-- 锚点 -->
		<view class="scroll-tabs" v-show="isShowScrollTabs">
			<scroll-view scroll-x="true" :scroll-left="scrollActiveIndex * 60" show-scrollbar="true" scroll-with-animation="true" style="height: 100%;">
				<view v-for="(item, index) in scrollRealTabs" :key="index" :class="{ active: index === scrollActiveIndex }" class="tab-item" @click.stop="changeScrollTabs(index)">
					{{ item.label }}
				</view>
			</scroll-view>
		</view>
		<building-info ref="reBuildingInfo" :baseInfo="baseInfo" 
			 :buildingId="buildingId">
		</building-info>
		<!-- 楼盘简介 -->
		<house-describe :class="scrollTabs['introduce']['cl']" v-if="descriptionInfo.buildingDescription" 
			:descriptionInfo="descriptionInfo">
		</house-describe>
		<!-- 楼盘动态 -->
		<house-dynamic :class="scrollTabs['dynamic']['cl']"
			v-if="dongtaiInfo.isShow"
			:dongtaiInfo="dongtaiInfo"
			@changeCollectionStatus="doChangeCollectionStatus">
		</house-dynamic>
		<!-- 户型 -->
		<house-style :class="scrollTabs['style']['cl']"
		  v-if="isShowHouseStyle"
		  :buildingId="buildingId">
		</house-style>
		
		<!-- 楼栋分布 -->
		<house-spread :class="scrollTabs['spread']['cl']"
			v-if="spreadAnnexPath" 	:buildingId="buildingId"
			:spreadAnnexPath="spreadAnnexPath"
			:pcBuildingUnitBaseInfoList="pcBuildingUnitBaseInfoList">
		</house-spread>
		<!-- 周边配套 -->
		<house-periphery :class="scrollTabs['periphery']['cl']" 
			v-if="baseInfo.lat && baseInfo.lng" 
			:baseInfo="baseInfo">
		</house-periphery>
		<!-- 楼盘亮点 -->
		<house-highlights :class="scrollTabs['highlights']['cl']"
			 v-if="isShowHighlights" 
			:highlightsInfo="highlightsInfo">
		</house-highlights>
		<!-- 免责声明 -->
		<house-disclaimer></house-disclaimer>
		<view class="pageHouse-bottom">
			<footBottom></footBottom>
		</view>
	</view>
</template>

<script>
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
	
	import buildingInfo from './components/buildingInfo.vue';
	import houseDescribe from './components/houseDescribe.vue'; //楼盘简介
	import houseDynamic from './components/houseDynamic.vue'; //动态
	import houseStyle from './components/houseStyle.vue'; //户型
	import houseSpread from './components/houseSpread.vue'; //楼栋分布
	import housePeriphery from './components/housePeriphery.vue'; //周边配套
	import houseHighlights from './components/houseHighlights.vue'; //楼盘亮点
	import houseDisclaimer from './components/houseDisclaimer.vue'; //免责声明
	import footBottom from '@/components/footer/index.vue'
	export default {
		components:{
			buildingInfo,
			houseDescribe,
			houseDynamic,
			houseStyle,
			houseSpread,
			housePeriphery,
			houseHighlights,
			houseDisclaimer,
			footBottom
		},
		data() {
			return {
				buildingId:'',
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
				//楼盘介绍
				descriptionInfo: {
					annexPath: '', //图片
					buildingDescription: '' //描述
				},
				// 动态信息
				dongtaiInfo: {
					isShow: false,
					buildingId: '',
					dateBaseInfoList: [],
					dynamicBaseInfoList: []
				},
				//户型
				isShowHouseStyle: true,
				// 楼栋分布
				spreadAnnexPath: '',
				pcBuildingUnitBaseInfoList: [],
				//楼盘亮点
				isShowHighlights: false,
				highlightsInfo: {
					type: 0,
					list: []
				},
				//滚动条
				isShowScrollTabs: false,
				scrollActiveIndex: 0,
				scrollTabs: {
					introduce: { label: '简介', cl: 'part1', isShow: false },
					dynamic: { label: '动态', cl: 'part2', isShow: false },
					style: { label: '户型', cl: 'part3', isShow: false },
					spread: { label: '楼栋', cl: 'part4', isShow: false },
					periphery: { label: '周边', cl: 'part5', isShow: false },
					highlights: { label: '亮点', cl: 'part6', isShow: false },
				}
			}
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
		onLoad(option={}){
			console.log('-------进入builddingInfo')
			this.buildingId = option.buildingId||'1155';
			this.initBaseInfo();
			this.initGetBuildingDescription();
			this.initBuildingDynamicAndDate();
			this.initBuildingTypeCount();
			this.initBuildingUnitList();
			this.initBuildingBrightSpotList();
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
			// srcoll-tabs切换
			changeScrollTabs(index) {
				this.scrollActiveIndex = index;
				let item = this.scrollRealTabs[index];
				uni.createSelectorQuery()
					.select(`.${item.cl}`)
					.boundingClientRect(data => {
						//目标节点
						uni.createSelectorQuery()
							.select('.pageHouse-buildingInfo')
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
			// 楼盘-图片信息|基本信息
			initBaseInfo(){
				let params = {
					buildingId: this.buildingId
				};
				let self =this;
				getBuildingBaseInfo('', params)
					.then(res => {
						// console.log('----基本信息', res);
						// let {buildingAlias,annexs={}} = res;
						//设置标题
						uni.setNavigationBarTitle({ title: res.buildingAlias });
						// 视频 VR  图片
						self.$refs.reBuildingInfo.doFormatImgList(res.annexs);
						// 其他的信息
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
			//楼盘介绍
			initGetBuildingDescription() {
				let params = {
					buildingId: this.buildingId
				};
				let self = this;
				getBuildingDescription('', params)
					.then(res => {
						console.log('----楼盘介绍', res);
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
						console.log('---楼盘动态', res);
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
			//户型-tabs
			initBuildingTypeCount() {
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
.pageHouse-buildingInfo{
	background-color: #FFFFFF;
	// color: #FFFFFF;
	padding-bottom: 114rpx;
	.scroll-tabs {
		width: 100%;
		height: 44px;
		line-height: 44px;
		white-space: nowrap;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
		background-color: #000000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		.tab-item {
			display: inline-block;
			min-width: 120rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #827870;
			text-align: center;
		}
		.active {
			color: #9F7747;
		}
	}
	
	.pageHouse-bottom{
		width:100%;
		// background: #1e150c;
		border-top:1px solid #e2e2e2;
		position: fixed;
		bottom:0;
		left:0;
	}
}
</style>
