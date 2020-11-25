<!-- 楼盘详情:楼栋分布 -->
<template>
	<view class="house-spread">
		<title-info text="楼栋分布" ></title-info>
		<view class="movable_warp">
			<movable-area class="M-movable-area">
				<movable-view class="top_img_warp" direction="horizontal" scale="true" scale-min="1" scale-max="4" scale-value="1">
					<image class="top_img" :src="spreadAnnexPath?spreadAnnexPath+'?x-oss-process=image/resize,h_250,w_335':spreadAnnexPath"></image>
					<text  v-for="(item,index) in pcBuildingUnitBaseInfoList" :key='index' @click="handleclickUnit(item,index)" 
					:class="[item.unitName==current?'crrent_img_btn':'img_btn']" 
					:style="{position:'absolute','top':item.topMargin*2+'rpx','left':item.leftMargin*2+'rpx'}">{{item.unitName}}#</text>
				</movable-view>
			</movable-area>
		</view>
		
		<view class="desList spread_main_divs" v-if="itemInfo&&itemInfo.unitName">
			<view class="desList-item">
				<view>楼栋</view>
				<text class="divsSpan">{{itemInfo.unitName}}栋</text>
				<!-- 销售状态  '1在售 2.待售 3.售罄 -->
				<text class="houseStyleMess_spans"  >{{itemInfo.saleStatus==1?'在售':itemInfo.saleStatus==2?'待售':itemInfo.saleStatus==3?'售罄':''}}</text> 
			</view>
			<view class="tac f2 unit desList-item">
				<view>单元数</view>
				<text class="divsSpan">{{itemInfo.unit}}个单元</text>
			</view>
			<view class="tac f2 ce desList-item">
				<view>层数</view>
				<text class="divsSpan">{{itemInfo.layers}}层</text>
			</view>
			<view class="tar r14 hu desList-item">
				<view>户数</view>
				<text class="divsSpan">{{itemInfo.householdNum}}户</text> 
			</view>
		</view>
		<view v-if="itemInfo&&itemInfo.unitName" class="spread-btn" @click="toSpreadDetail">查看楼栋详情</view>
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
			pcBuildingUnitBaseInfoList:{
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
				itemInfo:{
					saleStatus:'',
					unitName:'',//楼栋
					unit:'',//单元
					householdNum:'',//户数
					layers:'',//层数	
				},
				
			}
		},
		components: {
			titleInfo
		},
		watch:{
			// pcBuildingUnitBaseInfoList:{
			// 	handler(newVal){
			// 		let {itemInfo} =this;
			// 		if(!newVal.length){return}
			// 		Object.keys(itemInfo).forEach(key=>{
			// 			itemInfo[key] = newVal[0][key];
			// 		})
			// 		this.current = itemInfo.unitName;
			// 	},
			// 	deep:true
			// }
		},
		mounted(){
			let self =this;
			setTimeout(()=>{
				self.initBuildingUnit();
			},1500)
		},
		methods:{
			initBuildingUnit(){
				let {itemInfo,pcBuildingUnitBaseInfoList} =this;
				if(pcBuildingUnitBaseInfoList.length==0){return}
				Object.keys(itemInfo).forEach(key=>{
					itemInfo[key] = pcBuildingUnitBaseInfoList[0][key];
				})
				this.current = itemInfo.unitName;
			},
			doSpreadChange(item,index){
				let {itemInfo} =this;
				this.activeIndex =index;
				Object.keys(itemInfo).forEach(key=>{
					itemInfo[key] =item[key];
				})
			},
			handleclickUnit(item,index){
				console.log(item,index)
				this.current = item.unitName
				this.crrentObj = item;
				this.itemInfo =null;
				this.itemInfo = item;
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
		padding: 20px 15px;
		border-top: 10px solid #f4f8f8;
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
				width: 100%;
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
					color: #1b1833;
					line-height: 30rpx;
					background: url(/static/bubble__Details_pro.png) no-repeat;
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
					background: url(/static/bubble-white.png) no-repeat;
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
		}
		.divsSpan {
		    color: #6D6D6D;
		    font-size: 13px;
		}
		.houseStyleMess_spans {
		    color: white;
		    border-radius: 2px;
		    background-color: #FF824B;
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
			color: #00A4FF;
			background: #F1F9FF;
			display: block;
			text-align: center;
			margin-top: 30rpx;
		}
	}
</style>
