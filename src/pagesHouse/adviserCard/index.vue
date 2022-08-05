<!-- 顾问卡片 -->

<template>
  <view class="adviser-card">
    <r-canvas ref="rCanvas"></r-canvas>
    <!-- 管家名片 -->
    <view class="adviser-info">
      <view class="user_warp">
        <view class="top">
          <image class="avatarTou" :src="consultant.avatarUrl" mode="aspectFill">
          </image>
          <view class="user_msg">
            <view class="name">
              {{consultant.userName||'--'}}
              <!-- <view class="download_btn" @click="downloadUserImg()">
								<i class='iconfont iconicon_save'></i>保存名片
							</view> -->
            </view>
            <view class="phone_chat">
              <view>
                <i class='iconfont iconicon_phone_gray'></i><text>{{consultant.phone}}</text>
              </view>
              <button class="user_msg_btn" type="default" hover-class='none'
                @click="tellPhone(consultant.phone)">
                拨打
              </button>
            </view>
            <view class="phone_chat">
              <view>
                <i
                  class='iconfont iconicon_wechat_gray'></i><text>{{consultant.wechat}}</text>
              </view>
              <button class="user_msg_btn" type="default" hover-class='none'
                @click="copyNumber(consultant.wechat)">
                加微信
              </button>
            </view>
          </view>
        </view>
        <view class="bottom_item">
          <view class="item_warp">
            <view class="num">
              {{consultant.servedPeopleNum||'-'}}<text class="unit">人</text>
            </view>
            <view class="item_title">
              服务客户
            </view>
          </view>
          <view class="item_warp">
            <view class="num">
              5<text class="unit">分</text>
            </view>
            <view class="item_title">
              客户满意度
            </view>
          </view>
          <view class="item_warp" style="border-right: 0;">
            <view class="num">
              {{consultant.workExperienceDesc||'--'}}
              <!-- <text class="unit">年</text> -->
            </view>
            <view class="item_title">
              从业年限
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 服务楼盘 -->
    <view class="adviser-buildingInfo">
      <view class="adviser-building">
        <view class="building-item uni-bg-red">
          <buildingCard :building="building" :userId="userId" :sn='sn' />
        </view>
      </view>
    </view>
    <view class="adviser-bottom">
      <button class="left_btn bottom_btn" data-name="shareBtn" open-type="share">
        推荐给朋友
      </button>
      <button class="right_btn bottom_btn" @click="tellPhone(consultant.phone)">
        <i class='iconfont iconicon_phone'></i>联系顾问
      </button>
    </view>
    
    <auth-phone scene="card" :buildingId='buildingId' :userId='userId' :sn="sn" ref='auth'></auth-phone>
  </view>
</template>

