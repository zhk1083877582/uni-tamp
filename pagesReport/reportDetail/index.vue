<!-- 专属置业报告 -->
<template>
	<view class='report_detail'>
		<view class="title_warp">
			<u-avatar class="avatarTou" :src="headPortrait?headPortrait:defaultheadPortrait" size='96' mode="circle"></u-avatar>
			<view class="title_content_warp">
				<view class="title_content">
					<view class="sanJ"></view>
					<view class="lable">
						亲爱的{{windowTitle}}： 
					</view>
					<view class="text">
						 您好！感谢您来访【{{buildingInfo.buildingAlias||'-'}}】销售中心，我是您的置业顾问【{{userName||'-'}}】
					</view>
				</view>
			</view>
		</view>
		
		<!-- 锚点 -->
			<view class="scroll-tabs">
				<u-sticky bg-color='#0A2056' offset-top=0 h5-nav-height='0'>
				<scroll-view scroll-x="true" :scroll-left="scrollActiveIndex * 60" show-scrollbar="true" scroll-with-animation="true" style="height: 100%;" class="scroll_view">
					<view v-for="(item, index) in scrollRealTabs" :key="index" :class="{ active: index === scrollActiveIndex }" class="tab-item" @click.stop="changeScrollTabs(item,index)">
						<view v-if="item.isShow">
							{{ item.label }}
							<text class="under_line" :class="{ under_line_active: index === scrollActiveIndex }"></text>
						</view>
					</view>
				</scroll-view>
				</u-sticky>
			</view>
		<!-- 置业需求 -->
		<demand title="置业需求" class="part1" v-if="customerIntention!=null" :resData='customerIntention' :logData='logData'></demand>
		<!-- 方案推荐 -->
		<recommend class="part2" v-if="recommendation!=null&&buildingInfo!=null" :resData='recommendation' :baseInfo='buildingInfo' :userId='userId' :reportId='reportId'></recommend>
		<!-- 公共组件 -->
		<view v-for="(item,index) in articleList" :key="index">
			<public-page :title="item.ztLabelType" :class="'part'+(index+3)" :resData='item'></public-page>
		</view>
		<!-- 置业问答 -->
		<question class="part99" v-if="questionList!=null&&JSON.stringify(questionList)!='[]'" :resData='questionList'></question>
		<!-- 置业小贴士 -->
		<tips-page class="part100"></tips-page>
		<view class="reference_txt">*本报告仅供参考，准确信息请以开发商所披露的信息为准，客户需根据自身情况进行购买决策。</view>
		<!-- 管家信息 -->
		<view :class="isfixed?'fixed_bottom':''">
			<foot-bottom :userId='userId' @handelUserName="getUserName" v-if="userId" modelType='3' :reportId='reportId' :buildingId='buildingId' operateCanal='2'></foot-bottom>
		</view>
	</view>
</template>

