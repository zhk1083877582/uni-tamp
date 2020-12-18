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
						 您好！感谢你来访【{{buildingInfo.buildingAlias||'-'}}】销售中心，我是您的置业顾问【{{userName||'-'}}】
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
		<demand title="置业需求" class="part1" v-if="customerIntention!=null" :resData='customerIntention'></demand>
		<!-- 方案推荐 -->
		<recommend class="part2" v-if="recommendation!=null&&buildingInfo!=null" :resData='recommendation' :baseInfo='buildingInfo'></recommend>
		<!-- 公共组件 -->
		<view v-for="(item,index) in articleList" :key="index">
			<public-page :title="item.ztLabelType" :class="'part'+(index+3)" :resData='item'></public-page>
		</view>
		<!-- 置业问答 -->
		<question class="part99" v-if="questionList!=null" :resData='questionList'></question>
		<!-- 置业小贴士 -->
		<tips-page class="part100"></tips-page>
		<!-- 管家信息 -->
		<foot-bottom :userId='userId' @handelUserName="getUserName" v-if="userId"></foot-bottom>
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
				{ label: '购房小贴士', cl: 'part100', isShow: true,id:'tips' },
			],
			// scrollTabs:{
			// 	demand: { label: '置业需求', cl: 'part1', isShow: false },
			// 	recommend: { label: '方案推荐', cl: 'part2', isShow: false },
			// 	// dynamic: { label: '区域介绍', cl: 'part3', isShow: false },
			// 	question: { label: '置业问答', cl: 'part99', isShow: false },
			// 	tips: { label: '购房小贴士', cl: 'part100', isShow: true },
			// }
			isfixed:false,
			customerIntention:null,//置业需求
			articleList:[],//公共样式列表
			questionList:null,//问答列表
			recommendation:null, //推荐方案
			buildingInfo:null,
			
			userName:'',
			userId:'',//顾问ID
			windowTitle:'',//客户姓名  客户性别
			
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
			getData('/business/report/reportDetail',params).then((res)=>{
				console.log('置业报告详情数据',res)
				let self = this
				//置业需求
				this.customerIntention = res.customerIntention;
				let isShowDemand = res.customerIntention != null?true:false;
				this.changeScrollTabsShow('demand',isShowDemand)
				
				//推荐方案
				this.recommendation = res.recommendation!=null?res.recommendation.list:null;
				this.buildingInfo = res.buildingInfo!=null?res.buildingInfo:null;
				let isShowRecommend = res.recommendation != null&&res.buildingInfo!=null?true:false;
				//添加title
				this.recommendation&&this.recommendation.forEach((item,index)=>{
					item.tableTitle = '方案'+this.$tool.Arabia_To_SimplifiedChinese(index+1)
				})
				this.recommendation
				this.changeScrollTabsShow('recommend',isShowRecommend)
				
				//公共样式列表
				this.articleList = res.articleList;
				res.articleList&&res.articleList.map((item,index)=>{
					console.log(item)
					self.scrollTabs.splice(2+index,0,{ label: item.ztLabelType, cl: 'part'+(3+index), isShow: true})
				})
				console.log('scrollTabs',this.scrollTabs)
				
				//问答列表
				this.questionList = res.questionList;
				let isShowQuestion = res.questionList==null?false:true;
				this.changeScrollTabsShow('question',isShowQuestion)
				console.log(this.scrollRealTabs,1111)
				
				this.userId = res.businessReport?res.businessReport.userId:''
				
				let customerGender=res.businessReport?res.businessReport.customerGender:''
			    let subscriberName = res.businessReport?res.businessReport.customerName:''
				this.windowTitle = `${subscriberName}${customerGender=='1'?'先生':'女士'}`
				uni.setNavigationBarTitle({
					title: `${this.windowTitle}的专属置业报告`
				});
				this.share.title = this.buildingInfo.buildingAlias + '置业报告'
			}).catch((err)=>{
				console.log(err)
			})
		},
		getUserName(userInfo){
			console.log('1===',userInfo)
			this.userName = userInfo.userName
			this.headPortrait = userInfo.avatarUrl
		}
	},
	created() {

	},
	mounted() {

	},
	onLoad(option){
		console.log(option,'传过来的置业报告ID')
		this.getReportData(option.reportId);
	},
	onPageScroll(e) {
		// console.log(77,e)
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
					// console.log(9898, data);
					if (data && data.top <= 90 && data.bottom >= 90) {
						self.scrollActiveIndex = i;
					}
				})
				.exec();
		}
	},
}
</script>
<style lang='scss' scoped>
/deep/page{
	background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
}
.report_detail{
	background: linear-gradient(181deg,#0A2056, #0D255F,#062471 99%);
	/* height: 100%; */
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
}
</style>
