<!-- 底部按钮置业管家 -->
<template>
  <view class="report_bottom_warp">
    <view class="report_bottom">
      <view class="report_bottom_left" @click="tohouseKeeper()">
        <view class="keeper_avatar">
          <u-avatar class="avatarTou" :src="userInfo.avatarUrl" size='76' mode="circle"></u-avatar>
        </view>
        <view class="keeper_message">
          <view class="name">
            <text>{{userInfo.userName||'-'}}</text>
            <!--<text class="years">{{userInfo.workExperienceDesc||'-'}}</text> -->
          </view>
          <view class="num">
            <text>{{userInfo.buildingInfos[0].buildingAlias||'-'}}</text>
          </view>
        </view>
      </view>
      <view class="report_bottom_right">
        <view class="consult wx" @click="copyWx">复制微信</view>
        <view class="consult phone" @click="tellPhone">电话咨询</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getData } from '@/request/api'
export default {
  components: {},
  data() {
    return {
      userInfo: {},
    }
  },
  props: {
    istoDetail: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: String,
      default: '',
    },
    reportId: {
      type: String,
      default: '',
    },
    modelType: {
      type: String,
      default: '3',
    },
    buildingId: {
      type: String,
      default: '',
    },
    operateCanal: {
      type: String,
      default: '',
    },
  },
  computed: {},
  watch: {},
  methods: {
    tellPhone() {
      this.getUserInfo()
      let self = this
      if (!self.userInfo.phone) {
        uni.showToast({
          title: '暂无顾问电话',
          icon: 'none',
          duration: 5000,
        })
        return
      }

      uni.makePhoneCall({
        // 手机号
        phoneNumber: self.userInfo.phone,
        // 成功回调
        success: (res) => {
          console.log('调用成功!')
        },
        // 失败回调
        fail: (res) => {
          console.log('调用失败!')
        },
      })
    },
    copyWx() {
      let self = this
      uni.setClipboardData({
        data: self.userInfo.wechat,
        success: function () {
          uni.hideToast()
          uni.showToast({
            title: '已复制微信号到剪贴板',
            icon: 'none',
          })
          self.showModal = true
        },
      })
    },
    tohouseKeeper() {
      if (!this.istoDetail) return
      uni.navigateTo({
        url:
          '/pagesHouse/adviserCard/index?userId=' +
          this.userInfo.userId +
          '&operateCanal=' +
          this.operateCanal,
      })
    },
    getUserInfo() {
      let params = {
        userId: this.userId,
        buildingId: this.buildingId,
      }
      let self = this
      getData('/dt-business/noToken/user/getUserCardDetail', params)
        .then((res) => {
          console.log('管家信息', res)
          if (res.servedPeopleNum != null || res.servedPeopleNum != '') {
            res.servedPeopleNum = parseInt(res.servedPeopleNum)
          } else {
            res.servedPeopleNum = ''
          }
          self.userInfo = res
          this.$emit('handelUserName', res)
        })
        .catch((err) => {
          console.log('管家信息', err)
        })
    },
  },
  created() {},
  mounted() {
    this.getUserInfo()
  },
}
</script>
<style lang='scss' scoped>
.report_bottom {
  background-color: #ffffff;
  padding: 10rpx 24rpx;
  display: flex;
  justify-content: space-between;
  .report_bottom_left {
    display: flex;
    .keeper_avatar {
      margin-right: 12rpx;
    }
    .keeper_message {
      margin: 8rpx 0;
	  max-width:260rpx;
      .name {
        font-size: 28rpx;
        color: #141414;
        font-weight: 600;
        line-height: 28rpx;
      }
      .num {
        font-size: 24rpx;
        line-height: 24rpx;
        color: #999999;
        margin-top: 8rpx;
		overflow:hidden;
		text-overflow:ellipsis;
		white-space:nowrap;
      }
    }
  }

  .report_bottom_right {
	  width: 50%;
	  margin-top: 8rpx;
	  display: flex;
	  justify-content: space-between;
    .consult {
	  margin: 6rpx 0;
	  width: 50%;
      height: 60rpx;
      line-height: 60rpx;
      border-radius: 8rpx;
      background: #4a6ddb;
      font-size: 30rpx;
      font-weight: 600;
      text-align: center;
      color: #ffffff;
    }
    .wx {
      margin-right: 10rpx;
      background: #ffffff;
      color: #4a6ddb;
      border: 1rpx solid #4a6ddb;
    }
  }
}
</style>
