<!-- 楼栋 -->
<template>
  <view class='unit_biulding'>
    <view class="movable_warp">
      <movable-area class="M-movable-area">
        <movable-view class="top_img_warp" direction="all" scale="true" scale-min="1" scale-max="4" scale-value="1">
          <image class="top_img" :src="TopSrc"></image>
          <text v-for="(item,index) in UnitList" :key='index' @click="handleclickUnit(item,index)" :class="[item.unitName==current?'crrent_img_btn':'img_btn']"
            :style="{position:'absolute','top':item.topMargin*2+'rpx','left':item.leftMargin*2+'rpx'}">{{item.unitName}}#</text>
        </movable-view>
      </movable-area>
    </view>
    <view class="biulding_msg">
      <view class="msg_left">
        <text>楼栋：</text><text class="unit_num">{{crrentObj.unitName}}#</text><text class="tag">{{crrentObj.saleStatus==2?'待售':crrentObj.saleStatus==1?'在售':'售罄'}}</text>
      </view>
      <view class="msg_other">
        <view class="label">层数：<text>{{crrentObj.layers}}</text></view>
      </view>
      <view class="msg_other">
        <view class="label">户数：<text>{{crrentObj.householdNum}}</text></view>
      </view>
    </view>

    <view class="unit" v-if="buildingUnitElementHouseVOS.length != 0 ">
      <view class="label">
        单元：
      </view>
      <view class="unit_tag">
        <text class="num" v-for="(item,indexU) in buildingUnitElementHouseVOS" @click="tagclick(item,indexU)" :class="{num_active:unitCrrent==indexU}" :key='indexU'>{{item.houseUnitElement}}号</text>
      </view>
    </view>

    <view class="house_type" v-if="oneRoomAndOnePrice.length != 0">
      <view class="title">
        <text>配置户型</text><text class="more" @click="toHouseTypeList">更多<text class='iconfont iconarrow_more'></text></text>
      </view>
      <view class="main_wap">
        <view class="main" v-for="(item,index) in oneRoomAndOnePrice" :key='index' v-show="item.typeFlag == 1" @click="clickHouseType(item)">
          <view class="top_img">
            <view class="image_tag" v-if="item.isHot==1">
              热销
            </view>
            <image class="img" :src="item.annexPath"></image>
            <view class="image_text">
              {{item.houseTypeName}}
            </view>
          </view>
          <view class="content">
            <view class="one">
              <text class="houseStyleMess_style">
                {{item.houseType}}
              </text>
              <text class="houseStyleMess_spans">
                {{item.salesStatus==2?'待售':(item.salesStatus==1?'在售':'售罄')}}
              </text>
            </view>
            <view class="houseStyleMess_area"><text>建面约{{item.constructionArea}}㎡</text><text class="CX">朝向&ensp;{{$formatter.switchName('oriented',item.oriented)}}</text></view>
            <view class="houseStyleMess_price">
              总价约<text class="cl_red">{{item.totalPrice}}万</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <consultation-foot :mess="mess" type="houseDetail"></consultation-foot>
  </view>
</template>

