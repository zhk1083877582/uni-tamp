<!-- 置业报告列表 -->
<template>
	<view class='report_list_warp'>
		<view class="Mr_30">
			<view class="report_list_item" v-for="(item,index) in ReportList" :key="index">
				<view class="top_main" @click="toReportDetail(item)">
					<view class="title">
						{{item.title}}
					</view>
					<view class="content">
						推荐楼盘：{{item.buildingAlias}}
					</view>
				</view>
				<view class="bottom_main">
					<view class="left">
						{{formatDate(item.showTime)}}
					</view>
					<view class="right">
						<view @click="tochathouseKeeper(item)" class="housekeeper">
							<image class="img" :src="item.avatarUrl!= '' ? item.avatarUrl : '../static/photo_default@2x.png'" mode=""></image>
							<view class="name">
								{{item.userName}}
							</view>
						</view>
						<u-button class='consult_btn' size="mini" type="primary" shape="circle" @click="consultClick(item)">咨询</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getData } from '@/request/api';
export default {
	components: {},
	data() {
		return {
			ReportList:[]
		};
	},
	computed: {},
	watch: {},
	methods: {
		//管家名片
		tochathouseKeeper(obj){
		    let { tecentImUserId,userName} = obj;
			tecentImUserId = "C2C"+tecentImUserId;
			uni.navigateTo({
			    url: '/pagesChat/chatDetail/houseKeeper?id='+tecentImUserId+"&title="+userName
			});
		},
		//置业报告看房报告列表
		 getReportList(){
				console.log(this.$tool.getToken(),1111)
		   let param = {
		   }
		   getData("/customer/capp/businessReport/listBusinessReport",param).then(res=>{
			   if(res.result.length>0){
				   res.result.forEach(item=>{
					   if(item.type==2){
						   this.ReportList.push(item);
					   }
				   })
			   }
			  console.log("请求置业报告列表",this.ReportList)
		   }).catch(err=>{
		      console.log("请求结果报错",err)
		   })
		},
		//点击咨询
		consultClick(item){
			let {tecentImUserId,userName} = item;
			tecentImUserId = 'C2C'+tecentImUserId;
			uni.navigateTo({
			   url: `/pagesChat/chatDetail/chatDetail?id=${tecentImUserId}&title=${userName}`
			});
		},
		//去置业报告详情
		toReportDetail(obj){
			console.log(obj)
			uni.navigateTo({
			    url: '../reportdetail/index?reportId='+obj.businessReportId
			});
		},
		formatDate(str){
			if(str){
				str = str.split(' ')[0];
				return str;
			}else{
				return '';
			}
		},
	},
	onLoad(option){
		this.getReportList()
	},
	created() {

	},
	mounted() {

	},
}
</script>
<style lang='scss' scoped>
	.report_list_warp{
		padding: 0 30rpx;
		.Mr_30{
			padding-top: 30rpx;
		}
		.housekeeper{
			display: flex;
			justify-content: space-between;
		}
		.report_list_item{
			padding: 40rpx 30rpx 0rpx 30rpx;
			margin-bottom: 20rpx;
			background-color: #FFFFFF;
			border-radius: 16px;
			.top_main{
				border-bottom: 1rpx solid #f3f3f3;
				.title{
					font-size: 32rpx;
					font-weight: 500;
					color: #333333;
					line-height: 32rpx;
				}
				.content{
					font-size: 26rpx;
					color: #999999;
					line-height: 26rpx;
					margin: 20rpx 0 30rpx 0;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
			}
			.bottom_main{
				padding: 20rpx 0;
				display: flex;
				justify-content: space-between;
				.left{
					font-size: 22rpx;
					color: #999999;
					display: flex;
					align-items: center;
				}
				.right{
					display: flex;
					justify-content: space-between;
					.img{
						width: 50rpx;
						height: 50rpx;
						margin-right: 16rpx;
						border-radius: 50%;
						overflow: hidden;
						margin-top: 15rpx;
					}
					.name{
						font-size: 28rpx;
						color: #282828;
						line-height: 50rpx;
						display: flex;
						align-items: center;
					}
					.consult_btn{
						margin-left: 30rpx;
						padding: 13rpx 36rpx;
					}
				}
			}
		}
	}
</style>
<style lang='scss'>
	page{
		background-color: #F7F7F9;
	}
</style>