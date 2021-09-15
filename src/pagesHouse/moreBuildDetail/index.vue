<!-- 更多楼盘详情 -->
<template>
	<view class='more_build_detail'>
		<view class="Mr_B">
			<view class="title">{{moreDetail.buildingAlias}}</view>
			
			<view class="cell_block">
				<view class="list_cell">
					<view class="cell_label">
						参考均价
					</view>
					<view class="cell_main Cl_R">
						{{this.$formatter.AveragePrice(moreDetail.referenceAveragePriceType,moreDetail.referenceAveragePrice)}}
					</view>
				</view>
				<view class="list_cell">
					<view class="cell_label">
						参考总价
					</view>
					<view class="cell_main">
						{{this.$formatter.formatTotalPrice(moreDetail.referenceTotalPriceMin,moreDetail.referenceTotalPriceMax)}}
					</view>
				</view>
				<view class="list_cell">
					<view class="cell_label">
						开盘时间
					</view>
					<view class="cell_main">
						{{moreDetail.openTime==null?'开盘待定':formatDate(moreDetail.openTime)}}
					</view>
				</view>
				<view class="list_cell">
					<view class="cell_label">
						楼盘地址
					</view>
					<view class="cell_main cell_right" @click='toMap'>
						{{moreDetail.detailAddress}}
						<view class='iconfont iconarrow_more'></view>
					</view>
				</view>
				<view class="list_cell" v-if="moreDetail.hotHouseType != ''">
					<view class="cell_label">
						热销户型
					</view>
					<view class="cell_main cell_right" @click='toHouseTypeList'>
						{{moreDetail.hotHouseType}}
						<view class='iconfont iconarrow_more'></view>
					</view>
				</view>
			</view>
			
			<view class="cell_block">
				<view class="list_cell">
					<view class="cell_label">
						开&ensp;发&ensp;商
					</view>
					<view class="cell_main">
						{{moreDetail.developer==''?'暂无信息':moreDetail.developer}}
					</view>
				</view>
				<view class="list_cell">
					<view class="cell_label">
						交房时间
					</view>
					<view class="cell_main">
						{{moreDetail.deliveryTime==null?'暂无信息':formatDate(moreDetail.deliveryTime)}}
					</view>
				</view>
				<view class="list_cell">
					<view class="cell_label">
						楼盘类型
					</view>
					<view class="cell_main">
						{{moreDetail.propertyType}}
					</view>
				</view>
				<view class="list_cell" v-if="moreDetail.decorationStatus!=''">
					<view class="cell_label">
						装修标准
					</view>
					<view class="cell_main">
						{{this.$formatter.switchName('decorationStatus',moreDetail.decorationStatus)}}
					</view>
				</view>
				<view class="list_cell" v-if="moreDetail.propertyYear!=null">
					<view class="cell_label">
						产权年限
					</view>
					<view class="cell_main">
						{{moreDetail.propertyYear}}年
					</view>
				</view>
				<view class="list_cell" v-if="moreDetail.plotRatio!=''">
					<view class="cell_label">
						容&ensp;积&ensp;率
					</view>
					<view class="cell_main">
						{{moreDetail.plotRatio}}
					</view>
				</view>
				<view class="list_cell" v-if="moreDetail.greenRatio!=''">
					<view class="cell_label">
						绿&ensp;化&ensp;率
					</view>
					<view class="cell_main">
						{{moreDetail.greenRatio}}%
					</view>
				</view>
				<view class="list_cell" v-if="moreDetail.parkingRatio!=''">
					<view class="cell_label">
						车&ensp;位&ensp;比
					</view>
					<view class="cell_main">
						{{moreDetail.parkingRatio}}
					</view>
				</view>
			</view>
				
			<view class="cell_block">
				<view class="list_cell">
					<view class="cell_label">
						物业公司
					</view>
					<view class="cell_main">
						{{moreDetail.propertyCompany==''?'暂无信息':moreDetail.propertyCompany}}
					</view>
				</view>
				<view class="list_cell" v-if="moreDetail.parkingCosts!=''">
					<view class="cell_label">
						物&ensp;业&ensp;费
					</view>
					<view class="cell_main">
						{{moreDetail.parkingCosts}}
					</view>
				</view>
				<view class="list_cell" v-if="moreDetail.utilityFee!=''">
					<view class="cell_label">
						水&ensp;电&ensp;费
					</view>
					<view class="cell_main">
						{{this.$formatter.switchName('utilityFeeStatus',moreDetail.utilityFee)}}
					</view>
				</view>
			</view>
			
			<view class="cell_block" v-for="(item,index) in moreDetail.buildingPreSaleCertificateBaseInfoList" :key='index'>
				<view class="list_cell" v-if="item.certificateName!=''">
					<view class="cell_label">
						预售许可证
					</view>
					<view class="cell_main Pd_16">
						{{item.certificateName}}
					</view>
				</view>
				<view class="list_cell" v-if="item.getTime!=''">
					<view class="cell_label">
						发证时期
					</view>
					<view class="cell_main">
						{{formatDate(item.getTime)}}
					</view>
				</view>
				<view class="list_cell" v-if="item.buildingDistribution!=''">
					<view class="cell_label">
						证件楼栋
					</view>
					<view class="cell_main">
						{{item.buildingDistribution}}
					</view>
				</view>
			</view>
		</view>
		<consultation-foot :mess="mess"></consultation-foot>
	</view>
