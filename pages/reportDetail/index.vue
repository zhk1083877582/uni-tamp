<!-- 专属置业报告 -->
<template>
	<view class='report_detail'>
		<view class="title_warp">
			<u-avatar class="avatarTou" :src="headPortrait" size='76' mode="circle"></u-avatar>
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
		
		<!-- 锚点 -->
		<view class="scroll-tabs">
			<scroll-view scroll-x="true" :scroll-left="scrollActiveIndex * 60" show-scrollbar="true" scroll-with-animation="true" style="height: 100%;">
				<view v-for="(item, index) in scrollRealTabs" :key="index" :class="{ active: index === scrollActiveIndex }" class="tab-item" @click.stop="changeScrollTabs(index)">
					{{ item.label }}
				</view>
			</scroll-view>
		</view>
		<!-- 置业需求 -->
		<demand></demand>
		<!-- 方案推荐 -->
		<recommend></recommend>
	</view>
</template>

<script>
import demand from './components/demand.vue';
import recommend from './components/recommend.vue'
export default {
	components: {
		demand,//置业需求
		recommend,//方案推荐
	},
	data() {
		return {
			headPortrait:'https://media.tongcehaofang.com/image/default/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
			//锚点
			isShowScrollTabs: false,
			scrollActiveIndex: 0,
			scrollTabs: {
				coupon: { label: '优惠', cl: 'part1', isShow: true },
				introduce: { label: '简介', cl: 'part2', isShow: true },
				dynamic: { label: '动态', cl: 'part3', isShow: true },
				style: { label: '户型', cl: 'part4', isShow: true },
				spread: { label: '楼栋', cl: 'part5', isShow: true },
				periphery: { label: '周边', cl: 'part6', isShow: true },
				highlights: { label: '亮点', cl: 'part7', isShow: true },
				manager: { label: '管家', cl: 'part8', isShow: true },
				recommend: { label: '推荐', cl: 'part9', isShow: true }
			}
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
	}
}
</script>
<style lang='scss' scoped>
.report_detail{
	.title_warp{
		padding: 80rpx 40rpx 40rpx 45rpx;
		display: flex;
		.title_content{
			margin-left: 30rpx;
			padding: 23rpx 23rpx 30rpx 40rpx;
			background: #ffe6c4;
			border-radius: 16rpx;
			box-shadow: 0px 0px 8rpx 0px rgba(0,0,0,0.05); 
			background: linear-gradient(270deg,#FDEDD7, #FFD799 100%);
			font-weight: 400;
			color: #815c30;
			position: relative;
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
	/* 锚点 */
	.scroll-tabs {
		width: 100%;
		height: 44px;
		line-height: 44px;
		white-space: nowrap;
		box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.08);
		color: #9F7747;
		z-index: 999;
		.tab-item {
			display: inline-block;
			min-width: 60px;
			font-size: 16px;
			font-weight: 600;
			text-align: center;
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
	}
}
</style>
