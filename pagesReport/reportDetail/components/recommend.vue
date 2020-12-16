<!-- 方案推荐 -->
<template>
	<view class='recommend' @click.stop="handleBodyClick">
		<card title="方案推荐">
			<view class="list_item" @click="toDetail(baseInfo.buildingId)">
				<view class="list_item_warp">
					<view class="img_warp">
						<!-- <image class="tospur-image" src="/static/pic_default_small@2x.png"></image> -->
						<image class="tospur-image" :src="baseInfo.albumCoverPicture ? baseInfo.albumCoverPicture+'?x-oss-process=image/resize,h_200,w_200' : '/static/pic_default_small@2x.png'"  mode="aspectFill"></image>
					</view>
					<view class="item_details">
						<view class="details_title">
							{{baseInfo.buildingAlias}}
							<view class="label cl_B">{{baseInfo.salesStatus == 1?'待售':baseInfo.salesStatus == 2?'在售':baseInfo.salesStatus == 3?'售罄':baseInfo.salesStatus == 4?'在租':''}}</view>
							<view class="label cl_Y" v-if="!!baseInfo.propertyType">{{handlePropertyType(baseInfo.propertyType)}}</view>
						</view>
						<view class="price_details">{{$formatter.AveragePrice(baseInfo.referenceAveragePriceType,baseInfo.referenceAveragePrice,baseInfo.referenceAveragePriceMax)}}</view>
						<view class="address_details">{{$formatter.formatArea(baseInfo.referenceBuildAreaMin, baseInfo.referenceBuildAreaMax)}}</view>
						<view class="address_details"><text>{{baseInfo.areaName}}<text v-if="baseInfo.streetName">-</text>{{baseInfo.streetName}}</text></view>
						<view class="classify">
							<view class="claWarp"><view class="claCon" v-for="(itemT,indexT) in baseInfo.baseTagsName" :key="indexT">{{itemT}}</view></view>
						</view>
					</view>
				</view>
			</view>
			<u-tabs 
				name='recommendationNum' 
				:list="resData" 
				:is-scroll="true" 
				:current="current" 
				@change="change" 
				active-color="#062471" 
				inactive-color="#999999" 
				font-size="30"
				bar-width='40'
				bar-height='6'
				bg-color='transparent'
				>
				</u-tabs>
			<swiper :style="{'min-height':swiperHeight}" class="swiper" :current='curr'  :indicator-dots="indicatorDots" :autoplay="autoplay" :circular='autoplay' @change="changeSwipe">
				<swiper-item v-for="(item,index) in resData" :key="index">	
					<view class="change_box_warp">
						<view class="change_box">
							<image class="change_image" src="https://media.tongcehaofang.com/image/default/49349F25A6A64438887A037521A164E9-6-2.jpg" mode=""></image>
							<view class="rows">
								<i class="iconfont iconhuxing"></i><text class="lable">户型</text><text class="text">{{item.houseTypeDetail?item.houseTypeDetail.houseTypeName:'-'}}</text>
							</view>
							<view class="rows">
								<i class="iconfont icongeju"></i><text class="lable">格局</text><text class="text">{{item.houseTypeDetail?item.houseTypeDetail.houseType:'-'}}</text>
							</view>
							<view class="rows">
								<i class="iconfont iconfanghao"></i><text class="lable">房号</text><text class="text">{{item.houseNumber||'-'}}</text>
							</view> 
							<view class="rows">
								<i class="iconfont iconmianji"></i><text class="lable">面积</text><text class="text">{{item.constructionArea||'-'}}<text>㎡</text></text>
							</view> 
							<view class="rows">
								<i class="iconfont iconjiage"></i><text class="lable">价格</text><text class="text" style="color: #FE3A07;">{{item.houseTotalPrice||'-'}}万元</text>
							</view>
							<view class="rows">
								<i class="iconfont iconshoufu"></i><text class="lable">首付</text><text class="text">{{item.firstPay||'-'}}万元</text>
							</view>
							<view class="rows">
								<i class="iconfont iconyuegong"></i><text class="lable">月供</text><text class="text">{{item.mouthPay||'-'}}元</text>
								<view class="tool_tip_warp">
									<i class="iconfont iconwenhao question" @click.stop="showTooltip()"></i>
									<view class="tool_tip" v-show="isShowTooltip">
										<i class="sanJ"></i>
										<view>
											根据首付35%，4.65%LPR，30年期限等额本息计算所得。
										</view>
									</view>
								</view>
							</view>
						</view>
						
						<view class="reason">
							<view class="sanJ"></view>
							<view class="reason_title">
								<i class="iconfont icontuijianliyou"></i><text class="text">推荐理由</text>
							</view>
							<view class="reason_content">
								{{item.content}}
							</view>
						</view>
					</view>	
				</swiper-item>
			</swiper>
		</card>	
	</view>
