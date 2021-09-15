<!-- 楼盘动态 -->
<template>
	<view class="app" :class="lineFlag? '' : 'app1' ">
		<view class="mian" v-if="lineFlag">
			<view class="timeline-item" v-for="(item, index) in dynamicList" :key="index">
				<view class="time">
					<text class="georama"></text>
					{{item.createTime}}
				</view>
				<view class="timetitle u-line-2">{{item.title}}</view>
				<view class="content">
					<!-- <view>{{item.content}}</view> -->
					<view v-html="item.flag ? item.newContent : item.content"></view>
					<view class="all" @click="showAll(index)">{{item.show}}</view>
				</view>
			</view>
		</view>

		<view class="empty" v-else>
			<u-empty text="暂无楼盘动态" mode="history"></u-empty>
		</view>


	<u-toast ref="uToast" />
	<consultation-foot :mess="mess"></consultation-foot>
	</view>
</template>

<script>
	import consultationFoot from "../components/consultationFoot/consultationFoot.vue";
	import {
		getData
	} from '@/request/api';
	export default {
		components: {
			consultationFoot
		},
		data() {
			return {
				buildingId: '',
				dynamicList: [],
				lineFlag: true,
				isCollection: 0,
				//设置默认的分享参数
				share:{
				    title:'动态',
				    path:'',
				    imageUrl:'',
				},
				mess:{
					type:"dynamic" 
				}
			}
		},
		onLoad(option) {
			this.mess.buildingId = this.buildingId = option.buildingId;
			this.isCollection = this.$cache.getCache('isCollection');
			this.getPro();
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			return {
				title: '楼盘动态',
				// desc:'请点击查看户型列表desc',
				// content:'请点击查看户型列表content',
				path: getCurrentPages()[0].route + '?buildingId=' + this.buildingId,
				imageUrl: '/static/login.png',
			}
		},
		methods: {
			
			//在线咨询
			onlineConsultation(){},
			//收藏
			changeCollection() {
				getData("/tospurWeb/pclogin/checkLogin", {
						token: this.$tool.getToken()
					})
					.then(res => {
						getData("/building/api/pc/building/buildingCollection", {
							buildingId: this.buildingId,
							statue: 0
						}).then(res => {
							console.log('收藏结果')
							console.log(res)
							this.isCollection = !this.isCollection;
							this.$cache.setCache('isCollection',this.isCollection);
							this.$refs.uToast.show({
								title: this.isCollection ? '已收藏' : '您已取消收藏',
							})
						})
					})
					.catch(err => {
						console.log("未登录或登录过期", err);
						console.log(err.code);
						if (err.code == 1) {
							console.log('111111111111111111111')
							console.log(getCurrentPages())
							uni.navigateTo({
								url: '/pagesUser/login/login?topath=' + getCurrentPages()[0].route + '&buildingId=' + this.buildingId
							});
						}
					});
			},
			
			
			showAll(index) {
				if (this.dynamicList[index].show === "全文") {
					this.dynamicList[index].show = "收起";
					this.dynamicList[index].flag = false;
				} else {
					this.dynamicList[index].show = "全文";
					this.dynamicList[index].flag = true;
				}
			},
			getPro() {
				let params = {
					buildingId: this.buildingId,
				}
				getData("/building/pc/buildingDynamic/buildingDynamicAndDate", params).then(res => {
					console.log('我是楼盘动态')
					console.log(res.dynamicBaseInfoList)
					// this.dynamicList = res.dynamicBaseInfoList;
					let dynamicList = res.dynamicBaseInfoList;


					for (let i = 0; i < dynamicList.length; i++) {
						if (dynamicList[i].content.length > 55) {
							dynamicList[i].show = "全文";
							dynamicList[i].flag = true;
							dynamicList[i].newContent =
								dynamicList[i].content.substr(0, 64) + "...";
						}
					}
					dynamicList.forEach(item => {
						item.createTime = item.createTime.substring(
							0,
							item.createTime.length - 3
						);
						item.content = item.content.replace(/(\r\n)|(\n)/g, "<br/>");
					});

					this.dynamicList = dynamicList;
					// this.len = dynamicList.length;






					if (this.dynamicList.length > 0) {
						this.lineFlag = true;
					} else {
						this.lineFlag = false;
					}
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.app {
		position: relative;

		&:before {
			content: "";
			position: absolute;
			display: block;
			width: 2px;
			background: #ececec;
			top: 40rpx;
			left: 48rpx;
			height: 100%;
		}
	}

	.app1::before {
		display: none;
	}

	.mian {
		padding-bottom: 78rpx;
		margin-bottom: 98rpx;
	}

	.timeline-item {
		padding: 32rpx 40rpx 20rpx 40rpx;

		.time {
			position: relative;
			color: #999999;
			font-size: 22rpx;
			padding-left: 36rpx;
			padding-top: 8rpx;

			.georama {
				position: absolute;
				top: 10rpx;
				left: 0px;
				box-sizing: border-box;
				width: 18rpx;
				height: 18rpx;
				background-color: #d8d8d8;
				border-radius: 18rpx;
				z-index: 700;
			}
		}

		.timetitle {
			padding: 16rpx 0px 0px 36rpx;
			font-size: 30rpx;
			color: #333333;
			font-weight: 700;
			line-height: 46rpx;
		}

		.content {
			padding: 4rpx 0px 0px 36rpx;
			font-size: 26rpx;
			line-height: 44rpx;
			word-break: break-word;
			color: #666666;
		}

		.all {
			color: #00a4ff;
			font-size: 26rpx;
			background: #fff;
			width: 68rpx;
		}
	}

	.empty {
		padding-top: 100rpx;
	}
</style>
