<!-- 楼盘详情:户型 -->
<template>
	<view class="house-style" >
		<title-info :text="titleText" :btnRightInfo="btnRightInfo"></title-info>
		<view class="tabs" >
			<text :class="{'tab-item':true,active:index==activeIndex}" v-for="(item,index) in tabList" :key="index" @click="doTabChange(item,index)"> {{item.cate_name}} </text> 
		</view>
		<view class="list houseStyleMess">
			<view  class="houseStyleMess_all"  v-for="(item,index) in styleList" :key="index" @click="toHouseStyleDetail(item)">
			  <view class="houseStyleMess_imgDiv" >
				  <image class="houseStyleMess_img" :src="item.annexPath?item.annexPath+'?x-oss-process=image/resize,h_165,w_200' :'/static/pic_default_small@2x.png'" mode=""></image>
				  <view class="houseStyleMess_imgDivBottom">{{item.houseTypeName}}</view>
			  </view>
			  <view>
				<text class="houseStyleMess_style">{{item.houseType}}</text>
				<!-- (1:待售 2:在售 3:售罄) -->
				<text class="houseStyleMess_spans " v-if="item.salesStatus=='1'">待售</text>
				<text class="houseStyleMess_spans " v-else-if="item.salesStatus=='2'">在售</text>
				<text class="houseStyleMess_spans " v-else-if="item.salesStatus=='3'">售罄</text>
			  </view>
			  <view class="houseStyleMess_area">
				<text>建面约{{item.constructionArea}}㎡</text>
				<text class="houseStyleMess_area_span">{{item.orientedLabel?'朝向 '+item.orientedLabel:''}}</text>
			  </view>
			  <view class="houseStyleMess_price">{{item.totalPrice?'总价约'+item.totalPrice+'万':''}}</view>
			  <view class="houBtn" @click.stop="toOtherPage(item)">
			  	咨询首付和贷款
			  </view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import titleInfo from './titleInfo.vue';
	import { getBuildingTypeCount,getBuildingTypeList} from '@/request/api';
	export default {
		props:{
			buildingId:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				titleText:'户型介绍',
				btnType:'houseStyle',//户型
				tabList:[],//户型tabs
				activeIndex:0,
				styleList:[],//平面图
				//更多操作
				btnRightInfo:{
					text:'全部户型',
					url:''
				}
			}
		},
		components: {
			titleInfo
		},

		mounted(option) {
			//户型
			// if(this.buildingId){
			// 	this.initBuildingTypeCount(this.buildingId);
			// 	this.changeBtnRightInfo(this.buildingId)
			// }
			let self =this;
			setTimeout(()=>{
					self.initBuildingTypeCount(self.buildingId);
					self.changeBtnRightInfo();
			},1000)
		},
		watch:{
			// buildingId(newVal){
			// 	if(newVal){
			// 		this.initBuildingTypeCount(newVal);
			// 		this.changeBtnRightInfo(newVal)
			// 	}
			// },
		},
		methods: {
			//全部户型
			changeBtnRightInfo(buildingId){
				let {btnRightInfo} =this;
				let url=url = '../houseTypeList/houseTypeList?buildingId='+this.buildingId
				btnRightInfo.url = url;
			},
			//咨询首付和贷款
			toOtherPage(item){
				item.buildingId = this.buildingId;
				// this.$emit("chatMess",item)
			},
			//户型-tabs
			initBuildingTypeCount(buildingId){
				let params={
					buildingId:buildingId
				};
				let self=this;
				getBuildingTypeCount('',params)
					.then(res => {
						let result = res.result||[];
						self.titleText ='户型介绍('+result[0].count+')';
						if(result[0].count ==0){
							return
						}
						let arr = result.slice(1);
						let styleArr = ['','一室','二室','三室','四室','五室','六室','七室','八室','九室','十室'];
						self.tabList = arr.map(item=>{
							let cateName=item.bedroom>10?item.bedroom+'室':styleArr[item.bedroom];
							cateName +='('+item.count+')';
							return{
								cate_name:cateName,
								count: item.count,
								bedroom: item.bedroom,
							}
						})
						self.initBuildingTypeList(arr[0].bedroom)
						
					}).catch(err=>{
						console.log('户型-err',err)
					})
			},
			//户型-list
			initBuildingTypeList(bedroom){
				let params={
					buildingId:this.buildingId,
					bedroom:bedroom,
					page:1,
					row:20
				};
				// console.log(444444,params)
				let self=this;
				self.styleList=[];
				// 朝向(1:正南 2:正北 3:正东 4:正西 5:东南 6:西南 7:东北 8:西北)
				getBuildingTypeList('',params)
					.then(res => {
						let list = res.list||[];
						list.forEach(item=>{
							item.orientedLabel = self.orientedFlag(item.oriented);
						})
						self.styleList = list;
						// console.log(333333333,list)
					}).catch(err=>{
						console.log('户型-err',err)
					})
			},
			//户型切换
			doTabChange(item,index){
				
				this.activeIndex =index;
				this.initBuildingTypeList(item.bedroom)
			},
			// 户型详情
			toHouseStyleDetail(item){
				// console.log(555,item)
				// return 
				uni.navigateTo({
				   url: '../houseTypeDetails/houseTypeDetails?buildingId='+this.buildingId+'&houseTypeId='+item.id
				});
			},
			  //朝向转换
			orientedFlag(value) {
			    let set = {
			      1: "正南",
			      2: "正北",
			      3: "正东",
			      4: "正西",
			      5: "东南",
			      6: "西南",
			      7: "东北",
			      8: "西北"
			    };
			    return set.hasOwnProperty(value) ? set[value] : value;
			},
			  //销售类型转换
			salesStatusFlag(value) {
			    let set = {
			      1: "待售",
			      2: "在售",
			      3: "售罄",
			      4: "在租"
			    };
			    return set.hasOwnProperty(value) ? set[value] : value;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.house-style{
		width: 100%;
		// height:300px;
		border-top: 10rpx solid #999999;
		padding: 40rpx 30rpx;
		padding-bottom: 20rpx;
		.tabs{
			margin-top: 50rpx;
			overflow-y: auto;
			white-space: nowrap;
		}
		.tab-item {
		    font-size: 32rpx;
		    color: #999999;
		    margin-right: 28rpx;
		}
		.active{
			color: #4a6ddb !important;
		}
		
		.btn{
			  width:100%;
			  height:68rpx;
			  margin:30rpx 0;
			  background-color: #F4F8F8;
			  color: #00A4FF;
			  font-size: 28rpx;
			  font-weight: 600;
		}
		/deep/.btn:after {
		    border: 0;
		}
		.houseStyleMess {
		    margin-top: 40rpx;
		    display: flex;
		    width: 100%;
		    overflow-y: hidden;
		    overflow-x: auto;
		    margin-bottom: 10rpx;
		    height: 620rpx;
		}
		.houseStyleMess_all {
		    float: left;
		    margin-right: 26rpx;
		    display: inline-block;
		    min-width: 404rpx;
		}
		
		.houseStyleMess_imgDiv {
			width:400rpx;
		    position: relative;
		}
		.houseStyleMess_img {
		    width: 404rpx;
		    height:332rpx;
		    margin-bottom: 18rpx;
		}
		.houseStyleMess_imgDivBottom {
		    position: absolute;
		    width: 100%;
		    height: 56rpx;
		    bottom: 28rpx;
		    background-color: rgba(0, 0, 0, 0.6);
		    color: white;
		    text-align: center;
		    line-height: 56rpx;
		    font-size:24rpx;
		}
		.houseStyleMess_style {
		    font-size: 30rpx;
		    color: #141414;
		    font-weight: 700;
		}
		.houseStyleMess_spans {
		    color: white;
		    border-radius: 4rpx;
		    background-color: #ff8242;
		    display: inline-block;
		    text-align: center;
		    margin-left: 10rpx;
		    padding: 2rpx 8rpx;
		    font-size:20rpx;
		}
		.bg-color-red2{
			background-color: #ff8242;
		}
		.bg-color-green2{
			background-color: #00A4FF;
		}
		.bg-color-gray2{
			background-color: #C1C1C1;
		}
		.houseStyleMess_area {
		    margin: 16rpx 0 20rpx 0;
		    color: #827870;
		    font-size: 26rpx;
		}
		.houseStyleMess_area_span{
			margin-left: 10rpx;
		}
		.houseStyleMess_price {
			height: 40rpx;
		    color: #ff4e32;
		    font-size: 30rpx;
		    font-weight: 700;
			margin-bottom: 30rpx;
		}
		.houBtn {
		    height: 68rpx;
		    line-height: 68rpx;
		    font-size:28rpx;
		    background-color:#f1f5fd;
		    color: #4a6ddb;
		    display: block;
		    text-align: center;
		   
		}
	}
</style>