<script>
  import buildingCard from '@/pagesHouse/adviserCard/components/buildingCard.vue'
  import rCanvas from '@/components/r-canvas/r-canvas.vue'
  import authPhone from '__com/auth/phone.vue'
  import buildMgr from '__com/building/index.js'
  import consultantMgr from '__com/consultant/index.js'
  import clueMgr from '__com/clue/index.js'

  export default {
    components: {
      buildingCard,
      rCanvas,
      authPhone
    },
    data() {
      return {
        buildingId: '',
        userId: '',
        sn: '',
        
        consultant: {},
        building: {},
        canvasImg: '',
        beginTime: '', // 进入页面时间戳
        endTime: '', // 离开页面时间戳
      }
    },
    onLoad(opt) {
      if (opt.scene) {
        const scene = decodeURIComponent(opt.scene)
        let obj = {}
        scene.split('&').forEach((item) => {
          const key = item.split('=')[0]
          obj[key] = item.split('=')[1]
        })
        console.log(obj, '扫码的名片参数')
        this.sn = obj.s
        this.getParams().then(res => {
          this.init()
        })
      } else {
        console.log(opt, '传过来的名片参数')
        if (opt.sn) {
          this.sn = opt.sn
          this.getParams().then(res => {
            this.init()
          })
        } else {
          this.buildingId = opt.buildingId
          this.userId = opt.userId
          this.init()
        }
      }
    },
    onShow() {
      // #ifdef MP-WEIXIN
      this.beginTime = new Date().getTime()
      // #endif
    },
    onHide() {
      this.log()
    },
    onUnload() {
      this.log()
    },
    onReady() {
      //设置页面导航条颜色
      uni.setNavigationBarColor({
        frontColor: '#141414',
        backgroundColor: '#ffffff',
      })
    },
    methods: {
      init() {
        this.getUserInfo()
        this.getBuildingInfo()
        this.share.path = `/pagesHouse/adviserCard/index?sn=${this.sn}`
      },
      //获取顾问信息
      getUserInfo() {
        return consultantMgr.detail(this.userId).then(res => {
          this.share.title = `置业顾问【${res.userName ? res.userName : '-'}】`
          let { expertiseFields = [], buildingInfos = [] } = res
          res.expertiseFields = expertiseFields
          res.servedPeopleNum = parseInt(res.servedPeopleNum) || ''
          this.consultant = res
          //设置标题
          uni.setNavigationBarTitle({
            title: res.userName ? `${res.userName}的个人主页` : '顾问主页',
          })
          return res
        })
      },
      // 楼盘-图片信息|基本信息
      getBuildingInfo() {
        return buildMgr.info(this.buildingId).then(res => {
          let annexVOS = res.annexVOS || []
          /**
           * 附件类型(101:效果图 102:样板间 103:环境规划图 104:配套实景图 105:楼盘实景图 106:楼栋分布图 107:户型 108:预售证
           * 109:视频,110:楼盘VR, 113:首屏周边, 114:楼盘介绍, 115:楼盘logo, 116:pc封面图
           * 201:预售证管理附件,301:户型图,302户型VR,112:发现主题,304:测评图,305:样板间)
           */
          let mp4Arr = annexVOS.filter(i => i.annexType == '109')
          let vrArr = annexVOS.filter(i => i.annexType == '110' || i.annexType == '302')
          res.mp4Picture = mp4Arr.length > 0 ? mp4Arr[0].smallAnnexPath : ''
          res.vrPicture = vrArr.length > 0 ? vrArr[0].smallAnnexPath : ''
          res.imgPicture = res.housesCover || ''
          res.realImgPath = res.mp4Picture || res.vrPicture || res.imgPicture
          this.building = res
          return res
        })
      },
      // 根据sn码查询参数
      getParams() {
        return clueMgr.params(this.sn).then(res => {
          console.log(res, '根据SN码查询到的参数')
          this.buildingId = res.buildingId
          this.userId = res.userId
        })
      },
      //保存顾问名片
      downloadUserImg(url) {
        this.$refs.rCanvas.saveImage(this.canvasImg)
      },
      //复制微信号
      copyNumber(value) {
        let self = this
        uni.setClipboardData({
          data: value
        })
      },
      //拨打电话
      tellPhone(value) {
        let self = this
        if (!value) {
          uni.showToast({
            title: '暂无顾问电话',
            icon: 'none',
            duration: 5000,
          })
          return
        }

        uni.makePhoneCall({
          phoneNumber: value,
          success: (res) => {},
          fail: (res) => {
            console.log('调用失败!')
          },
        })
      },
      log() {
        if (this.sn) {
          this.endTime = new Date().getTime()
          clueMgr.add({
            action: 1,
            promoteSn: this.sn,
            pageType: 10003,
            browsingTime: this.endTime - this.beginTime
          })
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .adviser-card {
    position: relative;
    padding-bottom: 140rpx;
    background-color: #ffffff;
    overflow: hidden;

    //顾问信息
    .adviser-info {
      padding: 50rpx 0 56rpx 0;
      background: url('https://images.tospurfang.com/88AC88E78E084CE699D62CA9E7141A62-6-2.jpg');
      background-repeat: no-repeat;
      background-size: contain;

      .user_warp {
        margin: 0rpx 30rpx;
        background: linear-gradient(226deg, #f4e6cf 1%, #e2cca8 98%);
        border-radius: 16rpx;
        box-shadow: 0px 2rpx 14rpx 0px rgba(0, 0, 0, 0.09);

        .top {
          display: flex;
          /* justify-content: space-between; */
          padding: 32rpx 28rpx 34rpx 24rpx;
          margin-bottom: 34rpx;

          .avatarTou {
            margin-right: 32rpx;
            width: 160rpx;
            height: 160rpx;
            border-radius: 80rpx;
          }

          .user_msg {
            display: flex;
            flex-direction: column;
            flex: 1;

            .name {
              font-size: 36rpx;
              font-weight: 600;
              color: #4c3612;
              line-height: 36rpx;
              margin-bottom: 8rpx;
              display: flex;
              justify-content: space-between;

              .download_btn {
                font-size: 20rpx;
                text-align: center;
                color: #4c3612;
                line-height: 20rpx;

                .iconfont {
                  display: inline-block;
                  margin-right: 11rpx;
                  vertical-align: middle;
                }
              }
            }

            .phone_chat {
              display: flex;
              justify-content: space-between;
              margin-top: 16rpx;
              color: #4c3612;

              .iconfont {
                display: inline-block;
                margin-right: 16rpx;
                color: #4c3612;
              }

              .user_msg_btn {
                width: 96rpx;
                height: 40rpx;
                opacity: 1;
                background: #694c1d;
                border-radius: 20rpx;
                font-size: 20rpx;
                color: #ffffff;
                line-height: 40rpx;
                margin: 0;
                padding: 0 18rpx;
              }
            }
          }
        }

        .bottom_item {
          display: flex;

          .item_warp {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            text-align: center;
            border-top: 1px solid rgba(6, 36, 113, 0.1);
            border-right: 1px solid rgba(6, 36, 113, 0.1);
            padding: 40rpx 0;

            .num {
              font-size: 30rpx;
              font-weight: 600;
              color: #4c3612;
              line-height: 40rpx;
            }

            .unit {
              font-size: 30rpx;
              font-weight: 400;
              color: #4c3612;
              line-height: 20rpx;
            }

            .item_title {
              font-size: 24rpx;
              color: #4c3612;
              line-height: 33rpx;
              margin-top: 13rpx;
            }
          }
        }
      }
    }

    // 服务楼盘
    .adviser-buildingInfo {
      width: 100%;
      background: #ffffff;
      margin-left: 24rpx;
      margin-top: 6rpx;
      
      .building-item {
        display: inline-block;
        width: 702rpx;
        border-radius: 10rpx 10rpx;
        overflow: hidden;
        // border:1px solid pink;
        margin: 0 7rpx;
      }
    }

    .adviser-bottom {
      width: 100%;
      padding: 28rpx 30rpx;
      // height: 114rpx;
      box-sizing: border-box;
      background: #ffffff;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;

      .bottom_btn {
        height: 76rpx;
        box-shadow: 0px 2rpx 14rpx 0px rgba(0, 0, 0, 0.09);
        font-size: 30rpx;
        font-weight: 600;
        text-align: center;
        color: #ffffff;
        line-height: 76rpx;
        flex: 1;
        text-align: center;
        background: linear-gradient(270deg, #3b538b 97%, #465e96);
        border-radius: 8rpx;
        box-shadow: 0px 2rpx 14rpx 0px rgba(0, 0, 0, 0.09);
      }

      .left_btn {
        // background: url(https://images.tospurfang.com/39B5A567522F4FF08EAE688A69117D18-6-2.jpg);
        // background-repeat: no-repeat;
        // background-size: contain;
        margin-right: 15rpx;
      }

      .right_btn {
        // background: url(https://images.tospurfang.com/39B5A567522F4FF08EAE688A69117D18-6-2.jpg);
        // background-repeat: no-repeat;
        // background-size: contain;
        margin-left: 15rpx;
        display: flex;
        justify-content: center;

        .iconfont {
          margin-right: 13rpx;
          font-size: 27rpx;
        }
      }
    }
  }
</style>