</template>

<script>
import card from '@/components/card/card.vue'
export default {
	components: {
		card
	},
	data() {
		return {
			tablist:[{
					cate_name: '方案一'
				}, {
					cate_name: '方案二'
				}, {
					cate_name: '方案三'
				}, {
					cate_name: '方案四'
				}, {
					cate_name: '方案五'
				}, {
					cate_name: '方案六',
                    cate_count: 5
				}],
				current: 0,
				isShowTooltip:false,
				swiperHeight: null,
				indicatorDots: false,
				autoplay: false,
				curr:0,
		};
	},
	props:{
		resData:{
			type:Array,
			default:()=>{
				return []
			}
		},
		baseInfo: {
			type: Object,
			default: () => {
				return {}
			 }
		},
	},
	computed: {},
	watch: {},
	methods: {
		changeSwipe(val){
			this.curr = val.detail.current;
			this.current = val.detail.current;
			this.isShowTooltip = false;
		},
		change(index) {
			this.current = index;
			this.curr = index;
			this.isShowTooltip = false;
		},
		//气泡显示
		showTooltip(){
			this.isShowTooltip = !this.isShowTooltip
		},
		//点击body
		handleBodyClick(){
			this.isShowTooltip = false;
		},
		toDetail(){
		
		},
		handlePropertyType(key){
			let newKey = ''
			if(key.length>1){
				newKey = key.substring(0,1)
			}else{
				newKey = key
			}
			return this.$formatter.switchName('propertyType',newKey)
		},
		getDescBox() { 
		  uni.createSelectorQuery().in(this).select('.change_box_warp').boundingClientRect(result => { 
		   if (result) { 
		     console.log('==========',result) 
			 this.swiperHeight = result.height + 20 +'px'
		   }else { 
		     this.getDescBox(); 
		 } 
		  }).exec(); 
		},
	},
	created() {
	},
	mounted() {
		this.getDescBox();
		console.log('resData',this.resData)
	},
}
</script>
<style lang='scss' scoped>
.recommend{
	.list_item{
		padding: 30rpx 0;
		padding-top: 0;
		position: relative;
		.list_item_warp{
			display:flex;
			overflow: hidden;
			.img_warp{
				width: 210rpx;
				height: 210rpx;
				border-radius: 10rpx;
				overflow: hidden;
				position: relative;
				.tospur-image{
					height: 100%;
					width: 100%;
					border-radius: 8rpx;
				}
			}
			.item_details{
				padding-left: 20rpx;
				flex: 1;
				.details_title{
					font-size: 32rpx;
					line-height: 40rpx;
					color: #333333;
					font-weight: 700;
					display: flex;
					.label{
						border-radius:5rpx;
						font-size: 22rpx;
						color: #ffffff;
						padding: 5rpx 9rpx;
						display: inline-block;
						text-align: center;
						line-height: 22rpx;
						margin-left: 6rpx;
						vertical-align: text-top;
						display: flex;
						align-self: center;
					}
					.cl_B{
						margin-right: 8rpx;
						margin-left: 10rpx;
						background-color: #2951B8;
						border: 1px solid #2951B8;
					}
					.cl_Y{
						border: 1px solid #2951B8;
						color: #2951B8;
					}
				}

				.price_details{
					font-size: 32rpx;
					color: #FE3A07;
					line-height: 30rpx;
					padding:16rpx 0 14rpx 0;
					font-weight: 600;
					.price_unit{
						font-size: 20rpx;
						line-height: 30rpx;
						margin-left: 4rpx;
					}
				}

				.address_details{
					font-size: 24rpx;
					color: #999999;
					line-height: 24rpx;
					padding-bottom: 16rpx;
					.mg_Lf_5{
						margin-left: 20rpx;
					}
				}

				.classify{
					font-size: 20rpx;
					overflow-y: hidden;
					overflow-x: scroll;
					height: 30rpx;
					&::-webkit-scrollbar {display:none}
					.claWarp{
						height: 100%;
						width: 200rpx;
						display: flex;
					}
					.claCon{
						display: block;
						float: left;
						margin-right: 8rpx;
						height: 30rpx;
						line-height: 30rpx;
						padding: 0 6rpx;
						color: #999999;
						background-color: rgba(6,36,113,0.05);
						border-radius:4rpx;
						white-space: nowrap;
					}
				}    
			}
		}
	}
	
	.change_box{
		/* overflow: hidden; */
		margin-top: 16rpx;
		border: 2rpx solid #EBEEF4;
		.change_image{
			width: 100%;
			height: 342rpx;
		}
		/deep/uni-image{
			display: block;
		}
		.rows{
			padding: 28rpx;
			padding-left: 25rpx;
			border-top: 2rpx solid #EBEEF4;
			display: flex;
			.iconfont{
				width: 28rpx;
				height: 28rpx;
				margin-right: 15rpx;
				color: #999999;
			}
			.lable{
				font-size: 28rpx;
				color: #999999;
				line-height: 30rpx;
			}
			.text{
				font-size: 28rpx;
				font-weight: 400;
				color: #141414;
				line-height: 30rpx;
				margin-left: 55rpx;
				width: 60%;
				overflow:hidden;
				text-overflow:ellipsis;
				white-space:nowrap
			}
			.question{
				margin-left: 10rpx;
				color: #141414;
				width: 32rpx;
				height: 32rpx;
			}
			.tool_tip_warp{
				right: 44rpx;
				position: absolute;
				.tool_tip{
					z-index:100;
					width: 360rpx;
					position: absolute;
					opacity: 0.9;
					background: #0B2056;
					padding: 18rpx 24rpx;
					font-size: 24rpx;
					color: #FFFFFF;
					line-height: 36rpx;
					top: 50rpx;
					left: -250rpx;
					.sanJ{
						content: "";
						position: absolute;
						top: -30rpx;
						left: 257rpx;
						border-width: 20rpx;
						border-style: solid;
						border-color: transparent transparent #0B2056 transparent;
					}
				}
			}
		}
	}
	.reason{
		background: #ffffff;
		box-shadow: 0px 0px 8px 0px rgba(6,36,113,0.1);
		border: 1rpx solid #EBEEF4;
		border-radius: 0px 2px 4px 2px;
		padding: 32rpx 32rpx 32rpx 32rpx;
		margin-top: 32rpx;
		position: relative;
		.reason_title{
			display: flex;
			margin-bottom: 23rpx;
			.text{
				font-size: 28rpx;
				text-align: left;
				color: #999999;
				line-height: 28rpx;
				margin-left: 13rpx;
			}
			.icontuijianliyou{
				color: #999999
			}
		}
		.reason_content{
			font-size: 28rpx;
			font-weight: 400;
			text-align: justify;
			color: #2b2014;
			line-height: 52rpx;
			text-indent: 50rpx;
			height: 160rpx;
			overflow: hidden;
			overflow-y: scroll;
		}
		.sanJ:after{
			content: "";
			position: absolute;
			top: -43rpx;
			left: 116rpx;
			border-width: 24rpx;
			border-style: solid;
			border-color: transparent transparent #FFFFFF transparent;
		}
		.sanJ:before{
			content: "";
			position: absolute;
			top: -45rpx;
			left: 118rpx;
			border-width: 22rpx;
			border-style: solid;
			border-color: transparent transparent #EBEEF4 transparent;
		}
	}
}
</style>
