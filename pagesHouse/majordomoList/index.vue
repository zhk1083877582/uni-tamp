<!-- 优秀管家 -->
<template>
	<view class='majordomo'>
		<view class="main-mode">
			 <view class="item" v-for="(item,index) in majordomoList" :key="index">
				<view class="major-mode" @click="tochathouseKeeper(item)">
					<image :src="item.avatarUrl ? item.avatarUrl+'?x-oss-process=image/resize,h_100,w_100' :imgText" class="user-icon"></image>
				    <view class="major-session">
						<view class="major-msg">
						  <text class="user-name">{{item.userName}}</text>
						  <text class="evaluate">满意度{{item.satisfaction}}</text>
						</view>
						<view class="major-sub-title">
						  <text class="span" v-for="(val,index) in item.expertiseFieldList" :key="index">{{val.paraValue}}</text>
						</view>
					</view>
				</view>
				<!-- <text @click="jumpUrlForChat(item)"  class="call_phone advisory">
					<image src="../static/live_advisory.png" class="live-phone-icon"></image>
				</text>
				<text class="call_phone" @click="telMaj(item)">
				  <image src="../static/phone.png" class="live-phone-icon"></image>
				</text> -->
				<view class="item-icons">
					<view class="icon-message" @click="jumpUrlForChat(item)"></view>
					<view class="icon-tel" @click="telMaj(item)"></view>
				</view>
			 </view>
		</view>
		<consultation-foot ref="consultationFoot" :mess="mess"></consultation-foot>
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
			majordomoList:[],
			buildingId:'',
			//设置默认的分享参数
			share:{
			    title:'优秀管家',
			    path:'',
			    imageUrl:'',
			},
			mess:{
				type:"majordomoList"
			}
		};
	},
	computed: {},
	watch: {},
	onLoad(option){
		console.log(option,'传递过来的内容');
		this.mess.buildingId = this.buildingId = option.buildingId;
		this.getmajordomo();
	},
	methods: {
		//管家名片
		tochathouseKeeper(obj){
			console.log(obj)
			let { imBaseUserId,userName} = obj;
			 imBaseUserId = "C2C"+imBaseUserId;
			uni.navigateTo({
			    url: '/pagesChat/chatDetail/houseKeeper?id='+imBaseUserId+"&title="+userName
			});
		},
		jumpUrlForChat(mess){
			this.$refs.consultationFoot.onlineConsultation(mess)
		},
		telMaj(mess){
			let { phone } = mess;
			this.$refs.consultationFoot.getMaj(phone)
			console.log('跳400电话，发送楼盘卡片')
		},
		getmajordomo(){
			let params = {
				buildingId: this.buildingId,
				type: 1
			}
			getData("/tospurWeb/v1/capp/rongcloud/more/getHousekeeperList", params).then(res => {
				console.log(res,"我是优秀管家");
				this.majordomoList = res.list;
			}).catch(err => {
				console.log("请求结果报错", err);
		    });
		}
	}
}
</script>
<style lang='scss' scoped>
.main-mode {
	margin-bottom: 96rpx;
    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 28rpx 40rpx 30rpx;
      border-bottom: 1px solid rgba(237, 237, 237, 0.8);
      .call_phone{
        flex: 0 0 54rpx;
      }
	  .advisory{
		  margin-right: 10rpx;
	  }
      .major-mode {
        display: flex;
        align-items: center;
        flex:1;
        .user-icon {
          width: 120rpx;
          height: 120rpx;
          border-radius: 100%;
        }
        .major-session {
          margin-left: 22rpx;
          .user-name {
            font-size: 32rpx;
            color: #333;
            font-weight: 500;
            display: inline-block;
            vertical-align: middle;
          }
          .evaluate {
            display: inline-block;
            font-size: 16rpx;
            color: #666;
            padding: 4rpx 12rpx;
            background: rgba(241, 249, 255, 1);
            border-radius: 18rpx;
            margin-left: 10rpx;
            vertical-align: middle;
          }
          .major-sub-title {
            margin-top: 18rpx;
            .span {
              font-size: 20rpx;
              color: #999;
              margin-right: 30rpx;
            }
          }
        }
      }
      .live-phone-icon {
        width: 50rpx;
        height: 50rpx;
      }
	  .item-icons{
	  	margin-left:25px;
	  	display: flex;
	  }
	  .icon-message{
	  	background: url(../../static/live_advisory.png);
	  	background-repeat: no-repeat;
	  	background-size:100% 100%;
	  	// background-position: -207px -32px;
	  	width: 27px;
	  	height: 27px;
	  }
	  .icon-tel{
	  	margin-left: 15px;
	  	background: url(../../static/phone.png);
	  	background-repeat: no-repeat;
	  	background-size:100% 100%;
	  	// background-position: -207px -32px;
	  	width: 27px;
	  	height: 27px;
	  }
    }
    .item:last-child {
      border-bottom: none;
    }
  }
</style>
