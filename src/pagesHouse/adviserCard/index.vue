<!-- 顾问卡片 -->

<template>
  <view class="adviser-card">
    <r-canvas ref="rCanvas"></r-canvas>
    <!-- 管家名片 -->
    <view class="adviser-info">
      <view class="user_warp">
        <view class="top">
          <u-avatar class="avatarTou" :src="adviserInfo.avatarUrl" size='160' mode="circle"></u-avatar>
          <view class="user_msg">
            <view class="name">
              {{adviserInfo.userName||'--'}}
              <!-- <view class="download_btn" @click="downloadUserImg()">
								<i class='iconfont iconicon_save'></i>保存名片
							</view> -->
            </view>
            <view class="phone_chat">
              <view>
                <i class='iconfont iconicon_phone_gray'></i><text>{{adviserInfo.phone}}</text>
              </view>
              <button class="user_msg_btn" type="default" hover-class='none' @click="tellPhone(adviserInfo.phone)">
                拨打
              </button>
            </view>
            <view class="phone_chat">
              <view>
                <i class='iconfont iconicon_wechat_gray'></i><text>{{adviserInfo.wechat}}</text>
              </view>
              <button class="user_msg_btn" type="default" hover-class='none' @click="copyNumber(adviserInfo.wechat)">
                加微信
              </button>
            </view>
          </view>
        </view>
        <view class="bottom_item">
          <view class="item_warp">
            <view class="num">
              {{adviserInfo.servedPeopleNum||'-'}}<text class="unit">人</text>
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
              {{adviserInfo.workExperienceDesc||'--'}}
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
        <swiper class="swiper" :style="{height:swiperInfo.itemHeight}" :next-margin="swiperInfo.swiperMargin" :previous-margin="swiperInfo.swiperMargin" :current="swiperInfo.current"
          :indicator-dots="swiperInfo.indicatorDots" :autoplay="swiperInfo.autoplay" :effect3d="true" circular='true' @change="doChangeSwipe">
          <swiper-item v-for="(item,index) in baseInfo" :key="index">
            <view class="building-item uni-bg-red" :class="index!=swiperInfo.current?'scale_swiper':''">
              <buildingCard :baseInfo="item" :userId="userId" :buildingId="item.buildingId" @showAuthorizefun='showAuthorizefun'>
              </buildingCard>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view class="adviser-bottom">
      <button class="left_btn bottom_btn" data-name="shareBtn" open-type="share">
        推荐给朋友
      </button>
      <button class="right_btn bottom_btn" @click="tellPhone(adviserInfo.phone)">
        <i class='iconfont iconicon_phone'></i>联系顾问
      </button>
    </view>
  </view>
</template>

