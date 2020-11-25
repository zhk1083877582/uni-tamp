<template>
	<view class="typeList">
		<!-- #ifndef MP-BAIDU --> 
		<view class="bedroom">
			<u-tabs name="bedroom" :list="tabList" :current="current" @change="tabsChange1" font-size='30' bar-height="4"
			 bar-width="34" inactive-color="#A9A8AE" active-color="#00a4ff"></u-tabs>
		</view>
		<!-- #endif -->
		
		<!-- #ifdef MP-BAIDU --> 
		<view class="tabs" >
			<text :class="{'tab-item':true,active:index==activeIndex}" v-for="(item,index) in tabList" :key="index" @click="tabsChange(item,index)"> {{item.bedroom}} </text> 
		</view>
		 <!-- #endif -->
		
		<view class="typeListCont">
			<view class="bedContainer" v-for="item in houseList" :key="item.id">
				<view class='bedBox' @click="goHouseTypeDetails(item.id)">
					<view class="bedLeft">
						<!-- <van-image class="typeListImg" :src="item.annexPath" /> -->
						<view class="leftImg">
							<image class="typeListImg" :src="item.annexPath+'?x-oss-process=image/resize,h_113,w_138'"></image>
						</view>
						<view class="title">{{item.houseTypeName}}</view>
					</view>

					<view class="bedRight">
						<view class="h3">
							{{item.houseType}}
							<!-- <img src="../../assets/img/icon_fire@2x.png" v-if="item.isHot==1" /> -->
							<!-- <image src="/static/fire.png" class="fire" v-if="item.isHot==1"></image> -->
							<text class="iconfont iconhuo" v-if="item.isHot==1"></text>
						</view>
						<view class="desc">
							<text v-if="item.constructionArea">建面约{{item.constructionArea}}㎡</text>
							<text v-else>建面待定</text>
							<text v-if="item.oriented">朝向{{$tool.orientedFlag(item.oriented)}}</text>
							<text v-else>朝向待定</text>
						</view>
						<view class="price">
							总价约
							<text>{{item.totalPrice?`${item.totalPrice}万元`:'暂无总价'}}</text>
						</view>
						<view class="lable">
							<text :class="'sale'+item.salesStatus">{{$tool.salesStatusFlag(item.salesStatus) }}</text>

							<view class="houTag">
								<text v-if="itemTag" v-for="(itemTag,index) of item.houseTypeTag" :key="index">{{itemTag}}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="serchBuildBox">
					<view class="serchBuild">
						查看在售房源
					</view>
				</view> -->
				
			</view>
			<u-loadmore :status="status" margin-top='30' />
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
				active: 0,
				tabData: [],
				tabList: [],

				current: 0,
				activeIndex:0,

				houseList: [],
				houseListNum: 0,
				houseTag: [],

				bedroom: 0,
				page: 1,
				rows: 10,
				isCollection: false,
				status: 'loading',
				
				tel:'',
				buildingId:'',
				
				//设置默认的分享参数
				share:{
					title:'户型列表',
					path:'',
					imageUrl:'',
				},
				mess:{
					type:"houseTypeList"
				}
			};
		},
		onLoad(option) {
			this.mess.buildingId = this.buildingId = option.buildingId;
			this.getCount();
		},	
		onReachBottom() {
			console.log('触底')
			console.log(this.page)			
			if(this.status == 'loading'){
				this.getHouseList();
			}
			
		},
		methods: {			
			//去户型详情
			goHouseTypeDetails(val) {
				uni.navigateTo({
					url: '../houseTypeDetails/houseTypeDetails?buildingId=' + this.buildingId + '&&houseTypeId=' + val
				});
			},
			getHouseList() {
				getData("/building/buildingHouseType/list", {
						buildingId: this.buildingId,
						bedroom: this.bedroom,
						page: this.page,
						rows: this.rows
					})
					.then(res => {
						console.log('list___res')
						console.log(res)
						
						res.list.forEach(item => {
							if (item.houseTypeTag.indexOf(',') != -1) {
								item.houseTypeTag = item.houseTypeTag.split(",");
							} else {
								item.houseTypeTag = [item.houseTypeTag]
							}
						})
						
						this.houseList = this.houseList.concat(res.list);
						if (this.page == res.pages) {
							this.status = 'nomore';
							
						}
						this.page = parseInt(res.pageNum) + 1;
					})
					.catch(err => {
						console.log("请求结果报错", err);
					});
			},
			getCount() {
				getData("/building/buildingHouseType/count", {
						buildingId: this.buildingId
					})
					.then(res => {
						this.tabData = res.result;
						this.tabData.forEach(item => {
							this.tabList.push({
								'bedroom': this.bedRoomFlag(item.bedroom) + '(' + item.count + ')',
								'count': item.count
							})
						})
						console.log('this.tabList')
						console.log(this.tabList)
						this.bedroom = 0;
						this.getHouseList();
					})
					.catch(err => {
						console.log("请求结果报错", err);
					});
			},
			
			
			tabsChange(item,index) {
				this.activeIndex =index;
				
				console.log('啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊')
				console.log(item)
				console.log(this.tabData)
				
				this.bedroom = this.tabData[index].bedroom;
				// this.current = val;
				this.houseList=[];
				this.status = 'loading';
				this.page = 1;
				console.log('我是list2')
				console.log(this.houseList)
				this.getHouseList();
			},
			
			tabsChange1(val) {
				console.log(val)
				console.log(this.tabData[val].bedroom)
				
				this.bedroom = this.tabData[val].bedroom;
				this.current = val;
				this.houseList=[];
				this.page = 1;
				this.status = 'loading';
				console.log('我是list2')
				console.log(this.houseList)
				this.getHouseList();
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
					10: "十室"
				};
				return set.hasOwnProperty(value) ? set[value] : value;
			},
		}

	};
