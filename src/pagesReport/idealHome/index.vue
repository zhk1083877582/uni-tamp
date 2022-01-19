<!-- 我的理想家 -->
<template>
  <view class="ideal_home_warp">
    <view class='ideal_home'>
      <view class="top_title"><i class="shu"></i><text class="span">我的理想家</text></view>
      <view class="main">
        <view class="main_content">
          <view class="box">
            <view class="lable">
              置业目的：
            </view>
            <view class="content">
              {{resData.intentionPurpose||'不详'}}
            </view>
          </view>
        </view>

        <view class="main_content">
          <view class="box">
            <view class="lable">
              购房资质：
            </view>
            <view class="content">
              {{resData.buyHouseQualification||'不详'}}
            </view>
          </view>
          <view class="box">
            <view class="lable">
              贷款资质：
            </view>
            <view class="content">
              {{resData.loansQualification||'不详'}}
            </view>
          </view>
        </view>

        <view class="main_content">
          <view class="box">
            <view class="lable">
              资金情况：
            </view>
            <view class="content column">
              <view class="item_view">
                <text>总价预算</text>
                <text class="color_red">
                  {{!resData.intentionTotalPrice?'不祥':resData.intentionTotalPrice==3?'不限':resData.intentionTotalPrice}}
                </text>
              </view>
              <view class="item_view">
                <text>单价预算</text>
                <text class="color_red">
                  {{!resData.intentionAveragePrice?'不祥':resData.intentionAveragePrice==3?'不限':resData.intentionAveragePrice}}
                </text>
              </view>
              <view class="item_view">
                <text>首付区间</text>
                <text class="color_red">
                  {{!resData.downPaymentInterval?'不祥':resData.downPaymentInterval==3?'不限':resData.downPaymentInterval}}
                </text>
              </view>
            </view>
          </view>
        </view>

        <view class="main_content" style="margin-bottom: 0;">
          <view class="box">
            <view class="lable">
              意向需求：
            </view>
            <view class="content column">
              <view class="item_view">
                <view class="second_label">区域</view>
                <view class="right_text">
                  {{!resData.intentionRegion?'不祥':resData.intentionRegion == 3?'不限':resData.intentionRegion}}
                </view>
              </view>
              <view class="item_view">
                <view class="second_label">环线</view>
                <view class="right_text">
                  <text>
                    {{!resData.intentionLoopLine?'不祥':resData.intentionLoopLine == 3?'不限':resData.intentionLoopLine}}
                  </text>
                </view>
              </view>
              <view class="item_view">
                <view class="second_label">地铁</view>
                <view class="right_text">
                  <text>
                    {{!resData.intentionSubway?'不祥':resData.intentionSubway == 3?'不限':resData.intentionSubway}}
                  </text>
                </view>
              </view>
              <view class="item_view">
                <view class="second_label">面积</view>
                <view class="right_text">
                  <text>
                    {{!resData.intentionArea?'不祥':resData.intentionArea==3?'不限':resData.intentionArea}}
                  </text>
                </view>
              </view>
              <view class="item_view">
                <view class="second_label">户型</view>
                <view class="right_text">
                  <text>
                    {{!resData.intentionHouseType?'不祥':resData.intentionHouseType == 3?'不限':resData.intentionHouseType}}
                  </text>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="main_content">
          <view class="box">
            <view class="lable">
              关注重点：
            </view>
            <view class="content">
              {{resData.attentionFactor||'不详'}}
            </view>
          </view>
        </view>
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
      headPortrait:
        'https://images.tospurfang.com/BA7EDA2214C144AD9C94228999EEB579-6-2.png',
      resData: {},
    }
  },
  computed: {},
  watch: {},
  methods: {
    getformatloanCondition(type) {
      let loanConditionStr = ''
      switch (type) {
        case '1':
          loanConditionStr = '有'
          break
        case '2':
          loanConditionStr = '无'
          break
        case '3':
          loanConditionStr = '首套'
          break
        case '4':
          loanConditionStr = '二套'
          break
        default:
          loanConditionStr = '-'
          break
      }
      return loanConditionStr
    },
    changeArrayDownPayment(str) {
      if (str == null || str == '') return '不详'
      if (str == '3') return '不限'
      let newStr = str.split(',')
      if (newStr[0] == '' && newStr[1] != '') {
        return newStr[1] + '万元'
      } else if (newStr[0] != '' && newStr[1] == '') {
        return newStr[0] + '万元'
      } else {
        return newStr[0] + '万元~' + newStr[1] + '万元'
      }
    },
  },
  onLoad(option) {
    this.resData = JSON.parse(option.resData)
  },
}
</script>
<style lang='scss'>
page {
  background: linear-gradient(181deg, #0a2056, #0d255f, #062471 99%);
}
</style>
<style lang='scss' scoped>
.ideal_home_warp {
  background: linear-gradient(181deg, #0a2056, #0d255f, #062471 99%);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 56rpx 0;
  .ideal_home {
    width: 91%;
    background-color: #ffffff;
    border-radius: 20rpx;
    .top_title {
      font-weight: bold;
      text-align: left;
      color: #062471;
      padding: 48rpx 0 0 32rpx;
      margin-bottom: 64rpx;
      display: flex;
      justify-content: flex-start;
      .span {
        color: #062471;
        -webkit-background-clip: text;
        display: block;
        font-size: 34rpx;
        line-height: 32rpx;
      }
      .shu {
        width: 6rpx;
        margin-right: 8rpx;
        background-color: #062471;
        display: inline-block;
        height: 34rpx;
      }
    }
    .text_title {
      text-align: center;
      font-size: 34rpx;
      font-weight: 600;
      color: #2b2014;
      line-height: 34rpx;
      margin-bottom: 56rpx;
    }

    .main {
      padding: 0 52rpx;
      .main_content {
        display: flex;
        justify-content: space-between;
        margin-bottom: 50rpx;
        .box {
          display: flex;
          .lable {
            font-size: 28rpx;
            color: #999999;
            line-height: 32rpx;
          }
          .content {
            font-size: 28rpx;
            color: #141414;
            line-height: 32rpx;
            flex: 1;
          }
          .column {
            display: flex;
            flex-direction: column;
            flex: 1;
            .item_view {
              margin-bottom: 30rpx;
              color: #928b94;
              display: flex;
              .color_red {
                margin-left: 24rpx;
                font-size: 28rpx;
                font-weight: 400;
                color: #fe3a07;
                line-height: 32rpx;
                display: flex;
                flex: 1;
              }
              .second_label {
                flex: none;
              }
              .right_text {
                margin-left: 24rpx;
                font-size: 28rpx;
                font-weight: 400;
                line-height: 32rpx;
                color: #2b2014;
                word-break: break-word;
                width: 350rpx;
              }
            }
          }
        }
      }
    }
  }
}
</style>
