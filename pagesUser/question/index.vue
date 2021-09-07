<!-- 客户问题 -->
<template>
  <view class='customer_question'>
    <view class="building_info">
      <view class="list_item" @click="toDetail(baseInfo.buildingId)">
        <view class="list_item_warp">
          <view class="img_warp">
            <!-- <image class="tospur-image" src="/static/pic_default_small@2x.png"></image> -->
            <image class="tospur-image"
              :src="baseInfo.albumCoverPicture ? baseInfo.albumCoverPicture+'?x-oss-process=image/resize,h_200,w_200' : 'https://images.tospurfang.com/5F157797D0474B05A91C098DDE0BCFF0-6-2.jpg'"
              mode="aspectFill"></image>
          </view>
          <view class="item_details">
            <view class="details_title">
              {{baseInfo.buildingAlias}}
              <view class="label cl_B">{{baseInfo.salesStatus == 1?'待售':baseInfo.salesStatus == 2?'在售':baseInfo.salesStatus == 3?'售罄':baseInfo.salesStatus == 4?'在租':''}}</view>
              <view class="label cl_Y" v-if="!!baseInfo.propertyType">{{handlePropertyType(baseInfo.propertyType[0])}}</view>
            </view>
            <view class="price_details">{{$formatter.AveragePrice(baseInfo.referenceAveragePriceType,baseInfo.referenceAveragePrice,baseInfo.referenceAveragePriceMax)}}</view>
            <view class="address_details">{{$formatter.formatArea(baseInfo.referenceBuildAreaMin, baseInfo.referenceBuildAreaMax)}}<text class="mg_Lf_5">{{baseInfo.areaName}}<text
                  v-if="baseInfo.streetName">-</text>{{baseInfo.streetName}}</text></view>
            <!-- <view class="address_details"><text>{{baseInfo.areaName}}<text v-if="baseInfo.streetName">-</text>{{baseInfo.streetName}}</text></view> -->
            <view class="classify">
              <view class="claWarp">
                <view class="claCon" v-for="(itemT,indexT) in baseInfo.baseTagsName" :key="indexT">{{itemT}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="question_warp">
      <view class="question_item_warp">
        <view class="question_item">
          <view class="icon_wen">
            问
          </view>
          <view class="question_text">
            {{questionData.questionDesc}}
          </view>
        </view>
        <view class="question_item answer">
          <view class="icon_wen answer_icon">
            答
          </view>
          <view class="question_text answer_text">
            {{questionData.answerDesc}}
          </view>
        </view>
        <u-line color="#EDEDED" margin="40rpx 0 0 0" />
      </view>
    </view>
    <u-divider color="#999999" border-color="#999999" height='50' margin-top="40">已显示全部</u-divider>
    <view class="fixed_bottom">
      <foot-bottom :userId='userId' v-if="userId&&buildingId" :buildingId="buildingId"></foot-bottom>
    </view>
  </view>
</template>

<script>
import { getData } from '@/request/api'
import footBottom from '@/components/footer/index.vue'
export default {
  components: {
    footBottom,
  },
  data() {
    return {
      questionId: '',
      buildingId: '',
      baseInfo: {},
      questionData: {},
      userId: '',
      showAuthorize: false,
    }
  },
  computed: {},
  watch: {},
  methods: {
    //获取楼盘信息
    getBuildingData() {
      let params = {
        buildingId: this.buildingId,
      }
      getData('/dt-business/report/getByBuildingIds', params)
        .then((res) => {
          console.log(res)
          this.baseInfo = res
        })
        .catch((err) => {})
    },
    //获取问答列表
    getQuestionData() {
      let params = {
        questionAnswerId: this.questionId,
      }
      getData('/dt-business/homepage/getArticleGet', params)
        .then((res) => {
          // console.log('-----------客户问答',res)
          this.questionData = res
        })
        .catch((err) => {})
    },

    toDetail(buildingId) {
      uni.navigateTo({
        url: `/pagesHouse/house/house?buildingId=${buildingId}&userId=${this.userId}`,
      })
    },
    handlePropertyType(key) {
      let newKey = ''
      if (key.length > 1) {
        newKey = key.substring(0, 1)
      } else {
        newKey = key
      }
      return this.$formatter.switchName('propertyType', newKey)
    },
  },
  onLoad(option) {
    if (option.scene) {
      const scene = decodeURIComponent(option.scene)
      let obj = {}
      scene.split('&').forEach((item) => {
        const key = item.split('=')[0]
        obj[key] = item.split('=')[1]
      })
      this.buildingId = obj.buildingId
      this.userId = obj.userId
      this.questionId = obj.questionId
    } else {
      this.buildingId = option.buildingId
      this.userId = option.userId
      this.questionId = option.questionId
    }
    this.getBuildingData()
    this.getQuestionData()
  },
  onHide() {
    console.log('onHide 222')
  },
  onUnload() {
    console.log('onUnload 333')
  },
  mounted() {},
}
</script>
<style lang='scss' scoped>
.customer_question {
  padding-bottom: 112rpx;
  .building_info {
    .list_item {
      padding: 40rpx 32rpx;
      position: relative;
      border-bottom: 10rpx solid #f6f6f8;
      .list_item_warp {
        display: flex;
        overflow: hidden;
        .img_warp {
          width: 210rpx;
          height: 162rpx;
          border-radius: 10rpx;
          overflow: hidden;
          position: relative;
          background-color: #f7f7f7;
          .tospur-image {
            height: 100%;
            width: 100%;
            border-radius: 8rpx;
          }
        }
        .item_details {
          padding-left: 30rpx;
          flex: 1;
          .details_title {
            font-size: 32rpx;
            line-height: 40rpx;
            color: #333333;
            font-weight: 700;
            display: flex;
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
            color: #fe3a07;
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
            color: #999999;
            line-height: 24rpx;
            padding-bottom: 16rpx;
            .mg_Lf_5 {
              margin-left: 34rpx;
            }
          }

          .classify {
            font-size: 20rpx;
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
              color: #999999;
              background-color: rgba(6, 36, 113, 0.05);
              border-radius: 4rpx;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
  .question_warp {
    .question_item_warp {
      margin: 0 32rpx;
      padding-top: 40rpx;
      .question_item {
        display: flex;
        .icon_wen {
          width: 36rpx;
          height: 36rpx;
          background: #4e72e6;
          border-radius: 12rpx 12rpx 0rpx 12rpx;
          font-size: 20rpx;
          line-height: 40rpx;
          color: #ffffff;
          text-align: center;
          margin-right: 10rpx;
        }
        .question_text {
          flex: 1;
          word-break: break-all;
          font-size: 32rpx;
          font-weight: 600;
          color: #141414;
          line-height: 44rpx;
        }
      }
      .answer {
        margin-top: 30rpx;
        .answer_icon {
          background: #e36250;
        }
        .answer_text {
          font-weight: 400;
          font-size: 28rpx;
          color: #141414;
        }
      }
    }
  }
  .fixed_bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
  }
}
</style>