<script>
import { getBuildingBaseInfo } from '@/request/api'
import { getData } from '@/request/api'
import buildingCard from '@/pagesHouse/adviserCard/components/buildingCard.vue'
import footBottom from '@/components/footer/index.vue'
import rCanvas from '@/components/r-canvas/r-canvas.vue'
export default {
  components: {
    buildingCard,
    footBottom,
    rCanvas,
  },
  data() {
    return {
      buildingIdX: '', //app扫码进来，带过来buildingId时
      userId: '',
      configPicture: '', //楼盘配置图，如果不存在取c-app的封面图
      adviserInfo: {},
      //滑动信息
      swiperInfo: {
        itemHeight: '1050rpx',
        swiperMargin: '17rpx',
        current: '1',
        indicatorDots: false,
        autoplay: false,
      },
      baseInfo: [],
      beginTime: '',
      showAuthorize: false,
      buildingId: '',
      // showModal: false,
      modalContent: `
					您可前往微信“通许录”，在搜索框中粘贴微信号，以搜索或添加顾问微信
				`,
      canvasImg: '',
      cardData: {},
    }
  },
  onLoad(option) {
    console.log('-------进入管家名片', option)
    if (option.scene) {
      const scene = decodeURIComponent(option.scene)
      console.log('-------scene数据', scene)
      let obj = {}
      scene.split('&').forEach((item) => {
        const key = item.split('=')[0]
        obj[key] = item.split('=')[1]
      })
      this.userId = obj.uId || ''
      this.buildingIdX = obj.bId || ''
      this.CustomerTrack.operateCanal = obj.type
      this.share.path =
        '/pagesHouse/adviserCard/index?userId=' +
        this.userId +
        '&buildingId=' +
        this.buildingIdX +
        '&operateCanal=3'
    } else {
      this.userId = option.userId || ''
      this.buildingIdX = option.buildingId || ''
      this.share.path =
        '/pagesHouse/adviserCard/index?userId=' +
        this.userId +
        '&buildingId=' +
        this.buildingIdX +
        '&operateCanal=3'
    }
    this.initUserInfo() //管家信息
    // this.initBaseInfo();//楼盘信息
  },
  onHide() {},
  onUnload() {},
  onReady() {
    //设置页面导航条颜色
    uni.setNavigationBarColor({
      frontColor: '#141414',
      backgroundColor: '#ffffff',
    })
  },
  methods: {
    showAuthorizefun(data) {
      console.log(data)
      // this.cardData = data
      // this.showAuthorize = true
      this.onGetUserInfo()
    },
    onGetUserInfo() {
      uni.getUserProfile({
        desc: 'Wexin', // 这个参数是必须的
        success: (res) => {
          console.log('用户信息', res)
          this.$cache.setCache('customerWXInfo', res)
          this.showAuthorize = false
          uni.navigateTo({
            url:
              '/pagesHouse/house/house?buildingId=' +
              this.cardData.buildingId +
              '&userId=' +
              this.cardData.userId,
          })
        },
      })
    },
    doChangeSwipe(val) {
      console.log('----swiper', val)
      this.swiperInfo.current = val.detail.current
      this.currentPlan = 0
      let item = this.baseInfo[val.detail.current]
      this.buildingId = item.buildingId
      //设置标题
      // uni.setNavigationBarTitle({
      // 	// title: item.buildingAlias||item.buildingName,
      // 	title: '我的名片'
      // });
      //封面图
      this.configPicture = item.backgroundUrl
    },
    //获取小程序二维码
    getwxCodeUserCard() {
      let params = {
        userId: this.userId,
        buildingId: this.buildingIdX,
      }
      getData('/dt-user/noToken/wx/getwxCodeUserCard', params)
        .then((res) => {
          // console.log(res,'获取小程序二维码')
          this.wxcodeCard = res
        })
        .catch((err) => {
          console.log('获取小程序二维码', err)
        })
    },
    //获取顾问信息
    initUserInfo() {
      let params = {
        userId: this.userId,
        buildingId: this.buildingIdX,
      }
      console.log('-------params', params)
      let self = this
      getBuildingBaseInfo('dt-user/v1/aggs/user/noToken/get', params)
        .then((res) => {
          console.log('管家信息', res)
          this.share.title = `置业顾问【${res.userName ? res.userName : '-'}】`
          let { expertiseFields = [], buildingInfos = [] } = res
          res.expertiseFields = expertiseFields
          if (res.servedPeopleNum != null || res.servedPeopleNum != '') {
            res.servedPeopleNum = parseInt(res.servedPeopleNum)
          } else {
            res.servedPeopleNum = ''
          }
          self.adviserInfo = res
          //设置标题
          uni.setNavigationBarTitle({
            // title: arr.length>1?arr[1].buildingAlias||arr[1].buildingName:arr[0].buildingAlias||arr[0].buildingName,
            title: res.userName ? `${res.userName}的个人主页` : '顾问主页',
          })
          //获取buildingIds
          let buildingIds = buildingInfos.map((item1) => {
            return item1.buildingId
          })
          self.initBaseInfo(buildingIds)
          // self.getwxCodeUserCard();
          // setTimeout(()=>{
          // 	self.createImg()
          // },1000)
        })
        .catch((err) => {
          console.log('管家信息11', err)
        })
    },
    // 楼盘-图片信息|基本信息
    initBaseInfo(buildingIds) {
      let params = {
        buildingIds: buildingIds,
      }
      let self = this
      getBuildingBaseInfo(
        '/dt-business/noToken/home/userServedBuilding',
        params
      )
        .then((res) => {
          console.log('----楼盘信息--', res)

          let arr = (res || []).map((item) => {
            item.referenceAveragePrice = item.referenceAveragePrice
              ? parseInt(item.referenceAveragePrice)
              : item.referenceAveragePrice
            item.referenceTotalPriceMin = item.referenceTotalPriceMin
              ? parseInt(item.referenceTotalPriceMin)
              : item.referenceTotalPriceMin
            item.referenceTotalPriceMax = item.referenceTotalPriceMax
              ? parseInt(item.referenceTotalPriceMax)
              : item.referenceTotalPriceMax
            item.referenceBuildAreaMin = item.referenceBuildAreaMin
              ? parseInt(item.referenceBuildAreaMin)
              : item.referenceBuildAreaMin
            item.referenceBuildAreaMax = item.referenceBuildAreaMax
              ? parseInt(item.referenceBuildAreaMax)
              : item.referenceBuildAreaMax

            let annexVOS = item.annexVOS || []
            // console.log('====annexVOS',annexVOS)
            /**
             * 附件类型(101:效果图 102:样板间 103:环境规划图 104:配套实景图 105:楼盘实景图 106:楼栋分布图 107:户型 108:预售证
             * 109:视频,110:楼盘VR, 113:首屏周边, 114:楼盘介绍, 115:楼盘logo, 116:pc封面图
             * 201:预售证管理附件,301:户型图,302户型VR,112:发现主题,304:测评图,305:样板间)
             */
            let mp4Arr = annexVOS.filter((item1) => {
              return item1.annexType == '109'
            })
            console.log('存在mp4Arr', mp4Arr)
            let vrArr = annexVOS.filter((item1) => {
              return item1.annexType == '110' || item1.annexType == '302'
            })
            console.log('存在vrArr', vrArr)
            let imgArr = annexVOS.filter((item1) => {
              return (
                item1.annexType != '109' &&
                item1.annexType != '110' &&
                item1.annexType != '302'
              )
            })
            console.log('存在imgArr', imgArr)
            item.mp4Picture = mp4Arr.length > 0 ? mp4Arr[0].smallAnnexPath : ''
            item.vrPicture = vrArr.length > 0 ? vrArr[0].smallAnnexPath : ''
            // item.imgPicture = imgArr.length>0? imgArr[0].annexPath:'';
            item.imgPicture = item.backgroundUrl || ''
            console.log(
              `视频:${item.mp4Picture} ---VR：${item.vrPicture} --图片：${item.imgPicture}`
            )
            item.realImgPath =
              item.mp4Picture || item.vrPicture || item.imgPicture
            return item
          })

          self.baseInfo = arr
          // console.log('----楼盘信息1',arr)
          ;(self.buildingId =
            arr.length > 1
              ? arr[1].buildingId
              : arr.length == 0
              ? arr[0].buildingId
              : ''),
            //封面图
            (self.configPicture =
              arr.length > 1 ? arr[1].backgroundUrl : arr[0].backgroundUrl)
        })
        .catch((err) => {
          console.log('基本信息-err', err)
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
        data: value,
        // success: function () {
        //   uni.hideToast()
        //   // uni.showToast({
        //   // 	title: "已复制微信号到剪贴板",
        //   // 	icon: "none"
        //   // });
        //   self.showModal = true
        // },
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
        // 手机号
        phoneNumber: value,
        // 成功回调
        success: (res) => {},
        // 失败回调
        fail: (res) => {
          console.log('调用失败!')
        },
      })
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

  // 楼盘tag
  .adviser-tag {
    width: 100%;
    font-size: 20rpx;
    color: #000000;
    display: flex;
    position: absolute;
    top: 660rpx;
    left: 24rpx;
    .adviser-tag_item {
      flex: 1;
    }
    .iconfont {
      font-size: 18rpx;
      margin-right: 8rpx;
    }
  }

  // 服务楼盘
  .adviser-buildingInfo {
    width: 100%;
    background: #ffffff;
    //顾问名片-item
    .adviser-building {
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
    .scale_swiper {
      // transform:scaleY(0.85);
      // opacity: 0.5;
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