</script>
<style lang="scss" scoped>
	.bedContainer {
		margin-left: 30rpx;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 1px solid #efefef;
	}
	.bedContainer:last-child{
		border-bottom:none;
	}

	.typeListCont {
		margin-top: 34rpx;
		padding-bottom: 150rpx;
	}

	.bedBox {
		display: flex;
		flex-direction: row;
	}

	.bedLeft {
		position: relative;
		width: 250rpx;
		height: 206rpx;
	}

	.leftImg {
		width: 250rpx;
		height: 206rpx;
	}

	.typeListImg {
		width: 100%;
		height: 100%;
		display: block;
		padding-bottom:100rpx;
	}

	.title {
		font-size: 20rpx;
		text-align: center;
		width: 100%;
		height: 46rpx;
		line-height: 46rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		z-index: 1;
		background: rgba(0, 0, 0, 0.3);
		color: #ffffff;
	}

	.bedRight {
		margin-left: 20rpx;
	}

	.h3 {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 4rpx;
	}

	.fire {
		width: 22rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}

	.desc {
		margin-top: 12rpx;
		margin-bottom: 20rpx;
		font-size: 24rpx;
		color: #666666;
	}

	.desc text {
		margin-right: 30rpx;
	}

	.price {
		font-size: 24rpx;
		color: #666666;
	}

	.price text {
		font-size: 32rpx;
		color: #ff664f;
		margin-left: 12rpx;
		font-weight: bold;
	}

	.lable {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		margin-top: 20rpx;
		.houTag{
			margin-left: 10rpx;
			width:350rpx;
			display:flex;
			overflow-x:scroll;
			overflow-y: hidden;
			&::-webkit-scrollbar {display:none}
			text{
				white-space: nowrap;
				float:left;
			}
		}
	}

	.lable text {
		background: rgba(241, 249, 255, 1);
		border-radius: 6rpx;
		height: 32rpx;
		line-height: 32rpx;
		padding: 0 6rpx;
		font-size: 20rpx;
		color: #999999;
		margin-left: 6rpx;
		margin-bottom: 9rpx;
		display: inline-block;
	}






	.sale1 {
		background-color: #3bd0a0 !important;
		color: #ffffff !important;
	}

	.sale2 {
		background-color: #ff8353 !important;
		color: #ffffff !important;
	}

	.sale3 {
		background-color: #c7cbd3 !important;
		color: #ffffff !important;
	}

	.sale4 {
		background-color: #f6b638 !important;
		color: #ffffff !important;
	}

	.serchBuildBox {
		padding-right: 30rpx;

		.serchBuild {
			height: 68rpx;
			line-height: 68rpx;
			text-align: center;
			background: #f1f9ff;
			font-size: 28rpx;
			color: #00A4FF;
			margin-top: 20rpx;
		}
	}

	.iconhuo {
		color: #FF382F;
		display: inline-block;
		margin-left: 10rpx;
	}
	
	
	.tabAll{
		.tabCon{}
		
	}
	
	.tabs{
		margin-top: 50rpx;
		overflow-y: auto;
		white-space: nowrap;
		padding:0 30rpx 16rpx;
	}
	.tab-item {
	    font-size: 32rpx;
	    color: #A9A8AE;
	    margin-right: 28rpx;
			position: relative;
			padding-bottom: 12rpx;
	}
	.active::before{
		content: ' ';
		width:34rpx;
		height: 4rpx;
		background-color: #00A4FF;
		position: absolute;
		bottom:0rpx;
		left:50%;
		transform: translateX(-50%);
		
	}
	.active{
		color: #00A4FF !important;
	}
</style>
