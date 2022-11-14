<!-- 置业旅程 -->
<template>
  <view class="journey_ownership_warp">

    <!-- 搜索小程序进入 -->
    <view class="home_banner" v-if="!HasToken">
      <swiper style="height: 813rpx;" indicator-dots :autoplay="autoplay">
        <swiper-item v-for="(item,index) in bannerList" :key="index">
          <image style="height: 813rpx;border-radius=24rpx;width: 100%;margin: auto;"
            :src="item.image" mode="aspectFit" />
        </swiper-item>
      </swiper>
      <button class="login_btn" @click="doGoLoginPage">开启购房旅程</button>
    </view>

    <!-- 置业旅程主体 -->
    <view class='journey_ownership'
      :style="ishowbuilding?'padding-bottom:97rpx':'background:transparent'" v-else>
      <view class="user_msg">
        <view class="user_msg_left">
          <image class="avatarTou" :src="userInfo.avatarUrl" mode="widthFix"></image>
          <view class="name_phone">
            <view class="name" v-show="authorize">
              {{userInfo.nickName || ''}}
            </view>
            <view class="phone" :class="{'authorize_Y':authorize!=true}">
              {{phoneFormat}}
            </view>
          </view>
        </view>
        <view class="get_out" @click="onLogout">
          退出登录
        </view>
      </view>
      <view v-if="ishowbuilding">
        <swiper :style="{height:swiperHeight}" class="swiper" :current='curr'
          :next-margin='swiperMargin' :previous-margin='swiperMargin'
          :indicator-dots="indicatorDots" :autoplay="autoplay" :circular='autoplay'
          @change="changeSwipe">
          <swiper-item v-for="(item,index) in journeyArr" :key="index"
            class="swiper_item_class">
            <view class="swiper-item uni-bg-red" :class="index!=curr?'scale_swiper':''">
              <view class="swiper_item_H" :class="'swiper_item_warp'+index">
                <view class="list_item">
                  <view class="list_item_warp"
                    @click="toDetail(item.reportBuildingIntro.housesId,item.reportBuildingIntro.userId,item.reportData,item.ishowPlanStatus)">
                    <view class="img_warp">
                      <image class="tospur-image"
                        :src="item.reportBuildingIntro.housesCover ? item.reportBuildingIntro.housesCover : 'https://images.tospurfang.com/5F157797D0474B05A91C098DDE0BCFF0-6-2.jpg'"
                        mode="">
                      </image>
                    </view>
                    <view class="item_details">
                      <view class="details_title">
                        <view class="details_title_text">
                          {{item.reportBuildingIntro.housesName}}
                        </view>
                        <view class="label cl_B">
                          {{item.reportBuildingIntro.salesStatus == 'forSale'?'待售':item.reportBuildingIntro.salesStatus == 'onSales'?'在售':item.reportBuildingIntro.salesStatus == 'sellOut'?'售罄':''}}
                        </view>
                        <!-- <view class="label cl_Y"
                          v-if="!!item.reportBuildingIntro.propertyType">
                          {{handlePropertyType(item.reportBuildingIntro.propertyType.length>0&&item.reportBuildingIntro.propertyType!=null?item.reportBuildingIntro.propertyType[0]:'')}}
                        </view> -->
                      </view>
                      <view class="price_details">
                        {{formatter.AveragePrice(item.reportBuildingIntro.referenceAveragePriceType,item.reportBuildingIntro.referenceAveragePrice,item.reportBuildingIntro.referenceAveragePriceMax)}}
                      </view>
                      <view class="address_details">
                        {{formatter.formatArea(item.reportBuildingIntro.referenceBuildAreaMin, item.reportBuildingIntro.referenceBuildAreaMax)}}
                      </view>
                      <view class="address_details">
                        <text>{{item.reportBuildingIntro.areaName}}<text
                            v-if="item.reportBuildingIntro.streetName">-</text>{{item.reportBuildingIntro.streetName}}</text>
                      </view>
                      <view class="classify">
                        <view class="claWarp">
                          <view v-for="(itemT,indexT) in item.reportBuildingIntro.baseTagsName"
                            :key="indexT">
                            <view class="claCon" v-if="indexT<3">
                              {{itemT}}
                            </view>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>

                  <!-- 方案 -->
                  <view class='demand' v-if="item.ishowPlanStatus">
                    <!-- 方案推荐 -->
                    <view class="recommend_warp"
                      v-if="JSON.stringify(item.recommendation) != '[]'&&item.recommendation!=null">
                      <view class="top_title"><i class="shu"></i><text class="span">看房旅程</text>
                      </view>
                      <view
                        v-if="item.recommendation!=null&&JSON.stringify(item.recommendation) != '[]'">

                        <dt-tab :tabs="item.recommendation" isScroll
                          tab-class="dt-text-tab-class"
                          tab-class-active="dt-text-tab-class dt-text-tab-active-class"
                          v-model="currentPlan" @change="changePlanTab">
                        </dt-tab>

                        <swiper :style="{'height':swiperHeightPlan}" :current='currPlan'
                          :autoplay="autoplay" :circular='autoplay' @change="changeSwipePlan">
                          <swiper-item v-for="(itemR,index) in item.recommendation"
                            :key="index">
                            <view :class="'change_box_warp'+index">
                              <view class="change_box">
                                <view class="change_image_warp">
                                  <image class="change_image"
                                    :src="itemR.houseTypeImg?itemR.houseTypeImg:'https://images.tospurfang.com/0B1F08D8962944F9843B6AB342168B16-6-2.jpg'"
                                    mode=""></image>
                                </view>
                                <view class="rows">
                                  <i class="iconfont iconhuxing"></i><text
                                    class="lable">户型</text><text
                                    class="text">{{itemR.houseTypeName?itemR.houseTypeName:'-'}}</text>
                                </view>
                                <view class="rows">
                                  <i class="iconfont icongeju"></i><text
                                    class="lable">格局</text><text
                                    class="text">{{`${itemR.bedroom||'-'}室${itemR.parlor||'-'}厅${itemR.kitchen||'-'}厨${itemR.bathroom||'-'}卫`}}</text>
                                </view>
                                <view class="rows"
                                  v-if="itemR.buildingNumber&&itemR.houseNumber">
                                  <i class="iconfont iconfanghao"></i><text
                                    class="lable">房号</text><text
                                    class="text">{{itemR.buildingNumber?itemR.buildingNumber+'栋':''}}{{itemR.houseNumber?itemR.houseNumber+'室':''}}</text>
                                </view>
                                <view class="rows">
                                  <i class="iconfont iconmianji"></i><text
                                    class="lable">面积</text><text
                                    class="text">{{itemR.houseArea||'-'}}<text>㎡</text></text>
                                </view>
                                <view class="rows">
                                  <i class="iconfont iconjiage"></i><text
                                    class="lable">价格</text><text class="text"
                                    style="color: #FE3A07;">{{itemR.houseTotalPrice?itemR.houseTotalPrice+'万元':'待定'}}</text>
                                </view>
                                <view v-if="itemR.loanPlanShow =='1'">
                                  <view class="rows calculator_warp">
                                    <i class="iconfont iconshoufu"></i><text
                                      class="lable">首付</text><text
                                      class="text">{{itemR.firstPay?itemR.firstPay+'万元':'待定'}}</text>
                                    <view class="calculator_btn" @click="toCalculator"><text
                                        class="calculator_txt">房贷计算器</text></view>
                                  </view>
                                  <view>
                                    <view class="rows" v-if="itemR.repayType == '1'">
                                      <i class="iconfont iconyuegong"></i><text
                                        class="lable">月供</text><text
                                        class="text">{{itemR.mouthPay?itemR.mouthPay+'元':'待定'}}</text>
                                    </view>
                                    <view class="rows" v-else>
                                      <i class="iconfont iconyuegong"></i><text
                                        class="lable">首月</text><text
                                        class="text">{{itemR.mouthPay?`${itemR.mouthPay}（每月递减${itemR.monthDecline}）元`:'待定'}}</text>
                                    </view>
                                  </view>
                                </view>
                              </view>
                              <view class="reason" v-if="itemR.content">
                                <view class="sanJ"></view>
                                <view class="reason_title">
                                  <i class="iconfont icontuijianliyou"></i><text
                                    class="text">推荐理由</text>
                                </view>
                                <view class="reason_content">
                                  {{itemR.content}}
                                </view>
                              </view>
                            </view>
                          </swiper-item>
                        </swiper>
                      </view>
                    </view>
                    <!-- 置业报告列表 -->
                    <view class="report_list"
                      v-if="item.reportData!=null&&JSON.stringify(item.reportData) != '[]'">
                      <view class="mian">
                        <view class="timeline-item" v-for="(itemL, index) in item.reportData"
                          :key="index">
                          <view class="time">
                            <text class="georama"></text>
                            <view class="list_top_title">
                              <view class="time_text">
                                看房时间：{{itemL.createTime?.split(' ')[0] ?? '-'}}
                              </view>
                              <view class="keeper_msg" :id="itemL.userId"
                                @click="e=>tohouseKeeper(e,itemL)">
                                <view class="keeper_portrait">
                                  <image class="img"
                                    :src="itemL.userHeadPhoto?itemL.userHeadPhoto:defaultHead"
                                    mode="circle"></image>
                                </view>
                                <view class="keeper_name">
                                  <text
                                    class="keeper_name_text">{{itemL.userName?itemL.userName:'--'}}</text>
                                  <i class="iconfont icondianhua" :id="itemL.userId"
                                    @click.stop="e=>tellPhone(e,itemL,item)"></i>
                                </view>
                              </view>
                            </view>
                          </view>
                          <view class="status u-line-2">
                            {{itemL.stageName?itemL.stageName=='回笼'?'复看':itemL.stageName:''}}
                          </view>
                          <view class="content" :id="itemL.reportId"
                            @click="e=>toReportDetail(e,itemL.reportId)">
                            <view class="report_title">
                              <i class="iconfont iconzhiyebaogao"></i><text
                                class="report_title_text">{{itemL.reportName}}</text><i
                                class="iconfont iconjiantou"></i>
                            </view>
                          </view>
                        </view>
                      </view>
                    </view>
                  </view>

                  <view v-else>
                    <view class="no-data-plan">
                      <image class="img"
                        src="https://images.tospurfang.com/A92894D89E954C9198EDDA3349607E4D-6-2.jpg"
                        mode=""></image>
                      <view class="text">
                        您的置业计划书正在定制中，
                      </view>
                      <view class="text">
                        敬请期待~
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view v-else>
        <view class="no-data-plan no-data-build">
          <image class="img"
            src="https://images.tospurfang.com/A92894D89E954C9198EDDA3349607E4D-6-2.jpg"
            mode=""></image>
          <view class="text">
            您尚未开启购房旅程
          </view>
          <view class="text">
            敬请期待~
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { getData } from '@/request/api'
  import dtTab from '__com/dt/dt-tab.vue'
  import dt from "@dt/dt"
  export default {
    components: {
      dtTab
    },
    data() {
      return {
        formatter: dt.tool.formatter,
        HasToken: false, //搜索小程序进入主页判断是否登录，登录展示置业报告首页，未登录展示banner图
        ishowbuilding: true,
        // ishowPlan:true,
        headPortrait: 'https://images.tospurfang.com/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
        defaultHead: 'https://images.tospurfang.com/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
        swiperMargin: '30rpx',
        swiperHeight: '2850rpx',
        indicatorDots: false,
        autoplay: false,
        curr: 0,
        authorize: true,
        journeyArr: [],
        // 方案
        currentPlan: 0,
        swiperHeightPlan: '700px',
        currPlan: 0,
        userPhone: '',
        userInfo: {},
        GetOutTitleStyle: {
          fontWeight: '700',
          color: '#141414',
        },
        GetOutContentStyle: {
          fontSize: '34rpx',
          color: '#999999',
          lineHeight: '48rpx',
        },
        GetOutConfirmStyle: {
          borderLeft: '1px solid #EBEEF4',
          fontWeight: '600',
        },
        // 未登录时首页banner数据
        bannerList: [
        {
          image: 'https://images.tospurfang.com/C4A64C6AC96D431D8839871B3B7C65FC-6-2.jpg',
        },
        {
          image: 'https://images.tospurfang.com/8DF83A1BDE5B47F9897090D9AA643DDE-6-2.jpg',
        },
        {
          image: 'https://images.tospurfang.com/A29A5DD2F02141F397D0EF78BEF0E423-6-2.jpg',
        }, ],
      }
    },
    computed: {
      phoneFormat() {
        var reg = /^(\d{3})\d{4}(\d{4})$/
        let tel = this.userPhone ? this.userPhone.replace(reg, '$1****$2') : ''
        return tel
      },
    },
    watch: {},
    methods: {
      onLogout() {
        let _this = this
        uni.showModal({
          title: '确定退出？',
          content: '退出登录后将无法查看订单，重新登录即可查看',
          success(res) {
            if (res.confirm) {
              dt.storage.remove('dt_wx_auth')
              dt.storage.remove('isPhoneLogin')
              dt.storage.remove('Login-Data')
              _this.HasToken = false
            }
          },
        })
        // confirm-color="#062471" :title-style="GetOutTitleStyle"
        // :content-style="GetOutContentStyle" :confirm-style="GetOutConfirmStyle"
      },

      //去webview
      goWebView(routeName, routeParams, toPath) {
        let mWebSite = dt.env.webUrl //获取跳转域名
        let pathParams = '' //获取路由参数
        routeParams = routeParams || {}
        Object.keys(routeParams).forEach((keyStr, index) => {
          pathParams +=
            index > 0 ?
            `&${keyStr}=${routeParams[keyStr]}` :
            `${keyStr}=${routeParams[keyStr]}`
        })
        if (dt.storage.get('toMWebpath')) {
          dt.storage.remove('toMWebpath')
        }
        dt.storage.set('toMWebpath', {
          toMWebpath: toPath || `${mWebSite}/${routeName}?${pathParams}`,
        })
        uni.navigateTo({
          url: '/pagesHouse/webView/webView',
        })
      },
      handlePropertyType(key) {
        if (key == '') return
        return this.formatter.switchName('propertyType', key)
      },
      //登录
      doGoLoginPage() {
        uni.navigateTo({
          url: '/pagesUser/login/login?topath=pages/journey/index',
        })
      },
      // 跳转楼盘详情
      toDetail(buildingId, userId, reportData, flag) {
        console.log('跳转楼盘详情')
        let userIdTmp = flag ?
          reportData ?
          reportData[0].userId :
          userId :
          userId

        uni.navigateTo({
          url: '/pages_com/building/detail?buildingId=' +
            buildingId +
            '&userId=' +
            userIdTmp,
        })
      },
      changeSwipe(val) {
        console.log(val)
        this.curr = val.detail.current
        this.getDescWarpSwiper(val.detail.current)
        this.currentPlan = 0
        this.currPlan = 0
      },
      //方案swiper
      changePlanTab(index) {
        console.log(index, 11111)
        this.currentPlan = index
        this.currPlan = index
        this.getDescBox(index.detail.current)
      },
      changeSwipePlan(index) {
        console.log(index)
        this.currentPlan = index.detail.current
        this.currPlan = index.detail.current
        this.getDescBox(index.detail.current)
      },
      // 去管家名片
      tohouseKeeper(e, item) {
        console.log(e, item)
        uni.navigateTo({
          url: '/pagesHouse/adviserCard/index?userId=' + e.currentTarget.id +
            '&buildingId=' + item.buildingId,
        })
      },
      // 拨打电话
      tellPhone(e, item, obj) {
        console.log(e, item, obj, '111111')
        let self = this
        let params = {
          userId: e.currentTarget.id,
          buildingId: obj.reportBuildingIntro ?
            obj.reportBuildingIntro.buildingId : '',
        }
        getData('/dt-user/v1/aggs/user/noToken/get', params)
          .then((res) => {
            console.log('管家信息', res)
            if (!res.phone) {
              uni.showToast({
                title: '暂无顾问电话',
                icon: 'none',
                duration: 5000,
              })
              return
            }
            uni.makePhoneCall({
              // 手机号
              phoneNumber: res.phone,
              // 成功回调
              success: (res) => {},
              // 失败回调
              fail: (res) => {},
            })
          })
          .catch((err) => {
            uni.showToast({
              title: '暂无顾问电话',
              icon: 'none',
              duration: 5000,
            })
            return
            console.log('管家信息', err)
          })
      },
      toReportDetail(e, reportId) {
        uni.navigateTo({
          url: '/pages_com/report/detail?reportId=' + e.currentTarget.id,
        })
      },
      toIdealHome(data) {
        uni.navigateTo({
          url: '/pagesReport/idealHome/index?resData=' + JSON.stringify(
            data), //+ this.buildingId
        })
      },
      getinitData(openid, unionid, customerId) {
        let params = {
          openid,
          unionid,
          customerId,
        }
        getData('/dt-marketing/v1/report/noToken/cAppHome', params)
          .then((res) => {
            if (JSON.stringify(res) == '[]') {
              this.ishowbuilding = false
            }
            console.log(res, '置业报告列表数据')
            res.reportBuildingIntro &&
              res.reportBuildingIntro.forEach((itemT, indexT) => {
                let buildingTagArr = []
                itemT.baseTagsName &&
                  itemT.baseTagsName.split(',').forEach((item, index) => {
                    buildingTagArr.push(item)
                  })
                itemT.buildingTagArr = buildingTagArr
              })
            res.forEach((itemR, index) => {
              console.log(itemR)
              itemR.recommendation &&
                itemR.recommendation.forEach((itemY, indexY) => {
                  itemY.title = `方案${indexY + 1}`
                })

              //判断是否有方案推荐
              if (
                JSON.stringify(itemR.recommendation) == '{}' &&
                itemR.recommendation == null &&
                JSON.stringify(itemR.reportData) == '[]' &&
                itemR.reportData == null
              ) {
                itemR.ishowPlanStatus = false
              } else {
                itemR.ishowPlanStatus = true
              }

              //判断是否有楼盘
              if (
                JSON.stringify(itemR.reportBuildingIntro) == '{}' &&
                itemR.reportBuildingIntro == null
              ) {
                this.ishowbuilding = false
              }
            })
            this.journeyArr = res
            console.log(this.journeyArr, '置业报告列表整合数据')
            this.$nextTick(function() {
              this.getDescBox(0)
              this.getDescWarpSwiper(0)
            })
          })
          .catch((err) => {
            this.ishowbuilding = false
            console.log(err, '首页接口报错')
          })
      },
      getDescWarpSwiper(len) {
        uni
          .createSelectorQuery()
          .in(this)
          .select('.swiper_item_warp' + len)
          .boundingClientRect((result) => {
            if (result) {
              this.swiperHeight = result.height + 30 + 'px'
            } else {
              this.getDescWarpSwiper()
            }
          })
          .exec()
      },
      getDescBox(len) {
        uni
          .createSelectorQuery()
          .in(this)
          .select('.change_box_warp' + len)
          .boundingClientRect((result) => {
            if (result) {
              this.swiperHeightPlan = result.height + 20 + 'px'
            } else {
              this.getDescBox()
            }
          })
          .exec()
      },
    },
    created() {},

    onLoad(option) {
      console.log('-----首页', dt.storage.get('dt_wx_auth'))
      dt.biz.auth.getInfo().then(res => {
        this.userInfo = res.userInfo
        console.log(res)
      })
      let customerId = dt.storage.get('Login-Data').customerInfo ?
        dt.storage.get('Login-Data').customerInfo.customerId :
        ''
      // this.userPhone = dt.storage.get('Login-Data').customerInfo
      //   ? dt.storage.get('Login-Data').customerInfo.phone
      //   : ''
      let openid = dt.storage.get('dt_wx_auth').openid ?
        dt.storage.get('dt_wx_auth').openid :
        ''
      let unionid = dt.storage.get('dt_wx_auth').unionid ?
        dt.storage.get('dt_wx_auth').unionid :
        ''
      this.HasToken =
        dt.storage.get('dt_wx_auth') ||
        dt.storage.get('Login-Data') ?
        true :
        false
      if ((openid && unionid) || customerId) {
        this.getinitData(openid, unionid, customerId)
      }
    },
    mounted() {
      this.share.title = '购房旅程'
    },
    onReady() {},
    onShow() {},
  }
