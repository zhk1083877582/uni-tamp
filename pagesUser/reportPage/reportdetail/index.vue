<!-- 置业报告详情页 -->
<template>
	<view class='report_page'>
		<view class="report_top">
			<!-- <view class="goBack_btn"><i class="iconfont iconbtn_return"></i></view> -->
			<view class="reprot_top_text">
				<view class="h2">{{reportObj.userCustomerStrN}}</view>
				<view class="h1">专属置业报告</view>
			</view>
			<view class="reprot_content_text">
				<view class="reprot_content_text_pic">
					<view class="reprot_content_text_con">{{reportObj.beginContent}}</view>
				</view>
			</view>
			<!-- #ifndef MP-BAIDU -->
			<u-sticky bg-color='#0E0E0E' offset-top=0 h5-nav-height='0'>
			<!-- #endif -->
				<view class="activity_main_title" :class="isfixed?'fixed':'No_fixed'">
					<scroll-view class="activity_main_ul swiper-wrapper" scroll-x="true" @scroll="scrollX" :scroll-left="scrollxNum" show-scrollbar=true scroll-with-animation=true>
						<view class="tag_item_list">
							<view class="activity_main_li" v-for="(item,index) in conlumnList" :key='index' :class="{active:current==item.cl}" @click="changeTab(item.cl)">
								<text class="span">{{item.label}}</text>
							</view>
						</view>
					</scroll-view>
				</view>
			<!-- #ifndef MP-BAIDU -->	
			</u-sticky>
			<!-- #endif -->
		</view>
		
		<view class="model">
			<!-- 当前购房需求 -->
			<house-demand :businessReportId='businessReportId' class="conlumn0"></house-demand>
			<!-- 关注区域分析 -->
			<regional :businessReportId='businessReportId' class="conlumn1"></regional>
			<!-- 匹配楼盘推荐 -->
			<recommend ref='recommend' :businessReportId='businessReportId' class="conlumn2"></recommend>
			<!-- 市场解读 -->
			<market :businessReportId='businessReportId' class="conlumn3"></market>
			<house-keeper :keeperUserInfo='keeperUserInfo' :endContent='reportObj.endContent'></house-keeper>
			<process></process>
		</view>
		
		<!-- 底部咨询 -->
		<view class="report_bottom_warp">
			<view class="report_bottom">
				<view class="report_bottom_left" @click="tochathouseKeeper(keeperUserInfo)">
					<image class="img" :src="keeperUserInfo.avatarUrl != '' ? keeperUserInfo.avatarUrl : '../static/photo_default@2x.png'" alt=""></image>
					<text class="name">{{keeperUserInfo.cardName}}</text>
				</view>
				<view class="report_bottom_right">
					<view class="div online_consult" @click="online">在线咨询</view>
					<view class="div tell_consult" @click="tellPhone">电话咨询</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { getData } from '@/request/api';
