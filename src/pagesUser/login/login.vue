<!-- 登录 -->
<template>
  <view class="login_warp">
    <image src="https://images.tospurfang.com/5259F332FEF24BB1B2699C7A3CC205E8-6-2.jpg" class="login_log"></image>
    <view class="btn_warp">
      <!-- #ifdef MP-WEIXIN -->
      <u-button type="default" hover-class='none' class="btn WX_btn" @click="onGetUserInfo">
        <i class="iconfont icondenglu-weixin"></i>
        微信授权登录
      </u-button>
      <!-- #endif -->
      <!-- <u-button @click="doTelLogin">
        <i class="iconfont icondenglu-shouji"></i>
        手机号码登录
      </u-button> -->
      <view class="login_agreement">
        登录即同意
        <text class="agreement" @click="toAgreement">
          置业笔记用户服务及隐私协议
        </text>
      </view>
    </view>
    <view class="btm_text">仅限接受线下置业顾问服务的用户使用</view>
  </view>
</template>

<script>
import { getData } from '@/request/api'
export default {
  components: {},
  data() {
    return {
      topath: '',
      option: '',
      pin: '',
      pinWx: '',
      openid: '',
      unionid: '',
      session_key: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    toAgreement() {
      uni.navigateTo({
        url: '/pagesUser/login/agreement',
      })
    },
    //手机号码登录
    doTelLogin() {
      uni.redirectTo({
        url: '/pagesUser/login/telLogin?topath=pages/journey/index',
      })
    },
    onGetUserInfo(e) {
      this.$dt.biz.auth.update().then(res => {
        if (this.$cache.getCache('LoginTopath')) {
          uni.reLaunch({
            url: '/' + this.$cache.getCache('LoginTopath'),
          })
        } else {
          uni.navigateBack()
        }
      })
    }
  },
  onLoad(option) {
    let pinStr1 = '',
      pinStr2 = ''
    for (let key in option) {
      if (key == 'topath') {
        pinStr1 += `${option[key]}?`
      } else {
        pinStr2 += `${key}=${option[key]}&`
      }
    }
    setTimeout(() => {
      if (pinStr2) {
        pinStr2 = pinStr2.substring(0, pinStr2.length - 1)
      } else {
        pinStr1 = pinStr1.substring(0, pinStr1.length - 1)
      }
      this.pinWx = pinStr1 + pinStr2
      this.$cache.setCache('LoginTopath', this.pinWx)
      console.log('LoginTopath', this.pinWx)
    }, 400)
  },
}
</script>
<style lang="scss" scoped>
.login_warp {
  background-color: #ffffff;
  height: 100%;
  .login_log {
    width: 330rpx;
    height: 244rpx;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 198rpx;
  }
  .login_agreement {
    font-size: 24rpx;
    line-height: 24rpx;
    padding: 36rpx 0 60rpx 0;
    color: #666666;
    .agreement {
      color: #062471;
    }
  }
  .btn_warp {
    padding: 0 48rpx;
    position: absolute;
    bottom: 331rpx;
    width: 100%;

    ::v-deep button {
      font-size: 36rpx;
      height: 98rpx;
      line-height: 98rpx;
      color: #062471;
      font-weight: 500;
    }

    .WX_btn {
      margin-bottom: 34rpx;
      display: block;

      ::v-deep button {
        background: #062471;
        color: #ffffff;
      }
    }

    .icondenglu-shouji {
      margin-right: 24rpx;
      font-size: 40rpx;
    }
    .baidu {
      margin-right: 24rpx;
    }
    .icondenglu-weixin {
      margin-right: 16rpx;
    }
  }
  .btm_text {
    width: 100%;
    font-size: 24rpx;
    font-weight: 400;
    text-align: center;
    color: #999999;
    line-height: 24rpx;
    position: fixed;
    bottom: 64rpx;
  }
}
</style>
