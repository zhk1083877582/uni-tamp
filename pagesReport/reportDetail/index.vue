<!-- 专属置业报告 -->
<template>
	<view class='report_detail'>
		<view class="title_warp">
			<u-avatar class="avatarTou" :src="headPortrait" size='76' mode="circle"></u-avatar>
			<view class="title_content_warp">
				<view class="title_content">
					<view class="sanJ"></view>
					<view class="lable">
						亲爱的王先生： 
					</view>
					<view class="text">
						 您好！感谢你来访【万科天空之城】销售中心，我是您的置业顾问【赵阳】
					</view>
				</view>
			</view>
		</view>
		
		<!-- 锚点 -->
			<view class="scroll-tabs">
				<u-sticky bg-color='#251B11' offset-top=0 h5-nav-height='0'>
				<scroll-view scroll-x="true" :scroll-left="scrollActiveIndex * 60" show-scrollbar="true" scroll-with-animation="true" style="height: 100%;">
					<view v-for="(item, index) in scrollRealTabs" :key="index" :class="{ active: index === scrollActiveIndex }" class="tab-item" @click.stop="changeScrollTabs(index)">
						{{ item.label }}
						<text class="under_line" :class="{ under_line_active: index === scrollActiveIndex }"></text>
					</view>
				</scroll-view>
				</u-sticky>
			</view>
		<!-- 置业需求 -->
		<demand title="置业需求" class="part1"></demand>
		<!-- 方案推荐 -->
		<recommend class="part2"></recommend>
		<!-- 公共组件 -->
		<public-page title="区域分析" class="part3"></public-page>
		<!-- 置业问答 -->
		<question class="part4"></question>
		<!-- 置业小贴士 -->
		<tips-page class="part5"></tips-page>
		<!-- 管家信息 -->
		<foot-bottom></foot-bottom>
	</view>
</template>

<script>
import demand from './components/demand.vue';
import recommend from './components/recommend.vue';
import publicPage from './components/publicPage.vue';
import question from './components/question.vue';
import tipsPage from "./components/tipsPage.vue";
import footBottom from "@/components/footer/index.vue"
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
			headPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
			//锚点
			isShowScrollTabs: false,
			scrollActiveIndex: 0,
			scrollTabs: {
				coupon: { label: '置业需求', cl: 'part1', isShow: true },
				introduce: { label: '方案推荐', cl: 'part2', isShow: true },
				dynamic: { label: '区域介绍', cl: 'part3', isShow: true },
				style: { label: '置业问答', cl: 'part4', isShow: true },
				spread: { label: '购房小贴士', cl: 'part5', isShow: true },
				periphery: { label: '项目亮点', cl: 'part6', isShow: false },
				highlights: { label: '功能配套', cl: 'part7', isShow: false },
				// manager: { label: '置业问答', cl: 'part8', isShow: true },
				// recommend: { label: '景观建筑', cl: 'part9', isShow: true },
				// recommend: { label: '地铁交通', cl: 'part9', isShow: true },
				// recommend: { label: '周边环境', cl: 'part9', isShow: true },
				// recommend: { label: '周边配套', cl: 'part9', isShow: true },
				// recommend: { label: '升值潜力', cl: 'part9', isShow: true },
				// recommend: { label: '客户答疑', cl: 'part9', isShow: true },
				// recommend: { label: '购房小贴士', cl: 'part9', isShow: true },
			},
			isfixed:false
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
		// tabs切换
		changeScrollTabs(index) {
			this.isfixed = true
			this.scrollActiveIndex = index;
			let item = this.scrollRealTabs[index];
			uni.createSelectorQuery()
				.select(`.${item.cl}`)
				.boundingClientRect(data => {
					//目标节点
					uni.createSelectorQuery()
						.select('.report_detail')
						.boundingClientRect(res => {
							console.log(data,res)
							//最外层盒子节点
							uni.pageScrollTo({
								duration: 0, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
								scrollTop: data.top - res.top - 60 //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
							});
						})
						.exec();
				})
				.exec();
		},
	},
	created() {

	},
	mounted() {

	},
	onLoad(option){
		console.log(option,'传过来的置业报告ID')
		uni.setNavigationBarTitle({
			title: `XX专属的置业报告`
		});
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
.report_detail{
	.title_warp{
		padding: 80rpx 40rpx 40rpx 45rpx;
		display: flex;
		.title_content_warp{
			margin-left: 30rpx;
			background: #ffe6c4;
			border-radius: 16rpx;
			box-shadow: 0px 0px 8rpx 0px rgba(0,0,0,0.05); 
			background: linear-gradient(270deg,#FDEDD7, #FFD799 100%);
			font-weight: 400;
			color: #815c30;
			position: relative;
			.title_content{
				padding: 23rpx 23rpx 30rpx 40rpx;
				background: url(../../static/report-img/KT-bg.png) no-repeat;
				background-size: 144rpx 100%;
				background-position: top right;
				.lable{
					font-size: 28rpx;
					font-weight: 600;
					text-align: left;
					color: #815c30;
					line-height: 32rpx;
					margin-bottom: 16rpx;
				}
				.text{
					font-size: 24rpx;
					text-indent: 40rpx;
					line-height: 40rpx;
				}
				.sanJ:after{
					content: "";
					position: absolute;
					top: 24rpx;
					left: -32rpx;
					border-width: 16rpx;
					border-style: solid;
					border-color: transparent #FFD799 transparent transparent;
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
		color: #9F7747;
		background-color: #251B11;
		/* z-index: 999; */
		.tab-item {
			display: inline-block;
			min-width: 60px;
			font-size: 16px;
			font-weight: 600;
			text-align: center;
			padding: 0 30rpx;
			background-color: #251B11;
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
				background: #251B11;
			}
			.under_line_active{
				background: #ecce9e !important;
			}
		}
		.active {
			color: #EDC687;
		}
		.active::after{
			width: 16rpx;
			transform: translate(16px, -100%);
			transition-duration: 0.5s;
			background-color: #EDC687;
			height: 4rpx;
			border-radius: 4rpx;
		}
		
	}
	.fixed{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		background-color: #251B11;
	}
	.No_fixed{
		position: sticky;
	}
}
</style>
