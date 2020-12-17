<!-- 楼盘详情:楼栋分布 -->
<template>
	<view class="house-spread">
		<title-info text="楼栋分布" ></title-info>
		<view class="movable_warp">
			<movable-area class="M-movable-area">
				<movable-view class="top_img_warp" direction="horizontal" scale="true" scale-min="1" scale-max="4" scale-value="1">
					<image class="top_img" :src="spreadAnnexPath?spreadAnnexPath+'?x-oss-process=image/resize,h_250,w_335':spreadAnnexPath"></image>
					<text  v-for="(item,index) in buildingUnitBaseInfoList" :key='index' @click="handleclickUnit(item,index)" 
					:class="[item.numberName==current?'crrent_img_btn':'img_btn']" 
					:style="{position:'absolute','top':item.topMargin*2+'rpx','left':item.leftMargin*2+'rpx'}">{{item.numberName}}#</text>
				</movable-view>
			</movable-area>
		</view>
		
		<view class="desList spread_main_divs" v-if="itemInfo">
			<view class="desList-item">
				<view class="desList-item_title">楼栋</view>
				<text class="divsSpan">
					<text>{{itemInfo.numberName}}栋</text>
					<!-- 销售状态  '1在售 2.待售 3.售罄 -->
					<text class="houseStyleMess_spans"  >{{itemInfo.saleStatus==1?'待售':itemInfo.saleStatus==2?'在售':itemInfo.saleStatus==3?'售罄':''}}</text> 
				</text>
				
				
			</view>
			<view class="tac f2 unit desList-item">
				<view class="desList-item_title">单元数</view>
				<text class="divsSpan">{{itemInfo.unitNum}}个单元</text>
			</view>
			<view class="tac f2 ce desList-item">
				<view class="desList-item_title">层数</view>
				<text class="divsSpan">{{itemInfo.layers}}层</text>
			</view>
			<view class="tar r14 hu desList-item">
				<view class="desList-item_title">户数</view>
				<text class="divsSpan">{{itemInfo.householdNum}}户</text> 
			</view>
		</view>
		<view v-if="itemInfo" class="spread-btn" @click="toSpreadDetail">
			查看楼栋详情
		</view>
	</view>
</template>

<script>
	import titleInfo from './titleInfo.vue';
	export default {
		props:{
			spreadAnnexPath:{
			  type:String,
			  default:''
			},
			buildingUnitBaseInfoList:{
			  type:Array,
			  default:function(){
				  return []
			  }
			},
			buildingId:{
				type:String,
				default:''
			}
		},
		data(){
			return {
				current:'',
				activeIndex:0,
				itemInfo:null				
			}
		},
		components: {
			titleInfo
		},
		mounted(){
			let self =this;
			self.current=self.buildingUnitBaseInfoList[0]&&self.buildingUnitBaseInfoList[0].numberName;
			self.itemInfo = self.buildingUnitBaseInfoList[0];
		},
		methods:{
			handleclickUnit(item,index){
				console.log(item,index)
				this.current = item.numberName
				// this.itemInfo =null;
				this.itemInfo = this.buildingUnitBaseInfoList[index];
			},
			//查看楼栋详情
			toSpreadDetail(){
				let  {itemInfo,buildingId} =this;
				let url='../unitBuilding/index?buildingId='+buildingId+'&houseUnitElement='+itemInfo.unitName;
				uni.navigateTo({
				    url: url
				});
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.house-spread{
		width: 100%;
		padding: 40rpx 32rpx;
		border-top: 10rpx solid #999999;
		.movable_warp{
			margin-top: 20px;
			overflow: hidden;
			width: 100%;
			height: 100%;
			/deep/.M-movable-area{
				width: 100%;
				height: 100%;
			}
			.top_img_warp{
				position: relative;
				width: 670rpx;
				height: 100%;
				.top_img{
					width: 100%;
					height: 502rpx;
					/* display: block; */
				}
				.crrent_img_btn{
					height: 38rpx;
					min-width: 64rpx;
					font-size: 20rpx;
					text-align: center;
					color: #FFFFFF;
					line-height: 30rpx;
					background: url(/static/house/bubble__Details_pro@2x.png) no-repeat;
					background-size: 100% 100%;
					z-index: 10;
				}
				.img_btn{
					/* position: absolute; */
					height: 38rpx;
					min-width: 64rpx;
					font-size: 20rpx;
					text-align: center;
					color: #1b1833;
					line-height: 30rpx;
					background: url(/static/house/bubble_Details@2x.png) no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		
		
		
		
		//楼栋信息
		.spread_main_divs {
		    margin: 10px 0 16px;
		    display: flex;
			text-align: center;
		}
		.desList-item{
			flex:1;
			padding-left: 40rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		.desList-item_title{
			font-size: 30rpx;
			font-weight: 500;
			color: #141414;
			// text-align: center;
		}
		.divsSpan {
			margin-top:10rpx;
		    color: #666666;
		    font-size: 26rpx;
			// text-align: center;
		}
		.houseStyleMess_spans {
		    color: #FFFFFF;
		    border-radius: 2px;
		    background: #ff8242;
		    display: inline-block;
		    text-align: center;
		    margin-left: 5px;
		    padding: 1px 4px;
		    font-size: 10px;
		}
		// .f2 {
		//     flex: 4 !important;
		// }
		.tac,.tar {
		  
		}
		.r14 {
		    margin-right: 14px;
		}
		
		.spread-btn{
			height: 68rpx;
			line-height: 68rpx;
			font-size:28rpx;
			// font-weight: 700;
			background-color:#f1f5fd;
			color: #4a6ddb;
			display: block;
			text-align: center;
			margin-top: 30rpx;
		}
	}
</style>