</template>

<script>
import { getData } from '@/request/api';
import consultationFoot from "../components/consultationFoot/consultationFoot.vue";
export default {
	components: {
		consultationFoot
	},
	data() {
		return {
			buildingId:'',
			moreDetail:{},
			//设置默认的分享参数
			share:{
			    title:'',
			    path:'',
			    imageUrl:'',
			},
			mess:{type:"moreBuildInfo"}
		};
	},
	onLoad(option){
		this.buildingId = option.buildingId
		this.searchAssociation();
		this.mess.buildingId = option.buildingId;
	},
	computed: {},
	watch: {},
	methods: {
		//跳转户型列表
		toHouseTypeList(){
			uni.navigateTo({
			    url: '../houseTypeList/houseTypeList?buildingId='+this.buildingId
			});
		},
		//更多楼盘信息
		 searchAssociation(keyword){
			console.log(keyword,666)
		    let param = {
				buildingId: this.buildingId
			}
			getData("/building/capp/building/buildingMoreInfo",param).then(res=>{
				console.log("请求更多楼盘信息",res)
				//this.mess = Object.assign(res,this.mess);
				uni.setNavigationBarTitle({
				    title: res.buildingAlias
				});
				this.share.title = res.buildingAlias
				this.moreDetail = res;
				let propertyType = res.propertyType.split(',')
				let propertyTypeArr = []
				propertyType.forEach((item,index)=>{
					propertyTypeArr.push(this.$formatter.switchName('propertyType',item))
				})
				this.moreDetail.propertyType = propertyTypeArr.join('、')
				// this.moreDetail.buildingDistribution = res.buildingPreSaleCertificateBaseInfoList[0]?res.buildingPreSaleCertificateBaseInfoList[0].buildingDistribution:'';
				// this.moreDetail.certificateName = res.buildingPreSaleCertificateBaseInfoList[0]?res.buildingPreSaleCertificateBaseInfoList[0].certificateName:'';
				// this.moreDetail.certificateNo = res.buildingPreSaleCertificateBaseInfoList[0]?res.buildingPreSaleCertificateBaseInfoList[0].certificateNo:'';
				// this.moreDetail.getTime = res.buildingPreSaleCertificateBaseInfoList[0]?res.buildingPreSaleCertificateBaseInfoList[0].getTime:'';
			}).catch(err=>{
				console.log("请求结果报错",err)
			})
		},
		formatDate(str){
			if(str){
				str = str.split(' ')[0];
				return str;
			}else{
				return '待定';
			}
		},
		//跳转地图
		toMap(){
			let path = this.$tool.returnWebviewconfigUrl('peripheralSupporting');
			console.log(path,'pathpathpath')
			console.log(1122233)
			uni.navigateTo({
			    url: '../webView/webView?toMWebpath='+ path + this.moreDetail.lng + '-' + this.moreDetail.lat + '&buildingName='+this.moreDetail.buildingAlias+'&buildingUrl='+this.moreDetail.detailAddress
			});
		}
	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
	.more_build_detail{
		.Mr_B{
			margin-bottom: 96rpx;
		}
		.title{
			font-size: 36rpx;
			padding: 42rpx 0 50rpx 44rpx;
			text-align: left;
			color: #02191e;
			line-height: 36rpx;
		}
		/* .last_bottom{
			padding-bottom: 0 !important;
		} */
		.cell_block{
			padding-bottom: 60rpx;
			.list_cell{
				padding: 0 44rpx;
				display: flex;
				.cell_label{
					font-size: 30rpx;
					line-height: 50rpx;
					color: #a9a8ae;
					/* width: 120rpx; */
					display: flex;
					justify-content: space-between;
				}
				.cell_main{
					padding-left: 48rpx;
					color: #1b1833;
					font-size: 30rpx;
					line-height: 50rpx;
					flex: 1;
				}
			}
			.Pd_16{
				padding-left: 16rpx !important;
			}
			.Cl_R{
				color: #FF4750 !important;
			}
			.cell_right{
				display: flex;
				justify-content: space-between;
				.iconfont{
					line-height: 1;
					align-self: center;
					font-size: 20rpx;
					color: #999999;
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
