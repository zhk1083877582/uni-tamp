
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
		  :totalHouseStyleList="totalHouseStyleList" :houseTabs="houseTabs"
		  :buildingId="buildingId">
		</house-style>
		
		<!-- 楼栋分布 -->
		<house-spread :class="scrollTabs['spread']['cl']"
			v-if="spreadAnnexPath" 	:buildingId="buildingId"
			:spreadAnnexPath="spreadAnnexPath"
			:buildingUnitBaseInfoList="buildingUnitBaseInfoList">
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
			<footBottom v-if="userId" :userId='userId' modelType='2'></footBottom>
		</view>
	</view>
</template>

<script>
	import {
		getData,
		getBuildingBaseInfo,
		getBuildingAnnex,
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
				userId:'',
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
				isShowHouseStyle: false,
				houseTabs:[],//户型tabs
				totalHouseStyleList:[],//户型
				// 楼栋分布
				spreadAnnexPath: '',
				buildingUnitBaseInfoList: [],
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
			console.log('-------进入builddingInfo',option)
			this.buildingId = option.buildingId||'10178';
			this.userId = option.userId;
			this.initBaseInfo();
			this.initGetAnnex();
			// this.initGetBuildingDescription();
			// this.initBuildingDynamicAndDate();
			// this.initBuildingTypeCount();
			// this.initBuildingUnitList();
			// this.initBuildingBrightSpotList();
		},
		onPageScroll(e) {
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
				getBuildingBaseInfo('/business/building/info', params)
					.then(res => {
						console.log('----基本信息', res);
						let {baseInfo,brightSpot={},buildingList={},dynamicList={},houseTypeAll={},introduction={},openTimeList={}} =res;
						
						//设置标题
						uni.setNavigationBarTitle({ title: baseInfo.buildingAlias });
						
						//baseInfo的信息
						self.getBuildingInfo(baseInfo)
						//楼盘介绍
						self.annexPath = introduction.logoImage;
						self.buildingDescription = introduction.description;
						self.scrollTabs.introduce.isShow = introduction.buildingDescription ? true : false;
						//楼盘动态
						self.getDynamicAndDate(openTimeList,dynamicList);
						//户型
						self.getHouseTypeList(houseTypeAll)
						// 楼栋分布
						self.getBuildingUnitList(buildingList);   
						 //周边配套
						 self.scrollTabs.periphery.isShow = baseInfo.lat && baseInfo.lng ? true : false;						
						//楼盘亮点
						self.getBrightSpotList(brightSpot)
					})
					.catch(err => {
						console.log('基本信息-err', err);
					});
			},
			//获取楼盘详情相关的图片
			initGetAnnex(){
				let params = {
					buildingId: this.buildingId
				};
				let self = this;
				getBuildingAnnex('/business/building/buildingAnnex',params)
					.then(res => {
						self.$refs.reBuildingInfo.doFormatImgList(res.list||[]);
					})
					.catch(err => {
						console.log('err-Description', err);
					});
			},
			//楼盘的基本信息
			getBuildingInfo(baseInfo){
				baseInfo.referenceAveragePrice = baseInfo.referenceAveragePrice?parseInt(baseInfo.referenceAveragePrice):'';
				baseInfo.referenceBuildAreaMin = baseInfo.referenceBuildAreaMin?parseInt(baseInfo.referenceBuildAreaMin):'';
				baseInfo.referenceBuildAreaMax = baseInfo.referenceBuildAreaMax?parseInt(baseInfo.referenceBuildAreaMax):'';
				baseInfo.referenceTotalPriceMin = baseInfo.referenceTotalPriceMin?parseInt(baseInfo.referenceTotalPriceMin):'';
				baseInfo.referenceTotalPriceMax = baseInfo.referenceTotalPriceMax?parseInt(baseInfo.referenceTotalPriceMax):'';
				baseInfo.openTime = baseInfo.openTime?this.$tool.dateFtt('yyyy-MM-dd',new Date( baseInfo.openTime)) :'开盘待定'
				baseInfo.salesStatusItem = this.getSalesStatus(baseInfo.salesStatus);
				baseInfo.propertyTypeList=[];
				(baseInfo.propertyTypes||[]).forEach(item=>{
					baseInfo['propertyTypeList'].push( this.getPropertyType(item.propertyType))
				})
				baseInfo.buildingTags =[];
				(baseInfo.tags||[]).forEach(item=>{
					baseInfo['buildingTags'].push( item.tagName)
				})
				this.baseInfo =baseInfo;
			},
			// 楼盘动态
			getDynamicAndDate(openTimeList,dynamicList) {
				let self=this;
				let dateBaseInfoList =(openTimeList.list||[]).map(item=>{
					item.evidenceDate = item.evidenceDate ? self.$tool.dateFtt('yyyy-MM-dd', new Date(item.evidenceDate * 1)) : '';
					item.identifyChipsDate = item.identifyChipsDate ? self.$tool.dateFtt('yyyy-MM-dd', new Date(item.identifyChipsDate * 1)) : '';
					item.openTime = item.openTime ? self.$tool.dateFtt('yyyy-MM-dd', new Date(item.openTime * 1)) : '';
					return item;
				})
				let dynamicBaseInfoList = (dynamicList.list||[]).map(item=>{
					item.createTime = item.createTime ? self.$tool.dateFtt('yyyy-MM-dd', new Date(item.createTime * 1)) : '';
					return item;
				})
				self.dongtaiInfo.isShow = ( dateBaseInfoList.length > 0 || dynamicBaseInfoList.length>0 ) ? true : false;
				self.dongtaiInfo.dateBaseInfoList = dateBaseInfoList;
				self.dongtaiInfo.dynamicBaseInfoList = dynamicBaseInfoList.slice(0, 2);
				self.dongtaiInfo.buildingId = self.buildingId;
				self.scrollTabs.dynamic.isShow = self.dongtaiInfo.isShow;
			},
			//户型
			getHouseTypeList(houseTypeAll){
				let self =this;
				let {list=[]} = houseTypeAll;
				if(list.length==0){
					self.isShowHouseStyle =false;
					self.scrollTabs.style.isShow = false;
					return 
				}
				//获取顶部户型tabs
				let houseTabs =[];
				let roomArr =list.map((item) => {
					return item.bedroom
				});
				let obj = {};//想要的数据是 1-10 室 出现了几次  {1:xx,2:xx,...,10:xx}
				roomArr.forEach((v, k) => {
				  if (obj[v]) {
					obj[v]++;
				  } else {
					obj[v] = 1;
				  }
				});
				for (let key in obj) {
				  if (obj.hasOwnProperty(key)) {
					houseTabs.push({
					  bedroom: key,
					  count: obj[key],
					});
				  }
				}
				houseTabs.unshift({
				  bedroom: 0,
				  count: list.length,
				});	
				self.houseTabs = houseTabs.map(item=>{
					item.bedroomName = self.bedRoomFlag(item.bedroom)
					return item;
				});
				self.isShowHouseStyle =true;
				self.totalHouseStyleList = list;
				self.scrollTabs.style.isShow = true;
				   
			},
			bedRoomFlag(value) {
			  let set = {
			    0: "全部",
			    1: "一室",
			    2: "二室",
			    3: "三室",
			    4: "四室",
			    5: "五室",
			    6: "六室",
			    7: "七室",
			    8: "八室",
			    9: "九室",
			    10: "十室",
			  };
			  return set.hasOwnProperty(value) ? set[value] : value;
			},
			//楼栋分布
			getBuildingUnitList(buildingList) {
				let { list=[] } = buildingList;
				this.spreadAnnexPath = list[0]&&list[0].buildingNumberPic;
				this.buildingUnitBaseInfoList =list;
				this.scrollTabs.spread.isShow = this.spreadAnnexPath ? true : false;
				
			},

			
			//楼盘亮点
			getBrightSpotList(brightSpot) {
				let {list=[]} = brightSpot||{};
				if(list.length==0){
					this.scrollTabs.highlights.isShow = false;
					return 
				}
				//type:1 图片 2 模板 0不选择(即APP不展示楼盘亮点)'
				let brightSpotAnnexList = list.filter(item=>{
					return  item.type ==1;
				})
				let brightSpotTemplateList = list.filter(item=>{
					return  item.type ==2;
				})
				//图片模式
				if(brightSpotAnnexList.length>0){
					this.highlightsInfo.type =1;
					this.highlightsInfo.list  = brightSpotAnnexList;
				}
				//模板模式
				if(brightSpotTemplateList.length>0){
					this.highlightsInfo.type =2;
					this.highlightsInfo.list  = brightSpotTemplateList;
				}
				if(this.highlightsInfo.list.length){
					this.scrollTabs.highlights.isShow = true;
				}
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
		background-color: #FFFFFF;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		.tab-item {
			display: inline-block;
			min-width: 120rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #666666;
			text-align: center;
		}
		.active {
			color: #4a6ddb;;
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
