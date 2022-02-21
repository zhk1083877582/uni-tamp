<!-- 扫码签到 -->
<template>
  <view class='sing_in'>
    <r-canvas ref="rCanvas"></r-canvas>
    <!-- <image :src="'data:image/jpeg;base64,'+wxcodeCard" mode="" v-if="wxcodeCard"></image> -->
    <view class="main">
      <view class="building_warp">
        <view class="building_name"
          :style="showAuthorize?'line-height:80rpx':'line-height:110rpx'"
          v-if="adviserInfo.buildingInfos[0]">
          {{adviserInfo.buildingInfos[0]?adviserInfo.buildingInfos[0].buildingAlias:'--'}}
        </view>
        <view class="introduce" v-if="showAuthorize">
          {{adviserInfo.buildingInfos[0].buildingBrightSpot||'--'}}</view>
      </view>
      <view class="building_bg"></view>

      <view class="title_text">
        <view class="title">
          <i class="iconfont iconicon_wing_left"></i><text class="text">欢迎莅临</text><i
            class="iconfont iconicon_wing_right"></i>
        </view>
        <view class="procedure">
          {{showAuthorize?titleName:'以下为今日大致服务流程，耗时约为30分钟至1小时'}}
        </view>
      </view>
      <view class="main_content">
        <view class="img_warp" v-if="!showAuthorize">
          <view class="configImg_warp">
            <view class="configImg"><text class="img_text">区位介绍</text>
              <image
                src="https://images.tospurfang.com/4E1BEB8C86B24C52BCE829E4AD8220E8-6-2.jpg"
                mode=""></image>
            </view>
            <view class="configImg"><text class="img_text">沙盘介绍</text>
              <image
                src="https://images.tospurfang.com/BEC371A31E4B497BB353D8BEE11F423D-6-2.jpg"
                mode=""></image>
            </view>
          </view>
          <view class="configImg_warp MR_T">
            <view class="configImg"><text class="img_text">样板间带看</text>
              <image
                src="https://images.tospurfang.com/F029999A5A034BD39B2B8F703FDE55BA-6-2.jpg"
                mode=""></image>
            </view>
            <view class="configImg"><text class="img_text">沟通洽谈</text>
              <image
                src="https://images.tospurfang.com/4B2A4B48FC934EBEB6536DBE064C261B-6-2.jpg"
                mode=""></image>
            </view>
          </view>
        </view>
        <view class="user_warp" v-else>
          <view class="top">
            <u-avatar class="avatarTou" :src="adviserInfo.avatarUrl" size='160' mode="circle">
            </u-avatar>
            <view class="user_msg">
              <view class="name">
                {{adviserInfo.userName||''}}
              </view>
              <view class="phone_chat">
                <view>
                  <i
                    class='iconfont iconicon_phone_gray'></i><text>{{adviserInfo.phone}}</text>
                </view>
                <button class="user_msg_btn" type="default" hover-class='none'
                  @click="tellPhone(adviserInfo.phone)">
                  拨打
                </button>
              </view>
              <view class="phone_chat">
                <view>
                  <i
                    class='iconfont iconicon_wechat_gray'></i><text>{{adviserInfo.wechat}}</text>
                </view>
                <button class="user_msg_btn" type="default" hover-class='none'
                  @click="copyNumber(adviserInfo.wechat)">
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
              </view>
              <view class="item_title">
                从业年限
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom_main">
      <view class="bottom_bg">
        <view class="HDJ">
          <button type="default" hover-class='none' class="btn" v-if="showAuthorize"
            @click="downloadUserImg">
            保存顾问名片
          </button>
          <button type="default" hover-class='none' class="btn" v-else
            open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
            立即开启服务
          </button>
          <view class="bottom_text">
            {{showAuthorize?'您可将顾问名片保存到手机本地，以便后续联系':'为了能向您提供更好的服务，请授权手机号'}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getData } from '@/request/api.js'
  import rCanvas from '@/components/r-canvas/r-canvas.vue'
  import myCanvas from '@/components/my-canvas/index.js'
  export default {
    components: { rCanvas },
    mixins: [myCanvas],
    data() {
      return {
        titleName: '',
        showAuthorize: false,
        modalContent: `
				您可前往微信“通许录”，在搜索框中粘贴微信号，以搜索或添加顾问微信
			`,
        adviserInfo: {},
        userId: '',
        buildingIdX: '', //app扫码进来，带过来buildingId时
        wxcodeCard: '',
        canvasImg: '',
        flagDownloadImg: true, //控制下载按钮
      }
    },
    methods: {
      onGetPhoneNumber(e) {
        let res = e.detail
        if (res.errMsg.indexOf(':ok') >= 0) {
          this.$dt.biz.auth.phone(res.iv, res.encryptedData, this.userId).then(res => {
            this.$cache.setCache('isPhoneLogin', true)
            this.$cache.setCache('Login-Data', res.login)
            this.$cache.setCache('loginFlag', true)
            this.$cache.setCache('loginFlag1', true)
            this.showAuthorize = true
            let { phone } = res.customerInfo || {}
            if (phone) {
              this.doAddCustorm(phone)
            }
          })
        } else {
          console.warn(res.errMsg)
        }
      },
      //保存顾问名片
      downloadUserImg(url) {
        if (!this.flagDownloadImg) return
        this.$refs.rCanvas.saveImage(this.canvasImg)
        if (this.canvasImg) {
          uni.showToast({
            title: '名片保存成功，您可在手机相册中查看',
            icon: 'none',
            duration: 2000,
          })
        }
      },
      //获取微信二维码
      getwxCodeUserCard() {
        let self = this
        let params = {
          uId: this.userId,
          bId: this.buildingIdX,
          type: 1,
          pageType: 1,
        }
        getData('/dt-user/noToken/wx/getwxCodeUserCard', params)
          .then((res) => {
            this.wxcodeCard = res
            setTimeout(() => {
              self.createImg()
            }, 600)
          })
          .catch((err) => {
            console.log('获取小程序二维码', err)
          })
      },
      //复制微信号
      copyNumber(value) {
        let self = this
        uni.setClipboardData({
          data: value,
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
      //获取顾问信息
      initUserInfo() {
        let params = {
          userId: this.userId,
          buildingId: this.buildingIdX,
        }
        let self = this
        getData('/dt-user/v1/aggs/user/noToken/get', params)
          .then(async (res) => {
            console.log('管家信息', res)
            let { expertiseFields = [], buildingInfos = [] } = res
            res.expertiseFields = expertiseFields
            if (res.servedPeopleNum != null || res.servedPeopleNum != '') {
              res.servedPeopleNum = parseInt(res.servedPeopleNum)
            } else {
              res.servedPeopleNum = ''
            }
            self.adviserInfo = res
            this.titleName = `将由顾问【${self.adviserInfo.userName}】为您服务`
            let buildingIds = buildingInfos.map((item1) => {
              return item1.buildingId
            })
            await self.getwxCodeUserCard() //获取小程序二维码
          })
          .catch((err) => {
            console.log('管家信息', err)
          })
      },
      // 把当前手机号推进客户池
      doAddCustorm(phone) {
		  console.log('进入推进客户池', phone,this.buildingIdX,this.userId)
        let params = {
          customerPhone: phone,
          buildingId: this.buildingIdX,
          userId: this.userId,
          checkInType: 1 //到类型: 1扫码签到 2手动签到 3新增客户签到
        }
        let api = '/dt-customer/checkIn/noToken/customerCheckIn'
        getData(api, params)
          .then((res) => {
			  console.log('推进客户池成功', res)
		  })
          .catch((err) => {
            console.log('创建客户报错', err)
          })
      },
    },
    onLoad(option) {
      console.log('-------进入扫码页面', option)
      if (option.scene) {
        const scene = decodeURIComponent(option.scene)
        console.log('-------scene数据', scene)
        let obj = {}
        scene.split('&').forEach((item) => {
          const key = item.split('=')[0]
          obj[key] = item.split('=')[1]
        })
        this.userId = obj.uId
        this.buildingIdX = obj.bId
      } else {
        this.userId = option.userId
        this.buildingIdX = option.buildingId
      }
      this.initUserInfo() //管家信息
      if (!this.$cache.getCache('isPhoneLogin')) {
        this.showAuthorize = false
      } else {
		  console.log('userId&&&buildingIdX', this.userId,this.buildingIdX)
        if (this.buildingIdX) {
          let { phone } = this.$cache.getCache('Login-Data').customerInfo || {}
		  console.log('手机号是否存在', phone)
          if (phone) {
            this.doAddCustorm(phone)
          }
        }
        this.showAuthorize = true
      }
    },
  }
</script>
<style lang='scss'>
  page {
    background: #062471;
    overflow: hidden;
  }
</style>
<style lang='scss' scoped>
  .sing_in {
    padding: 30rpx 30rpx 0 30rpx;

    .main {
      background: #fef7e4;
      width: 100%;
      height: 1160rpx;
      overflow: hidden;
      border-radius: 16px;
      position: relative;

      .building_warp {
        background: #2a4da6;
        width: 528rpx;
        height: 110rpx;
        margin: 40rpx 81rpx;
        position: absolute;
        z-index: 10;

        .building_name {
          font-size: 40rpx;
          font-weight: 600;
          text-align: center;
          background: linear-gradient(180deg, #eeeeee, #d8d8d8);
          -webkit-background-clip: text;
          color: transparent;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 20rpx;
        }

        .introduce {
          opacity: 0.8;
          font-size: 22rpx;
          text-align: center;
          color: #e0d1b9;
          line-height: 22rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 20rpx;
        }
      }

      .building_bg {
        width: 528rpx;
        height: 110rpx;
        position: absolute;
        top: 56rpx;
        left: 97rpx;
        z-index: 1;
        opacity: 0.2;
        background: #2a4da6;
        border: 1px solid #062471;
      }

      .title_text {
        margin-top: 208rpx;
        font-size: 40rpx;
        font-weight: 600;
        text-align: center;
        color: #082367;
        line-height: 40rpx;

        .title {
          display: flex;
          justify-content: center;

          .text {
            padding: 0 12rpx;
          }

          .iconfont {
            font-size: 20rpx;
          }
        }

        .procedure {
          font-size: 28rpx;
          font-weight: 400;
          text-align: center;
          color: #113181;
          line-height: 28rpx;
          margin-top: 32rpx;
        }
      }

      /* 未登录图片 */
      .img_warp {
        padding: 30rpx;
        display: flex;
        flex-direction: column;

        .configImg_warp {
          display: flex;
          justify-content: space-between;

          .configImg {
            width: 300rpx;
            height: 224rpx;
            border-radius: 20rpx;
            overflow: hidden;
            position: relative;

            image {
              width: 100%;
              height: 100%;
            }

            .img_text {
              position: absolute;
              bottom: 0;
              opacity: 0.8;
              background: linear-gradient(180deg, rgba(0, 0, 0, 0), #000000);
              font-size: 28rpx;
              font-weight: 600;
              text-align: center;
              color: #ffffff;
              line-height: 28rpx;
              padding: 19rpx 0;
              text-align: center;
              display: block;
              width: 100%;
            }
          }
        }

        .MR_T {
          margin-top: 30rpx;
        }
      }

      /* 登录完顾问的信息 */
      .user_warp {
        margin: 47rpx 30rpx;
        opacity: 1;
        background: #fef7e4;
        border-radius: 16px;
        border: 2px dashed #062471;

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
              color: #000000;
              line-height: 36rpx;
              margin-bottom: 8rpx;
            }

            .phone_chat {
              display: flex;
              justify-content: space-between;
              margin-top: 16rpx;

              .iconfont {
                display: inline-block;
                margin-right: 16rpx;
                color: #666666;
              }

              .user_msg_btn {
                width: 96rpx;
                height: 40rpx;
                opacity: 1;
                background: #2a4da6;
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
              color: #000000;
              line-height: 40rpx;
            }

            .unit {
              font-size: 30rpx;
              font-weight: 400;
              color: #000000;
              line-height: 20rpx;
            }

            .item_title {
              font-size: 24rpx;
              color: #666666;
              line-height: 33rpx;
              margin-top: 13rpx;
            }
          }
        }
      }
    }

    .bottom_main {
      .bottom_bg {
        width: 100%;
        height: 50%;
        background: url(https://images.tospurfang.com/26CDF733F70A4F0A9898559F17EF7995-6-2.jpg) no-repeat;
        background-size: 100% 50%;
        position: absolute;
        left: 0;
        top: 75%;
        z-index: 10;
      }

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
        margin-top: 20rpx;
      }

      .bottom_text {
        margin-top: 43rpx;
        opacity: 0.5;
        font-size: 24rpx;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 20rpx;
      }
    }
  }
</style>