</script>
<style lang='scss'>
  page {
    background: #0a2056;
  }
</style>
<style lang='scss' scoped>
  .journey_ownership_warp {
    height: 100%;

    .home_banner {
      margin-top: 180rpx;

      .login_btn {
        margin-top: 72rpx;
        background: linear-gradient(180deg, #ffeda8, #ffce89);
        /* padding: 31rpx 113rpx; */
        color: #062471;
        font-size: 36rpx;
        font-weight: 600;
        height: 100rpx;
        line-height: 100rpx;
        width: 450rpx;
        border-radius: 50rpx;
      }
    }

    .journey_ownership {

      .user_msg {
        display: flex;
        justify-content: space-between;
        padding: 40rpx;

        .user_msg_left {
          display: flex;

          .avatarTou {
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
            overflow: hidden;
            border: 10rpx solid #123489;
          }

          .name_phone {
            margin-left: 20rpx;
            font-size: 32rpx;
            font-weight: 600;
            color: #ffffff;
            line-height: 32rpx;

            .name {
              margin-top: 18rpx;
              margin-bottom: 16rpx;
            }

            .phone {
              font-size: 28rpx;
              font-weight: 400;
              font-weight: 400;
            }

            .authorize_Y {
              line-height: 100rpx;
            }
          }
        }

        .get_out {
          padding: 13rpx 20rpx;
          font-size: 24rpx;
          line-height: 24rpx;
          background: linear-gradient(0deg, #113389, #2b53b8 93%);
          border-radius: 4rpx;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          align-self: center;
        }
      }

      .swiper {
        /* padding-top: 20rpx; */
        height: 232rpx;

        .swiper_item_class {
          border-radius: 20rpx;
          overflow: hidden;
        }

        .scale_swiper {
          transform: scaleY(0.98);
          opacity: 0.5;
        }

        .list_item {
          padding: 30rpx 32rpx;
          position: relative;
          background-color: #ffffff;
          margin: 0 10rpx;
          border-radius: 20rpx;
          /* height: 2850rpx; */
          overflow: hidden;

          .list_item_warp {
            display: flex;
            overflow: hidden;

            .img_warp {
              width: 210rpx;
              height: 210rpx;
              border-radius: 10rpx;
              background-color: #f7f7f7;

              .tospur-image {
                height: 210rpx;
                width: 210rpx;
                border-radius: 8rpx;
                display: block;
              }
            }

            .item_details {
              padding-left: 20rpx;
              flex: 1;

              .details_title {
                font-size: 32rpx;
                line-height: 40rpx;
                color: #333333;
                font-weight: 700;
                display: flex;

                .details_title_text {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  /* white-space:nowrap; */
                  height: 20px;
                  width: 59%;
                }

                .label {
                  border-radius: 5rpx;
                  font-size: 22rpx;
                  color: #ffffff;
                  padding: 5rpx 9rpx;
                  display: inline-block;
                  text-align: center;
                  line-height: 22rpx;
                  margin-left: 6rpx;
                  vertical-align: text-top;
                  display: flex;
                  align-self: center;
                  flex: 1;
                }

                .cl_B {
                  margin-right: 8rpx;
                  margin-left: 10rpx;
                  background-color: #2951b8;
                  border: 1px solid #2951b8;
                }

                .cl_Y {
                  border: 1px solid #2951b8;
                  color: #2951b8;
                }
              }

              .price_details {
                font-size: 32rpx;
                color: #f95424;
                line-height: 30rpx;
                padding: 16rpx 0 14rpx 0;
                font-weight: 600;

                .price_unit {
                  font-size: 20rpx;
                  line-height: 30rpx;
                  margin-left: 4rpx;
                }
              }

              .address_details {
                font-size: 24rpx;
                color: #c4c0c5;
                line-height: 24rpx;
                padding-bottom: 16rpx;

                .mg_Lf_5 {
                  margin-left: 20rpx;
                }
              }

              .classify {
                font-size: 20rpx;
                color: #999999;
                overflow-y: hidden;
                overflow-x: scroll;
                height: 30rpx;

                &::-webkit-scrollbar {
                  display: none;
                }

                .claWarp {
                  height: 100%;
                  width: 200rpx;
                  display: flex;
                }

                .claCon {
                  display: block;
                  float: left;
                  margin-right: 8rpx;
                  height: 30rpx;
                  line-height: 30rpx;
                  padding: 0 6rpx;
                  background-color: #f1f9ff;
                  border-radius: 4rpx;
                  white-space: nowrap;
                }
              }
            }
          }
        }
      }

      .demand {
        background-color: #ffffff;
        border-radius: 20rpx;

        .top_title {
          font-weight: bold;
          text-align: left;
          color: #062471;
          /* margin-top: 70rpx; */
          padding: 56rpx 0;
          display: flex;
          justify-content: flex-start;

          .span {
            color: #062471;
            -webkit-background-clip: text;
            display: block;
            font-size: 34rpx;
            line-height: 34rpx;
          }

          .shu {
            width: 6rpx;
            margin-right: 8rpx;
            background-color: #062471;
            display: inline-block;
            height: 34rpx;
          }
        }

        /* 理想家 */
        .LX_home {
          .text_title {
            text-align: center;
            font-weight: 600;
            margin-bottom: 30rpx;
          }

          .rows {
            border-top: 1rpx solid #ebeef4;
            display: flex;
            text-align: center;
            justify-content: space-between;
            /* margin: 0 24rpx; */
            border: 1rpx solid #ebeef4;
            border-bottom: 0;

            /* background: #FCF7EE; */
            .col_L {
              border-left: 1rpx solid #ebeef4;
            }

            /* .col_R{flex: 1.5 !important;} */
            .col_bottom {
              border-bottom: 1rpx solid #ebeef4;
            }

            .col {
              flex: 1;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              word-break: break-all;
              padding: 24rpx 10rpx;

              .title {
                font-size: 24rpx;
                font-weight: 500;
                color: #999999;
                line-height: 33rpx;
                margin-bottom: 16rpx;
              }

              .content_text {
                font-size: 28rpx;
                font-weight: 600;
                color: #141414;
                line-height: 28rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

          .check_all {
            text-align: center;
            font-size: 24rpx;
            font-weight: 400;
            text-decoration: underline;
            color: #062471;
            line-height: 33rpx;
            padding: 20rpx 0 28rpx 0;
          }
        }

        /* 方案 */
        .recommend_warp {
          .title {
            font-size: 34rpx;
            font-weight: 600;
            color: #2b2014;
            line-height: 34rpx;
            margin: 30rpx 0 20rpx 0;

            .title_icon {
              display: inline-block;
              width: 6rpx;
              height: 34rpx;
              background: #ecce9e;
              margin-right: 6rpx;
              vertical-align: bottom;
            }
          }

          .change_box {
            /* overflow: hidden; */
            border: 2rpx solid #ebeef4;
            margin-top: 30rpx;

            .change_image_warp {
              height: 342rpx;
              background-color: #f7f7f7;
            }

            .change_image {
              width: 100%;
              height: 100%;
              display: block;
            }

            ::v-deep uni-image {
              display: block;
            }

            .rows {
              padding: 28rpx;
              padding-left: 25rpx;
              border-top: 2rpx solid #ebeef4;
              display: flex;

              .iconfont {
                width: 28rpx;
                height: 28rpx;
                margin-right: 15rpx;
                color: #999999;
              }

              .lable {
                font-size: 28rpx;
                color: #999999;
                line-height: 30rpx;
              }

              .text {
                font-size: 28rpx;
                font-weight: 400;
                color: #141414;
                line-height: 30rpx;
                margin-left: 55rpx;
                width: 60%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .question {
                margin-left: 10rpx;
                width: 50rpx;
                height: 32rpx;
                color: #333333;
              }
            }
          }

          .reason {
            background: #ffffff;
            box-shadow: 0px 0px 8px 0px rgba(6, 36, 113, 0.1);
            border: 1px solid #ebeef4;
            border-radius: 0px 2px 4px 2px;
            padding: 32rpx 32rpx 32rpx 32rpx;
            margin-top: 32rpx;
            position: relative;

            .reason_title {
              display: flex;
              margin-bottom: 23rpx;

              .text {
                font-size: 28rpx;
                text-align: left;
                color: #999999;
                line-height: 28rpx;
                margin-left: 13rpx;
              }

              .icontuijianliyou {
                color: #999999;
              }
            }

            .reason_content {
              font-size: 28rpx;
              font-weight: 400;
              text-align: justify;
              color: #2b2014;
              line-height: 52rpx;
              text-indent: 50rpx;
              height: 160rpx;
              overflow: hidden;
              overflow-y: scroll;
            }

            .sanJ:after {
              content: '';
              position: absolute;
              top: -43rpx;
              left: 116rpx;
              border-width: 24rpx;
              border-style: solid;
              border-color: transparent transparent #ffffff transparent;
            }

            .sanJ:before {
              content: '';
              position: absolute;
              top: -45rpx;
              left: 118rpx;
              border-width: 22rpx;
              border-style: solid;
              border-color: transparent transparent #ebeef4 transparent;
            }
          }
        }
      }

      .report_list {
        margin-top: 20rpx;
        padding-bottom: 31rpx;
        height: 410rpx;
        overflow: hidden;
        overflow-y: scroll;

        .mian {
          padding-bottom: 78rpx;
          /* margin-bottom: 98rpx; */
          position: relative;

          &:before {
            content: '';
            position: absolute;
            display: block;
            width: 1px;
            background: #ebeef4;
            top: 40rpx;
            left: 7rpx;
            height: 97%;
          }
        }

        .timeline-item {
          padding: 32rpx 0rpx 20rpx 0rpx;

          .time {
            position: relative;

            .georama {
              position: absolute;
              top: 10rpx;
              left: 0px;
              box-sizing: border-box;
              width: 18rpx;
              height: 18rpx;
              background-color: #062471;
              border-radius: 18rpx;
              z-index: 700;
            }

            .list_top_title {
              display: flex;
              justify-content: space-between;

              .time_text {
                color: #999999;
                font-size: 24rpx;
                padding-left: 36rpx;
                padding-top: 4rpx;
              }

              .keeper_msg {
                display: flex;

                .keeper_portrait {
                  .img {
                    width: 40rpx;
                    height: 40rpx;
                    border-radius: 50%;
                  }
                }

                .keeper_name {
                  font-size: 24rpx;
                  color: #424d5d;
                  line-height: 33rpx;
                  padding-top: 4rpx;

                  .keeper_name_text {
                    padding-left: 15rpx;
                  }

                  .iconfont {
                    font-size: 24rpx;
                    color: #062471;
                    display: inline-block;
                    width: 50rpx;
                    text-align: right;
                  }
                }
              }
            }
          }

          .status {
            padding: 18rpx 0px 30rpx 36rpx;
            font-size: 30rpx;
            color: #25252d;
            font-weight: 700;
            line-height: 46rpx;
          }

          .content {
            padding: 4rpx 0px 0px 36rpx;

            .report_title {
              padding: 26rpx 19rpx 26rpx 32rpx;
              font-size: 28rpx;
              color: #666666;
              line-height: 28rpx;
              background: #f8f9fb;
              position: relative;
              display: flex;

              .report_title_text {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 85%;
              }

              .iconfont {
                vertical-align: middle;
                display: inline-block;
                color: #666666;
              }

              .iconzhiyebaogao {
                font-size: 38rpx;
                margin-right: 22rpx;
              }

              .iconjiantou {
                font-size: 20rpx;
                position: absolute;
                right: 19rpx;
              }
            }
          }
        }
      }

      .no-data-build {
        position: absolute;
        top: 65%;
        left: 50%;
        transform: translate(-50%, -75%);

        .text {
          text-align: center;
          font-size: 28rpx;
          color: #ffffff !important;
          line-height: 44rpx;
        }
      }

      .no-data-plan {
        padding-top: 80rpx;
        padding-bottom: 135rpx;

        .img {
          padding-bottom: 49rpx;
          margin: 0 auto;
          display: flex;
          width: 278rpx;
          height: 330rpx;
        }

        .text {
          text-align: center;
          font-size: 28rpx;
          color: #062471;
          line-height: 44rpx;
        }
      }
    }

    .calculator_warp {
      position: relative;

      .calculator_btn {
        position: absolute;
        right: 20rpx;
        width: 188rpx;
        height: 64rpx;
        background: rgba(74, 109, 219, 0.1);
        border-radius: 8px;
        top: 10rpx;
        text-align: center;
        line-height: 64rpx;

        .calculator_txt {
          color: #4a6ddb;
        }
      }
    }
  }
</style>