import HouseDemand from './components/houseDemand.vue';
import regional from './components/Regional.vue';
import recommend from './components/recommend.vue'
import market from './components/Market.vue';
import houseKeeper from './components/housekeeper.vue';
import process from './components/process.vue'
export default {
	components: {
		HouseDemand,
		regional,
		recommend,
		market,
		houseKeeper,
		process
	},
	data() {
		return {
			businessReportId:'',
			reportObj:{},
			keeperUserInfo:{},
			conlumnList:[
				{label:'当前购房需求',cl:'conlumn0'},{label:'关注区域分析',cl:'conlumn1'},{label:'匹配楼盘推荐',cl:'conlumn2'},{label:'市场情况解读',cl:'conlumn3'}
			],
			current:'conlumn0',
			currentGun:false,
			BGColor:'#0E0E0E',//transparent
			//设置默认的分享参数
			share:{
			    title:'',
			    path:'',
			    imageUrl:'',
			},
			reportId:'',
			scrollxNum:'0',
			isfixed:false
		};
	},
	computed: {},
	watch: {},
	methods: {
		scrollX(e) {
		            // console.log(e)
		            // this.old.scrollTop = e.detail.scrollTop
		        },
		changeTab(cl){
			// console.log(cl,'indexIIIII');
			let that = this;
			this.current = cl;
			this.currentGun = true;
			uni.createSelectorQuery().select(`.${cl}`).boundingClientRect(data=>{//目标节点
			　　uni.createSelectorQuery().select(".report_page").boundingClientRect((res)=>{//最外层盒子节点
			// console.log(data,res);
			　　　　uni.pageScrollTo({
			　　　　　　duration:0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
			　　　　　　scrollTop:data.top - res.top - 60,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
			　　　　})
			　　}).exec()
			}).exec();
			setTimeout(()=>{
				that.currentGun = false;
			},600)
		},
		//获取管家工号 
		ReportInfo() {
		    let params = {
		        businessReportId: this.businessReportId
		    }
		    getData('/customer/capp/businessReport/businessReportPreview', params).then((res)=> {
		        console.log('置业报告基本信息', res)
				this.reportObj = res;
				let userCustomerStr = `${res.userCustomerSurname}${res.userCustomerGender == 1 ? '先生' : '女士'}的`
				// console.log(userCustomerStr)
				this.reportObj.userCustomerStrN = userCustomerStr;
				//设置默认的分享参数
				this.share.title = res.title;
		        this.getUserInfo(res.workNo); //获取管家信息
				uni.setNavigationBarTitle({
				    title: res.title
				});
		    }, function(err) {
		        console.log(err)
		    })
		},
		//管家名片
		getUserInfo(workNo) {
			let that = this
		    let params = {
		        workNo: workNo
		    }
		    getData('/tospurWeb/capp/chatroom/getUserInfo', params).then((res)=> {
		        console.log('置业报告管家信息', res)
				let paraValue = []
				res.expertiseFieldList.forEach((item, index) => {
				    if (index >= 3) return;
					paraValue.push(item.paraValue)
				})
				this.keeperUserInfo.paraValue = paraValue
				this.keeperUserInfo = res
		    }, function(err) {
		        console.log(err)
		    })
		},
		//获取400电话
		get404PhoneNotLogin(data) {
		    return new Promise((resove, reject) => {
		        getData('/tospurWeb/capp/v2/user/getUserPhone', data).then(function(res) {
		            resove(res.mobile);
		        })
		    })
		},
		//拨打电话
		tellPhone(val){
			let that = this;
			let params={
					phone: this.keeperUserInfo.phone,
					buildingId : this.$refs.recommend.ReportBuilding[0]?this.$refs.recommend.ReportBuilding[0].buildingId:'',
					source:19
				}
			let saveParams = {
				type:3,
				phone:this.keeperUserInfo.phone,
				tcwBuildingId:this.$refs.recommend.ReportBuilding[0]?this.$refs.recommend.ReportBuilding[0].buildingId:'',
				tcwBuildingName:this.$refs.recommend.ReportBuilding[0]?this.$refs.recommend.ReportBuilding[0].buildingAlias:'',
				workNo:this.keeperUserInfo.workNo,
				baseUserName:this.keeperUserInfo.cardName
			}	
				// #ifdef  MP-BAIDU
                params.source = 22;
               // #endif
			   // #ifdef MP-TOUTIAO
			   params.source = 25
			    // #endif
			if(this.$refs.recommend.ReportBuilding[0].buildingId){
				getData('/tospurWeb/capp/v2/user/getUserPhone', params).then(function(res) {
					console.log(res.mobile,400)
				    uni.makePhoneCall({
				    	// 手机号
				    	phoneNumber: res.mobile,
				    	// 成功回调
				    	success: (res) => {
				    		console.log('调用成功!') 
							// potentialCustomersInfo('',saveParams)
				    	},
				    	// 失败回调
				    	fail: (res) => {
				    		console.log('调用失败!')
				    	}
				    });
				})
			}else{
				console.log(this.keeperUserInfo.phone,'手机号')
				uni.makePhoneCall({
					// 手机号
					phoneNumber: this.keeperUserInfo.phone,
					// 成功回调
					success: (res) => {
						console.log('调用成功!') 
					},
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
				});
			}
		},
		//管家名片
		tochathouseKeeper(obj){
		   let { imBaseUserId,cardName} = obj;
			imBaseUserId = "C2C"+imBaseUserId;
			uni.navigateTo({
			    url: '/pagesChat/chatDetail/houseKeeper?id='+imBaseUserId+"&title="+cardName
			});
		},
		//在线咨询
		online(){
			let { imBaseUserId,cardName} = this.keeperUserInfo;
			
			imBaseUserId = 'C2C'+imBaseUserId;
			uni.navigateTo({
			   url: `/pagesChat/chatDetail/chatDetail?id=${imBaseUserId}&title=${cardName}`
			});
		}
	},
	onLoad(option){
		console.log(option,'传过来的置业报告ID')
		this.reportId = option.reportId
		this.businessReportId = option.reportId;
		this.ReportInfo();
	},
	onPageScroll(e){
		// console.log(e)
		// #ifndef MP-TOUTIAO
		const query = uni.createSelectorQuery().in(this);
		// #endif
		// #ifdef MP-TOUTIAO
		const query = uni.createSelectorQuery()
		// #endif
		for(let i=0;i<=3;i++){
			query.select('.conlumn'+i).boundingClientRect(data => {
				// console.log(data,6666)
				if(data.top <= 63 && data.bottom>=63) {
					// console.log(data,'conlumn'+i,6666)
					this.current = 'conlumn'+i;
					this.scrollxNum = 130 * i;
				}
			}).exec();
		};
		if(e.scrollTop<=400){
			this.isfixed = false
			return
		}
		query.select('.activity_main_title').boundingClientRect(data => {
			// console.log(data)
			if(data.top <= 0 && data.bottom <= 63) {
				if (this.isfixed == true){return} 
				this.isfixed = true
			}
			
		}).exec();
	},
	created() {
		
	},
	mounted() {
		// console.log(123123)
	},
}
</script>
<style lang='scss' scoped>
	.report_page{
		background-color: #0E0E0E;
		.report_top {
		    min-height: 1060rpx;
		    background: url(https://m.tongcehaofang.com//img/bg_report.png) no-repeat;
		    background-size: contain;
		}
		.report_top .reprot_top_text {
		    font-size: 90rpx;
		    font-weight: 700;
		    text-align: center;
		    line-height: 139rpx;
		    padding-top: 126rpx;
		}
		
		.report_top .reprot_top_text .h2 {
		    font-size: 56rpx;
		    line-height: 56rpx;
			background: linear-gradient(130deg, #b0926f 30%, #ffeac8 49%, #fff3d6 50%, #a6906c);
			-webkit-background-clip: text;
			color: transparent;
		}
		.h1{
			font-size: 80rpx;
			line-height: 80rrpx;
			background: linear-gradient(130deg, #b0926f 30%, #ffeac8 49%, #fff3d6 50%, #a6906c);
			-webkit-background-clip: text;
			color: transparent;
		}
		.reprot_content_text {
		    font-size: 26rpx;
		    font-weight: 500;
		    text-align: center;
		    color: rgba(255, 242, 224, .6);
		    line-height: 44rpx;
		    padding-top: 240rpx;
		    margin-bottom: 60rpx;
		}
		
		.reprot_content_text_pic {
		    width: 100%;
		    background: url(../static/bg_arrow@2x.png) no-repeat;
		    background-size: 100% 112rpx;
		    background-position: bottom;
		    padding-bottom: 80rpx;
		}
		
		.reprot_content_text_con {
		    padding: 0 40rpx;
		    padding-bottom: 20rpx;
		}
		
		.activity_main_ul::-webkit-scrollbar,
		body::-webkit-scrollbar {
		    display: none;
		    /* Chrome Safari */
		}
		
		.activity_main_title {
		    /* height: 33px; */
		    padding: 30rpx 0;
		    line-height: 66rpx;
		    font-size: 30rpx;
		    color: #333;
		    width: 100%;
			padding-left: 40rpx;
		}
		
		.activity_main_ul {
		   /* display: flex;
		    overflow-x: auto; */
		    /* padding-left: 20px; */
		    /* padding: 0 40rpx; */
		}
		
		.activity_main_ul {
		    scrollbar-width: none;
		    /* firefox */
		    -ms-overflow-style: none;
		    /* IE 10+ */
		    /* overflow-Y: hidden;
		    overflow-X: auto; */
			/deep/.uni-scroll-view-content{
				display: flex;
			}
			.tag_item_list{
				scrollbar-width: none;
				/* firefox */
				-ms-overflow-style: none;
				/* IE 10+ */
				display: flex;
			}
		}
		
		.activity_main_li {
		    height: 66rpx;
		    border-radius: 8rpx;
		    text-align: center;
		    color: #dad2b7;
		    margin-right: 20rpx;
		    position: relative;
		    box-sizing: border-box;
		    background: url(../static/bg_btn@2x.png);
		    background-size: 100% 100%;
		}
		
		.activity_main_li .span {
		    white-space: nowrap;
		    padding: 0 40rpx;
		}
		
		.activity_main_li.active {
		    font-size: 30rpx;
		    font-weight: 700;
		    text-align: center;
		    color: #000000;
		    background: linear-gradient(135deg, #F2E1B5 0%, #FFF3D6 47%, #E8CE91);
		    border: 0;
		}
		.model {
		    padding: 0 30rpx 200rpx;
		}
		
		
		.report_bottom {
		    padding: 20rpx 30rpx;
		    background-color: #FFF8F0;
		    text-align: center;
		    display: flex;
		    justify-content: space-between;
		    position: fixed;
		    bottom: 0;
		    width: 100%;
		}
		
		.report_bottom_left {
		    display: flex;
		}
		
		.report_bottom_left .img {
		    width: 80rpx;
		    height: 80rpx;
		    border-radius: 50%;
		    overflow: hidden;
		}
		
		.report_bottom_left .name {
		    width: 90rpx;
		    height: 80rpx;
		    opacity: 0.9;
		    font-size: 30rpx;
		    font-weight: 400;
		    text-align: left;
		    color: #000000;
		    line-height: 80rpx;
		    display: block;
		    margin-left: 14rpx;
		}
		
		.report_bottom_right {
		    display: flex;
		}
		
		.report_bottom_right .div {
		    width: 220rpx;
		    height: 76rpx;
		    border-radius: 4rpx;
		    line-height: 76rpx;
		    font-size: 28rpx;
		    color: #FFFFFF;
		}
		
		.report_bottom_right .online_consult {
		    background-color: #CDA664;
		    margin-right: 20rpx;
		}
		
		.report_bottom_right .tell_consult {
		    background-color: #DD413F;
		}
		/deep/.u-sticky{
			background-color: #0E0E0E;
		}
		.fixed{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 9999;
			background-color: #000000;
		}
		.No_fixed{
			position: sticky;
		}
	}
</style>
