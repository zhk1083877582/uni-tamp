<!-- 匹配楼盘推荐 -->
<template>
	<view class='recommend_warp'>
		<view class="recommend conlumn2">
			<view class="title"><text class="span">匹配楼盘推荐</text></view>
			<view class="conBox">
				<view class="pText1">
					<jyf-parser :html="buildingContent" ref="article"></jyf-parser>
				</view>
				<view class="plouAll">
					<view class="pLou">
						<view class="goBuild" v-for="item in ReportBuilding" :key='item.buildingId' @click="toBuildingDetail(item)">
							<view class="louTit"><text class="span">{{item.buildingAlias}}</text><text class="em" v-for="(itemT,index) in item.propertyTypeArr" :key="index">{{itemT}}</text></view>
							<view class="pTu"><image class="img" :src="item.albumCoverPicture" ></image></view>
							<view class="dingWei">
								<view class="p1"><text class="i iconfont">&#xe612;</text> <text class="span">{{item.streetName?`${item.areaName}·${item.streetName}`:`${item.areaName}`}}</text></view>
								<view class="p2"><text class="i">{{$formatter.AveragePrice(item.referenceAveragePriceType,item.referenceAveragePrice,item.referenceAveragePriceMax)}}</text></view>
							</view>
							<view class="space">
								<view>{{$formatter.formatArea(item.referenceBuildAreaMin, item.referenceBuildAreaMax)}}</view>
								<view class="span"><text class="em" v-for="itemK in item.buildingTagArr" :key='itemK'>{{itemK}}</text></view>
							</view>
							<view class="louList" v-show="item.buildingId==crrentId">
								<view class="p"><text class="span">参考均价 </text><text class="span">{{$formatter.AveragePrice(item.referenceAveragePriceType,item.referenceAveragePrice,item.referenceAveragePriceMax)}}</text></view>
								<view class="p"><text class="span">参考总价 </text><text class="span">{{$formatter.formatTotalPrice(item.referenceTotalPriceMin,item.referenceTotalPriceMax)}}</text></view>
								<view class="p"><text class="span">开盘时间 </text><text class="span">{{item.openTime?formatDate(item.openTime):'暂无'}}</text></view>
								<view class="p"><text class="span">楼盘地址 </text><text class="span">{{item.floorAddress}}</text></view>
								<view class="p"><text class="span">开&ensp;发&ensp;商 </text><text class="span">{{item.developer}}</text></view>
								<view class="p"><text class="span">交房时间 </text><text class="span">{{item.deliveryTime?formatDate(item.deliveryTime):'暂无'}}</text></view>
								<view class="p"><text class="span">楼盘类型 </text><text class="span"><text v-for="(itemJ,index) in item.propertyTypeArr" :key="index">{{itemJ}}</text></text></view>
								<view class="p"><text class="span">装修标准 </text><text class="span"><text v-for="(itemL,index) in item.decorationArr" :key='index'>{{itemL}}</text></text></view>
								<view class="p"><text class="span">产权年限 </text><text class="span">{{item.propertyYear}}年</text></view>
								<view class="p"><text class="span">容&ensp;积&ensp;率 </text><text class="span">{{item.plotRatio}}</text></view>
								<view class="p"><text class="span">绿&ensp;化&ensp;率 </text><text class="span">{{item.greenRatio}}</text></view>
								<view class="p"><text class="span">车&ensp;位&ensp;比 </text><text class="span">{{item.parkingRatio}}</text></view>
								<view class="p"><text class="span">物业公司 </text><text class="span">{{item.propertyCompany}}</text></view>
								<view class="p"><text class="span">物&ensp;业&ensp;费 </text><text class="span">{{item.parkingCosts}}</text></view>
								<view class="p"><text class="span">预售许可证 </text><text class="span">{{item.preSaleCertificateBaseInfoVOS[0]?formatDate(item.preSaleCertificateBaseInfoVOS[0].certificateName):'暂无'}}</text></view>
								<view class="p"><text class="span">发证时期 </text><text class="span">{{item.preSaleCertificateBaseInfoVOS[0]?formatDate(item.preSaleCertificateBaseInfoVOS[0].getTime):'暂无'}}</text></view>
							</view>
							<view class="upDown" @click.stop="showMore(item)"><text class="i iconfont" :class="{up:item.buildingId==crrentId}">&#xe629;</text></view>
						</view>
					  </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getData } from '@/request/api';
