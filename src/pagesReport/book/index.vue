<!-- 专属置业小蓝书 -->
<template>
  <view class='book_blue'>
    <view class="box">
      <view class="index_high">
        <view class="warp_border">
        </view>
        <view class="text">
          请查收您的
        </view>
        <view class="card">
          置业计划书
        </view>
        <view class="building_name">
          {{buildingName||''}}
        </view>

      </view>

      <view class="qundai">
        <view class="HDJ">
          <button class="btn" @click="onOpen">
            尊享开启
          </button>
          <view class="bottom_text">
            温馨提示：授权查看您的置业计划书，获得完整服务
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getData } from '@/request/api.js'
  import clueMgr from '__com/clue/index.js'
  import dt from "@dt/dt"
  export default {
    components: {},
    data() {
      return {
        reportId: '',
        sn: '',
        
        buildingName: '',
      }
    },
    onLoad(opt) {
      console.log(opt, '传过来的置业报告ID')
      if (opt.scene) {
        const scene = decodeURIComponent(opt.scene)
        let obj = {}
        scene.split('&').forEach((item) => {
          const key = item.split('=')[0]
          obj[key] = item.split('=')[1]
        })
        this.sn = opt.s
        this.getParams().then(res => {
          this.getReportData()
        })
      } else {
        if (opt.sn) {
          this.sn = opt.sn
          this.getParams().then(res => {
            this.getReportData()
          })
        } else {
          this.reportId = opt.reportId
          this.getReportData()
        }
      }
    },
    methods: {
      onOpen(e) {
        dt.biz.auth.update().then(res => {
          uni.reLaunch({
            url: '/pages_com/report/detail?sn=' + this.sn,
          })
        })
      },
      getReportData() {
        let params = {
          reportId: this.reportId,
        }
        getData('/dt-marketing/v1/report/noToken/reportDetail', params)
          .then((res) => {
            let customerGender = res.customerIntention ?
              res.customerIntention.gender :
              ''
            let subscriberName = res.customerIntention ?
              res.customerIntention.customerName :
              ''
            this.buildingName = res.buildingInfo.housesName
          })
          .catch((err) => {
            console.log(err)
          })
      },
      // 根据sn码查询参数
      getParams() {
        return clueMgr.params(this.sn).then(res => {
          console.log(res, '根据SN码查询到的参数')
          this.reportId = res.contentId
        })
      },
    },
  }
</script>
<style lang='scss' scoped>
  .book_blue {
    background: #062471;
    height: 100%;
    width: 100%;
    padding-top: 16%;

    .btn {
      background: linear-gradient(180deg, #ffeda8, #ffce89);
      border-radius: 49rpx;
      width: 443rpx;
      height: 98rpx;
      font-size: 36rpx;
      line-height: 98rpx;
      text-align: center;
      font-weight: 600;
      color: #062471;

      .user_name {
        font-weight: 600;
        color: #593b1c;
        padding: 0 6px;
      }
    }

    .bottom_text {
      font-size: 20rpx;
      font-weight: 400;
      text-align: center;
      color: #b2935a;
      line-height: 20rpx;
      margin-top: 38rpx;
    }

    .box {
      padding: 0 30rpx;
      height: 717rpx;
      border-radius: 4rpx;
      box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.5);
      position: relative;

      .index_high {
        width: 690rpx;
        margin: 0 auto;
        z-index: 10;
        background: #fef7e4;
        height: 100%;
        position: relative;
      }

      .text {
        font-size: 28rpx;
        text-align: center;
        color: #b89960;
        line-height: 28px;
        padding-top: 160rpx;
      }

      .building_name {
        margin-top: 32rpx;
        font-size: 32rpx;
        font-weight: 600;
        text-align: center;
        color: #062471;
        line-height: 32rpx;
      }

      .card {
        margin-top: 48rpx;
        font-weight: 700;
        text-align: center;
        color: #322314;
        font-size: 80rpx;
        line-height: 80rpx;
        color: #062471;
      }

      .warp_border {
        margin: 0 auto;
        width: 650rpx;
        height: 687rpx;
        position: absolute;
        top: 20rpx;
        left: 20rpx;
        z-index: 1;
        background: url(https://images.tospurfang.com/EAB52B7623624AF3B225B49024D161EF-6-2.jpg) no-repeat;
        background-size: 100% 100%;
      }

      .qundai {
        width: 100%;
        height: 560rpx;
        background: url(https://images.tospurfang.com/6D95DE18F74A4D6986E1D7A37EE300B1-6-2.jpg) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 0;
        top: 75%;
        z-index: 10;

        .HDJ {
          width: 100%;
          height: 100%;
          background: url(https://images.tospurfang.com/A068A1C25FC74588869BB73405F9EF6F-6-2.jpg) no-repeat;
          background-size: 100% 100%;
          padding-top: 30%;
          margin-top: 10%;
        }
      }
    }

    ::v-deep .u-hairline-border:after {
      border: 0;
    }
  }
</style>