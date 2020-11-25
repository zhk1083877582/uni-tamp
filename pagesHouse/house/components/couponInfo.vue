<!-- 楼盘详情:优惠券 -->
<template>
	<view class="coupon-info">
		<title-info text="优惠信息"></title-info>
		<view class="couponList">
			<view class="coupon-item" v-for="(item,index) in couponFavourList" :key="item.id">
				<view class="item-line1">
					<text class="icon_currency icon_cover"></text>
					<view class="item-line1-text">
						{{item.title}}
					</view>
					<!-- <view class="item-line1-btn">领取</view> -->
				</view>
				<view class="item-line2">
					{{item.content}}
				</view>
			</view>
			<view class="coupon-item" v-for="(item,index) in couponList" :key="item.couponId">
				<view class="item-line1">
					<text class="icon_currency icon_coupon"></text>
					<view class="item-line1-text">
							{{item.couponName}}
					</view>
					<view v-if="!item.received" class="item-line1-btn" @click="doReceiveCoupon(item)">领取</view>
					<view v-else class="item-line1-btn1" @click="doReceiveCoupon(item)">领取</view>
				</view>
				<view class="item-line2">
					{{item.couponDescribe}}
				</view>
			</view>
			
			<u-toast ref="uToast" />
			<u-modal v-model="isShow" ref="uModal"  confirm-text="去查看" :show-cancel-button="true" :content="couponMsg" :show-title="false"
				 @confirm="confirm" @cancel="cancel" >
			</u-modal>
		</view>
	</view>
</template>

<script>
	import titleInfo from './titleInfo.vue';
	import { receiveCoupon,getData} from '@/request/api';
	export default {
		props:{
			couponFavourList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			couponList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			buildingId:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				isShow:false,
				couponMsg:'',//优惠信息
			}
		},
		components: {
			titleInfo
		},
		methods: {
			//领取优惠券
			doReceiveCoupon(item){
				let self =this;				
				// 先做登录跳转判断
				
				getData("/tospurWeb/pclogin/checkLogin", {
						// token: this.$tool.getToken()
						token: this.$cache.getCache("M-Token")
					})
					.then(res => {
						
					})
					.catch(err => {
						console.log("未登录或登录过期", err);
						uni.navigateTo({
						     url: '/pagesUser/login/login?topath=pagesHouse/house/house&buildingId='+self.buildingId
						 });
					});
				
				
				
				// let token = this.$cache.getCache('M-Token');
				// if(!token){
				// 	uni.navigateTo({
				// 	     url: '/pagesUser/login/login?topath=pagesHouse/house/house&buildingId='+self.buildingId
				// 	 });
				// 	 return 
				// }
				 
				let params = {
					couponSource: 4,//优惠券来源（1：APP 2：C-PC 3：M站 4:小程序）
					receiveCityCode: self.$cache.getCache('storageCity').code,//城市
					couponDetailId:item.couponDetailId,
					hmsr:'',
					hmpl:'',
					buildingId: self.buildingId
				}
				receiveCoupon('',params)
					.then(res=>{
						console.log('receiveCoupon',res);
						//打开模态框
						self.isShow = true;
						self.couponMsg ='优惠券领取成功';
						return 
					}).catch(error=>{
						// console.log(9999,error)
						self.$refs.uToast.show({
							title: `${error.msg}`,
						})
					})
			},
			//确认
			confirm() {
				uni.navigateTo({
				     url: '/pagesUser/myCard/myCard'
				 });
				this.$emit('changeCouponInfo')
				this.isShow =false;
				
			},
			//取消
			cancel(){
				this.$emit('changeCouponInfo')
				this.isShow =false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-info{
		width: 100%;
		// height:300px;
		// padding: 20px 15px;
		padding-top: 40rpx;
		padding-left: 15px;
		border-top: 10px solid #f4f8f8;
		.couponList{
			width: 100%;
			margin-top: 20px;
			padding-bottom: 5px;
		}
		.coupon-item{
			width:100%;
			height: 70px;
			padding-right: 15px;
			border-top: 0.5px solid #efefef;
			&:nth-of-type(1){
				border-top:0;
			}
		}
		
		.item-line1{
			width: 100%;
			height:40px;
			// border: 1px solid red;
			display: flex;
			position: relative;	
		}
		.item-line1-text{
			color: #333333;
			font-size: 13px;
			margin-left: 8px;
			margin-top:17px;
		}
		.item-line1-btn{
			width:43px;
			border: 1px solid #F96941;
			color: #F96843;
			border-radius: 12px;
			text-align: center;
			position: absolute;
			top:17px;
			right: 0;
		}
		.item-line1-btn1{
			width:43px;
			border: 1px solid #C1C1C1;
			color: #C1C1C1;
			border-radius: 12px;
			text-align: center;
			position: absolute;
			top:17px;
			right: 0;
		}
		.icon_currency {
		    display: inline-block;
		    width: 37px;
		    height: 17px;
		    margin-top: 15px;
		}
		.icon_coupon {
		    background: url(../../static/coupon_icon.png) no-repeat;
		    background-size: 100% 100%;
		}
		.icon_cover {
		    background: url(../../static/cover_icon.png) no-repeat;
		    background-size: 100% 100%;
		}
		.item-line2 {
		   margin-top: 5px;
		   margin-left: 42px;
		   color: #C1C1C1;
		   font-size: 12px;
		}
	}
</style>