import jyfParser from "@/components/jyf-parser/jyf-parser";
export default {
	components: {
		jyfParser
	},
	data() {
		return {
			buildingContent:'',
			ReportBuilding:[],
			crrentId:''
		};
	},
	props:{
		businessReportId:{
			type:String,
			default:''
		}
	},
	computed: {},
	watch: {},
	methods: {
		toBuildingDetail(obj){
			uni.navigateTo({
			    url: '/pagesHouse/house/house?buildingId='+obj.buildingId
			});
		},
		showMore(obj){
			console.log(obj,11111);
			if(this.crrentId == obj.buildingId){
				this.crrentId = ''
			}else{
				this.crrentId = obj.buildingId
			}
		},
		businessReportBuildingPreview(){
			let params = {
			    businessReportId: this.businessReportId
			}
			getData('/customer/capp/businessReport/businessReportBuildingPreview', params).then(res=> {
			    console.log('匹配楼盘推荐', res)
				this.buildingContent = res.buildingContent
			    if (res.buildingVOS) {
					this.ReportBuilding = res.buildingVOS
					res.buildingVOS.map((item,index)=>{
						item.propertyTypeArr = this.getpropertyType(item.propertyType);
						item.buildingTagArr = this.getbuildingTag(item.buildingTag)
						item.decorationArr = this.getdecorationStatus(item.decorationStatus)
						console.log(this.ReportBuilding,11111)
					})
			    }
			})
		},
		getpropertyType(str){
			let pro = [],NewArr=[]
			if (!str.length) {
				NewArr = []
			} else {
				 if (str.indexOf(',') === -1) {
					pro.push(str)

				} else {
					pro = str.split(',')
				}
				pro.map((item,index)=>{
					NewArr.push(this.$formatter.switchName('propertyType',item))
				})
			}
			return NewArr;
		},
		getbuildingTag(buildingTag){
			let buildingTagArr = [],NewArr=[]
			if (!buildingTag.length) {
				NewArr = []
			} else {
				 if (buildingTag.indexOf(',') === -1) {
					buildingTagArr.push(buildingTag)
				} else {
					buildingTagArr = buildingTag.split(',')
				}
				buildingTagArr.map((item,index)=>{
					NewArr.push(this.$formatter.switchName('propertyType',item))
				})
			}
			return NewArr
		},
		getdecorationStatus(str){
			let decorationArr = [],NewArr=[]
			if (str) {
				if (str.indexOf(',') === -1) {
					decorationArr.push(str)
				} else {
					decorationArr = str.split(',')
				}
				decorationArr.map((item,index)=>{
					NewArr.push(this.$formatter.switchName('decorationStatus',item))
				})
				
			}else{
				NewArr = []
			}
			return NewArr
		},
		formatDate(str){
			if(str){
				str = str.split(' ')[0];
				return str;
			}else{
				return '暂无';
			}
		},
		
	},
	created() {
		
	},
	mounted() {
		setTimeout(()=>{
			this.businessReportBuildingPreview()
		},400)
	},
}
</script>
<style lang='scss' scoped>
.recommend_warp{
	.recommend {
	    border-radius: 0 0 40rpx 40rpx;
	    overflow: hidden;
	}
	
	.title {
	    font-size: 40rpx;
	    line-height: 40rpx;
	    font-weight: bold;
	    text-align: center;
	    color: #fff9ea;
	    background: url(../../static/bg_title.png) no-repeat;
	    width: 100%;
	    height: 120rpx;
	    background-size: 100% 100%;
	    line-height: 120rpx;
	    margin-top: 70rpx;
	}
	
	.title .span {
	    background: linear-gradient(135deg, #f2e1b5, #fff3d6 33%, #e8ce91);
	    -webkit-background-clip: text;
	    color: transparent;
	}
	
	.conBox {
	    background: #fff9ea;
	    padding: 0 40rpx 70rpx;
	}
	
	.pText1 {
	    font-size: 28rpx;
	    line-height: 24rpx;
	    padding: 50rpx 0 0;
		/deep/div{
			line-height: 40rpx !important;
		}
	}
	
	.pText {
	    font-size: 28rpx;
	    line-height: 44rpx;
	    margin: 50rpx 0 40rpx;
	}
	
	.louTit {
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    margin: 80rpx 0 22rpx;
	    flex-wrap: wrap;
	}
	
	.louTit .img {
	    width: 32rpx;
	    height: 32rpx;
	    display: inline-block;
	}
	
	.louTit .span {
	    font-size: 32rpx;
	    color: #000;
	    display: inline-block;
	    margin: 0 8px;
	    position: relative;
	    padding-left: 40rpx;
	    font-weight: bold;
	}
	
	.louTit .span::before {
	    content: ' ';
	    width: 32rpx;
	    height: 32rpx;
	    background: url(../../static/icon_house.png) no-repeat;
	    background-size: 100% 100%;
	    /* background-size:500px 375px;
	  background-position: 0 0; */
	    /* background-size: 500px 375px;
	    background-position: -117px -44px; */
	    position: absolute;
	    top: 6rpx;
	    left: 0;
	}
	
	.louTit .em {
	    font-style: normal;
	    font-size: 20rpx;
	    color: #4B381D;
	    display: inline-block;
	    background: linear-gradient(135deg, #f2e1b5, #fff3d6 33%, #e8ce91);
	    border: 1px solid #9f8b6d;
	    border-radius: 10rpx;
	    /* height: 15px;
	    line-height: 13px; */
	    padding: 2rpx 6rpx;
	    margin-right: 4rpx;
	}
	
	.pTu {
	    display: block;
	    width: 100%;
	    border-radius: 10rpx;
	    height:344rpx;
	    overflow: hidden;
	    
	}
	.pTu .img{
	    width:100%;
	    object-fit: cover;
	}
	
	.dingWei {
	    display: flex;
	    flex-direction: row;
	    justify-content: space-between;
	    align-items: center;
	    margin: 30rpx 0 14rpx;
	}
	
	.dingWei .p1 {
	    font-size: 12px;
	    color: #8E785E;
	}
	.dingWei .p1 .i {
	    font-size:24rpx;
	    vertical-align: 2rpx;
	    
	}
	.dingWei .p1 .span {
	    font-size: 26rpx;
	    color: #33312E;
	    position: relative;
	    /* padding-left:20px; */
	}
	
	
	/* .dingWei .p1 span::before{
	  content: ' ';
	  width: 12px;
	  height: 17px;
	  background: url(../img/report-sprint.png) no-repeat;
	  background-size: 500px 375px;
	  background-position: -248px -43px;
	  position: absolute;
	  top:0;
	  left:0;
	} */
	
	.dingWei .p2 {
	    font-size: 20rpx;
	    color: #DD413F;
	}
	.dingWei .p2 .i{
	    font-size: 30rpx;
	    font-weight: bold;
	    font-style: normal;
	}
	
	.dingWei .p2 .span {
	    font-size: 30rpx;
	}
	
	.space {
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	}
	
	.space .span {
	    color: #7F7c74;
	    font-size:26rpx;
	}
	
	.space .span .em {
	    display: inline-block;
	    font-size: 20rpx;
	    color: #4B381D;
	    background: rgba(0, 0, 0, 0.1);
	    border-radius: 10rpx;
	    height: 30rpx;
	    line-height: 30rpx;
	    padding: 0 8rpx;
	    margin-left: 6rpx;
	    font-style: normal;
	    
	}
	
	.louList {
	    border-top: 1px dashed #b4a695;
	    padding-top: 50rpx;
	    margin-top: 40rpx;
	    /* display: none; */
	}
	
	.louList .p {
	    font-size: 28rpx;
	    color: #000;
	    overflow: hidden;
	    line-height: 1.5;
	}
	
	.louList .p .span {
	    float: left;
	}
	
	.louList .p .span:first-child {
	    width: 25%;
	}
	
	.louList .p .span:last-child {
	    width: 68%;
	    color: #999;
	    margin-left: 7%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.louList .p .span .i{font-style: normal;}
	
	.upDown {
	    width: 100%;
	    height: 60rpx;
	    background: linear-gradient(270deg, rgba(243, 230, 203, 0), #f3e6cb 50%, rgba(243, 230, 203, 0));
	    border-radius: 20rpx;
	    text-align: center;
	    line-height: 60rpx;
	    margin-top: 50rpx;
	}
	
	.upDown .i {
	    transition: all 0.5s;
	    font-size:20rpx;
	    color:#8e785e;
	    display: block;
	    transform: rotate(180deg);
	    -webkit-transform: rotate(180deg);
	    -moz-transform: rotate(180deg);
	}
	
	.upDown .curr {
	    transform: rotate(0deg);
	    -webkit-transform: rotate(0deg);
	    -moz-transform: rotate(0deg);
	}
	/deep/.upDown .up{
		transform: rotate(360deg) !important;
		-webkit-transform: rotate(360deg) !important;
		-moz-transform: rotate(360deg) !important;
	}
	
	.littleTit {
	    padding-top: 50rpx;
	    display: flex;
	    justify-content: center;
	}
	
	.littleTit .span {
	    display: block;
	    font-size: 28rpx;
	    color: #000;
	    font-weight: bold;
	    text-align: center;
	    position: relative;
	    /* background: url(../img/title_left.png) no-repeat left center, url(../img/title_right.png) no-repeat right center; */
	    padding: 0 120rpx;
	    position: relative;
	}
	
	.littleTit .span::before {
	    content: ' ';
	    width: 94rpx;
	    height: 32rpx;
	    background: url(../../static/title_left.png) no-repeat;
	    /* background-size: 500px 375px;
	    background-position: -135px -47px; */
	    background-size: 100% 100%;
	    position: absolute;
	    top: 50%;
	    left: 0;
	    transform: translateY(-50%);
	}
	
	.littleTit .span::after {
	    content: ' ';
	    width: 94rpx;
	    height: 32rpx;
	    background: url(../../static/title_right.png) no-repeat;
	    /* background-size: 500px 375px;
	    background-position: -193px -47px; */
	    background-size: 100% 100%;
	    position: absolute;
	    top: 50%;
	    right: 0;
	    transform: translateY(-50%);
	}
	/deep/video {
	    width: 100% !important;
	    display: block;
	}
	/deep/img {
	    width: 100% !important;
	    display: block;
	}
}
</style>