<script>
import { getData } from '@/request/api'
import consultationFoot from '../components/consultationFoot/consultationFoot.vue'
export default {
  components: {
    consultationFoot,
  },
  data() {
    return {
      TopSrc: '',
      buildingId: '',
      UnitList: [],
      oneRoomAndOnePrice: [],
      current: '',
      crrentObj: {},
      unitCrrent: null,
      unitCrrentObj: {},
      buildingUnitElementHouseVOS: [],
      crrentHouseType: {},
      //设置默认的分享参数
      share: {
        title: '楼栋',
        path: '',
        imageUrl: '',
      },
      mess: {
        type: 'unitBuilding',
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleclickUnit(obj, index) {
      console.log(obj, index)
      this.current = obj.unitName
      this.crrentObj = obj
      //清空单元选择
      this.unitCrrent = null
      this.unitCrrentObj = {}

      this.getUnitData(this.buildingId, '', this.crrentObj.id)
    },

    tagclick(obj, index) {
      console.log(obj, index)
      this.unitCrrent = index
      this.unitCrrentObj = obj
      console.log(
        this.buildingId,
        this.unitCrrentObj.houseUnitElement,
        this.crrentObj.id
      )
      this.getUnitData(
        this.buildingId,
        this.unitCrrentObj.houseUnitElement,
        this.crrentObj.id,
        this.unitCrrentObj.typeIds
      )
    },
    //点击户型
    clickHouseType(obj) {
      console.log(obj)
      // this.crrentHouseType = obj;
      // uni.navigateTo({
      // 	url:'pagesHouse/houseTypeDetails/houseTypeDetails?buildingId='+this.buildingId+"&"
      // })
    },
    getUnitList(buildingId) {
      let param = {
        buildingId: buildingId, //楼盘id
      }
      getData('/building/capp/buildingUnit/buildingUnitList', param)
        .then((res) => {
          this.UnitList = res.cAppBuildingUnitBaseInfoList
          this.TopSrc = res.annexPath
          this.UnitList.map((item, index) => {
            if (this.current == '' && index == 0) {
              this.current = item.unitName
            }
            if (this.current == item.unitName) {
              this.crrentObj = item
              this.getUnitData(this.buildingId, '', this.crrentObj.id)
            }
          })
          console.log('请求楼栋单元信息', res)
        })
        .catch((err) => {
          console.log('请求楼栋单元结果报错', err)
        })
    },
    getUnitData(buildingId, houseUnitElement, id, typeIds = '') {
      let param = {
        buildingId: buildingId, //楼盘id
        houseUnitElement: houseUnitElement, //单元id
        unitId: id, //楼栋id
        typeId: '', //户型id
      }
      getData('/building/unit/house/oneRoomAndOnePrice', param)
        .then((res) => {
          if (typeIds) {
            let arr = []
            res.oneRoomAndOnePriceListVOS.map((item) => {
              if (typeIds.indexOf(item.typeId) != -1) {
                arr.push(item)
              }
            })
            this.oneRoomAndOnePrice = arr
          } else {
            this.oneRoomAndOnePrice = res.oneRoomAndOnePriceListVOS
          }
          this.buildingUnitElementHouseVOS = res.buildingUnitElementHouseVOS
          console.log('请求楼栋信息', res, this.oneRoomAndOnePrice)
        })
        .catch((err) => {
          console.log('请求楼栋结果报错', err)
        })
    },
    toHouseTypeList() {
      console.log(123123)
      uni.navigateTo({
        url: '../houseTypeList/houseTypeList?buildingId=' + this.buildingId,
      })
    },
  },
  onLoad(option) {
    this.mess.buildingId = this.buildingId = option.buildingId
    console.log(this.buildingId)
    this.current = option.houseUnitElement || '1'
    this.getUnitList(option.buildingId)
  },
}
</script>
<style lang='scss' scoped>
.unit_biulding {
  .movable_warp {
    overflow: hidden;
    width: 100%;
    height: 100%;
    /deep/.M-movable-area {
      width: 100%;
      height: 100%;
    }
    .top_img_warp {
      position: relative;
      width: 100%;
      height: 100%;
      .top_img {
        width: 100%;
        height: 526rpx;
        /* display: block; */
      }
      .crrent_img_btn {
        height: 38rpx;
        min-width: 64rpx;
        font-size: 20rpx;
        text-align: center;
        color: #1b1833;
        line-height: 30rpx;
        background: url(/static/bubble__Details_pro.png) no-repeat;
        background-size: 100% 100%;
        z-index: 10;
      }
      .img_btn {
        /* position: absolute; */
        height: 38rpx;
        min-width: 64rpx;
        font-size: 20rpx;
        text-align: center;
        color: #1b1833;
        line-height: 30rpx;
        background: url(/static/bubble-white.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .biulding_msg {
    padding-left: 30rpx;
    padding-top: 30rpx;
    display: flex;
    font-size: 28rpx;
    color: #333333;
    display: flex;
    justify-content: space-between;
    line-height: 56rpx;
    .msg_left {
      .unit_num {
        font-size: 40rpx;
        font-weight: 500;
        color: #333333;
      }
      .tag {
        height: 32rpx;
        background: #ff824b;
        border-radius: 4rpx;
        color: #ffffff;
        padding: 0 12rpx;
        margin-left: 10rpx;
      }
    }
    .msg_other {
      font-size: 28rpx;
      font-weight: 400;
      text-align: center;
      color: #333333;
      flex: 1;
      .label {
        color: #999999;
      }
    }
  }

  .unit {
    padding: 0 30rpx;
    font-size: 32rpx;
    color: #333333;
    display: flex;
    line-height: 45rpx;
    padding-top: 30rpx;
    .unit_tag {
      overflow-y: hidden;
      overflow-x: auto;
      display: flex;
      flex: 1;
      .num {
        min-width: 100rpx;
        background: #f5f5f5;
        border-radius: 4px;
        /* padding: 0 20rpx; */
        text-align: center;
        margin-right: 16rpx;
        font-size: 28rpx;
        line-height: 44rpx;
      }
      .num_active {
        background-color: rgba(0, 164, 255, 0.1);
        border: 1px solid #00a4ff;
      }
    }
  }

  .house_type {
    margin-top: 60rpx;
    margin-bottom: 98rpx;
    .title {
      font-size: 32rpx;
      color: #333333;
      line-height: 45rpx;
      padding: 0 30rpx;
      display: flex;
      justify-content: space-between;
      .more {
        font-size: 24rpx;
        color: #333333;
        line-height: 45rpx;
        .iconfont {
          font-size: 24rpx;
          color: #999999;
        }
      }
    }

    .main_wap {
      margin-left: 30rpx;
      margin-top: 20rpx;
      display: flex;
      overflow-y: hidden;
      overflow-x: auto;
      .main {
        min-width: 306rpx;
        max-width: 306rpx;
        /* height: 404rpx; */
        margin-right: 20rpx;
        margin-bottom: 50rpx;
        background: #ffffff;
        border-radius: 8rpx;
        box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.15);
        .top_img {
          position: relative;
          height: 230rpx;
          .image_tag {
            background: #ff664f;
            border-radius: 8rpx 0px 8rpx 0px;
            font-size: 24rpx;
            padding: 8rpx 10rpx;
            color: #ffffff;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 10;
          }
          .img {
            height: 100%;
            width: 100%;
            display: block;
          }
          .image_text {
            height: 48rpx;
            font-size: 24rpx;
            color: #ffffff;
            line-height: 48rpx;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0),
              rgba(0, 0, 0, 0.81) 99%
            );
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
          }
        }

        .content {
          padding-top: 20rpx;
          padding-left: 20rpx;
          padding-bottom: 28rpx;
          .one {
            overflow: hidden;
            display: flex;
            justify-content: space-between;
          }
          .houseStyleMess_style {
            font-size: 30rpx;
            color: #1b1833;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            flex: 1;
          }
          .houseStyleMess_spans {
            color: white;
            border-radius: 4rpx;
            background-color: #ff824b;
            display: inline-block;
            text-align: center;
            margin: 0 8rpx;
            padding: 6rpx 10rpx;
            font-size: 20rpx;
          }

          .houseStyleMess_area {
            margin: 8px 0 10px 0;
            font-size: 24rpx;
            color: #333333;
            line-height: 24rpx;
            .CX {
              margin-left: 19rpx;
            }
          }
          .houseStyleMess_price {
            font-size: 24rpx;
            color: #333333;
            height: 32rpx;
            line-height: 32rpx;
            .cl_red {
              font-size: 32rpx;
              color: #f12224;
              line-height: 32rpx;
            }
          }
        }
      }
    }
  }
}
</style>