<script>
import demand from './components/demand.vue';
import recommend from './components/recommend.vue';
import publicPage from './components/publicPage.vue';
import question from './components/question.vue';
import tipsPage from "./components/tipsPage.vue";
import footBottom from "@/components/footer/index.vue";
import { getData } from '@/request/api';
export default {
	components: {
		demand,//置业需求
		recommend,//方案推荐
		publicPage,//样式相同的组件
		question,//置业问答
		tipsPage,
		footBottom
	},
	data() {
		return {
			defaultheadPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
			headPortrait:'',
			//锚点
			isShowScrollTabs: false,
			scrollActiveIndex: 0,
			scrollTabs: [
				{ label: '置业需求', cl: 'part1', isShow: false,id:'demand' },
				{ label: '方案推荐', cl: 'part2', isShow: false,id:'recommend' },
				// dynamic: { label: '区域介绍', cl: 'part3', isShow: false },
				{ label: '置业问答', cl: 'part99', isShow: false,id:'question' },
				{ label: '置业小贴士', cl: 'part100', isShow: true,id:'tips' },
			],
			// scrollTabs:{
			// 	demand: { label: '置业需求', cl: 'part1', isShow: false },
			// 	recommend: { label: '方案推荐', cl: 'part2', isShow: false },
			// 	// dynamic: { label: '区域介绍', cl: 'part3', isShow: false },
			// 	question: { label: '置业问答', cl: 'part99', isShow: false },
			// 	tips: { label: '置业小贴士', cl: 'part100', isShow: true },
			// }
			isfixed:false,
			customerIntention:null,//置业需求
			articleList:[],//公共样式列表
			questionList:null,//问答列表
			recommendation:null, //推荐方案
			buildingInfo:null,
			LabelCategoryList:[],//关注重点字典
			
			userName:'',
			userId:'',//顾问ID
			windowTitle:'',//客户姓名  客户性别
			buildingId:'',//楼盘ID
			
			reportId:'',
			beginTime:'',//进入页面时间戳
			endTime:'',//离开页面时间戳
			
			logData:{}
		};
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
	watch: {},
	methods: {
		changeScrollTabsShow(id,isShowStatus){
			this.scrollTabs.forEach((item)=>{
				if(item.id == id){
					item.isShow = isShowStatus
				}
			})
		},
		// tabs切换
		changeScrollTabs(currentItem,index) {
			this.isfixed = true
			this.scrollActiveIndex = index;
			// let item = this.scrollRealTabs[index];
			uni.createSelectorQuery()
				.select(`.${currentItem.cl}`)
				.boundingClientRect(data => {
					//目标节点
					uni.createSelectorQuery()
						.select('.report_detail')
						.boundingClientRect(res => {
							console.log(data,res)
							//最外层盒子节点
							uni.pageScrollTo({
								duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
								scrollTop: data.top - res.top - 50 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
							});
						})
						.exec();
				})
				.exec();
		},
		getReportData(reportId){
			let params = {
				reportId
			}
			getData('/dt-business/noToken/report/reportDetail',params).then((res)=>{
				console.log('置业报告详情数据',res)
				let self = this
				//置业需求
				// if(res.customerIntention&&res.customerIntention.customerFocus){
				// 	res.customerIntention.customerFocusText = this.formatLabelCategory(this.LabelCategoryList,res.customerIntention.customerFocus)
				// }
				this.customerIntention = res.customerIntention;
				let isShowDemand = res.customerIntention != null?true:false;
				this.changeScrollTabsShow('demand',isShowDemand)
				
				//推荐方案
				this.recommendation = res.recommendation!=null?res.recommendation:null;
				this.buildingInfo = res.buildingInfo!=null?res.buildingInfo:null;
				this.buildingId = res.buildingInfo!=null?res.buildingInfo.buildingId:''
				console.log(this.buildingId,'buildingId')
				let isShowRecommend = res.recommendation != null&&res.buildingInfo!=null?true:false;
				console.log(isShowRecommend,'11111111111')
				//添加title
				this.recommendation&&this.recommendation.forEach((item,index)=>{
					item.tableTitle = '方案'+this.$tool.Arabia_To_SimplifiedChinese(index+1)
					item.houseType = `${item.bedroom||'-'}室${item.parlor||'-'}厅${item.kitchen||'-'}厨${item.bathroom||'-'}卫`
				})
				this.changeScrollTabsShow('recommend',isShowRecommend)
				
				//公共样式列表
				this.articleList = res.articleList;
				res.articleList&&res.articleList.map((item,index)=>{
					self.scrollTabs.splice(2+index,0,{ label: item.ztLabelType, cl: 'part'+(3+index), isShow: true})
				})
				
				//问答列表
				this.questionList = res.questionList;
				let isShowQuestion = res.questionList==null||JSON.stringify(res.questionList)=='[]'?false:true;
				this.changeScrollTabsShow('question',isShowQuestion)
				
				this.userId = res.customerIntention?res.customerIntention.userId:''
				
				let customerGender=res.customerIntention?res.customerIntention.gender:''
			    let customerName = res.customerIntention?res.customerIntention.customerName:''
				this.windowTitle = `${customerName?customerName.substring(0,1):'-'}${customerGender=='男'?'先生':customerGender=='女'?'女士':'先生/女士'}`
				uni.setNavigationBarTitle({
					title: `${this.windowTitle}的专属置业计划书`
				});
				this.share.title = this.buildingInfo?this.buildingInfo.buildingAlias + '置业计划书' : '置业计划书'
				this.share.imageUrl = 'https://media.tongcehaofang.com/image/default/7053D048F5714430B1815AAA566CC1FF-6-2.jpg'
				
				this.logData = {
					beginTime:this.beginTime,
					reportId:reportId,
					userId:this.userId
				}
				//埋点
				this.buryingPoint.beginTime = this.beginTime
				this.buryingPoint.endTime = ''
				this.buryingPoint.operationType = '2'
				this.buryingPoint.modelType = '3'
				this.buryingPoint.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
				this.buryingPoint.reportId = reportId
				this.buryingPoint.userId = this.userId
				this.ReportLog()
				
				//客户足迹埋点
				this.CustomerTrack.operateType = '1'
				this.CustomerTrack.createrId = this.userId
				this.CustomerTrack.userId = this.userId
				this.CustomerTrack.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
				this.CustomerTrack.dataId = this.reportId
				
			}).catch((err)=>{
				console.log(err)
			})
		},
		getUserName(userInfo){
			console.log('1===',userInfo)
			this.userName = userInfo.userName
			this.headPortrait = userInfo.avatarUrl
		},
		//客户查看置业报告埋点接口
		getCustomerLookReportLog(){
			let params = {
				customerId:this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:'',//客户id
				reportId:this.reportId,//置业报告id
				lookTime:this.lookTime,//阅读时间
				readTime: this.endTime - this.beginTime//阅读时长
			}
			getData('/dt-business/noToken/report/customerLookReportLog',params).then((res)=>{
				
			}).catch(err=>{
				console.log(err)
			})
		},
		//关注重点
		getLabelCategory(){
			getData('/dt-business/customer/getLabelCategory').then((res)=>{
				this.LabelCategoryList = res.list
				console.log('关注重点',res)
			}).catch(err=>{
				console.log('关注重点',err)
			})
		},
		//关注重点转换
		formatLabelCategory(list,key){
			if(!key) return '-'
			let keyArr = [],arr=[]
			if(key.length>1){
			    keyArr = key.split(',')
			    list.forEach((item,index)=>{
			      keyArr.forEach((itemT,indexT)=>{
			        if(itemT==item.labelId)
			          arr.push(item.ztLabelType)
			      })
			    })
			  }else{
			    list.forEach((item,index)=>{
			        if(key==item.labelId){
			          arr.push(item.ztLabelType)
			        }
			    })
			  }
			return arr.join('、')
		}
	},
	created() {

	},
	mounted() {
		console.log(this.buryingPoint,'this.buryingPointthis.buryingPoint')
		//埋点
		// this.buryingPoint.operationType = '4'
	},
	onLoad(option){
		console.log(option,'传过来的置业报告ID')
		// this.getLabelCategory();
		this.reportId = option.reportId
		this.getReportData(option.reportId);
		this.beginTime = (new Date()).getTime()
		this.lookTime = this.$tool.DateFormat('yyyy-MM-dd hh:mm:ss',new Date())
		this.share.path = '/pagesReport/book/index?reportId='+ this.reportId
	},
	onPageScroll(e) {
		if (e.scrollTop > 150) {
			this.isfixed = true;
		} else {
			this.isfixed = false;
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
					if (data && data.top <= 90 && data.bottom >= 90) {
						self.scrollActiveIndex = i;
					}
				})
				.exec();
		}
	},
	onShow(){
		console.log('onShow 111')
		console.log(this.$tool.getStorage('Login-Data'),'customerInfocustomerInfo')
	},
	onHide(){
		console.log('onHide 222')
		this.endTime = (new Date()).getTime()
		this.buryingPoint.beginTime = this.beginTime
		this.buryingPoint.endTime = this.endTime
		this.buryingPoint.operationType = '3'
		this.buryingPoint.modelType = '3'
		this.buryingPoint.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
		this.buryingPoint.reportId = this.reportId
		this.buryingPoint.userId = this.userId
		this.ReportLog()
		
		//客户足迹埋点
		this.CustomerTrack.stayTime = (new Date()).getTime() - this.beginTime
		this.addCustomerTrack()
		
		//客户查看置业报告埋点接口
		this.getCustomerLookReportLog()
	},
	onUnload(){
		console.log('onUnload 333')
		this.endTime = (new Date()).getTime()
		this.buryingPoint.beginTime = this.beginTime
		this.buryingPoint.endTime = this.endTime
		this.buryingPoint.operationType = '3'
		this.buryingPoint.modelType = '3'
		this.buryingPoint.customerId = this.$tool.getStorage('Login-Data').customerInfo?this.$tool.getStorage('Login-Data').customerInfo.customerId:''
		this.buryingPoint.reportId = this.reportId
		this.buryingPoint.userId = this.userId
		this.ReportLog()
		
		//客户足迹埋点
		this.CustomerTrack.stayTime = (new Date()).getTime() - this.beginTime
		this.addCustomerTrack()
		
		//客户查看置业报告埋点接口
		this.getCustomerLookReportLog()
	}
}
</script>
<style lang='scss'>
	page{
		background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
	}
</style>
<style lang='scss' scoped>
.report_detail{
	background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
	/* height: 100%; */
	padding-bottom: 104rpx;
	.title_warp{
		padding: 40rpx 32rpx 32rpx 32rpx;
		display: flex;
		.title_content_warp{
			margin-left: 20rpx;
			background: #ffe6c4;
			border-radius: 16rpx;
			box-shadow: 0px 0px 8rpx 0px rgba(0,0,0,0.05); 
			background: #FFFFFF;
			font-weight: 400;
			color: #815c30;
			position: relative;
			.title_content{
				padding: 23rpx 23rpx 30rpx 40rpx;
				.lable{
					font-size: 28rpx;
					font-weight: 600;
					text-align: left;
					color: #141414;
					line-height: 32rpx;
					margin-bottom: 16rpx;
				}
				.text{
					font-size: 24rpx;
					text-indent: 40rpx;
					line-height: 40rpx;
					color: #999999;
				}
				.sanJ:after{
					content: "";
					position: absolute;
					top: 35rpx;
					left: -20rpx;
					border-width: 12rpx;
					border-style: solid;
					border-color: transparent #FFFFFF transparent transparent;
				}
			}
		}
	}
	/* 锚点 */
	.scroll-tabs {
		width: 100%;
		/* height: 44px; */
		line-height: 44px;
		white-space: nowrap;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
		color: rgba(255,255,255,0.5);
		background: linear-gradient(181deg,#0A2056, #0D255F,#0A2056 100%);
		margin-bottom: 39rpx;
		/* z-index: 999; */
		.scroll_view{
			background: linear-gradient(181deg,#0A2056, #0D255F,#0A2056 100%);
		}
		.tab-item {
			display: inline-block;
			min-width: 60px;
			font-size: 16px;
			font-weight: 600;
			text-align: center;
			padding: 0 30rpx;
			background: linear-gradient(181deg,#0A2056, #0D255F,#0A2056 100%);
			position: relative;
			.under_line{
				position: absolute;
				bottom: 10rpx;
				left: 50%;
				transform: translate(-50%);
				width: 40rpx;
				height: 6rpx;
				display: block;
				border-radius: 4rpx;
				margin: 0 auto;
				background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
			}
			.under_line_active{
				background: #FFFFFF !important;
			}
		}
		.active {
			color: #FFFFFF;
		}
		.active::after{
			width: 16rpx;
			transform: translate(16px, -100%);
			transition-duration: 0.5s;
			background-color: #FFFFFF;
			height: 4rpx;
			border-radius: 4rpx;
		}
		
	}
	.fixed{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
	}
	.No_fixed{
		position: sticky;
	}
	.fixed_bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
	}
	.reference_txt{
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(255,255,255,0.28);
		line-height: 30rpx;
		color: rgba(255,255,255,0.28);
		margin: 40rpx 24rpx;
	}
}
</style>
